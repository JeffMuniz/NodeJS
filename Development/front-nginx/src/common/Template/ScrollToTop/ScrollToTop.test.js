import React from "react";
import TestRenderer from "react-test-renderer";
import { ScrollToTop } from "./ScrollToTop";

jest.mock("../../Icon/Icon", () => () => "Icon");
jest.mock("react-router-dom");

window.scrollTo = jest.fn();
let testRenderer = null;
let defaultProps = {};
let instance = null;

beforeEach(() => {
  defaultProps = {
    children: "<div id='test'>Test</div>",
    location: { pathname: "/" },
  };

  testRenderer = TestRenderer.create(<ScrollToTop {...defaultProps} />);
  instance = testRenderer.getInstance();
});

describe("ScrollToTop", () => {
  it("should execute scrollTo when ScrollToTop update", () => {
    // given
    const props = { ...defaultProps, location: { pathname: "/test" } };
    instance.render = jest.fn();

    // when
    testRenderer.update(<ScrollToTop {...props} />);

    // then
    expect(instance.render).toBeCalled();
  });

  it("should not execute scrollTo when ScrollToTop update", () => {
    // given
    instance.render = jest.fn();
    // when
    testRenderer.update(<ScrollToTop {...defaultProps} />);

    // then
    expect(instance.render).toBeCalled();
  });
});
