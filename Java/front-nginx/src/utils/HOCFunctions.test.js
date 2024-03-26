import { getDisplayName } from "./HOCFunctions";

describe("High Order Component Function - Unit Test", () => {
  it("Should return default HOC name", () => {
    // given
    const name = getDisplayName({});
    // then
    expect(name).toBe("Component");
  });

  it("Should return passed HOC displayName", () => {
    // given
    const name = getDisplayName({ displayName: "displayName" });
    // then
    expect(name).toBe("displayName");
  });

  it("Should return passed HOC name", () => {
    // given
    const name = getDisplayName({ name: "name" });
    // then
    expect(name).toBe("name");
  });
});
