import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import PrivateRoute from "./WithAuthentication";

jest.mock("../../scenes/Login/Login.container.js", () => <div>Login</div>);
jest.mock("react-router-dom");
jest.mock("@common", () => ({ Template: "Template" }));

describe("WithAuthentication - Unit Test", () => {
  it("Should render component with default props", () => {
    // given
    const renderer = new ShallowRenderer();
    const props = {
      exact: true,
      path: "/fake",
      computedMatch: {
        from: "/lorem",
        url: "/lorem",
      },
      component: () => <div>Home</div>,
    };

    // when
    renderer.render(<PrivateRoute {...props} />);
    const result = renderer.getRenderOutput();
    // then
    expect(result).toMatchSnapshot();
  });
});
