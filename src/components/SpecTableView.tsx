import React, { useState, useEffect } from 'react';
import { GroupedTopic, MatrixTotals } from '../utils/matrixBuilder';
import { ExamMeta, QuestionItem, MATH_COMPETENCIES, getSubjectById } from '../types/matrix';
import { KHTNSpecTableView } from './KHTNSpecTableView';

interface SpecTableViewProps {
  groupedTopics: GroupedTopic[];
  totals: MatrixTotals;
  examMeta: ExamMeta;
  includeTraLoiNgan?: boolean;
  onSelectQuestion?: (q: QuestionItem) => void;
}

export const SpecTableView: React.FC<SpecTableViewProps> = ({
  groupedTopics,
  totals,
  examMeta,
  includeTraLoiNgan = false,
  onSelectQuestion,
}) => {
  let currentTT = 1;
  const subDef = getSubjectById(examMeta.subject);

  const isKHTN =
    examMeta.subject?.toLowerCase().includes('khoa học') ||
    examMeta.subject?.toLowerCase().includes('khtn');

  const [useKHTNTemplate, setUseKHTNTemplate] = useState<boolean>(Boolean(isKHTN));

  useEffect(() => {
    setUseKHTNTemplate(Boolean(isKHTN));
  }, [isKHTN]);

  if (isKHTN && useKHTNTemplate) {
    return (
      <div className="space-y-3">
        {/* Template Switcher Bar */}
        <div className="flex items-center justify-between bg-blue-950/70 p-2.5 rounded-xl border border-blue-700/60 text-xs">
          <div className="flex items-center gap-2 text-blue-200">
            <span className="font-bold text-amber-300">🔬 Bản đặc tả KHTN:</span>
            <span>Mẫu đặc tả phân chia TL (số ý) và TN (số câu) chuẩn THCS Ngãi Tứ</span>
          </div>
          <button
            type="button"
            onClick={() => setUseKHTNTemplate(false)}
            className="px-2.5 py-1 bg-blue-800 hover:bg-blue-700 text-blue-200 hover:text-white rounded-lg font-medium cursor-pointer transition-colors"
          >
            Xem mẫu CV 7991 chung
          </button>
        </div>
        <KHTNSpecTableView
          groupedTopics={groupedTopics}
          totals={totals}
          examMeta={examMeta}
          onSelectQuestion={onSelectQuestion}
        />
      </div>
    );
  }

  const totalAssessmentCols = includeTraLoiNgan ? 12 : 9;
  const tnColSpan = includeTraLoiNgan ? 9 : 6;

  const renderQuestionsInCell = (questions: QuestionItem[]) => {
    if (!questions || questions.length === 0) return null;

    return (
      <div className="flex flex-col gap-1 items-center justify-center py-1">
        {questions.map((q) => {
          const num = q.questionNumber.replace(/câu\s*/i, 'C').replace(/bài\s*/i, 'B');
          const compInfo = subDef.competencies[q.competency] || MATH_COMPETENCIES[q.competency] || {
            badgeBg: 'bg-blue-600/30 text-white',
            badgeBorder: 'border-blue-400/40',
            name: q.competency,
          };

          return (
            <button
              key={q.id}
              onClick={() => onSelectQuestion?.(q)}
              className={`text-[11px] leading-tight px-1.5 py-0.5 rounded border ${compInfo.badgeBg} ${compInfo.badgeBorder} font-semibold hover:scale-105 transition-all text-center cursor-pointer shadow-sm`}
              title={`${q.questionNumber}: ${compInfo.name}`}
            >
              <span>{num}</span>
              {!isKHTN && (
                <>
                  {' '}
                  <span className="font-bold underline decoration-dotted">({q.competency})</span>
                </>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-blue-900/60 backdrop-blur-md rounded-2xl border border-blue-700/50 p-4 sm:p-6 shadow-2xl space-y-4">
      {isKHTN && !useKHTNTemplate && (
        <div className="flex items-center justify-between bg-blue-950/70 p-2.5 rounded-xl border border-blue-700/60 text-xs">
          <span className="text-blue-200">Đang xem mẫu bảng đặc tả CV 7991 chung.</span>
          <button
            type="button"
            onClick={() => setUseKHTNTemplate(true)}
            className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 rounded-lg font-semibold cursor-pointer transition-colors"
          >
            Chuyển sang mẫu KHTN chuẩn
          </button>
        </div>
      )}

      {/* Official Header per CV 7991 */}
      <div className="text-center mb-6">
        <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-200">
          BỘ GIÁO DỤC VÀ ĐÀO TẠO
        </div>
        <div className="text-sm sm:text-base font-extrabold text-white mt-1">
          PHỤ LỤC
        </div>
        <div className="text-xs italic text-blue-200">
          (Kèm theo Công văn số 7991/BGDĐT-GDTrH ngày 17 /12/2024 của Bộ GDĐT)
        </div>
        <h2 className="text-base sm:text-xl font-black text-amber-300 mt-3 uppercase tracking-wide">
          2. BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KÌ
        </h2>
        <p className="text-xs sm:text-sm text-blue-100 font-medium mt-1">
          {examMeta.title} • Thời gian: {examMeta.timeLimit || '90 phút'}
        </p>
      </div>

      {/* Overflow Container */}
      <div className="overflow-x-auto rounded-xl border border-blue-600/70 shadow-lg bg-blue-950/80">
        <table className="w-full text-xs sm:text-sm border-collapse text-slate-100 select-text">
          <thead>
            {/* Header 1 */}
            <tr className="bg-blue-900 text-white font-bold text-center border-b border-blue-600">
              <th rowSpan={3} className="border border-blue-600/80 p-2 w-10 text-center">
                TT
              </th>
              <th rowSpan={3} className="border border-blue-600/80 p-2 min-w-[130px] text-center">
                Chủ đề/Chương
              </th>
              <th rowSpan={3} className="border border-blue-600/80 p-2 min-w-[150px] text-center">
                Nội dung/đơn vị kiến thức
              </th>
              <th rowSpan={3} className="border border-blue-600/80 p-2 min-w-[220px] text-center">
                Yêu cầu cần đạt
              </th>
              <th colSpan={totalAssessmentCols} className="border border-blue-600/80 p-2 text-center uppercase tracking-wide">
                Số câu hỏi ở các mức độ đánh giá
              </th>
            </tr>

            {/* Header 2 */}
            <tr className="bg-blue-900/90 text-white font-bold text-center border-b border-blue-600">
              <th colSpan={tnColSpan} className="border border-blue-600/80 p-1.5 text-center bg-blue-800/80">
                TNKQ
              </th>
              <th colSpan={3} className="border border-blue-600/80 p-1.5 text-center bg-blue-800/60">
                Tự luận
              </th>
            </tr>

            {/* Header 3 */}
            <tr className="bg-blue-900/80 text-white font-semibold text-center border-b border-blue-600">
              <th colSpan={3} className="border border-blue-600/80 p-1 text-center text-xs">
                Nhiều lựa chọn
              </th>
              <th colSpan={3} className="border border-blue-600/80 p-1 text-center text-xs">
                “Đúng – Sai”
              </th>
              {includeTraLoiNgan && (
                <th colSpan={3} className="border border-blue-600/80 p-1 text-center text-xs">
                  Trả lời ngắn
                </th>
              )}
              <th className="border border-blue-600/80 p-1 text-center text-xs min-w-[50px]">Biết</th>
              <th className="border border-blue-600/80 p-1 text-center text-xs min-w-[50px]">Hiểu</th>
              <th className="border border-blue-600/80 p-1 text-center text-xs min-w-[55px]">Vận dụng</th>
            </tr>

            {/* Header 4 */}
            <tr className="bg-blue-950 text-blue-200 font-medium text-center text-xs border-b-2 border-blue-500">
              <th className="border border-blue-600/80 p-1 text-center min-w-[50px]">Biết</th>
              <th className="border border-blue-600/80 p-1 text-center min-w-[50px]">Hiểu</th>
              <th className="border border-blue-600/80 p-1 text-center min-w-[55px]">Vận dụng</th>

              <th className="border border-blue-600/80 p-1 text-center min-w-[50px]">Biết</th>
              <th className="border border-blue-600/80 p-1 text-center min-w-[50px]">Hiểu</th>
              <th className="border border-blue-600/80 p-1 text-center min-w-[55px]">Vận dụng</th>

              {includeTraLoiNgan && (
                <>
                  <th className="border border-blue-600/80 p-1 text-center min-w-[50px]">Biết</th>
                  <th className="border border-blue-600/80 p-1 text-center min-w-[50px]">Hiểu</th>
                  <th className="border border-blue-600/80 p-1 text-center min-w-[55px]">Vận dụng</th>
                </>
              )}

              <th className="border border-blue-600/80 p-1 text-center min-w-[50px]">Biết</th>
              <th className="border border-blue-600/80 p-1 text-center min-w-[50px]">Hiểu</th>
              <th className="border border-blue-600/80 p-1 text-center min-w-[55px]">Vận dụng</th>
            </tr>
          </thead>

          <tbody>
            {groupedTopics.map((group) => {
              const topicTT = currentTT++;
              return group.units.map((unit, uIdx) => {
                const isFirst = uIdx === 0;
                return (
                  <tr
                    key={unit.id}
                    className="hover:bg-blue-900/40 transition-colors border-b border-blue-800/60"
                  >
                    {isFirst && (
                      <td
                        rowSpan={group.units.length}
                        className="border border-blue-700/70 p-2 text-center font-bold text-white bg-blue-900/30"
                      >
                        {topicTT}
                      </td>
                    )}
                    {isFirst && (
                      <td
                        rowSpan={group.units.length}
                        className="border border-blue-700/70 p-2.5 font-bold text-white bg-blue-900/30 text-left align-top"
                      >
                        {group.topic}
                      </td>
                    )}
                    <td className="border border-blue-700/70 p-2 text-left font-medium text-blue-100 align-top">
                      {unit.subTopic}
                    </td>

                    {/* Yêu cầu cần đạt formatted with Biết / Hiểu / Vận dụng */}
                    <td className="border border-blue-700/70 p-2 text-left align-top text-xs space-y-1.5 leading-relaxed">
                      {unit.outcomes.BIET.length > 0 && (
                        <div>
                          <span className="font-bold text-emerald-300">- Nhận biết:</span>
                          <ul className="list-disc list-inside pl-1 text-slate-200">
                            {unit.outcomes.BIET.map((o, idx) => (
                              <li key={idx}>{o}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {unit.outcomes.HIEU.length > 0 && (
                        <div>
                          <span className="font-bold text-amber-300">- Thông hiểu:</span>
                          <ul className="list-disc list-inside pl-1 text-slate-200">
                            {unit.outcomes.HIEU.map((o, idx) => (
                              <li key={idx}>{o}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {unit.outcomes.VAN_DUNG.length > 0 && (
                        <div>
                          <span className="font-bold text-rose-300">- Vận dụng:</span>
                          <ul className="list-disc list-inside pl-1 text-slate-200">
                            {unit.outcomes.VAN_DUNG.map((o, idx) => (
                              <li key={idx}>{o}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {unit.outcomes.BIET.length === 0 &&
                        unit.outcomes.HIEU.length === 0 &&
                        unit.outcomes.VAN_DUNG.length === 0 && (
                          <span className="italic text-slate-400">
                            - Thực hiện theo chuẩn KTKN chương trình môn Toán.
                          </span>
                        )}
                    </td>

                    {/* TNKQ Nhiều lựa chọn: Biết | Hiểu | Vận dụng */}
                    <td className="border border-blue-700/70 p-1 text-center align-middle">
                      {renderQuestionsInCell(unit.cells.TN_NHIEU_LUA_CHON.BIET)}
                    </td>
                    <td className="border border-blue-700/70 p-1 text-center align-middle">
                      {renderQuestionsInCell(unit.cells.TN_NHIEU_LUA_CHON.HIEU)}
                    </td>
                    <td className="border border-blue-700/70 p-1 text-center align-middle">
                      {renderQuestionsInCell(unit.cells.TN_NHIEU_LUA_CHON.VAN_DUNG)}
                    </td>

                    {/* TNKQ Đúng - Sai: Biết | Hiểu | Vận dụng */}
                    <td className="border border-blue-700/70 p-1 text-center align-middle">
                      {renderQuestionsInCell(unit.cells.TN_DUNG_SAI.BIET)}
                    </td>
                    <td className="border border-blue-700/70 p-1 text-center align-middle">
                      {renderQuestionsInCell(unit.cells.TN_DUNG_SAI.HIEU)}
                    </td>
                    <td className="border border-blue-700/70 p-1 text-center align-middle">
                      {renderQuestionsInCell(unit.cells.TN_DUNG_SAI.VAN_DUNG)}
                    </td>

                    {/* TNKQ Trả lời ngắn if included */}
                    {includeTraLoiNgan && (
                      <>
                        <td className="border border-blue-700/70 p-1 text-center align-middle">
                          {renderQuestionsInCell(unit.cells.TN_TRA_LOI_NGAN.BIET)}
                        </td>
                        <td className="border border-blue-700/70 p-1 text-center align-middle">
                          {renderQuestionsInCell(unit.cells.TN_TRA_LOI_NGAN.HIEU)}
                        </td>
                        <td className="border border-blue-700/70 p-1 text-center align-middle">
                          {renderQuestionsInCell(unit.cells.TN_TRA_LOI_NGAN.VAN_DUNG)}
                        </td>
                      </>
                    )}

                    {/* Tự luận: Biết | Hiểu | Vận dụng */}
                    <td className="border border-blue-700/70 p-1 text-center align-middle">
                      {renderQuestionsInCell(unit.cells.TU_LUAN.BIET)}
                    </td>
                    <td className="border border-blue-700/70 p-1 text-center align-middle">
                      {renderQuestionsInCell(unit.cells.TU_LUAN.HIEU)}
                    </td>
                    <td className="border border-blue-700/70 p-1 text-center align-middle">
                      {renderQuestionsInCell(unit.cells.TU_LUAN.VAN_DUNG)}
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>

          <tfoot>
            {/* Tổng số câu */}
            <tr className="bg-blue-900/90 font-bold text-white border-t-2 border-blue-500">
              <td colSpan={4} className="border border-blue-600/80 p-2 text-center uppercase">
                Tổng số câu
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center text-emerald-300">
                {totals.countNhieuLuaChon.BIET}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center text-amber-300">
                {totals.countNhieuLuaChon.HIEU}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center text-rose-300">
                {totals.countNhieuLuaChon.VAN_DUNG}
              </td>

              <td className="border border-blue-600/80 p-1.5 text-center text-emerald-300">
                {totals.countDungSai.BIET}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center text-amber-300">
                {totals.countDungSai.HIEU}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center text-rose-300">
                {totals.countDungSai.VAN_DUNG}
              </td>

              {includeTraLoiNgan && (
                <>
                  <td className="border border-blue-600/80 p-1.5 text-center text-emerald-300">
                    {totals.countTraLoiNgan.BIET}
                  </td>
                  <td className="border border-blue-600/80 p-1.5 text-center text-amber-300">
                    {totals.countTraLoiNgan.HIEU}
                  </td>
                  <td className="border border-blue-600/80 p-1.5 text-center text-rose-300">
                    {totals.countTraLoiNgan.VAN_DUNG}
                  </td>
                </>
              )}

              <td className="border border-blue-600/80 p-1.5 text-center text-emerald-300">
                {totals.countTuLuan.BIET}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center text-amber-300">
                {totals.countTuLuan.HIEU}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center text-rose-300">
                {totals.countTuLuan.VAN_DUNG}
              </td>
            </tr>

            {/* Tổng số điểm */}
            <tr className="bg-blue-900 font-bold text-white">
              <td colSpan={4} className="border border-blue-600/80 p-2 text-center uppercase">
                Tổng số điểm
              </td>
              <td colSpan={3} className="border border-blue-600/80 p-1.5 text-center text-blue-200">
                {totals.scoreNhieuLuaChon.toFixed(1).replace('.', ',')}
              </td>
              <td colSpan={3} className="border border-blue-600/80 p-1.5 text-center text-blue-200">
                {totals.scoreDungSai.toFixed(1).replace('.', ',')}
              </td>
              {includeTraLoiNgan && (
                <td colSpan={3} className="border border-blue-600/80 p-1.5 text-center text-blue-200">
                  {totals.scoreTraLoiNgan.toFixed(1).replace('.', ',')}
                </td>
              )}
              <td colSpan={3} className="border border-blue-600/80 p-1.5 text-center text-blue-200">
                {totals.scoreTuLuan.toFixed(1).replace('.', ',')}
              </td>
            </tr>

            {/* Tỉ lệ % */}
            <tr className="bg-blue-950 font-black text-amber-300 text-center">
              <td colSpan={4} className="border border-blue-600/80 p-2 uppercase text-white">
                Tỉ lệ %
              </td>
              <td colSpan={3} className="border border-blue-600/80 p-1.5">
                {totals.percentNhieuLuaChon}%
              </td>
              <td colSpan={3} className="border border-blue-600/80 p-1.5">
                {totals.percentDungSai}%
              </td>
              {includeTraLoiNgan && (
                <td colSpan={3} className="border border-blue-600/80 p-1.5">
                  {totals.percentTraLoiNgan}%
                </td>
              )}
              <td colSpan={3} className="border border-blue-600/80 p-1.5">
                {totals.percentTuLuan}%
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Competencies legend per user request: hidden for KHTN */}
      {!isKHTN && (
        <div className="mt-6 p-4 bg-blue-950/70 rounded-xl border border-blue-700/80">
          <h4 className="text-xs sm:text-sm font-bold text-amber-300 uppercase flex items-center gap-2 mb-2">
            <span>Ghi chú số 6 theo CV 7991: Ký hiệu các Năng lực chuyên môn môn {subDef.name} trong Bản đặc tả</span>
          </h4>
          <p className="text-xs text-blue-200 mb-3">
            Trong mỗi ô của bản đặc tả, câu hỏi được ghi kèm mã năng lực chuyên môn <code className="bg-blue-900 px-1 py-0.5 rounded text-amber-200 font-mono">(n) (NL?)</code> theo đúng hướng dẫn của Bộ GDĐT:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
            {Object.values(subDef.competencies).map((c) => (
              <div
                key={c.code}
                className={`p-2.5 rounded-lg border ${c.badgeBorder} ${c.badgeBg} flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between font-bold mb-1">
                  <span>{c.name}</span>
                  <span className="font-mono text-[13px] bg-blue-950/60 px-1.5 py-0.5 rounded border border-white/20">
                    {c.code}
                  </span>
                </div>
                <p className="text-[11px] opacity-90 leading-tight">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
