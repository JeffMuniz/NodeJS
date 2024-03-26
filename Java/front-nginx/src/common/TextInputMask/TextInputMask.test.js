import React from "react";
import TestRenderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";

import { masks } from "@enums";
import TextInputMask from "./TextInputMask.js";

let testRenderer = null;
let instance = null;
let props = null;

jest.mock("react-input-mask");

beforeEach(() => {
  props = {
    id: "x",
    onChange: jest.fn(),
    onBlur: jest.fn(),
    maskType: "cel-phone",
  };

  testRenderer = TestRenderer.create(<TextInputMask {...props} />);
  instance = testRenderer.getInstance();
});

describe("TextInputMask Component", () => {
  it("should render it", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<TextInputMask {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  describe("receive props", () => {
    it("should set correct mask when type equal phone_9", () => {
      // given
      props = {
        ...props,
        value: "11988440333",
        maskType: "cel-phone",
      };

      // when
      testRenderer.update(<TextInputMask {...props} />);

      // then
      expect(instance.state.mask).toEqual(masks.phone_9);
    });

    it("should change state value", () => {
      // given
      props = {
        ...props,
        value: "",
        maskType: "cnpj",
      };

      // when
      testRenderer.update(<TextInputMask {...props} />);

      // then
      expect(instance.state.value).toEqual(props.value);
      expect(instance.state.mask).toEqual(masks[props.maskType]);
    });

    it("should set correct mask when type equal cel-phone", () => {
      // given
      props = {
        ...props,
        value: "1198440333",
        maskType: "cel-phone",
      };

      // when
      testRenderer.update(<TextInputMask {...props} />);

      // then
      expect(instance.state.mask).toEqual(masks[props.maskType]);
    });
  });
});
