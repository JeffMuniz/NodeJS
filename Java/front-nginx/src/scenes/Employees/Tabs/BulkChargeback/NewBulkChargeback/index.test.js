import React from "react";
import TestRenderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";
import Container from "./";

jest.mock("./Steps", () => ({
  Request: () => <div>Request</div>,
  Validation: () => <div>Validation</div>,
  Review: () => <div>Review</div>,
}));

const props = {
  goBackToDetails: jest.fn(),
  onClickBack: jest.fn(),
};

describe("NewBulkChargeback - index", () => {
  it("Should render index", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<Container {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("Should change page when clicked goFoward", () => {
    // given
    const testRenderer = TestRenderer.create(<Container {...props} />);
    const testInstance = testRenderer.root;
    const compInstance = testRenderer.getInstance();

    const element = testInstance.findByType("div");

    expect(element.props.children).toEqual("Request");

    compInstance.onClickGoForwardHandler();

    const element2 = testInstance.findByType("div");

    expect(element2.props.children).toEqual("Validation");
  });
});
