import { QuestionItem, SubjectId } from '../types/matrix';
import { ALL_OTHER_SUBJECT_EXAMS } from './subjectSampleExams';

export interface SampleExamData {
  id: string;
  subjectId?: SubjectId;
  name: string;
  grade: string;
  examType: string;
  rawText: string;
  meta: {
    title: string;
    grade: string;
    subject: string;
    school: string;
    timeLimit: string;
    summary: string;
  };
  questions: QuestionItem[];
}

export const MATH_SAMPLE_EXAMS: SampleExamData[] = [
  // ==========================================
  // KHỐI 9: ĐỀ KIỂM TRA ĐỊNH KÌ TOÁN 9 (CV 7991)
  // ==========================================
  {
    id: 'math9-hk1',
    subjectId: 'toan',
    name: 'Toán 9 - Học kì I (Cấu trúc CV 7991: TN 2đ - ĐS 1đ - TL 7đ)',
    grade: '9',
    examType: 'Cuối kì I',
    meta: {
      title: 'ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I - MÔN TOÁN LỚP 9',
      grade: '9',
      subject: 'Toán học',
      school: 'TRƯỜNG THCS',
      timeLimit: '90 phút',
      summary: 'Đề kiểm tra Toán 9 chuẩn Công văn 7991: Phần I Trắc nghiệm nhiều lựa chọn (2,0đ), Phần II Trắc nghiệm Đúng - Sai (1,0đ), Phần III Tự luận (7,0đ). Tích hợp 5 năng lực toán học vào từng câu.',
    },
    rawText: `UBND HUYỆN / QUẬN - PHÒNG GIÁO DỤC VÀ ĐÀO TẠO
TRƯỜNG THCS - ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I
MÔN: TOÁN 9 - THỜI GIAN LÀM BÀI: 90 PHÚT

PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn (2,0 điểm - Gồm 8 câu hỏi, mỗi câu 0,25 điểm).
Câu 1. Căn bậc hai số học của 16 là:
A. 4.    B. -4.    C. 256.    D. ±4.
Câu 2. Điều kiện xác định của biểu thức √(2x - 6) là:
A. x ≥ 3.    B. x > 3.    C. x ≤ 3.    D. x < 3.
Câu 3. Hàm số nào sau đây là hàm số bậc nhất đồng biến trên R?
A. y = 3x - 1.    B. y = -2x + 5.    C. y = x^2 + 1.    D. y = 4.
Câu 4. Cho tam giác ABC vuông tại A có đường cao AH. Hệ thức nào sau đây đúng?
A. AH^2 = BH . CH.    B. AB^2 = BH . BC.    C. AC^2 = CH . BC.    D. Cả A, B, C đều đúng.
Câu 5. Cho tam giác ABC vuông tại A có góc B = 30° và cạnh huyền BC = 10 cm. Độ dài cạnh góc vuông AC bằng:
A. 5 cm.    B. 5√3 cm.    C. 5√2 cm.    D. 10 cm.
Câu 6. Đường thẳng y = (m - 1)x + 2 song song với đường thẳng y = 2x - 3 khi:
A. m = 3.    B. m = 1.    C. m = -1.    D. m = 2.
Câu 7. Cho đường tròn (O; 5 cm) và dây AB = 8 cm. Khoảng cách từ tâm O đến dây AB bằng:
A. 3 cm.    B. 4 cm.    C. 6 cm.    D. √41 cm.
Câu 8. Một chiếc thang dài 4 m dựng vào bức tường nghiêng một góc 65° so với mặt đất. Chiều cao bức tường mà thang chạm tới (làm tròn đến chữ số thập phân thứ nhất) là:
A. 3,6 m.    B. 3,2 m.    C. 1,7 m.    D. 4,4 m.

PHẦN II. Câu trắc nghiệm đúng sai (1,0 điểm - Gồm 2 câu hỏi, mỗi câu 0,5 điểm).
Câu 9. Cho biểu thức P = (√x / (√x - 1) - 1 / (x - √x)) : ((√x + 1) / (√x - 1)) với x > 0, x ≠ 1.
a) Điều kiện xác định của biểu thức P là x > 0 và x ≠ 1.
b) Với x = 4, giá trị của biểu thức P bằng 1.
c) Rút gọn biểu thức P ta được kết quả P = (√x + 1) / √x.
d) Có đúng một giá trị nguyên của x để P < 2.

Câu 10. Trong mặt phẳng toạ độ Oxy, cho đường thẳng (d): y = 2x - 4.
a) Đường thẳng (d) cắt trục tung tại điểm A(0; -4).
b) Góc tạo bởi đường thẳng (d) và trục Ox là góc tù.
c) Đường thẳng (d) đi qua điểm M(3; 2).
d) Khoảng cách từ gốc toạ độ O đến đường thẳng (d) bằng 4√5 / 5.

PHẦN III. Tự luận (7,0 điểm - Gồm 4 bài toán trình bày lời giải chi tiết).
Bài 1. (2,0 điểm)
a) Tính giá trị biểu thức: A = √48 - 2√27 + √75.
b) Rút gọn biểu thức: B = (x - 9) / (√x + 3) + (√x - 2) / (√x - 2) với x ≥ 0, x ≠ 4, 9. Tìm x để B = 5.
Bài 2. (2,0 điểm) Cho hàm số bậc nhất y = (m - 2)x + 3 (m ≠ 2) có đồ thị là đường thẳng (d1).
a) Vẽ đồ thị hàm số khi m = 3.
b) Tìm m để đường thẳng (d1) cắt đường thẳng (d2): y = 2x - 1 tại một điểm trên trục tung.
c) Tìm m để khoảng cách từ gốc toạ độ O đến đường thẳng (d1) đạt giá trị lớn nhất.
Bài 3. (2,0 điểm) Một cột cờ đứng thẳng vuông góc với mặt đất. Tại một thời điểm nắng chiếu, bóng của cột cờ trên mặt đất dài 12 m và góc tạo bởi tia nắng mặt trời với mặt đất là 38°.
a) Tính chiều cao của cột cờ (làm tròn đến chữ số thập phân thứ nhất).
b) Để tăng cường an toàn chống bão, người ta chằng một sợi dây cáp từ đỉnh cột cờ xuống một cọc sắt trên mặt đất cách chân cột cờ 15 m. Tính độ dài tối thiểu của sợi dây cáp đó.
Bài 4. (1,0 điểm) Cho đường tròn (O; R) và điểm A nằm ngoài đường tròn. Từ A kẻ hai tiếp tuyến AB, AC với đường tròn (B, C là các tiếp điểm). Gọi H là giao điểm của OA và BC.
a) Chứng minh bốn điểm A, B, O, C cùng thuộc một đường tròn và OA vuông góc với BC tại H.
b) Kẻ đường kính BD của đường tròn (O). Đoạn thẳng AD cắt đường tròn (O) tại điểm thứ hai là E. Chứng minh AH . AO = AE . AD.`,
    questions: [
      // PHẦN I: 8 câu TN nhiều lựa chọn (2.0 điểm, 0.25đ/câu)
      {
        id: 'q1',
        questionNumber: 'Câu 1',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Căn bậc hai và căn bậc ba',
        subTopic: 'Căn bậc hai số học',
        level: 'BIET',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Tìm căn bậc hai số học của 16.',
        fullQuestionText: 'Căn bậc hai số học của 16 là:\nA. 4.    B. -4.    C. 256.    D. ±4.',
        options: ['A. 4', 'B. -4', 'C. 256', 'D. ±4'],
        expectedOutcome: 'Nhận biết được định nghĩa căn bậc hai số học của một số không âm.',
        score: 0.25,
      },
      {
        id: 'q2',
        questionNumber: 'Câu 2',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Căn bậc hai và căn bậc ba',
        subTopic: 'Căn thức bậc hai và hằng đẳng thức',
        level: 'BIET',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Điều kiện xác định của biểu thức căn bậc hai chứa biến số.',
        fullQuestionText: 'Điều kiện xác định của biểu thức √(2x - 6) là:\nA. x ≥ 3.    B. x > 3.    C. x ≤ 3.    D. x < 3.',
        options: ['A. x ≥ 3', 'B. x > 3', 'C. x ≤ 3', 'D. x < 3'],
        expectedOutcome: 'Nhận biết được điều kiện xác định của căn thức bậc hai dưới dạng nhị thức bậc nhất.',
        score: 0.25,
      },
      {
        id: 'q3',
        questionNumber: 'Câu 3',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Hàm số bậc nhất',
        subTopic: 'Khái niệm và tính chất hàm số bậc nhất',
        level: 'BIET',
        competency: 'NLGTTH',
        contentSnippet: 'Nhận biết hàm số bậc nhất đồng biến trên tập số thực R.',
        fullQuestionText: 'Hàm số nào sau đây là hàm số bậc nhất đồng biến trên R?\nA. y = 3x - 1.    B. y = -2x + 5.    C. y = x^2 + 1.    D. y = 4.',
        options: ['A. y = 3x - 1', 'B. y = -2x + 5', 'C. y = x^2 + 1', 'D. y = 4'],
        expectedOutcome: 'Nhận biết được hàm số bậc nhất và tính chất đồng biến khi hệ số a > 0.',
        score: 0.25,
      },
      {
        id: 'q4',
        questionNumber: 'Câu 4',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Hệ thức lượng trong tam giác vuông',
        subTopic: 'Một số hệ thức về cạnh và đường cao trong tam giác vuông',
        level: 'BIET',
        competency: 'NLGTTH',
        contentSnippet: 'Các hệ thức lượng về cạnh và đường cao trong tam giác vuông.',
        fullQuestionText: 'Cho tam giác ABC vuông tại A có đường cao AH. Hệ thức nào sau đây đúng?\nA. AH^2 = BH . CH.    B. AB^2 = BH . BC.    C. AC^2 = CH . BC.    D. Cả A, B, C đều đúng.',
        options: ['A. AH^2 = BH . CH', 'B. AB^2 = BH . BC', 'C. AC^2 = CH . BC', 'D. Cả A, B, C đều đúng'],
        expectedOutcome: 'Nhận biết được các hệ thức cơ bản về cạnh và đường cao trong tam giác vuông.',
        score: 0.25,
      },
      {
        id: 'q5',
        questionNumber: 'Câu 5',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Hệ thức lượng trong tam giác vuông',
        subTopic: 'Tỉ số lượng giác của góc nhọn',
        level: 'HIEU',
        competency: 'NLGQVĐ',
        contentSnippet: 'Tính độ dài cạnh góc vuông dựa vào cạnh huyền và tỉ số lượng giác góc nhọn.',
        fullQuestionText: 'Cho tam giác ABC vuông tại A có góc B = 30° và cạnh huyền BC = 10 cm. Độ dài cạnh góc vuông AC bằng:\nA. 5 cm.    B. 5√3 cm.    C. 5√2 cm.    D. 10 cm.',
        options: ['A. 5 cm', 'B. 5√3 cm', 'C. 5√2 cm', 'D. 10 cm'],
        expectedOutcome: 'Vận dụng định nghĩa sin góc nhọn để tính độ dài cạnh góc vuông đối diện.',
        score: 0.25,
      },
      {
        id: 'q6',
        questionNumber: 'Câu 6',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Hàm số bậc nhất',
        subTopic: 'Đường thẳng song song và đường thẳng cắt nhau',
        level: 'HIEU',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Tìm điều kiện của tham số m để hai đường thẳng song song.',
        fullQuestionText: 'Đường thẳng y = (m - 1)x + 2 song song với đường thẳng y = 2x - 3 khi:\nA. m = 3.    B. m = 1.    C. m = -1.    D. m = 2.',
        options: ['A. m = 3', 'B. m = 1', 'C. m = -1', 'D. m = 2'],
        expectedOutcome: 'Xác định được giá trị tham số để hai đường thẳng song song dựa vào hệ số góc.',
        score: 0.25,
      },
      {
        id: 'q7',
        questionNumber: 'Câu 7',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Đường tròn',
        subTopic: 'Đường kính và dây của đường tròn',
        level: 'HIEU',
        competency: 'NLSDCC',
        contentSnippet: 'Tính khoảng cách từ tâm đường tròn đến dây cung.',
        fullQuestionText: 'Cho đường tròn (O; 5 cm) và dây AB = 8 cm. Khoảng cách từ tâm O đến dây AB bằng:\nA. 3 cm.    B. 4 cm.    C. 6 cm.    D. √41 cm.',
        options: ['A. 3 cm', 'B. 4 cm', 'C. 6 cm', 'D. √41 cm'],
        expectedOutcome: 'Sử dụng định lí Pitago và mối quan hệ giữa đường kính và dây để tính khoảng cách.',
        score: 0.25,
      },
      {
        id: 'q8',
        questionNumber: 'Câu 8',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Hệ thức lượng trong tam giác vuông',
        subTopic: 'Ứng dụng thực tế tỉ số lượng giác',
        level: 'HIEU',
        competency: 'NLMHH',
        contentSnippet: 'Bài toán thực tế chiếc thang dựa vào tường và chiều cao đạt được.',
        fullQuestionText: 'Một chiếc thang dài 4 m dựng vào bức tường nghiêng một góc 65° so với mặt đất. Chiều cao bức tường mà thang chạm tới (làm tròn đến chữ số thập phân thứ nhất) là:\nA. 3,6 m.    B. 3,2 m.    C. 1,7 m.    D. 4,4 m.',
        options: ['A. 3,6 m', 'B. 3,2 m', 'C. 1,7 m', 'D. 4,4 m'],
        expectedOutcome: 'Mô hình hoá tình huống thực tế chiếc thang thành tam giác vuông và tính cạnh bằng hàm sin.',
        score: 0.25,
      },

      // PHẦN II: 2 câu Đúng - Sai (1.0 điểm, 0.5đ/câu)
      {
        id: 'q9',
        questionNumber: 'Câu 9',
        partType: 'TN_DUNG_SAI',
        topic: 'Căn bậc hai và căn bậc ba',
        subTopic: 'Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai',
        level: 'HIEU',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Các mệnh đề về điều kiện, tính toán giá trị và bất đẳng thức của biểu thức chứa căn thức.',
        fullQuestionText: 'Cho biểu thức P = (√x / (√x - 1) - 1 / (x - √x)) : ((√x + 1) / (√x - 1)) với x > 0, x ≠ 1.\na) Điều kiện xác định của biểu thức P là x > 0 và x ≠ 1.\nb) Với x = 4, giá trị của biểu thức P bằng 1.\nc) Rút gọn biểu thức P ta được kết quả P = (√x + 1) / √x.\nd) Có đúng một giá trị nguyên của x để P < 2.',
        options: [
          'a) Điều kiện xác định của biểu thức P là x > 0 và x ≠ 1.',
          'b) Với x = 4, giá trị của biểu thức P bằng 1.',
          'c) Rút gọn biểu thức P ta được kết quả P = (√x + 1) / √x.',
          'd) Có đúng một giá trị nguyên của x để P < 2.',
        ],
        expectedOutcome: 'Kiểm tra tính đúng sai về điều kiện xác định, các bước rút gọn và biện luận giá trị biểu thức chứa căn.',
        score: 0.5,
      },
      {
        id: 'q10',
        questionNumber: 'Câu 10',
        partType: 'TN_DUNG_SAI',
        topic: 'Hàm số bậc nhất',
        subTopic: 'Đồ thị hàm số bậc nhất và toạ độ giao điểm',
        level: 'HIEU',
        competency: 'NLGTTH',
        contentSnippet: 'Khảo sát đồ thị hàm số bậc nhất, giao điểm với trục toạ độ và khoảng cách đến gốc toạ độ.',
        fullQuestionText: 'Trong mặt phẳng toạ độ Oxy, cho đường thẳng (d): y = 2x - 4.\na) Đường thẳng (d) cắt trục tung tại điểm A(0; -4).\nb) Góc tạo bởi đường thẳng (d) và trục Ox là góc tù.\nc) Đường thẳng (d) đi qua điểm M(3; 2).\nd) Khoảng cách từ gốc toạ độ O đến đường thẳng (d) bằng 4√5 / 5.',
        options: [
          'a) Đường thẳng (d) cắt trục tung tại điểm A(0; -4).',
          'b) Góc tạo bởi đường thẳng (d) và trục Ox là góc tù.',
          'c) Đường thẳng (d) đi qua điểm M(3; 2).',
          'd) Khoảng cách từ gốc toạ độ O đến đường thẳng (d) bằng 4√5 / 5.',
        ],
        expectedOutcome: 'Đọc hiểu đồ thị hàm số bậc nhất, xác định toạ độ giao điểm và tính khoảng cách từ gốc toạ độ.',
        score: 0.5,
      },

      // PHẦN III: 4 bài Tự luận (7.0 điểm)
      {
        id: 'q11',
        questionNumber: 'Bài 1',
        partType: 'TU_LUAN',
        topic: 'Căn bậc hai và căn bậc ba',
        subTopic: 'Biến đổi đơn giản và rút gọn biểu thức chứa căn thức bậc hai',
        level: 'HIEU',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Rút gọn biểu thức chứa căn bậc hai và tìm giá trị của biến số.',
        fullQuestionText: 'Bài 1. (2,0 điểm)\na) Tính giá trị biểu thức: A = √48 - 2√27 + √75.\nb) Rút gọn biểu thức: B = (x - 9) / (√x + 3) + (√x - 2) / (√x - 2) với x ≥ 0, x ≠ 4, 9. Tìm x để B = 5.',
        expectedOutcome: 'Thực hiện thành thạo các phép biến đổi khai phương, đưa thừa số ra ngoài dấu căn và rút gọn biểu thức phân thức chứa căn bậc hai.',
        score: 2.0,
      },
      {
        id: 'q12',
        questionNumber: 'Bài 2',
        partType: 'TU_LUAN',
        topic: 'Hàm số bậc nhất',
        subTopic: 'Vẽ đồ thị hàm số và bài toán tương giao',
        level: 'VAN_DUNG',
        competency: 'NLGQVĐ',
        contentSnippet: 'Vẽ đồ thị hàm số bậc nhất, tìm toạ độ giao điểm và bài toán cực trị khoảng cách.',
        fullQuestionText: 'Bài 2. (2,0 điểm) Cho hàm số bậc nhất y = (m - 2)x + 3 (m ≠ 2) có đồ thị là đường thẳng (d1).\na) Vẽ đồ thị hàm số khi m = 3.\nb) Tìm m để đường thẳng (d1) cắt đường thẳng (d2): y = 2x - 1 tại một điểm trên trục tung.\nc) Tìm m để khoảng cách từ gốc toạ độ O đến đường thẳng (d1) đạt giá trị lớn nhất.',
        expectedOutcome: 'Vẽ đồ thị hàm số bậc nhất chính xác và vận dụng phương pháp toạ độ để giải bài toán tham số và cực trị hình học.',
        score: 2.0,
      },
      {
        id: 'q13',
        questionNumber: 'Bài 3',
        partType: 'TU_LUAN',
        topic: 'Hệ thức lượng trong tam giác vuông',
        subTopic: 'Ứng dụng thực tế tỉ số lượng giác và định lí Pitago',
        level: 'VAN_DUNG',
        competency: 'NLMHH',
        contentSnippet: 'Bài toán thực tế đo chiều cao cột cờ bằng bóng nắng và tính độ dài dây cáp néo giông bão.',
        fullQuestionText: 'Bài 3. (2,0 điểm) Một cột cờ đứng thẳng vuông góc với mặt đất. Tại một thời điểm nắng chiếu, bóng của cột cờ trên mặt đất dài 12 m và góc tạo bởi tia nắng mặt trời với mặt đất là 38°.\na) Tính chiều cao của cột cờ (làm tròn đến chữ số thập phân thứ nhất).\nb) Để tăng cường an toàn chống bão, người ta chằng một sợi dây cáp từ đỉnh cột cờ xuống một cọc sắt trên mặt đất cách chân cột cờ 15 m. Tính độ dài tối thiểu của sợi dây cáp đó.',
        expectedOutcome: 'Mô hình hoá tình huống thực tế thành tam giác vuông, sử dụng tỉ số lượng giác tan và định lí Pitago để giải quyết bài toán.',
        score: 2.0,
      },
      {
        id: 'q14',
        questionNumber: 'Bài 4',
        partType: 'TU_LUAN',
        topic: 'Đường tròn',
        subTopic: 'Tính chất hai tiếp tuyến cắt nhau và hệ thức hình học',
        level: 'VAN_DUNG',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Chứng minh tứ giác nội tiếp, tính chất hai tiếp tuyến cắt nhau và hệ thức tích độ dài đoạn thẳng.',
        fullQuestionText: 'Bài 4. (1,0 điểm) Cho đường tròn (O; R) và điểm A nằm ngoài đường tròn. Từ A kẻ hai tiếp tuyến AB, AC với đường tròn (B, C là các tiếp điểm). Gọi H là giao điểm của OA và BC.\na) Chứng minh bốn điểm A, B, O, C cùng thuộc một đường tròn và OA vuông góc với BC tại H.\nb) Kẻ đường kính BD của đường tròn (O). Đoạn thẳng AD cắt đường tròn (O) tại điểm thứ hai là E. Chứng minh AH . AO = AE . AD.',
        expectedOutcome: 'Vận dụng định nghĩa tiếp tuyến, tam giác đồng dạng và hệ thức lượng để chứng minh tính chất hình học phẳng.',
        score: 1.0,
      },
    ],
  },

  // ==========================================
  // KHỐI 8: ĐỀ KIỂM TRA ĐỊNH KÌ TOÁN 8 (CV 7991)
  // ==========================================
  {
    id: 'math8-hk1',
    name: 'Toán 8 - Học kì I (Cấu trúc CV 7991: TN 2đ - ĐS 1đ - TL 7đ)',
    grade: '8',
    examType: 'Cuối kì I',
    meta: {
      title: 'ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I - MÔN TOÁN LỚP 8',
      grade: '8',
      subject: 'Toán học',
      school: 'TRƯỜNG THCS',
      timeLimit: '90 phút',
      summary: 'Đề kiểm tra Toán 8 chuẩn Công văn 7991: Đa thức, Hằng đẳng thức, Tứ giác, Định lí Thalès. Phần I TN nhiều lựa chọn (2,0đ), Phần II Đúng - Sai (1,0đ), Phần III Tự luận (7,0đ).',
    },
    rawText: `TRƯỜNG THCS - ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I
MÔN: TOÁN 8 - THỜI GIAN LÀM BÀI: 90 PHÚT

PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn (2,0 điểm - Gồm 8 câu hỏi, mỗi câu 0,25 điểm).
Câu 1. Khai triển hằng đẳng thức (x + 2)^2 ta được:
A. x^2 + 4x + 4.    B. x^2 + 2x + 4.    C. x^2 + 4.    D. x^2 - 4x + 4.
Câu 2. Đơn thức nào sau đây đồng dạng với đơn thức -3x^2y?
A. 5x^2y.    B. 3xy^2.    C. -2x^2y^2.    D. 4xy.
Câu 3. Kết quả phân tích đa thức x^2 - 9 thành nhân tử là:
A. (x - 3)(x + 3).    B. (x - 3)^2.    C. (x + 3)^2.    D. x(x - 9).
Câu 4. Tứ giác có 4 cạnh bằng nhau là:
A. Hình thoi.    B. Hình chữ nhật.    C. Hình thang cân.    D. Hình bình hành.
Câu 5. Tổng số đo các góc của một tứ giác lồi bằng:
A. 360°.    B. 180°.    C. 270°.    D. 540°.
Câu 6. Hình chữ nhật có hai đường chéo vuông góc với nhau là:
A. Hình vuông.    B. Hình thoi.    C. Hình thang cân.    D. Hình bình hành.
Câu 7. Cho tam giác ABC, MN // BC (M thuộc AB, N thuộc AC). Biết AM = 2 cm, MB = 4 cm, AN = 3 cm. Độ dài đoạn thẳng NC là:
A. 6 cm.    B. 4 cm.    C. 5 cm.    D. 8 cm.
Câu 8. Một mảnh vườn hình chữ nhật có chu vi 40 m. Nếu chiều rộng là x (m) thì biểu thức biểu thị diện tích mảnh vườn là:
A. x(20 - x).    B. x(40 - x).    C. 20x.    D. 40x - x^2.

PHẦN II. Câu trắc nghiệm đúng sai (1,0 điểm - Gồm 2 câu hỏi, mỗi câu 0,5 điểm).
Câu 9. Cho biểu thức M = (x^2 - 4) / (x - 2) với x ≠ 2.
a) Điều kiện xác định của biểu thức M là x ≠ 2.
b) Khi x = 3 thì giá trị của biểu thức M bằng 5.
c) Rút gọn biểu thức M ta được kết quả M = x - 2.
d) Với mọi số nguyên x ≠ 2, M luôn nhận giá trị nguyên.

Câu 10. Cho tam giác ABC cân tại A, đường cao AH. Gọi M là trung điểm của AC, lấy điểm N đối xứng với H qua M.
a) Tứ giác AHCN là hình chữ nhật.
b) Đoạn thẳng HN bằng cạnh AC.
c) Tứ giác ABHN là hình bình hành.
d) Diện tích tam giác ABC bằng gấp đôi diện tích tứ giác AHCN.

PHẦN III. Tự luận (7,0 điểm - Gồm 4 bài toán trình bày lời giải chi tiết).
Bài 1. (2,0 điểm) Thực hiện phép tính và rút gọn đa thức:
a) 2x(x^2 - 3x + 1) - x^2(2x - 5).
b) Phân tích đa thức thành nhân tử: x^3 - 4x^2 + 4x và x^2 - y^2 + 4x + 4.
Bài 2. (2,0 điểm) Cho biểu thức P = (1 / (x - 2) + 2 / (x + 2) - 4 / (x^2 - 4)) : (1 / (x + 2)) với x ≠ ±2.
a) Rút gọn biểu thức P.
b) Tìm các giá trị nguyên của x để P nhận giá trị nguyên.
Bài 3. (2,0 điểm) Một phòng học hình chữ nhật có chiều dài lớn hơn chiều rộng 3 m. Nếu tăng chiều dài thêm 2 m và giảm chiều rộng 1 m thì diện tích phòng không đổi. Tính kích thước ban đầu của phòng học đó.
Bài 4. (1,0 điểm) Cho hình bình hành ABCD. Gọi E, F lần lượt là trung điểm của AB và CD. Chứng minh rằng tứ giác AECF là hình bình hành và đường chéo AC chia đôi đoạn thẳng EF.`,
    questions: [
      {
        id: 'q8_1',
        questionNumber: 'Câu 1',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Biểu thức đại số',
        subTopic: 'Hằng đẳng thức đáng nhớ',
        level: 'BIET',
        competency: 'NLGTTH',
        contentSnippet: 'Khai triển bình phương của một tổng.',
        fullQuestionText: 'Khai triển hằng đẳng thức (x + 2)^2 ta được:\nA. x^2 + 4x + 4.    B. x^2 + 2x + 4.    C. x^2 + 4.    D. x^2 - 4x + 4.',
        options: ['A. x^2 + 4x + 4', 'B. x^2 + 2x + 4', 'C. x^2 + 4', 'D. x^2 - 4x + 4'],
        expectedOutcome: 'Nhận biết và khai triển đúng bình phương của một tổng.',
        score: 0.25,
      },
      {
        id: 'q8_2',
        questionNumber: 'Câu 2',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Biểu thức đại số',
        subTopic: 'Đơn thức và đa thức nhiều biến',
        level: 'BIET',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Nhận biết đơn thức đồng dạng.',
        fullQuestionText: 'Đơn thức nào sau đây đồng dạng với đơn thức -3x^2y?\nA. 5x^2y.    B. 3xy^2.    C. -2x^2y^2.    D. 4xy.',
        options: ['A. 5x^2y', 'B. 3xy^2', 'C. -2x^2y^2', 'D. 4xy'],
        expectedOutcome: 'Nhận biết hai đơn thức đồng dạng có cùng phần biến.',
        score: 0.25,
      },
      {
        id: 'q8_3',
        questionNumber: 'Câu 3',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Biểu thức đại số',
        subTopic: 'Phân tích đa thức thành nhân tử',
        level: 'BIET',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Phân tích hiệu hai bình phương thành nhân tử.',
        fullQuestionText: 'Kết quả phân tích đa thức x^2 - 9 thành nhân tử là:\nA. (x - 3)(x + 3).    B. (x - 3)^2.    C. (x + 3)^2.    D. x(x - 9).',
        options: ['A. (x - 3)(x + 3)', 'B. (x - 3)^2', 'C. (x + 3)^2', 'D. x(x - 9)'],
        expectedOutcome: 'Vận dụng hằng đẳng thức hiệu hai bình phương để phân tích đa thức thành nhân tử.',
        score: 0.25,
      },
      {
        id: 'q8_4',
        questionNumber: 'Câu 4',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Tứ giác',
        subTopic: 'Hình thoi',
        level: 'BIET',
        competency: 'NLGTTH',
        contentSnippet: 'Dấu hiệu nhận biết hình thoi.',
        fullQuestionText: 'Tứ giác có 4 cạnh bằng nhau là:\nA. Hình thoi.    B. Hình chữ nhật.    C. Hình thang cân.    D. Hình bình hành.',
        options: ['A. Hình thoi', 'B. Hình chữ nhật', 'C. Hình thang cân', 'D. Hình bình hành'],
        expectedOutcome: 'Nhận biết định nghĩa và dấu hiệu nhận biết hình thoi.',
        score: 0.25,
      },
      {
        id: 'q8_5',
        questionNumber: 'Câu 5',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Tứ giác',
        subTopic: 'Tổng các góc trong tứ giác',
        level: 'BIET',
        competency: 'NLGTTH',
        contentSnippet: 'Tổng số đo các góc của tứ giác lồi.',
        fullQuestionText: 'Tổng số đo các góc của một tứ giác lồi bằng:\nA. 360°.    B. 180°.    C. 270°.    D. 540°.',
        options: ['A. 360°', 'B. 180°', 'C. 270°', 'D. 540°'],
        expectedOutcome: 'Nhận biết định lí tổng các góc của một tứ giác.',
        score: 0.25,
      },
      {
        id: 'q8_6',
        questionNumber: 'Câu 6',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Tứ giác',
        subTopic: 'Hình vuông',
        level: 'HIEU',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Dấu hiệu nhận biết hình vuông từ hình chữ nhật.',
        fullQuestionText: 'Hình chữ nhật có hai đường chéo vuông góc với nhau là:\nA. Hình vuông.    B. Hình thoi.    C. Hình thang cân.    D. Hình bình hành.',
        options: ['A. Hình vuông', 'B. Hình thoi', 'C. Hình thang cân', 'D. Hình bình hành'],
        expectedOutcome: 'Hiểu dấu hiệu nhận biết hình vuông từ hình chữ nhật có hai đường chéo vuông góc.',
        score: 0.25,
      },
      {
        id: 'q8_7',
        questionNumber: 'Câu 7',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Định lí Thalès trong tam giác',
        subTopic: 'Định lí Thalès thuận',
        level: 'HIEU',
        competency: 'NLGQVĐ',
        contentSnippet: 'Tính độ dài đoạn thẳng bằng định lí Thalès.',
        fullQuestionText: 'Cho tam giác ABC, MN // BC (M thuộc AB, N thuộc AC). Biết AM = 2 cm, MB = 4 cm, AN = 3 cm. Độ dài đoạn thẳng NC là:\nA. 6 cm.    B. 4 cm.    C. 5 cm.    D. 8 cm.',
        options: ['A. 6 cm', 'B. 4 cm', 'C. 5 cm', 'D. 8 cm'],
        expectedOutcome: 'Vận dụng định lí Thalès để lập tỉ số và tính độ dài đoạn thẳng.',
        score: 0.25,
      },
      {
        id: 'q8_8',
        questionNumber: 'Câu 8',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Biểu thức đại số',
        subTopic: 'Ứng dụng thực tế của biểu thức đại số',
        level: 'HIEU',
        competency: 'NLMHH',
        contentSnippet: 'Mô hình hoá diện tích mảnh vườn hình chữ nhật theo chiều rộng.',
        fullQuestionText: 'Một mảnh vườn hình chữ nhật có chu vi 40 m. Nếu chiều rộng là x (m) thì biểu thức biểu thị diện tích mảnh vườn là:\nA. x(20 - x).    B. x(40 - x).    C. 20x.    D. 40x - x^2.',
        options: ['A. x(20 - x)', 'B. x(40 - x)', 'C. 20x', 'D. 40x - x^2'],
        expectedOutcome: 'Mô hình hoá đại lượng thực tế bằng biểu thức đại số biểu thị diện tích.',
        score: 0.25,
      },
      {
        id: 'q8_9',
        questionNumber: 'Câu 9',
        partType: 'TN_DUNG_SAI',
        topic: 'Phân thức đại số',
        subTopic: 'Rút gọn phân thức đại số',
        level: 'HIEU',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Xét tính đúng sai về điều kiện và giá trị phân thức.',
        fullQuestionText: 'Cho biểu thức M = (x^2 - 4) / (x - 2) với x ≠ 2.\na) Điều kiện xác định của biểu thức M là x ≠ 2.\nb) Khi x = 3 thì giá trị của biểu thức M bằng 5.\nc) Rút gọn biểu thức M ta được kết quả M = x - 2.\nd) Với mọi số nguyên x ≠ 2, M luôn nhận giá trị nguyên.',
        options: [
          'a) Điều kiện xác định của biểu thức M là x ≠ 2.',
          'b) Khi x = 3 thì giá trị của biểu thức M bằng 5.',
          'c) Rút gọn biểu thức M ta được kết quả M = x - 2.',
          'd) Với mọi số nguyên x ≠ 2, M luôn nhận giá trị nguyên.',
        ],
        expectedOutcome: 'Xác định điều kiện và rút gọn phân thức đại số bậc hai.',
        score: 0.5,
      },
      {
        id: 'q8_10',
        questionNumber: 'Câu 10',
        partType: 'TN_DUNG_SAI',
        topic: 'Tứ giác',
        subTopic: 'Hình chữ nhật và hình bình hành',
        level: 'HIEU',
        competency: 'NLGTTH',
        contentSnippet: 'Tính chất đối xứng và hình chữ nhật trong tam giác cân.',
        fullQuestionText: 'Cho tam giác ABC cân tại A, đường cao AH. Gọi M là trung điểm của AC, lấy điểm N đối xứng với H qua M.\na) Tứ giác AHCN là hình chữ nhật.\nb) Đoạn thẳng HN bằng cạnh AC.\nc) Tứ giác ABHN là hình bình hành.\nd) Diện tích tam giác ABC bằng gấp đôi diện tích tứ giác AHCN.',
        options: [
          'a) Tứ giác AHCN là hình chữ nhật.',
          'b) Đoạn thẳng HN bằng cạnh AC.',
          'c) Tứ giác ABHN là hình bình hành.',
          'd) Diện tích tam giác ABC bằng gấp đôi diện tích tứ giác AHCN.',
        ],
        expectedOutcome: 'Chứng minh tứ giác đặc biệt bằng tính chất đường trung bình và đối xứng tâm.',
        score: 0.5,
      },
      {
        id: 'q8_11',
        questionNumber: 'Bài 1',
        partType: 'TU_LUAN',
        topic: 'Biểu thức đại số',
        subTopic: 'Phép nhân đa thức và phân tích thành nhân tử',
        level: 'HIEU',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Thực hiện phép tính nhân đa thức và phân tích đa thức thành nhân tử.',
        fullQuestionText: 'Bài 1. (2,0 điểm) Thực hiện phép tính và rút gọn đa thức:\na) 2x(x^2 - 3x + 1) - x^2(2x - 5).\nb) Phân tích đa thức thành nhân tử: x^3 - 4x^2 + 4x và x^2 - y^2 + 4x + 4.',
        expectedOutcome: 'Thực hiện phép tính đa thức chính xác và kết hợp các phương pháp đặt nhân tử chung, hằng đẳng thức.',
        score: 2.0,
      },
      {
        id: 'q8_12',
        questionNumber: 'Bài 2',
        partType: 'TU_LUAN',
        topic: 'Phân thức đại số',
        subTopic: 'Cộng trừ phân thức đại số',
        level: 'VAN_DUNG',
        competency: 'NLGQVĐ',
        contentSnippet: 'Rút gọn biểu thức phân thức và tìm giá trị nguyên của biến.',
        fullQuestionText: 'Bài 2. (2,0 điểm) Cho biểu thức P = (1 / (x - 2) + 2 / (x + 2) - 4 / (x^2 - 4)) : (1 / (x + 2)) với x ≠ ±2.\na) Rút gọn biểu thức P.\nb) Tìm các giá trị nguyên của x để P nhận giá trị nguyên.',
        expectedOutcome: 'Quy đồng mẫu thức nhiều phân thức đại số, rút gọn và giải bài toán ước số nguyên.',
        score: 2.0,
      },
      {
        id: 'q8_13',
        questionNumber: 'Bài 3',
        partType: 'TU_LUAN',
        topic: 'Phương trình bậc nhất một ẩn',
        subTopic: 'Giải bài toán bằng cách lập phương trình',
        level: 'VAN_DUNG',
        competency: 'NLMHH',
        contentSnippet: 'Bài toán thực tế kích thước phòng học hình chữ nhật và lập phương trình diện tích.',
        fullQuestionText: 'Bài 3. (2,0 điểm) Một phòng học hình chữ nhật có chiều dài lớn hơn chiều rộng 3 m. Nếu tăng chiều dài thêm 2 m và giảm chiều rộng 1 m thì diện tích phòng không đổi. Tính kích thước ban đầu của phòng học đó.',
        expectedOutcome: 'Mô hình hoá tình huống thực tế diện tích hình chữ nhật bằng phương trình bậc nhất một ẩn.',
        score: 2.0,
      },
      {
        id: 'q8_14',
        questionNumber: 'Bài 4',
        partType: 'TU_LUAN',
        topic: 'Tứ giác',
        subTopic: 'Hình bình hành',
        level: 'VAN_DUNG',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Chứng minh tứ giác là hình bình hành và tính chất giao điểm hai đường chéo.',
        fullQuestionText: 'Bài 4. (1,0 điểm) Cho hình bình hành ABCD. Gọi E, F lần lượt là trung điểm của AB và CD. Chứng minh rằng tứ giác AECF là hình bình hành và đường chéo AC chia đôi đoạn thẳng EF.',
        expectedOutcome: 'Vận dụng tính chất hai cạnh đối song song và bằng nhau để chứng minh hình bình hành.',
        score: 1.0,
      },
    ],
  },

  // ==========================================
  // KHỐI 7: ĐỀ KIỂM TRA ĐỊNH KÌ TOÁN 7 (CV 7991)
  // ==========================================
  {
    id: 'math7-hk1',
    name: 'Toán 7 - Học kì I (Cấu trúc CV 7991: TN 2đ - ĐS 1đ - TL 7đ)',
    grade: '7',
    examType: 'Cuối kì I',
    meta: {
      title: 'ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I - MÔN TOÁN LỚP 7',
      grade: '7',
      subject: 'Toán học',
      school: 'TRƯỜNG THCS',
      timeLimit: '90 phút',
      summary: 'Đề kiểm tra Toán 7 chuẩn Công văn 7991: Số hữu tỉ, Số thực, Tam giác bằng nhau. Phần I TN nhiều lựa chọn (2,0đ), Phần II Đúng - Sai (1,0đ), Phần III Tự luận (7,0đ).',
    },
    rawText: `TRƯỜNG THCS - ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I
MÔN: TOÁN 7 - THỜI GIAN LÀM BÀI: 90 PHÚT

PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn (2,0 điểm - Gồm 8 câu hỏi, mỗi câu 0,25 điểm).
Câu 1. Số đối của số hữu tỉ -3/5 là:
A. 3/5.    B. -5/3.    C. 5/3.    D. -3/-5.
Câu 2. Kết quả của phép tính (2/3)^2 là:
A. 4/9.    B. 4/6.    C. 2/9.    D. 8/27.
Câu 3. Căn bậc hai số học của 25 là:
A. 5.    B. -5.    C. ±5.    D. 625.
Câu 4. Cho hai góc kề bù xOy và yOz, biết góc xOy = 70°. Số đo của góc yOz là:
A. 110°.    B. 70°.    C. 90°.    D. 180°.
Câu 5. Hai góc đối đỉnh có tính chất:
A. Bằng nhau.    B. Bù nhau.    C. Phụ nhau.    D. Tổng bằng 180°.
Câu 6. Nếu tam giác ABC bằng tam giác DEF thì khẳng định nào sau đây đúng?
A. AB = DE.    B. BC = DF.    C. AC = EF.    D. Góc A = Góc E.
Câu 7. Tổng ba góc trong một tam giác bằng:
A. 180°.    B. 360°.    C. 90°.    D. 270°.
Câu 8. Giá tiền một chiếc áo sau khi giảm giá 15% là 255 000 đồng. Giá tiền ban đầu của chiếc áo là:
A. 300 000 đồng.    B. 280 000 đồng.    C. 320 000 đồng.    D. 290 000 đồng.

PHẦN II. Câu trắc nghiệm đúng sai (1,0 điểm - Gồm 2 câu hỏi, mỗi câu 0,5 điểm).
Câu 9. Cho các số thực: x = -1,5; y = 2/3; z = √2.
a) x là số hữu tỉ âm.
b) y biểu diễn được dưới dạng số thập phân hữu hạn.
c) z là số vô tỉ.
d) Ta có quan hệ thứ tự: x < y < z.

Câu 10. Cho tam giác ABC vuông tại A có góc B = 60°.
a) Số đo góc C bằng 30°.
b) Cạnh BC là cạnh lớn nhất của tam giác ABC.
c) Tam giác ABC có góc A là góc vuông và hai góc còn lại bù nhau.
d) Kẻ AH vuông góc với BC thì góc BAH = 30°.

PHẦN III. Tự luận (7,0 điểm - Gồm 4 bài toán trình bày lời giải chi tiết).
Bài 1. (2,0 điểm) Thực hiện phép tính (hợp lí nếu có thể):
a) (-3/4) + 1/2 : (-5/6).
b) 3/7 . (-2/5) + 3/7 . (-3/5) + (2/3)^0.
Bài 2. (2,0 điểm) Tìm số hữu tỉ x, biết:
a) 3/4 + 1/4 . x = -1/2.
b) |x - 1/3| = 5/6.
Bài 3. (2,0 điểm) Ba lớp 7A, 7B, 7C tham gia trồng cây cho trường. Biết số cây trồng của ba lớp lần lượt tỉ lệ với các số 3; 4; 5 và tổng số cây trồng được của cả ba lớp là 120 cây. Tính số cây mỗi lớp trồng được.
Bài 4. (1,0 điểm) Cho tam giác ABC có AB = AC. Gọi M là trung điểm của đoạn thẳng BC.
a) Chứng minh tam giác ABM bằng tam giác ACM.
b) Chứng minh AM vuông góc với BC.`,
    questions: [
      {
        id: 'q7_1',
        questionNumber: 'Câu 1',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Số hữu tỉ',
        subTopic: 'Tập hợp các số hữu tỉ',
        level: 'BIET',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Tìm số đối của số hữu tỉ.',
        fullQuestionText: 'Số đối của số hữu tỉ -3/5 là:\nA. 3/5.    B. -5/3.    C. 5/3.    D. -3/-5.',
        options: ['A. 3/5', 'B. -5/3', 'C. 5/3', 'D. -3/-5'],
        expectedOutcome: 'Nhận biết số đối của một số hữu tỉ.',
        score: 0.25,
      },
      {
        id: 'q7_2',
        questionNumber: 'Câu 2',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Số hữu tỉ',
        subTopic: 'Luỹ thừa của một số hữu tỉ',
        level: 'BIET',
        competency: 'NLGTTH',
        contentSnippet: 'Tính luỹ thừa bậc hai của số hữu tỉ.',
        fullQuestionText: 'Kết quả của phép tính (2/3)^2 là:\nA. 4/9.    B. 4/6.    C. 2/9.    D. 8/27.',
        options: ['A. 4/9', 'B. 4/6', 'C. 2/9', 'D. 8/27'],
        expectedOutcome: 'Nhận biết và tính luỹ thừa cơ bản của phân số.',
        score: 0.25,
      },
      {
        id: 'q7_3',
        questionNumber: 'Câu 3',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Số thực',
        subTopic: 'Căn bậc hai số học của một số thực',
        level: 'BIET',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Tìm căn bậc hai số học của số dương.',
        fullQuestionText: 'Căn bậc hai số học của 25 là:\nA. 5.    B. -5.    C. ±5.    D. 625.',
        options: ['A. 5', 'B. -5', 'C. ±5', 'D. 625'],
        expectedOutcome: 'Nhận biết khái niệm căn bậc hai số học.',
        score: 0.25,
      },
      {
        id: 'q7_4',
        questionNumber: 'Câu 4',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Góc và đường thẳng song song',
        subTopic: 'Hai góc kề bù',
        level: 'HIEU',
        competency: 'NLGQVĐ',
        contentSnippet: 'Tính số đo góc dựa vào quan hệ kề bù.',
        fullQuestionText: 'Cho hai góc kề bù xOy và yOz, biết góc xOy = 70°. Số đo của góc yOz là:\nA. 110°.    B. 70°.    C. 90°.    D. 180°.',
        options: ['A. 110°', 'B. 70°', 'C. 90°', 'D. 180°'],
        expectedOutcome: 'Vận dụng tính chất hai góc kề bù có tổng số đo bằng 180°.',
        score: 0.25,
      },
      {
        id: 'q7_5',
        questionNumber: 'Câu 5',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Góc và đường thẳng song song',
        subTopic: 'Hai góc đối đỉnh',
        level: 'BIET',
        competency: 'NLGTTH',
        contentSnippet: 'Tính chất hai góc đối đỉnh.',
        fullQuestionText: 'Hai góc đối đỉnh có tính chất:\nA. Bằng nhau.    B. Bù nhau.    C. Phụ nhau.    D. Tổng bằng 180°.',
        options: ['A. Bằng nhau', 'B. Bù nhau', 'C. Phụ nhau', 'D. Tổng bằng 180°'],
        expectedOutcome: 'Nhận biết định lí hai góc đối đỉnh bằng nhau.',
        score: 0.25,
      },
      {
        id: 'q7_6',
        questionNumber: 'Câu 6',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Tam giác bằng nhau',
        subTopic: 'Định nghĩa hai tam giác bằng nhau',
        level: 'BIET',
        competency: 'NLGTTH',
        contentSnippet: 'Xác định các cặp cạnh tương ứng bằng nhau.',
        fullQuestionText: 'Nếu tam giác ABC bằng tam giác DEF thì khẳng định nào sau đây đúng?\nA. AB = DE.    B. BC = DF.    C. AC = EF.    D. Góc A = Góc E.',
        options: ['A. AB = DE', 'B. BC = DF', 'C. AC = EF', 'D. Góc A = Góc E'],
        expectedOutcome: 'Nhận biết các cặp cạnh và góc tương ứng bằng nhau giữa hai tam giác bằng nhau.',
        score: 0.25,
      },
      {
        id: 'q7_7',
        questionNumber: 'Câu 7',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Tam giác bằng nhau',
        subTopic: 'Tổng ba góc của một tam giác',
        level: 'BIET',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Định lí tổng ba góc trong một tam giác.',
        fullQuestionText: 'Tổng ba góc trong một tam giác bằng:\nA. 180°.    B. 360°.    C. 90°.    D. 270°.',
        options: ['A. 180°', 'B. 360°', 'C. 90°', 'D. 270°'],
        expectedOutcome: 'Nhận biết định lí tổng các góc trong một tam giác.',
        score: 0.25,
      },
      {
        id: 'q7_8',
        questionNumber: 'Câu 8',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Số hữu tỉ',
        subTopic: 'Bài toán tỉ số phần trăm thực tế',
        level: 'HIEU',
        competency: 'NLMHH',
        contentSnippet: 'Bài toán giảm giá phần trăm tìm giá gốc chiếc áo.',
        fullQuestionText: 'Giá tiền một chiếc áo sau khi giảm giá 15% là 255 000 đồng. Giá tiền ban đầu của chiếc áo là:\nA. 300 000 đồng.    B. 280 000 đồng.    C. 320 000 đồng.    D. 290 000 đồng.',
        options: ['A. 300 000 đồng', 'B. 280 000 đồng', 'C. 320 000 đồng', 'D. 290 000 đồng'],
        expectedOutcome: 'Mô hình hoá bài toán thực tế giảm giá phần trăm để tìm giá ban đầu.',
        score: 0.25,
      },
      {
        id: 'q7_9',
        questionNumber: 'Câu 9',
        partType: 'TN_DUNG_SAI',
        topic: 'Số thực',
        subTopic: 'Tập hợp số hữu tỉ và số vô tỉ',
        level: 'HIEU',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Phân loại số hữu tỉ, số vô tỉ và thứ tự trên trục số.',
        fullQuestionText: 'Cho các số thực: x = -1,5; y = 2/3; z = √2.\na) x là số hữu tỉ âm.\nb) y biểu diễn được dưới dạng số thập phân hữu hạn.\nc) z là số vô tỉ.\nd) Ta có quan hệ thứ tự: x < y < z.',
        options: [
          'a) x là số hữu tỉ âm.',
          'b) y biểu diễn được dưới dạng số thập phân hữu hạn.',
          'c) z là số vô tỉ.',
          'd) Ta có quan hệ thứ tự: x < y < z.',
        ],
        expectedOutcome: 'Phân biệt số hữu tỉ, số thập phân vô hạn tuần hoàn, số vô tỉ và so sánh số thực.',
        score: 0.5,
      },
      {
        id: 'q7_10',
        questionNumber: 'Câu 10',
        partType: 'TN_DUNG_SAI',
        topic: 'Tam giác bằng nhau',
        subTopic: 'Góc và cạnh trong tam giác vuông',
        level: 'HIEU',
        competency: 'NLGTTH',
        contentSnippet: 'Tính chất góc nhọn phụ nhau trong tam giác vuông.',
        fullQuestionText: 'Cho tam giác ABC vuông tại A có góc B = 60°.\na) Số đo góc C bằng 30°.\nb) Cạnh BC là cạnh lớn nhất của tam giác ABC.\nc) Tam giác ABC có góc A là góc vuông và hai góc còn lại bù nhau.\nd) Kẻ AH vuông góc với BC thì góc BAH = 30°.',
        options: [
          'a) Số đo góc C bằng 30°.',
          'b) Cạnh BC là cạnh lớn nhất của tam giác ABC.',
          'c) Tam giác ABC có góc A là góc vuông và hai góc còn lại bù nhau.',
          'd) Kẻ AH vuông góc với BC thì góc BAH = 30°.',
        ],
        expectedOutcome: 'Tính số đo góc trong tam giác vuông và quan hệ giữa cạnh và góc đối diện.',
        score: 0.5,
      },
      {
        id: 'q7_11',
        questionNumber: 'Bài 1',
        partType: 'TU_LUAN',
        topic: 'Số hữu tỉ',
        subTopic: 'Các phép tính cộng, trừ, nhân, chia số hữu tỉ',
        level: 'HIEU',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Thực hiện phép tính trên tập hợp số hữu tỉ.',
        fullQuestionText: 'Bài 1. (2,0 điểm) Thực hiện phép tính (hợp lí nếu có thể):\na) (-3/4) + 1/2 : (-5/6).\nb) 3/7 . (-2/5) + 3/7 . (-3/5) + (2/3)^0.',
        expectedOutcome: 'Vận dụng thứ tự thực hiện phép tính và tính chất phân phối của phép nhân đối với phép cộng.',
        score: 2.0,
      },
      {
        id: 'q7_12',
        questionNumber: 'Bài 2',
        partType: 'TU_LUAN',
        topic: 'Số hữu tỉ',
        subTopic: 'Tìm x trong đẳng thức và giá trị tuyệt đối',
        level: 'HIEU',
        competency: 'NLGQVĐ',
        contentSnippet: 'Tìm x chứa phân số và biểu thức giá trị tuyệt đối.',
        fullQuestionText: 'Bài 2. (2,0 điểm) Tìm số hữu tỉ x, biết:\na) 3/4 + 1/4 . x = -1/2.\nb) |x - 1/3| = 5/6.',
        expectedOutcome: 'Giải tìm ẩn số x trong phương trình bậc nhất và định nghĩa giá trị tuyệt đối.',
        score: 2.0,
      },
      {
        id: 'q7_13',
        questionNumber: 'Bài 3',
        partType: 'TU_LUAN',
        topic: 'Tỉ lệ thức và dãy tỉ số bằng nhau',
        subTopic: 'Tính chất của dãy tỉ số bằng nhau',
        level: 'VAN_DUNG',
        competency: 'NLMHH',
        contentSnippet: 'Bài toán thực tế chia số cây trồng theo dãy tỉ số bằng nhau.',
        fullQuestionText: 'Bài 3. (2,0 điểm) Ba lớp 7A, 7B, 7C tham gia trồng cây cho trường. Biết số cây trồng của ba lớp lần lượt tỉ lệ với các số 3; 4; 5 và tổng số cây trồng được của cả ba lớp là 120 cây. Tính số cây mỗi lớp trồng được.',
        expectedOutcome: 'Vận dụng tính chất của dãy tỉ số bằng nhau để giải bài toán thực tế phân chia tỉ lệ.',
        score: 2.0,
      },
      {
        id: 'q7_14',
        questionNumber: 'Bài 4',
        partType: 'TU_LUAN',
        topic: 'Tam giác bằng nhau',
        subTopic: 'Trường hợp bằng nhau cạnh - cạnh - cạnh',
        level: 'VAN_DUNG',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Chứng minh hai tam giác bằng nhau và đường trung tuyến đồng thời là đường cao.',
        fullQuestionText: 'Bài 4. (1,0 điểm) Cho tam giác ABC có AB = AC. Gọi M là trung điểm của đoạn thẳng BC.\na) Chứng minh tam giác ABM bằng tam giác ACM.\nb) Chứng minh AM vuông góc với BC.',
        expectedOutcome: 'Vận dụng trường hợp bằng nhau thứ nhất (c.c.c) để suy ra các góc tương ứng bằng nhau và chứng minh vuông góc.',
        score: 1.0,
      },
    ],
  },

  // ==========================================
  // KHỐI 6: ĐỀ KIỂM TRA ĐỊNH KÌ TOÁN 6 (CV 7991)
  // ==========================================
  {
    id: 'math6-hk1',
    name: 'Toán 6 - Học kì I (Cấu trúc CV 7991: TN 2đ - ĐS 1đ - TL 7đ)',
    grade: '6',
    examType: 'Cuối kì I',
    meta: {
      title: 'ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I - MÔN TOÁN LỚP 6',
      grade: '6',
      subject: 'Toán học',
      school: 'TRƯỜNG THCS',
      timeLimit: '90 phút',
      summary: 'Đề kiểm tra Toán 6 chuẩn Công văn 7991: Số tự nhiên, Số nguyên, Hình học trực quan. Phần I TN nhiều lựa chọn (2,0đ), Phần II Đúng - Sai (1,0đ), Phần III Tự luận (7,0đ).',
    },
    rawText: `TRƯỜNG THCS - ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I
MÔN: TOÁN 6 - THỜI GIAN LÀM BÀI: 90 PHÚT

PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn (2,0 điểm - Gồm 8 câu hỏi, mỗi câu 0,25 điểm).
Câu 1. Tập hợp các số tự nhiên N* không chứa phần tử nào sau đây?
A. 0.    B. 1.    C. 2.    D. 10.
Câu 2. Số nào sau đây chia hết cho cả 2, 3 và 5?
A. 30.    B. 25.    C. 40.    D. 35.
Câu 3. Kết quả của phép tính (-15) + (-8) là:
A. -23.    B. 23.    C. -7.    D. 7.
Câu 4. Trong các hình sau, hình nào có 3 cạnh bằng nhau và 3 góc bằng nhau?
A. Tam giác đều.    B. Tam giác vuông.    C. Tam giác cân.    D. Hình thoi.
Câu 5. Hình thoi có độ dài hai đường chéo là 6 cm và 8 cm thì diện tích của nó là:
A. 24 cm^2.    B. 48 cm^2.    C. 14 cm^2.    D. 28 cm^2.
Câu 6. Thứ tự thực hiện phép tính đối với biểu thức có dấu ngoặc là:
A. () -> [] -> {}.    B. {} -> [] -> ().    C. [] -> () -> {}.    D. Tuỳ ý.
Câu 7. Tập hợp các ước của 6 là:
A. {1; 2; 3; 6}.    B. {0; 1; 2; 3; 6}.    C. {1; 2; 3}.    D. {6; 12; 18}.
Câu 8. Nhiệt độ lúc 6 giờ sáng tại Sa Pa là -2°C, đến 12 giờ trưa nhiệt độ tăng thêm 5°C. Nhiệt độ lúc 12 giờ trưa là:
A. 3°C.    B. -7°C.    C. 7°C.    D. -3°C.

PHẦN II. Câu trắc nghiệm đúng sai (1,0 điểm - Gồm 2 câu hỏi, mỗi câu 0,5 điểm).
Câu 9. Cho tập hợp số nguyên A = {-5; -2; 0; 3; 7}.
a) -5 là số nguyên âm nhỏ nhất trong tập hợp A.
b) Tập hợp A có đúng 2 số nguyên dương.
c) Số đối của số -2 là 2.
d) Tổng của tất cả các phần tử trong tập hợp A bằng 5.

Câu 10. Một mảnh sân chơi hình chữ nhật có chiều dài 15 m và chiều rộng 8 m.
a) Chu vi của mảnh sân chơi là 46 m.
b) Diện tích mảnh sân chơi là 120 m^2.
c) Người ta lát sân bằng các viên gạch hình vuông cạnh 50 cm thì cần đúng 480 viên gạch.
d) Nếu tăng mỗi cạnh thêm 2 m thì diện tích tăng thêm 50 m^2.

PHẦN III. Tự luận (7,0 điểm - Gồm 4 bài toán trình bày lời giải chi tiết).
Bài 1. (2,0 điểm) Thực hiện phép tính (hợp lí nếu có thể):
a) 28 . 76 + 24 . 28 - 280.
b) 150 : [25 . (18 - 4^2)] + (-12).
Bài 2. (2,0 điểm) Tìm số nguyên x, biết:
a) 3x - 17 = 28.
b) 25 - (x + 5) = -15.
Bài 3. (2,0 điểm) Một đội tình nguyện gồm 48 nam và 72 nữ. Đội muốn chia thành các nhóm sao cho số nam và số nữ ở mỗi nhóm đều bằng nhau.
a) Hỏi có thể chia được nhiều nhất thành bao nhiêu nhóm?
b) Khi đó, mỗi nhóm có bao nhiêu nam và bao nhiêu nữ?
Bài 4. (1,0 điểm) Một mảnh vườn hình chữ nhật có chiều dài 20 m, chiều rộng 12 m. Người ta làm một lối đi xung quanh vườn rộng 1 m, phần đất còn lại dùng để trồng rau. Tính diện tích phần đất dùng để trồng rau.`,
    questions: [
      {
        id: 'q6_1',
        questionNumber: 'Câu 1',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Số tự nhiên',
        subTopic: 'Tập hợp các số tự nhiên N và N*',
        level: 'BIET',
        competency: 'NLGTTH',
        contentSnippet: 'Nhận biết các phần tử của tập hợp số tự nhiên khác 0.',
        fullQuestionText: 'Tập hợp các số tự nhiên N* không chứa phần tử nào sau đây?\nA. 0.    B. 1.    C. 2.    D. 10.',
        options: ['A. 0', 'B. 1', 'C. 2', 'D. 10'],
        expectedOutcome: 'Nhận biết tập hợp số tự nhiên khác không N*.',
        score: 0.25,
      },
      {
        id: 'q6_2',
        questionNumber: 'Câu 2',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Tính chia hết trong tập hợp các số tự nhiên',
        subTopic: 'Dấu hiệu chia hết cho 2, cho 3, cho 5',
        level: 'BIET',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Dấu hiệu chia hết đồng thời cho 2, 3 và 5.',
        fullQuestionText: 'Số nào sau đây chia hết cho cả 2, 3 và 5?\nA. 30.    B. 25.    C. 40.    D. 35.',
        options: ['A. 30', 'B. 25', 'C. 40', 'D. 35'],
        expectedOutcome: 'Vận dụng kết hợp các dấu hiệu chia hết cho 2, 3, 5.',
        score: 0.25,
      },
      {
        id: 'q6_3',
        questionNumber: 'Câu 3',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Số nguyên',
        subTopic: 'Phép cộng hai số nguyên cùng dấu',
        level: 'BIET',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Cộng hai số nguyên âm.',
        fullQuestionText: 'Kết quả của phép tính (-15) + (-8) là:\nA. -23.    B. 23.    C. -7.    D. 7.',
        options: ['A. -23', 'B. 23', 'C. -7', 'D. 7'],
        expectedOutcome: 'Thực hiện cộng hai số nguyên âm đúng quy tắc.',
        score: 0.25,
      },
      {
        id: 'q6_4',
        questionNumber: 'Câu 4',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Hình học trực quan',
        subTopic: 'Tam giác đều',
        level: 'BIET',
        competency: 'NLGTTH',
        contentSnippet: 'Đặc điểm cạnh và góc của tam giác đều.',
        fullQuestionText: 'Trong các hình sau, hình nào có 3 cạnh bằng nhau và 3 góc bằng nhau?\nA. Tam giác đều.    B. Tam giác vuông.    C. Tam giác cân.    D. Hình thoi.',
        options: ['A. Tam giác đều', 'B. Tam giác vuông', 'C. Tam giác cân', 'D. Hình thoi'],
        expectedOutcome: 'Nhận biết đặc điểm nhận dạng của tam giác đều.',
        score: 0.25,
      },
      {
        id: 'q6_5',
        questionNumber: 'Câu 5',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Hình học trực quan',
        subTopic: 'Chu vi và diện tích hình thoi',
        level: 'HIEU',
        competency: 'NLGQVĐ',
        contentSnippet: 'Tính diện tích hình thoi theo độ dài hai đường chéo.',
        fullQuestionText: 'Hình thoi có độ dài hai đường chéo là 6 cm và 8 cm thì diện tích của nó là:\nA. 24 cm^2.    B. 48 cm^2.    C. 14 cm^2.    D. 28 cm^2.',
        options: ['A. 24 cm^2', 'B. 48 cm^2', 'C. 14 cm^2', 'D. 28 cm^2'],
        expectedOutcome: 'Vận dụng công thức diện tích hình thoi S = (d1 . d2) / 2.',
        score: 0.25,
      },
      {
        id: 'q6_6',
        questionNumber: 'Câu 6',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Số tự nhiên',
        subTopic: 'Thứ tự thực hiện các phép tính',
        level: 'BIET',
        competency: 'NLGTTH',
        contentSnippet: 'Quy tắc thứ tự dấu ngoặc tròn, vuông, nhọn.',
        fullQuestionText: 'Thứ tự thực hiện phép tính đối với biểu thức có dấu ngoặc là:\nA. () -> [] -> {}.    B. {} -> [] -> ().    C. [] -> () -> {}.    D. Tuỳ ý.',
        options: ['A. () -> [] -> {}', 'B. {} -> [] -> ()', 'C. [] -> () -> {}', 'D. Tuỳ ý'],
        expectedOutcome: 'Nhận biết đúng thứ tự thực hiện phép tính có dấu ngoặc.',
        score: 0.25,
      },
      {
        id: 'q6_7',
        questionNumber: 'Câu 7',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Tính chia hết trong tập hợp các số tự nhiên',
        subTopic: 'Ước và bội',
        level: 'BIET',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Tìm tập hợp ước của số tự nhiên.',
        fullQuestionText: 'Tập hợp các ước của 6 là:\nA. {1; 2; 3; 6}.    B. {0; 1; 2; 3; 6}.    C. {1; 2; 3}.    D. {6; 12; 18}.',
        options: ['A. {1; 2; 3; 6}', 'B. {0; 1; 2; 3; 6}', 'C. {1; 2; 3}', 'D. {6; 12; 18}'],
        expectedOutcome: 'Liệt kê đầy đủ các ước số tự nhiên của một số.',
        score: 0.25,
      },
      {
        id: 'q6_8',
        questionNumber: 'Câu 8',
        partType: 'TN_NHIEU_LUA_CHON',
        topic: 'Số nguyên',
        subTopic: 'Ứng dụng thực tế của số nguyên',
        level: 'HIEU',
        competency: 'NLMHH',
        contentSnippet: 'Bài toán thực tế biến thiên nhiệt độ Sa Pa sử dụng số nguyên.',
        fullQuestionText: 'Nhiệt độ lúc 6 giờ sáng tại Sa Pa là -2°C, đến 12 giờ trưa nhiệt độ tăng thêm 5°C. Nhiệt độ lúc 12 giờ trưa là:\nA. 3°C.    B. -7°C.    C. 7°C.    D. -3°C.',
        options: ['A. 3°C', 'B. -7°C', 'C. 7°C', 'D. -3°C'],
        expectedOutcome: 'Mô hình hoá tình huống đo nhiệt độ thực tế bằng phép tính cộng số nguyên.',
        score: 0.25,
      },
      {
        id: 'q6_9',
        questionNumber: 'Câu 9',
        partType: 'TN_DUNG_SAI',
        topic: 'Số nguyên',
        subTopic: 'Tập hợp các số nguyên và số đối',
        level: 'HIEU',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Xác định số nguyên âm, số đối và tổng các số nguyên.',
        fullQuestionText: 'Cho tập hợp số nguyên A = {-5; -2; 0; 3; 7}.\na) -5 là số nguyên âm nhỏ nhất trong tập hợp A.\nb) Tập hợp A có đúng 2 số nguyên dương.\nc) Số đối của số -2 là 2.\nd) Tổng của tất cả các phần tử trong tập hợp A bằng 5.',
        options: [
          'a) -5 là số nguyên âm nhỏ nhất trong tập hợp A.',
          'b) Tập hợp A có đúng 2 số nguyên dương.',
          'c) Số đối của số -2 là 2.',
          'd) Tổng của tất cả các phần tử trong tập hợp A bằng 5.',
        ],
        expectedOutcome: 'Hiểu tính chất số nguyên âm, số đối và thực hiện cộng các số nguyên.',
        score: 0.5,
      },
      {
        id: 'q6_10',
        questionNumber: 'Câu 10',
        partType: 'TN_DUNG_SAI',
        topic: 'Hình học trực quan',
        subTopic: 'Chu vi và diện tích hình chữ nhật',
        level: 'HIEU',
        competency: 'NLGTTH',
        contentSnippet: 'Bài toán diện tích sân chơi và số lượng gạch lát sân.',
        fullQuestionText: 'Một mảnh sân chơi hình chữ nhật có chiều dài 15 m và chiều rộng 8 m.\na) Chu vi của mảnh sân chơi là 46 m.\nb) Diện tích mảnh sân chơi là 120 m^2.\nc) Người ta lát sân bằng các viên gạch hình vuông cạnh 50 cm thì cần đúng 480 viên gạch.\nd) Nếu tăng mỗi cạnh thêm 2 m thì diện tích tăng thêm 50 m^2.',
        options: [
          'a) Chu vi của mảnh sân chơi là 46 m.',
          'b) Diện tích mảnh sân chơi là 120 m^2.',
          'c) Người ta lát sân bằng các viên gạch hình vuông cạnh 50 cm thì cần đúng 480 viên gạch.',
          'd) Nếu tăng mỗi cạnh thêm 2 m thì diện tích tăng thêm 50 m^2.',
        ],
        expectedOutcome: 'Tính chu vi, diện tích hình chữ nhật và đổi đơn vị đo trong bài toán lát gạch.',
        score: 0.5,
      },
      {
        id: 'q6_11',
        questionNumber: 'Bài 1',
        partType: 'TU_LUAN',
        topic: 'Số tự nhiên',
        subTopic: 'Tính nhanh và biểu thức luỹ thừa',
        level: 'HIEU',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Tính hợp lí với tính chất phân phối và thứ tự ngoặc.',
        fullQuestionText: 'Bài 1. (2,0 điểm) Thực hiện phép tính (hợp lí nếu có thể):\na) 28 . 76 + 24 . 28 - 280.\nb) 150 : [25 . (18 - 4^2)] + (-12).',
        expectedOutcome: 'Vận dụng tính chất kết hợp, phân phối và thứ tự thực hiện luỹ thừa, nhân chia, cộng trừ.',
        score: 2.0,
      },
      {
        id: 'q6_12',
        questionNumber: 'Bài 2',
        partType: 'TU_LUAN',
        topic: 'Số nguyên',
        subTopic: 'Tìm x trong tập hợp số nguyên',
        level: 'HIEU',
        competency: 'NLGQVĐ',
        contentSnippet: 'Tìm số nguyên x thoả mãn đẳng thức.',
        fullQuestionText: 'Bài 2. (2,0 điểm) Tìm số nguyên x, biết:\na) 3x - 17 = 28.\nb) 25 - (x + 5) = -15.',
        expectedOutcome: 'Giải toán tìm x với các quy tắc chuyển vế và phá dấu ngoặc.',
        score: 2.0,
      },
      {
        id: 'q6_13',
        questionNumber: 'Bài 3',
        partType: 'TU_LUAN',
        topic: 'Tính chia hết trong tập hợp các số tự nhiên',
        subTopic: 'Ước chung lớn nhất và bài toán thực tế chia nhóm',
        level: 'VAN_DUNG',
        competency: 'NLMHH',
        contentSnippet: 'Bài toán thực tế chia đội tình nguyện bằng ước chung lớn nhất (ƯCLN).',
        fullQuestionText: 'Bài 3. (2,0 điểm) Một đội tình nguyện gồm 48 nam và 72 nữ. Đội muốn chia thành các nhóm sao cho số nam và số nữ ở mỗi nhóm đều bằng nhau.\na) Hỏi có thể chia được nhiều nhất thành bao nhiêu nhóm?\nb) Khi đó, mỗi nhóm có bao nhiêu nam và bao nhiêu nữ?',
        expectedOutcome: 'Mô hình hoá bài toán thực tế chia nhóm thành tìm Ước chung lớn nhất (ƯCLN).',
        score: 2.0,
      },
      {
        id: 'q6_14',
        questionNumber: 'Bài 4',
        partType: 'TU_LUAN',
        topic: 'Hình học trực quan',
        subTopic: 'Tính diện tích hình chữ nhật sau khi trừ lối đi',
        level: 'VAN_DUNG',
        competency: 'NLTD & LLTH',
        contentSnippet: 'Bài toán diện tích vườn trồng rau sau khi bớt lối đi xung quanh.',
        fullQuestionText: 'Bài 4. (1,0 điểm) Một mảnh vườn hình chữ nhật có chiều dài 20 m, chiều rộng 12 m. Người ta làm một lối đi xung quanh vườn rộng 1 m, phần đất còn lại dùng để trồng rau. Tính diện tích phần đất dùng để trồng rau.',
        expectedOutcome: 'Xác định kích thước chiều dài và chiều rộng phần vườn còn lại và tính diện tích.',
        score: 1.0,
      },
    ],
  },
];

export const SAMPLE_EXAMS: SampleExamData[] = [
  ...MATH_SAMPLE_EXAMS,
  ...ALL_OTHER_SUBJECT_EXAMS,
];

export function getSampleExamsBySubject(subjectId: SubjectId): SampleExamData[] {
  return SAMPLE_EXAMS.filter((s) => s.subjectId === subjectId);
}

export function getDefaultSampleForSubject(subjectId: SubjectId): SampleExamData {
  const list = getSampleExamsBySubject(subjectId);
  return list[0] || SAMPLE_EXAMS[0];
}
