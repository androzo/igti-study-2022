import { render, screen } from "@testing-library/react";
import Header from "../src/components/Header";

test("render Header message", async () => {
  render(<Header />);

  expect(screen.queryByText("desafio-final")).toHaveTextContent(
    "desafio-final"
  );
});
