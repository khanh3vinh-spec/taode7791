import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  Download,
  Copy,
  Printer,
  HelpCircle,
  Settings,
  Sparkles,
  ChevronDown,
  Layers,
  Check,
} from 'lucide-react';
import { SubjectId, SUBJECT_DEFINITIONS, getSubjectById } from '../types/matrix';

interface HeaderProps {
  currentSubjectId: SubjectId;
  onSelectSubject: (subjectId: SubjectId) => void;
  onOpenInputModal: () => void;
  onOpenGuideModal: () => void;
  onOpenScoreConfigModal: () => void;
  onExportDocx: () => void;
  onCopyTableHtml: () => void;
  onPrint: () => void;
  isExporting: boolean;
  questionCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentSubjectId,
  onSelectSubject,
  onOpenInputModal,
  onOpenGuideModal,
  onOpenScoreConfigModal,
  onExportDocx,
  onCopyTableHtml,
  onPrint,
  isExporting,
  questionCount,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeSubject = getSubjectById(currentSubjectId);
  const allSubjects = Object.values(SUBJECT_DEFINITIONS);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChooseSubject = (subjectId: SubjectId) => {
    setIsDropdownOpen(false);
    onSelectSubject(subjectId);
  };

  return (
    <header className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 border-b border-blue-700/60 shadow-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Main Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Logo, Title and Subject Selector Dropdown */}
          <div className="flex items-center flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 border border-blue-400/30 flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                {/* EXACT USER REQUIREMENT: App có tên TẠO MA TRẬN ĐỀ KT THEO CV 7991, chữ màu trắng in đậm, màu nền của app là màu xanh dương */}
                <h1 className="text-lg sm:text-xl font-black text-white tracking-wide uppercase drop-shadow-sm">
                  TẠO MA TRẬN ĐỀ KT THEO CV 7991
                </h1>
              </div>
            </div>

            {/* SUBJECT MENU DROPDOWN (YÊU CẦU: Thêm vào menu chọn môn) */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-3 py-1.5 bg-blue-800 hover:bg-blue-700 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 border border-blue-500/60 shadow-md transition-all cursor-pointer hover:border-amber-400"
                title="Chọn môn học để áp dụng khung ma trận và bảng đặc tả riêng"
              >
                <span className="text-base">{activeSubject.icon}</span>
                <span className="font-extrabold text-amber-300">Môn: {activeSubject.name}</span>
                <ChevronDown
                  className={`w-4 h-4 text-blue-200 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180 text-amber-300' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu Popup */}
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-blue-900 border border-blue-500 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-xl">
                  <div className="px-3 py-1.5 border-b border-blue-700/60 mb-1 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Chọn môn học (Khung CV 7991):</span>
                    </span>
                    <span className="text-[10px] text-blue-300">THCS</span>
                  </div>

                  <div className="space-y-0.5 px-1 max-h-80 overflow-y-auto">
                    {allSubjects.map((sub) => {
                      const isSelected = sub.id === currentSubjectId;
                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => handleChooseSubject(sub.id)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-blue-700 text-white font-bold border border-blue-400 shadow-sm'
                              : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="text-base flex-shrink-0">{sub.icon}</span>
                            <div className="min-w-0">
                              <div className="truncate font-semibold">{sub.name}</div>
                              <div className="text-[10px] text-blue-300 truncate font-normal">
                                {Object.keys(sub.competencies).length} năng lực • {sub.defaultTimeLimit}
                              </div>
                            </div>
                          </div>
                          {isSelected && (
                            <Check className="w-4 h-4 text-amber-300 flex-shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={onOpenInputModal}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-blue-900/40 border border-blue-400/40 transition-all hover:scale-[1.02] cursor-pointer"
              title="Nhập đề kiểm tra mới hoặc chọn đề mẫu"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Nhập / Chọn Đề</span>
            </button>

            <button
              onClick={onExportDocx}
              disabled={isExporting || questionCount === 0}
              className="px-3 py-2 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-lg font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md border border-emerald-500/40 transition-all cursor-pointer"
              title="Tải file Word (.docx) chuẩn theo biểu mẫu Bộ GDĐT"
            >
              <Download className="w-4 h-4 text-emerald-200" />
              <span>{isExporting ? 'Đang tạo...' : 'Tải Word (.docx)'}</span>
            </button>

            <button
              onClick={onCopyTableHtml}
              disabled={questionCount === 0}
              className="px-3 py-2 bg-blue-800/90 hover:bg-blue-700 text-blue-100 rounded-lg font-semibold text-xs sm:text-sm flex items-center gap-1.5 border border-blue-600/60 transition-all cursor-pointer"
              title="Sao chép bảng để dán trực tiếp vào Word"
            >
              <Copy className="w-4 h-4 text-blue-300" />
              <span className="hidden sm:inline">Sao chép Word</span>
            </button>

            <button
              onClick={onPrint}
              disabled={questionCount === 0}
              className="p-2 bg-blue-800/80 hover:bg-blue-700 text-blue-100 rounded-lg font-medium text-xs sm:text-sm flex items-center gap-1.5 border border-blue-600/60 transition-all cursor-pointer"
              title="In hoặc Lưu PDF"
            >
              <Printer className="w-4 h-4 text-blue-300" />
            </button>

            <button
              onClick={onOpenScoreConfigModal}
              className="p-2 bg-blue-800/80 hover:bg-blue-700 text-blue-100 rounded-lg font-medium text-xs sm:text-sm flex items-center gap-1.5 border border-blue-600/60 transition-all cursor-pointer"
              title="Cấu hình thang điểm và tỉ lệ"
            >
              <Settings className="w-4 h-4 text-blue-300" />
            </button>

            <button
              onClick={onOpenGuideModal}
              className="p-2 bg-blue-800/80 hover:bg-blue-700 text-amber-300 rounded-lg font-medium text-xs sm:text-sm flex items-center gap-1.5 border border-blue-600/60 transition-all cursor-pointer"
              title="Quy định CV 7991 & Các năng lực chuyên môn"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Quick-Switch Subject Tabs Bar */}
        <div className="mt-2.5 pt-2 border-t border-blue-800/60 flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          <span className="text-[11px] font-bold text-blue-300 flex-shrink-0 mr-1 hidden sm:inline">
            Khung ma trận môn:
          </span>
          {allSubjects.map((sub) => {
            const isSelected = sub.id === currentSubjectId;
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => handleChooseSubject(sub.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 flex-shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-blue-950 font-black shadow-md scale-[1.03]'
                    : 'bg-blue-950/60 text-blue-200 hover:bg-blue-800 hover:text-white border border-blue-800/70'
                }`}
                title={`Chuyển sang khung ma trận & bản đặc tả môn ${sub.name}`}
              >
                <span>{sub.icon}</span>
                <span>{sub.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
