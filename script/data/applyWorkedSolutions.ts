import * as fs from "fs";
import { fileURLToPath } from "url";
import type { PracticeMcqQuestion, WorkedSolution } from "@shared/models/practice";

type WorkedSolutionSource = Record<string, Record<string, Partial<WorkedSolution>>>;

const SOURCE_PATH = fileURLToPath(new URL("./workedSolutions.json", import.meta.url));
const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];

let cached: WorkedSolutionSource | null = null;

function loadSource(): WorkedSolutionSource {
  if (!cached) {
    cached = JSON.parse(fs.readFileSync(SOURCE_PATH, "utf8")) as WorkedSolutionSource;
  }
  return cached;
}

/**
 * Overwrites `workedSolution` on each question with the step-by-step version
 * from workedSolutions.json (extracted from the SMASHMED worked-solutions doc).
 *
 * - Questions the doc gives no "Answer:" line for keep the answer already in the seed.
 * - The answer letter always follows the seed's `correctOptionIndex`, since option
 *   order in the app can differ from the doc.
 */
export function applyWorkedSolutions(questions: PracticeMcqQuestion[], key: string): void {
  const source = loadSource()[key];
  if (!source) throw new Error(`No worked solutions found for "${key}"`);

  for (const question of questions) {
    const doc = source[question.id];
    if (!doc?.steps) continue;

    const letter = OPTION_LETTERS[question.correctOptionIndex];
    let answer = doc.answer ?? question.workedSolution?.answer ?? letter;
    answer = answer.replace(/^[A-F](?=\b)/, letter);

    const solution: WorkedSolution = { steps: doc.steps, answer };
    if (doc.answerIndex !== undefined) solution.answerIndex = doc.answerIndex;
    question.workedSolution = solution;
  }
}
