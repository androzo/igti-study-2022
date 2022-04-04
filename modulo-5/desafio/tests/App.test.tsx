import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import * as api from "../src/services/api";
import App from "../src/App";
import axios from "axios";
import { MockedRawDataList } from "../src/services/mock";

const setReturnGetData = (mock: any) => {
  axios.get = jest.fn((): any =>
    Promise.resolve({
      data: () => Promise.resolve(mock),
    })
  );
};

describe("render application", () => {
  beforeAll(() => {
    setReturnGetData(MockedRawDataList);
  });

  it("should render App", async () => {
    render(<App />);
  });

  // it("should render API data", async () => {
  //   render(<App />);
  //   await screen.findByText("Vitória");
  // });

  it("should run useState and useEffect", () => {
    const useEffectSpy = jest.spyOn(React, "useEffect");
    const useStateSpy = jest.spyOn(React, "useState");

    render(<App />);

    expect(useEffectSpy).toHaveBeenCalledTimes(1);
    expect(useStateSpy).toHaveBeenCalledTimes(2);
    expect(screen.getByRole("combobox")).toHaveTextContent("2003");
  });

  it("should change year", async () => {
    const getDataSpy = jest.spyOn(api, "getData");
    render(<App />);
    const button = screen.getByRole("combobox");
    fireEvent.change(button, { target: { value: "2004" } });
    await waitFor(() => screen.getByRole("table"));
    expect(screen.getByRole("combobox")).toHaveTextContent("2004");
    expect(getDataSpy).toHaveBeenLastCalledWith("2004");
  });
});
