import React from "react";
import TestRenderer from "react-test-renderer";

import { TextAreaCpfs } from "./TextAreaCpfs";

const props = {
  onChange: jest.fn(),
  name: "teste",
  onBlur: jest.fn(),
};

describe("TextAreaCpfs", () => {
  it("Render Text Area", () => {
    const testRenderer = TestRenderer.create(<TextAreaCpfs {...props} />);
    const testInstance = testRenderer.root;
    const formInstance = testInstance.findByType(TextAreaCpfs).instance;

    expect(
      formInstance.inputParser({ key: "a", preventDefault: jest.fn() }),
    ).toBe(false);

    expect(
      formInstance.inputParser({ key: "Enter", preventDefault: jest.fn() }),
    ).toBe(true);

    const tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Render Text Area Error ", () => {
    const testRenderer = TestRenderer.create(
      <TextAreaCpfs hasError {...props} />,
    );

    const tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
