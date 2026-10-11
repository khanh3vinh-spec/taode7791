import React, { useState } from 'react';
import { SubjectId, SUBJECT_DEFINITIONS, getSubjectById } from '../types/matrix';
import { BookOpen, X, Info, Layers } from 'lucide-react';

interface CompetencyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSubjectId?: SubjectId;
}

export const CompetencyGuideModal: React.FC<CompetencyGuideModalProps> = ({
  isOpen,
  onClose,
  currentSubjectId = 'toan',
}) => {
  const [activeSubId, setActiveSubId] = useState<SubjectId>(currentSubjectId);

  if (!isOpen) return null;

  const subject = getSubjectById(activeSubId);
  const allSubjects = Object.values(SUBJECT_DEFINITIONS);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-blue-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-blue-900 border border-blue-600 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-blue-950 to-blue-900 border-b border-blue-700/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-300" />
            <div>
              <h3 className="font-black text-white uppercase tracking-wide text-sm sm:text-base">
                HƯỚNG DẪN CÔNG VĂN 7991 & KHUNG NĂNG LỰC CÁC MÔN HỌC
              </h3>
              <p className="text-xs text-blue-200">
                Bộ Giáo dục và Đào tạo • Công văn số 7991/BGDĐT-GDTrH ngày 17/12/2024
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-blue-300 hover:text-white hover:bg-blue-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* Section 1: Overview CV 7991 */}
          <div className="p-3.5 bg-blue-950/70 rounded-xl border border-blue-800 space-y-2">
            <h4 className="font-bold text-amber-300 uppercase text-xs flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-400" />
              <span>Nội dung chính Công văn 7991/BGDĐT-GDTrH:</span>
            </h4>
            <p className="text-blue-100 text-xs leading-relaxed">
              Thực hiện Thông tư số 22/2021/TT-BGDĐT và chương trình GDPT 2018, Bộ GD&ĐT hướng dẫn các cơ sở giáo dục trung học xây dựng <strong>ma trận, bản đặc tả, đề kiểm tra định kì</strong> bảo đảm yêu cầu chuyên môn, kĩ thuật triển khai từ học kì 2 năm học 2024-2025.
            </p>
            <ul className="space-y-1 text-xs text-blue-200 list-disc list-inside">
              <li><strong>Phụ lục 1:</strong> Mẫu Ma trận đề kiểm tra định kì theo từng môn học (kẻ bảng đầy đủ mức độ Biết, Hiểu, Vận dụng).</li>
              <li><strong>Phụ lục 2:</strong> Mẫu Bản đặc tả đề kiểm tra định kì (yêu cầu ghi tắt tên năng lực chuyên môn và câu hỏi theo dạng <code className="bg-blue-900 px-1 py-0.5 rounded text-amber-300 font-mono">(n) (NL?)</code>).</li>
              <li>Mỗi môn học áp dụng khung năng lực đặc thù và tỉ lệ phân bổ phù hợp theo hướng dẫn của Bộ GDĐT.</li>
            </ul>
          </div>

          {/* Section 2: Subject Selector Tabs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-amber-300 uppercase text-xs flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Chọn môn để xem khung năng lực chuyên môn:</span>
              </h4>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {allSubjects.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSubId(s.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 flex-shrink-0 transition-all cursor-pointer ${
                    activeSubId === s.id
                      ? 'bg-amber-400 text-blue-950 font-black shadow-md'
                      : 'bg-blue-950/70 text-blue-200 hover:bg-blue-800 border border-blue-800'
                  }`}
                >
                  <span>{s.icon}</span>
                  <span>{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Subject-Specific Competencies */}
          <div className="p-4 bg-blue-950/50 rounded-2xl border border-blue-700/80 space-y-3">
            <div className="flex items-center justify-between border-b border-blue-700/60 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{subject.icon}</span>
                <span className="font-extrabold text-white text-sm uppercase">
                  Năng lực chuyên môn môn {subject.name} (GDPT 2018):
                </span>
              </div>
              <span className="text-xs text-amber-300 font-mono">
                {Object.keys(subject.competencies).length} NĂNG LỰC
              </span>
            </div>

            <div className="space-y-2.5">
              {Object.values(subject.competencies).map((c, index) => (
                <div
                  key={c.code}
                  className={`p-3 rounded-xl border ${c.badgeBorder} ${c.badgeBg} flex flex-col sm:flex-row sm:items-center justify-between gap-2`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs sm:text-sm">
                        {index + 1}. {c.name}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {c.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 self-start sm:self-center">
                    <span className="px-2.5 py-1 bg-blue-950 rounded-lg border border-white/20 font-mono font-bold text-xs text-amber-300">
                      {c.code}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Note on cell formatting */}
          <div className="p-3.5 bg-blue-950/70 rounded-xl border border-blue-800 text-xs text-blue-200 space-y-1.5">
            <h5 className="font-bold text-white uppercase text-[11px]">
              Quy tắc hiển thị trong từng ô của Bản đặc tả:
            </h5>
            <p>
              Theo ghi chú (6) của Bản đặc tả CV 7991, trong từng ô được biểu diễn dưới dạng:
            </p>
            <div className="p-2 bg-blue-900/80 rounded border border-blue-700 font-mono text-center text-amber-300 font-bold">
              (n) (NL?) ➔ Ví dụ: C1 ({Object.keys(subject.competencies)[0] || 'NLTD & LLTH'})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
