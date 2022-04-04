import { render, screen } from "@testing-library/react";
import _ from "lodash";
import DataTable from "../src/components/DataTable";
import { MockedData } from "../src/services/mock";

test("render DataTable", async () => {
  render(<DataTable scores={MockedData} />);

  expect(screen.getByRole("table")).toHaveTextContent("Cruzeiro");
});
