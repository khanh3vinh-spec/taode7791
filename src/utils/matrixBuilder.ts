import {
  QuestionItem,
  MatrixRowUnit,
  CognitiveLevel,
  PartType,
  ScoreConfig,
  DEFAULT_SCORE_CONFIG,
} from '../types/matrix';

export interface GroupedTopic {
  topic: string;
  units: MatrixRowUnit[];
}

export interface MatrixTotals {
  // Counts
  countNhieuLuaChon: Record<CognitiveLevel, number>;
  countDungSai: Record<CognitiveLevel, number>;
  countTraLoiNgan: Record<CognitiveLevel, number>;
  countTuLuan: Record<CognitiveLevel, number>;
  totalBiet: number;
  totalHieu: number;
  totalVanDung: number;
  totalVanDungCao: number;
  totalQuestions: number;

  // Scores
  scoreNhieuLuaChon: number;
  scoreDungSai: number;
  scoreTraLoiNgan: number;
  scoreTuLuan: number;
  scoreBiet: number;
  scoreHieu: number;
  scoreVanDung: number;
  scoreVanDungCao: number;
  totalScore: number;

  // Percentages
  percentNhieuLuaChon: number;
  percentDungSai: number;
  percentTraLoiNgan: number;
  percentTuLuan: number;
  percentBiet: number;
  percentHieu: number;
  percentVanDung: number;
  percentVanDungCao: number;
}

/**
 * Extract numerical score from text (e.g. "(1,0 điểm)", "(1.5 điểm)", "(2 điểm)", "(0,5đ)", "(2đ)")
 */
export function extractScoreFromText(text: string): number | null {
  if (!text) return null;
  // Match bracketed score e.g. "(1,0 điểm)", "(1.5 điểm)", "(2 điểm)", "(0,5đ)"
  const matchParen = text.match(/\(\s*([0-9]+(?:[.,][0-9]+)?)\s*(?:điểm|đ)\s*\)/i);
  if (matchParen) {
    const val = parseFloat(matchParen[1].replace(',', '.'));
    if (!isNaN(val) && val > 0 && val <= 10) return val;
  }
  // Match inline e.g. "Bài 1. 1,0 điểm" or "1,5 điểm"
  const matchInline = text.match(/(?:^|[:\-\s])([0-9]+(?:[.,][0-9]+)?)\s*(?:điểm|đ)\b/i);
  if (matchInline) {
    const val = parseFloat(matchInline[1].replace(',', '.'));
    if (!isNaN(val) && val > 0 && val <= 10) return val;
  }
  return null;
}

/**
 * Get direct score for a question item
 */
export function getQuestionDirectScore(
  q: QuestionItem,
  fallbackUnitScore: number = 0
): number {
  if (typeof q.score === 'number' && q.score > 0) {
    return q.score;
  }
  const extracted = extractScoreFromText(
    `${q.questionNumber || ''} ${q.fullQuestionText || ''} ${q.contentSnippet || ''}`
  );
  if (extracted !== null) {
    return extracted;
  }
  return fallbackUnitScore;
}

export function buildMatrixAndSpecs(
  questions: QuestionItem[],
  scoreConfig: ScoreConfig = DEFAULT_SCORE_CONFIG
): {
  groupedTopics: GroupedTopic[];
  totals: MatrixTotals;
} {
  // If short-answer questions are disabled, map any TN_TRA_LOI_NGAN questions to TU_LUAN
  const effectiveQuestions = questions.map((q) => {
    let score = q.score;
    if (typeof score !== 'number' || score <= 0) {
      const parsed = extractScoreFromText(
        `${q.questionNumber || ''} ${q.fullQuestionText || ''} ${q.contentSnippet || ''}`
      );
      if (parsed !== null) score = parsed;
    }

    if (!scoreConfig.includeTraLoiNgan && q.partType === 'TN_TRA_LOI_NGAN') {
      return {
        ...q,
        score,
        partType: 'TU_LUAN' as PartType,
        questionNumber: q.questionNumber.startsWith('Câu')
          ? q.questionNumber.replace('Câu', 'Bài')
          : q.questionNumber,
      };
    }
    return { ...q, score };
  });

  // Group questions by topic -> subTopic
  const topicMap = new Map<string, Map<string, QuestionItem[]>>();

  for (const q of effectiveQuestions) {
    const t = q.topic.trim() || 'Chủ đề chung';
    const s = q.subTopic.trim() || 'Nội dung kiến thức';

    if (!topicMap.has(t)) {
      topicMap.set(t, new Map());
    }
    const subMap = topicMap.get(t)!;
    if (!subMap.has(s)) {
      subMap.set(s, []);
    }
    subMap.get(s)!.push(q);
  }

  const nlcCount = effectiveQuestions.filter((q) => q.partType === 'TN_NHIEU_LUA_CHON').length || 1;
  const dsCount = effectiveQuestions.filter((q) => q.partType === 'TN_DUNG_SAI').length || 1;
  const tlnCount = effectiveQuestions.filter((q) => q.partType === 'TN_TRA_LOI_NGAN').length || 1;
  const tlCount = effectiveQuestions.filter((q) => q.partType === 'TU_LUAN').length || 1;

  const unitScores: Record<PartType, number> = {
    TN_NHIEU_LUA_CHON: scoreConfig.scoreNhieuLuaChon / nlcCount,
    TN_DUNG_SAI: scoreConfig.scoreDungSai / dsCount,
    TN_TRA_LOI_NGAN: scoreConfig.scoreTraLoiNgan / tlnCount,
    TU_LUAN: scoreConfig.scoreTuLuan / tlCount,
  };

  const getQuestionScore = (q: QuestionItem): number => {
    return getQuestionDirectScore(q, unitScores[q.partType] !== undefined ? unitScores[q.partType] : 0);
  };

  const groupedTopics: GroupedTopic[] = [];
  let unitIndex = 1;

  for (const [topicName, subMap] of topicMap.entries()) {
    const units: MatrixRowUnit[] = [];

    for (const [subName, qList] of subMap.entries()) {
      const cells: MatrixRowUnit['cells'] = {
        TN_NHIEU_LUA_CHON: { BIET: [], HIEU: [], VAN_DUNG: [], VAN_DUNG_CAO: [] },
        TN_DUNG_SAI: { BIET: [], HIEU: [], VAN_DUNG: [], VAN_DUNG_CAO: [] },
        TN_TRA_LOI_NGAN: { BIET: [], HIEU: [], VAN_DUNG: [], VAN_DUNG_CAO: [] },
        TU_LUAN: { BIET: [], HIEU: [], VAN_DUNG: [], VAN_DUNG_CAO: [] },
      };

      const outcomes = {
        BIET: new Set<string>(),
        HIEU: new Set<string>(),
        VAN_DUNG: new Set<string>(),
        VAN_DUNG_CAO: new Set<string>(),
      };

      let subTotalScore = 0;
      let bCount = 0;
      let hCount = 0;
      let vdCount = 0;
      let vdcCount = 0;

      for (const q of qList) {
        if (cells[q.partType] && cells[q.partType][q.level]) {
          cells[q.partType][q.level].push(q);
        }

        if (q.level === 'BIET') {
          bCount++;
          if (q.expectedOutcome) outcomes.BIET.add(q.expectedOutcome);
        } else if (q.level === 'HIEU') {
          hCount++;
          if (q.expectedOutcome) outcomes.HIEU.add(q.expectedOutcome);
        } else if (q.level === 'VAN_DUNG_CAO') {
          vdcCount++;
          if (q.expectedOutcome) outcomes.VAN_DUNG_CAO.add(q.expectedOutcome);
        } else if (q.level === 'VAN_DUNG') {
          vdCount++;
          if (q.expectedOutcome) outcomes.VAN_DUNG.add(q.expectedOutcome);
        }

        const qScore = getQuestionScore(q);
        subTotalScore += qScore;
      }

      const totalExamScore =
        scoreConfig.scoreNhieuLuaChon +
        scoreConfig.scoreDungSai +
        scoreConfig.scoreTraLoiNgan +
        scoreConfig.scoreTuLuan;

      units.push({
        id: `unit-${unitIndex++}`,
        topic: topicName,
        subTopic: subName,
        cells,
        totalBiet: bCount,
        totalHieu: hCount,
        totalVanDung: vdCount,
        totalScore: Math.round(subTotalScore * 100) / 100,
        scorePercentage: Math.round((subTotalScore / (totalExamScore || 10)) * 100),
        outcomes: {
          BIET: Array.from(outcomes.BIET),
          HIEU: Array.from(outcomes.HIEU),
          VAN_DUNG: Array.from(outcomes.VAN_DUNG),
          VAN_DUNG_CAO: Array.from(outcomes.VAN_DUNG_CAO),
        },
      });
    }

    groupedTopics.push({
      topic: topicName,
      units,
    });
  }

  // Calculate grand totals across all groups directly from question scores
  const totals: MatrixTotals = {
    countNhieuLuaChon: { BIET: 0, HIEU: 0, VAN_DUNG: 0, VAN_DUNG_CAO: 0 },
    countDungSai: { BIET: 0, HIEU: 0, VAN_DUNG: 0, VAN_DUNG_CAO: 0 },
    countTraLoiNgan: { BIET: 0, HIEU: 0, VAN_DUNG: 0, VAN_DUNG_CAO: 0 },
    countTuLuan: { BIET: 0, HIEU: 0, VAN_DUNG: 0, VAN_DUNG_CAO: 0 },
    totalBiet: 0,
    totalHieu: 0,
    totalVanDung: 0,
    totalVanDungCao: 0,
    totalQuestions: questions.length,

    scoreNhieuLuaChon: 0,
    scoreDungSai: 0,
    scoreTraLoiNgan: 0,
    scoreTuLuan: 0,
    scoreBiet: 0,
    scoreHieu: 0,
    scoreVanDung: 0,
    scoreVanDungCao: 0,
    totalScore: 0,

    percentNhieuLuaChon: 0,
    percentDungSai: 0,
    percentTraLoiNgan: 0,
    percentTuLuan: 0,
    percentBiet: 0,
    percentHieu: 0,
    percentVanDung: 0,
    percentVanDungCao: 0,
  };

  for (const q of effectiveQuestions) {
    const qScore = getQuestionScore(q);

    if (q.partType === 'TN_NHIEU_LUA_CHON') {
      totals.countNhieuLuaChon[q.level]++;
      totals.scoreNhieuLuaChon += qScore;
    } else if (q.partType === 'TN_DUNG_SAI') {
      totals.countDungSai[q.level]++;
      totals.scoreDungSai += qScore;
    } else if (q.partType === 'TN_TRA_LOI_NGAN') {
      totals.countTraLoiNgan[q.level]++;
      totals.scoreTraLoiNgan += qScore;
    } else if (q.partType === 'TU_LUAN') {
      totals.countTuLuan[q.level]++;
      totals.scoreTuLuan += qScore;
    }

    if (q.level === 'BIET') {
      totals.totalBiet++;
      totals.scoreBiet += qScore;
    } else if (q.level === 'HIEU') {
      totals.totalHieu++;
      totals.scoreHieu += qScore;
    } else if (q.level === 'VAN_DUNG_CAO') {
      totals.totalVanDungCao++;
      totals.scoreVanDungCao += qScore;
    } else if (q.level === 'VAN_DUNG') {
      totals.totalVanDung++;
      totals.scoreVanDung += qScore;
    }
  }

  // Round scores to prevent float inaccuracies
  totals.scoreNhieuLuaChon = Math.round(totals.scoreNhieuLuaChon * 100) / 100;
  totals.scoreDungSai = Math.round(totals.scoreDungSai * 100) / 100;
  totals.scoreTraLoiNgan = Math.round(totals.scoreTraLoiNgan * 100) / 100;
  totals.scoreTuLuan = Math.round(totals.scoreTuLuan * 100) / 100;
  totals.scoreBiet = Math.round(totals.scoreBiet * 100) / 100;
  totals.scoreHieu = Math.round(totals.scoreHieu * 100) / 100;
  totals.scoreVanDung = Math.round(totals.scoreVanDung * 100) / 100;
  totals.scoreVanDungCao = Math.round(totals.scoreVanDungCao * 100) / 100;

  const grandTotalScore =
    Math.round(
      (totals.scoreNhieuLuaChon +
        totals.scoreDungSai +
        totals.scoreTraLoiNgan +
        totals.scoreTuLuan) *
        100
    ) / 100 || 10;

  totals.totalScore = grandTotalScore;

  totals.percentNhieuLuaChon = Math.round((totals.scoreNhieuLuaChon / grandTotalScore) * 100);
  totals.percentDungSai = Math.round((totals.scoreDungSai / grandTotalScore) * 100);
  totals.percentTraLoiNgan = Math.round((totals.scoreTraLoiNgan / grandTotalScore) * 100);
  totals.percentTuLuan = Math.round((totals.scoreTuLuan / grandTotalScore) * 100);

  totals.percentBiet = Math.round((totals.scoreBiet / grandTotalScore) * 100);
  totals.percentHieu = Math.round((totals.scoreHieu / grandTotalScore) * 100);
  totals.percentVanDung = Math.round((totals.scoreVanDung / grandTotalScore) * 100);
  totals.percentVanDungCao = Math.round((totals.scoreVanDungCao / grandTotalScore) * 100);

  return { groupedTopics, totals };
}

/**
 * Format string representation for an individual matrix cell:
 * CV 7991 Note 4: "Có ở trong một số ô của ma trận, thể hiện số câu hỏi hoặc câu hỏi số bao nhiêu."
 * E.g., "C1, C2" or "1 (C1)" or empty.
 */
export function formatMatrixCell(questions: QuestionItem[]): string {
  if (!questions || questions.length === 0) return '';
  const labels = questions.map((q) => {
    // Keep it short: "Câu 1" -> "C1", "Bài 1" -> "B1"
    const num = q.questionNumber.replace(/câu\s*/i, 'C').replace(/bài\s*/i, 'B');
    return num;
  });
  return labels.join(', ');
}

/**
 * Format string representation for an individual specification cell:
 * CV 7991 Note 6: "Có ở trong một số ô của bản đặc tả, ghi tắt tên của năng lực: (n) (NL?)"
 * User Prompt: "Trong từng câu hãy ghi năng lực toán toán học mà tôi gửi cho bạn"
 * E.g., "C1 (NLTD & LLTH), C2 (NLGTTH)"
 */
export function formatSpecCell(questions: QuestionItem[]): string {
  if (!questions || questions.length === 0) return '';
  return questions
    .map((q) => {
      const num = q.questionNumber.replace(/câu\s*/i, 'C').replace(/bài\s*/i, 'B');
      return `${num} (${q.competency})`;
    })
    .join(',\n');
}
