export interface IRodadaList {
  numero: number;
  partidas: IRodada[];
}

export interface IRodada {
  visitante: string;
  resultado: string;
  data_partida: string;
  pontuacao_geral_mandante: IScore;
  placar_visitante: number;
  hora_partida: string;
  mandante: string;
  placar_mandante: number;
  estadio: string;
  pontuacao_geral_visitante: IScore;
}

export interface ITeamScore {
  id: string;
  ranking: number;
  team_name: string;
  total_score: number;
  wins: number;
  loses: number;
  draws: number;
  goals_scored: number;
  goals_taken: number;
  goals_balance: number;
}

export interface IScore {
  derrotas_casa: number;
  derrotas_fora_casa: number;
  empates_casa: number;
  empates_fora_casa: number;
  gols_casa: number;
  gols_fora_casa: number;
  jogos_casa: number;
  jogos_fora_casa: number;
  pontos_casa: number;
  pontos_fora_casa: number;
  total_derrotas: number;
  total_empates: number;
  total_gols_marcados: number;
  total_gols_sofridos: number;
  total_jogos: number;
  total_pontos: number;
  total_vitorias: number;
  vitorias_casa: number;
  vitorias_fora_casa: number;
}
