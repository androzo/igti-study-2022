const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3/exchanges/";
const ITEMS_PER_PAGE = 100;
// "https://api.coingecko.com/api/v3/exchanges/?per_page=<itemsPorPagina>&page=<pageIndex>"

export interface IExchange {
  name: string;
  image: string;
  year_established: number;
  country: string;
  trust_score: number;
  trade_volume_24h_btc: number;
}

export const getDataFromApi = async (pageIndex: number) => {
  const data = await fetch(
    `${COINGECKO_BASE_URL}?per_page=${ITEMS_PER_PAGE}&page=${pageIndex}`
  ).then((resp) => resp.json());

  return data;
};
