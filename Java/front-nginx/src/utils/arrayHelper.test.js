import { removeDuplicated } from "./arrayHelper";

describe("Array Helper", () => {
  it("Should remove duplicated itens in array", () => {
    // given
    const arr = [
      { x: 1 },
      { x: 1 },
      { x: 2 },
      { x: 2 },
      { x: 3 },
      { x: 3 },
      { x: 4 },
      { x: 4 },
      { x: 5 },
      { x: 5 },
      { x: 6 },
      { x: 6 },
    ];
    const expected = [
      { x: 1 },
      { x: 2 },
      { x: 3 },
      { x: 4 },
      { x: 5 },
      { x: 6 },
    ];

    // when
    const result = removeDuplicated(arr, "x");

    // then
    expect(result).toMatchObject(expected);
  });

  it("Should return empty array when nothing is passed to removeDuplicated", () => {
    // given
    const arr = [];
    const expected = [];

    // when
    const result = removeDuplicated(arr);

    // then
    expect(result).toMatchObject(expected);
  });
});
