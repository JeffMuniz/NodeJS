import queryStringParse from "./queryStringParse";

describe("Query String Parse - Util test", () => {
  it("should return query string parsed", () => {
    // given
    const queryString = "?test=testmock";

    // when
    const result = queryStringParse(queryString);

    // expect
    expect(result).toEqual({ test: "testmock" });
  });

  it("should not return query string parsed when args is incomplete", () => {
    // given
    const queryString = "?=44&teste=";

    // when
    const result = queryStringParse(queryString);

    // expect
    expect(result).toEqual(null);
  });

  it("should not return when there is no query string parsed", () => {
    // given
    const queryString = "";

    // when
    const result = queryStringParse(queryString);

    // expect
    expect(result).toEqual(null);
  });
});
