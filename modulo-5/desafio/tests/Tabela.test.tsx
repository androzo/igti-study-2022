import { render, screen } from "@testing-library/react";
import _ from "lodash";
import Tabela from "../src/components/Tabela";
import { MockedData } from "../src/services/mock";

test("render Tabela", async () => {
  render(<Tabela scores={MockedData} />);

  expect(screen.getByRole("table")).toHaveTextContent("Cruzeiro");
});
