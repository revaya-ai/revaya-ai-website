export type QuizResult = {
  score: number;
  tier: 1 | 2 | 3;
  gaps: number[];
};

export function scoreQuiz(answers: Record<number, boolean>): QuizResult {
  const yesIds = Object.entries(answers)
    .filter(([, val]) => val)
    .map(([id]) => Number(id));
  const noIds = Object.entries(answers)
    .filter(([, val]) => !val)
    .map(([id]) => Number(id));
  const score = yesIds.length;
  const tier: 1 | 2 | 3 = score <= 2 ? 1 : score <= 4 ? 2 : 3;
  return { score, tier, gaps: noIds };
}
