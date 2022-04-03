import { ITeamScore } from "src/types";
import { newTeamScore, parseRanking } from "../src/utils/utils";

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
  let parsedScores = parseRanking(scores);
  console.log(parsedScores);

  expect(parseRanking).toBeCalled;
});
