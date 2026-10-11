import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '30mb' }));

// Shared Gemini client setup
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const MATH_COMPETENCIES = [
  { code: 'NLTD & LLTH', name: 'Năng lực tư duy và lập luận toán học' },
  { code: 'NLMHH', name: 'Năng lực mô hình hoá toán học' },
  { code: 'NLGQVĐ', name: 'Năng lực giải quyết vấn đề toán học' },
  { code: 'NLGTTH', name: 'Năng lực giao tiếp toán học' },
  { code: 'NLSDCC', name: 'Năng lực sử dụng công cụ, phương tiện học toán' },
];

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.post('/api/analyze-exam', async (req, res) => {
  try {
    const { examContent, fileData, grade = '9', examType = 'Định kì', subject = 'toan' } = req.body;

    const hasText = examContent && typeof examContent === 'string' && examContent.trim().length > 0;
    const hasFile = fileData && fileData.base64 && fileData.mimeType;

    if (!hasText && !hasFile) {
      return res.status(400).json({ error: 'Vui lòng cung cấp nội dung đề kiểm tra hoặc tải lên file PDF/hình ảnh.' });
    }

    // Dynamic subject rules & competencies
    const subjectCompetencyGuides: Record<string, string> = {
      toan: `Môn: Toán học. Gán 1 trong 5 mã năng lực sau cho TỪNG CÂU:
- "NLTD & LLTH": Năng lực tư duy và lập luận toán học.
- "NLMHH": Năng lực mô hình hoá toán học (bài toán thực tế, mô hình hàm số/hình học).
- "NLGQVĐ": Năng lực giải quyết vấn đề toán học.
- "NLGTTH": Năng lực giao tiếp toán học (đọc hiểu bảng, đồ thị, kí hiệu).
- "NLSDCC": Năng lực sử dụng công cụ, phương tiện học toán.
Cấu trúc điểm chuẩn CV 7991: TN Nhiều lựa chọn 2.0đ, TN Đúng-Sai 1.0đ, Tự luận 7.0đ.`,

      khtn: `Môn: Khoa học tự nhiên (KHTN: Vật lí, Hoá học, Sinh học). Gán 1 trong 3 mã năng lực sau cho TỪNG CÂU:
- "NNKHTN": Nhận thức khoa học tự nhiên (định luật, nguyên lý, hiện tượng chất và vật sống).
- "NTHTN": Tìm hiểu tự nhiên (thiết kế, phân tích thí nghiệm, quan sát).
- "NVDKN": Vận dụng kiến thức, kĩ năng đã học (hiện tượng thực tế đời sống, bảo vệ môi trường, tính toán).
Cấu trúc điểm: TN Nhiều lựa chọn 4.0đ (16 câu x 0,25đ), Tự luận 6.0đ (hoặc theo tổng điểm các câu tự luận).
QUY TẮC ĐIỂM TỰ LUẬN KHTN:
- BẮT BUỘC TRÍCH XUẤT ĐIỂM SỐ CHÍNH XÁC CỦA MỖI CÂU TỰ LUẬN TRONG ĐỀ (ví dụ: 'Bài 1. (1,0 điểm)', 'Bài 2 (2,0 điểm)', 'Bài 3 (2,0 điểm)', 'Bài 4. (1,0 điểm)') vào trường 'score'.
- Điểm số ở phần tự luận của khung ma trận sẽ lấy trực tiếp từ mỗi câu tự luận này. Tuyệt đối không chia đều hay tự ý thay đổi điểm số của câu tự luận!`,

      van: `Môn: Ngữ văn. Gán 1 trong 3 mã năng lực sau cho TỪNG CÂU:
- "NLĐH": Năng lực đọc hiểu (nhận biết thể loại, chi tiết, hình ảnh, chủ đề văn bản).
- "NLGT": Năng lực tiếng Việt và thực hành giao tiếp (từ loại, ngữ pháp, biện pháp tu từ).
- "NLV": Năng lực viết (viết đoạn văn, bài văn nghị luận xã hội / văn học).
Cấu trúc điểm: Phần I Đọc hiểu 6.0đ (TN và câu hỏi ngắn), Phần II Viết 4.0đ (Tự luận).`,

      su_dia: `Môn: Lịch sử và Địa lí. Gán các mã năng lực theo phân môn:
- "NTLLS": Tìm hiểu lịch sử; "NNTLS": Nhận thức và tư duy lịch sử; "NVDLS": Vận dụng lịch sử vào thực tiễn.
- "NNKHDL": Nhận thức khoa học địa lí; "NTHDL": Tìm hiểu địa lí; "NVDDL": Vận dụng địa lí vào thực tiễn.
Cấu trúc điểm: Phân môn Lịch sử 5.0đ, Phân môn Địa lí 5.0đ.`,

      tin: `Môn: Tin học. Gán 1 trong 5 mã năng lực sau cho TỪNG CÂU:
- "NLa": Sử dụng và quản lý phương tiện CNTT-TT.
- "NLb": Ứng xử phù hợp trong môi trường số (bản quyền, an toàn số).
- "NLc": Giải quyết vấn đề với sự hỗ trợ của CNTT-TT (thuật toán, lập trình).
- "NLd": Ứng dụng CNTT-TT trong học và tự học.
- "NLe": Hợp tác trong môi trường số.
Cấu trúc điểm: TN Nhiều lựa chọn 4.0đ, Tự luận 6.0đ.`,

      anh: `Môn: Tiếng Anh. Gán 1 trong các mã năng lực sau:
- "NLU": Language Focus (Ngữ âm, Từ vựng, Ngữ pháp tiếng Anh).
- "NLR": Reading Comprehension (Kĩ năng đọc hiểu).
- "NLW": Writing (Kĩ năng viết câu và đoạn văn).
- "NLL": Listening (Kĩ năng nghe).
Cấu trúc điểm: TN Nhiều lựa chọn 6.0đ, Tự luận 4.0đ.`,

      gdcd: `Môn: Giáo dục công dân. Gán 1 trong 3 mã năng lực sau cho TỪNG CÂU:
- "NLĐCHV": Năng lực điều chỉnh hành vi.
- "NLPTBT": Năng lực phát triển bản thân.
- "NLTHTG": Năng lực tìm hiểu và tham gia hoạt động kinh tế - xã hội.
Cấu trúc điểm: TN Nhiều lựa chọn 4.0đ, Tự luận tình huống 6.0đ.`,

      cong_nghe: `Môn: Công nghệ. Gán 1 trong các mã năng lực:
- "NNCN": Nhận thức công nghệ; "NGTCN": Giao tiếp công nghệ; "NSDCN": Sử dụng công nghệ; "NĐGCN": Đánh giá công nghệ.
Cấu trúc điểm: TN Nhiều lựa chọn 4.0đ, Tự luận 6.0đ.`,
    };

    const currentGuide = subjectCompetencyGuides[subject] || subjectCompetencyGuides.toan;

    const systemPrompt = `Bạn là chuyên gia thẩm định và xây dựng đề kiểm tra bậc THCS (Khối lớp 6, 7, 8, 9) theo Chương trình GDPT 2018 và hướng dẫn tại CÔNG VĂN SỐ 7991/BGDĐT-GDTrH ngày 17/12/2024 của Bộ Giáo dục và Đào tạo.

QUY TẮC MA TRẬN & ĐẶC TẢ THEO MÔN:
${currentGuide}

QUY TẮC CẤU TRÚC ĐỀ THEO YÊU CẦU:
1. Dạng câu hỏi (partType) và phân bổ điểm:
   - "TN_NHIEU_LUA_CHON": Trắc nghiệm nhiều phương án lựa chọn (A, B, C, D).
   - "TN_DUNG_SAI": Trắc nghiệm Đúng - Sai (mỗi câu có 4 ý a, b, c, d).
   - "TU_LUAN": Tự luận (trình bày lời giải / bài viết chi tiết).
   - Tổng toàn bài là 10.0 điểm.

2. Mức độ nhận thức (level):
   - "BIET": Nhận biết (nhận dạng, phát biểu, định nghĩa, đọc thông tin trực tiếp, công thức cơ bản).
   - "HIEU": Thông hiểu (áp dụng kiến thức 1-2 bước, giải thích, chuyển đổi biểu diễn, tính toán quen thuộc).
   - "VAN_DUNG": Vận dụng (liên hệ thực tế, mô hình hoá, giải quyết vấn đề tổng hợp).

3. Yêu cầu cần đạt (expectedOutcome):
   - Nêu rõ chuẩn kiến thức kỹ năng theo chương trình GDPT 2018 cho câu đó (bắt đầu bằng động từ hành vi: "Nhận biết được...", "Tính được...", "Vận dụng được...", "Giải thích được...").

4. GIỮ NGUYÊN 100% ĐỀ THI GỐC VÀ CÁC PHƯƠNG ÁN LỰA CHỌN CỦA ĐỀ:
   - BẮT BUỘC giữ nguyên vẹn 100% lời dẫn câu hỏi, các ký hiệu công thức, số liệu và TẤT CẢ các phương án lựa chọn A, B, C, D (hoặc a, b, c, d đối với câu Đúng - Sai).
   - Tuyệt đối không được tóm tắt, không được cắt ngắn, không được bỏ bớt phương án lựa chọn!
   - Trích xuất từng phương án riêng biệt vào mảng 'options' (ví dụ: ["A. ...", "B. ...", "C. ...", "D. ..."]).
   - Trường 'fullQuestionText': Chứa toàn bộ nội dung câu hỏi cùng tất cả các phương án.

5. ĐIỂM SỐ CỦA TỪNG CÂU VÀ ĐẶC BIỆT LÀ PHẦN TỰ LUẬN:
   - BẮT BUỘC: Đối với mỗi câu tự luận (TU_LUAN) hoặc câu có ghi số điểm trong đề (ví dụ: 'Bài 1. (1,0 điểm)', 'Bài 2 (2,0 điểm)', 'Câu 17 (1,5 điểm)'), PHẢI trích xuất chính xác số điểm đó vào trường 'score' của câu hỏi đó (ví dụ: 1.0, 2.0, 1.5, 0.5).
   - Điểm số phần tự luận của khung ma trận sẽ lấy trực tiếp từ điểm của từng câu này! Tuyệt đối không chia đều, không tự ý sửa đổi thang điểm của từng câu trong đề gốc!

Nhiệm vụ: Đọc kỹ tài liệu/đề thi được cung cấp (bao gồm từ file PDF nếu gửi file). Bóc tách chính xác từng câu hỏi (Câu 1, Câu 2... hoặc Bài 1, Bài 2...). Trích xuất trọn vẹn nội dung câu hỏi cùng tất cả các phương án lựa chọn (options và fullQuestionText), gán mức độ nhận thức, điểm số chính xác và năng lực chuyên môn phù hợp của môn học. Trả về đúng schema.`;

    let contentsPayload: any;

    if (hasFile) {
      // Multimodal input: PDF or image
      const inlinePart = {
        inlineData: {
          mimeType: fileData.mimeType,
          data: fileData.base64,
        },
      };
      const textPrompt = `Dưới đây là file tài liệu đề kiểm tra (Môn: ${subject}, Lớp ${grade}, Loại: ${examType}${
        fileData.fileName ? `, Tên file: ${fileData.fileName}` : ''
      }).
Hãy đọc toàn bộ các trang của file PDF này, trích xuất lại toàn văn đề thi vào trường "extractedText" và phân tích cấu trúc ma trận, bản đặc tả theo CV 7991.`;

      contentsPayload = { parts: [inlinePart, { text: textPrompt }] };
    } else {
      const userPrompt = `Dưới đây là nội dung đề kiểm tra (Môn: ${subject}, Lớp ${grade}, Loại: ${examType}):
---
${examContent}
---
Hãy phân tích và trả về định dạng JSON theo đúng schema yêu cầu.`;

      contentsPayload = userPrompt;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contentsPayload,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.2,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: 'Tiêu đề đề kiểm tra (ví dụ: ĐỀ KIỂM TRA ĐỊNH KÌ TOÁN 12 HỌC KÌ I)',
            },
            grade: { type: Type.STRING },
            subject: { type: Type.STRING },
            extractedText: {
              type: Type.STRING,
              description: 'Toàn văn nội dung đề kiểm tra được bóc tách từ file PDF hoặc văn bản gửi lên',
            },
            summary: {
              type: Type.STRING,
              description: 'Nhận xét tổng quan về cấu trúc ma trận và tỉ lệ các mức độ nhận thức.',
            },
            questions: {
              type: Type.ARRAY,
              description: 'Danh sách chi tiết toàn bộ các câu hỏi trong đề.',
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  questionNumber: { type: Type.STRING, description: 'Ví dụ: Câu 1, Câu 2, Câu 13, Bài 1' },
                  partType: {
                    type: Type.STRING,
                    description: 'TN_NHIEU_LUA_CHON | TN_DUNG_SAI | TN_TRA_LOI_NGAN | TU_LUAN',
                  },
                  topic: { type: Type.STRING, description: 'Chủ đề / Chương chính (ví dụ: Hàm số và ứng dụng đạo hàm)' },
                  subTopic: { type: Type.STRING, description: 'Nội dung / đơn vị kiến thức (ví dụ: Cực trị của hàm số)' },
                  level: { type: Type.STRING, description: 'BIET | HIEU | VAN_DUNG' },
                  competency: {
                    type: Type.STRING,
                    description: 'NLTD & LLTH | NLMHH | NLGQVĐ | NLGTTH | NLSDCC',
                  },
                  contentSnippet: { type: Type.STRING, description: 'Trích đoạn hoặc tóm tắt câu hỏi' },
                  fullQuestionText: {
                    type: Type.STRING,
                    description: 'Toàn bộ nội dung câu hỏi và các phương án trả lời để hiển thị trong đề thi',
                  },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'Danh sách các phương án A, B, C, D (đối với TN nhiều lựa chọn) hoặc các ý a, b, c, d (đối với Đúng-Sai).',
                  },
                  expectedOutcome: { type: Type.STRING, description: 'Yêu cầu cần đạt chuẩn GDPT 2018' },
                  score: { type: Type.NUMBER, description: 'Điểm ước tính của câu (ví dụ 0.25, 0.5, 1.0)' },
                },
                required: [
                  'id',
                  'questionNumber',
                  'partType',
                  'topic',
                  'subTopic',
                  'level',
                  'competency',
                  'contentSnippet',
                  'fullQuestionText',
                  'expectedOutcome',
                ],
              },
            },
          },
          required: ['title', 'grade', 'subject', 'questions'],
        },
      },
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error('Gemini không trả về kết quả.');
    }

    const parsedData = JSON.parse(textOutput);
    return res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error('Error analyzing exam:', error);
    return res.status(500).json({
      error: 'Không thể phân tích đề kiểm tra: ' + (error.message || 'Lỗi không xác định'),
    });
  }
});

// Configure Vite integration for dev server or static serve for production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
