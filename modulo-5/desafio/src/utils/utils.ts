import { uniqueId } from "lodash";
import { IRodada, IRodadaList, ITeamScore } from "../types";

export const newTeamScore = (): ITeamScore => {
  return {
    id: uniqueId(),
    ranking: 0,
    team_name: "",
    total_score: 0,
    wins: 0,
    loses: 0,
    draws: 0,
    goals_scored: 0,
    goals_taken: 0,
    goals_balance: 0,
  };
};

export const parseRanking = (scores: ITeamScore[]) => {
  scores.sort((a, b) => b.total_score - a.total_score);
  return scores.map((score, index) => {
    score.ranking = index + 1;
  });
};

export const extractScores = (obj: IRodadaList | undefined) => {
  let scores: ITeamScore[] = [];

  obj?.partidas.map((partida: IRodada) => {
    let score_visitante: ITeamScore = newTeamScore();
    let score_mandante: ITeamScore = newTeamScore();

    score_mandante.team_name = partida.mandante;
    score_mandante.total_score = partida.pontuacao_geral_mandante.total_pontos;
    score_mandante.goals_scored =
      partida.pontuacao_geral_mandante.total_gols_marcados;
    score_mandante.goals_taken =
      partida.pontuacao_geral_mandante.total_gols_sofridos;
    score_mandante.goals_balance =
      partida.pontuacao_geral_mandante.total_gols_marcados -
      partida.pontuacao_geral_mandante.total_gols_sofridos;
    score_mandante.total_score = partida.pontuacao_geral_mandante.total_pontos;
    score_mandante.draws = partida.pontuacao_geral_mandante.total_empates;
    score_mandante.loses = partida.pontuacao_geral_mandante.total_derrotas;
    score_mandante.wins = partida.pontuacao_geral_mandante.total_vitorias;

    score_visitante.team_name = partida.visitante;
    score_visitante.total_score =
      partida.pontuacao_geral_visitante.total_pontos;
    score_visitante.goals_scored =
      partida.pontuacao_geral_visitante.total_gols_marcados;
    score_visitante.goals_taken =
      partida.pontuacao_geral_visitante.total_gols_sofridos;
    score_visitante.goals_balance =
      partida.pontuacao_geral_visitante.total_gols_marcados -
      partida.pontuacao_geral_visitante.total_gols_sofridos;
    score_visitante.total_score =
      partida.pontuacao_geral_visitante.total_pontos;
    score_visitante.draws = partida.pontuacao_geral_visitante.total_empates;
    score_visitante.loses = partida.pontuacao_geral_visitante.total_derrotas;
    score_visitante.wins = partida.pontuacao_geral_visitante.total_vitorias;

    scores.push(score_mandante);
    scores.push(score_visitante);
  });

  parseRanking(scores);
  return scores;
};
