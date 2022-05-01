export const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3/exchanges/";
export const ITEMS_PER_PAGE = 100;
// "https://api.coingecko.com/api/v3/exchanges/?per_page=<itemsPorPagina>&page=<pageIndex>"

export interface IExchange {
  id: string;
  name: string;
  year_established: number;
  country: string;
  description: string;
  url: string;
  image: string;
  has_trading_incentive: boolean;
  trust_score: number;
  trust_score_rank: number;
  trade_volume_24h_btc: number;
  trade_volume_24h_btc_normalized: number;
}

export const getDataFromApi = async (pageIndex: number) => {
  return await fetch(
    `${COINGECKO_BASE_URL}?per_page=${ITEMS_PER_PAGE}&page=${pageIndex}`
  ).then((resp) => resp.json());
};

export const getAllDataFromApi = async () => {
  return await fetch(COINGECKO_BASE_URL).then((resp) => resp.json());
};
