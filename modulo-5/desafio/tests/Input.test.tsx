import { render, screen } from "@testing-library/react";
import Input from "../src/components/Input";

test("render Input year option", async () => {
  render(<Input year="2003" onChange={() => {}} />);

  expect(screen.getByRole("combobox")).toHaveTextContent("2003");
});
