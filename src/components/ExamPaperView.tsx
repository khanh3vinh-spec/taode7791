import React, { useState } from 'react';
import { QuestionItem, ExamMeta, ScoreConfig, MATH_COMPETENCIES } from '../types/matrix';
import { getQuestionDirectScore } from '../utils/matrixBuilder';
import { Copy, CheckCircle2, Award, Printer, Eye, FileText } from 'lucide-react';

interface ExamPaperViewProps {
  examMeta: ExamMeta;
  questions: QuestionItem[];
  scoreConfig: ScoreConfig;
}

interface ParsedQuestion {
  stem: string;
  options: string[];
  isMultipleChoice: boolean;
  isTrueFalse: boolean;
}

function parseQuestionDetails(
  rawText: string,
  qNum: string,
  explicitOptions?: string[]
): ParsedQuestion {
  let cleaned = (rawText || '').trim();

  // Strip leading question number (e.g. "Câu 1.", "Câu 1:", "Bài 1.") to avoid duplication
  const numRegex = new RegExp(`^(${qNum}|câu\\s*\\d+|bài\\s*\\d+)[.:\\s]+`, 'i');
  cleaned = cleaned.replace(numRegex, '').trim();

  // 1. If explicit options were provided
  if (explicitOptions && explicitOptions.length >= 2) {
    let stem = cleaned;
    const firstOpt = explicitOptions[0].trim();
    const optLetter = firstOpt.slice(0, 2); // e.g. "A." or "a)"
    const optIdx = stem.indexOf(firstOpt);
    if (optIdx !== -1) {
      stem = stem.substring(0, optIdx).trim();
    } else {
      const pIdx = stem.search(new RegExp(`(?:^|\\n|\\s{2,})${optLetter.replace('.', '\\.')}`));
      if (pIdx > 5) {
        stem = stem.substring(0, pIdx).trim();
      }
    }
    return {
      stem: stem || cleaned,
      options: explicitOptions,
      isMultipleChoice: explicitOptions[0].toUpperCase().startsWith('A'),
      isTrueFalse: explicitOptions[0].toLowerCase().startsWith('a'),
    };
  }

  // 2. Detect Multiple choice options: A., B., C., D. (or A), B), ...)
  const mcMatch = cleaned.search(/(?:\r?\n|\s+)(?:A[.)]\s*)/);
  if (mcMatch !== -1) {
    const stem = cleaned.substring(0, mcMatch).trim();
    const optsPart = cleaned.substring(mcMatch).trim();
    // Split into individual options
    const rawOptions = optsPart
      .split(/(?=(?:^|\r?\n|\s+)[A-D][.)]\s*)/)
      .map((o) => o.trim())
      .filter(Boolean);

    if (rawOptions.length >= 2) {
      return {
        stem: stem || cleaned,
        options: rawOptions,
        isMultipleChoice: true,
        isTrueFalse: false,
      };
    }
  }

  // 3. Detect True/False options: a), b), c), d) (or a., b., ...)
  const tfMatch = cleaned.search(/(?:\r?\n|\s+)(?:a[.)]\s*)/);
  if (tfMatch !== -1) {
    const stem = cleaned.substring(0, tfMatch).trim();
    const optsPart = cleaned.substring(tfMatch).trim();
    const rawOptions = optsPart
      .split(/(?=(?:^|\r?\n|\s+)[a-d][.)]\s*)/)
      .map((o) => o.trim())
      .filter(Boolean);

    if (rawOptions.length >= 2) {
      return {
        stem: stem || cleaned,
        options: rawOptions,
        isMultipleChoice: false,
        isTrueFalse: true,
      };
    }
  }

  // 4. Essay or plain text
  return {
    stem: cleaned,
    options: [],
    isMultipleChoice: false,
    isTrueFalse: false,
  };
}

export const ExamPaperView: React.FC<ExamPaperViewProps> = ({
  examMeta,
  questions,
  scoreConfig,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [paperTheme, setPaperTheme] = useState<'whitePaper' | 'appBlue'>('whitePaper');

  const isKHTN =
    examMeta.subject?.toLowerCase().includes('khoa học') ||
    examMeta.subject?.toLowerCase().includes('khtn');

  const nlcQuestions = questions.filter((q) => q.partType === 'TN_NHIEU_LUA_CHON');
  const dsQuestions = questions.filter((q) => q.partType === 'TN_DUNG_SAI');
  const tlQuestions = questions.filter(
    (q) => q.partType === 'TU_LUAN' || q.partType === 'TN_TRA_LOI_NGAN'
  );

  // Exact essay scores taken directly from questions in KHTN
  const scoreTL = tlQuestions.reduce(
    (acc, q) => acc + getQuestionDirectScore(q, 0),
    0
  ) || scoreConfig.scoreTuLuan;
  const scoreTN = nlcQuestions.length * 0.25 || scoreConfig.scoreNhieuLuaChon;
  const totalExamScore = scoreTL + scoreTN || 10;

  const formatLevelName = (level: string) => {
    if (level === 'BIET') return 'Nhận biết';
    if (level === 'HIEU') return 'Thông hiểu';
    if (level === 'VAN_DUNG') return 'Vận dụng';
    return level;
  };

  const handleCopyFormattedExam = async () => {
    let fullText = `${examMeta.school || 'TRƯỜNG THCS NGÃI TỨ'}\n`;
    fullText += `${examMeta.title.toUpperCase()}\n`;
    fullText += `MÔN: ${examMeta.subject?.toUpperCase() || 'KHOA HỌC TỰ NHIÊN'} - KHỐI: ${examMeta.grade} - THỜI GIAN: ${examMeta.timeLimit || '60 phút'}\n\n`;

    if (nlcQuestions.length > 0) {
      fullText += `PHẦN I. CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (${scoreTN.toFixed(1).replace('.', ',')} ĐIỂM)\n\n`;
      nlcQuestions.forEach((q) => {
        const parsed = parseQuestionDetails(q.fullQuestionText || q.contentSnippet, q.questionNumber, q.options);
        const compTag = isKHTN ? '' : ` [${q.competency} - ${formatLevelName(q.level)}]:`;
        fullText += `${q.questionNumber}${compTag ? compTag + ' ' : '. '}${parsed.stem}\n`;
        if (parsed.options.length > 0) {
          fullText += `        ${parsed.options.join('    ')}\n`;
        }
        fullText += `\n`;
      });
    }

    if (dsQuestions.length > 0) {
      fullText += `PHẦN II. CÂU TRẮC NGHIỆM ĐÚNG SAI (${scoreConfig.scoreDungSai.toFixed(1).replace('.', ',')} ĐIỂM)\n\n`;
      dsQuestions.forEach((q) => {
        const parsed = parseQuestionDetails(q.fullQuestionText || q.contentSnippet, q.questionNumber, q.options);
        const compTag = isKHTN ? '' : ` [${q.competency} - ${formatLevelName(q.level)}]:`;
        fullText += `${q.questionNumber}${compTag ? compTag + ' ' : '. '}${parsed.stem}\n`;
        if (parsed.options.length > 0) {
          parsed.options.forEach((opt) => {
            fullText += `    ${opt}\n`;
          });
        }
        fullText += `\n`;
      });
    }

    if (tlQuestions.length > 0) {
      const partTitle = isKHTN ? 'PHẦN II. CÂU HỎI TỰ LUẬN' : 'PHẦN III. TỰ LUẬN';
      fullText += `${partTitle} (${scoreTL.toFixed(1).replace('.', ',')} ĐIỂM)\n\n`;
      tlQuestions.forEach((q) => {
        const parsed = parseQuestionDetails(q.fullQuestionText || q.contentSnippet, q.questionNumber, q.options);
        const compTag = isKHTN ? '' : ` [${q.competency} - ${formatLevelName(q.level)}]:`;
        const directScore = getQuestionDirectScore(q, 0);
        const scoreLabel = isKHTN && directScore > 0 && !parsed.stem.includes('điểm')
          ? ` (${directScore.toString().replace('.', ',')} điểm)`
          : '';
        fullText += `${q.questionNumber}${scoreLabel}${compTag ? compTag + ' ' : '. '}${parsed.stem}\n\n`;
      });
    }

    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (e) {
      console.warn('Clipboard write failed:', e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const isWhite = paperTheme === 'whitePaper';

  return (
    <div className="bg-blue-900/60 backdrop-blur-md rounded-2xl border border-blue-700/50 p-4 sm:p-7 shadow-2xl">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-blue-700/60 no-print">
        <div>
          <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wide flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-300" />
            <span>
              {isKHTN
                ? 'ĐỀ KIỂM TRA MÔN KHOA HỌC TỰ NHIÊN'
                : 'ĐỀ KIỂM TRA MÔN TOÁN CÓ TÍCH HỢP NĂNG LỰC TOÁN HỌC TRONG TỪNG CÂU'}
            </span>
          </h2>
          <p className="text-xs text-blue-200 mt-0.5">
            {isKHTN
              ? 'Đề thi không tích hợp năng lực; điểm số phần tự luận hiển thị trực tiếp theo từng câu hỏi.'
              : (
                <>
                  Giữ nguyên vẹn 100% đề thi gốc và các phương án lựa chọn A, B, C, D; gắn mã{' '}
                  <strong>[Năng lực - Mức độ]</strong> trực tiếp tại mỗi câu.
                </>
              )}
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {/* Switch Theme: White paper (like user screenshot) vs Blue */}
          <div className="inline-flex rounded-xl border border-blue-700 bg-blue-950 p-1 text-xs">
            <button
              type="button"
              onClick={() => setPaperTheme('whitePaper')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isWhite
                  ? 'bg-white text-slate-900 shadow-md'
                  : 'text-blue-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Mẫu giấy in (Nền trắng)</span>
            </button>
            <button
              type="button"
              onClick={() => setPaperTheme('appBlue')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                !isWhite
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-blue-300 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Giao diện màu xanh</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopyFormattedExam}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md border border-emerald-400/40 cursor-pointer transition-all"
            title="Sao chép toàn bộ đề có gắn năng lực để dán vào Word"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-amber-200" />
                <span>Đã sao chép!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Sao chép Đề thi</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="p-2 rounded-xl bg-blue-800 hover:bg-blue-700 text-blue-200 hover:text-white border border-blue-600 text-xs cursor-pointer transition-colors"
            title="In đề thi này"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Exam Sheet Display: Exact match of user screenshot */}
      <div
        className={`rounded-2xl p-6 sm:p-10 shadow-2xl transition-all ${
          isWhite
            ? 'bg-white text-slate-900 font-serif border border-slate-300'
            : 'bg-blue-950/90 text-slate-100 font-sans border border-blue-700/80'
        }`}
        style={isWhite ? { fontFamily: '"Tinos", "Times New Roman", Times, serif' } : {}}
      >
        {/* Header of Exam Paper */}
        <div className={`border-b-2 pb-6 mb-7 ${isWhite ? 'border-slate-800' : 'border-blue-700'}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="text-left">
              <p className={`text-xs uppercase font-bold tracking-wider ${isWhite ? 'text-slate-700' : 'text-blue-300'}`}>
                {examMeta.school || 'SỞ GIÁO DỤC VÀ ĐÀO TẠO'}
              </p>
              <h1 className={`text-lg sm:text-xl font-bold uppercase mt-1 ${isWhite ? 'text-slate-900' : 'text-amber-300'}`}>
                {examMeta.title}
              </h1>
              <p className={`text-xs sm:text-sm mt-1 italic ${isWhite ? 'text-slate-700' : 'text-blue-200'}`}>
                Môn: <strong>{examMeta.subject || 'Toán học'}</strong> — Khối lớp: <strong>{examMeta.grade}</strong> — Thời gian làm bài: <strong>{examMeta.timeLimit || '90 phút'}</strong>
              </p>
            </div>

            <div className={`text-center p-3 rounded-xl border text-xs min-w-[170px] ${
              isWhite ? 'bg-slate-50 border-slate-300 text-slate-800' : 'bg-blue-900/40 border-blue-600 text-blue-200'
            }`}>
              <div className="font-bold">Tổng điểm: {totalExamScore.toFixed(1).replace('.', ',')} điểm</div>
              <div className="text-[11px] mt-0.5 opacity-90">
                {isKHTN ? (
                  <>
                    Trắc nghiệm: {scoreTN.toFixed(1).replace('.', ',')}đ<br />
                    Tự luận: {scoreTL.toFixed(1).replace('.', ',')}đ
                  </>
                ) : (
                  <>
                    TN Nhiều LC: {scoreConfig.scoreNhieuLuaChon.toFixed(1).replace('.', ',')}đ<br />
                    Đúng – Sai: {scoreConfig.scoreDungSai.toFixed(1).replace('.', ',')}đ<br />
                    Tự luận: {scoreConfig.scoreTuLuan.toFixed(1).replace('.', ',')}đ
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* PHẦN I: TRẮC NGHIỆM NHIỀU LỰA CHỌN */}
        {nlcQuestions.length > 0 && (
          <div className="space-y-5 mb-8">
            <div className={`p-2.5 rounded-lg font-bold text-sm uppercase tracking-wide flex items-center justify-between ${
              isWhite ? 'bg-slate-100 text-slate-900 border border-slate-300' : 'bg-blue-900/60 text-white border border-blue-700'
            }`}>
              <span>PHẦN I. CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN ({scoreTN.toFixed(1).replace('.', ',')} ĐIỂM)</span>
              <span className="text-xs font-normal normal-case">
                (Gồm {nlcQuestions.length} câu hỏi, mỗi câu 0,25 điểm)
              </span>
            </div>

            <div className="space-y-4">
              {nlcQuestions.map((q) => {
                const parsed = parseQuestionDetails(q.fullQuestionText || q.contentSnippet, q.questionNumber, q.options);

                return (
                  <div key={q.id} className="text-sm leading-relaxed">
                    {/* Exact line as shown in screenshot: Câu 1 [NLGTTH - Nhận biết]: Lời dẫn câu hỏi */}
                    <div className="text-base sm:text-[15px]">
                      <strong className={`font-bold ${isWhite ? 'text-black' : 'text-white'}`}>
                        {q.questionNumber}{q.questionNumber.endsWith('.') || q.questionNumber.endsWith(':') ? ' ' : '. '}
                      </strong>
                      {!isKHTN && (
                        <span className={`font-bold ${isWhite ? 'text-[#003366]' : 'text-amber-300'}`}>
                          [{q.competency} - {formatLevelName(q.level)}]:{' '}
                        </span>
                      )}
                      <span className={isWhite ? 'text-black' : 'text-slate-100'}>
                        {parsed.stem}
                      </span>
                    </div>

                    {/* Options A, B, C, D neatly indented */}
                    {parsed.options.length > 0 && (
                      <div className="pt-1.5 pl-6 sm:pl-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
                          {parsed.options.map((opt, oIdx) => (
                            <div key={oIdx} className="font-medium">
                              {opt}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PHẦN II: TRẮC NGHIỆM ĐÚNG SAI */}
        {dsQuestions.length > 0 && (
          <div className="space-y-5 mb-8">
            <div className={`p-2.5 rounded-lg font-bold text-sm uppercase tracking-wide flex items-center justify-between ${
              isWhite ? 'bg-slate-100 text-slate-900 border border-slate-300' : 'bg-blue-900/60 text-white border border-blue-700'
            }`}>
              <span>PHẦN II. CÂU TRẮC NGHIỆM ĐÚNG SAI ({scoreConfig.scoreDungSai.toFixed(1).replace('.', ',')} ĐIỂM)</span>
              <span className="text-xs font-normal normal-case">
                (Gồm {dsQuestions.length} câu hỏi, mỗi câu gồm 4 ý a, b, c, d)
              </span>
            </div>

            <div className="space-y-5">
              {dsQuestions.map((q) => {
                const parsed = parseQuestionDetails(q.fullQuestionText || q.contentSnippet, q.questionNumber, q.options);

                return (
                  <div key={q.id} className="text-sm leading-relaxed">
                    {/* Câu X [NL... - Mức độ]: Lời dẫn */}
                    <div className="text-base sm:text-[15px]">
                      <strong className={`font-bold ${isWhite ? 'text-black' : 'text-white'}`}>
                        {q.questionNumber}{q.questionNumber.endsWith('.') || q.questionNumber.endsWith(':') ? ' ' : '. '}
                      </strong>
                      {!isKHTN && (
                        <span className={`font-bold ${isWhite ? 'text-[#003366]' : 'text-amber-300'}`}>
                          [{q.competency} - {formatLevelName(q.level)}]:{' '}
                        </span>
                      )}
                      <span className={isWhite ? 'text-black' : 'text-slate-100'}>
                        {parsed.stem}
                      </span>
                    </div>

                    {/* Sub-items a, b, c, d */}
                    {parsed.options.length > 0 && (
                      <div className="pt-1.5 pl-6 sm:pl-8 space-y-1">
                        {parsed.options.map((opt, oIdx) => (
                          <div key={oIdx} className="font-medium">
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PHẦN TỰ LUẬN */}
        {tlQuestions.length > 0 && (
          <div className="space-y-5">
            <div className={`p-2.5 rounded-lg font-bold text-sm uppercase tracking-wide flex items-center justify-between ${
              isWhite ? 'bg-slate-100 text-slate-900 border border-slate-300' : 'bg-blue-900/60 text-white border border-blue-700'
            }`}>
              <span>
                {isKHTN ? 'PHẦN II. CÂU HỎI TỰ LUẬN' : 'PHẦN III. TỰ LUẬN'} ({scoreTL.toFixed(1).replace('.', ',')} ĐIỂM)
              </span>
              <span className="text-xs font-normal normal-case">
                (Gồm {tlQuestions.length} {isKHTN ? 'câu hỏi tự luận, điểm số lấy trực tiếp từ đề' : 'bài toán trình bày lời giải chi tiết'})
              </span>
            </div>

            <div className="space-y-5">
              {tlQuestions.map((q) => {
                const parsed = parseQuestionDetails(q.fullQuestionText || q.contentSnippet, q.questionNumber, q.options);
                const directScore = getQuestionDirectScore(q, 0);

                return (
                  <div key={q.id} className="text-sm leading-relaxed">
                    <div className="text-base sm:text-[15px]">
                      <strong className={`font-bold ${isWhite ? 'text-black' : 'text-white'}`}>
                        {q.questionNumber}
                        {isKHTN && directScore > 0 && !parsed.stem.includes('điểm') && (
                          <span className={`font-bold ml-1 ${isWhite ? 'text-amber-800' : 'text-amber-300'}`}>
                            ({directScore.toString().replace('.', ',')} điểm)
                          </span>
                        )}
                        {q.questionNumber.endsWith('.') || q.questionNumber.endsWith(':') ? ' ' : '. '}
                      </strong>
                      {!isKHTN && (
                        <span className={`font-bold ${isWhite ? 'text-[#003366]' : 'text-amber-300'}`}>
                          [{q.competency} - {formatLevelName(q.level)}]:{' '}
                        </span>
                      )}
                      <span className={isWhite ? 'text-black' : 'text-slate-100'}>
                        {parsed.stem}
                      </span>
                    </div>

                    {/* Any sub-items for essay if present */}
                    {parsed.options.length > 0 && (
                      <div className="pt-1.5 pl-6 sm:pl-8 space-y-1">
                        {parsed.options.map((opt, oIdx) => (
                          <div key={oIdx} className="font-medium">
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className={`mt-8 pt-4 border-t text-center text-xs italic ${
          isWhite ? 'border-slate-300 text-slate-500' : 'border-blue-800 text-blue-300'
        }`}>
          --------- HẾT ---------
          <br />
          (Cán bộ coi thi không giải thích gì thêm)
        </div>
      </div>
    </div>
  );
};
