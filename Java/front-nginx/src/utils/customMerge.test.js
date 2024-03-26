import customMerge from "./customMerge";

describe("Custom Merge - Unit Test", () => {
  it("Should merge objects", () => {
    // given
    const oldObject = { x: "1" };
    const newObject = { y: "2", z: "3" };
    // when
    const result = customMerge(oldObject, newObject);
    // then
    expect(result).toMatchObject({ x: "1", y: "2", z: "3" });
  });

  it("Should return old object when new is empty", () => {
    // given
    const oldObject = { x: "1" };
    const newObject = {};
    // when
    const result = customMerge(oldObject, newObject);
    // then
    expect(result).toMatchObject({ x: "1" });
  });

  it("Should return new object when old is empty", () => {
    // given
    const oldObject = {};
    const newObject = { y: "2", z: "3" };
    // when
    const result = customMerge(oldObject, newObject);
    // then
    expect(result).toMatchObject({ y: "2", z: "3" });
  });

  it("Should return source object when two objects with same keys has been passed", () => {
    // given
    const objValue = { x: "2" };
    const srcValue = { x: "1" };
    // when
    const result = customMerge(objValue, srcValue);
    // then
    expect(result).toMatchObject({ x: "1" });
  });

  it("Should return source object when object value has been passed with empty property", () => {
    // given
    const objValue = { x: "" };
    const srcValue = { x: "1" };
    // when
    const result = customMerge(objValue, srcValue);
    // then
    expect(result).toMatchObject({ x: "1" });
  });

  it("Should return object value when empty source value has been passed with empty property", () => {
    // given
    const objValue = { x: "1" };
    const srcValue = { x: "" };
    // when
    const result = customMerge(objValue, srcValue);
    // then
    expect(result).toMatchObject({ x: "1" });
  });

  it("Should map property type object", () => {
    // given
    const objValue = { x: { y: "1", z: "" } };
    const srcValue = { x: { y: "1", z: "2" } };
    // when
    const result = customMerge(objValue, srcValue);
    // then
    expect(result).toMatchObject({ x: { y: "1", z: "2" } });
  });
});
