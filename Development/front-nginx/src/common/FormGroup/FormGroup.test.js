import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import TestRenderer from "react-test-renderer";

import { ErrorText, LabelText } from "./FormGroup.styles";
import FormGroup from "./FormGroup.js";

describe("FormGroup", () => {
  it("should render it with default props", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(
      <FormGroup fieldId="test">
        <div id="test">Test</div>
      </FormGroup>,
    );
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("should render Label when label is given", () => {
    // given
    const props = {
      label: "Label Teste",
      fieldId: "test",
    };

    // when
    const testRenderer = TestRenderer.create(
      <FormGroup {...props}>
        <div id="test">Test</div>
      </FormGroup>,
    );
    const instance = testRenderer.root;
    const label = instance.findAllByType(LabelText);

    // then
    expect(label).toHaveLength(1);
  });

  it("should render Error when error is given", () => {
    // given
    const props = {
      error: "Error Teste",
      fieldId: "test",
    };

    // when
    const testRenderer = TestRenderer.create(
      <FormGroup {...props}>
        <div id="test">Test</div>
      </FormGroup>,
    );
    const instance = testRenderer.root;
    const errors = instance.findAllByType(ErrorText);

    // then
    expect(errors).toHaveLength(1);
  });
});
