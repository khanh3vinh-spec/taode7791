export type PartType = 'TN_NHIEU_LUA_CHON' | 'TN_DUNG_SAI' | 'TN_TRA_LOI_NGAN' | 'TU_LUAN';

export type CognitiveLevel = 'BIET' | 'HIEU' | 'VAN_DUNG' | 'VAN_DUNG_CAO';

export type SubjectId =
  | 'toan'
  | 'khtn'
  | 'van'
  | 'su_dia'
  | 'tin'
  | 'anh'
  | 'gdcd'
  | 'cong_nghe';

export interface SubjectCompetencyInfo {
  code: string;
  name: string;
  description: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
}

export type MathCompetencyCode =
  | 'NLTD & LLTH'
  | 'NLMHH'
  | 'NLGQVĐ'
  | 'NLGTTH'
  | 'NLSDCC'
  | string;

export type MathCompetencyInfo = SubjectCompetencyInfo;

export const MATH_COMPETENCIES: Record<string, SubjectCompetencyInfo> = {
  'NLTD & LLTH': {
    code: 'NLTD & LLTH',
    name: 'Năng lực tư duy và lập luận toán học',
    description: 'Thực hiện các thao tác tư duy suy luận hợp lý, quy nạp, suy diễn, phân tích và chứng minh toán học.',
    color: 'text-amber-300',
    badgeBg: 'bg-amber-500/20 text-amber-200',
    badgeBorder: 'border-amber-400/30',
  },
  'NLMHH': {
    code: 'NLMHH',
    name: 'Năng lực mô hình hoá toán học',
    description: 'Chuyển bài toán thực tiễn sang mô hình toán học (phương trình, bất phương trình, đồ thị, hình học) và giải quyết.',
    color: 'text-emerald-300',
    badgeBg: 'bg-emerald-500/20 text-emerald-200',
    badgeBorder: 'border-emerald-400/30',
  },
  'NLGQVĐ': {
    code: 'NLGQVĐ',
    name: 'Năng lực giải quyết vấn đề toán học',
    description: 'Phát hiện vấn đề, xây dựng chiến lược, thuật toán và đánh giá kết quả thực hiện.',
    color: 'text-cyan-300',
    badgeBg: 'bg-cyan-500/20 text-cyan-200',
    badgeBorder: 'border-cyan-400/30',
  },
  'NLGTTH': {
    code: 'NLGTTH',
    name: 'Năng lực giao tiếp toán học',
    description: 'Đọc hiểu bảng biểu, đồ thị, sơ đồ, thuật ngữ toán học và trình bày lập luận chính xác.',
    color: 'text-purple-300',
    badgeBg: 'bg-purple-500/20 text-purple-200',
    badgeBorder: 'border-purple-400/30',
  },
  'NLSDCC': {
    code: 'NLSDCC',
    name: 'Năng lực sử dụng công cụ, phương tiện học toán',
    description: 'Sử dụng máy tính cầm tay, thước kẻ, compa, phần mềm vẽ đồ thị hoặc hình học động.',
    color: 'text-rose-300',
    badgeBg: 'bg-rose-500/20 text-rose-200',
    badgeBorder: 'border-rose-400/30',
  },
};

export interface SubjectDefinition {
  id: SubjectId;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  defaultTimeLimit: string;
  defaultScoreConfig: ScoreConfig;
  competencies: Record<string, SubjectCompetencyInfo>;
}

export const SUBJECT_DEFINITIONS: Record<SubjectId, SubjectDefinition> = {
  toan: {
    id: 'toan',
    name: 'Toán học',
    shortName: 'Toán',
    icon: '📐',
    description: 'Khung ma trận & bản đặc tả môn Toán học theo CV 7991 (5 Năng lực Toán học)',
    defaultTimeLimit: '90 phút',
    defaultScoreConfig: {
      scoreNhieuLuaChon: 2.0,
      scoreDungSai: 1.0,
      scoreTraLoiNgan: 0.0,
      scoreTuLuan: 7.0,
      includeTraLoiNgan: false,
      targetBietPercent: 40,
      targetHieuPercent: 30,
      targetVanDungPercent: 30,
    },
    competencies: MATH_COMPETENCIES,
  },
  khtn: {
    id: 'khtn',
    name: 'Khoa học tự nhiên',
    shortName: 'KHTN',
    icon: '🔬',
    description: 'Khung ma trận 12 cột & bảng đặc tả môn KHTN THCS theo chuẩn THCS Ngãi Tứ (16 câu TN 4,0đ + Tự luận 6,0đ)',
    defaultTimeLimit: '60 phút',
    defaultScoreConfig: {
      scoreNhieuLuaChon: 4.0,
      scoreDungSai: 0.0,
      scoreTraLoiNgan: 0.0,
      scoreTuLuan: 6.0,
      includeTraLoiNgan: false,
      targetBietPercent: 40,
      targetHieuPercent: 30,
      targetVanDungPercent: 20,
      targetVanDungCaoPercent: 10,
    },
    competencies: {
      'NNKHTN': {
        code: 'NNKHTN',
        name: 'Nhận thức khoa học tự nhiên',
        description: 'Trình bày, nhận biết các định luật, hiện tượng, cấu tạo chất, nguyên lí tự nhiên.',
        color: 'text-emerald-300',
        badgeBg: 'bg-emerald-500/20 text-emerald-200',
        badgeBorder: 'border-emerald-400/30',
      },
      'NTHTN': {
        code: 'NTHTN',
        name: 'Tìm hiểu tự nhiên',
        description: 'Đề xuất giả thuyết, thiết kế thí nghiệm, quan sát thu thập dữ liệu tự nhiên.',
        color: 'text-cyan-300',
        badgeBg: 'bg-cyan-500/20 text-cyan-200',
        badgeBorder: 'border-cyan-400/30',
      },
      'NVDKN': {
        code: 'NVDKN',
        name: 'Vận dụng kiến thức, kĩ năng đã học',
        description: 'Giải thích hiện tượng đời sống, bảo vệ môi trường, giải bài tập tính toán định lượng.',
        color: 'text-amber-300',
        badgeBg: 'bg-amber-500/20 text-amber-200',
        badgeBorder: 'border-amber-400/30',
      },
    },
  },
  van: {
    id: 'van',
    name: 'Ngữ văn',
    shortName: 'Ngữ văn',
    icon: '📖',
    description: 'Đọc hiểu văn bản & Viết bài văn/đoạn văn - Năng lực ngôn ngữ & văn học',
    defaultTimeLimit: '90 phút',
    defaultScoreConfig: {
      scoreNhieuLuaChon: 3.0,
      scoreDungSai: 0.0,
      scoreTraLoiNgan: 0.0,
      scoreTuLuan: 7.0,
      includeTraLoiNgan: false,
      targetBietPercent: 40,
      targetHieuPercent: 30,
      targetVanDungPercent: 30,
    },
    competencies: {
      'NLĐH': {
        code: 'NLĐH',
        name: 'Năng lực đọc hiểu',
        description: 'Đọc hiểu văn bản truyện, thơ, văn bản thông tin, nghị luận; phát hiện chi tiết, chủ đề.',
        color: 'text-sky-300',
        badgeBg: 'bg-sky-500/20 text-sky-200',
        badgeBorder: 'border-sky-400/30',
      },
      'NLGT': {
        code: 'NLGT',
        name: 'Năng lực giao tiếp tiếng Việt',
        description: 'Sử dụng từ ngữ, ngữ pháp, biện pháp tu từ, liên kết câu và chuẩn mực chính tả.',
        color: 'text-amber-300',
        badgeBg: 'bg-amber-500/20 text-amber-200',
        badgeBorder: 'border-amber-400/30',
      },
      'NLV': {
        code: 'NLV',
        name: 'Năng lực viết',
        description: 'Viết đoạn văn nghị luận, bài văn nghị luận xã hội, văn học, biểu cảm, thuyết minh.',
        color: 'text-purple-300',
        badgeBg: 'bg-purple-500/20 text-purple-200',
        badgeBorder: 'border-purple-400/30',
      },
    },
  },
  su_dia: {
    id: 'su_dia',
    name: 'Lịch sử và Địa lí',
    shortName: 'Sử - Địa',
    icon: '🌍',
    description: 'Khung ma trận tích hợp 2 phân môn Lịch sử (50%) và Địa lí (50%)',
    defaultTimeLimit: '90 phút',
    defaultScoreConfig: {
      scoreNhieuLuaChon: 4.0,
      scoreDungSai: 0.0,
      scoreTraLoiNgan: 0.0,
      scoreTuLuan: 6.0,
      includeTraLoiNgan: false,
      targetBietPercent: 40,
      targetHieuPercent: 30,
      targetVanDungPercent: 30,
    },
    competencies: {
      'NTLLS': {
        code: 'NTLLS',
        name: 'Tìm hiểu lịch sử',
        description: 'Khai thác tư liệu lịch sử, lược đồ, tranh ảnh, niên biểu lịch sử.',
        color: 'text-amber-300',
        badgeBg: 'bg-amber-500/20 text-amber-200',
        badgeBorder: 'border-amber-400/30',
      },
      'NNTLS': {
        code: 'NNTLS',
        name: 'Nhận thức và tư duy lịch sử',
        description: 'Hiểu nguyên nhân, diễn biến, tính chất, ý nghĩa các sự kiện lịch sử.',
        color: 'text-rose-300',
        badgeBg: 'bg-rose-500/20 text-rose-200',
        badgeBorder: 'border-rose-400/30',
      },
      'NVDLS': {
        code: 'NVDLS',
        name: 'Vận dụng lịch sử vào thực tiễn',
        description: 'Rút ra bài học lịch sử và vận dụng vào thực tế quê hương, đất nước.',
        color: 'text-orange-300',
        badgeBg: 'bg-orange-500/20 text-orange-200',
        badgeBorder: 'border-orange-400/30',
      },
      'NNKHDL': {
        code: 'NNKHDL',
        name: 'Nhận thức khoa học địa lí',
        description: 'Hiểu đặc điểm tự nhiên, dân cư, kinh tế, vùng địa lí Việt Nam và thế giới.',
        color: 'text-emerald-300',
        badgeBg: 'bg-emerald-500/20 text-emerald-200',
        badgeBorder: 'border-emerald-400/30',
      },
      'NTHDL': {
        code: 'NTHDL',
        name: 'Tìm hiểu địa lí',
        description: 'Sử dụng bản đồ, biểu đồ số liệu, Atlat địa lí và hình ảnh thực địa.',
        color: 'text-cyan-300',
        badgeBg: 'bg-cyan-500/20 text-cyan-200',
        badgeBorder: 'border-cyan-400/30',
      },
      'NVDDL': {
        code: 'NVDDL',
        name: 'Vận dụng địa lí vào thực tiễn',
        description: 'Giải thích hiện tượng khí hậu, thời tiết, đề xuất bảo vệ môi trường địa phương.',
        color: 'text-blue-300',
        badgeBg: 'bg-blue-500/20 text-blue-200',
        badgeBorder: 'border-blue-400/30',
      },
    },
  },
  tin: {
    id: 'tin',
    name: 'Tin học',
    shortName: 'Tin học',
    icon: '💻',
    description: 'Công nghệ thông tin và truyền thông, tư duy máy tính & an toàn số',
    defaultTimeLimit: '45 phút',
    defaultScoreConfig: {
      scoreNhieuLuaChon: 4.0,
      scoreDungSai: 1.0,
      scoreTraLoiNgan: 0.0,
      scoreTuLuan: 5.0,
      includeTraLoiNgan: false,
      targetBietPercent: 40,
      targetHieuPercent: 30,
      targetVanDungPercent: 30,
    },
    competencies: {
      'NLa': {
        code: 'NLa',
        name: 'Sử dụng và quản lý phương tiện CNTT-TT',
        description: 'Sử dụng thành thạo phần mềm, hệ điều hành, thiết bị phần cứng số.',
        color: 'text-cyan-300',
        badgeBg: 'bg-cyan-500/20 text-cyan-200',
        badgeBorder: 'border-cyan-400/30',
      },
      'NLb': {
        code: 'NLb',
        name: 'Ứng xử phù hợp trong môi trường số',
        description: 'Đạo đức, văn hoá mạng, pháp luật số và an toàn thông tin.',
        color: 'text-purple-300',
        badgeBg: 'bg-purple-500/20 text-purple-200',
        badgeBorder: 'border-purple-400/30',
      },
      'NLc': {
        code: 'NLc',
        name: 'Giải quyết vấn đề với sự hỗ trợ của CNTT-TT',
        description: 'Tư duy thuật toán, viết chương trình lập trình, giải bài toán tin học.',
        color: 'text-amber-300',
        badgeBg: 'bg-amber-500/20 text-amber-200',
        badgeBorder: 'border-amber-400/30',
      },
      'NLd': {
        code: 'NLd',
        name: 'Ứng dụng CNTT-TT trong học và tự học',
        description: 'Tìm kiếm thông tin, sử dụng tài nguyên số phục vụ học tập suốt đời.',
        color: 'text-emerald-300',
        badgeBg: 'bg-emerald-500/20 text-emerald-200',
        badgeBorder: 'border-emerald-400/30',
      },
      'NLe': {
        code: 'NLe',
        name: 'Hợp tác trong môi trường số',
        description: 'Làm việc nhóm trực tuyến, chia sẻ tài liệu và giao tiếp qua mạng.',
        color: 'text-rose-300',
        badgeBg: 'bg-rose-500/20 text-rose-200',
        badgeBorder: 'border-rose-400/30',
      },
    },
  },
  anh: {
    id: 'anh',
    name: 'Tiếng Anh',
    shortName: 'Tiếng Anh',
    icon: '🇬🇧',
    description: 'Ngoại ngữ 1 THCS - Đọc hiểu, Ngữ âm, Từ vựng, Ngữ pháp và Viết',
    defaultTimeLimit: '60 phút',
    defaultScoreConfig: {
      scoreNhieuLuaChon: 6.0,
      scoreDungSai: 0.0,
      scoreTraLoiNgan: 0.0,
      scoreTuLuan: 4.0,
      includeTraLoiNgan: false,
      targetBietPercent: 40,
      targetHieuPercent: 30,
      targetVanDungPercent: 30,
    },
    competencies: {
      'NLU': {
        code: 'NLU',
        name: 'Language Focus (Ngữ âm, Từ vựng, Ngữ pháp)',
        description: 'Phonetics, Vocabulary in context, Grammatical structures and tenses.',
        color: 'text-amber-300',
        badgeBg: 'bg-amber-500/20 text-amber-200',
        badgeBorder: 'border-amber-400/30',
      },
      'NLR': {
        code: 'NLR',
        name: 'Reading Comprehension (Kĩ năng Đọc hiểu)',
        description: 'Skimming, scanning, understanding main ideas and details of English texts.',
        color: 'text-emerald-300',
        badgeBg: 'bg-emerald-500/20 text-emerald-200',
        badgeBorder: 'border-emerald-400/30',
      },
      'NLW': {
        code: 'NLW',
        name: 'Writing (Kĩ năng Viết)',
        description: 'Sentence transformation, rearranging words, guided paragraph writing.',
        color: 'text-sky-300',
        badgeBg: 'bg-sky-500/20 text-sky-200',
        badgeBorder: 'border-sky-400/30',
      },
      'NLL': {
        code: 'NLL',
        name: 'Listening (Kĩ năng Nghe)',
        description: 'Listening for specific information, gist and multiple-choice questions.',
        color: 'text-purple-300',
        badgeBg: 'bg-purple-500/20 text-purple-200',
        badgeBorder: 'border-purple-400/30',
      },
    },
  },
  gdcd: {
    id: 'gdcd',
    name: 'Giáo dục công dân',
    shortName: 'GDCD',
    icon: '⚖️',
    description: 'Chuẩn mực đạo đức, pháp luật, kỹ năng sống và xử lý tình huống thực tế',
    defaultTimeLimit: '45 phút',
    defaultScoreConfig: {
      scoreNhieuLuaChon: 4.0,
      scoreDungSai: 1.0,
      scoreTraLoiNgan: 0.0,
      scoreTuLuan: 5.0,
      includeTraLoiNgan: false,
      targetBietPercent: 40,
      targetHieuPercent: 30,
      targetVanDungPercent: 30,
    },
    competencies: {
      'NLĐCHV': {
        code: 'NLĐCHV',
        name: 'Điều chỉnh hành vi',
        description: 'Nhận biết và thực hiện các quy tắc đạo đức, quy định pháp luật trong cuộc sống.',
        color: 'text-emerald-300',
        badgeBg: 'bg-emerald-500/20 text-emerald-200',
        badgeBorder: 'border-emerald-400/30',
      },
      'NLPTBT': {
        code: 'NLPTBT',
        name: 'Phát triển bản thân',
        description: 'Tự nhận thức bản thân, rèn luyện thói quen tốt và quản lý cảm xúc.',
        color: 'text-amber-300',
        badgeBg: 'bg-amber-500/20 text-amber-200',
        badgeBorder: 'border-amber-400/30',
      },
      'NLTHTG': {
        code: 'NLTHTG',
        name: 'Tìm hiểu và tham gia hoạt động KT-XH',
        description: 'Giải quyết các tình huống pháp luật, xã hội, tiêu dùng và môi trường.',
        color: 'text-cyan-300',
        badgeBg: 'bg-cyan-500/20 text-cyan-200',
        badgeBorder: 'border-cyan-400/30',
      },
    },
  },
  cong_nghe: {
    id: 'cong_nghe',
    name: 'Công nghệ',
    shortName: 'Công nghệ',
    icon: '⚙️',
    description: 'Nông nghiệp, Cơ khí, Điện dân dụng và Thiết kế kĩ thuật',
    defaultTimeLimit: '45 phút',
    defaultScoreConfig: {
      scoreNhieuLuaChon: 4.0,
      scoreDungSai: 1.0,
      scoreTraLoiNgan: 0.0,
      scoreTuLuan: 5.0,
      includeTraLoiNgan: false,
      targetBietPercent: 40,
      targetHieuPercent: 30,
      targetVanDungPercent: 30,
    },
    competencies: {
      'NNCN': {
        code: 'NNCN',
        name: 'Nhận thức công nghệ',
        description: 'Hiểu cấu tạo, nguyên lý vận hành của thiết bị kĩ thuật, quy trình nông nghiệp.',
        color: 'text-emerald-300',
        badgeBg: 'bg-emerald-500/20 text-emerald-200',
        badgeBorder: 'border-emerald-400/30',
      },
      'NGTCN': {
        code: 'NGTCN',
        name: 'Giao tiếp công nghệ',
        description: 'Đọc bản vẽ kĩ thuật, sơ đồ mạch điện, nhãn hiệu thông số kĩ thuật.',
        color: 'text-amber-300',
        badgeBg: 'bg-amber-500/20 text-amber-200',
        badgeBorder: 'border-amber-400/30',
      },
      'NSDCN': {
        code: 'NSDCN',
        name: 'Sử dụng công nghệ',
        description: 'Thao tác an toàn với dụng cụ cơ khí, điện gia dụng, bảo dưỡng máy móc.',
        color: 'text-cyan-300',
        badgeBg: 'bg-cyan-500/20 text-cyan-200',
        badgeBorder: 'border-cyan-400/30',
      },
      'NĐGCN': {
        code: 'NĐGCN',
        name: 'Đánh giá công nghệ',
        description: 'Đánh giá chất lượng sản phẩm, hiệu quả năng lượng và bảo vệ môi trường.',
        color: 'text-rose-300',
        badgeBg: 'bg-rose-500/20 text-rose-200',
        badgeBorder: 'border-rose-400/30',
      },
    },
  },
};

export function getSubjectById(subjectId?: string): SubjectDefinition {
  if (!subjectId) return SUBJECT_DEFINITIONS.toan;
  const normalized = subjectId.toLowerCase().trim();
  if (normalized === 'toan' || normalized.includes('toán')) return SUBJECT_DEFINITIONS.toan;
  if (normalized === 'khtn' || normalized.includes('khoa học') || normalized.includes('tự nhiên')) return SUBJECT_DEFINITIONS.khtn;
  if (normalized === 'van' || normalized.includes('văn')) return SUBJECT_DEFINITIONS.van;
  if (normalized === 'su_dia' || normalized.includes('sử') || normalized.includes('địa')) return SUBJECT_DEFINITIONS.su_dia;
  if (normalized === 'tin' || normalized.includes('tin học')) return SUBJECT_DEFINITIONS.tin;
  if (normalized === 'anh' || normalized.includes('anh') || normalized.includes('english')) return SUBJECT_DEFINITIONS.anh;
  if (normalized === 'gdcd' || normalized.includes('công dân')) return SUBJECT_DEFINITIONS.gdcd;
  if (normalized === 'cong_nghe' || normalized.includes('công nghệ')) return SUBJECT_DEFINITIONS.cong_nghe;
  return SUBJECT_DEFINITIONS.toan;
}

export interface QuestionItem {
  id: string;
  questionNumber: string; // "Câu 1", "Câu 2", "Bài 1",...
  partType: PartType;
  topic: string; // Chủ đề / Chương
  subTopic: string; // Nội dung / đơn vị kiến thức
  level: CognitiveLevel; // Biết | Hiểu | Vận dụng
  competency: MathCompetencyCode; // 1 trong 5 năng lực toán học
  contentSnippet: string;
  fullQuestionText?: string; // Đầy đủ nội dung câu hỏi
  options?: string[]; // Các phương án A, B, C, D hoặc a, b, c, d
  expectedOutcome: string; // Yêu cầu cần đạt chuẩn GDPT 2018
  score?: number;
}

export interface MatrixRowGroup {
  topic: string;
  items: MatrixRowUnit[];
}

export interface MatrixRowUnit {
  id: string;
  topic: string;
  subTopic: string;
  // Cells by partType & level containing list of questions
  cells: {
    TN_NHIEU_LUA_CHON: Record<CognitiveLevel, QuestionItem[]>;
    TN_DUNG_SAI: Record<CognitiveLevel, QuestionItem[]>;
    TN_TRA_LOI_NGAN: Record<CognitiveLevel, QuestionItem[]>;
    TU_LUAN: Record<CognitiveLevel, QuestionItem[]>;
  };
  totalBiet: number;
  totalHieu: number;
  totalVanDung: number;
  totalScore: number;
  scorePercentage: number;
  outcomes: {
    BIET: string[];
    HIEU: string[];
    VAN_DUNG: string[];
    VAN_DUNG_CAO?: string[];
  };
}

export interface ExamMeta {
  title: string;
  grade: string;
  subject: string;
  school?: string;
  examType?: string;
  timeLimit?: string;
  summary?: string;
}

export interface ScoreConfig {
  scoreNhieuLuaChon: number; // 2.0 hoặc 4.0 điểm
  scoreDungSai: number;       // 1.0 hoặc 0.0 điểm
  scoreTraLoiNgan: number;    // 0.0 điểm
  scoreTuLuan: number;        // 7.0 hoặc 6.0 điểm
  includeTraLoiNgan: boolean; // false
  targetBietPercent: number;  // 40%
  targetHieuPercent: number;  // 30%
  targetVanDungPercent: number;// 20% hoặc 30%
  targetVanDungCaoPercent?: number; // 10%
}

export const DEFAULT_SCORE_CONFIG: ScoreConfig = {
  scoreNhieuLuaChon: 2.0,
  scoreDungSai: 1.0,
  scoreTraLoiNgan: 0.0,
  scoreTuLuan: 7.0,
  includeTraLoiNgan: false,
  targetBietPercent: 40,
  targetHieuPercent: 30,
  targetVanDungPercent: 30,
};
