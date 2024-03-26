import React from "react";
import Renderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";

import { createMockStore } from "src/redux/configureMockStore";

import withAuthorization, { FINANCIAL_PROFILE_ID } from "./WithAuthorization";

describe("WithAuthorizarion - Unit Test", () => {
  let WithAuthorization = null;

  const defaultProps = {
    store: createMockStore({
      user: {
        profile: {
          profiles: [{ id: 1, descricao: "master" }],
        },
      },
    }),
  };

  beforeEach(() => {
    WithAuthorization = withAuthorization(() => <div>Home</div>, [
      FINANCIAL_PROFILE_ID,
    ]);
  });

  it("Should render component with default props", () => {
    // given
    const renderer = new ShallowRenderer();
    // when
    renderer.render(<WithAuthorization {...defaultProps} />);
    const result = renderer.getRenderOutput();
    // then
    expect(result).toMatchSnapshot();
  });

  it("Should render component when user has master profile", () => {
    // given
    const instance = Renderer.create(
      <WithAuthorization {...defaultProps} />,
    ).getInstance();
    // then
    expect(instance.selector.props.userData.profiles).toMatchObject([
      { id: 1, descricao: "master" },
    ]);
  });

  it("Shouldn't render component when user has no required profile", () => {
    // given
    const props = {
      store: createMockStore({
        user: {
          profile: {
            profiles: [{ id: 23, descricao: "fake" }],
          },
        },
      }),
    };
    const instance = Renderer.create(
      <WithAuthorization {...props} />,
    ).getInstance();
    // then
    expect(instance.selector.props.userData.profiles).toMatchObject([
      { id: 23, descricao: "fake" },
    ]);
  });

  it("Should render component when user has atleast one required profile", () => {
    // given
    const props = {
      store: createMockStore({
        user: {
          profile: {
            profiles: [{ id: 2, descricao: "financial" }],
          },
        },
      }),
    };
    const instance = Renderer.create(
      <WithAuthorization {...props} />,
    ).getInstance();
    // then
    expect(instance.selector.props.userData.profiles).toMatchObject([
      { id: 2, descricao: "financial" },
    ]);
  });
});
