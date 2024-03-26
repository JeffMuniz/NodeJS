import navigate from "./navigate.js"; // eslint-disable-line

import { NAVIGATION_TYPE } from "./consts";

describe("[Web] Routes - Navigate", () => {
  it("should call navigator pushing new route", () => {
    // given
    const navigator = {
      push: jest.fn(),
    };
    const WebPaths = {
      "Example.Abc": "/abc",
    };
    const options = {
      route: "Example.Abc",
      data: { a: 1, b: 2 },
    };

    // when
    navigate(navigator, options, { WebPaths });

    // then
    expect(navigator.push).toBeCalledWith({
      pathname: WebPaths[options.route],
      state: options.data,
    });
  });

  it("should call navigator going back to previous route", () => {
    // given
    const navigator = {
      goBack: jest.fn(),
    };
    const options = {
      type: NAVIGATION_TYPE.BACK,
    };

    // when
    navigate(navigator, options);

    // then
    expect(navigator.goBack).toBeCalled();
  });
});
