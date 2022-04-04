import { IRodadaList, ITeamScore } from "src/types";
import { extractScores, newTeamScore, parseRanking } from "../src/utils/utils";
import { MockedRawData } from "../src/services/mock";

test("should create a empty team score", () => {
  let score = newTeamScore();

  expect(score.ranking).toBe(0);
  expect(score.team_name).toBe("");
  expect(score.total_score).toBe(0);
  expect(score.wins).toBe(0);
  expect(score.loses).toBe(0);
  expect(score.draws).toBe(0);
  expect(score.goals_scored).toBe(0);
  expect(score.goals_taken).toBe(0);
  expect(score.goals_balance).toBe(0);
});

test("should parse rankings", () => {
  let scores: ITeamScore[] = [newTeamScore(), newTeamScore(), newTeamScore()];
  // set mocked scores unsorted
  scores[0].total_score = 50;
  scores[1].total_score = 10;
  scores[2].total_score = 100;

  parseRanking(scores);

  expect(parseRanking).toBeCalled;
  expect(scores[0].ranking).toBe(1);
  expect(scores[1].ranking).toBe(2);
  expect(scores[2].ranking).toBe(3);
});

test("should extract scores", () => {
  let rawScores: IRodadaList = MockedRawData;
  let extractedScores = extractScores(rawScores);

  expect(extractScores).toBeCalled;
  expect(Array.isArray(extractedScores)).toBe(true);
  expect(extractedScores[0].id).toBeDefined();
  expect(extractedScores[0].id).toBeDefined();

  extractedScores.map((score) => {
    expect(score.team_name).toBeDefined();
    expect(score.total_score).toBeDefined();
    expect(score.goals_scored).toBeDefined();
    expect(score.goals_taken).toBeDefined();
    expect(score.goals_balance).toBeDefined();
    expect(score.total_score).toBeDefined();
    expect(score.draws).toBeDefined();
    expect(score.loses).toBeDefined();
    expect(score.wins).toBeDefined();
  });
});
