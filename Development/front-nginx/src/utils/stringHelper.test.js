import {
  containsString,
  toOnlyNumbers,
  toCPFMask,
  toCNPJMask,
  toRGMask,
} from "./stringHelper";

const originalString = "string";

describe("String Helper - Util test", () => {
  it("should return true when characters contained on original string are passed", () => {
    // given
    const expectedString = "tRi";

    // when
    const result = containsString(originalString, expectedString);

    // expect
    expect(result).toBe(true);
  });

  it("should return false when characters not contained on original string are passed", () => {
    // given
    const expectedString = "trig";

    // when
    const result = containsString(originalString, expectedString);

    // expect
    expect(result).toBe(false);
  });

  it("should return false when empty string is passed", () => {
    // given
    const expectedString = "";

    // when
    const result = containsString(originalString, expectedString);

    // expect
    expect(result).toBe(false);
  });

  it("should return a empty string when an empty string has been passed to toOnlyNumbers method", () => {
    // given
    const testString = "";
    const expectedString = "";

    // when
    const result = toOnlyNumbers(testString);

    // expect
    expect(result).toEqual(expectedString);
  });

  it("should return a empty string when an undefined has been passed to toOnlyNumbers method", () => {
    // given
    const expectedString = "";

    // when
    const result = toOnlyNumbers();

    // expect
    expect(result).toEqual(expectedString);
  });

  it("should return a string filled just with numbers when a string with letters and numbers has been passed", () => {
    // given
    const testString = "2o18";
    const expectedString = "218";

    // when
    const result = toOnlyNumbers(testString);

    // expect
    expect(result).toEqual(expectedString);
  });

  it("should return a string filled just with numbers when a string with letters, numbers and special characters has been passed", () => {
    // given
    const testString = "2 o - 1 @ 8 !";
    const expectedString = "218";

    // when
    const result = toOnlyNumbers(testString);

    // expect
    expect(result).toEqual(expectedString);
  });

  it("should return the same string when a filled just by number string has been passed", () => {
    // given
    const testString = "218";
    const expectedString = "218";

    // when
    const result = toOnlyNumbers(testString);

    // expect
    expect(result).toEqual(expectedString);
  });

  it("should return empty string when an empty gets passed to toCPFMask", () => {
    // given
    const testString = "";
    const expectedString = "";

    // when
    const result = toCPFMask(testString);

    // expect
    expect(result).toEqual(expectedString);
  });

  it("should return the same passed string when a string with less characters gets passed to toCPFMask", () => {
    // given
    const testString = "111";
    const expectedString = "111";

    // when
    const result = toCPFMask(testString);

    // expect
    expect(result).toEqual(expectedString);
  });

  it("should return masked cpf when a not masked cpf gets passed to toCPFMask", () => {
    // given
    const testString = "11111111111";
    const expectedString = "111.111.111-11";

    // when
    const result = toCPFMask(testString);

    // expect
    expect(result).toEqual(expectedString);
  });

  it("should return masked cpf when a masked cpf gets passed to toCPFMask", () => {
    // given
    const testString = "111.111.111-11";
    const expectedString = "111.111.111-11";

    // when
    const result = toCPFMask(testString);

    // expect
    expect(result).toEqual(expectedString);
  });

  it("should return empty string when an empty gets passed to toCNPJMask", () => {
    // given
    const testString = "";
    const expectedString = "";

    // when
    const result = toCNPJMask(testString);

    // expect
    expect(result).toEqual(expectedString);
  });

  it("should return the same passed string when a string with less characters gets passed to toCNPJMask", () => {
    // given
    const testString = "111";
    const expectedString = "111";

    // when
    const result = toCNPJMask(testString);

    // expect
    expect(result).toEqual(expectedString);
  });

  it("should return masked cpf when a not masked cpf gets passed to toCNPJMask", () => {
    // given
    const testString = "11111111111111";
    const expectedString = "11.111.111/1111-11";

    // when
    const result = toCNPJMask(testString);

    // expect
    expect(result).toEqual(expectedString);
  });

  it("should return masked cpf when a masked cpf gets passed to toCNPJMask", () => {
    // given
    const testString = "11.111.111/1111-11";
    const expectedString = "11.111.111/1111-11";

    // when
    const result = toCNPJMask(testString);

    // expect
    expect(result).toEqual(expectedString);
  });

  it("should return empty value when a undefined rg gets passed to toRGMask", () => {
    // given
    const testString = undefined;
    const expectedString = "";

    // when
    const result = toRGMask(testString);

    // expect
    expect(result).toEqual(expectedString);
  });

  it("should return unmasked RG when a string with its first eight characters contians letters gets passed to toRGMask", () => {
    // given
    const testString = "456xx8888899";
    const expectedString = "456xx8888899";

    // when
    const result = toRGMask(testString);

    // expect
    expect(result).toEqual(expectedString);
  });

  it("should return unmasked RG when a string with smaller than 8 characteres gets passed to toRGMask", () => {
    // given
    const testString = "45699";
    const expectedString = "45699";

    // when
    const result = toRGMask(testString);

    // expect
    expect(result).toEqual(expectedString);
  });

  it("should return masked RG when a string with just 9 numbers gets passed to toRGMask", () => {
    // given
    const testString = "356835839";
    const expectedString = "35.683.583-9";

    // when
    const result = toRGMask(testString);

    // expect
    expect(result).toEqual(expectedString);
  });
});
