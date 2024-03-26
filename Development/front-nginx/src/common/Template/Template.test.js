import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { Provider } from "react-redux";

import TemplateWithTheme, { Template } from "./Template.js";
import { createMockStore } from "../../redux/configureMockStore";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  Container: "Container",
  Toast: "Toast",
}));

jest.mock("@base", () => ({
  Modal: "Modal",
  Warning: "Warning",
}));

const defaultProps = {
  theme: {
    main: "test",
  },
  location: { pathname: "" },
  history: {},
};

describe("Template", () => {
  it("should render it with default props", () => {
    // given
    const renderer = new ShallowRenderer();

    const store = {
      selectedCompanyTree: {
        selectedGroup: { id: 0 },
      },
    };
    // when
    renderer.render(
      <Provider store={createMockStore(store)}>
        <TemplateWithTheme {...defaultProps}>
          <div id="test">Test</div>
        </TemplateWithTheme>
      </Provider>,
    );
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("should render template with default props", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(
      <Template {...defaultProps}>
        <div id="test">Test</div>
      </Template>,
    );
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
