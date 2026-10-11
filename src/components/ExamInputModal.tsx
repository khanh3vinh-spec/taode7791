import React, { useState, useRef, useEffect } from 'react';
import { SAMPLE_EXAMS, SampleExamData } from '../data/sampleExams';
import { QuestionItem, ExamMeta, SubjectId, SUBJECT_DEFINITIONS, getSubjectById } from '../types/matrix';
import { extractScoreFromText } from '../utils/matrixBuilder';
import {
  Sparkles,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Upload,
  FileType,
  FileUp,
  Trash2,
  Layers,
} from 'lucide-react';

interface UploadedFileInfo {
  name: string;
  size: number;
  mimeType: string;
  base64: string;
}

interface ExamInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyExam: (meta: ExamMeta, questions: QuestionItem[], rawText?: string) => void;
  currentSubjectId?: SubjectId;
  onSelectSubject?: (subjectId: SubjectId) => void;
}

export const ExamInputModal: React.FC<ExamInputModalProps> = ({
  isOpen,
  onClose,
  onApplyExam,
  currentSubjectId = 'toan',
  onSelectSubject,
}) => {
  const [inputMode, setInputMode] = useState<'pdf' | 'text' | 'sample'>('pdf');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId>(currentSubjectId);
  const [sampleFilterSubject, setSampleFilterSubject] = useState<string>(currentSubjectId);
  const [selectedSampleId, setSelectedSampleId] = useState<string>('math9-hk1');
  const [examContent, setExamContent] = useState<string>(SAMPLE_EXAMS[0].rawText);
  const [uploadedFile, setUploadedFile] = useState<UploadedFileInfo | null>(null);

  const [grade, setGrade] = useState<string>('9');
  const [examType, setExamType] = useState<string>('Cuối kì I');
  const [schoolName, setSchoolName] = useState<string>('TRƯỜNG THCS');
  const [timeLimit, setTimeLimit] = useState<string>('90 phút');
  const [examTitle, setExamTitle] = useState<string>('ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I');

  // Sync when currentSubjectId prop changes
  useEffect(() => {
    if (currentSubjectId) {
      setSelectedSubject(currentSubjectId);
      setSampleFilterSubject(currentSubjectId);
      const subDef = getSubjectById(currentSubjectId);
      setTimeLimit(subDef.defaultTimeLimit);
      setExamTitle(`ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I - MÔN ${subDef.name.toUpperCase()}`);
    }
  }, [currentSubjectId]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSelectSample = (sample: SampleExamData) => {
    setSelectedSampleId(sample.id);
    setExamContent(sample.rawText);
    setUploadedFile(null);
    setGrade(sample.grade);
    setExamType(sample.examType);
    setExamTitle(sample.meta.title);
    setTimeLimit(sample.meta.timeLimit);
    if (sample.subjectId) {
      setSelectedSubject(sample.subjectId);
      onSelectSubject?.(sample.subjectId);
    }
    if (sample.meta.school) setSchoolName(sample.meta.school);
  };

  const handleUseSampleDirectly = (sample: SampleExamData) => {
    if (sample.subjectId) {
      onSelectSubject?.(sample.subjectId);
    }
    onApplyExam(
      {
        title: sample.meta.title,
        grade: sample.grade,
        subject: sample.meta.subject,
        school: sample.meta.school,
        timeLimit: sample.meta.timeLimit,
        summary: sample.meta.summary,
      },
      sample.questions,
      sample.rawText
    );
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const processSelectedFile = (file: File) => {
    setErrorMsg(null);

    // If text file
    if (file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          setExamContent(text);
          setUploadedFile(null);
          setInputMode('text');
        }
      };
      reader.readAsText(file);
      return;
    }

    // If PDF or image
    const mimeType = file.type || (file.name.endsWith('.pdf') ? 'application/pdf' : 'application/octet-stream');
    
    // Check file size (e.g. max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      setErrorMsg('Dung lượng file vượt quá 20MB. Vui lòng chọn file nhẹ hơn.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Extract base64 part
      const base64Data = result.split(',')[1];
      setUploadedFile({
        name: file.name,
        size: file.size,
        mimeType,
        base64: base64Data,
      });
      setInputMode('pdf');
      // Suggest exam title from file name
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[_\\-]/g, ' ');
      setExamTitle(cleanName.toUpperCase());
    };
    reader.onerror = () => {
      setErrorMsg('Không thể đọc file. Vui lòng thử lại.');
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyzeWithAI = async () => {
    const isUsingPdf = inputMode === 'pdf' && uploadedFile;
    const isUsingText = (inputMode === 'text' || inputMode === 'sample') && examContent.trim();

    if (!isUsingPdf && !isUsingText) {
      setErrorMsg('Vui lòng tải lên file PDF đề thi hoặc nhập/dán nội dung văn bản.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setLoadingStep(
      isUsingPdf
        ? 'Đang đọc và bóc tách dữ liệu từ file PDF đề kiểm tra...'
        : 'Đang phân tích cấu trúc các câu hỏi...'
    );

    try {
      const payload: any = {
        grade,
        examType,
        subject: selectedSubject,
      };

      if (isUsingPdf) {
        payload.fileData = {
          fileName: uploadedFile.name,
          mimeType: uploadedFile.mimeType,
          base64: uploadedFile.base64,
        };
      } else {
        payload.examContent = examContent;
      }

      const response = await fetch('/api/analyze-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        throw new Error(resData.error || 'Lỗi khi gọi máy chủ phân tích đề.');
      }

      const parsed = resData.data;
      const subDef = getSubjectById(selectedSubject);
      const defaultCompetency = Object.keys(subDef.competencies)[0] || 'NLTD & LLTH';

      const questions: QuestionItem[] = (parsed.questions || []).map((q: any, index: number) => {
        let extractedScore = typeof q.score === 'number' && q.score > 0 ? q.score : undefined;
        if (extractedScore === undefined) {
          const textToScan = `${q.questionNumber || ''} ${q.fullQuestionText || ''} ${q.contentSnippet || ''}`;
          const parsedScore = extractScoreFromText(textToScan);
          if (parsedScore !== null) {
            extractedScore = parsedScore;
          }
        }

        return {
          id: q.id || `q_${index + 1}`,
          questionNumber: q.questionNumber || `Câu ${index + 1}`,
          partType: q.partType || 'TN_NHIEU_LUA_CHON',
          topic: q.topic || `Chủ đề môn ${subDef.name}`,
          subTopic: q.subTopic || 'Đơn vị kiến thức',
          level: q.level || 'BIET',
          competency: q.competency || defaultCompetency,
          contentSnippet: q.contentSnippet || '',
          fullQuestionText: q.fullQuestionText || q.contentSnippet || '',
          options: Array.isArray(q.options) ? q.options : [],
          expectedOutcome: q.expectedOutcome || 'Yêu cầu cần đạt chuẩn GDPT 2018.',
          score: extractedScore,
        };
      });

      const rawExtracted = parsed.extractedText || (isUsingText ? examContent : `[Nội dung từ file ${uploadedFile?.name}]`);

      onApplyExam(
        {
          title: parsed.title || examTitle,
          grade: parsed.grade || grade,
          subject: parsed.subject || subDef.name,
          school: schoolName,
          timeLimit,
          summary: parsed.summary,
        },
        questions,
        rawExtracted
      );

      onClose();
    } catch (err: any) {
      console.warn('AI analysis failed:', err);
      // Fallback if matching sample
      const matchedSample = SAMPLE_EXAMS.find((s) => s.id === selectedSampleId);
      if (inputMode === 'sample' && matchedSample) {
        onApplyExam(
          {
            title: examTitle || matchedSample.meta.title,
            grade,
            subject: matchedSample.meta.subject || getSubjectById(selectedSubject).name,
            school: schoolName,
            timeLimit,
            summary: matchedSample.meta.summary,
          },
          matchedSample.questions,
          matchedSample.rawText
        );
        onClose();
      } else {
        setErrorMsg(
          'Không thể phân tích file: ' +
            (err.message || 'Lỗi kết nối') +
            '. Vui lòng kiểm tra lại file PDF hoặc thử chọn đề mẫu có sẵn.'
        );
      }
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-blue-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-blue-900 border border-blue-600 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-blue-950 to-blue-900 border-b border-blue-700/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600 rounded-lg text-white shadow-md">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wide">
                GỬI ĐỀ KIỂM TRA ĐỂ TẠO MA TRẬN & BẢN ĐẶC TẢ (CV 7991)
              </h3>
              <p className="text-xs text-blue-200">
                Hỗ trợ tải lên file PDF đề thi, dán văn bản hoặc chọn bộ đề mẫu chuẩn GDPT 2018
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-300 hover:text-white hover:bg-blue-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm flex-1">
          {/* Input Method Selector Tabs */}
          <div className="flex items-center gap-2 border-b border-blue-700/60 pb-3">
            <button
              type="button"
              onClick={() => setInputMode('pdf')}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                inputMode === 'pdf'
                  ? 'bg-blue-600 text-white shadow-md border border-blue-400/50'
                  : 'bg-blue-950/60 text-blue-200 hover:bg-blue-800/60'
              }`}
            >
              <FileUp className="w-4 h-4 text-amber-300" />
              <span>1. Tải đề lên từ file PDF</span>
              {uploadedFile && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setInputMode('text')}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                inputMode === 'text'
                  ? 'bg-blue-600 text-white shadow-md border border-blue-400/50'
                  : 'bg-blue-950/60 text-blue-200 hover:bg-blue-800/60'
              }`}
            >
              <FileText className="w-4 h-4 text-cyan-300" />
              <span>2. Dán văn bản đề thi</span>
            </button>

            <button
              type="button"
              onClick={() => setInputMode('sample')}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                inputMode === 'sample'
                  ? 'bg-blue-600 text-white shadow-md border border-blue-400/50'
                  : 'bg-blue-950/60 text-blue-200 hover:bg-blue-800/60'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>3. Đề thi mẫu chuẩn</span>
            </button>
          </div>

          {/* Mode 1: PDF Upload Box */}
          {inputMode === 'pdf' && (
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              {!uploadedFile ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-blue-500/80 hover:border-amber-400 bg-blue-950/60 hover:bg-blue-950/90 rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-800/80 group-hover:bg-blue-700 group-hover:scale-110 transition-all flex items-center justify-center border border-blue-600 shadow-lg shadow-blue-950">
                    <FileType className="w-8 h-8 text-amber-300" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      Kéo thả file PDF đề kiểm tra vào đây hoặc nhấn để chọn file
                    </p>
                    <p className="text-xs text-blue-300 mt-1">
                      Hỗ trợ file PDF đề thi môn Toán THCS (Khối lớp 6; 7; 8; 9). AI sẽ đọc toàn bộ các trang, công thức toán và hình học.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-xl font-bold text-xs shadow-md border border-blue-500/40">
                    <Upload className="w-4 h-4" />
                    <span>Chọn file PDF từ máy tính</span>
                  </div>
                </div>
              ) : (
                /* Uploaded File Card */
                <div className="p-4 bg-blue-950/90 border border-blue-600 rounded-2xl shadow-xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center flex-shrink-0">
                      <FileType className="w-6 h-6 text-rose-300" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm truncate">
                          {uploadedFile.name}
                        </span>
                        <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-400/30 rounded text-[10px] font-bold">
                          PDF
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-blue-300 mt-0.5">
                        <span>Dung lượng: {formatFileSize(uploadedFile.size)}</span>
                        <span>•</span>
                        <span className="text-emerald-400 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Sẵn sàng phân tích
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-blue-800 hover:bg-blue-700 text-blue-100 rounded-lg text-xs font-semibold cursor-pointer border border-blue-600 transition-colors"
                    >
                      Đổi file khác
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadedFile(null)}
                      className="p-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 rounded-lg border border-rose-800 cursor-pointer transition-colors"
                      title="Xoá file này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mode 2: Paste Raw Text */}
          {inputMode === 'text' && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>Dán nội dung đề kiểm tra:</span>
                </label>
                <span className="text-[11px] text-blue-300">
                  Hỗ trợ cả 4 phần (Nhiều lựa chọn, Đúng-Sai, Trả lời ngắn, Tự luận)
                </span>
              </div>
              <textarea
                rows={9}
                value={examContent}
                onChange={(e) => setExamContent(e.target.value)}
                placeholder="Dán nội dung đề kiểm tra tại đây..."
                className="w-full p-3 bg-blue-950 border border-blue-700 rounded-xl text-white placeholder-blue-400 font-mono text-xs focus:outline-none focus:border-amber-400 shadow-inner"
              />
            </div>
          )}

          {/* Mode 3: Sample Exams */}
          {inputMode === 'sample' && (
            <div>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2.5">
                <label className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>⚡ Chọn nhanh Đề kiểm tra mẫu chuẩn theo môn:</span>
                </label>
                <div className="flex items-center gap-1 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setSampleFilterSubject('all')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                      sampleFilterSubject === 'all'
                        ? 'bg-amber-400 text-blue-950 font-black'
                        : 'bg-blue-950/80 text-blue-200 hover:bg-blue-800'
                    }`}
                  >
                    Tất cả
                  </button>
                  {Object.values(SUBJECT_DEFINITIONS).map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setSampleFilterSubject(sub.id)}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-colors flex items-center gap-1 ${
                        sampleFilterSubject === sub.id
                          ? 'bg-amber-400 text-blue-950 font-black'
                          : 'bg-blue-950/80 text-blue-200 hover:bg-blue-800'
                      }`}
                    >
                      <span>{sub.icon}</span>
                      <span>{sub.shortName}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[46vh] overflow-y-auto pr-1">
                {SAMPLE_EXAMS.filter(
                  (s) => sampleFilterSubject === 'all' || s.subjectId === sampleFilterSubject
                ).map((sample) => (
                  <div
                    key={sample.id}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      selectedSampleId === sample.id
                        ? 'bg-blue-800/90 border-amber-400 ring-1 ring-amber-400/40 shadow-md'
                        : 'bg-blue-950/60 border-blue-800 hover:border-blue-700 hover:bg-blue-950/90'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-bold text-white text-xs">{sample.name}</span>
                        <div className="flex items-center gap-1">
                          {sample.subjectId && (
                            <span className="bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded text-[10px] font-bold border border-amber-400/30">
                              {getSubjectById(sample.subjectId).shortName}
                            </span>
                          )}
                          <span className="bg-blue-900 px-1.5 py-0.5 rounded text-[10px] text-blue-200 font-bold border border-blue-700">
                            Lớp {sample.grade}
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-blue-200 line-clamp-2">
                        {sample.meta.summary}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-blue-700/50 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleSelectSample(sample)}
                        className="text-xs text-blue-300 hover:text-white font-medium underline cursor-pointer"
                      >
                        Nạp vào khung soạn
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUseSampleDirectly(sample)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Áp dụng ngay</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Exam Metadata Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 p-3.5 bg-blue-950/60 rounded-xl border border-blue-800">
            <div>
              <label className="block text-[11px] font-bold text-amber-300 mb-1 flex items-center gap-1">
                <Layers className="w-3 h-3" />
                <span>Môn học</span>
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => {
                  const newSub = e.target.value as SubjectId;
                  setSelectedSubject(newSub);
                  const subDef = getSubjectById(newSub);
                  setExamTitle(`ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I - MÔN ${subDef.name.toUpperCase()}`);
                  setTimeLimit(subDef.defaultTimeLimit);
                  onSelectSubject?.(newSub);
                }}
                className="w-full px-2 py-1.5 bg-blue-900 border border-amber-400/70 rounded text-amber-200 text-xs font-bold"
              >
                {Object.values(SUBJECT_DEFINITIONS).map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.icon} {sub.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-blue-200 mb-1">
                Khối lớp (THCS)
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-2 py-1.5 bg-blue-900/80 border border-blue-700 rounded text-white text-xs font-semibold"
              >
                <option value="6">Khối 6 (Lớp 6)</option>
                <option value="7">Khối 7 (Lớp 7)</option>
                <option value="8">Khối 8 (Lớp 8)</option>
                <option value="9">Khối 9 (Lớp 9)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-blue-200 mb-1">
                Kỳ kiểm tra
              </label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="w-full px-2 py-1.5 bg-blue-900/80 border border-blue-700 rounded text-white text-xs"
              >
                <option value="Giữa kì I">Giữa kì I</option>
                <option value="Cuối kì I">Cuối kì I</option>
                <option value="Giữa kì II">Giữa kì II</option>
                <option value="Cuối kì II">Cuối kì II</option>
                <option value="Khảo sát định kì">Khảo sát định kì</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-blue-200 mb-1">
                Thời gian làm bài
              </label>
              <input
                type="text"
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
                className="w-full px-2 py-1.5 bg-blue-900/80 border border-blue-700 rounded text-white text-xs"
                placeholder="Ví dụ: 90 phút"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-blue-200 mb-1">
                Tên trường THCS
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full px-2 py-1.5 bg-blue-900/80 border border-blue-700 rounded text-white text-xs"
                placeholder="TRƯỜNG THCS..."
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-blue-200 mb-1">
                Tiêu đề đề kiểm tra
              </label>
              <input
                type="text"
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-blue-900/80 border border-blue-700 rounded text-white text-xs"
                placeholder="ĐỀ KIỂM TRA ĐỊNH KÌ HỌC KÌ I MÔN TOÁN"
              />
            </div>
          </div>

          {/* Loading status or Error Message */}
          {isLoading && (
            <div className="p-3.5 bg-blue-950 border border-blue-500 rounded-xl text-blue-100 text-xs flex items-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-amber-300 flex-shrink-0" />
              <div>
                <p className="font-bold text-white">{loadingStep}</p>
                <p className="text-[11px] text-blue-300 mt-0.5">
                  AI đang bóc tách từng câu, nhận diện hình thức trắc nghiệm/tự luận, xác định mức độ nhận thức và phân loại 5 năng lực toán học...
                </p>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-rose-950/80 border border-rose-600/80 rounded-xl text-rose-200 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-blue-950 to-blue-900 border-t border-blue-700/80 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-blue-900/80 hover:bg-blue-800 text-blue-200 hover:text-white rounded-lg text-xs font-semibold cursor-pointer border border-blue-700"
          >
            Đóng
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={
                isLoading ||
                (inputMode === 'pdf' && !uploadedFile) ||
                (inputMode !== 'pdf' && !examContent.trim())
              }
              onClick={handleAnalyzeWithAI}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white rounded-xl font-black text-xs sm:text-sm shadow-lg shadow-blue-950 flex items-center gap-2 border border-blue-400/40 transition-all hover:scale-[1.02] cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Đang Phân Tích & Gán Năng Lực...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>
                    {inputMode === 'pdf'
                      ? 'Phân tích file PDF này (CV 7991)'
                      : 'Phân tích & Tạo Ma trận, Bản đặc tả (CV 7991)'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
