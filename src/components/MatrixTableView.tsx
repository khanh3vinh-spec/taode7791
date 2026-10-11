import React, { useState, useEffect } from 'react';
import { GroupedTopic, MatrixTotals, formatMatrixCell } from '../utils/matrixBuilder';
import { ExamMeta, QuestionItem } from '../types/matrix';
import { KHTNMatrixTableView } from './KHTNMatrixTableView';

interface MatrixTableViewProps {
  groupedTopics: GroupedTopic[];
  totals: MatrixTotals;
  examMeta: ExamMeta;
  includeTraLoiNgan?: boolean;
  onSelectQuestion?: (q: QuestionItem) => void;
}

export const MatrixTableView: React.FC<MatrixTableViewProps> = ({
  groupedTopics,
  totals,
  examMeta,
  includeTraLoiNgan = false,
  onSelectQuestion,
}) => {
  let currentTT = 1;

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
            <span className="font-bold text-amber-300">🔬 Khung ma trận KHTN:</span>
            <span>Mẫu 12 cột chuẩn trường THCS Ngãi Tứ (40% TN - 60% TL)</span>
          </div>
          <button
            type="button"
            onClick={() => setUseKHTNTemplate(false)}
            className="px-2.5 py-1 bg-blue-800 hover:bg-blue-700 text-blue-200 hover:text-white rounded-lg font-medium cursor-pointer transition-colors"
          >
            Xem mẫu CV 7991 chung
          </button>
        </div>
        <KHTNMatrixTableView
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

  return (
    <div className="bg-blue-900/60 backdrop-blur-md rounded-2xl border border-blue-700/50 p-4 sm:p-6 shadow-2xl space-y-4">
      {isKHTN && !useKHTNTemplate && (
        <div className="flex items-center justify-between bg-blue-950/70 p-2.5 rounded-xl border border-blue-700/60 text-xs">
          <span className="text-blue-200">Đang xem mẫu khung CV 7991 chung.</span>
          <button
            type="button"
            onClick={() => setUseKHTNTemplate(true)}
            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold cursor-pointer transition-colors shadow-sm"
          >
            🔬 Chuyển sang mẫu Ma trận KHTN 12 cột (THCS Ngãi Tứ)
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
          1. MA TRẬN ĐỀ KIỂM TRA ĐỊNH KÌ
        </h2>
        <p className="text-xs sm:text-sm text-blue-100 font-medium mt-1">
          {examMeta.title} • Thời gian: {examMeta.timeLimit || '90 phút'}
        </p>
      </div>

      {/* Overflow Table Container */}
      <div className="overflow-x-auto rounded-xl border border-blue-600/70 shadow-lg bg-blue-950/80">
        <table className="w-full text-xs sm:text-sm border-collapse text-slate-100 select-text">
          <thead>
            {/* Header Level 1 */}
            <tr className="bg-blue-900 text-white font-bold text-center border-b border-blue-600">
              <th rowSpan={3} className="border border-blue-600/80 p-2 w-10 text-center">
                TT
              </th>
              <th rowSpan={3} className="border border-blue-600/80 p-2 min-w-[140px] text-center">
                Chủ đề/Chương
              </th>
              <th rowSpan={3} className="border border-blue-600/80 p-2 min-w-[160px] text-center">
                Nội dung/đơn vị kiến thức
              </th>
              <th colSpan={totalAssessmentCols} className="border border-blue-600/80 p-2 text-center uppercase tracking-wide">
                Mức độ đánh giá
              </th>
              <th colSpan={3} className="border border-blue-600/80 p-2 text-center">
                Tổng
              </th>
              <th rowSpan={3} className="border border-blue-600/80 p-2 min-w-[65px] text-center">
                Tỉ lệ % điểm
              </th>
            </tr>

            {/* Header Level 2 */}
            <tr className="bg-blue-900/90 text-white font-bold text-center border-b border-blue-600">
              <th colSpan={tnColSpan} className="border border-blue-600/80 p-1.5 text-center bg-blue-800/80">
                TNKQ
              </th>
              <th colSpan={3} className="border border-blue-600/80 p-1.5 text-center bg-blue-800/60">
                Tự luận
              </th>
              <th rowSpan={2} className="border border-blue-600/80 p-1.5 min-w-[40px] text-center">
                Biết
              </th>
              <th rowSpan={2} className="border border-blue-600/80 p-1.5 min-w-[40px] text-center">
                Hiểu
              </th>
              <th rowSpan={2} className="border border-blue-600/80 p-1.5 min-w-[45px] text-center">
                Vận dụng
              </th>
            </tr>

            {/* Header Level 3 */}
            <tr className="bg-blue-900/80 text-white font-semibold text-center border-b border-blue-600">
              <th colSpan={3} className="border border-blue-600/80 p-1 text-center text-xs">
                Nhiều lựa chọn
              </th>
              <th colSpan={3} className="border border-blue-600/80 p-1 text-center text-xs">
                “Đúng – Sai”<sup className="text-amber-300">2</sup>
              </th>
              {includeTraLoiNgan && (
                <th colSpan={3} className="border border-blue-600/80 p-1 text-center text-xs">
                  Trả lời ngắn<sup className="text-amber-300">3</sup>
                </th>
              )}
              <th className="border border-blue-600/80 p-1 text-center text-xs min-w-[36px]">Biết</th>
              <th className="border border-blue-600/80 p-1 text-center text-xs min-w-[36px]">Hiểu</th>
              <th className="border border-blue-600/80 p-1 text-center text-xs min-w-[36px]">Vận dụng</th>
            </tr>

            {/* Header Level 4 (Biết, Hiểu, Vận dụng for each part) */}
            <tr className="bg-blue-950 text-blue-200 font-medium text-center text-xs border-b-2 border-blue-500">
              {/* Nhiều lựa chọn */}
              <th className="border border-blue-600/80 p-1 text-center">Biết</th>
              <th className="border border-blue-600/80 p-1 text-center">Hiểu</th>
              <th className="border border-blue-600/80 p-1 text-center">Vận dụng</th>

              {/* Đúng - Sai */}
              <th className="border border-blue-600/80 p-1 text-center">Biết</th>
              <th className="border border-blue-600/80 p-1 text-center">Hiểu</th>
              <th className="border border-blue-600/80 p-1 text-center">Vận dụng</th>

              {/* Trả lời ngắn if included */}
              {includeTraLoiNgan && (
                <>
                  <th className="border border-blue-600/80 p-1 text-center">Biết</th>
                  <th className="border border-blue-600/80 p-1 text-center">Hiểu</th>
                  <th className="border border-blue-600/80 p-1 text-center">Vận dụng</th>
                </>
              )}

              {/* Tự luận */}
              <th className="border border-blue-600/80 p-1 text-center">Biết</th>
              <th className="border border-blue-600/80 p-1 text-center">Hiểu</th>
              <th className="border border-blue-600/80 p-1 text-center">Vận dụng</th>

              <th className="border border-blue-600/80 p-1 text-center"></th>
              <th className="border border-blue-600/80 p-1 text-center"></th>
              <th className="border border-blue-600/80 p-1 text-center"></th>
              <th className="border border-blue-600/80 p-1 text-center"></th>
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
                        className="border border-blue-700/70 p-2.5 font-bold text-white bg-blue-900/30 text-left align-middle"
                      >
                        {group.topic}
                      </td>
                    )}
                    <td className="border border-blue-700/70 p-2 text-left font-medium text-blue-100">
                      {unit.subTopic}
                    </td>

                    {/* TNKQ Nhiều lựa chọn */}
                    <td className="border border-blue-700/70 p-1.5 text-center font-semibold text-emerald-300">
                      {formatMatrixCell(unit.cells.TN_NHIEU_LUA_CHON.BIET)}
                    </td>
                    <td className="border border-blue-700/70 p-1.5 text-center font-semibold text-amber-300">
                      {formatMatrixCell(unit.cells.TN_NHIEU_LUA_CHON.HIEU)}
                    </td>
                    <td className="border border-blue-700/70 p-1.5 text-center font-semibold text-rose-300">
                      {formatMatrixCell(unit.cells.TN_NHIEU_LUA_CHON.VAN_DUNG)}
                    </td>

                    {/* TNKQ Đúng - Sai */}
                    <td className="border border-blue-700/70 p-1.5 text-center font-semibold text-emerald-300">
                      {formatMatrixCell(unit.cells.TN_DUNG_SAI.BIET)}
                    </td>
                    <td className="border border-blue-700/70 p-1.5 text-center font-semibold text-amber-300">
                      {formatMatrixCell(unit.cells.TN_DUNG_SAI.HIEU)}
                    </td>
                    <td className="border border-blue-700/70 p-1.5 text-center font-semibold text-rose-300">
                      {formatMatrixCell(unit.cells.TN_DUNG_SAI.VAN_DUNG)}
                    </td>

                    {/* TNKQ Trả lời ngắn if included */}
                    {includeTraLoiNgan && (
                      <>
                        <td className="border border-blue-700/70 p-1.5 text-center font-semibold text-emerald-300">
                          {formatMatrixCell(unit.cells.TN_TRA_LOI_NGAN.BIET)}
                        </td>
                        <td className="border border-blue-700/70 p-1.5 text-center font-semibold text-amber-300">
                          {formatMatrixCell(unit.cells.TN_TRA_LOI_NGAN.HIEU)}
                        </td>
                        <td className="border border-blue-700/70 p-1.5 text-center font-semibold text-rose-300">
                          {formatMatrixCell(unit.cells.TN_TRA_LOI_NGAN.VAN_DUNG)}
                        </td>
                      </>
                    )}

                    {/* Tự luận */}
                    <td className="border border-blue-700/70 p-1.5 text-center font-semibold text-emerald-300">
                      {formatMatrixCell(unit.cells.TU_LUAN.BIET)}
                    </td>
                    <td className="border border-blue-700/70 p-1.5 text-center font-semibold text-amber-300">
                      {formatMatrixCell(unit.cells.TU_LUAN.HIEU)}
                    </td>
                    <td className="border border-blue-700/70 p-1.5 text-center font-semibold text-rose-300">
                      {formatMatrixCell(unit.cells.TU_LUAN.VAN_DUNG)}
                    </td>

                    {/* Tổng Biết, Hiểu, Vận dụng */}
                    <td className="border border-blue-700/70 p-1.5 text-center font-bold text-emerald-200 bg-blue-900/20">
                      {unit.totalBiet > 0 ? unit.totalBiet : ''}
                    </td>
                    <td className="border border-blue-700/70 p-1.5 text-center font-bold text-amber-200 bg-blue-900/20">
                      {unit.totalHieu > 0 ? unit.totalHieu : ''}
                    </td>
                    <td className="border border-blue-700/70 p-1.5 text-center font-bold text-rose-200 bg-blue-900/20">
                      {unit.totalVanDung > 0 ? unit.totalVanDung : ''}
                    </td>

                    {/* Tỉ lệ % điểm */}
                    <td className="border border-blue-700/70 p-1.5 text-center font-bold text-white bg-blue-900/30">
                      {unit.scorePercentage}%
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>

          <tfoot>
            {/* Row 1: Tổng số câu */}
            <tr className="bg-blue-900/90 font-bold text-white border-t-2 border-blue-500">
              <td colSpan={3} className="border border-blue-600/80 p-2 text-center uppercase">
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

              <td className="border border-blue-600/80 p-1.5 text-center text-emerald-300 bg-blue-950">
                {totals.totalBiet}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center text-amber-300 bg-blue-950">
                {totals.totalHieu}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center text-rose-300 bg-blue-950">
                {totals.totalVanDung}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center text-white bg-blue-950">
                {totals.totalQuestions}
              </td>
            </tr>

            {/* Row 2: Tổng số điểm */}
            <tr className="bg-blue-900 font-bold text-white">
              <td colSpan={3} className="border border-blue-600/80 p-2 text-center uppercase">
                Tổng số điểm
              </td>
              <td colSpan={3} className="border border-blue-600/80 p-1.5 text-center text-blue-200">
                {totals.scoreNhieuLuaChon.toFixed(1).replace('.', ',')}
                <sup className="text-amber-300">5</sup>
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
              <td className="border border-blue-600/80 p-1.5 text-center text-emerald-300 bg-blue-950">
                {totals.scoreBiet.toFixed(1).replace('.', ',')}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center text-amber-300 bg-blue-950">
                {totals.scoreHieu.toFixed(1).replace('.', ',')}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center text-rose-300 bg-blue-950">
                {totals.scoreVanDung.toFixed(1).replace('.', ',')}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center text-amber-400 bg-blue-950 font-black">
                {totals.totalScore.toFixed(1).replace('.', ',')}
              </td>
            </tr>

            {/* Row 3: Tỉ lệ % */}
            <tr className="bg-blue-950 font-black text-amber-300 text-center">
              <td colSpan={3} className="border border-blue-600/80 p-2 uppercase text-white">
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
              <td className="border border-blue-600/80 p-1.5 text-emerald-300">
                {totals.percentBiet}%
              </td>
              <td className="border border-blue-600/80 p-1.5 text-amber-300">
                {totals.percentHieu}%
              </td>
              <td className="border border-blue-600/80 p-1.5 text-rose-300">
                {totals.percentVanDung}%
              </td>
              <td className="border border-blue-600/80 p-1.5 text-white">100%</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Official Footnotes from CV 7991 */}
      <div className="mt-4 p-3.5 bg-blue-950/60 rounded-xl border border-blue-800/80 text-xs text-blue-200 space-y-1">
        <p>
          <sup className="text-amber-300 font-bold">2</sup> Mỗi câu hỏi bao gồm 4 ý nhỏ, mỗi ý học sinh phải chọn đúng hoặc sai. Một số tài liệu xếp loại câu hỏi này vào loại Nhiều lựa chọn phức hợp hoặc Nhiều lựa chọn có nhiều phương án đúng.
        </p>
        <p>
          <sup className="text-amber-300 font-bold">3</sup> Theo Công văn 7991: Đối với môn học không sử dụng dạng câu hỏi trả lời ngắn thì toàn bộ số điểm được chuyển cho dạng khác (hoặc tự luận).
        </p>
        <p>
          <sup className="text-amber-300 font-bold">4</sup> Có ở trong một số ô của ma trận, thể hiện số câu hỏi hoặc câu hỏi số bao nhiêu (ví dụ C1, C2).
        </p>
        <p>
          <sup className="text-amber-300 font-bold">5</sup> Phân bổ điểm môn Toán: TN Nhiều lựa chọn 2,0 điểm (20%), TN Đúng – Sai 1,0 điểm (10%), Tự luận 7,0 điểm (70%) - Tổng 10,0 điểm (100%).
        </p>
      </div>
    </div>
  );
};
