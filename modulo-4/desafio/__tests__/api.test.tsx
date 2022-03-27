import { IExchange } from "../services/api";
import Home from "../pages";
import { render, screen } from "@testing-library/react";

const setFetchReturnData = (data: IExchange[]) => {
  // making the default fetch to return a mocked response
  global.fetch = jest.fn((): any =>
    Promise.resolve({
      json: (): any => Promise.resolve(data),
    })
  );
};

describe("Fetch data from API", () => {
  beforeAll(() => {
    setFetchReturnData([
      {
        name: "Binance",
        year_established: 2017,
        country: "Cayman Islands",
        image: "test",
        trust_score: 100,
        trade_volume_24h_btc: 123,
      },
    ]);
  });

  it("should render", () => {
    render(<Home />);
  });

  it("should render API data", async () => {
    render(<Home />);
    await screen.findByText("Binance");
  });
});
