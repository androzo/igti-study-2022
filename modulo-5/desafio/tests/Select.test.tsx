import { render, screen } from "@testing-library/react";
import Select from "../src/components/Select";

test("render Select year option", async () => {
  render(<Select year="2003" onChange={() => {}} />);

  expect(screen.getByRole("button")).toHaveTextContent("2003");
});
