import { getData } from "../src/services/api";

describe("it should fetch data from the API", () => {
  it("should have called", () => {
    expect(getData("2003")).toBeCalled;
  });

  it("should resolve the promise", () => {
    expect(getData("2003").then((r) => r.data)).resolves;
  });

  it("should contain 46 matches", () => {
    expect(getData("2003").then((r) => r.data)).resolves.toHaveLength(46);
  });

  it("should contain 46 matches", () => {
    expect(getData("2003").then((r) => r.data)).resolves.toHaveLength(46);
  });
});
