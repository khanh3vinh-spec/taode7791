import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { MatrixTableView } from './components/MatrixTableView';
import { SpecTableView } from './components/SpecTableView';
import { ExamPaperView } from './components/ExamPaperView';
import { QuestionManager } from './components/QuestionManager';
import { ExamInputModal } from './components/ExamInputModal';
import { ScoreConfigModal } from './components/ScoreConfigModal';
import { CompetencyGuideModal } from './components/CompetencyGuideModal';
import { SAMPLE_EXAMS, getDefaultSampleForSubject } from './data/sampleExams';
import {
  QuestionItem,
  ExamMeta,
  ScoreConfig,
  DEFAULT_SCORE_CONFIG,
  SubjectId,
  getSubjectById,
} from './types/matrix';
import { buildMatrixAndSpecs } from './utils/matrixBuilder';
import { exportToDocx } from './utils/docxExport';
import {
  Table2,
  ListOrdered,
  FileSpreadsheet,
  FileCode,
  CheckCircle,
  HelpCircle,
  Award,
} from 'lucide-react';

export default function App() {
  // Current active subject (Default: Toán học)
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>('toan');
  const currentSubject = getSubjectById(selectedSubjectId);

  // Initial state with default Sample Exam for active subject
  const defaultSample = SAMPLE_EXAMS[0];
  const [examMeta, setExamMeta] = useState<ExamMeta>(defaultSample.meta);
  const [questions, setQuestions] = useState<QuestionItem[]>(defaultSample.questions);
  const [rawExamText, setRawExamText] = useState<string>(defaultSample.rawText);
  const [scoreConfig, setScoreConfig] = useState<ScoreConfig>(currentSubject.defaultScoreConfig || DEFAULT_SCORE_CONFIG);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'matrix' | 'spec' | 'examPaper' | 'questions' | 'rawExam'>('matrix');

  // Modals state
  const [isInputModalOpen, setIsInputModalOpen] = useState<boolean>(false);
  const [isScoreConfigOpen, setIsScoreConfigOpen] = useState<boolean>(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Switch subject and apply that subject's specific matrix, specs & default exam
  const handleSelectSubject = (newSubId: SubjectId) => {
    setSelectedSubjectId(newSubId);
    const subDef = getSubjectById(newSubId);
    const sample = getDefaultSampleForSubject(newSubId);
    setExamMeta(sample.meta);
    setQuestions(sample.questions);
    setRawExamText(sample.rawText);
    setScoreConfig(subDef.defaultScoreConfig);
    showToast(`Đã chuyển sang khung ma trận & bản đặc tả môn ${subDef.name}!`);
  };

  // Build matrix and specs data
  const { groupedTopics, totals } = useMemo(() => {
    return buildMatrixAndSpecs(questions, scoreConfig);
  }, [questions, scoreConfig]);

  // Count competencies distribution dynamically for current subject
  const competencyCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const code of Object.keys(currentSubject.competencies)) {
      counts[code] = 0;
    }
    for (const q of questions) {
      if (counts[q.competency] !== undefined) {
        counts[q.competency]++;
      } else {
        counts[q.competency] = (counts[q.competency] || 0) + 1;
      }
    }
    return counts;
  }, [questions, currentSubject]);

  // Export to docx
  const handleExportDocx = async () => {
    if (questions.length === 0) return;
    setIsExporting(true);
    try {
      const blob = await exportToDocx(examMeta, questions, scoreConfig);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const cleanTitle = (examMeta.title || 'Ma_tran_ban_dac_ta_CV7991')
        .replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, '_')
        .substring(0, 50);
      a.download = `${cleanTitle}_CV7991.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Đã tạo và tải file Word (.docx) thành công!');
    } catch (err: any) {
      console.error('Lỗi xuất file Word:', err);
      showToast('Không thể tạo file Word: ' + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  // Copy table to clipboard in HTML format for pasting into Word
  const handleCopyTableHtml = async () => {
    try {
      const tableSelector = activeTab === 'spec' ? 'table:last-of-type' : 'table:first-of-type';
      const tableEl = document.querySelector(tableSelector);

      if (!tableEl) {
        showToast('Không tìm thấy bảng để sao chép.');
        return;
      }

      const tableHtml = `
        <div style="font-family: 'Times New Roman', serif;">
          <h3 style="text-align: center; font-weight: bold; font-size: 14pt;">${
            activeTab === 'spec'
              ? '2. BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KÌ (THEO CV 7991)'
              : '1. MA TRẬN ĐỀ KIỂM TRA ĐỊNH KÌ (THEO CV 7991)'
          }</h3>
          <p style="text-align: center; font-style: italic; font-size: 11pt;">${examMeta.title}</p>
          <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 11pt; border: 1px solid black; text-align: center;">
            ${tableEl.innerHTML}
          </table>
        </div>
      `;

      const blobHtml = new Blob([tableHtml], { type: 'text/html' });
      const blobText = new Blob([tableEl.textContent || ''], { type: 'text/plain' });

      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': blobHtml,
          'text/plain': blobText,
        }),
      ]);

      showToast('Đã sao chép bảng! Bạn có thể dán (Ctrl+V) trực tiếp vào Microsoft Word.');
    } catch (err: any) {
      console.warn('Lỗi copy HTML, thử copy text thông thường:', err);
      try {
        const tableEl = document.querySelector('table');
        if (tableEl) {
          await navigator.clipboard.writeText(tableEl.innerText);
          showToast('Đã sao chép văn bản bảng.');
        }
      } catch (e) {
        showToast('Trình duyệt chưa cấp quyền sao chép.');
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleApplyExam = (meta: ExamMeta, newQuestions: QuestionItem[], rawText?: string) => {
    setExamMeta(meta);
    setQuestions(newQuestions);
    if (rawText) {
      setRawExamText(rawText);
    }
    showToast(`Đã nạp đề thành công: ${newQuestions.length} câu hỏi!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Header with user requested bold white title */}
      <Header
        currentSubjectId={selectedSubjectId}
        onSelectSubject={handleSelectSubject}
        onOpenInputModal={() => setIsInputModalOpen(true)}
        onOpenGuideModal={() => setIsGuideModalOpen(true)}
        onOpenScoreConfigModal={() => setIsScoreConfigOpen(true)}
        onExportDocx={handleExportDocx}
        onCopyTableHtml={handleCopyTableHtml}
        onPrint={handlePrint}
        isExporting={isExporting}
        questionCount={questions.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 space-y-5">
        {/* Top Summary Bar & Competency Badges */}
        <div className="bg-blue-900/60 backdrop-blur-md rounded-2xl border border-blue-700/60 p-4 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Cognitive Level Distribution */}
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-white uppercase tracking-wider flex items-center gap-1.5">
                  <span>Tỉ lệ Nhận thức đề:</span>
                  <span className="text-amber-300 font-extrabold font-mono">
                    {totals.percentBiet}% Biết - {totals.percentHieu}% Hiểu - {totals.percentVanDung}% Vận dụng
                  </span>
                </span>
                <span className="text-blue-200">
                  Tổng điểm: <strong className="text-white">{totals.totalScore.toFixed(1)}đ</strong> ({totals.totalQuestions} câu)
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-3 w-full bg-blue-950 rounded-full overflow-hidden flex border border-blue-800">
                <div
                  style={{ width: `${totals.percentBiet}%` }}
                  className="bg-emerald-500 h-full transition-all"
                  title={`Nhận biết: ${totals.percentBiet}% (${totals.scoreBiet}đ)`}
                />
                <div
                  style={{ width: `${totals.percentHieu}%` }}
                  className="bg-amber-500 h-full transition-all"
                  title={`Thông hiểu: ${totals.percentHieu}% (${totals.scoreHieu}đ)`}
                />
                <div
                  style={{ width: `${totals.percentVanDung}%` }}
                  className="bg-rose-500 h-full transition-all"
                  title={`Vận dụng: ${totals.percentVanDung}% (${totals.scoreVanDung}đ)`}
                />
              </div>

              <div className="flex items-center gap-4 text-[11px] mt-1.5 text-blue-200">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Biết ({totals.totalBiet} câu • {totals.scoreBiet}đ)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Hiểu ({totals.totalHieu} câu • {totals.scoreHieu}đ)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Vận dụng ({totals.totalVanDung} câu • {totals.scoreVanDung}đ)</span>
                </span>
              </div>
            </div>

            {/* Quick Competencies Bar or KHTN Structure */}
            {selectedSubjectId === 'khtn' ? (
              <div className="lg:border-l lg:border-blue-700/60 lg:pl-5 flex flex-col justify-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-1.5 flex items-center gap-1">
                  <span>Cấu trúc đề kiểm tra KHTN (THCS Ngãi Tứ):</span>
                </span>
                <div className="flex items-center flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 font-bold shadow-sm">
                    Trắc nghiệm: {totals.scoreNhieuLuaChon.toFixed(1).replace('.', ',')}đ ({totals.percentNhieuLuaChon}%)
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-500/50 text-amber-200 font-bold shadow-sm">
                    Tự luận: {totals.scoreTuLuan.toFixed(1).replace('.', ',')}đ ({totals.percentTuLuan}%)
                  </span>
                </div>
              </div>
            ) : (
              <div className="lg:border-l lg:border-blue-700/60 lg:pl-5 flex flex-col justify-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-1.5 flex items-center gap-1">
                  <span>Năng lực môn {currentSubject.name} trong đề:</span>
                </span>
                <div className="flex items-center flex-wrap gap-1.5">
                  {Object.values(currentSubject.competencies).map((c) => {
                    const cnt = competencyCounts[c.code] || 0;
                    return (
                      <div
                        key={c.code}
                        className={`px-2 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 shadow-sm ${c.badgeBg} ${c.badgeBorder}`}
                        title={`${c.name}: ${cnt} câu`}
                      >
                        <span>{c.code}:</span>
                        <strong className="text-white font-mono bg-blue-950/60 px-1 rounded text-[11px]">
                          {cnt}
                        </strong>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-blue-700/60 pb-1">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'matrix'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 border border-blue-400/40'
                  : 'bg-blue-900/40 hover:bg-blue-800/60 text-blue-200 border border-transparent'
              }`}
            >
              <Table2 className="w-4 h-4 text-amber-300" />
              <span>1. Ma Trận Đề (Phụ lục 1)</span>
            </button>

            <button
              onClick={() => setActiveTab('spec')}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'spec'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 border border-blue-400/40'
                  : 'bg-blue-900/40 hover:bg-blue-800/60 text-blue-200 border border-transparent'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-300" />
              <span>2. Bản Đặc Tả (Phụ lục 2)</span>
            </button>

            <button
              onClick={() => setActiveTab('examPaper')}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'examPaper'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 border border-blue-400/40'
                  : 'bg-blue-900/40 hover:bg-blue-800/60 text-blue-200 border border-transparent'
              }`}
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>{selectedSubjectId === 'khtn' ? '3. Đề Kiểm Tra Chuẩn KHTN' : '3. Đề KT Gắn Năng Lực Từng Câu'}</span>
            </button>

            <button
              onClick={() => setActiveTab('questions')}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'questions'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 border border-blue-400/40'
                  : 'bg-blue-900/40 hover:bg-blue-800/60 text-blue-200 border border-transparent'
              }`}
            >
              <ListOrdered className="w-4 h-4 text-cyan-300" />
              <span>4. Danh sách Câu ({questions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('rawExam')}
              className={`px-3 py-2 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'rawExam'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50 border border-blue-400/40'
                  : 'bg-blue-900/40 hover:bg-blue-800/60 text-blue-200 border border-transparent'
              }`}
            >
              <FileCode className="w-4 h-4 text-blue-300" />
              <span className="hidden sm:inline">Nội dung Đề gốc</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setIsGuideModalOpen(true)}
              className="text-xs text-blue-300 hover:text-white flex items-center gap-1 font-medium underline cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Xem hướng dẫn CV 7991</span>
            </button>
          </div>
        </div>

        {/* Tab Views */}
        <div>
          {activeTab === 'matrix' && (
            <MatrixTableView
              groupedTopics={groupedTopics}
              totals={totals}
              examMeta={examMeta}
              includeTraLoiNgan={scoreConfig.includeTraLoiNgan}
            />
          )}

          {activeTab === 'spec' && (
            <SpecTableView
              groupedTopics={groupedTopics}
              totals={totals}
              examMeta={examMeta}
              includeTraLoiNgan={scoreConfig.includeTraLoiNgan}
              onSelectQuestion={() => setActiveTab('questions')}
            />
          )}

          {activeTab === 'examPaper' && (
            <ExamPaperView
              examMeta={examMeta}
              questions={questions}
              scoreConfig={scoreConfig}
            />
          )}

          {activeTab === 'questions' && (
            <QuestionManager
              questions={questions}
              onUpdateQuestions={setQuestions}
              currentSubjectId={selectedSubjectId}
            />
          )}

          {activeTab === 'rawExam' && (
            <div className="bg-blue-900/60 backdrop-blur-md rounded-2xl border border-blue-700/50 p-4 sm:p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-white uppercase text-sm sm:text-base flex items-center gap-2">
                  <span>Nội dung văn bản đề kiểm tra</span>
                  <span className="text-xs text-blue-300 font-normal">({examMeta.title})</span>
                </h3>
                <button
                  onClick={() => setIsInputModalOpen(true)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  Thay đổi / Gửi đề mới
                </button>
              </div>
              <textarea
                rows={16}
                readOnly
                value={rawExamText}
                className="w-full p-4 bg-blue-950 border border-blue-800 rounded-xl text-blue-100 font-mono text-xs leading-relaxed focus:outline-none"
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-blue-800/80 bg-blue-950 py-4 text-center text-xs text-blue-300">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            <strong>TẠO MA TRẬN ĐỀ KT THEO CV 7991</strong> • Xây dựng chuẩn theo Công văn số 7991/BGDĐT-GDTrH của Bộ GD&ĐT.
          </p>
          <div className="flex items-center gap-3 text-[11px] text-blue-400">
            <span>Tích hợp Năng lực các môn THCS GDPT 2018</span>
            <span>•</span>
            <span>Xuất file Word chuẩn văn bản hành chính</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ExamInputModal
        isOpen={isInputModalOpen}
        onClose={() => setIsInputModalOpen(false)}
        onApplyExam={handleApplyExam}
        currentSubjectId={selectedSubjectId}
        onSelectSubject={handleSelectSubject}
      />

      <ScoreConfigModal
        isOpen={isScoreConfigOpen}
        onClose={() => setIsScoreConfigOpen(false)}
        config={scoreConfig}
        onSaveConfig={setScoreConfig}
      />

      <CompetencyGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        currentSubjectId={selectedSubjectId}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-700 border border-emerald-500 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-200 flex-shrink-0" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
