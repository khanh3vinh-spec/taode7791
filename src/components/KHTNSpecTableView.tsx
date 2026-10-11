import React from 'react';
import { GroupedTopic, MatrixTotals } from '../utils/matrixBuilder';
import { ExamMeta, QuestionItem, getSubjectById } from '../types/matrix';

interface KHTNSpecTableViewProps {
  groupedTopics: GroupedTopic[];
  totals: MatrixTotals;
  examMeta: ExamMeta;
  onSelectQuestion?: (q: QuestionItem) => void;
}

export const KHTNSpecTableView: React.FC<KHTNSpecTableViewProps> = ({
  groupedTopics,
  totals,
  examMeta,
  onSelectQuestion,
}) => {
  const subDef = getSubjectById(examMeta.subject);

  // Group questions by unit and by cognitive level for clean spec table layout
  const formatQuestionsBadge = (questions: QuestionItem[], type: 'TL' | 'TN') => {
    if (!questions || questions.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-1 justify-center">
        {questions.map((q) => {
          const num = q.questionNumber.replace(/câu\s*/i, 'C').replace(/bài\s*/i, 'B');
          return (
            <button
              key={q.id}
              type="button"
              onClick={() => onSelectQuestion?.(q)}
              className={`text-[11px] leading-tight px-1.5 py-0.5 rounded border ${
                type === 'TL'
                  ? 'bg-amber-500/20 text-amber-200 border-amber-400/40'
                  : 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40'
              } font-bold hover:scale-105 transition-all text-center cursor-pointer shadow-sm`}
              title={`${q.questionNumber}: ${q.contentSnippet || q.topic}`}
            >
              <span>{num}</span>
            </button>
          );
        })}
      </div>
    );
  };

  const totalTN =
    totals.countNhieuLuaChon.BIET +
    totals.countNhieuLuaChon.HIEU +
    totals.countNhieuLuaChon.VAN_DUNG +
    totals.countNhieuLuaChon.VAN_DUNG_CAO +
    totals.countDungSai.BIET +
    totals.countDungSai.HIEU +
    totals.countDungSai.VAN_DUNG +
    totals.countDungSai.VAN_DUNG_CAO;

  const totalTL =
    totals.countTuLuan.BIET +
    totals.countTuLuan.HIEU +
    totals.countTuLuan.VAN_DUNG +
    totals.countTuLuan.VAN_DUNG_CAO;

  return (
    <div className="bg-blue-900/60 backdrop-blur-md rounded-2xl border border-blue-700/50 p-4 sm:p-6 shadow-2xl">
      {/* Official Header per User Document */}
      <div className="text-center mb-6 border-b border-blue-700/60 pb-5">
        <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-200">
          {examMeta.school || 'TRƯỜNG THCS NGÃI TỨ'} • TỔ KHTN – TIẾNG ANH
        </div>
        <h2 className="text-base sm:text-xl font-black text-amber-300 mt-2 uppercase tracking-wide">
          BẢNG ĐẶC TẢ ĐỀ KIỂM TRA GIỮA KÌ I
        </h2>
        <p className="text-xs sm:text-sm text-blue-100 font-medium mt-1">
          Môn: KHOA HỌC TỰ NHIÊN LỚP {examMeta.grade || '9'} • Thời gian: {examMeta.timeLimit || '60 phút'}
        </p>
      </div>

      {/* Overflow Table Container */}
      <div className="overflow-x-auto rounded-xl border border-blue-600/70 shadow-lg bg-blue-950/80">
        <table className="w-full text-xs sm:text-sm border-collapse text-slate-100 select-text">
          <thead>
            {/* Header Level 1 */}
            <tr className="bg-blue-900 text-white font-bold text-center border-b border-blue-600">
              <th rowSpan={2} className="border border-blue-600/80 p-2 min-w-[150px] text-center">
                Nội dung
              </th>
              <th rowSpan={2} className="border border-blue-600/80 p-2 min-w-[90px] text-center">
                Mức độ
              </th>
              <th rowSpan={2} className="border border-blue-600/80 p-2 min-w-[260px] text-center">
                Yêu cầu cần đạt
              </th>
              <th colSpan={2} className="border border-blue-600/80 p-1.5 text-center bg-blue-800/80">
                Số câu hỏi
              </th>
              <th colSpan={2} className="border border-blue-600/80 p-1.5 text-center bg-blue-800/80">
                Câu hỏi
              </th>
            </tr>

            {/* Header Level 2 */}
            <tr className="bg-blue-900/90 text-white font-bold text-center border-b border-blue-600">
              <th className="border border-blue-600/80 p-1.5 min-w-[65px] text-center text-[11px] text-amber-200">
                TL (số ý)
              </th>
              <th className="border border-blue-600/80 p-1.5 min-w-[65px] text-center text-[11px] text-emerald-200">
                TN (số câu)
              </th>
              <th className="border border-blue-600/80 p-1.5 min-w-[90px] text-center text-[11px] text-amber-200">
                TL (số ý)
              </th>
              <th className="border border-blue-600/80 p-1.5 min-w-[110px] text-center text-[11px] text-emerald-200">
                TN (số câu)
              </th>
            </tr>
          </thead>

          <tbody>
            {groupedTopics.map((gt, gIdx) => {
              return (
                <React.Fragment key={gt.topic}>
                  {/* Topic Title Bar */}
                  <tr className="bg-blue-800/60 font-black text-amber-300 border-t-2 border-b border-blue-500">
                    <td colSpan={7} className="border border-blue-600/80 p-2.5 text-left text-xs uppercase tracking-wider">
                      {gt.topic}
                    </td>
                  </tr>

                  {/* Units inside Topic */}
                  {gt.units.map((unit, uIdx) => {
                    const levels = [
                      {
                        key: 'BIET',
                        label: 'Nhận biết',
                        bg: 'bg-emerald-950/20',
                        color: 'text-emerald-200',
                        tlQuestions: unit.cells.TU_LUAN.BIET,
                        tnQuestions: [
                          ...unit.cells.TN_NHIEU_LUA_CHON.BIET,
                          ...unit.cells.TN_DUNG_SAI.BIET,
                          ...unit.cells.TN_TRA_LOI_NGAN.BIET,
                        ],
                        outcomes: unit.outcomes.BIET,
                      },
                      {
                        key: 'HIEU',
                        label: 'Thông hiểu',
                        bg: 'bg-amber-950/20',
                        color: 'text-amber-200',
                        tlQuestions: unit.cells.TU_LUAN.HIEU,
                        tnQuestions: [
                          ...unit.cells.TN_NHIEU_LUA_CHON.HIEU,
                          ...unit.cells.TN_DUNG_SAI.HIEU,
                          ...unit.cells.TN_TRA_LOI_NGAN.HIEU,
                        ],
                        outcomes: unit.outcomes.HIEU,
                      },
                      {
                        key: 'VAN_DUNG',
                        label: 'Vận dụng',
                        bg: 'bg-cyan-950/20',
                        color: 'text-cyan-200',
                        tlQuestions: unit.cells.TU_LUAN.VAN_DUNG,
                        tnQuestions: [
                          ...unit.cells.TN_NHIEU_LUA_CHON.VAN_DUNG,
                          ...unit.cells.TN_DUNG_SAI.VAN_DUNG,
                          ...unit.cells.TN_TRA_LOI_NGAN.VAN_DUNG,
                        ],
                        outcomes: unit.outcomes.VAN_DUNG,
                      },
                      {
                        key: 'VAN_DUNG_CAO',
                        label: 'Vận dụng cao',
                        bg: 'bg-rose-950/20',
                        color: 'text-rose-200',
                        tlQuestions: unit.cells.TU_LUAN.VAN_DUNG_CAO || [],
                        tnQuestions: [
                          ...(unit.cells.TN_NHIEU_LUA_CHON.VAN_DUNG_CAO || []),
                          ...(unit.cells.TN_DUNG_SAI.VAN_DUNG_CAO || []),
                          ...(unit.cells.TN_TRA_LOI_NGAN.VAN_DUNG_CAO || []),
                        ],
                        outcomes: (unit.outcomes as any).VAN_DUNG_CAO || [],
                      },
                    ].filter((l) => l.tlQuestions.length > 0 || l.tnQuestions.length > 0 || l.outcomes.length > 0);

                    // If no explicit question or outcome, at least show Nhận biết & Thông hiểu
                    const activeLevels =
                      levels.length > 0
                        ? levels
                        : [
                            {
                              key: 'BIET',
                              label: 'Nhận biết',
                              bg: 'bg-emerald-950/20',
                              color: 'text-emerald-200',
                              tlQuestions: [],
                              tnQuestions: [],
                              outcomes: ['Trình bày được kiến thức cơ bản theo chuẩn chương trình KHTN.'],
                            },
                          ];

                    return (
                      <React.Fragment key={unit.id}>
                        {activeLevels.map((lvl, lIdx) => (
                          <tr
                            key={`${unit.id}-${lvl.key}`}
                            className={`${
                              uIdx % 2 === 0 ? 'bg-blue-900/20' : 'bg-blue-950/40'
                            } hover:bg-blue-800/30 transition-colors border-b border-blue-700/40`}
                          >
                            {/* Cột 1: Nội dung (Gộp hàng theo unit) */}
                            {lIdx === 0 && (
                              <td
                                rowSpan={activeLevels.length}
                                className="border border-blue-600/60 p-2.5 font-bold text-white text-left align-top bg-blue-950/60"
                              >
                                <div className="text-amber-200 font-extrabold text-xs sm:text-sm">
                                  {uIdx + 1}. {unit.subTopic}
                                </div>
                              </td>
                            )}

                            {/* Cột 2: Mức độ */}
                            <td className={`border border-blue-600/60 p-2 text-center font-bold text-xs ${lvl.color} ${lvl.bg} align-top`}>
                              {lvl.label}
                            </td>

                            {/* Cột 3: Yêu cầu cần đạt */}
                            <td className="border border-blue-600/60 p-2.5 text-left text-xs leading-relaxed text-blue-100 align-top">
                              {lvl.outcomes.length > 0 ? (
                                <ul className="space-y-1 list-disc list-inside">
                                  {lvl.outcomes.map((out: string, oIdx: number) => (
                                    <li key={oIdx} className="text-slate-200">
                                      {out}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <span className="italic text-blue-300">
                                  Chuẩn yêu cầu cần đạt GDPT 2018 môn KHTN.
                                </span>
                              )}
                            </td>

                            {/* Cột 4: Số câu hỏi TL (số ý) */}
                            <td className="border border-blue-600/60 p-1.5 text-center font-mono font-bold text-amber-300 text-xs align-middle">
                              {lvl.tlQuestions.length > 0 ? lvl.tlQuestions.length : '-'}
                            </td>

                            {/* Cột 5: Số câu hỏi TN (số câu) */}
                            <td className="border border-blue-600/60 p-1.5 text-center font-mono font-bold text-emerald-300 text-xs align-middle">
                              {lvl.tnQuestions.length > 0 ? lvl.tnQuestions.length : '-'}
                            </td>

                            {/* Cột 6: Câu hỏi TL (số ý) */}
                            <td className="border border-blue-600/60 p-1.5 text-center align-middle">
                              {formatQuestionsBadge(lvl.tlQuestions, 'TL') || '-'}
                            </td>

                            {/* Cột 7: Câu hỏi TN (số câu) */}
                            <td className="border border-blue-600/60 p-1.5 text-center align-middle">
                              {formatQuestionsBadge(lvl.tnQuestions, 'TN') || '-'}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              );
            })}

            {/* Chân bảng: Tổng cộng số câu hỏi */}
            <tr className="bg-blue-900 font-extrabold text-white border-t-2 border-blue-400">
              <td colSpan={3} className="border border-blue-600/80 p-2.5 text-left uppercase text-amber-300 text-xs sm:text-sm">
                Tổng cộng toàn bài kiểm tra
              </td>
              <td className="border border-blue-600/80 p-2 text-center font-mono text-amber-300 text-sm font-black bg-blue-950">
                {totalTL}
              </td>
              <td className="border border-blue-600/80 p-2 text-center font-mono text-emerald-300 text-sm font-black bg-blue-950">
                {totalTN}
              </td>
              <td className="border border-blue-600/80 p-2 text-center text-xs font-bold text-amber-200">
                {totalTL} câu TL ({totals.scoreTuLuan.toFixed(1).replace('.', ',')}đ)
              </td>
              <td className="border border-blue-600/80 p-2 text-center text-xs font-bold text-emerald-200">
                {totalTN} câu TNKQ ({totals.scoreNhieuLuaChon.toFixed(1).replace('.', ',')}đ)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Guide Note */}
      <div className="mt-4 p-3 bg-blue-950/70 rounded-xl border border-blue-800 text-xs text-blue-200 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white">Bảng đặc tả đề kiểm tra môn Khoa học tự nhiên</span> •
          <span>Khung chuẩn chuyên môn THCS Ngãi Tứ</span>
        </div>
        <div className="italic text-blue-300">
          Năm học 2025 - 2026
        </div>
      </div>
    </div>
  );
};
