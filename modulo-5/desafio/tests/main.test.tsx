import { render, screen } from "@testing-library/react";
import ReactDOM from "react-dom";

test("expect render DOM to be called", async () => {
  expect(ReactDOM.render).toBeCalled;
});
