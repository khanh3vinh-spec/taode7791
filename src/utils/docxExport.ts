import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  WidthType,
  AlignmentType,
  PageOrientation,
  ShadingType,
  BorderStyle,
} from 'docx';
import {
  QuestionItem,
  ExamMeta,
  ScoreConfig,
  MATH_COMPETENCIES,
  getSubjectById,
} from '../types/matrix';
import {
  buildMatrixAndSpecs,
  formatMatrixCell,
  formatSpecCell,
  getQuestionDirectScore,
} from './matrixBuilder';

const BORDER_STYLE = {
  style: BorderStyle.SINGLE,
  size: 1,
  color: '000000',
};

const TABLE_BORDERS = {
  top: BORDER_STYLE,
  bottom: BORDER_STYLE,
  left: BORDER_STYLE,
  right: BORDER_STYLE,
  insideHorizontal: BORDER_STYLE,
  insideVertical: BORDER_STYLE,
};

function createCell(
  text: string,
  options: {
    isBold?: boolean;
    align?: (typeof AlignmentType)[keyof typeof AlignmentType];
    widthPercent?: number;
    colSpan?: number;
    rowSpan?: number;
    shadingColor?: string;
    fontSize?: number;
  } = {}
) {
  const {
    isBold = false,
    align = AlignmentType.CENTER,
    widthPercent,
    colSpan,
    rowSpan,
    shadingColor,
    fontSize = 20, // 10pt (in half-points)
  } = options;

  const lines = text.split('\n');
  const paragraphs = lines.map(
    (line) =>
      new Paragraph({
        alignment: align,
        spacing: { before: 40, after: 40, line: 220 },
        children: [
          new TextRun({
            text: line,
            bold: isBold,
            font: 'Times New Roman',
            size: fontSize,
          }),
        ],
      })
  );

  return new TableCell({
    children: paragraphs,
    columnSpan: colSpan,
    rowSpan: rowSpan,
    width: widthPercent ? { size: widthPercent, type: WidthType.PERCENTAGE } : undefined,
    shading: shadingColor
      ? { fill: shadingColor, type: ShadingType.CLEAR }
      : undefined,
  });
}

const formatLevelText = (level: string) => {
  if (level === 'BIET') return 'Nhận biết';
  if (level === 'HIEU') return 'Thông hiểu';
  if (level === 'VAN_DUNG') return 'Vận dụng';
  if (level === 'VAN_DUNG_CAO') return 'Vận dụng cao';
  return level;
};

// ========================================================
// Dedicated DOCX Exporter for KHTN (Khung 12 cột & Bảng đặc tả chuẩn THCS Ngãi Tứ)
// ========================================================
async function exportKHTNDocx(
  examMeta: ExamMeta,
  questions: QuestionItem[],
  scoreConfig: ScoreConfig
): Promise<Blob> {
  const { groupedTopics, totals } = buildMatrixAndSpecs(questions, scoreConfig);
  const subDef = getSubjectById('khtn');

  const formatKHTNMatrixCell = (qs: QuestionItem[], isTL = false) => {
    if (!qs || qs.length === 0) return '';
    const nums = qs.map((q) => {
      const num = q.questionNumber.replace(/câu\s*/i, 'C').replace(/bài\s*/i, 'B');
      const score = getQuestionDirectScore(q, isTL ? 0 : 0.25);
      if (isTL && score > 0) {
        return `${num} (${score.toString().replace('.', ',')}đ)`;
      }
      return num;
    });
    return `${qs.length}\n(${nums.join(', ')})`;
  };

  const formatKHTNSpecCell = (qs: QuestionItem[]) => {
    if (!qs || qs.length === 0) return '';
    return qs
      .map((q) => {
        const num = q.questionNumber.replace(/câu\s*/i, 'C').replace(/bài\s*/i, 'B');
        return num;
      })
      .join(', ');
  };

  // 1. Matrix Table 12 columns
  const matrixRows: TableRow[] = [];

  // Header Row 1
  matrixRows.push(
    new TableRow({
      tableHeader: true,
      children: [
        createCell('Chủ đề', { isBold: true, rowSpan: 2, widthPercent: 22 }),
        createCell('MỨC ĐỘ', { isBold: true, colSpan: 8, widthPercent: 54 }),
        createCell('Tổng số câu', { isBold: true, colSpan: 2, widthPercent: 14 }),
        createCell('Điểm số', { isBold: true, rowSpan: 2, widthPercent: 10 }),
      ],
    })
  );

  // Header Row 2
  matrixRows.push(
    new TableRow({
      tableHeader: true,
      children: [
        createCell('Nhận biết\n(TL)', { isBold: true, fontSize: 18 }),
        createCell('Nhận biết\n(TN)', { isBold: true, fontSize: 18 }),
        createCell('Thông hiểu\n(TL)', { isBold: true, fontSize: 18 }),
        createCell('Thông hiểu\n(TN)', { isBold: true, fontSize: 18 }),
        createCell('Vận dụng\n(TL)', { isBold: true, fontSize: 18 }),
        createCell('Vận dụng\n(TN)', { isBold: true, fontSize: 18 }),
        createCell('Vận dụng cao\n(TL)', { isBold: true, fontSize: 18 }),
        createCell('Vận dụng cao\n(TN)', { isBold: true, fontSize: 18 }),
        createCell('Tự luận', { isBold: true, fontSize: 18 }),
        createCell('Trắc nghiệm', { isBold: true, fontSize: 18 }),
      ],
    })
  );

  // Header Row 3 (Column numbers 1 to 12)
  matrixRows.push(
    new TableRow({
      tableHeader: true,
      children: [
        createCell('1', { isBold: true }),
        createCell('2', { isBold: true }),
        createCell('3', { isBold: true }),
        createCell('4', { isBold: true }),
        createCell('5', { isBold: true }),
        createCell('6', { isBold: true }),
        createCell('7', { isBold: true }),
        createCell('8', { isBold: true }),
        createCell('9', { isBold: true }),
        createCell('10', { isBold: true }),
        createCell('11', { isBold: true }),
        createCell('12', { isBold: true }),
      ],
    })
  );

  // Calculate dynamic essay scores directly from each essay question
  const scoreTlBiet = questions
    .filter((q) => q.partType === 'TU_LUAN' && q.level === 'BIET')
    .reduce((sum, q) => sum + getQuestionDirectScore(q, 0), 0);
  const scoreTnBiet = totals.countNhieuLuaChon.BIET * 0.25;

  const scoreTlHieu = questions
    .filter((q) => q.partType === 'TU_LUAN' && q.level === 'HIEU')
    .reduce((sum, q) => sum + getQuestionDirectScore(q, 0), 0);
  const scoreTnHieu = totals.countNhieuLuaChon.HIEU * 0.25;

  const scoreTlVanDung = questions
    .filter((q) => q.partType === 'TU_LUAN' && q.level === 'VAN_DUNG')
    .reduce((sum, q) => sum + getQuestionDirectScore(q, 0), 0);
  const scoreTnVanDung = totals.countNhieuLuaChon.VAN_DUNG * 0.25;

  const scoreTlVanDungCao = questions
    .filter((q) => q.partType === 'TU_LUAN' && q.level === 'VAN_DUNG_CAO')
    .reduce((sum, q) => sum + getQuestionDirectScore(q, 0), 0);
  const scoreTnVanDungCao = (totals.countNhieuLuaChon.VAN_DUNG_CAO || 0) * 0.25;

  const scoreTL = scoreTlBiet + scoreTlHieu + scoreTlVanDung + scoreTlVanDungCao;
  const scoreTN = scoreTnBiet + scoreTnHieu + scoreTnVanDung + scoreTnVanDungCao;
  const grandTotalDocx = scoreTL + scoreTN || 10;

  // Data rows
  groupedTopics.forEach((gt) => {
    let bietTL: QuestionItem[] = [];
    let bietTN: QuestionItem[] = [];
    let hieuTL: QuestionItem[] = [];
    let hieuTN: QuestionItem[] = [];
    let vdTL: QuestionItem[] = [];
    let vdTN: QuestionItem[] = [];
    let vdcTL: QuestionItem[] = [];
    let vdcTN: QuestionItem[] = [];
    let topicScore = 0;

    gt.units.forEach((u) => {
      bietTL.push(...u.cells.TU_LUAN.BIET);
      hieuTL.push(...u.cells.TU_LUAN.HIEU);
      vdTL.push(...u.cells.TU_LUAN.VAN_DUNG);
      vdcTL.push(...(u.cells.TU_LUAN.VAN_DUNG_CAO || []));

      bietTN.push(
        ...u.cells.TN_NHIEU_LUA_CHON.BIET,
        ...u.cells.TN_DUNG_SAI.BIET,
        ...u.cells.TN_TRA_LOI_NGAN.BIET
      );
      hieuTN.push(
        ...u.cells.TN_NHIEU_LUA_CHON.HIEU,
        ...u.cells.TN_DUNG_SAI.HIEU,
        ...u.cells.TN_TRA_LOI_NGAN.HIEU
      );
      vdTN.push(
        ...u.cells.TN_NHIEU_LUA_CHON.VAN_DUNG,
        ...u.cells.TN_DUNG_SAI.VAN_DUNG,
        ...u.cells.TN_TRA_LOI_NGAN.VAN_DUNG
      );
      vdcTN.push(
        ...(u.cells.TN_NHIEU_LUA_CHON.VAN_DUNG_CAO || []),
        ...(u.cells.TN_DUNG_SAI.VAN_DUNG_CAO || []),
        ...(u.cells.TN_TRA_LOI_NGAN.VAN_DUNG_CAO || [])
      );

      const uScore =
        u.cells.TU_LUAN.BIET.reduce((acc, q) => acc + getQuestionDirectScore(q, 0), 0) +
        u.cells.TU_LUAN.HIEU.reduce((acc, q) => acc + getQuestionDirectScore(q, 0), 0) +
        u.cells.TU_LUAN.VAN_DUNG.reduce((acc, q) => acc + getQuestionDirectScore(q, 0), 0) +
        (u.cells.TU_LUAN.VAN_DUNG_CAO || []).reduce((acc, q) => acc + getQuestionDirectScore(q, 0), 0) +
        (u.cells.TN_NHIEU_LUA_CHON.BIET.length + u.cells.TN_NHIEU_LUA_CHON.HIEU.length) * 0.25;
      topicScore += uScore;
    });

    const totalTopicTL = bietTL.length + hieuTL.length + vdTL.length + vdcTL.length;
    const totalTopicTN = bietTN.length + hieuTN.length + vdTN.length + vdcTN.length;

    matrixRows.push(
      new TableRow({
        children: [
          createCell(gt.topic, { align: AlignmentType.LEFT, isBold: true }),
          createCell(formatKHTNMatrixCell(bietTL, true), { fontSize: 18 }),
          createCell(formatKHTNMatrixCell(bietTN, false), { fontSize: 18 }),
          createCell(formatKHTNMatrixCell(hieuTL, true), { fontSize: 18 }),
          createCell(formatKHTNMatrixCell(hieuTN, false), { fontSize: 18 }),
          createCell(formatKHTNMatrixCell(vdTL, true), { fontSize: 18 }),
          createCell(formatKHTNMatrixCell(vdTN, false), { fontSize: 18 }),
          createCell(formatKHTNMatrixCell(vdcTL, true), { fontSize: 18 }),
          createCell(formatKHTNMatrixCell(vdcTN, false), { fontSize: 18 }),
          createCell(totalTopicTL > 0 ? String(totalTopicTL) : '', { isBold: true }),
          createCell(totalTopicTN > 0 ? String(totalTopicTN) : '', { isBold: true }),
          createCell(topicScore > 0 ? topicScore.toFixed(1).replace('.', ',') : '-', { isBold: true }),
        ],
      })
    );
  });

  // Footer Row 1: Tổng số câu
  const totalTLCount =
    totals.countTuLuan.BIET +
    totals.countTuLuan.HIEU +
    totals.countTuLuan.VAN_DUNG +
    totals.countTuLuan.VAN_DUNG_CAO;
  const totalTNCount =
    totals.countNhieuLuaChon.BIET +
    totals.countNhieuLuaChon.HIEU +
    totals.countNhieuLuaChon.VAN_DUNG +
    totals.countNhieuLuaChon.VAN_DUNG_CAO;

  matrixRows.push(
    new TableRow({
      children: [
        createCell('Tổng số câu', { isBold: true }),
        createCell(String(totals.countTuLuan.BIET || 0), { isBold: true }),
        createCell(String(totals.countNhieuLuaChon.BIET || 0), { isBold: true }),
        createCell(String(totals.countTuLuan.HIEU || 0), { isBold: true }),
        createCell(String(totals.countNhieuLuaChon.HIEU || 0), { isBold: true }),
        createCell(String(totals.countTuLuan.VAN_DUNG || 0), { isBold: true }),
        createCell(String(totals.countNhieuLuaChon.VAN_DUNG || 0), { isBold: true }),
        createCell(String(totals.countTuLuan.VAN_DUNG_CAO || 0), { isBold: true }),
        createCell(String(totals.countNhieuLuaChon.VAN_DUNG_CAO || 0), { isBold: true }),
        createCell(String(totalTLCount), { isBold: true }),
        createCell(String(totalTNCount), { isBold: true }),
        createCell(String(totalTLCount + totalTNCount) + ' câu', { isBold: true }),
      ],
    })
  );

  // Footer Row 2: Điểm số (lấy trực tiếp từ mỗi câu tự luận)
  matrixRows.push(
    new TableRow({
      children: [
        createCell('Điểm số', { isBold: true }),
        createCell(scoreTlBiet > 0 ? scoreTlBiet.toFixed(1).replace('.', ',') : '-', { isBold: true }),
        createCell(scoreTnBiet > 0 ? scoreTnBiet.toFixed(1).replace('.', ',') : '-', { isBold: true }),
        createCell(scoreTlHieu > 0 ? scoreTlHieu.toFixed(1).replace('.', ',') : '-', { isBold: true }),
        createCell(scoreTnHieu > 0 ? scoreTnHieu.toFixed(1).replace('.', ',') : '-', { isBold: true }),
        createCell(scoreTlVanDung > 0 ? scoreTlVanDung.toFixed(1).replace('.', ',') : '-', { isBold: true }),
        createCell(scoreTnVanDung > 0 ? scoreTnVanDung.toFixed(1).replace('.', ',') : '-', { isBold: true }),
        createCell(scoreTlVanDungCao > 0 ? scoreTlVanDungCao.toFixed(1).replace('.', ',') : '-', { isBold: true }),
        createCell(scoreTnVanDungCao > 0 ? scoreTnVanDungCao.toFixed(1).replace('.', ',') : '-', { isBold: true }),
        createCell(scoreTL.toFixed(1).replace('.', ','), { isBold: true }),
        createCell(scoreTN.toFixed(1).replace('.', ','), { isBold: true }),
        createCell(grandTotalDocx.toFixed(1).replace('.', ','), { isBold: true }),
      ],
    })
  );

  // Footer Row 3: Tỉ lệ %
  matrixRows.push(
    new TableRow({
      children: [
        createCell('Tỉ lệ %', { isBold: true }),
        createCell(`${Math.round(((scoreTlBiet + scoreTnBiet) / grandTotalDocx) * 100)}%`, { colSpan: 2, isBold: true }),
        createCell(`${Math.round(((scoreTlHieu + scoreTnHieu) / grandTotalDocx) * 100)}%`, { colSpan: 2, isBold: true }),
        createCell(`${Math.round(((scoreTlVanDung + scoreTnVanDung) / grandTotalDocx) * 100)}%`, { colSpan: 2, isBold: true }),
        createCell(`${Math.round(((scoreTlVanDungCao + scoreTnVanDungCao) / grandTotalDocx) * 100)}%`, { colSpan: 2, isBold: true }),
        createCell(`${Math.round((scoreTL / grandTotalDocx) * 100)}%`, { isBold: true }),
        createCell(`${Math.round((scoreTN / grandTotalDocx) * 100)}%`, { isBold: true }),
        createCell('100%', { isBold: true }),
      ],
    })
  );

  const matrixTable = new Table({
    rows: matrixRows,
    borders: TABLE_BORDERS,
    width: { size: 100, type: WidthType.PERCENTAGE },
  });

  // 2. KHTN Specification Table
  const specRows: TableRow[] = [];

  specRows.push(
    new TableRow({
      tableHeader: true,
      children: [
        createCell('Nội dung', { isBold: true, rowSpan: 2, widthPercent: 18 }),
        createCell('Mức độ', { isBold: true, rowSpan: 2, widthPercent: 12 }),
        createCell('Yêu cầu cần đạt', { isBold: true, rowSpan: 2, widthPercent: 38 }),
        createCell('Số câu hỏi', { isBold: true, colSpan: 2, widthPercent: 16 }),
        createCell('Câu hỏi', { isBold: true, colSpan: 2, widthPercent: 16 }),
      ],
    })
  );

  specRows.push(
    new TableRow({
      tableHeader: true,
      children: [
        createCell('TL (số ý)', { isBold: true, fontSize: 18 }),
        createCell('TN (số câu)', { isBold: true, fontSize: 18 }),
        createCell('TL (số ý)', { isBold: true, fontSize: 18 }),
        createCell('TN (số câu)', { isBold: true, fontSize: 18 }),
      ],
    })
  );

  groupedTopics.forEach((gt) => {
    // Topic header row
    specRows.push(
      new TableRow({
        children: [
          createCell(gt.topic, {
            colSpan: 7,
            align: AlignmentType.LEFT,
            isBold: true,
            shadingColor: 'E6F0FA',
          }),
        ],
      })
    );

    gt.units.forEach((unit) => {
      const levels = [
        {
          key: 'BIET',
          label: 'Nhận biết',
          tl: unit.cells.TU_LUAN.BIET,
          tn: [
            ...unit.cells.TN_NHIEU_LUA_CHON.BIET,
            ...unit.cells.TN_DUNG_SAI.BIET,
            ...unit.cells.TN_TRA_LOI_NGAN.BIET,
          ],
          outcomes: unit.outcomes.BIET,
        },
        {
          key: 'HIEU',
          label: 'Thông hiểu',
          tl: unit.cells.TU_LUAN.HIEU,
          tn: [
            ...unit.cells.TN_NHIEU_LUA_CHON.HIEU,
            ...unit.cells.TN_DUNG_SAI.HIEU,
            ...unit.cells.TN_TRA_LOI_NGAN.HIEU,
          ],
          outcomes: unit.outcomes.HIEU,
        },
        {
          key: 'VAN_DUNG',
          label: 'Vận dụng',
          tl: unit.cells.TU_LUAN.VAN_DUNG,
          tn: [
            ...unit.cells.TN_NHIEU_LUA_CHON.VAN_DUNG,
            ...unit.cells.TN_DUNG_SAI.VAN_DUNG,
            ...unit.cells.TN_TRA_LOI_NGAN.VAN_DUNG,
          ],
          outcomes: unit.outcomes.VAN_DUNG,
        },
        {
          key: 'VAN_DUNG_CAO',
          label: 'Vận dụng cao',
          tl: unit.cells.TU_LUAN.VAN_DUNG_CAO || [],
          tn: [
            ...(unit.cells.TN_NHIEU_LUA_CHON.VAN_DUNG_CAO || []),
            ...(unit.cells.TN_DUNG_SAI.VAN_DUNG_CAO || []),
            ...(unit.cells.TN_TRA_LOI_NGAN.VAN_DUNG_CAO || []),
          ],
          outcomes: unit.outcomes.VAN_DUNG_CAO || [],
        },
      ];

      const activeLevels = levels.filter(
        (l) => l.tl.length > 0 || l.tn.length > 0 || l.outcomes.length > 0
      );

      (activeLevels.length > 0 ? activeLevels : levels.slice(0, 2)).forEach((lvl, lIdx) => {
        const isFirstLvl = lIdx === 0;
        const totalRowsForUnit = activeLevels.length > 0 ? activeLevels.length : 2;

        const outcomeText =
          lvl.outcomes && lvl.outcomes.length > 0
            ? lvl.outcomes.map((o: string) => `• ${o}`).join('\n')
            : '• Thực hiện theo chuẩn YCCĐ chương trình GDPT môn Khoa học tự nhiên.';

        const rCells: TableCell[] = [];
        if (isFirstLvl) {
          rCells.push(
            createCell(unit.subTopic, {
              rowSpan: totalRowsForUnit,
              align: AlignmentType.LEFT,
              isBold: true,
            })
          );
        }

        rCells.push(createCell(lvl.label, { isBold: true, fontSize: 18 }));
        rCells.push(createCell(outcomeText, { align: AlignmentType.LEFT, fontSize: 18 }));
        rCells.push(createCell(lvl.tl.length > 0 ? String(lvl.tl.length) : '', { fontSize: 18 }));
        rCells.push(createCell(lvl.tn.length > 0 ? String(lvl.tn.length) : '', { fontSize: 18 }));
        rCells.push(createCell(formatKHTNSpecCell(lvl.tl), { fontSize: 18 }));
        rCells.push(createCell(formatKHTNSpecCell(lvl.tn), { fontSize: 18 }));

        specRows.push(new TableRow({ children: rCells }));
      });
    });
  });

  // Footer for spec
  specRows.push(
    new TableRow({
      children: [
        createCell('Tổng số câu', { colSpan: 3, isBold: true }),
        createCell(String(totalTLCount), { isBold: true }),
        createCell(String(totalTNCount), { isBold: true }),
        createCell(`${totalTLCount} ý`, { isBold: true }),
        createCell(`${totalTNCount} câu`, { isBold: true }),
      ],
    })
  );

  specRows.push(
    new TableRow({
      children: [
        createCell('Tổng điểm', { colSpan: 3, isBold: true }),
        createCell(`${scoreTL.toFixed(1).replace('.', ',')} điểm`, { colSpan: 2, isBold: true }),
        createCell(`${scoreTN.toFixed(1).replace('.', ',')} điểm`, { colSpan: 2, isBold: true }),
      ],
    })
  );

  const specTable = new Table({
    rows: specRows,
    borders: TABLE_BORDERS,
    width: { size: 100, type: WidthType.PERCENTAGE },
  });

  // Exam Paper
  const nlcQuestions = questions.filter((q) => q.partType === 'TN_NHIEU_LUA_CHON');
  const tlQuestions = questions.filter((q) => q.partType === 'TU_LUAN');

  const examParagraphs: Paragraph[] = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 100 },
      children: [
        new TextRun({
          text: `ĐỀ KIỂM TRA MÔN KHOA HỌC TỰ NHIÊN LỚP ${examMeta.grade || '9'}`,
          bold: true,
          size: 26,
          font: 'Times New Roman',
          color: '002B49',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 150 },
      children: [
        new TextRun({
          text: `(Thời gian làm bài: ${examMeta.timeLimit || '60 phút'} - Tỉ lệ: ${Math.round((scoreTN / grandTotalDocx) * 100)}% Trắc nghiệm, ${Math.round((scoreTL / grandTotalDocx) * 100)}% Tự luận)`,
          italics: true,
          size: 22,
          font: 'Times New Roman',
        }),
      ],
    }),
  ];

  if (nlcQuestions.length > 0) {
    examParagraphs.push(
      new Paragraph({
        spacing: { before: 200, after: 80 },
        children: [
          new TextRun({
            text: `PHẦN I. CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (${scoreTN.toFixed(1).replace('.', ',')} ĐIỂM - GỒM ${nlcQuestions.length} CÂU HỎI, MỖI CÂU 0,25 ĐIỂM)`,
            bold: true,
            size: 22,
            font: 'Times New Roman',
          }),
        ],
      })
    );
    nlcQuestions.forEach((q) => {
      let cleanText = (q.fullQuestionText || q.contentSnippet || '').trim();
      const numRegex = new RegExp(`^(${q.questionNumber}|câu\\s*\\d+|bài\\s*\\d+)[.:\\s]+`, 'i');
      cleanText = cleanText.replace(numRegex, '').trim();

      examParagraphs.push(
        new Paragraph({
          spacing: { before: 80, after: q.options && q.options.length > 0 ? 30 : 60 },
          children: [
            new TextRun({ text: `${q.questionNumber}. `, bold: true, font: 'Times New Roman' }),
            new TextRun({ text: cleanText, font: 'Times New Roman' }),
          ],
        })
      );

      if (q.options && q.options.length > 0 && !cleanText.includes(q.options[0])) {
        examParagraphs.push(
          new Paragraph({
            spacing: { before: 20, after: 60 },
            indent: { left: 400 },
            children: [
              new TextRun({
                text: q.options.join('       '),
                font: 'Times New Roman',
              }),
            ],
          })
        );
      }
    });
  }

  if (tlQuestions.length > 0) {
    examParagraphs.push(
      new Paragraph({
        spacing: { before: 200, after: 80 },
        children: [
          new TextRun({
            text: `PHẦN II. CÂU HỎI TỰ LUẬN (${scoreTL.toFixed(1).replace('.', ',')} ĐIỂM - GỒM ${tlQuestions.length} CÂU HỎI)`,
            bold: true,
            size: 22,
            font: 'Times New Roman',
          }),
        ],
      })
    );
    tlQuestions.forEach((q) => {
      let cleanText = (q.fullQuestionText || q.contentSnippet || '').trim();
      const numRegex = new RegExp(`^(${q.questionNumber}|câu\\s*\\d+|bài\\s*\\d+)[.:\\s]+`, 'i');
      cleanText = cleanText.replace(numRegex, '').trim();
      const qScore = getQuestionDirectScore(q, 0);
      const scorePrefix = qScore > 0 && !cleanText.includes('điểm') ? ` (${qScore.toString().replace('.', ',')} điểm)` : '';

      examParagraphs.push(
        new Paragraph({
          spacing: { before: 100, after: 60 },
          children: [
            new TextRun({ text: `${q.questionNumber}${scorePrefix}. `, bold: true, font: 'Times New Roman' }),
            new TextRun({ text: cleanText, font: 'Times New Roman' }),
          ],
        })
      );
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: { orientation: PageOrientation.LANDSCAPE },
            margin: { top: 720, bottom: 720, left: 720, right: 720 },
          },
        },
        children: [
          // Header info
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `${examMeta.school || 'TRƯỜNG THCS NGÃI TỨ'} - TỔ KHTN – TIẾNG ANH`,
                bold: true,
                size: 24,
                font: 'Times New Roman',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `MA TRẬN ĐỀ KIỂM TRA GIỮA HKI NĂM HỌC 2025-2026`,
                bold: true,
                size: 26,
                font: 'Times New Roman',
                color: '002B49',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: `MÔN: KHOA HỌC TỰ NHIÊN LỚP ${examMeta.grade || '9'} - THỜI GIAN LÀM BÀI: 60 PHÚT`,
                italics: true,
                bold: true,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          }),

          // Section I: Phạm vi kiến thức
          new Paragraph({
            spacing: { before: 100, after: 40 },
            children: [
              new TextRun({
                text: 'I. PHẠM VI KIẾN THỨC:',
                bold: true,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 30 },
            children: [
              new TextRun({
                text: '• Nội dung kiến thức: Từ tuần 1 đến tuần 9 theo PPCT.',
                font: 'Times New Roman',
                size: 20,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 30 },
            children: [
              new TextRun({
                text: '• Phương án kiểm tra: Kết hợp giữa trắc nghiệm và tự luận (tỉ lệ 40% trắc nghiệm, 60% tự luận).',
                font: 'Times New Roman',
                size: 20,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 30 },
            children: [
              new TextRun({
                text: '• Cấu trúc & Mức độ đề: 40% Nhận biết; 30% Thông hiểu; 20% Vận dụng; 10% Vận dụng cao.',
                font: 'Times New Roman',
                size: 20,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 30 },
            children: [
              new TextRun({
                text: `• Phần trắc nghiệm: ${scoreTN.toFixed(1).replace('.', ',')} điểm (gồm ${totalTNCount} câu hỏi: nhận biết: ${totals.countNhieuLuaChon.BIET} câu, thông hiểu: ${totals.countNhieuLuaChon.HIEU} câu), mỗi câu 0,25 điểm.`,
                font: 'Times New Roman',
                size: 20,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: `• Phần tự luận: ${scoreTL.toFixed(1).replace('.', ',')} điểm (Nhận biết: ${scoreTlBiet.toFixed(1).replace('.', ',')} điểm; Thông hiểu: ${scoreTlHieu.toFixed(1).replace('.', ',')} điểm; Vận dụng: ${scoreTlVanDung.toFixed(1).replace('.', ',')} điểm; Vận dụng cao: ${scoreTlVanDungCao.toFixed(1).replace('.', ',')} điểm).`,
                font: 'Times New Roman',
                size: 20,
              }),
            ],
          }),

          // Section II: Khung ma trận
          new Paragraph({
            spacing: { before: 100, after: 120 },
            children: [
              new TextRun({
                text: 'II. KHUNG MA TRẬN ĐỀ KIỂM TRA GIỮA KÌ I (MÔN KHTN)',
                bold: true,
                size: 24,
                font: 'Times New Roman',
                color: '002B49',
              }),
            ],
          }),
          matrixTable,

          // Section III: Bảng đặc tả
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 300, after: 60 },
            children: [
              new TextRun({
                text: 'BẢNG ĐẶC TẢ ĐỀ KIỂM TRA GIỮA KÌ I',
                bold: true,
                size: 26,
                font: 'Times New Roman',
                color: '002B49',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: `Môn: KHOA HỌC TỰ NHIÊN LỚP ${examMeta.grade || '9'} - Thời gian làm bài: 60 phút`,
                italics: true,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          }),
          specTable,

          // Section IV: Đề kiểm tra
          ...examParagraphs,
        ],
      },
    ],
  });

  return await Packer.toBlob(doc);
}

export async function exportToDocx(
  examMeta: ExamMeta,
  questions: QuestionItem[],
  scoreConfig: ScoreConfig
): Promise<Blob> {
  const isKHTN =
    examMeta.subject?.toLowerCase().includes('khoa học') ||
    examMeta.subject?.toLowerCase().includes('khtn');

  if (isKHTN) {
    return await exportKHTNDocx(examMeta, questions, scoreConfig);
  }

  const { groupedTopics, totals } = buildMatrixAndSpecs(questions, scoreConfig);
  const includeTraLoiNgan = scoreConfig.includeTraLoiNgan ?? false;

  const totalAssessmentCols = includeTraLoiNgan ? 12 : 9;
  const tnColSpan = includeTraLoiNgan ? 9 : 6;

  // 1. Matrix Table (Phụ lục 1)
  const matrixRows: TableRow[] = [];

  // Header Row 1
  matrixRows.push(
    new TableRow({
      tableHeader: true,
      children: [
        createCell('TT', { isBold: true, rowSpan: 3, widthPercent: 4 }),
        createCell('Chủ đề/Chương', { isBold: true, rowSpan: 3, widthPercent: 16 }),
        createCell('Nội dung/đơn vị kiến thức', { isBold: true, rowSpan: 3, widthPercent: 20 }),
        createCell('Mức độ đánh giá', { isBold: true, colSpan: totalAssessmentCols }),
        createCell('Tổng', { isBold: true, colSpan: 3 }),
        createCell('Tỉ lệ % điểm', { isBold: true, rowSpan: 3, widthPercent: 6 }),
      ],
    })
  );

  // Header Row 2
  matrixRows.push(
    new TableRow({
      tableHeader: true,
      children: [
        createCell('TNKQ', { isBold: true, colSpan: tnColSpan }),
        createCell('Tự luận', { isBold: true, colSpan: 3 }),
        createCell('Biết', { isBold: true, rowSpan: 2 }),
        createCell('Hiểu', { isBold: true, rowSpan: 2 }),
        createCell('Vận dụng', { isBold: true, rowSpan: 2 }),
      ],
    })
  );

  // Header Row 3
  const h3Cells: TableCell[] = [
    createCell('Nhiều lựa chọn', { isBold: true, colSpan: 3 }),
    createCell('“Đúng – Sai”', { isBold: true, colSpan: 3 }),
  ];
  if (includeTraLoiNgan) {
    h3Cells.push(createCell('Trả lời ngắn', { isBold: true, colSpan: 3 }));
  }
  h3Cells.push(
    createCell('Biết', { isBold: true }),
    createCell('Hiểu', { isBold: true }),
    createCell('Vận dụng', { isBold: true })
  );

  matrixRows.push(new TableRow({ tableHeader: true, children: h3Cells }));

  // Header Row 4 (Biết, Hiểu, Vận dụng for each part)
  const h4Cells: TableCell[] = [
    createCell('Biết', { isBold: true }),
    createCell('Hiểu', { isBold: true }),
    createCell('Vận dụng', { isBold: true }),

    createCell('Biết', { isBold: true }),
    createCell('Hiểu', { isBold: true }),
    createCell('Vận dụng', { isBold: true }),
  ];
  if (includeTraLoiNgan) {
    h4Cells.push(
      createCell('Biết', { isBold: true }),
      createCell('Hiểu', { isBold: true }),
      createCell('Vận dụng', { isBold: true })
    );
  }
  matrixRows.push(new TableRow({ tableHeader: true, children: h4Cells }));

  // Data rows
  let currentTT = 1;
  groupedTopics.forEach((group) => {
    group.units.forEach((unit, uIdx) => {
      const isFirst = uIdx === 0;
      const rowCells: TableCell[] = [];

      if (isFirst) {
        rowCells.push(createCell(String(currentTT++), { rowSpan: group.units.length }));
        rowCells.push(
          createCell(group.topic, {
            rowSpan: group.units.length,
            align: AlignmentType.LEFT,
            isBold: true,
          })
        );
      }

      rowCells.push(createCell(unit.subTopic, { align: AlignmentType.LEFT }));

      // TNKQ Nhiều lựa chọn
      rowCells.push(createCell(formatMatrixCell(unit.cells.TN_NHIEU_LUA_CHON.BIET)));
      rowCells.push(createCell(formatMatrixCell(unit.cells.TN_NHIEU_LUA_CHON.HIEU)));
      rowCells.push(createCell(formatMatrixCell(unit.cells.TN_NHIEU_LUA_CHON.VAN_DUNG)));

      // TNKQ Đúng Sai
      rowCells.push(createCell(formatMatrixCell(unit.cells.TN_DUNG_SAI.BIET)));
      rowCells.push(createCell(formatMatrixCell(unit.cells.TN_DUNG_SAI.HIEU)));
      rowCells.push(createCell(formatMatrixCell(unit.cells.TN_DUNG_SAI.VAN_DUNG)));

      // TNKQ Trả lời ngắn if included
      if (includeTraLoiNgan) {
        rowCells.push(createCell(formatMatrixCell(unit.cells.TN_TRA_LOI_NGAN.BIET)));
        rowCells.push(createCell(formatMatrixCell(unit.cells.TN_TRA_LOI_NGAN.HIEU)));
        rowCells.push(createCell(formatMatrixCell(unit.cells.TN_TRA_LOI_NGAN.VAN_DUNG)));
      }

      // Tự luận
      rowCells.push(createCell(formatMatrixCell(unit.cells.TU_LUAN.BIET)));
      rowCells.push(createCell(formatMatrixCell(unit.cells.TU_LUAN.HIEU)));
      rowCells.push(createCell(formatMatrixCell(unit.cells.TU_LUAN.VAN_DUNG)));

      // Tổng Biết, Hiểu, Vận dụng
      rowCells.push(createCell(unit.totalBiet > 0 ? String(unit.totalBiet) : ''));
      rowCells.push(createCell(unit.totalHieu > 0 ? String(unit.totalHieu) : ''));
      rowCells.push(createCell(unit.totalVanDung > 0 ? String(unit.totalVanDung) : ''));

      // Tỉ lệ % điểm
      rowCells.push(createCell(`${unit.scorePercentage}%`));

      matrixRows.push(new TableRow({ children: rowCells }));
    });
  });

  // Footer: Tổng số câu
  const footerRow1: TableCell[] = [
    createCell('Tổng số câu', { colSpan: 3, isBold: true }),
    createCell(String(totals.countNhieuLuaChon.BIET || 0), { isBold: true }),
    createCell(String(totals.countNhieuLuaChon.HIEU || 0), { isBold: true }),
    createCell(String(totals.countNhieuLuaChon.VAN_DUNG || 0), { isBold: true }),

    createCell(String(totals.countDungSai.BIET || 0), { isBold: true }),
    createCell(String(totals.countDungSai.HIEU || 0), { isBold: true }),
    createCell(String(totals.countDungSai.VAN_DUNG || 0), { isBold: true }),
  ];
  if (includeTraLoiNgan) {
    footerRow1.push(
      createCell(String(totals.countTraLoiNgan.BIET || 0), { isBold: true }),
      createCell(String(totals.countTraLoiNgan.HIEU || 0), { isBold: true }),
      createCell(String(totals.countTraLoiNgan.VAN_DUNG || 0), { isBold: true })
    );
  }
  footerRow1.push(
    createCell(String(totals.countTuLuan.BIET || 0), { isBold: true }),
    createCell(String(totals.countTuLuan.HIEU || 0), { isBold: true }),
    createCell(String(totals.countTuLuan.VAN_DUNG || 0), { isBold: true }),
    createCell(String(totals.totalBiet), { isBold: true }),
    createCell(String(totals.totalHieu), { isBold: true }),
    createCell(String(totals.totalVanDung), { isBold: true }),
    createCell('100%', { isBold: true })
  );
  matrixRows.push(new TableRow({ children: footerRow1 }));

  // Footer: Tổng số điểm
  const footerRow2: TableCell[] = [
    createCell('Tổng số điểm', { colSpan: 3, isBold: true }),
    createCell(totals.scoreNhieuLuaChon.toFixed(1).replace('.', ','), { colSpan: 3, isBold: true }),
    createCell(totals.scoreDungSai.toFixed(1).replace('.', ','), { colSpan: 3, isBold: true }),
  ];
  if (includeTraLoiNgan) {
    footerRow2.push(createCell(totals.scoreTraLoiNgan.toFixed(1).replace('.', ','), { colSpan: 3, isBold: true }));
  }
  footerRow2.push(
    createCell(totals.scoreTuLuan.toFixed(1).replace('.', ','), { colSpan: 3, isBold: true }),
    createCell(totals.scoreBiet.toFixed(1).replace('.', ','), { isBold: true }),
    createCell(totals.scoreHieu.toFixed(1).replace('.', ','), { isBold: true }),
    createCell(totals.scoreVanDung.toFixed(1).replace('.', ','), { isBold: true }),
    createCell(totals.totalScore.toFixed(1).replace('.', ','), { isBold: true })
  );
  matrixRows.push(new TableRow({ children: footerRow2 }));

  // Footer: Tỉ lệ %
  const footerRow3: TableCell[] = [
    createCell('Tỉ lệ %', { colSpan: 3, isBold: true }),
    createCell(`${totals.percentNhieuLuaChon}%`, { colSpan: 3, isBold: true }),
    createCell(`${totals.percentDungSai}%`, { colSpan: 3, isBold: true }),
  ];
  if (includeTraLoiNgan) {
    footerRow3.push(createCell(`${totals.percentTraLoiNgan}%`, { colSpan: 3, isBold: true }));
  }
  footerRow3.push(
    createCell(`${totals.percentTuLuan}%`, { colSpan: 3, isBold: true }),
    createCell(`${totals.percentBiet}%`, { isBold: true }),
    createCell(`${totals.percentHieu}%`, { isBold: true }),
    createCell(`${totals.percentVanDung}%`, { isBold: true }),
    createCell('100%', { isBold: true })
  );
  matrixRows.push(new TableRow({ children: footerRow3 }));

  const matrixTable = new Table({
    rows: matrixRows,
    borders: TABLE_BORDERS,
    width: { size: 100, type: WidthType.PERCENTAGE },
  });

  // 2. Specification Table (Bản đặc tả - Phụ lục 2)
  const specRows: TableRow[] = [];

  specRows.push(
    new TableRow({
      tableHeader: true,
      children: [
        createCell('TT', { isBold: true, rowSpan: 3, widthPercent: 4 }),
        createCell('Chủ đề/Chương', { isBold: true, rowSpan: 3, widthPercent: 14 }),
        createCell('Nội dung/đơn vị kiến thức', { isBold: true, rowSpan: 3, widthPercent: 18 }),
        createCell('Yêu cầu cần đạt', { isBold: true, rowSpan: 3, widthPercent: 28 }),
        createCell('Số câu hỏi ở các mức độ đánh giá', { isBold: true, colSpan: totalAssessmentCols }),
      ],
    })
  );

  specRows.push(
    new TableRow({
      tableHeader: true,
      children: [
        createCell('TNKQ', { isBold: true, colSpan: tnColSpan }),
        createCell('Tự luận', { isBold: true, colSpan: 3 }),
      ],
    })
  );

  const specH3Cells: TableCell[] = [
    createCell('Nhiều lựa chọn', { isBold: true, colSpan: 3 }),
    createCell('“Đúng – Sai”', { isBold: true, colSpan: 3 }),
  ];
  if (includeTraLoiNgan) {
    specH3Cells.push(createCell('Trả lời ngắn', { isBold: true, colSpan: 3 }));
  }
  specH3Cells.push(
    createCell('Biết', { isBold: true }),
    createCell('Hiểu', { isBold: true }),
    createCell('Vận dụng', { isBold: true })
  );
  specRows.push(new TableRow({ tableHeader: true, children: specH3Cells }));

  const specH4Cells: TableCell[] = [
    createCell('Biết', { isBold: true }),
    createCell('Hiểu', { isBold: true }),
    createCell('Vận dụng', { isBold: true }),

    createCell('Biết', { isBold: true }),
    createCell('Hiểu', { isBold: true }),
    createCell('Vận dụng', { isBold: true }),
  ];
  if (includeTraLoiNgan) {
    specH4Cells.push(
      createCell('Biết', { isBold: true }),
      createCell('Hiểu', { isBold: true }),
      createCell('Vận dụng', { isBold: true })
    );
  }
  specH4Cells.push(
    createCell('Biết', { isBold: true }),
    createCell('Hiểu', { isBold: true }),
    createCell('Vận dụng', { isBold: true })
  );
  specRows.push(new TableRow({ tableHeader: true, children: specH4Cells }));

  let currentSpecTT = 1;
  groupedTopics.forEach((group) => {
    group.units.forEach((unit, uIdx) => {
      const isFirst = uIdx === 0;
      const rowCells: TableCell[] = [];

      if (isFirst) {
        rowCells.push(createCell(String(currentSpecTT++), { rowSpan: group.units.length }));
        rowCells.push(
          createCell(group.topic, {
            rowSpan: group.units.length,
            align: AlignmentType.LEFT,
            isBold: true,
          })
        );
      }

      rowCells.push(createCell(unit.subTopic, { align: AlignmentType.LEFT }));

      // Format outcomes
      const outcomeLines: string[] = [];
      if (unit.outcomes.BIET.length > 0) {
        outcomeLines.push('- Nhận biết:');
        unit.outcomes.BIET.forEach((o) => outcomeLines.push(`  + ${o}`));
      }
      if (unit.outcomes.HIEU.length > 0) {
        outcomeLines.push('- Thông hiểu:');
        unit.outcomes.HIEU.forEach((o) => outcomeLines.push(`  + ${o}`));
      }
      if (unit.outcomes.VAN_DUNG.length > 0) {
        outcomeLines.push('- Vận dụng:');
        unit.outcomes.VAN_DUNG.forEach((o) => outcomeLines.push(`  + ${o}`));
      }

      rowCells.push(
        createCell(outcomeLines.join('\n') || '- Thực hiện theo chuẩn KTKN.', {
          align: AlignmentType.LEFT,
          fontSize: 18,
        })
      );

      // Spec cells with (n) (NL?)
      rowCells.push(createCell(formatSpecCell(unit.cells.TN_NHIEU_LUA_CHON.BIET), { fontSize: 18 }));
      rowCells.push(createCell(formatSpecCell(unit.cells.TN_NHIEU_LUA_CHON.HIEU), { fontSize: 18 }));
      rowCells.push(createCell(formatSpecCell(unit.cells.TN_NHIEU_LUA_CHON.VAN_DUNG), { fontSize: 18 }));

      rowCells.push(createCell(formatSpecCell(unit.cells.TN_DUNG_SAI.BIET), { fontSize: 18 }));
      rowCells.push(createCell(formatSpecCell(unit.cells.TN_DUNG_SAI.HIEU), { fontSize: 18 }));
      rowCells.push(createCell(formatSpecCell(unit.cells.TN_DUNG_SAI.VAN_DUNG), { fontSize: 18 }));

      if (includeTraLoiNgan) {
        rowCells.push(createCell(formatSpecCell(unit.cells.TN_TRA_LOI_NGAN.BIET), { fontSize: 18 }));
        rowCells.push(createCell(formatSpecCell(unit.cells.TN_TRA_LOI_NGAN.HIEU), { fontSize: 18 }));
        rowCells.push(createCell(formatSpecCell(unit.cells.TN_TRA_LOI_NGAN.VAN_DUNG), { fontSize: 18 }));
      }

      rowCells.push(createCell(formatSpecCell(unit.cells.TU_LUAN.BIET), { fontSize: 18 }));
      rowCells.push(createCell(formatSpecCell(unit.cells.TU_LUAN.HIEU), { fontSize: 18 }));
      rowCells.push(createCell(formatSpecCell(unit.cells.TU_LUAN.VAN_DUNG), { fontSize: 18 }));

      specRows.push(new TableRow({ children: rowCells }));
    });
  });

  // Footer for spec
  const specFRow1: TableCell[] = [
    createCell('Tổng số câu', { colSpan: 4, isBold: true }),
    createCell(String(totals.countNhieuLuaChon.BIET || 0), { isBold: true }),
    createCell(String(totals.countNhieuLuaChon.HIEU || 0), { isBold: true }),
    createCell(String(totals.countNhieuLuaChon.VAN_DUNG || 0), { isBold: true }),

    createCell(String(totals.countDungSai.BIET || 0), { isBold: true }),
    createCell(String(totals.countDungSai.HIEU || 0), { isBold: true }),
    createCell(String(totals.countDungSai.VAN_DUNG || 0), { isBold: true }),
  ];
  if (includeTraLoiNgan) {
    specFRow1.push(
      createCell(String(totals.countTraLoiNgan.BIET || 0), { isBold: true }),
      createCell(String(totals.countTraLoiNgan.HIEU || 0), { isBold: true }),
      createCell(String(totals.countTraLoiNgan.VAN_DUNG || 0), { isBold: true })
    );
  }
  specFRow1.push(
    createCell(String(totals.countTuLuan.BIET || 0), { isBold: true }),
    createCell(String(totals.countTuLuan.HIEU || 0), { isBold: true }),
    createCell(String(totals.countTuLuan.VAN_DUNG || 0), { isBold: true })
  );
  specRows.push(new TableRow({ children: specFRow1 }));

  const specFRow2: TableCell[] = [
    createCell('Tổng số điểm', { colSpan: 4, isBold: true }),
    createCell(totals.scoreNhieuLuaChon.toFixed(1).replace('.', ','), { colSpan: 3, isBold: true }),
    createCell(totals.scoreDungSai.toFixed(1).replace('.', ','), { colSpan: 3, isBold: true }),
  ];
  if (includeTraLoiNgan) {
    specFRow2.push(createCell(totals.scoreTraLoiNgan.toFixed(1).replace('.', ','), { colSpan: 3, isBold: true }));
  }
  specFRow2.push(createCell(totals.scoreTuLuan.toFixed(1).replace('.', ','), { colSpan: 3, isBold: true }));
  specRows.push(new TableRow({ children: specFRow2 }));

  const specFRow3: TableCell[] = [
    createCell('Tỉ lệ %', { colSpan: 4, isBold: true }),
    createCell(`${totals.percentNhieuLuaChon}%`, { colSpan: 3, isBold: true }),
    createCell(`${totals.percentDungSai}%`, { colSpan: 3, isBold: true }),
  ];
  if (includeTraLoiNgan) {
    specFRow3.push(createCell(`${totals.percentTraLoiNgan}%`, { colSpan: 3, isBold: true }));
  }
  specFRow3.push(createCell(`${totals.percentTuLuan}%`, { colSpan: 3, isBold: true }));
  specRows.push(new TableRow({ children: specFRow3 }));

  const specTable = new Table({
    rows: specRows,
    borders: TABLE_BORDERS,
    width: { size: 100, type: WidthType.PERCENTAGE },
  });

  // Section 3: Exam Paper with Integrated Competencies
  const nlcQuestions = questions.filter((q) => q.partType === 'TN_NHIEU_LUA_CHON');
  const dsQuestions = questions.filter((q) => q.partType === 'TN_DUNG_SAI');
  const tlQuestions = questions.filter((q) =>
    includeTraLoiNgan
      ? q.partType === 'TU_LUAN'
      : q.partType === 'TU_LUAN' || q.partType === 'TN_TRA_LOI_NGAN'
  );

  const examParagraphs: Paragraph[] = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 100 },
      children: [
        new TextRun({
          text: `3. ĐỀ KIỂM TRA MÔN ${examMeta.subject?.toUpperCase() || 'HỌC'} CÓ TÍCH HỢP NĂNG LỰC TRONG TỪNG CÂU`,
          bold: true,
          size: 26,
          font: 'Times New Roman',
          color: '002B49',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 150 },
      children: [
        new TextRun({
          text: `(Môn: ${examMeta.subject || 'Toán học'} - Thời gian: ${examMeta.timeLimit || '90 phút'} - Tổng điểm: 10,0 điểm)`,
          italics: true,
          size: 22,
          font: 'Times New Roman',
        }),
      ],
    }),
  ];

  const formatQuestionParagraphs = (q: QuestionItem): Paragraph[] => {
    let cleanText = (q.fullQuestionText || q.contentSnippet || '').trim();
    const numRegex = new RegExp(`^(${q.questionNumber}|câu\\s*\\d+|bài\\s*\\d+)[.:\\s]+`, 'i');
    cleanText = cleanText.replace(numRegex, '').trim();

    const paras: Paragraph[] = [
      new Paragraph({
        spacing: { before: 80, after: q.options && q.options.length > 0 && !cleanText.includes(q.options[0]) ? 30 : 60 },
        children: [
          new TextRun({ text: `${q.questionNumber} `, bold: true, font: 'Times New Roman' }),
          new TextRun({
            text: `[${q.competency} - ${formatLevelText(q.level)}]: `,
            bold: true,
            color: '003366',
            font: 'Times New Roman',
          }),
          new TextRun({
            text: cleanText,
            font: 'Times New Roman',
          }),
        ],
      }),
    ];

    if (q.options && q.options.length > 0 && !cleanText.includes(q.options[0])) {
      paras.push(
        new Paragraph({
          spacing: { before: 20, after: 60 },
          indent: { left: 400 },
          children: [
            new TextRun({
              text: q.options.join('       '),
              font: 'Times New Roman',
            }),
          ],
        })
      );
    }

    return paras;
  };

  if (nlcQuestions.length > 0) {
    examParagraphs.push(
      new Paragraph({
        spacing: { before: 200, after: 80 },
        children: [
          new TextRun({
            text: `PHẦN I. CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (${scoreConfig.scoreNhieuLuaChon.toFixed(1).replace('.', ',')} ĐIỂM)`,
            bold: true,
            size: 22,
            font: 'Times New Roman',
          }),
        ],
      })
    );
    nlcQuestions.forEach((q) => {
      examParagraphs.push(...formatQuestionParagraphs(q));
    });
  }

  if (dsQuestions.length > 0) {
    examParagraphs.push(
      new Paragraph({
        spacing: { before: 150, after: 80 },
        children: [
          new TextRun({
            text: `PHẦN II. CÂU TRẮC NGHIỆM ĐÚNG SAI (${scoreConfig.scoreDungSai.toFixed(1).replace('.', ',')} ĐIỂM)`,
            bold: true,
            size: 22,
            font: 'Times New Roman',
          }),
        ],
      })
    );
    dsQuestions.forEach((q) => {
      examParagraphs.push(...formatQuestionParagraphs(q));
    });
  }

  if (tlQuestions.length > 0) {
    examParagraphs.push(
      new Paragraph({
        spacing: { before: 150, after: 80 },
        children: [
          new TextRun({
            text: `PHẦN III. TỰ LUẬN (${scoreConfig.scoreTuLuan.toFixed(1).replace('.', ',')} ĐIỂM)`,
            bold: true,
            size: 22,
            font: 'Times New Roman',
          }),
        ],
      })
    );
    tlQuestions.forEach((q) => {
      examParagraphs.push(...formatQuestionParagraphs(q));
    });
  }

  // Competency explanation paragraphs
  const subDef = getSubjectById(examMeta.subject);
  const competencyParagraphs = Object.values(subDef.competencies).map(
    (c) =>
      new Paragraph({
        spacing: { before: 50, after: 50 },
        children: [
          new TextRun({ text: `• ${c.name} `, bold: true, font: 'Times New Roman' }),
          new TextRun({ text: `(Ký hiệu viết tắt: ${c.code}): `, bold: true, color: '003366', font: 'Times New Roman' }),
          new TextRun({ text: c.description, font: 'Times New Roman' }),
        ],
      })
  );

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              orientation: PageOrientation.LANDSCAPE,
            },
            margin: {
              top: 720,    // 0.5 inch
              bottom: 720,
              left: 720,
              right: 720,
            },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'BỘ GIÁO DỤC VÀ ĐÀO TẠO',
                bold: true,
                size: 24,
                font: 'Times New Roman',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'PHỤ LỤC',
                bold: true,
                size: 24,
                font: 'Times New Roman',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: '(Kèm theo Công văn số 7991/BGDĐT-GDTrH ngày 17 /12/2024 của Bộ GDĐT)',
                italics: true,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 150 },
            children: [
              new TextRun({
                text: `1. MA TRẬN ĐỀ KIỂM TRA ĐỊNH KÌ - ${examMeta.title.toUpperCase()}`,
                bold: true,
                size: 26,
                font: 'Times New Roman',
                color: '002B49',
              }),
            ],
          }),
          matrixTable,
          new Paragraph({
            spacing: { before: 150, after: 250 },
            children: [
              new TextRun({
                text: 'Ghi chú: ',
                bold: true,
                italics: true,
                size: 20,
                font: 'Times New Roman',
              }),
              new TextRun({
                text: 'Mỗi câu trắc nghiệm Đúng – Sai bao gồm 4 ý nhỏ. Số trong ô ma trận thể hiện số câu hỏi hoặc câu hỏi số bao nhiêu theo Công văn 7991/BGDĐT-GDTrH.',
                italics: true,
                size: 20,
                font: 'Times New Roman',
              }),
            ],
          }),

          // Page Break or Heading for Specification Table
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 300, after: 150 },
            children: [
              new TextRun({
                text: `2. BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KÌ - ${examMeta.title.toUpperCase()}`,
                bold: true,
                size: 26,
                font: 'Times New Roman',
                color: '002B49',
              }),
            ],
          }),
          specTable,
          new Paragraph({
            spacing: { before: 150, after: 100 },
            children: [
              new TextRun({
                text: 'Ghi chú số 6 theo Công văn 7991/BGDĐT-GDTrH: ',
                bold: true,
                italics: true,
                size: 20,
                font: 'Times New Roman',
              }),
              new TextRun({
                text: 'Có ở trong một số ô của bản đặc tả, ghi tắt tên của năng lực toán học kèm số thứ tự câu hỏi: (n) (NL?).',
                italics: true,
                size: 20,
                font: 'Times New Roman',
              }),
            ],
          }),
          new Paragraph({
            spacing: { before: 100, after: 80 },
            children: [
              new TextRun({
                text: `BẢNG KÝ HIỆU CÁC NĂNG LỰC MÔN ${examMeta.subject?.toUpperCase() || 'HỌC'} TRONG BẢN ĐẶC TẢ:`,
                bold: true,
                size: 22,
                font: 'Times New Roman',
              }),
            ],
          }),
          ...competencyParagraphs,

          // Section 3: Exam paper with integrated competencies
          ...examParagraphs,
        ],
      },
    ],
  });

  return await Packer.toBlob(doc);
}
