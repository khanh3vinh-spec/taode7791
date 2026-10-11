import React from 'react';
import { GroupedTopic, MatrixTotals, formatMatrixCell, getQuestionDirectScore } from '../utils/matrixBuilder';
import { ExamMeta, QuestionItem, getSubjectById } from '../types/matrix';

interface KHTNMatrixTableViewProps {
  groupedTopics: GroupedTopic[];
  totals: MatrixTotals;
  examMeta: ExamMeta;
  onSelectQuestion?: (q: QuestionItem) => void;
}

export const KHTNMatrixTableView: React.FC<KHTNMatrixTableViewProps> = ({
  groupedTopics,
  totals,
  examMeta,
  onSelectQuestion,
}) => {
  const subDef = getSubjectById(examMeta.subject);

  // Helper to extract TN questions and TL questions by level for a topic
  const getTopicQuestions = (gt: GroupedTopic) => {
    const res = {
      bietTL: [] as QuestionItem[],
      bietTN: [] as QuestionItem[],
      hieuTL: [] as QuestionItem[],
      hieuTN: [] as QuestionItem[],
      vdTL: [] as QuestionItem[],
      vdTN: [] as QuestionItem[],
      vdcTL: [] as QuestionItem[],
      vdcTN: [] as QuestionItem[],
    };

    for (const u of gt.units) {
      // TN
      res.bietTN.push(...u.cells.TN_NHIEU_LUA_CHON.BIET, ...u.cells.TN_DUNG_SAI.BIET, ...u.cells.TN_TRA_LOI_NGAN.BIET);
      res.hieuTN.push(...u.cells.TN_NHIEU_LUA_CHON.HIEU, ...u.cells.TN_DUNG_SAI.HIEU, ...u.cells.TN_TRA_LOI_NGAN.HIEU);
      res.vdTN.push(...u.cells.TN_NHIEU_LUA_CHON.VAN_DUNG, ...u.cells.TN_DUNG_SAI.VAN_DUNG, ...u.cells.TN_TRA_LOI_NGAN.VAN_DUNG);
      res.vdcTN.push(...u.cells.TN_NHIEU_LUA_CHON.VAN_DUNG_CAO, ...u.cells.TN_DUNG_SAI.VAN_DUNG_CAO, ...u.cells.TN_TRA_LOI_NGAN.VAN_DUNG_CAO);

      // TL
      res.bietTL.push(...u.cells.TU_LUAN.BIET);
      res.hieuTL.push(...u.cells.TU_LUAN.HIEU);
      res.vdTL.push(...u.cells.TU_LUAN.VAN_DUNG);
      res.vdcTL.push(...u.cells.TU_LUAN.VAN_DUNG_CAO);
    }

    return res;
  };

  const renderCellBadge = (questions: QuestionItem[], type: 'TL' | 'TN') => {
    if (!questions || questions.length === 0) return null;

    // Scores taken directly from questions:
    // For TL: sum of direct score from each essay question
    // For TN: each question 0.25đ or direct score
    const cellScore =
      type === 'TL'
        ? questions.reduce((sum, q) => sum + getQuestionDirectScore(q, 0), 0)
        : questions.reduce((sum, q) => sum + getQuestionDirectScore(q, 0.25), 0);

    const formattedScore =
      cellScore > 0 ? `${cellScore.toFixed(cellScore % 1 === 0 ? 1 : 2).replace('.', ',')}đ` : '';

    return (
      <div className="flex flex-col items-center justify-center gap-1 py-1">
        <div className="flex items-center gap-1">
          <span className="font-extrabold text-white text-xs bg-blue-900/80 px-1.5 py-0.5 rounded-full border border-blue-500/40">
            {questions.length}
          </span>
          {formattedScore && (
            <span
              className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                type === 'TL'
                  ? 'bg-amber-500/30 text-amber-200 border border-amber-400/50 shadow-sm'
                  : 'bg-emerald-500/25 text-emerald-200 border border-emerald-500/40'
              }`}
            >
              {formattedScore}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-1 justify-center max-w-[130px]">
          {questions.map((q) => {
            const shortNum = q.questionNumber.replace(/câu\s*/i, 'C').replace(/bài\s*/i, 'B');
            const qScore = getQuestionDirectScore(q, type === 'TL' ? 0 : 0.25);
            const qScoreText = qScore > 0 ? ` (${qScore.toString().replace('.', ',')}đ)` : '';
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => onSelectQuestion?.(q)}
                className={`text-[10px] px-1.5 py-0.5 rounded border ${
                  type === 'TL'
                    ? 'bg-amber-500/25 text-amber-200 border-amber-400/50 hover:bg-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40 hover:bg-emerald-500/30'
                } font-bold hover:scale-105 transition-all cursor-pointer shadow-sm`}
                title={`${q.questionNumber}${qScoreText}: ${q.contentSnippet || q.topic}`}
              >
                <span>{shortNum}</span>
                {type === 'TL' && qScore > 0 && (
                  <span className="ml-0.5 text-[9px] text-amber-300 font-extrabold">{qScoreText}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Grand totals of KHTN
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

  // Exact essay scores taken DIRECTLY from each essay question in the exam
  const scoreTlBiet = groupedTopics.reduce(
    (acc, gt) =>
      acc +
      gt.units.reduce(
        (uAcc, u) =>
          uAcc + u.cells.TU_LUAN.BIET.reduce((qAcc, q) => qAcc + getQuestionDirectScore(q, 0), 0),
        0
      ),
    0
  );
  const scoreTnBiet = totals.countNhieuLuaChon.BIET * 0.25;

  const scoreTlHieu = groupedTopics.reduce(
    (acc, gt) =>
      acc +
      gt.units.reduce(
        (uAcc, u) =>
          uAcc + u.cells.TU_LUAN.HIEU.reduce((qAcc, q) => qAcc + getQuestionDirectScore(q, 0), 0),
        0
      ),
    0
  );
  const scoreTnHieu = totals.countNhieuLuaChon.HIEU * 0.25;

  const scoreTlVanDung = groupedTopics.reduce(
    (acc, gt) =>
      acc +
      gt.units.reduce(
        (uAcc, u) =>
          uAcc + u.cells.TU_LUAN.VAN_DUNG.reduce((qAcc, q) => qAcc + getQuestionDirectScore(q, 0), 0),
        0
      ),
    0
  );
  const scoreTnVanDung = totals.countNhieuLuaChon.VAN_DUNG * 0.25;

  const scoreTlVanDungCao = groupedTopics.reduce(
    (acc, gt) =>
      acc +
      gt.units.reduce(
        (uAcc, u) =>
          uAcc +
          (u.cells.TU_LUAN.VAN_DUNG_CAO || []).reduce(
            (qAcc, q) => qAcc + getQuestionDirectScore(q, 0),
            0
          ),
        0
      ),
    0
  );
  const scoreTnVanDungCao = (totals.countNhieuLuaChon.VAN_DUNG_CAO || 0) * 0.25;

  // Total essay score equals direct sum of all essay questions
  const scoreTL = scoreTlBiet + scoreTlHieu + scoreTlVanDung + scoreTlVanDungCao;
  const scoreTN = scoreTnBiet + scoreTnHieu + scoreTnVanDung + scoreTnVanDungCao;
  const grandTotalScore = scoreTL + scoreTN || 10;

  return (
    <div className="bg-blue-900/60 backdrop-blur-md rounded-2xl border border-blue-700/50 p-4 sm:p-6 shadow-2xl">
      {/* Official Header per User's KHTN Document */}
      <div className="border-b border-blue-700/60 pb-5 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 text-xs sm:text-sm">
          <div className="text-left font-bold uppercase tracking-wide">
            <div className="text-white font-black text-sm sm:text-base">
              {examMeta.school || 'TRƯỜNG THCS NGÃI TỨ'}
            </div>
            <div className="text-amber-300 font-extrabold mt-0.5">
              TỔ KHTN – TIẾNG ANH
            </div>
          </div>
          <div className="text-center sm:text-right">
            <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wide">
              MA TRẬN ĐỀ KIỂM TRA GIỮA HKI NĂM HỌC 2025-2026
            </h2>
            <div className="text-xs sm:text-sm font-bold text-amber-300 mt-1">
              Môn: KHOA HỌC TỰ NHIÊN LỚP {examMeta.grade || '9'}
            </div>
            <div className="text-xs text-blue-200 italic mt-0.5">
              Thời gian: {examMeta.timeLimit || '60 phút'}
            </div>
          </div>
        </div>

        {/* Section I. PHẠM VI KIẾN THỨC (Exact from User Document) */}
        <div className="mt-4 p-3.5 bg-blue-950/70 rounded-xl border border-blue-800 text-xs text-blue-100 space-y-1.5">
          <div className="font-extrabold text-amber-300 uppercase tracking-wider text-[11px] sm:text-xs">
            I. PHẠM VI KIẾN THỨC:
          </div>
          <p className="leading-relaxed">
            • <strong>Nội dung kiến thức:</strong> Từ tuần 1 đến tuần 9 theo PPCT.
          </p>
          <p className="leading-relaxed">
            • <strong>Phương án kiểm tra:</strong> Kết hợp giữa trắc nghiệm và tự luận (tỉ lệ <strong>40% trắc nghiệm, 60% tự luận</strong>).
          </p>
          <div className="space-y-1 pl-1">
            <p>
              • <strong>Cấu trúc & Mức độ đề:</strong>{' '}
              <span className="text-white font-bold">
                40% Nhận biết; 30% Thông hiểu; 20% Vận dụng; 10% Vận dụng cao.
              </span>
            </p>
            <p>
              • <strong>Phần trắc nghiệm:</strong>{' '}
              <span className="text-emerald-300 font-bold">4,0 điểm</span> (gồm 16 câu hỏi: nhận biết: 12 câu, thông hiểu: 4 câu), mỗi câu 0,25 điểm.
            </p>
            <p>
              • <strong>Phần tự luận:</strong>{' '}
              <span className="text-amber-300 font-bold">{scoreTL.toFixed(1).replace('.', ',')} điểm</span> (Nhận biết: {scoreTlBiet.toFixed(1).replace('.', ',')} điểm; Thông hiểu: {scoreTlHieu.toFixed(1).replace('.', ',')} điểm; Vận dụng: {scoreTlVanDung.toFixed(1).replace('.', ',')} điểm; Vận dụng cao: {scoreTlVanDungCao.toFixed(1).replace('.', ',')} điểm - lấy trực tiếp từ điểm số từng câu của đề).
            </p>
          </div>
        </div>

        <div className="font-extrabold text-white uppercase text-sm mt-4 text-center sm:text-left flex items-center gap-2">
          <span className="bg-blue-600 text-amber-300 px-2.5 py-1 rounded-lg">II</span>
          <span>KHUNG MA TRẬN ĐỀ KIỂM TRA GIỮA KÌ I (MÔN KHTN)</span>
        </div>
      </div>

      {/* Overflow Table Container */}
      <div className="overflow-x-auto rounded-xl border border-blue-600/70 shadow-lg bg-blue-950/80">
        <table className="w-full text-xs sm:text-sm border-collapse text-slate-100 select-text">
          <thead>
            {/* Header Level 1 */}
            <tr className="bg-blue-900 text-white font-bold text-center border-b border-blue-600">
              <th rowSpan={2} className="border border-blue-600/80 p-2 min-w-[180px] text-center">
                Chủ đề
              </th>
              <th colSpan={8} className="border border-blue-600/80 p-2 text-center uppercase tracking-wider bg-blue-800/80">
                MỨC ĐỘ
              </th>
              <th colSpan={2} className="border border-blue-600/80 p-2 text-center bg-blue-800/60">
                Tổng số câu
              </th>
              <th rowSpan={2} className="border border-blue-600/80 p-2 min-w-[70px] text-center bg-blue-800/90">
                Điểm số
              </th>
            </tr>

            {/* Header Level 2: 4 Levels x 2 types (TL, TN) */}
            <tr className="bg-blue-900/90 text-white font-bold text-center border-b border-blue-600">
              {/* Nhận biết */}
              <th className="border border-blue-600/80 p-1.5 min-w-[55px] text-center text-[11px] bg-emerald-950/40 text-emerald-200">
                <div>Nhận biết</div>
                <div className="text-[10px] font-normal text-slate-200">Tự luận</div>
              </th>
              <th className="border border-blue-600/80 p-1.5 min-w-[65px] text-center text-[11px] bg-emerald-950/40 text-emerald-200">
                <div>Nhận biết</div>
                <div className="text-[10px] font-normal text-slate-200">Trắc nghiệm</div>
              </th>

              {/* Thông hiểu */}
              <th className="border border-blue-600/80 p-1.5 min-w-[55px] text-center text-[11px] bg-amber-950/40 text-amber-200">
                <div>Thông hiểu</div>
                <div className="text-[10px] font-normal text-slate-200">Tự luận</div>
              </th>
              <th className="border border-blue-600/80 p-1.5 min-w-[65px] text-center text-[11px] bg-amber-950/40 text-amber-200">
                <div>Thông hiểu</div>
                <div className="text-[10px] font-normal text-slate-200">Trắc nghiệm</div>
              </th>

              {/* Vận dụng */}
              <th className="border border-blue-600/80 p-1.5 min-w-[55px] text-center text-[11px] bg-cyan-950/40 text-cyan-200">
                <div>Vận dụng</div>
                <div className="text-[10px] font-normal text-slate-200">Tự luận</div>
              </th>
              <th className="border border-blue-600/80 p-1.5 min-w-[65px] text-center text-[11px] bg-cyan-950/40 text-cyan-200">
                <div>Vận dụng</div>
                <div className="text-[10px] font-normal text-slate-200">Trắc nghiệm</div>
              </th>

              {/* Vận dụng cao */}
              <th className="border border-blue-600/80 p-1.5 min-w-[55px] text-center text-[11px] bg-rose-950/40 text-rose-200">
                <div>Vận dụng cao</div>
                <div className="text-[10px] font-normal text-slate-200">Tự luận</div>
              </th>
              <th className="border border-blue-600/80 p-1.5 min-w-[65px] text-center text-[11px] bg-rose-950/40 text-rose-200">
                <div>Vận dụng cao</div>
                <div className="text-[10px] font-normal text-slate-200">Trắc nghiệm</div>
              </th>

              {/* Tổng số câu */}
              <th className="border border-blue-600/80 p-1.5 min-w-[55px] text-center text-[11px] bg-blue-800 text-amber-200">
                Tự luận
              </th>
              <th className="border border-blue-600/80 p-1.5 min-w-[65px] text-center text-[11px] bg-blue-800 text-emerald-200">
                Trắc nghiệm
              </th>
            </tr>

            {/* Header Level 3: Column Numbers 1 to 12 as per official PDF */}
            <tr className="bg-blue-950 text-blue-300 font-mono text-[11px] text-center border-b border-blue-600">
              <th className="border border-blue-600/80 p-1">1</th>
              <th className="border border-blue-600/80 p-1">2</th>
              <th className="border border-blue-600/80 p-1">3</th>
              <th className="border border-blue-600/80 p-1">4</th>
              <th className="border border-blue-600/80 p-1">5</th>
              <th className="border border-blue-600/80 p-1">6</th>
              <th className="border border-blue-600/80 p-1">7</th>
              <th className="border border-blue-600/80 p-1">8</th>
              <th className="border border-blue-600/80 p-1">9</th>
              <th className="border border-blue-600/80 p-1">10</th>
              <th className="border border-blue-600/80 p-1">11</th>
              <th className="border border-blue-600/80 p-1">12</th>
            </tr>
          </thead>

          <tbody>
            {groupedTopics.map((gt, gIdx) => {
              const qData = getTopicQuestions(gt);
              const topicTotalTL =
                qData.bietTL.length + qData.hieuTL.length + qData.vdTL.length + qData.vdcTL.length;
              const topicTotalTN =
                qData.bietTN.length + qData.hieuTN.length + qData.vdTN.length + qData.vdcTN.length;

              const topicScore = gt.units.reduce((acc, u) => acc + u.totalScore, 0);

              return (
                <tr
                  key={gt.topic}
                  className={`${
                    gIdx % 2 === 0 ? 'bg-blue-900/30' : 'bg-blue-950/50'
                  } hover:bg-blue-800/40 transition-colors border-b border-blue-700/40`}
                >
                  {/* Cột 1: Chủ đề */}
                  <td className="border border-blue-600/60 p-2 font-bold text-white text-left">
                    <div className="font-extrabold text-blue-100">{gt.topic}</div>
                    <div className="text-[11px] text-blue-300 font-normal mt-0.5">
                      ({gt.units.map((u) => u.subTopic).join(', ')})
                    </div>
                  </td>

                  {/* Cột 2: Nhận biết Tự luận */}
                  <td className="border border-blue-600/60 p-1 text-center bg-emerald-950/20">
                    {renderCellBadge(qData.bietTL, 'TL')}
                  </td>

                  {/* Cột 3: Nhận biết Trắc nghiệm */}
                  <td className="border border-blue-600/60 p-1 text-center bg-emerald-950/20">
                    {renderCellBadge(qData.bietTN, 'TN')}
                  </td>

                  {/* Cột 4: Thông hiểu Tự luận */}
                  <td className="border border-blue-600/60 p-1 text-center bg-amber-950/20">
                    {renderCellBadge(qData.hieuTL, 'TL')}
                  </td>

                  {/* Cột 5: Thông hiểu Trắc nghiệm */}
                  <td className="border border-blue-600/60 p-1 text-center bg-amber-950/20">
                    {renderCellBadge(qData.hieuTN, 'TN')}
                  </td>

                  {/* Cột 6: Vận dụng Tự luận */}
                  <td className="border border-blue-600/60 p-1 text-center bg-cyan-950/20">
                    {renderCellBadge(qData.vdTL, 'TL')}
                  </td>

                  {/* Cột 7: Vận dụng Trắc nghiệm */}
                  <td className="border border-blue-600/60 p-1 text-center bg-cyan-950/20">
                    {renderCellBadge(qData.vdTN, 'TN')}
                  </td>

                  {/* Cột 8: Vận dụng cao Tự luận */}
                  <td className="border border-blue-600/60 p-1 text-center bg-rose-950/20">
                    {renderCellBadge(qData.vdcTL, 'TL')}
                  </td>

                  {/* Cột 9: Vận dụng cao Trắc nghiệm */}
                  <td className="border border-blue-600/60 p-1 text-center bg-rose-950/20">
                    {renderCellBadge(qData.vdcTN, 'TN')}
                  </td>

                  {/* Cột 10: Tổng TL */}
                  <td className="border border-blue-600/60 p-1.5 text-center font-bold text-amber-300 font-mono">
                    {topicTotalTL > 0 ? topicTotalTL : '-'}
                  </td>

                  {/* Cột 11: Tổng TN */}
                  <td className="border border-blue-600/60 p-1.5 text-center font-bold text-emerald-300 font-mono">
                    {topicTotalTN > 0 ? topicTotalTN : '-'}
                  </td>

                  {/* Cột 12: Điểm số */}
                  <td className="border border-blue-600/60 p-1.5 text-center font-extrabold text-white font-mono bg-blue-900/40">
                    {topicScore.toFixed(1)}
                  </td>
                </tr>
              );
            })}

            {/* Bottom Row 1: Số câu TN / Số ý TL (Số YCCĐ) */}
            <tr className="bg-blue-900/90 font-bold border-t-2 border-blue-500 text-white">
              <td className="border border-blue-600/80 p-2 text-left text-xs uppercase tracking-wider font-extrabold text-amber-300">
                Số câu TN/ Số ý TL (Số YCCĐ)
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center font-mono text-xs">
                {totals.countTuLuan.BIET > 0 ? totals.countTuLuan.BIET : '-'}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center font-mono text-xs text-emerald-300">
                {totals.countNhieuLuaChon.BIET > 0 ? totals.countNhieuLuaChon.BIET : '-'}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center font-mono text-xs">
                {totals.countTuLuan.HIEU > 0 ? totals.countTuLuan.HIEU : '-'}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center font-mono text-xs text-emerald-300">
                {totals.countNhieuLuaChon.HIEU > 0 ? totals.countNhieuLuaChon.HIEU : '-'}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center font-mono text-xs">
                {totals.countTuLuan.VAN_DUNG > 0 ? totals.countTuLuan.VAN_DUNG : '-'}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center font-mono text-xs text-emerald-300">
                {totals.countNhieuLuaChon.VAN_DUNG > 0 ? totals.countNhieuLuaChon.VAN_DUNG : '-'}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center font-mono text-xs">
                {totals.countTuLuan.VAN_DUNG_CAO > 0 ? totals.countTuLuan.VAN_DUNG_CAO : '-'}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center font-mono text-xs text-emerald-300">
                {totals.countNhieuLuaChon.VAN_DUNG_CAO > 0 ? totals.countNhieuLuaChon.VAN_DUNG_CAO : '-'}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center font-mono text-amber-300 text-sm font-extrabold">
                {totalTL}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center font-mono text-emerald-300 text-sm font-extrabold">
                {totalTN}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center font-mono text-white text-sm font-extrabold bg-blue-800">
                {totalTL + totalTN} câu
              </td>
            </tr>

            {/* Bottom Row 2: Điểm số */}
            <tr className="bg-blue-900/80 font-bold text-white border-t border-blue-600">
              <td className="border border-blue-600/80 p-2 text-left text-xs uppercase font-extrabold">
                Điểm số
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center font-mono text-xs">
                {scoreTlBiet > 0 ? scoreTlBiet.toFixed(1).replace('.', ',') : '-'}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center font-mono text-xs text-emerald-300">
                {scoreTnBiet > 0 ? scoreTnBiet.toFixed(1).replace('.', ',') : '-'}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center font-mono text-xs">
                {scoreTlHieu > 0 ? scoreTlHieu.toFixed(1).replace('.', ',') : '-'}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center font-mono text-xs text-emerald-300">
                {scoreTnHieu > 0 ? scoreTnHieu.toFixed(1).replace('.', ',') : '-'}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center font-mono text-xs">
                {scoreTlVanDung > 0 ? scoreTlVanDung.toFixed(1).replace('.', ',') : '-'}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center font-mono text-xs text-emerald-300">
                {scoreTnVanDung > 0 ? scoreTnVanDung.toFixed(1).replace('.', ',') : '-'}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center font-mono text-xs">
                {scoreTlVanDungCao > 0 ? scoreTlVanDungCao.toFixed(1).replace('.', ',') : '-'}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center font-mono text-xs text-emerald-300">
                {scoreTnVanDungCao > 0 ? scoreTnVanDungCao.toFixed(1).replace('.', ',') : '-'}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center font-mono text-amber-300 text-sm font-extrabold">
                {scoreTL.toFixed(1).replace('.', ',')}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center font-mono text-emerald-300 text-sm font-extrabold">
                {scoreTN.toFixed(1).replace('.', ',')}
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center font-mono text-white text-sm font-extrabold bg-blue-800">
                {(scoreTL + scoreTN).toFixed(1).replace('.', ',')} điểm
              </td>
            </tr>

            {/* Bottom Row 3: Tổng số điểm theo mức độ nhận thức */}
            <tr className="bg-blue-950 font-extrabold text-white border-t-2 border-blue-400">
              <td className="border border-blue-600/80 p-2 text-left text-xs uppercase text-amber-300">
                Tổng số điểm
              </td>
              <td colSpan={2} className="border border-blue-600/80 p-1.5 text-center text-emerald-300 font-mono text-xs">
                {(scoreTlBiet + scoreTnBiet).toFixed(1).replace('.', ',')} điểm ({Math.round(((scoreTlBiet + scoreTnBiet) / ((scoreTL + scoreTN) || 10)) * 100)}%)
              </td>
              <td colSpan={2} className="border border-blue-600/80 p-1.5 text-center text-amber-300 font-mono text-xs">
                {(scoreTlHieu + scoreTnHieu).toFixed(1).replace('.', ',')} điểm ({Math.round(((scoreTlHieu + scoreTnHieu) / ((scoreTL + scoreTN) || 10)) * 100)}%)
              </td>
              <td colSpan={2} className="border border-blue-600/80 p-1.5 text-center text-cyan-300 font-mono text-xs">
                {(scoreTlVanDung + scoreTnVanDung).toFixed(1).replace('.', ',')} điểm ({Math.round(((scoreTlVanDung + scoreTnVanDung) / ((scoreTL + scoreTN) || 10)) * 100)}%)
              </td>
              <td colSpan={2} className="border border-blue-600/80 p-1.5 text-center text-rose-300 font-mono text-xs">
                {(scoreTlVanDungCao + scoreTnVanDungCao).toFixed(1).replace('.', ',')} điểm ({Math.round(((scoreTlVanDungCao + scoreTnVanDungCao) / ((scoreTL + scoreTN) || 10)) * 100)}%)
              </td>
              <td colSpan={2} className="border border-blue-600/80 p-1.5 text-center text-amber-200 font-mono text-sm bg-blue-900">
                {scoreTL.toFixed(1).replace('.', ',')}đ TL - {scoreTN.toFixed(1).replace('.', ',')}đ TN
              </td>
              <td className="border border-blue-600/80 p-1.5 text-center text-amber-300 font-mono text-sm bg-blue-900">
                {(scoreTL + scoreTN).toFixed(0)} điểm (100%)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Note / Guidance below table */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-200 gap-2 border-t border-blue-800/80 pt-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>Trắc nghiệm (16 câu = 4.0 điểm)</span>
          <span className="mx-2">•</span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span>Tự luận (4 câu / 6 ý = 6.0 điểm)</span>
        </div>
        <div className="italic text-blue-300 text-[11px]">
          Chuẩn ma trận đề kiểm tra KHTN - Trường THCS Ngãi Tứ (Năm học 2025-2026)
        </div>
      </div>
    </div>
  );
};
