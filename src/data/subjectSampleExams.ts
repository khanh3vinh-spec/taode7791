import { QuestionItem, SubjectId } from '../types/matrix';
import { SampleExamData } from './sampleExams';

// ========================================================
// 1. KHOA HỌC TỰ NHIÊN (KHTN 9 - GDPT 2018 & CV 7991)
// Theo mẫu chuẩn Trường THCS Ngãi Tứ (Tổ KHTN - Tiếng Anh)
// ========================================================
export const SAMPLE_EXAM_KHTN: SampleExamData = {
  id: 'khtn9-hk1',
  subjectId: 'khtn',
  name: 'KHTN 9 - Đề kiểm tra giữa HKI (THCS Ngãi Tứ: 16 câu TN 4đ + Tự luận 6đ)',
  grade: '9',
  examType: 'Giữa kì I',
  meta: {
    title: 'MA TRẬN ĐỀ KIỂM TRA GIỮA HKI NĂM HỌC 2025-2026',
    grade: '9',
    subject: 'Khoa học tự nhiên',
    school: 'TRƯỜNG THCS NGÃI TỨ',
    timeLimit: '60 phút',
    summary: 'Khung ma trận 12 cột & Bản đặc tả KHTN 9 chuẩn THCS Ngãi Tứ: 40% Trắc nghiệm (16 câu x 0,25đ = 4,0đ), 60% Tự luận (6,0đ). Tỉ lệ: 40% Biết - 30% Hiểu - 20% Vận dụng - 10% Vận dụng cao.',
  },
  rawText: `TRƯỜNG THCS NGÃI TỨ - TỔ KHTN – TIẾNG ANH
ĐỀ KIỂM TRA GIỮA HKI NĂM HỌC 2025-2026
MÔN: KHOA HỌC TỰ NHIÊN LỚP 9 - THỜI GIAN LÀM BÀI: 60 PHÚT

PHẦN I. CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (4,0 ĐIỂM - GỒM 16 CÂU HỎI, MỖI CÂU 0,25 ĐIỂM)

Câu 1. Động năng của một vật phụ thuộc vào những yếu tố nào sau đây?
A. Khối lượng và vận tốc của vật.
B. Khối lượng và độ cao của vật.
C. Vận tốc và thể tích của vật.
D. Trọng lượng và hình dạng của vật.

Câu 2. Khi một vật được đưa lên độ cao h so với mặt đất, vật tích trữ dạng năng lượng nào?
A. Thế năng trọng trường.
B. Động năng.
C. Quang năng.
D. Hoá năng.

Câu 3. Đơn vị đo của công suất trong hệ SI là gì?
A. Oát (W).
B. Jun (J).
C. Niutơn (N).
D. Pascan (Pa).

Câu 4. Hiện tượng tia sáng bị đổi hướng truyền khi đi truyền xiên góc qua mặt phân cách giữa hai môi trường trong suốt được gọi là:
A. Khúc xạ ánh sáng.
B. Phản xạ ánh sáng.
C. Tán xạ ánh sáng.
D. Hấp thụ ánh sáng.

Câu 5. Kim loại nào sau đây tác dụng được với dung dịch axit HCl loãng giải phóng khí hiđro?
A. Fe (Sắt).
B. Cu (Đồng).
C. Ag (Bạc).
D. Au (Vàng).

Câu 6. Trong các kim loại: Al, Fe, Cu, Ag, kim loại có khả năng dẫn điện tốt nhất là:
A. Ag (Bạc).
B. Cu (Đồng).
C. Al (Nhôm).
D. Fe (Sắt).

Câu 7. Khi nung nóng canxi cacbonat (đá vôi - CaCO3) ở nhiệt độ cao, sản phẩm khí sinh ra là:
A. Khí cacbonic (CO2).
B. Khí oxi (O2).
C. Khí hiđro (H2).
D. Khí lưu huỳnh đioxit (SO2).

Câu 8. Dãy kim loại nào sau đây được sắp xếp theo chiều mức độ hoạt động hoá học giảm dần?
A. K, Na, Mg, Al, Zn, Fe, Cu, Ag.
B. Cu, Ag, Fe, Zn, Al, Mg, Na, K.
C. Al, Mg, Na, K, Zn, Fe, Cu, Ag.
D. K, Na, Cu, Ag, Al, Mg, Zn, Fe.

Câu 9. Quá trình quang hợp ở thực vật diễn ra chủ yếu ở bào quan nào của tế bào lá?
A. Lục lạp.
B. Ti thể.
C. Không bào.
D. Nhân tế bào.

Câu 10. Ở người, bộ nhiễm sắc thể của giao tử (tinh trùng hoặc trứng) chứa số lượng NST là:
A. n = 23 chiếc.
B. 2n = 46 chiếc.
C. 3n = 69 chiếc.
D. 2n = 44 chiếc.

Câu 11. Các đơn phân cấu tạo nên phân tử axit đêôxiribônuclêic (ADN) gồm 4 loại nào sau đây?
A. A, T, G, X.
B. A, U, G, X.
C. A, T, U, G.
D. T, U, G, X.

Câu 12. Trong tế bào, bào quan nào được ví như "nhà máy năng lượng" của tế bào thực hiện quá trình hô hấp tế bào?
A. Ti thể.
B. Lục lạp.
C. Không bào.
D. Ribôxôm.

Câu 13. Một bóng đèn có công suất định mức 100W hoạt động liên tục trong 2 giờ. Điện năng bóng đèn tiêu thụ là:
A. 0,2 kWh.
B. 200 kWh.
C. 0,5 kWh.
D. 50 kWh.

Câu 14. Một vật được thả rơi tự do từ độ cao h xuống mặt đất (bỏ qua sức cản không khí). Trong quá trình rơi:
A. Thế năng giảm dần, động năng tăng dần, cơ năng được bảo toàn.
B. Cả động năng và thế năng đều cùng tăng dần.
C. Cơ năng giảm dần do ma sát không khí.
D. Thế năng tăng dần còn động năng giảm dần.

Câu 15. Cho thí nghiệm nhúng một chiếc đinh sắt sạch vào ống nghiệm chứa dung dịch CuSO4 màu xanh lam. Hiện tượng quan sát được là:
A. Có kim loại màu đỏ bám ngoài đinh sắt, màu xanh dung dịch nhạt dần.
B. Có khí bay ra mãnh liệt, đinh sắt tan hoàn toàn.
C. Không có hiện tượng hoá học nào xảy ra.
D. Có kết tủa màu trắng lắng xuống đáy ống nghiệm.

Câu 16. Để phân biệt hai bình mất nhãn chứa dung dịch axit HCl và dung dịch axit H2SO4 loãng, thuốc thử thích hợp cần dùng là:
A. Dung dịch BaCl2.
B. Dung dịch NaOH.
C. Quỳ tím.
D. Kim loại Cu.

PHẦN II. CÂU HỎI TỰ LUẬN (6,0 ĐIỂM - GỒM 4 BÀI TOÁN)

Bài 1. (1,0 điểm) [Năng lượng và sự biến đổi - Nhận biết]
a) (0,5 điểm) Hãy nêu định nghĩa động năng và viết công thức tính động năng của một vật, nêu rõ đơn vị đo của các đại lượng trong công thức.
b) (0,5 điểm) Khi tài xế hãm phanh để ô tô dừng lại, toàn bộ động năng của xe đã chuyển hoá thành dạng năng lượng nào?

Bài 2. (2,0 điểm) [Chất và sự biến đổi của chất - Vận dụng]
Cho 6,5 gam kim loại kẽm (Zn) tác dụng hoàn toàn với lượng dư dung dịch axit clohiđric (HCl).
a) (1,0 điểm) Viết phương trình hoá học xảy ra.
b) (1,0 điểm) Tính thể tích khí hiđro (H2) thu được ở điều kiện chuẩn (đkc: 25°C, 1 bar). Biết ở đkc, 1 mol khí chiếm thể tích là 24,79 lít và Zn = 65.

Bài 3. (2,0 điểm) [Vật sống / Di truyền học - Thông hiểu]
Ở đậu Hà Lan, gen B quy định hạt vàng trội hoàn toàn so với gen b quy định hạt xanh. Cho cây hạt vàng có kiểu gen Bb tự thụ phấn.
a) (1,0 điểm) Viết sơ đồ lai từ P đến F1 và xác định tỉ lệ kiểu gen, tỉ lệ kiểu hình ở F1.
b) (1,0 điểm) Nếu vụ thu hoạch F1 thu được tổng số 400 hạt đậu, tính số lượng hạt màu vàng theo lí thuyết.

Bài 4. (1,0 điểm) [Vận dụng cao - Giải pháp thực tiễn KHTN]
Hãy nêu 2 biện pháp sử dụng năng lượng điện an toàn, tiết kiệm trong gia đình và đề xuất 1 giải pháp cụ thể giúp giảm thiểu rác thải nhựa nhằm bảo vệ môi trường tại trường học hoặc địa phương em.`,
  questions: [
    {
      id: 'khtn_q1',
      questionNumber: 'Câu 1',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Chủ đề 1: Năng lượng và sự biến đổi',
      subTopic: '1. Động năng và thế năng',
      level: 'BIET',
      competency: 'NNKHTN',
      contentSnippet: 'Động năng của một vật phụ thuộc vào khối lượng và vận tốc.',
      fullQuestionText: 'Câu 1. Động năng của một vật phụ thuộc vào những yếu tố nào sau đây?\nA. Khối lượng và vận tốc của vật.\nB. Khối lượng và độ cao của vật.\nC. Vận tốc và thể tích của vật.\nD. Trọng lượng và hình dạng của vật.',
      options: ['A. Khối lượng và vận tốc của vật.', 'B. Khối lượng và độ cao của vật.', 'C. Vận tốc và thể tích của vật.', 'D. Trọng lượng và hình dạng của vật.'],
      expectedOutcome: 'Nhận biết được động năng của một vật phụ thuộc vào khối lượng và tốc độ của nó.',
      score: 0.25,
    },
    {
      id: 'khtn_q2',
      questionNumber: 'Câu 2',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Chủ đề 1: Năng lượng và sự biến đổi',
      subTopic: '1. Động năng và thế năng',
      level: 'BIET',
      competency: 'NNKHTN',
      contentSnippet: 'Thế năng trọng trường của vật ở độ cao h.',
      fullQuestionText: 'Câu 2. Khi một vật được đưa lên độ cao h so với mặt đất, vật tích trữ dạng năng lượng nào?\nA. Thế năng trọng trường.\nB. Động năng.\nC. Quang năng.\nD. Hoá năng.',
      options: ['A. Thế năng trọng trường.', 'B. Động năng.', 'C. Quang năng.', 'D. Hoá năng.'],
      expectedOutcome: 'Nhận biết được vật ở một độ cao so với mốc thế năng có thế năng trọng trường.',
      score: 0.25,
    },
    {
      id: 'khtn_q3',
      questionNumber: 'Câu 3',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Chủ đề 1: Năng lượng và sự biến đổi',
      subTopic: '2. Công và công suất',
      level: 'BIET',
      competency: 'NNKHTN',
      contentSnippet: 'Đơn vị đo của công suất trong hệ SI là Oát (W).',
      fullQuestionText: 'Câu 3. Đơn vị đo của công suất trong hệ SI là gì?\nA. Oát (W).\nB. Jun (J).\nC. Niutơn (N).\nD. Pascan (Pa).',
      options: ['A. Oát (W).', 'B. Jun (J).', 'C. Niutơn (N).', 'D. Pascan (Pa).'],
      expectedOutcome: 'Nhận biết được đơn vị đo công suất là Oát (W).',
      score: 0.25,
    },
    {
      id: 'khtn_q4',
      questionNumber: 'Câu 4',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Chủ đề 1: Năng lượng và sự biến đổi',
      subTopic: '3. Khúc xạ ánh sáng',
      level: 'BIET',
      competency: 'NNKHTN',
      contentSnippet: 'Hiện tượng khúc xạ ánh sáng qua mặt phân cách hai môi trường.',
      fullQuestionText: 'Câu 4. Hiện tượng tia sáng bị đổi hướng truyền khi đi truyền xiên góc qua mặt phân cách giữa hai môi trường trong suốt được gọi là:\nA. Khúc xạ ánh sáng.\nB. Phản xạ ánh sáng.\nC. Tán xạ ánh sáng.\nD. Hấp thụ ánh sáng.',
      options: ['A. Khúc xạ ánh sáng.', 'B. Phản xạ ánh sáng.', 'C. Tán xạ ánh sáng.', 'D. Hấp thụ ánh sáng.'],
      expectedOutcome: 'Nhận biết được hiện tượng khúc xạ ánh sáng khi truyền qua hai môi trường trong suốt.',
      score: 0.25,
    },
    {
      id: 'khtn_q5',
      questionNumber: 'Câu 5',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Chủ đề 2: Chất và sự biến đổi của chất',
      subTopic: '1. Tính chất hoá học của kim loại',
      level: 'BIET',
      competency: 'NNKHTN',
      contentSnippet: 'Kim loại tác dụng với dung dịch axit giải phóng H2.',
      fullQuestionText: 'Câu 5. Kim loại nào sau đây tác dụng được với dung dịch axit HCl loãng giải phóng khí hiđro?\nA. Fe (Sắt).\nB. Cu (Đồng).\nC. Ag (Bạc).\nD. Au (Vàng).',
      options: ['A. Fe (Sắt).', 'B. Cu (Đồng).', 'C. Ag (Bạc).', 'D. Au (Vàng).'],
      expectedOutcome: 'Nhận biết kim loại đứng trước hiđro phản ứng với axit HCl giải phóng H2.',
      score: 0.25,
    },
    {
      id: 'khtn_q6',
      questionNumber: 'Câu 6',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Chủ đề 2: Chất và sự biến đổi của chất',
      subTopic: '1. Tính chất hoá học của kim loại',
      level: 'BIET',
      competency: 'NNKHTN',
      contentSnippet: 'Kim loại Ag dẫn điện tốt nhất.',
      fullQuestionText: 'Câu 6. Trong các kim loại: Al, Fe, Cu, Ag, kim loại có khả năng dẫn điện tốt nhất là:\nA. Ag (Bạc).\nB. Cu (Đồng).\nC. Al (Nhôm).\nD. Fe (Sắt).',
      options: ['A. Ag (Bạc).', 'B. Cu (Đồng).', 'C. Al (Nhôm).', 'D. Fe (Sắt).'],
      expectedOutcome: 'Nhận biết tính chất vật lí đặc trưng của kim loại, bạc (Ag) dẫn điện tốt nhất.',
      score: 0.25,
    },
    {
      id: 'khtn_q7',
      questionNumber: 'Câu 7',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Chủ đề 2: Chất và sự biến đổi của chất',
      subTopic: '2. Một số hợp chất vô cơ thông dụng',
      level: 'BIET',
      competency: 'NNKHTN',
      contentSnippet: 'Nung đá vôi sinh ra khí CO2.',
      fullQuestionText: 'Câu 7. Khi nung nóng canxi cacbonat (đá vôi - CaCO3) ở nhiệt độ cao, sản phẩm khí sinh ra là:\nA. Khí cacbonic (CO2).\nB. Khí oxi (O2).\nC. Khí hiđro (H2).\nD. Khí lưu huỳnh đioxit (SO2).',
      options: ['A. Khí cacbonic (CO2).', 'B. Khí oxi (O2).', 'C. Khí hiđro (H2).', 'D. Khí lưu huỳnh đioxit (SO2).'],
      expectedOutcome: 'Nhận biết phản ứng phân huỷ nhiệt của CaCO3 tạo thành CaO và CO2.',
      score: 0.25,
    },
    {
      id: 'khtn_q8',
      questionNumber: 'Câu 8',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Chủ đề 2: Chất và sự biến đổi của chất',
      subTopic: '3. Dãy hoạt động hoá học của kim loại',
      level: 'BIET',
      competency: 'NNKHTN',
      contentSnippet: 'Thứ tự dãy hoạt động hoá học của kim loại.',
      fullQuestionText: 'Câu 8. Dãy kim loại nào sau đây được sắp xếp theo chiều mức độ hoạt động hoá học giảm dần?\nA. K, Na, Mg, Al, Zn, Fe, Cu, Ag.\nB. Cu, Ag, Fe, Zn, Al, Mg, Na, K.\nC. Al, Mg, Na, K, Zn, Fe, Cu, Ag.\nD. K, Na, Cu, Ag, Al, Mg, Zn, Fe.',
      options: ['A. K, Na, Mg, Al, Zn, Fe, Cu, Ag.', 'B. Cu, Ag, Fe, Zn, Al, Mg, Na, K.', 'C. Al, Mg, Na, K, Zn, Fe, Cu, Ag.', 'D. K, Na, Cu, Ag, Al, Mg, Zn, Fe.'],
      expectedOutcome: 'Ghi nhớ và nhận biết đúng thứ tự mức độ hoạt động hoá học của dãy kim loại thông dụng.',
      score: 0.25,
    },
    {
      id: 'khtn_q9',
      questionNumber: 'Câu 9',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Chủ đề 3: Vật sống và di truyền học',
      subTopic: '1. Trao đổi chất và năng lượng ở tế bào',
      level: 'BIET',
      competency: 'NNKHTN',
      contentSnippet: 'Lục lạp là bào quan thực hiện quang hợp.',
      fullQuestionText: 'Câu 9. Quá trình quang hợp ở thực vật diễn ra chủ yếu ở bào quan nào của tế bào lá?\nA. Lục lạp.\nB. Ti thể.\nC. Không bào.\nD. Nhân tế bào.',
      options: ['A. Lục lạp.', 'B. Ti thể.', 'C. Không bào.', 'D. Nhân tế bào.'],
      expectedOutcome: 'Nhận biết bào quan lục lạp chứa chất diệp lục là nơi diễn ra pha sáng và pha tối quang hợp.',
      score: 0.25,
    },
    {
      id: 'khtn_q10',
      questionNumber: 'Câu 10',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Chủ đề 3: Vật sống và di truyền học',
      subTopic: '2. Nhiễm sắc thể và di truyền giới tính',
      level: 'BIET',
      competency: 'NNKHTN',
      contentSnippet: 'Bộ nhiễm sắc thể đơn bội n = 23 ở giao tử người.',
      fullQuestionText: 'Câu 10. Ở người, bộ nhiễm sắc thể của giao tử (tinh trùng hoặc trứng) chứa số lượng NST là:\nA. n = 23 chiếc.\nB. 2n = 46 chiếc.\nC. 3n = 69 chiếc.\nD. 2n = 44 chiếc.',
      options: ['A. n = 23 chiếc.', 'B. 2n = 46 chiếc.', 'C. 3n = 69 chiếc.', 'D. 2n = 44 chiếc.'],
      expectedOutcome: 'Nhận biết được bộ NST đơn bội (n) trong giao tử của người gồm 23 chiếc.',
      score: 0.25,
    },
    {
      id: 'khtn_q11',
      questionNumber: 'Câu 11',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Chủ đề 3: Vật sống và di truyền học',
      subTopic: '3. Cấu trúc và chức năng của ADN',
      level: 'BIET',
      competency: 'NNKHTN',
      contentSnippet: '4 loại nuclêôtit cấu tạo nên ADN: A, T, G, X.',
      fullQuestionText: 'Câu 11. Các đơn phân cấu tạo nên phân tử axit đêôxiribônuclêic (ADN) gồm 4 loại nào sau đây?\nA. A, T, G, X.\nB. A, U, G, X.\nC. A, T, U, G.\nD. T, U, G, X.',
      options: ['A. A, T, G, X.', 'B. A, U, G, X.', 'C. A, T, U, G.', 'D. T, U, G, X.'],
      expectedOutcome: 'Nhận biết 4 loại đơn phân nuclêôtit cấu thành phân tử ADN.',
      score: 0.25,
    },
    {
      id: 'khtn_q12',
      questionNumber: 'Câu 12',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Chủ đề 3: Vật sống và di truyền học',
      subTopic: '1. Trao đổi chất và năng lượng ở tế bào',
      level: 'BIET',
      competency: 'NNKHTN',
      contentSnippet: 'Ti thể là bào quan hô hấp tế bào giải phóng năng lượng ATP.',
      fullQuestionText: 'Câu 12. Trong tế bào, bào quan nào được ví như "nhà máy năng lượng" của tế bào thực hiện quá trình hô hấp tế bào?\nA. Ti thể.\nB. Lục lạp.\nC. Không bào.\nD. Ribôxôm.',
      options: ['A. Ti thể.', 'B. Lục lạp.', 'C. Không bào.', 'D. Ribôxôm.'],
      expectedOutcome: 'Nhận biết bào quan ti thể là nơi diễn ra quá trình hô hấp tế bào giải phóng năng lượng ATP.',
      score: 0.25,
    },
    {
      id: 'khtn_q13',
      questionNumber: 'Câu 13',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Chủ đề 1: Năng lượng và sự biến đổi',
      subTopic: '2. Công và công suất',
      level: 'HIEU',
      competency: 'NVDKN',
      contentSnippet: 'Tính điện năng tiêu thụ A = P.t = 0,2 kWh.',
      fullQuestionText: 'Câu 13. Một bóng đèn có công suất định mức 100W hoạt động liên tục trong 2 giờ. Điện năng bóng đèn tiêu thụ là:\nA. 0,2 kWh.\nB. 200 kWh.\nC. 0,5 kWh.\nD. 50 kWh.',
      options: ['A. 0,2 kWh.', 'B. 200 kWh.', 'C. 0,5 kWh.', 'D. 50 kWh.'],
      expectedOutcome: 'Hiểu và vận dụng công thức A = P . t để tính điện năng tiêu thụ theo đơn vị kWh.',
      score: 0.25,
    },
    {
      id: 'khtn_q14',
      questionNumber: 'Câu 14',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Chủ đề 1: Năng lượng và sự biến đổi',
      subTopic: '1. Động năng và thế năng',
      level: 'HIEU',
      competency: 'NNKHTN',
      contentSnippet: 'Sự chuyển hoá thế năng thành động năng trong quá trình rơi.',
      fullQuestionText: 'Câu 14. Một vật được thả rơi tự do từ độ cao h xuống mặt đất (bỏ qua sức cản không khí). Trong quá trình rơi:\nA. Thế năng giảm dần, động năng tăng dần, cơ năng được bảo toàn.\nB. Cả động năng và thế năng đều cùng tăng dần.\nC. Cơ năng giảm dần do ma sát không khí.\nD. Thế năng tăng dần còn động năng giảm dần.',
      options: ['A. Thế năng giảm dần, động năng tăng dần, cơ năng được bảo toàn.', 'B. Cả động năng và thế năng đều cùng tăng dần.', 'C. Cơ năng giảm dần do ma sát không khí.', 'D. Thế năng tăng dần còn động năng giảm dần.'],
      expectedOutcome: 'Hiểu được quy luật chuyển hoá và bảo toàn cơ năng trong chuyển động rơi tự do.',
      score: 0.25,
    },
    {
      id: 'khtn_q15',
      questionNumber: 'Câu 15',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Chủ đề 2: Chất và sự biến đổi của chất',
      subTopic: '1. Tính chất hoá học của kim loại',
      level: 'HIEU',
      competency: 'NTHTN',
      contentSnippet: 'Hiện tượng phản ứng Fe tác dụng dung dịch CuSO4.',
      fullQuestionText: 'Câu 15. Cho thí nghiệm nhúng một chiếc đinh sắt sạch vào ống nghiệm chứa dung dịch CuSO4 màu xanh lam. Hiện tượng quan sát được là:\nA. Có kim loại màu đỏ bám ngoài đinh sắt, màu xanh dung dịch nhạt dần.\nB. Có khí bay ra mãnh liệt, đinh sắt tan hoàn toàn.\nC. Không có hiện tượng hoá học nào xảy ra.\nD. Có kết tủa màu trắng lắng xuống đáy ống nghiệm.',
      options: ['A. Có kim loại màu đỏ bám ngoài đinh sắt, màu xanh dung dịch nhạt dần.', 'B. Có khí bay ra mãnh liệt, đinh sắt tan hoàn toàn.', 'C. Không có hiện tượng hoá học nào xảy ra.', 'D. Có kết tủa màu trắng lắng xuống đáy ống nghiệm.'],
      expectedOutcome: 'Giải thích được hiện tượng thí nghiệm phản ứng thế giữa kim loại sắt và ion đồng Cu2+.',
      score: 0.25,
    },
    {
      id: 'khtn_q16',
      questionNumber: 'Câu 16',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Chủ đề 2: Chất và sự biến đổi của chất',
      subTopic: '2. Một số hợp chất vô cơ thông dụng',
      level: 'HIEU',
      competency: 'NTHTN',
      contentSnippet: 'Dùng BaCl2 nhận biết H2SO4 tạo kết tủa trắng BaSO4.',
      fullQuestionText: 'Câu 16. Để phân biệt hai bình mất nhãn chứa dung dịch axit HCl và dung dịch axit H2SO4 loãng, thuốc thử thích hợp cần dùng là:\nA. Dung dịch BaCl2.\nB. Dung dịch NaOH.\nC. Quỳ tím.\nD. Kim loại Cu.',
      options: ['A. Dung dịch BaCl2.', 'B. Dung dịch NaOH.', 'C. Quỳ tím.', 'D. Kim loại Cu.'],
      expectedOutcome: 'Hiểu và vận dụng tính chất tạo kết tủa trắng không tan BaSO4 của gốc sunfat để nhận biết axit sunfuric.',
      score: 0.25,
    },

    // PHẦN II. TỰ LUẬN (6.0 ĐIỂM)
    {
      id: 'khtn_tl1',
      questionNumber: 'Bài 1',
      partType: 'TU_LUAN',
      topic: 'Chủ đề 1: Năng lượng và sự biến đổi',
      subTopic: '1. Động năng và thế năng',
      level: 'BIET',
      competency: 'NNKHTN',
      contentSnippet: 'Định nghĩa động năng, công thức tính và sự chuyển hoá năng lượng.',
      fullQuestionText: 'Bài 1. (1,0 điểm) Một ô tô có khối lượng 1,5 tấn (1500 kg) đang chuyển động đều trên đường thẳng với vận tốc 72 km/h (20 m/s).\na) (0,5 điểm) Hãy nêu định nghĩa động năng và viết công thức tính động năng của một vật, nêu rõ đơn vị đo của các đại lượng trong công thức.\nb) (0,5 điểm) Khi tài xế hãm phanh để ô tô dừng lại, toàn bộ động năng của xe đã chuyển hoá thành dạng năng lượng nào?',
      expectedOutcome: 'Nhận biết được định nghĩa động năng, viết đúng công thức Wd = 1/2 m v^2 và nhận biết dạng năng lượng chuyển hoá thành nhiệt năng qua ma sát.',
      score: 1.0,
    },
    {
      id: 'khtn_tl2',
      questionNumber: 'Bài 2',
      partType: 'TU_LUAN',
      topic: 'Chủ đề 2: Chất và sự biến đổi của chất',
      subTopic: '1. Tính chất hoá học của kim loại',
      level: 'VAN_DUNG',
      competency: 'NVDKN',
      contentSnippet: 'Phương trình Zn + HCl và tính thể tích H2 ở đkc.',
      fullQuestionText: 'Bài 2. (2,0 điểm) Cho 6,5 gam kim loại kẽm (Zn) tác dụng hoàn toàn với lượng dư dung dịch axit clohiđric (HCl).\na) (1,0 điểm) Viết phương trình hoá học xảy ra.\nb) (1,0 điểm) Tính thể tích khí hiđro (H2) thu được ở điều kiện chuẩn (đkc: 25°C, 1 bar). Biết ở đkc, 1 mol khí chiếm thể tích là 24,79 lít và Zn = 65.',
      expectedOutcome: 'Viết đúng PTHH Zn + 2HCl -> ZnCl2 + H2, tính số mol Zn = 0,1 mol và suy ra thể tích khí V = 0,1 . 24,79 = 2,479 lít.',
      score: 2.0,
    },
    {
      id: 'khtn_tl3',
      questionNumber: 'Bài 3',
      partType: 'TU_LUAN',
      topic: 'Chủ đề 3: Vật sống và di truyền học',
      subTopic: '4. Các quy luật di truyền của Menđen',
      level: 'HIEU',
      competency: 'NTHTN',
      contentSnippet: 'Sơ đồ lai đậu Hà Lan hạt vàng Bb tự thụ phấn và tính số hạt F1.',
      fullQuestionText: 'Bài 3. (2,0 điểm) Ở đậu Hà Lan, gen B quy định hạt vàng trội hoàn toàn so với gen b quy định hạt xanh. Cho cây hạt vàng có kiểu gen Bb tự thụ phấn.\na) (1,0 điểm) Viết sơ đồ lai từ P đến F1 và xác định tỉ lệ kiểu gen, tỉ lệ kiểu hình ở F1.\nb) (1,0 điểm) Giải thích kết quả và nếu vụ thu hoạch F1 thu được tổng số 400 hạt đậu, tính số lượng hạt màu vàng theo lí thuyết.',
      expectedOutcome: 'Hiểu và viết chính xác sơ đồ lai Bb x Bb, xác định tỉ lệ 3 vàng : 1 xanh và tính ra số hạt vàng = 3/4 . 400 = 300 hạt.',
      score: 2.0,
    },
    {
      id: 'khtn_tl4',
      questionNumber: 'Bài 4',
      partType: 'TU_LUAN',
      topic: 'Chủ đề 1: Năng lượng và sự biến đổi',
      subTopic: '5. Tiết kiệm năng lượng và môi trường',
      level: 'VAN_DUNG_CAO',
      competency: 'NVDKN',
      contentSnippet: 'Biện pháp tiết kiệm điện và giải pháp giảm thiểu rác thải nhựa.',
      fullQuestionText: 'Bài 4. (1,0 điểm) Hãy nêu 2 biện pháp sử dụng năng lượng điện an toàn, tiết kiệm trong gia đình và đề xuất 1 giải pháp cụ thể giúp giảm thiểu rác thải nhựa nhằm bảo vệ môi trường tại trường học hoặc địa phương em.',
      expectedOutcome: 'Vận dụng kiến thức khoa học tự nhiên vào đời sống thực tế: tắt thiết bị điện khi không sử dụng, tận dụng ánh sáng tự nhiên, phân loại rác và sử dụng vật liệu thân thiện.',
      score: 1.0,
    },
  ],
};

// ========================================================
// 2. NGỮ VĂN (NGỮ VĂN 9 - GDPT 2018 & CV 7991)
// ========================================================
export const SAMPLE_EXAM_VAN: SampleExamData = {
  id: 'van9-hk1',
  subjectId: 'van',
  name: 'Ngữ văn 9 - Học kì I (CV 7991: Đọc hiểu 6đ - Viết 4đ)',
  grade: '9',
  examType: 'Cuối kì I',
  meta: {
    title: 'ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I - MÔN NGỮ VĂN 9',
    grade: '9',
    subject: 'Ngữ văn',
    school: 'TRƯỜNG THCS',
    timeLimit: '90 phút',
    summary: 'Khung ma trận & Bản đặc tả Ngữ văn 9 chuẩn CV 7991: Phần I Đọc hiểu ngữ liệu ngoài SGK (6,0đ), Phần II Viết đoạn văn / bài văn nghị luận xã hội (4,0đ). Tích hợp năng lực Đọc hiểu (NLĐH), Tiếng Việt (NLGT), Viết (NLV).',
  },
  rawText: `TRƯỜNG THCS - ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I
MÔN: NGỮ VĂN 9 - THỜI GIAN LÀM BÀI: 90 PHÚT

I. ĐỌC HIỂU (6,0 điểm)
Đọc đoạn trích sau và thực hiện các yêu cầu:
"Mỗi người sinh ra trên đời đều mang trong mình một hạt mầm của lòng biết ơn và sự tử tế. Cuộc sống không đo bằng số năm tháng ta tồn tại, mà được tính bằng những dấu ấn yêu thương ta để lại trong lòng người khác. Khi bạn biết sẻ chia một mẩu bánh mì, trao đi một nụ cười ấm áp hay nâng đỡ một người vấp ngã bên đường, chính lúc đó tâm hồn bạn đang nở những đóa hoa ngát hương. Đừng chờ đợi cho đến khi mình thật giàu có mới học cách cho đi, bởi sự chân thành không bao giờ cần đến vàng bạc để định giá..."
(Trích "Lắng nghe cuộc sống", NXB Trẻ)

Câu 1 (0,5 điểm). Phương thức biểu đạt chính của đoạn trích trên là gì?
A. Nghị luận.    B. Tự sự.    C. Biểu cảm.    D. Thuyết minh.
Câu 2 (0,5 điểm). Theo đoạn trích, cuộc sống của con người được đo bằng điều gì?
A. Bằng những dấu ấn yêu thương ta để lại trong lòng người khác.
B. Bằng số năm tháng ta tồn tại trên cõi đời.
C. Bằng sự giàu sang và vàng bạc tích lũy được.
D. Bằng những thành công vang dội trên con đường danh lợi.
Câu 3 (0,5 điểm). Biện pháp tu từ nào được sử dụng trong câu: "tâm hồn bạn đang nở những đóa hoa ngát hương"?
A. Ẩn dụ.    B. Hoán dụ.    C. So sánh.    D. Điệp từ.
Câu 4 (0,5 điểm). Từ "tử tế" trong đoạn trích thuộc từ loại nào?
A. Tính từ.    B. Danh từ.    C. Động từ.    D. Đại từ.
Câu 5 (0,5 điểm). Thông điệp ý nghĩa nhất mà tác giả muốn gửi gắm qua đoạn trích là:
A. Hãy sống yêu thương, biết sẻ chia và cho đi sự chân thành trong cuộc sống.
B. Chỉ khi giàu có mới có thể giúp đỡ người khác.
C. Hãy sống thật lâu để trải nghiệm nhiều điều.
D. Hãy biết giữ gìn của cải và vật chất của bản thân.
Câu 6 (0,5 điểm). Câu văn "Mỗi người sinh ra trên đời đều mang trong mình một hạt mầm của lòng biết ơn và sự tử tế" là kiểu câu gì xét theo cấu tạo ngữ pháp?
A. Câu đơn.    B. Câu ghép.    C. Câu đặc biệt.    D. Câu rút gọn.
Câu 7 (1,5 điểm). Em hiểu như thế nào về lời khuyên: "Đừng chờ đợi cho đến khi mình thật giàu có mới học cách cho đi"?
Câu 8 (1,5 điểm). Nêu một hành động cụ thể em đã làm để lan toả tình yêu thương và sự sẻ chia trong gia đình hoặc trường học.

II. VIẾT (4,0 điểm)
Viết một bài văn nghị luận ngắn (khoảng 400 - 500 chữ) trình bày suy nghĩ của em về ý nghĩa của sự sẻ chia và lòng nhân ái trong xã hội ngày nay.`,
  questions: [
    {
      id: 'van_q1',
      questionNumber: 'Câu 1',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Đọc hiểu văn bản',
      subTopic: 'Phương thức biểu đạt',
      level: 'BIET',
      competency: 'NLĐH',
      contentSnippet: 'Nhận biết phương thức biểu đạt chính của đoạn văn.',
      fullQuestionText: 'Phương thức biểu đạt chính của đoạn trích trên là gì?\nA. Nghị luận.    B. Tự sự.    C. Biểu cảm.    D. Thuyết minh.',
      options: ['A. Nghị luận.', 'B. Tự sự.', 'C. Biểu cảm.', 'D. Thuyết minh.'],
      expectedOutcome: 'Nhận biết phương thức biểu đạt chính nghị luận trong đoạn văn bản.',
      score: 0.5,
    },
    {
      id: 'van_q2',
      questionNumber: 'Câu 2',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Đọc hiểu văn bản',
      subTopic: 'Tìm kiếm thông tin trong văn bản',
      level: 'BIET',
      competency: 'NLĐH',
      contentSnippet: 'Xác định chi tiết trong văn bản về thước đo cuộc sống.',
      fullQuestionText: 'Theo đoạn trích, cuộc sống của con người được đo bằng điều gì?\nA. Bằng những dấu ấn yêu thương ta để lại trong lòng người khác.\nB. Bằng số năm tháng ta tồn tại trên cõi đời.\nC. Bằng sự giàu sang và vàng bạc tích lũy được.\nD. Bằng những thành công vang dội trên con đường danh lợi.',
      options: [
        'A. Bằng những dấu ấn yêu thương ta để lại trong lòng người khác.',
        'B. Bằng số năm tháng ta tồn tại trên cõi đời.',
        'C. Bằng sự giàu sang và vàng bạc tích lũy được.',
        'D. Bằng những thành công vang dội trên con đường danh lợi.',
      ],
      expectedOutcome: 'Tìm và trích xuất thông tin trực tiếp từ ngữ liệu đọc hiểu.',
      score: 0.5,
    },
    {
      id: 'van_q3',
      questionNumber: 'Câu 3',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Tiếng Việt',
      subTopic: 'Biện pháp tu từ',
      level: 'HIEU',
      competency: 'NLGT',
      contentSnippet: 'Xác định biện pháp tu từ ẩn dụ trong câu văn.',
      fullQuestionText: 'Biện pháp tu từ nào được sử dụng trong câu: "tâm hồn bạn đang nở những đóa hoa ngát hương"?\nA. Ẩn dụ.    B. Hoán dụ.    C. So sánh.    D. Điệp từ.',
      options: ['A. Ẩn dụ.', 'B. Hoán dụ.', 'C. So sánh.', 'D. Điệp từ.'],
      expectedOutcome: 'Nhận biết và phân tích tác dụng biểu đạt của biện pháp ẩn dụ chuyển đổi cảm giác.',
      score: 0.5,
    },
    {
      id: 'van_q4',
      questionNumber: 'Câu 4',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Tiếng Việt',
      subTopic: 'Từ loại tiếng Việt',
      level: 'BIET',
      competency: 'NLGT',
      contentSnippet: 'Xác định từ loại của từ tử tế.',
      fullQuestionText: 'Từ "tử tế" trong đoạn trích thuộc từ loại nào?\nA. Tính từ.    B. Danh từ.    C. Động từ.    D. Đại từ.',
      options: ['A. Tính từ.', 'B. Danh từ.', 'C. Động từ.', 'D. Đại từ.'],
      expectedOutcome: 'Nhận biết chính xác từ loại tính từ chỉ phẩm chất con người.',
      score: 0.5,
    },
    {
      id: 'van_q5',
      questionNumber: 'Câu 5',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Đọc hiểu văn bản',
      subTopic: 'Chủ đề và thông điệp văn bản',
      level: 'HIEU',
      competency: 'NLĐH',
      contentSnippet: 'Khái quát thông điệp cốt lõi của tác giả.',
      fullQuestionText: 'Thông điệp ý nghĩa nhất mà tác giả muốn gửi gắm qua đoạn trích là:\nA. Hãy sống yêu thương, biết sẻ chia và cho đi sự chân thành trong cuộc sống.\nB. Chỉ khi giàu có mới có thể giúp đỡ người khác.\nC. Hãy sống thật lâu để trải nghiệm nhiều điều.\nD. Hãy biết giữ gìn của cải và vật chất của bản thân.',
      options: [
        'A. Hãy sống yêu thương, biết sẻ chia và cho đi sự chân thành trong cuộc sống.',
        'B. Chỉ khi giàu có mới có thể giúp đỡ người khác.',
        'C. Hãy sống thật lâu để trải nghiệm nhiều điều.',
        'D. Hãy biết giữ gìn của cải và vật chất của bản thân.',
      ],
      expectedOutcome: 'Hiểu và suy ngẫm về thông điệp nhân văn mà tác giả gửi gắm qua đoạn văn bản.',
      score: 0.5,
    },
    {
      id: 'van_q6',
      questionNumber: 'Câu 6',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Tiếng Việt',
      subTopic: 'Cấu tạo ngữ pháp của câu',
      level: 'BIET',
      competency: 'NLGT',
      contentSnippet: 'Phân loại câu theo cấu tạo ngữ pháp.',
      fullQuestionText: 'Câu văn "Mỗi người sinh ra trên đời đều mang trong mình một hạt mầm của lòng biết ơn và sự tử tế" là kiểu câu gì xét theo cấu tạo ngữ pháp?\nA. Câu đơn.    B. Câu ghép.    C. Câu đặc biệt.    D. Câu rút gọn.',
      options: ['A. Câu đơn.', 'B. Câu ghép.', 'C. Câu đặc biệt.', 'D. Câu rút gọn.'],
      expectedOutcome: 'Nhận biết cấu trúc câu đơn có một cụm chủ - vị nòng cốt.',
      score: 0.5,
    },
    {
      id: 'van_q7',
      questionNumber: 'Câu 7',
      partType: 'TU_LUAN',
      topic: 'Đọc hiểu văn bản',
      subTopic: 'Cắt nghĩa và bình luận ý kiến',
      level: 'HIEU',
      competency: 'NLĐH',
      contentSnippet: 'Giải thích ý nghĩa câu nói đừng chờ đợi khi thật giàu có mới học cách cho đi.',
      fullQuestionText: 'Câu 7 (1,5 điểm). Em hiểu như thế nào về lời khuyên: "Đừng chờ đợi cho đến khi mình thật giàu có mới học cách cho đi"?',
      expectedOutcome: 'Trình bày cách hiểu sâu sắc về giá trị tinh thần của việc cho đi bằng lòng chân thành chứ không phụ thuộc vào tiền bạc.',
      score: 1.5,
    },
    {
      id: 'van_q8',
      questionNumber: 'Câu 8',
      partType: 'TU_LUAN',
      topic: 'Đọc hiểu văn bản',
      subTopic: 'Liên hệ thực tiễn bản thân',
      level: 'VAN_DUNG',
      competency: 'NLĐH',
      contentSnippet: 'Nêu hành động cụ thể lan toả tình yêu thương trong cuộc sống.',
      fullQuestionText: 'Câu 8 (1,5 điểm). Nêu một hành động cụ thể em đã làm để lan toả tình yêu thương và sự sẻ chia trong gia đình hoặc trường học.',
      expectedOutcome: 'Vận dụng thông điệp của văn bản để liên hệ hành động thực tế giàu ý nghĩa đạo đức của bản thân.',
      score: 1.5,
    },
    {
      id: 'van_q9',
      questionNumber: 'Bài viết',
      partType: 'TU_LUAN',
      topic: 'Viết bài văn nghị luận xã hội',
      subTopic: 'Nghị luận về một tư tưởng đạo lý, lối sống đẹp',
      level: 'VAN_DUNG',
      competency: 'NLV',
      contentSnippet: 'Viết bài văn nghị luận xã hội về ý nghĩa của sự sẻ chia và lòng nhân ái trong cuộc sống.',
      fullQuestionText: 'II. VIẾT (4,0 điểm)\nViết một bài văn nghị luận ngắn (khoảng 400 - 500 chữ) trình bày suy nghĩ của em về ý nghĩa của sự sẻ chia và lòng nhân ái trong xã hội ngày nay.',
      expectedOutcome: 'Viết bài văn nghị luận xã hội hoàn chỉnh có mở bài, thân bài, kết bài; lập luận chặt chẽ, dẫn chứng xác thực, cảm xúc chân thành.',
      score: 4.0,
    },
  ],
};

// ========================================================
// 3. LỊCH SỬ VÀ ĐỊA LÍ (LỊCH SỬ & ĐỊA LÍ 9 - CV 7991)
// ========================================================
export const SAMPLE_EXAM_SU_DIA: SampleExamData = {
  id: 'sudia9-hk1',
  subjectId: 'su_dia',
  name: 'Lịch sử và Địa lí 9 - Học kì I (CV 7991: Sử 5đ - Địa 5đ)',
  grade: '9',
  examType: 'Cuối kì I',
  meta: {
    title: 'ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I - MÔN LỊCH SỬ VÀ ĐỊA LÍ 9',
    grade: '9',
    subject: 'Lịch sử và Địa lí',
    school: 'TRƯỜNG THCS',
    timeLimit: '90 phút',
    summary: 'Khung ma trận & Bản đặc tả Lịch sử và Địa lí 9 chuẩn CV 7991: Phân môn Lịch sử (5,0đ: 2,0đ TN + 3,0đ TL) và Phân môn Địa lí (5,0đ: 2,0đ TN + 3,0đ TL). Tích hợp năng lực Lịch sử (NTLLS, NNTLS, NVDLS) và Địa lí (NNKHDL, NTHDL, NVDDL).',
  },
  rawText: `TRƯỜNG THCS - ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I
MÔN: LỊCH SỬ VÀ ĐỊA LÍ 9 - THỜI GIAN LÀM BÀI: 90 PHÚT

PHÂN MÔN LỊCH SỬ (5,0 ĐIỂM)
A. Trắc nghiệm (2,0 điểm - 4 câu, mỗi câu 0,5 điểm)
Câu 1. Cách mạng tháng Mười Nga năm 1917 do giai cấp nào lãnh đạo?
A. Giai cấp vô sản (Đảng Bôn-sê-vích).    B. Giai cấp tư sản.
C. Tầng lớp quý tộc phong kiến.          D. Tầng lớp trí thức tiểu tư sản.
Câu 2. Sau Chiến tranh thế giới thứ hai, phong trào giải phóng dân tộc bùng nổ mạnh mẽ nhất ở khu vực nào?
A. Châu Á, châu Phi và khu vực Mĩ Latinh.    B. Tây Âu và Bắc Mĩ.
C. Đông Âu và Bắc Á.                         D. Châu Đại Dương.
Câu 3. Sự kiện lịch sử nào đánh dấu bước ngoặt chấm dứt hoàn toàn ách thống trị của thực dân Pháp tại Đông Dương?
A. Chiến thắng Điện Biên Phủ năm 1954.       B. Cách mạng tháng Tám năm 1945.
C. Chiến thắng Việt Bắc thu - đông 1947.     D. Chiến dịch Biên giới thu - đông 1950.
Câu 4. Mục tiêu cốt lõi của tổ chức ASEAN khi mới thành lập năm 1967 là:
A. Hợp tác phát triển kinh tế, văn hoá và duy trì hoà bình khu vực.
B. Thành lập liên minh quân sự chống lại các nước lớn.
C. Xoá bỏ hoàn toàn biên giới giữa các quốc gia thành viên.
D. Sử dụng đồng tiền chung duy nhất cho toàn khu vực.

B. Tự luận (3,0 điểm)
Bài 1. (3,0 điểm) Trình bày ý nghĩa lịch sử của Cách mạng tháng Mười Nga năm 1917 đối với phong trào cách mạng thế giới và cách mạng Việt Nam.

PHÂN MÔN ĐỊA LÍ (5,0 ĐIỂM)
A. Trắc nghiệm (2,0 điểm - 4 câu, mỗi câu 0,5 điểm)
Câu 5. Cơ cấu dân số theo độ tuổi của nước ta hiện nay đang ở giai đoạn:
A. Cơ cấu dân số vàng.    B. Cơ cấu dân số già.
C. Cơ cấu dân số trẻ.     D. Dân số suy giảm nghiêm trọng.
Câu 6. Vùng đồng bằng nào là vựa lúa lớn nhất của cả nước?
A. Đồng bằng sông Cửu Long.    B. Đồng bằng sông Hồng.
C. Đồng bằng duyên hải miền Trung.    D. Đồng bằng Thanh - Nghệ - Tĩnh.
Câu 7. Ngành công nghiệp nào sau đây là ngành công nghiệp trọng điểm của nước ta?
A. Công nghiệp chế biến lương thực, thực phẩm.    B. Công nghiệp luyện kim màu.
C. Công nghiệp đóng tàu ngầm hạt nhân.           D. Công nghiệp hàng không vũ trụ.
Câu 8. Yếu tố tự nhiên nào ảnh hưởng sâu sắc nhất đến tính mùa vụ trong sản xuất nông nghiệp nước ta?
A. Khí hậu nhiệt đới ẩm gió mùa có sự phân hoá.    B. Địa hình chủ yếu là đồi núi thấp.
C. Mạng lưới sông ngòi dày đặc nhiều phù sa.        D. Nguồn tài nguyên khoáng sản phong phú.

B. Tự luận (3,0 điểm)
Bài 2. (3,0 điểm) Phân tích những thuận lợi và khó khăn về tự nhiên đối với sự phát triển nông nghiệp ở vùng Đồng bằng sông Hồng.`,
  questions: [
    {
      id: 'sudia_q1',
      questionNumber: 'Câu 1',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Lịch sử thế giới hiện đại',
      subTopic: 'Cách mạng tháng Mười Nga năm 1917',
      level: 'BIET',
      competency: 'NNTLS',
      contentSnippet: 'Lãnh đạo của Cách mạng tháng Mười Nga năm 1917.',
      fullQuestionText: 'Cách mạng tháng Mười Nga năm 1917 do giai cấp nào lãnh đạo?\nA. Giai cấp vô sản (Đảng Bôn-sê-vích).    B. Giai cấp tư sản.\nC. Tầng lớp quý tộc phong kiến.          D. Tầng lớp trí thức tiểu tư sản.',
      options: ['A. Giai cấp vô sản (Đảng Bôn-sê-vích).', 'B. Giai cấp tư sản.', 'C. Tầng lớp quý tộc phong kiến.', 'D. Tầng lớp trí thức tiểu tư sản.'],
      expectedOutcome: 'Nhận biết giai cấp lãnh đạo và tính chất của Cách mạng tháng Mười Nga.',
      score: 0.5,
    },
    {
      id: 'sudia_q2',
      questionNumber: 'Câu 2',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Lịch sử thế giới hiện đại',
      subTopic: 'Phong trào giải phóng dân tộc thế giới',
      level: 'BIET',
      competency: 'NNTLS',
      contentSnippet: 'Khu vực bùng nổ phong trào giải phóng dân tộc sau 1945.',
      fullQuestionText: 'Sau Chiến tranh thế giới thứ hai, phong trào giải phóng dân tộc bùng nổ mạnh mẽ nhất ở khu vực nào?\nA. Châu Á, châu Phi và khu vực Mĩ Latinh.    B. Tây Âu và Bắc Mĩ.\nC. Đông Âu và Bắc Á.                         D. Châu Đại Dương.',
      options: ['A. Châu Á, châu Phi và khu vực Mĩ Latinh.', 'B. Tây Âu và Bắc Mĩ.', 'C. Đông Âu và Bắc Á.', 'D. Châu Đại Dương.'],
      expectedOutcome: 'Nhận biết các khu vực trọng tâm của phong trào giải phóng dân tộc sau Chiến tranh thế giới thứ hai.',
      score: 0.5,
    },
    {
      id: 'sudia_q3',
      questionNumber: 'Câu 3',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Lịch sử Việt Nam',
      subTopic: 'Kháng chiến chống thực dân Pháp (1945 - 1954)',
      level: 'HIEU',
      competency: 'NTLLS',
      contentSnippet: 'Chiến thắng Điện Biên Phủ chấm dứt ách thống trị của thực dân Pháp.',
      fullQuestionText: 'Sự kiện lịch sử nào đánh dấu bước ngoặt chấm dứt hoàn toàn ách thống trị của thực dân Pháp tại Đông Dương?\nA. Chiến thắng Điện Biên Phủ năm 1954.       B. Cách mạng tháng Tám năm 1945.\nC. Chiến thắng Việt Bắc thu - đông 1947.     D. Chiến dịch Biên giới thu - đông 1950.',
      options: ['A. Chiến thắng Điện Biên Phủ năm 1954.', 'B. Cách mạng tháng Tám năm 1945.', 'C. Chiến thắng Việt Bắc thu - đông 1947.', 'D. Chiến dịch Biên giới thu - đông 1950.'],
      expectedOutcome: 'Hiểu ý nghĩa bước ngoặt của chiến thắng lịch sử Điện Biên Phủ 1954.',
      score: 0.5,
    },
    {
      id: 'sudia_q4',
      questionNumber: 'Câu 4',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Lịch sử thế giới hiện đại',
      subTopic: 'Tổ chức ASEAN và khu vực Đông Nam Á',
      level: 'HIEU',
      competency: 'NVDLS',
      contentSnippet: 'Mục tiêu thành lập tổ chức ASEAN năm 1967.',
      fullQuestionText: 'Mục tiêu cốt lõi của tổ chức ASEAN khi mới thành lập năm 1967 là:\nA. Hợp tác phát triển kinh tế, văn hoá và duy trì hoà bình khu vực.\nB. Thành lập liên minh quân sự chống lại các nước lớn.\nC. Xoá bỏ hoàn toàn biên giới giữa các quốc gia thành viên.\nD. Sử dụng đồng tiền chung duy nhất cho toàn khu vực.',
      options: ['A. Hợp tác phát triển kinh tế, văn hoá và duy trì hoà bình khu vực.', 'B. Thành lập liên minh quân sự chống lại các nước lớn.', 'C. Xoá bỏ hoàn toàn biên giới giữa các quốc gia thành viên.', 'D. Sử dụng đồng tiền chung duy nhất cho toàn khu vực.'],
      expectedOutcome: 'Hiểu mục đích tôn chỉ hợp tác kinh tế, văn hoá và hoà bình của Hiệp hội các quốc gia Đông Nam Á.',
      score: 0.5,
    },
    {
      id: 'sudia_q5',
      questionNumber: 'Bài 1 (Sử)',
      partType: 'TU_LUAN',
      topic: 'Lịch sử thế giới hiện đại',
      subTopic: 'Ý nghĩa lịch sử của Cách mạng tháng Mười Nga',
      level: 'VAN_DUNG',
      competency: 'NVDLS',
      contentSnippet: 'Phân tích ý nghĩa Cách mạng tháng Mười Nga đối với thế giới và cách mạng Việt Nam.',
      fullQuestionText: 'Bài 1. (3,0 điểm) Trình bày ý nghĩa lịch sử của Cách mạng tháng Mười Nga năm 1917 đối với phong trào cách mạng thế giới và cách mạng Việt Nam.',
      expectedOutcome: 'Vận dụng tư duy lịch sử phân tích tác động to lớn của Cách mạng tháng Mười Nga và con đường cứu nước của Nguyễn Ái Quốc.',
      score: 3.0,
    },
    {
      id: 'sudia_q6',
      questionNumber: 'Câu 5',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Địa lí dân cư Việt Nam',
      subTopic: 'Cơ cấu dân số và nguồn lao động',
      level: 'BIET',
      competency: 'NNKHDL',
      contentSnippet: 'Cơ cấu dân số vàng của Việt Nam hiện nay.',
      fullQuestionText: 'Cơ cấu dân số theo độ tuổi của nước ta hiện nay đang ở giai đoạn:\nA. Cơ cấu dân số vàng.    B. Cơ cấu dân số già.\nC. Cơ cấu dân số trẻ.     D. Dân số suy giảm nghiêm trọng.',
      options: ['A. Cơ cấu dân số vàng.', 'B. Cơ cấu dân số già.', 'C. Cơ cấu dân số trẻ.', 'D. Dân số suy giảm nghiêm trọng.'],
      expectedOutcome: 'Nhận biết đặc điểm cơ cấu dân số vàng của nước ta hiện nay.',
      score: 0.5,
    },
    {
      id: 'sudia_q7',
      questionNumber: 'Câu 6',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Địa lí kinh tế Việt Nam',
      subTopic: 'Địa lí ngành nông nghiệp',
      level: 'BIET',
      competency: 'NNKHDL',
      contentSnippet: 'Vùng vựa lúa lớn nhất nước ta là Đồng bằng sông Cửu Long.',
      fullQuestionText: 'Vùng đồng bằng nào là vựa lúa lớn nhất của cả nước?\nA. Đồng bằng sông Cửu Long.    B. Đồng bằng sông Hồng.\nC. Đồng bằng duyên hải miền Trung.    D. Đồng bằng Thanh - Nghệ - Tĩnh.',
      options: ['A. Đồng bằng sông Cửu Long.', 'B. Đồng bằng sông Hồng.', 'C. Đồng bằng duyên hải miền Trung.', 'D. Đồng bằng Thanh - Nghệ - Tĩnh.'],
      expectedOutcome: 'Nhận biết vị trí vai trò của Đồng bằng sông Cửu Long là vùng trọng điểm lúa gạo lớn nhất cả nước.',
      score: 0.5,
    },
    {
      id: 'sudia_q8',
      questionNumber: 'Câu 7',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Địa lí kinh tế Việt Nam',
      subTopic: 'Địa lí ngành công nghiệp',
      level: 'BIET',
      competency: 'NNKHDL',
      contentSnippet: 'Công nghiệp chế biến lương thực thực phẩm là ngành trọng điểm.',
      fullQuestionText: 'Ngành công nghiệp nào sau đây là ngành công nghiệp trọng điểm của nước ta?\nA. Công nghiệp chế biến lương thực, thực phẩm.    B. Công nghiệp luyện kim màu.\nC. Công nghiệp đóng tàu ngầm hạt nhân.           D. Công nghiệp hàng không vũ trụ.',
      options: ['A. Công nghiệp chế biến lương thực, thực phẩm.', 'B. Công nghiệp luyện kim màu.', 'C. Công nghiệp đóng tàu ngầm hạt nhân.', 'D. Công nghiệp hàng không vũ trụ.'],
      expectedOutcome: 'Nhận biết các ngành công nghiệp trọng điểm dựa trên thế mạnh nguồn nguyên liệu dồi dào.',
      score: 0.5,
    },
    {
      id: 'sudia_q9',
      questionNumber: 'Câu 8',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Địa lí tự nhiên và nông nghiệp',
      subTopic: 'Tác động của khí hậu đối với sản xuất nông nghiệp',
      level: 'HIEU',
      competency: 'NTHDL',
      contentSnippet: 'Khí hậu nhiệt đới ẩm gió mùa tạo nên tính mùa vụ nông nghiệp.',
      fullQuestionText: 'Yếu tố tự nhiên nào ảnh hưởng sâu sắc nhất đến tính mùa vụ trong sản xuất nông nghiệp nước ta?\nA. Khí hậu nhiệt đới ẩm gió mùa có sự phân hoá.    B. Địa hình chủ yếu là đồi núi thấp.\nC. Mạng lưới sông ngòi dày đặc nhiều phù sa.        D. Nguồn tài nguyên khoáng sản phong phú.',
      options: ['A. Khí hậu nhiệt đới ẩm gió mùa có sự phân hoá.', 'B. Địa hình chủ yếu là đồi núi thấp.', 'C. Mạng lưới sông ngòi dày đặc nhiều phù sa.', 'D. Nguồn tài nguyên khoáng sản phong phú.'],
      expectedOutcome: 'Hiểu mối quan hệ nhân quả giữa khí hậu gió mùa phân hoá theo mùa và tính mùa vụ của nông nghiệp.',
      score: 0.5,
    },
    {
      id: 'sudia_q10',
      questionNumber: 'Bài 2 (Địa)',
      partType: 'TU_LUAN',
      topic: 'Địa lí các vùng kinh tế',
      subTopic: 'Vùng Đồng bằng sông Hồng',
      level: 'VAN_DUNG',
      competency: 'NVDDL',
      contentSnippet: 'Phân tích thuận lợi và khó khăn tự nhiên cho nông nghiệp vùng Đồng bằng sông Hồng.',
      fullQuestionText: 'Bài 2. (3,0 điểm) Phân tích những thuận lợi và khó khăn về tự nhiên đối với sự phát triển nông nghiệp ở vùng Đồng bằng sông Hồng.',
      expectedOutcome: 'Vận dụng kiến thức địa lí tự nhiên đánh giá đất phù sa, nguồn nước, khí hậu có mùa đông lạnh trồng cây vụ đông và thiên tai bão lũ.',
      score: 3.0,
    },
  ],
};

// ========================================================
// 4. TIN HỌC (TIN HỌC 9 - CV 7991)
// ========================================================
export const SAMPLE_EXAM_TIN: SampleExamData = {
  id: 'tin9-hk1',
  subjectId: 'tin',
  name: 'Tin học 9 - Học kì I (CV 7991: TN 4đ - TL 6đ)',
  grade: '9',
  examType: 'Cuối kì I',
  meta: {
    title: 'ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I - MÔN TIN HỌC 9',
    grade: '9',
    subject: 'Tin học',
    school: 'TRƯỜNG THCS',
    timeLimit: '45 phút',
    summary: 'Khung ma trận & Bản đặc tả môn Tin học 9: Mạng máy tính, Dịch vụ Internet, An toàn thông tin và Lập trình trực quan/Bảng tính. Tích hợp 5 năng lực tin học: NLa, NLb, NLc, NLd, NLe.',
  },
  rawText: `TRƯỜNG THCS - ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I
MÔN: TIN HỌC 9 - THỜI GIAN LÀM BÀI: 45 PHÚT

PHẦN I. Trắc nghiệm (4,0 điểm - 8 câu, mỗi câu 0,5 điểm)
Câu 1. Mạng máy tính gồm có những thành phần cơ bản nào?
A. Thiết bị đầu cuối, thiết bị kết nối và phần mềm mạng.
B. Máy tính để bàn và bàn phím.
C. Chuột máy tính và màn hình.
D. Dây điện và nguồn điện.
Câu 2. Thiết bị nào sau đây dùng để kết nối các máy tính trong một mạng nội bộ (LAN)?
A. Switch (Bộ chuyển mạch) hoặc Hub.    B. Bàn phím máy tính.
C. Màn hình máy tính.                   D. Ổ đĩa cứng rời.
Câu 3. Mật khẩu nào sau đây được coi là có độ an toàn và bảo mật cao nhất?
A. T0@nH0c#2025!    B. 12345678    C. password    D. abcxyz
Câu 4. Hành vi nào sau đây vi phạm bản quyền và đạo đức khi sử dụng mạng xã hội?
A. Đăng tải và sử dụng tranh ảnh của người khác khi chưa được sự cho phép.
B. Ghi rõ nguồn gốc khi trích dẫn bài học từ cổng thông tin giáo dục.
C. Tham gia các diễn đàn học tập trực tuyến cùng các bạn.
D. Tự viết bài cảm nghĩ và đăng tải trên trang cá nhân của mình.
Câu 5. Trong phần mềm bảng tính Excel, công thức tính trung bình cộng của các ô từ A1 đến A5 là:
A. =AVERAGE(A1:A5)    B. =SUM(A1:A5)    C. =MAX(A1:A5)    D. =COUNT(A1:A5)
Câu 6. Để tìm kiếm chính xác một cụm từ trên Google, ta nên đặt cụm từ đó trong dấu nào?
A. Dấu ngoặc kép "..."    B. Dấu ngoặc tròn (...)    C. Dấu gạch chéo /.../    D. Dấu chấm hỏi ?...?
Câu 7. Trong môi trường lập trình trực quan (như Scratch), khối lệnh nào dùng để thực hiện lặp đi lặp lại một hành động?
A. Khối lệnh "lặp lại" (Repeat) hoặc "liên tục" (Forever).
B. Khối lệnh "nói" (Say).
C. Khối lệnh "di chuyển" (Move).
D. Khối lệnh "đợi" (Wait).
Câu 8. Thư điện tử (Email) mang lại lợi ích nào so với thư truyền thống?
A. Tốc độ gửi và nhận gần như tức thời, đính kèm được nhiều dạng tệp tin.
B. Cần có người vận chuyển thư trực tiếp đến tận nhà.
C. Chi phí gửi mỗi lá thư tính theo trọng lượng giấy.
D. Chỉ gửi được trong phạm vi cùng một thành phố.

PHẦN II. Tự luận (6,0 điểm - 2 bài)
Bài 1. (3,0 điểm) Nêu 3 biện pháp phòng tránh virus máy tính và mã độc khi sử dụng Internet.
Bài 2. (3,0 điểm) Hãy viết thuật toán bằng sơ đồ khối hoặc liệt kê các bước để tìm số lớn nhất trong hai số nguyên a và b được nhập từ bàn phím.`,
  questions: [
    {
      id: 'tin_q1',
      questionNumber: 'Câu 1',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Máy tính và cộng đồng',
      subTopic: 'Mạng máy tính và Internet',
      level: 'BIET',
      competency: 'NLa',
      contentSnippet: 'Thành phần cơ bản của mạng máy tính.',
      fullQuestionText: 'Mạng máy tính gồm có những thành phần cơ bản nào?\nA. Thiết bị đầu cuối, thiết bị kết nối và phần mềm mạng.\nB. Máy tính để bàn và bàn phím.\nC. Chuột máy tính và màn hình.\nD. Dây điện và nguồn điện.',
      options: ['A. Thiết bị đầu cuối, thiết bị kết nối và phần mềm mạng.', 'B. Máy tính để bàn và bàn phím.', 'C. Chuột máy tính và màn hình.', 'D. Dây điện và nguồn điện.'],
      expectedOutcome: 'Nhận biết các thành phần cơ bản cấu thành một hệ thống mạng máy tính.',
      score: 0.5,
    },
    {
      id: 'tin_q2',
      questionNumber: 'Câu 2',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Máy tính và cộng đồng',
      subTopic: 'Thiết bị mạng nội bộ LAN',
      level: 'BIET',
      competency: 'NLa',
      contentSnippet: 'Thiết bị Switch kết nối mạng cục bộ.',
      fullQuestionText: 'Thiết bị nào sau đây dùng để kết nối các máy tính trong một mạng nội bộ (LAN)?\nA. Switch (Bộ chuyển mạch) hoặc Hub.    B. Bàn phím máy tính.\nC. Màn hình máy tính.                   D. Ổ đĩa cứng rời.',
      options: ['A. Switch (Bộ chuyển mạch) hoặc Hub.', 'B. Bàn phím máy tính.', 'C. Màn hình máy tính.', 'D. Ổ đĩa cứng rời.'],
      expectedOutcome: 'Nhận biết chức năng của thiết bị Switch trong mạng máy tính.',
      score: 0.5,
    },
    {
      id: 'tin_q3',
      questionNumber: 'Câu 3',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Đạo đức, pháp luật và văn hoá trong môi trường số',
      subTopic: 'An toàn và bảo mật thông tin',
      level: 'HIEU',
      competency: 'NLb',
      contentSnippet: 'Tạo lập mật khẩu mạnh có chữ hoa, thường, số và kí tự đặc biệt.',
      fullQuestionText: 'Mật khẩu nào sau đây được coi là có độ an toàn và bảo mật cao nhất?\nA. T0@nH0c#2025!    B. 12345678    C. password    D. abcxyz',
      options: ['A. T0@nH0c#2025!', 'B. 12345678', 'C. password', 'D. abcxyz'],
      expectedOutcome: 'Hiểu các nguyên tắc xây dựng mật khẩu bảo mật cao để bảo vệ tài khoản số cá nhân.',
      score: 0.5,
    },
    {
      id: 'tin_q4',
      questionNumber: 'Câu 4',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Đạo đức, pháp luật và văn hoá trong môi trường số',
      subTopic: 'Bản quyền và ứng xử mạng',
      level: 'HIEU',
      competency: 'NLb',
      contentSnippet: 'Hành vi vi phạm bản quyền tranh ảnh trên mạng xã hội.',
      fullQuestionText: 'Hành vi nào sau đây vi phạm bản quyền và đạo đức khi sử dụng mạng xã hội?\nA. Đăng tải và sử dụng tranh ảnh của người khác khi chưa được sự cho phép.\nB. Ghi rõ nguồn gốc khi trích dẫn bài học từ cổng thông tin giáo dục.\nC. Tham gia các diễn đàn học tập trực tuyến cùng các bạn.\nD. Tự viết bài cảm nghĩ và đăng tải trên trang cá nhân của mình.',
      options: [
        'A. Đăng tải và sử dụng tranh ảnh của người khác khi chưa được sự cho phép.',
        'B. Ghi rõ nguồn gốc khi trích dẫn bài học từ cổng thông tin giáo dục.',
        'C. Tham gia các diễn đàn học tập trực tuyến cùng các bạn.',
        'D. Tự viết bài cảm nghĩ và đăng tải trên trang cá nhân của mình.',
      ],
      expectedOutcome: 'Nhận biết và tôn trọng quyền tác giả, bản quyền nội dung trên không gian mạng.',
      score: 0.5,
    },
    {
      id: 'tin_q5',
      questionNumber: 'Câu 5',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Ứng dụng tin học',
      subTopic: 'Bảng tính điện tử và hàm tính toán',
      level: 'BIET',
      competency: 'NLa',
      contentSnippet: 'Hàm AVERAGE tính trung bình cộng trong bảng tính.',
      fullQuestionText: 'Trong phần mềm bảng tính Excel, công thức tính trung bình cộng của các ô từ A1 đến A5 là:\nA. =AVERAGE(A1:A5)    B. =SUM(A1:A5)    C. =MAX(A1:A5)    D. =COUNT(A1:A5)',
      options: ['A. =AVERAGE(A1:A5)', 'B. =SUM(A1:A5)', 'C. =MAX(A1:A5)', 'D. =COUNT(A1:A5)'],
      expectedOutcome: 'Sử dụng đúng cú pháp hàm AVERAGE trong phần mềm bảng tính.',
      score: 0.5,
    },
    {
      id: 'tin_q6',
      questionNumber: 'Câu 6',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Tổ chức lưu trữ, tìm kiếm thông tin',
      subTopic: 'Kĩ năng tìm kiếm thông tin trên Internet',
      level: 'HIEU',
      competency: 'NLd',
      contentSnippet: 'Sử dụng dấu ngoặc kép để tìm kiếm cụm từ chính xác.',
      fullQuestionText: 'Để tìm kiếm chính xác một cụm từ trên Google, ta nên đặt cụm từ đó trong dấu nào?\nA. Dấu ngoặc kép "..."    B. Dấu ngoặc tròn (...)    C. Dấu gạch chéo /.../    D. Dấu chấm hỏi ?...?',
      options: ['A. Dấu ngoặc kép "..."', 'B. Dấu ngoặc tròn (...)', 'C. Dấu gạch chéo /.../', 'D. Dấu chấm hỏi ?...?'],
      expectedOutcome: 'Vận dụng kĩ thuật tìm kiếm nâng cao với toán tử dấu ngoặc kép để tìm kiếm tài liệu học tập.',
      score: 0.5,
    },
    {
      id: 'tin_q7',
      questionNumber: 'Câu 7',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Giải quyết vấn đề với sự hỗ trợ của máy tính',
      subTopic: 'Thuật toán và cấu trúc lặp',
      level: 'BIET',
      competency: 'NLc',
      contentSnippet: 'Khối lệnh cấu trúc lặp trong môi trường lập trình trực quan.',
      fullQuestionText: 'Trong môi trường lập trình trực quan (như Scratch), khối lệnh nào dùng để thực hiện lặp đi lặp lại một hành động?\nA. Khối lệnh "lặp lại" (Repeat) hoặc "liên tục" (Forever).\nB. Khối lệnh "nói" (Say).\nC. Khối lệnh "di chuyển" (Move).\nD. Khối lệnh "đợi" (Wait).',
      options: [
        'A. Khối lệnh "lặp lại" (Repeat) hoặc "liên tục" (Forever).',
        'B. Khối lệnh "nói" (Say).',
        'C. Khối lệnh "di chuyển" (Move).',
        'D. Khối lệnh "đợi" (Wait).',
      ],
      expectedOutcome: 'Nhận biết cấu trúc lặp trong biểu diễn thuật toán lập trình trực quan.',
      score: 0.5,
    },
    {
      id: 'tin_q8',
      questionNumber: 'Câu 8',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Ứng dụng tin học',
      subTopic: 'Thư điện tử và trao đổi thông tin',
      level: 'HIEU',
      competency: 'NLe',
      contentSnippet: 'Ưu điểm của dịch vụ thư điện tử Internet.',
      fullQuestionText: 'Thư điện tử (Email) mang lại lợi ích nào so với thư truyền thống?\nA. Tốc độ gửi và nhận gần như tức thời, đính kèm được nhiều dạng tệp tin.\nB. Cần có người vận chuyển thư trực tiếp đến tận nhà.\nC. Chi phí gửi mỗi lá thư tính theo trọng lượng giấy.\nD. Chỉ gửi được trong phạm vi cùng một thành phố.',
      options: [
        'A. Tốc độ gửi và nhận gần như tức thời, đính kèm được nhiều dạng tệp tin.',
        'B. Cần có người vận chuyển thư trực tiếp đến tận nhà.',
        'C. Chi phí gửi mỗi lá thư tính theo trọng lượng giấy.',
        'D. Chỉ gửi được trong phạm vi cùng một thành phố.',
      ],
      expectedOutcome: 'Hiểu tính ưu việt của dịch vụ mạng thư điện tử trong học tập và hợp tác trực tuyến.',
      score: 0.5,
    },
    {
      id: 'tin_q9',
      questionNumber: 'Bài 1',
      partType: 'TU_LUAN',
      topic: 'Đạo đức, pháp luật và văn hoá trong môi trường số',
      subTopic: 'Biện pháp an toàn phòng chống mã độc và virus',
      level: 'VAN_DUNG',
      competency: 'NLb',
      contentSnippet: 'Nêu các biện pháp phòng chống virus máy tính khi sử dụng mạng.',
      fullQuestionText: 'Bài 1. (3,0 điểm) Nêu 3 biện pháp phòng tránh virus máy tính và mã độc khi sử dụng Internet.',
      expectedOutcome: 'Đề xuất các thói quen an toàn số: cài phần mềm diệt virus, không mở tệp tin lạ, sao lưu dữ liệu định kì.',
      score: 3.0,
    },
    {
      id: 'tin_q10',
      questionNumber: 'Bài 2',
      partType: 'TU_LUAN',
      topic: 'Giải quyết vấn đề với sự hỗ trợ của máy tính',
      subTopic: 'Biểu diễn thuật toán rẽ nhánh',
      level: 'VAN_DUNG',
      competency: 'NLc',
      contentSnippet: 'Viết thuật toán tìm số lớn nhất giữa hai số a và b.',
      fullQuestionText: 'Bài 2. (3,0 điểm) Hãy viết thuật toán bằng sơ đồ khối hoặc liệt kê các bước để tìm số lớn nhất trong hai số nguyên a và b được nhập từ bàn phím.',
      expectedOutcome: 'Biểu diễn chính xác thuật toán so sánh rẽ nhánh có điều kiện if a > b then max = a else max = b.',
      score: 3.0,
    },
  ],
};

// ========================================================
// 5. TIẾNG ANH (TIẾNG ANH 9 - CV 7991)
// ========================================================
export const SAMPLE_EXAM_ANH: SampleExamData = {
  id: 'anh9-hk1',
  subjectId: 'anh',
  name: 'Tiếng Anh 9 - Học kì I (CV 7991: TN 6đ - TL 4đ)',
  grade: '9',
  examType: 'Cuối kì I',
  meta: {
    title: 'ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I - MÔN TIẾNG ANH 9',
    grade: '9',
    subject: 'Tiếng Anh',
    school: 'TRƯỜNG THCS',
    timeLimit: '60 phút',
    summary: 'Khung ma trận & Bản đặc tả môn Tiếng Anh 9 chuẩn CV 7991: Language Focus (Ngữ âm, Từ vựng, Ngữ pháp: 3,0đ), Reading Comprehension (3,0đ), Writing (4,0đ). Tích hợp các năng lực ngôn ngữ: NLU, NLR, NLW.',
  },
  rawText: `TRƯỜNG THCS - ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I
MÔN: TIẾNG ANH 9 - THỜI GIAN LÀM BÀI: 60 PHÚT

SECTION I. LANGUAGE FOCUS (3.0 points - 6 questions, 0.5 pt each)
Mark the letter A, B, C, or D to indicate the correct word or phrase.
Question 1. Choose the word whose underlined part is pronounced differently from the others:
A. played    B. lived    C. worked    D. opened
Question 2. Bat Trang is famous _______ its traditional ceramic and pottery products.
A. for    B. about    C. with    D. on
Question 3. If we _______ water and electricity, we will save money and protect the environment.
A. save    B. saved    C. will save    D. saving
Question 4. She asked me _______ I liked living in the countryside or in the city.
A. whether    B. that    C. what    D. weather
Question 5. The boy didn't know _______ to solve this difficult math exercise.
A. how    B. what    C. why    D. where
Question 6. I suggest _______ trees along the school yard to make it greener.
A. planting    B. to plant    C. plant    D. planted

SECTION II. READING COMPREHENSION (3.0 points - 6 questions, 0.5 pt each)
Read the passage and choose the best answer A, B, C, or D:
"Living in a big city offers many advantages. First, there are better schools, modern hospitals, and convenient public transport systems like buses and sky-trains. Moreover, young people have various opportunities for high-paying jobs and entertainment. However, city dwellers also face serious problems. Air pollution from vehicles and factories harms citizens' health every day. Traffic jams during rush hours cause stress and waste valuable time. Therefore, many people now choose to live in green satellite towns where life is quieter and fresher."

Question 7. What is the main idea of the passage?
A. Advantages and disadvantages of city life.
B. How to reduce traffic jams in big cities.
C. Why entertainment is important for young people.
D. The history of public transport systems.
Question 8. According to the text, what harms city citizens' health?
A. Air pollution from vehicles and factories.
B. Better schools and hospitals.
C. Living in green satellite towns.
D. High-paying jobs.
Question 9. The word "dwellers" in line 4 is closest in meaning to:
A. residents (cư dân)    B. visitors    C. students    D. drivers
Question 10. Which is NOT mentioned as an advantage of city life?
A. Cheap housing for everyone.    B. Better schools.
C. Modern hospitals.              D. Convenient public transport.
Question 11. Why do many people choose to move to satellite towns?
A. Because life is quieter and fresher.
B. Because there are no schools.
C. Because traffic jams are worse there.
D. Because they don't like modern technology.
Question 12. The word "it" in the last line refers to:
A. satellite town life    B. public transport    C. traffic jam    D. big factory

SECTION III. WRITING (4.0 points - 4 questions, 1.0 pt each)
Rewrite the sentences so that they have the same meaning as the original ones:
Question 13. "I am practicing speaking English with my friends now," Minh said.
-> Minh said that ___________________________________________________.
Question 14. They built this community bridge two years ago.
-> This community bridge was _________________________________________.
Question 15. Because Lan worked hard, she passed the entrance examination easily.
-> Because of ______________________________________________________.
Question 16. Although it was raining heavily, the students still went to school on time.
-> In spite of ______________________________________________________.`,
  questions: [
    {
      id: 'anh_q1',
      questionNumber: 'Question 1',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Phonetics (Ngữ âm)',
      subTopic: 'Phát âm đuôi -ed',
      level: 'BIET',
      competency: 'NLU',
      contentSnippet: 'Pronunciation of past tense ending -ed.',
      fullQuestionText: 'Choose the word whose underlined part is pronounced differently from the others:\nA. played    B. lived    C. worked    D. opened',
      options: ['A. played', 'B. lived', 'C. worked', 'D. opened'],
      expectedOutcome: 'Recognize the pronunciation rule of -ed endings in English regular verbs.',
      score: 0.5,
    },
    {
      id: 'anh_q2',
      questionNumber: 'Question 2',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Vocabulary & Prepositions',
      subTopic: 'Cụm tính từ đi với giới từ (famous for)',
      level: 'BIET',
      competency: 'NLU',
      contentSnippet: 'Collocation: famous for.',
      fullQuestionText: 'Bat Trang is famous _______ its traditional ceramic and pottery products.\nA. for    B. about    C. with    D. on',
      options: ['A. for', 'B. about', 'C. with', 'D. on'],
      expectedOutcome: 'Identify the correct preposition following the adjective "famous".',
      score: 0.5,
    },
    {
      id: 'anh_q3',
      questionNumber: 'Question 3',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Grammar',
      subTopic: 'Câu điều kiện loại 1 (Conditional Sentence Type 1)',
      level: 'BIET',
      competency: 'NLU',
      contentSnippet: 'Conditional sentence type 1 present tense in if-clause.',
      fullQuestionText: 'If we _______ water and electricity, we will save money and protect the environment.\nA. save    B. saved    C. will save    D. saving',
      options: ['A. save', 'B. saved', 'C. will save', 'D. saving'],
      expectedOutcome: 'Apply the correct verb form in the if-clause of conditional type 1.',
      score: 0.5,
    },
    {
      id: 'anh_q4',
      questionNumber: 'Question 4',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Grammar',
      subTopic: 'Câu gián tiếp với Yes/No question (whether/if)',
      level: 'HIEU',
      competency: 'NLU',
      contentSnippet: 'Reported question connector whether/if.',
      fullQuestionText: 'She asked me _______ I liked living in the countryside or in the city.\nA. whether    B. that    C. what    D. weather',
      options: ['A. whether', 'B. that', 'C. what', 'D. weather'],
      expectedOutcome: 'Understand and use conjunctions in indirect reported questions.',
      score: 0.5,
    },
    {
      id: 'anh_q5',
      questionNumber: 'Question 5',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Grammar',
      subTopic: 'Từ để hỏi trước to-V (Wh-word + to-infinitive)',
      level: 'HIEU',
      competency: 'NLU',
      contentSnippet: 'Question word followed by to-infinitive: how to solve.',
      fullQuestionText: 'The boy didn\'t know _______ to solve this difficult math exercise.\nA. how    B. what    C. why    D. where',
      options: ['A. how', 'B. what', 'C. why', 'D. where'],
      expectedOutcome: 'Choose the correct question word followed by a to-infinitive clause.',
      score: 0.5,
    },
    {
      id: 'anh_q6',
      questionNumber: 'Question 6',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Grammar',
      subTopic: 'Cấu trúc gợi ý suggest + V-ing',
      level: 'HIEU',
      competency: 'NLU',
      contentSnippet: 'Structure of suggest + V-ing.',
      fullQuestionText: 'I suggest _______ trees along the school yard to make it greener.\nA. planting    B. to plant    C. plant    D. planted',
      options: ['A. planting', 'B. to plant', 'C. plant', 'D. planted'],
      expectedOutcome: 'Master verb patterns with "suggest" followed by a gerund.',
      score: 0.5,
    },
    {
      id: 'anh_q7',
      questionNumber: 'Question 7',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Reading Comprehension',
      subTopic: 'Main idea of the reading passage',
      level: 'HIEU',
      competency: 'NLR',
      contentSnippet: 'Identify main idea of passage about city life.',
      fullQuestionText: 'What is the main idea of the passage?\nA. Advantages and disadvantages of city life.\nB. How to reduce traffic jams in big cities.\nC. Why entertainment is important for young people.\nD. The history of public transport systems.',
      options: [
        'A. Advantages and disadvantages of city life.',
        'B. How to reduce traffic jams in big cities.',
        'C. Why entertainment is important for young people.',
        'D. The history of public transport systems.',
      ],
      expectedOutcome: 'Skim reading to deduce the central topic of the expository passage.',
      score: 0.5,
    },
    {
      id: 'anh_q8',
      questionNumber: 'Question 8',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Reading Comprehension',
      subTopic: 'Scanning factual details in text',
      level: 'BIET',
      competency: 'NLR',
      contentSnippet: 'Identify fact about air pollution harms health.',
      fullQuestionText: 'According to the text, what harms city citizens\' health?\nA. Air pollution from vehicles and factories.\nB. Better schools and hospitals.\nC. Living in green satellite towns.\nD. High-paying jobs.',
      options: [
        'A. Air pollution from vehicles and factories.',
        'B. Better schools and hospitals.',
        'C. Living in green satellite towns.',
        'D. High-paying jobs.',
      ],
      expectedOutcome: 'Scan and retrieve specific factual information mentioned in the reading text.',
      score: 0.5,
    },
    {
      id: 'anh_q9',
      questionNumber: 'Question 9',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Reading Comprehension',
      subTopic: 'Contextual vocabulary guessing',
      level: 'HIEU',
      competency: 'NLR',
      contentSnippet: 'Infer meaning of word dwellers.',
      fullQuestionText: 'The word "dwellers" in line 4 is closest in meaning to:\nA. residents (cư dân)    B. visitors    C. students    D. drivers',
      options: ['A. residents (cư dân)', 'B. visitors', 'C. students', 'D. drivers'],
      expectedOutcome: 'Infer the synonym of a word in contextual reading.',
      score: 0.5,
    },
    {
      id: 'anh_q10',
      questionNumber: 'Question 10',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Reading Comprehension',
      subTopic: 'Negative fact checking (NOT mentioned)',
      level: 'HIEU',
      competency: 'NLR',
      contentSnippet: 'Negative check: cheap housing is not an advantage.',
      fullQuestionText: 'Which is NOT mentioned as an advantage of city life?\nA. Cheap housing for everyone.    B. Better schools.\nC. Modern hospitals.              D. Convenient public transport.',
      options: [
        'A. Cheap housing for everyone.',
        'B. Better schools.',
        'C. Modern hospitals.',
        'D. Convenient public transport.',
      ],
      expectedOutcome: 'Identify untrue or unmentioned details by analyzing passage content.',
      score: 0.5,
    },
    {
      id: 'anh_q11',
      questionNumber: 'Question 11',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Reading Comprehension',
      subTopic: 'Causal inference in reading',
      level: 'HIEU',
      competency: 'NLR',
      contentSnippet: 'Reason for living in satellite towns.',
      fullQuestionText: 'Why do many people choose to move to satellite towns?\nA. Because life is quieter and fresher.\nB. Because there are no schools.\nC. Because traffic jams are worse there.\nD. Because they don\'t like modern technology.',
      options: [
        'A. Because life is quieter and fresher.',
        'B. Because there are no schools.',
        'C. Because traffic jams are worse there.',
        'D. Because they don\'t like modern technology.',
      ],
      expectedOutcome: 'Understand cause-and-effect relationships stated in reading passages.',
      score: 0.5,
    },
    {
      id: 'anh_q12',
      questionNumber: 'Question 12',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Reading Comprehension',
      subTopic: 'Pronoun reference',
      level: 'HIEU',
      competency: 'NLR',
      contentSnippet: 'Pronoun reference resolution.',
      fullQuestionText: 'The word "it" in the last line refers to:\nA. satellite town life    B. public transport    C. traffic jam    D. big factory',
      options: ['A. satellite town life', 'B. public transport', 'C. traffic jam', 'D. big factory'],
      expectedOutcome: 'Resolve pronoun reference accurately across complex sentence structures.',
      score: 0.5,
    },
    {
      id: 'anh_q13',
      questionNumber: 'Question 13',
      partType: 'TU_LUAN',
      topic: 'Writing (Viết câu)',
      subTopic: 'Câu gián tiếp (Reported Speech - statements)',
      level: 'VAN_DUNG',
      competency: 'NLW',
      contentSnippet: 'Chuyển câu trực tiếp sang câu gián tiếp lùi thì và đổi đại từ.',
      fullQuestionText: 'Question 13. "I am practicing speaking English with my friends now," Minh said.\n-> Minh said that he was practicing speaking English with his friends then.',
      expectedOutcome: 'Transform direct speech to reported speech with proper backshift of tenses and pronoun adjustments.',
      score: 1.0,
    },
    {
      id: 'anh_q14',
      questionNumber: 'Question 14',
      partType: 'TU_LUAN',
      topic: 'Writing (Viết câu)',
      subTopic: 'Câu bị động thì Quá khứ đơn (Passive Voice)',
      level: 'VAN_DUNG',
      competency: 'NLW',
      contentSnippet: 'Chuyển câu chủ động sang bị động thì quá khứ đơn.',
      fullQuestionText: 'Question 14. They built this community bridge two years ago.\n-> This community bridge was built two years ago.',
      expectedOutcome: 'Transform active voice to passive voice accurately in simple past tense.',
      score: 1.0,
    },
    {
      id: 'anh_q15',
      questionNumber: 'Question 15',
      partType: 'TU_LUAN',
      topic: 'Writing (Viết câu)',
      subTopic: 'Chuyển đổi mệnh đề Because sang Because of + Noun phrase',
      level: 'VAN_DUNG',
      competency: 'NLW',
      contentSnippet: 'Chuyển đổi mệnh đề chỉ nguyên nhân Because sang cụm danh từ Because of.',
      fullQuestionText: 'Question 15. Because Lan worked hard, she passed the entrance examination easily.\n-> Because of Lan\'s hard work (her working hard), she passed the entrance examination easily.',
      expectedOutcome: 'Rewrite clause of reason with prepositional phrase "Because of".',
      score: 1.0,
    },
    {
      id: 'anh_q16',
      questionNumber: 'Question 16',
      partType: 'TU_LUAN',
      topic: 'Writing (Viết câu)',
      subTopic: 'Chuyển đổi mệnh đề Although sang In spite of + Noun phrase',
      level: 'VAN_DUNG',
      competency: 'NLW',
      contentSnippet: 'Chuyển đổi mệnh đề nhượng bộ Although sang In spite of.',
      fullQuestionText: 'Question 16. Although it was raining heavily, the students still went to school on time.\n-> In spite of the heavy rain, the students still went to school on time.',
      expectedOutcome: 'Rewrite concession clauses into prepositional phrases with "In spite of".',
      score: 1.0,
    },
  ],
};

// ========================================================
// 6. GIÁO DỤC CÔNG DÂN (GDCD 9 - CV 7991)
// ========================================================
export const SAMPLE_EXAM_GDCD: SampleExamData = {
  id: 'gdcd9-hk1',
  subjectId: 'gdcd',
  name: 'Giáo dục công dân 9 - Học kì I (CV 7991: TN 4đ - TL 6đ)',
  grade: '9',
  examType: 'Cuối kì I',
  meta: {
    title: 'ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I - MÔN GIÁO DỤC CÔNG DÂN 9',
    grade: '9',
    subject: 'Giáo dục công dân',
    school: 'TRƯỜNG THCS',
    timeLimit: '45 phút',
    summary: 'Khung ma trận & Bản đặc tả GDCD 9: Chuẩn mực đạo đức, Tự chủ, Chí công vô tư, Hoà bình và Pháp luật. Tích hợp 3 năng lực: Điều chỉnh hành vi (NLĐCHV), Phát triển bản thân (NLPTBT), Tham gia hoạt động KT-XH (NLTHTG).',
  },
  rawText: `TRƯỜNG THCS - ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I
MÔN: GIÁO DỤC CÔNG DÂN 9 - THỜI GIAN LÀM BÀI: 45 PHÚT

PHẦN I. Trắc nghiệm (4,0 điểm - 8 câu, mỗi câu 0,5 điểm)
Câu 1. Phẩm chất đạo đức nào thể hiện sự công bằng, không thiên vị, xuất phát từ lợi ích chung?
A. Chí công vô tư.    B. Tự ti.    C. Thực dụng.    D. Vị kỉ.
Câu 2. Tự chủ là khả năng của con người:
A. Làm chủ bản thân trong suy nghĩ, cảm xúc và hành vi.
B. Luôn hành động theo ý muốn cá nhân bất chấp người khác.
C. Nghe theo lời rủ rê của bạn bè mà không suy xét.
D. Dễ nổi nóng và mất bình tĩnh khi gặp khó khăn.
Câu 3. Hành vi nào sau đây góp phần gìn giữ và bảo vệ hoà bình?
A. Tôn trọng sự khác biệt văn hoá và giải quyết mâu thuẫn bằng đối thoại.
B. Kích động bạo lực và phân biệt chủng tộc.
C. Can thiệp vào công việc nội bộ của nước khác.
D. Sử dụng vũ lực để giải quyết tranh chấp biên giới.
Câu 4. Tình hữu nghị giữa các dân tộc trên thế giới mang lại ý nghĩa:
A. Tạo môi trường hoà bình, hợp tác cùng phát triển kinh tế, văn hoá.
B. Làm cho các quốc gia mất đi bản sắc dân tộc riêng.
C. Chỉ có lợi cho các nước giàu và phát triển.
D. Gây cản trở giao lưu học hỏi lẫn nhau.
Câu 5. Dân chủ và kỉ luật có mối quan hệ như thế nào?
A. Gắn bó chặt chẽ, hỗ trợ lẫn nhau; dân chủ phải đi đôi với kỉ luật.
B. Hoàn toàn đối lập và mâu thuẫn lẫn nhau.
C. Có kỉ luật thì sẽ làm mất đi tính dân chủ.
D. Dân chủ là muốn làm gì thì làm, không cần tuân theo quy định nào.
Câu 6. Biểu hiện nào sau đây là người biết kế thừa và phát huy truyền thống tốt đẹp của dân tộc?
A. Tự hào và tìm hiểu các làn điệu dân ca quê hương.
B. Coi thường các phong tục cổ truyền ngày Tết.
C. Chỉ ưa chuộng những thứ xa xỉ từ nước ngoài.
D. Phê phán lối sống tiết kiệm của ông bà xưa.
Câu 7. Trong giờ kiểm tra, Nam thấy bạn thân mở tài liệu quay cóp. Hành động nào của Nam thể hiện sự chí công vô tư?
A. Nhắc nhở bạn cất tài liệu và làm bài trung thực.
B. Làm ngơ coi như không thấy để bảo vệ tình bạn.
C. Cùng mở tài liệu với bạn để đạt điểm cao.
D. Che mắt thầy cô giáo cho bạn quay cóp dễ hơn.
Câu 8. Người có tính tự chủ thường có biểu hiện:
A. Bình tĩnh suy xét trước khi nói và làm.
B. Hành động bốc đồng khi bị bạn bè khiêu khích.
C. Ba phải, ai nói gì cũng gật đầu đồng ý.
D. Đổ lỗi cho hoàn cảnh khi gặp thất bại.

PHẦN II. Tự luận (6,0 điểm - 2 bài)
Bài 1. (3,0 điểm) Thế nào là lòng tự chủ? Nêu 3 việc làm cụ thể của học sinh THCS thể hiện tính tự chủ trong học tập và sinh hoạt hàng ngày.
Bài 2. (3,0 điểm) Xử lý tình huống: Trong một buổi thảo luận lớp về kế hoạch cắm trại 26/3, một số bạn có ý kiến khác biệt với Ban cán sự lớp. Lớp trưởng đã cắt lời và không cho các bạn đó phát biểu tiếp vì cho rằng mất thời gian.
a) Em có nhận xét gì về hành vi của bạn lớp trưởng trong tình huống trên?
b) Nếu là thành viên trong lớp, em sẽ ứng xử như thế nào để đảm bảo phát huy tính dân chủ và kỉ luật của tập thể?`,
  questions: [
    {
      id: 'gdcd_q1',
      questionNumber: 'Câu 1',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Chuẩn mực đạo đức',
      subTopic: 'Chí công vô tư',
      level: 'BIET',
      competency: 'NLĐCHV',
      contentSnippet: 'Khái niệm phẩm chất chí công vô tư.',
      fullQuestionText: 'Phẩm chất đạo đức nào thể hiện sự công bằng, không thiên vị, xuất phát từ lợi ích chung?\nA. Chí công vô tư.    B. Tự ti.    C. Thực dụng.    D. Vị kỉ.',
      options: ['A. Chí công vô tư.', 'B. Tự ti.', 'C. Thực dụng.', 'D. Vị kỉ.'],
      expectedOutcome: 'Nhận biết khái niệm chuẩn mực chí công vô tư.',
      score: 0.5,
    },
    {
      id: 'gdcd_q2',
      questionNumber: 'Câu 2',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Phát triển bản thân',
      subTopic: 'Tính tự chủ',
      level: 'BIET',
      competency: 'NLPTBT',
      contentSnippet: 'Khái niệm tính tự chủ trong cuộc sống.',
      fullQuestionText: 'Tự chủ là khả năng của con người:\nA. Làm chủ bản thân trong suy nghĩ, cảm xúc và hành vi.\nB. Luôn hành động theo ý muốn cá nhân bất chấp người khác.\nC. Nghe theo lời rủ rê của bạn bè mà không suy xét.\nD. Dễ nổi nóng và mất bình tĩnh khi gặp khó khăn.',
      options: [
        'A. Làm chủ bản thân trong suy nghĩ, cảm xúc và hành vi.',
        'B. Luôn hành động theo ý muốn cá nhân bất chấp người khác.',
        'C. Nghe theo lời rủ rê của bạn bè mà không suy xét.',
        'D. Dễ nổi nóng và mất bình tĩnh khi gặp khó khăn.',
      ],
      expectedOutcome: 'Nhận biết ý nghĩa và biểu hiện của phẩm chất tự chủ.',
      score: 0.5,
    },
    {
      id: 'gdcd_q3',
      questionNumber: 'Câu 3',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Vấn đề toàn cầu và xã hội',
      subTopic: 'Bảo vệ hoà bình',
      level: 'HIEU',
      competency: 'NLTHTG',
      contentSnippet: 'Hành vi tôn trọng và bảo vệ hoà bình.',
      fullQuestionText: 'Hành vi nào sau đây góp phần gìn giữ và bảo vệ hoà bình?\nA. Tôn trọng sự khác biệt văn hoá và giải quyết mâu thuẫn bằng đối thoại.\nB. Kích động bạo lực và phân biệt chủng tộc.\nC. Can thiệp vào công việc nội bộ của nước khác.\nD. Sử dụng vũ lực để giải quyết tranh chấp biên giới.',
      options: [
        'A. Tôn trọng sự khác biệt văn hoá và giải quyết mâu thuẫn bằng đối thoại.',
        'B. Kích động bạo lực và phân biệt chủng tộc.',
        'C. Can thiệp vào công việc nội bộ của nước khác.',
        'D. Sử dụng vũ lực để giải quyết tranh chấp biên giới.',
      ],
      expectedOutcome: 'Hiểu các hành vi giữ gìn hoà bình, đối thoại và hữu nghị giữa các dân tộc.',
      score: 0.5,
    },
    {
      id: 'gdcd_q4',
      questionNumber: 'Câu 4',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Vấn đề toàn cầu và xã hội',
      subTopic: 'Tình hữu nghị giữa các dân tộc',
      level: 'BIET',
      competency: 'NLTHTG',
      contentSnippet: 'Ý nghĩa của tình hữu nghị giữa các dân tộc trên thế giới.',
      fullQuestionText: 'Tình hữu nghị giữa các dân tộc trên thế giới mang lại ý nghĩa:\nA. Tạo môi trường hoà bình, hợp tác cùng phát triển kinh tế, văn hoá.\nB. Làm cho các quốc gia mất đi bản sắc dân tộc riêng.\nC. Chỉ có lợi cho các nước giàu và phát triển.\nD. Gây cản trở giao lưu học hỏi lẫn nhau.',
      options: [
        'A. Tạo môi trường hoà bình, hợp tác cùng phát triển kinh tế, văn hoá.',
        'B. Làm cho các quốc gia mất đi bản sắc dân tộc riêng.',
        'C. Chỉ có lợi cho các nước giàu và phát triển.',
        'D. Gây cản trở giao lưu học hỏi lẫn nhau.',
      ],
      expectedOutcome: 'Nhận biết ý nghĩa to lớn của tình hữu nghị quốc tế trong phát triển bền vững.',
      score: 0.5,
    },
    {
      id: 'gdcd_q5',
      questionNumber: 'Câu 5',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Pháp luật và kỉ luật',
      subTopic: 'Dân chủ và kỉ luật',
      level: 'HIEU',
      competency: 'NLĐCHV',
      contentSnippet: 'Mối quan hệ hai chiều giữa dân chủ và kỉ luật.',
      fullQuestionText: 'Dân chủ và kỉ luật có mối quan hệ như thế nào?\nA. Gắn bó chặt chẽ, hỗ trợ lẫn nhau; dân chủ phải đi đôi với kỉ luật.\nB. Hoàn toàn đối lập và mâu thuẫn lẫn nhau.\nC. Có kỉ luật thì sẽ làm mất đi tính dân chủ.\nD. Dân chủ là muốn làm gì thì làm, không cần tuân theo quy định nào.',
      options: [
        'A. Gắn bó chặt chẽ, hỗ trợ lẫn nhau; dân chủ phải đi đôi với kỉ luật.',
        'B. Hoàn toàn đối lập và mâu thuẫn lẫn nhau.',
        'C. Có kỉ luật thì sẽ làm mất đi tính dân chủ.',
        'D. Dân chủ là muốn làm gì thì làm, không cần tuân theo quy định nào.',
      ],
      expectedOutcome: 'Hiểu mối quan hệ biện chứng giữa việc thực hiện quyền dân chủ và việc tuân thủ kỉ luật.',
      score: 0.5,
    },
    {
      id: 'gdcd_q6',
      questionNumber: 'Câu 6',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Truyền thống văn hoá',
      subTopic: 'Kế thừa và phát huy truyền thống tốt đẹp của dân tộc',
      level: 'HIEU',
      competency: 'NLPTBT',
      contentSnippet: 'Biểu hiện tự hào và trân trọng làn điệu dân ca quê hương.',
      fullQuestionText: 'Biểu hiện nào sau đây là người biết kế thừa và phát huy truyền thống tốt đẹp của dân tộc?\nA. Tự hào và tìm hiểu các làn điệu dân ca quê hương.\nB. Coi thường các phong tục cổ truyền ngày Tết.\nC. Chỉ ưa chuộng những thứ xa xỉ từ nước ngoài.\nD. Phê phán lối sống tiết kiệm của ông bà xưa.',
      options: [
        'A. Tự hào và tìm hiểu các làn điệu dân ca quê hương.',
        'B. Coi thường các phong tục cổ truyền ngày Tết.',
        'C. Chỉ ưa chuộng những thứ xa xỉ từ nước ngoài.',
        'D. Phê phán lối sống tiết kiệm của ông bà xưa.',
      ],
      expectedOutcome: 'Phân biệt hành vi giữ gìn, trân trọng bản sắc văn hoá truyền thống.',
      score: 0.5,
    },
    {
      id: 'gdcd_q7',
      questionNumber: 'Câu 7',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Chuẩn mực đạo đức',
      subTopic: 'Hành vi chí công vô tư trong tình huống trường học',
      level: 'HIEU',
      competency: 'NLĐCHV',
      contentSnippet: 'Hành động trung thực nhắc nhở bạn không quay cóp kiểm tra.',
      fullQuestionText: 'Trong giờ kiểm tra, Nam thấy bạn thân mở tài liệu quay cóp. Hành động nào của Nam thể hiện sự chí công vô tư?\nA. Nhắc nhở bạn cất tài liệu và làm bài trung thực.\nB. Làm ngơ coi như không thấy để bảo vệ tình bạn.\nC. Cùng mở tài liệu với bạn để đạt điểm cao.\nD. Che mắt thầy cô giáo cho bạn quay cóp dễ hơn.',
      options: [
        'A. Nhắc nhở bạn cất tài liệu và làm bài trung thực.',
        'B. Làm ngơ coi như không thấy để bảo vệ tình bạn.',
        'C. Cùng mở tài liệu với bạn để đạt điểm cao.',
        'D. Che mắt thầy cô giáo cho bạn quay cóp dễ hơn.',
      ],
      expectedOutcome: 'Đánh giá hành vi đạo đức trung thực, chí công vô tư trong tình huống thực tế đời sống.',
      score: 0.5,
    },
    {
      id: 'gdcd_q8',
      questionNumber: 'Câu 8',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Phát triển bản thân',
      subTopic: 'Biểu hiện người có tính tự chủ',
      level: 'BIET',
      competency: 'NLPTBT',
      contentSnippet: 'Biểu hiện bình tĩnh suy xét của người có lòng tự chủ.',
      fullQuestionText: 'Người có tính tự chủ thường có biểu hiện:\nA. Bình tĩnh suy xét trước khi nói và làm.\nB. Hành động bốc đồng khi bị bạn bè khiêu khích.\nC. Ba phải, ai nói gì cũng gật đầu đồng ý.\nD. Đổ lỗi cho hoàn cảnh khi gặp thất bại.',
      options: [
        'A. Bình tĩnh suy xét trước khi nói và làm.',
        'B. Hành động bốc đồng khi bị bạn bè khiêu khích.',
        'C. Ba phải, ai nói gì cũng gật đầu đồng ý.',
        'D. Đổ lỗi cho hoàn cảnh khi gặp thất bại.',
      ],
      expectedOutcome: 'Nhận biết thái độ bình tĩnh, tự điều chỉnh hành vi của người tự chủ.',
      score: 0.5,
    },
    {
      id: 'gdcd_q9',
      questionNumber: 'Bài 1',
      partType: 'TU_LUAN',
      topic: 'Phát triển bản thân',
      subTopic: 'Khái niệm và liên hệ rèn luyện tính tự chủ',
      level: 'VAN_DUNG',
      competency: 'NLPTBT',
      contentSnippet: 'Định nghĩa tính tự chủ và nêu 3 việc làm cụ thể của học sinh.',
      fullQuestionText: 'Bài 1. (3,0 điểm) Thế nào là lòng tự chủ? Nêu 3 việc làm cụ thể của học sinh THCS thể hiện tính tự chủ trong học tập và sinh hoạt hàng ngày.',
      expectedOutcome: 'Nêu định nghĩa chuẩn xác và đề xuất các hành vi cụ thể rèn luyện tính tự chủ của bản thân.',
      score: 3.0,
    },
    {
      id: 'gdcd_q10',
      questionNumber: 'Bài 2',
      partType: 'TU_LUAN',
      topic: 'Pháp luật và kỉ luật',
      subTopic: 'Xử lý tình huống dân chủ và kỉ luật trong tập thể lớp',
      level: 'VAN_DUNG',
      competency: 'NLĐCHV',
      contentSnippet: 'Phân tích và giải quyết tình huống tôn trọng dân chủ trong sinh hoạt lớp.',
      fullQuestionText: 'Bài 2. (3,0 điểm) Xử lý tình huống: Trong một buổi thảo luận lớp về kế hoạch cắm trại 26/3, một số bạn có ý kiến khác biệt với Ban cán sự lớp. Lớp trưởng đã cắt lời và không cho các bạn đó phát biểu tiếp vì cho rằng mất thời gian.\na) Em có nhận xét gì về hành vi của bạn lớp trưởng trong tình huống trên?\nb) Nếu là thành viên trong lớp, em sẽ ứng xử như thế nào để đảm bảo phát huy tính dân chủ và kỉ luật của tập thể?',
      expectedOutcome: 'Đánh giá hành vi vi phạm dân chủ của lớp trưởng và đề xuất phương án ứng xử xây dựng, dân chủ, kỉ luật.',
      score: 3.0,
    },
  ],
};

// ========================================================
// 7. CÔNG NGHỆ (CÔNG NGHỆ 9 - CV 7991)
// ========================================================
export const SAMPLE_EXAM_CONG_NGHE: SampleExamData = {
  id: 'congnghe9-hk1',
  subjectId: 'cong_nghe',
  name: 'Công nghệ 9 - Học kì I (CV 7991: TN 4đ - TL 6đ)',
  grade: '9',
  examType: 'Cuối kì I',
  meta: {
    title: 'ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I - MÔN CÔNG NGHỆ 9',
    grade: '9',
    subject: 'Công nghệ',
    school: 'TRƯỜNG THCS',
    timeLimit: '45 phút',
    summary: 'Khung ma trận & Bản đặc tả Công nghệ 9 chuẩn CV 7991: Lắp đặt mạng điện trong nhà, Dụng cụ cơ khí, Sơ đồ mạch điện và An toàn điện. Tích hợp 4 năng lực: Nhận thức công nghệ (NNCN), Giao tiếp công nghệ (NGTCN), Sử dụng công nghệ (NSDCN), Đánh giá công nghệ (NĐGCN).',
  },
  rawText: `TRƯỜNG THCS - ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I
MÔN: CÔNG NGHỆ 9 - THỜI GIAN LÀM BÀI: 45 PHÚT

PHẦN I. Trắc nghiệm (4,0 điểm - 8 câu, mỗi câu 0,5 điểm)
Câu 1. Đồng hồ đo điện nào dùng để đo điện áp (hiệu điện thế) của mạch điện trong nhà?
A. Vôn kế.    B. Ampe kế.    C. Oát kế.    D. Ôm kế.
Câu 2. Dụng cụ nào sau đây dùng để cắt, tuốt vỏ cách điện và giữ dây dẫn khi nối dây?
A. Kìm điện.    B. Búa sắt.    C. Cưa tay.    D. Thước cuộn.
Câu 3. Dây dẫn điện bọc cách điện trong nhà thường có lõi làm bằng vật liệu gì?
A. Đồng (Cu) hoặc Nhôm (Al).    B. Thuỷ tinh hoặc Nhựa.
C. Gốm hoặc Sứ.                 D. Cao su hoặc Vải.
Câu 4. Thiết bị điện nào dùng để tự động đóng ngắt mạch điện khi xảy ra sự cố ngắn mạch hoặc quá tải?
A. Aptomat (Aptômat) hoặc cầu chì.    B. Công tắc hai cực.
C. Phích cắm điện.                     D. Đui đèn xoáy.
Câu 5. Trong sơ đồ nguyên lý mạch điện chiếu sáng, công tắc được mắc như thế nào với bóng đèn?
A. Mắc nối tiếp trên dây pha.          B. Mắc song song với dây trung tính.
C. Mắc nối tiếp trên dây trung tính.   D. Mắc song song với bóng đèn.
Câu 6. Khi kiểm tra mạch điện bằng bút thử điện, đèn báo của bút sáng lên chứng tỏ điểm tiếp xúc đó:
A. Có điện áp (nối với dây pha).       B. Nối với dây trung tính không có điện.
C. Không có dòng điện chạy qua.        D. Là dây nối đất an toàn.
Câu 7. Để đảm bảo an toàn điện khi sửa chữa các thiết bị trong gia đình, bước đầu tiên bắt buộc phải làm là:
A. Ngắt cầu dao (hoặc aptomat tổng) nguồn điện.
B. Đi chân trần trên sàn nhà ướt.
C. Dùng tay ướt chạm vào phích cắm.
D. Cắm nguồn điện để kiểm tra trước.
Câu 8. Tiết diện của dây dẫn điện trong nhà được lựa chọn căn cứ vào yếu tố nào?
A. Công suất tiêu thụ của các thiết bị điện trong nhà.
B. Chiều dài bức tường trong phòng khách.
C. Màu sắc lớp vỏ bọc cách điện.
D. Hãng sản xuất bóng đèn.

PHẦN II. Tự luận (6,0 điểm - 2 bài)
Bài 1. (3,0 điểm) Trình bày các bước trong quy trình nối dây dẫn điện (nối nối tiếp hai lõi dây dẫn đồng một sợi). Vì sao mối nối dây dẫn điện phải đảm bảo dẫn điện tốt và có độ bền cơ học cao?
Bài 2. (3,0 điểm) Vẽ sơ đồ nguyên lý và sơ đồ lắp đặt của mạch điện gồm: 1 cầu chì, 1 công tắc hai cực điều khiển 1 bóng đèn sợi đốt (hoặc đèn LED).`,
  questions: [
    {
      id: 'cn_q1',
      questionNumber: 'Câu 1',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Lắp đặt mạng điện trong nhà',
      subTopic: 'Đồng hồ đo điện',
      level: 'BIET',
      competency: 'NNCN',
      contentSnippet: 'Vôn kế dùng để đo hiệu điện thế mạch điện.',
      fullQuestionText: 'Đồng hồ đo điện nào dùng để đo điện áp (hiệu điện thế) của mạch điện trong nhà?\nA. Vôn kế.    B. Ampe kế.    C. Oát kế.    D. Ôm kế.',
      options: ['A. Vôn kế.', 'B. Ampe kế.', 'C. Oát kế.', 'D. Ôm kế.'],
      expectedOutcome: 'Nhận biết chức năng của đồng hồ vôn kế trong đo lường điện.',
      score: 0.5,
    },
    {
      id: 'cn_q2',
      questionNumber: 'Câu 2',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Dụng cụ cơ khí và điện',
      subTopic: 'Dụng cụ kìm điện',
      level: 'BIET',
      competency: 'NSDCN',
      contentSnippet: 'Công dụng của kìm điện trong cắt và tuốt dây.',
      fullQuestionText: 'Dụng cụ nào sau đây dùng để cắt, tuốt vỏ cách điện và giữ dây dẫn khi nối dây?\nA. Kìm điện.    B. Búa sắt.    C. Cưa tay.    D. Thước cuộn.',
      options: ['A. Kìm điện.', 'B. Búa sắt.', 'C. Cưa tay.', 'D. Thước cuộn.'],
      expectedOutcome: 'Nhận biết và chọn đúng dụng cụ cơ khí chuyên dụng ngành điện.',
      score: 0.5,
    },
    {
      id: 'cn_q3',
      questionNumber: 'Câu 3',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Vật liệu và khí cụ điện',
      subTopic: 'Dây dẫn điện',
      level: 'BIET',
      competency: 'NNCN',
      contentSnippet: 'Vật liệu chế tạo lõi dây dẫn điện trong nhà.',
      fullQuestionText: 'Dây dẫn điện bọc cách điện trong nhà thường có lõi làm bằng vật liệu gì?\nA. Đồng (Cu) hoặc Nhôm (Al).    B. Thuỷ tinh hoặc Nhựa.\nC. Gốm hoặc Sứ.                 D. Cao su hoặc Vải.',
      options: ['A. Đồng (Cu) hoặc Nhôm (Al).', 'B. Thuỷ tinh hoặc Nhựa.', 'C. Gốm hoặc Sứ.', 'D. Cao su hoặc Vải.'],
      expectedOutcome: 'Nhận biết vật liệu dẫn điện phổ biến đồng và nhôm.',
      score: 0.5,
    },
    {
      id: 'cn_q4',
      questionNumber: 'Câu 4',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Thiết bị đóng cắt và bảo vệ',
      subTopic: 'Aptomat và cầu chì',
      level: 'HIEU',
      competency: 'NNCN',
      contentSnippet: 'Chức năng bảo vệ ngắn mạch của aptomat.',
      fullQuestionText: 'Thiết bị điện nào dùng để tự động đóng ngắt mạch điện khi xảy ra sự cố ngắn mạch hoặc quá tải?\nA. Aptomat (Aptômat) hoặc cầu chì.    B. Công tắc hai cực.\nC. Phích cắm điện.                     D. Đui đèn xoáy.',
      options: ['A. Aptomat (Aptômat) hoặc cầu chì.', 'B. Công tắc hai cực.', 'C. Phích cắm điện.', 'D. Đui đèn xoáy.'],
      expectedOutcome: 'Hiểu nguyên lý bảo vệ an toàn của thiết bị đóng cắt tự động aptomat.',
      score: 0.5,
    },
    {
      id: 'cn_q5',
      questionNumber: 'Câu 5',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Sơ đồ mạch điện trong nhà',
      subTopic: 'Sơ đồ nguyên lý công tắc điều khiển đèn',
      level: 'HIEU',
      competency: 'NGTCN',
      contentSnippet: 'Công tắc mắc nối tiếp trên dây pha điều khiển đèn.',
      fullQuestionText: 'Trong sơ đồ nguyên lý mạch điện chiếu sáng, công tắc được mắc như thế nào với bóng đèn?\nA. Mắc nối tiếp trên dây pha.          B. Mắc song song với dây trung tính.\nC. Mắc nối tiếp trên dây trung tính.   D. Mắc song song với bóng đèn.',
      options: [
        'A. Mắc nối tiếp trên dây pha.',
        'B. Mắc song song với dây trung tính.',
        'C. Mắc nối tiếp trên dây trung tính.',
        'D. Mắc song song với bóng đèn.',
      ],
      expectedOutcome: 'Đọc hiểu sơ đồ nguyên lý mạch điện chiếu sáng gia đình.',
      score: 0.5,
    },
    {
      id: 'cn_q6',
      questionNumber: 'Câu 6',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'An toàn điện',
      subTopic: 'Sử dụng bút thử điện an toàn',
      level: 'HIEU',
      competency: 'NSDCN',
      contentSnippet: 'Bút thử điện sáng khi tiếp xúc dây pha có điện thế.',
      fullQuestionText: 'Khi kiểm tra mạch điện bằng bút thử điện, đèn báo của bút sáng lên chứng tỏ điểm tiếp xúc đó:\nA. Có điện áp (nối với dây pha).       B. Nối với dây trung tính không có điện.\nC. Không có dòng điện chạy qua.        D. Là dây nối đất an toàn.',
      options: [
        'A. Có điện áp (nối với dây pha).',
        'B. Nối với dây trung tính không có điện.',
        'C. Không có dòng điện chạy qua.',
        'D. Là dây nối đất an toàn.',
      ],
      expectedOutcome: 'Sử dụng bút thử điện đúng cách để xác định dây pha và kiểm tra an toàn điện.',
      score: 0.5,
    },
    {
      id: 'cn_q7',
      questionNumber: 'Câu 7',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'An toàn điện',
      subTopic: 'Quy tắc an toàn trước khi sửa chữa điện',
      level: 'BIET',
      competency: 'NSDCN',
      contentSnippet: 'Ngắt cầu dao tổng trước khi sửa chữa mạch điện.',
      fullQuestionText: 'Để đảm bảo an toàn điện khi sửa chữa các thiết bị trong gia đình, bước đầu tiên bắt buộc phải làm là:\nA. Ngắt cầu dao (hoặc aptomat tổng) nguồn điện.\nB. Đi chân trần trên sàn nhà ướt.\nC. Dùng tay ướt chạm vào phích cắm.\nD. Cắm nguồn điện để kiểm tra trước.',
      options: [
        'A. Ngắt cầu dao (hoặc aptomat tổng) nguồn điện.',
        'B. Đi chân trần trên sàn nhà ướt.',
        'C. Dùng tay ướt chạm vào phích cắm.',
        'D. Cắm nguồn điện để kiểm tra trước.',
      ],
      expectedOutcome: 'Tuân thủ nghiêm ngặt quy tắc an toàn cắt điện trước khi thao tác kỹ thuật.',
      score: 0.5,
    },
    {
      id: 'cn_q8',
      questionNumber: 'Câu 8',
      partType: 'TN_NHIEU_LUA_CHON',
      topic: 'Thiết kế kĩ thuật mạng điện',
      subTopic: 'Lựa chọn tiết diện dây dẫn điện',
      level: 'HIEU',
      competency: 'NĐGCN',
      contentSnippet: 'Căn cứ lựa chọn tiết diện dây theo công suất tiêu thụ.',
      fullQuestionText: 'Tiết diện của dây dẫn điện trong nhà được lựa chọn căn cứ vào yếu tố nào?\nA. Công suất tiêu thụ của các thiết bị điện trong nhà.\nB. Chiều dài bức tường trong phòng khách.\nC. Màu sắc lớp vỏ bọc cách điện.\nD. Hãng sản xuất bóng đèn.',
      options: [
        'A. Công suất tiêu thụ của các thiết bị điện trong nhà.',
        'B. Chiều dài bức tường trong phòng khách.',
        'C. Màu sắc lớp vỏ bọc cách điện.',
        'D. Hãng sản xuất bóng đèn.',
      ],
      expectedOutcome: 'Đánh giá và lựa chọn tiết diện dây dẫn phù hợp với tải tiêu thụ điện năng.',
      score: 0.5,
    },
    {
      id: 'cn_q9',
      questionNumber: 'Bài 1',
      partType: 'TU_LUAN',
      topic: 'Kĩ thuật nối dây dẫn điện',
      subTopic: 'Quy trình và yêu cầu kĩ thuật mối nối',
      level: 'VAN_DUNG',
      competency: 'NSDCN',
      contentSnippet: 'Trình bày quy trình nối dây dẫn điện và yêu cầu kĩ thuật mối nối.',
      fullQuestionText: 'Bài 1. (3,0 điểm) Trình bày các bước trong quy trình nối dây dẫn điện (nối nối tiếp hai lõi dây dẫn đồng một sợi). Vì sao mối nối dây dẫn điện phải đảm bảo dẫn điện tốt và có độ bền cơ học cao?',
      expectedOutcome: 'Nêu đúng quy trình 6 bước nối dây (bóc vỏ, làm sạch, uốn gập, vặn xoắn, kiểm tra, bọc cách điện) và phân tích nguy cơ chập cháy nếu mối nối lỏng.',
      score: 3.0,
    },
    {
      id: 'cn_q10',
      questionNumber: 'Bài 2',
      partType: 'TU_LUAN',
      topic: 'Sơ đồ mạch điện trong nhà',
      subTopic: 'Vẽ sơ đồ nguyên lý và sơ đồ lắp đặt mạch điện',
      level: 'VAN_DUNG',
      competency: 'NGTCN',
      contentSnippet: 'Vẽ sơ đồ nguyên lý và sơ đồ lắp đặt mạch 1 cầu chì 1 công tắc 1 đèn.',
      fullQuestionText: 'Bài 2. (3,0 điểm) Vẽ sơ đồ nguyên lý và sơ đồ lắp đặt của mạch điện gồm: 1 cầu chì, 1 công tắc hai cực điều khiển 1 bóng đèn sợi đốt (hoặc đèn LED).',
      expectedOutcome: 'Vẽ đúng kí hiệu quy ước kĩ thuật điện, thể hiện chính xác sơ đồ nguyên lý và sơ đồ lắp đặt bảng điện.',
      score: 3.0,
    },
  ],
};

export const ALL_OTHER_SUBJECT_EXAMS: SampleExamData[] = [
  SAMPLE_EXAM_KHTN,
  SAMPLE_EXAM_VAN,
  SAMPLE_EXAM_SU_DIA,
  SAMPLE_EXAM_TIN,
  SAMPLE_EXAM_ANH,
  SAMPLE_EXAM_GDCD,
  SAMPLE_EXAM_CONG_NGHE,
];
