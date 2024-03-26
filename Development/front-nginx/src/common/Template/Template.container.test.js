import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import {
  getTheme,
  TemplateContainer,
  mapStateToProps,
} from "./Template.container";

jest.mock("../Icon/Icon", () => () => "Icon");
jest.mock("./Template", () => "template");

describe("Template container", () => {
  it("should return theme 'logged' when call getTheme with isAuthenticated is true", () => {
    // given
    const isAuthenticated = true;
    const accessToken = "asdfasdfasdf";
    // when
    const result = getTheme(isAuthenticated, accessToken);

    // then
    expect(result).toEqual({
      flexboxgrid: { gutterWidth: 1.5, outerMargin: 1.5 },
      main: "logged",
    });
  });

  it("should return theme 'notLogged' when call getTheme with isAuthenticated is false", () => {
    // given
    const isAuthenticated = false;
    const accessToken = "";
    // when
    const result = getTheme(isAuthenticated, accessToken);

    // then
    expect(result).toEqual({
      flexboxgrid: { gutterWidth: 1.5, outerMargin: 1.5 },
      main: "notLogged",
    });
  });

  it("mapStateToProps should return a object with user from passed state", () => {
    // given
    const state = {
      user: { isAuthenticated: false },
      session: { accessToken: "asdf" },
      modal: { showModal: false },
    };

    // when
    const result = mapStateToProps(state);

    // then
    expect(result).toEqual({
      isAuthenticated: false,
      accessToken: "asdf",
      showModal: false,
    });
  });

  it("should render it when not logged", () => {
    // given
    const renderer = new ShallowRenderer();
    const props = {
      history: {},
    };
    // when
    renderer.render(
      <TemplateContainer {...props}>
        <div id="test">Test</div>
      </TemplateContainer>,
    );
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("should render it when logged", () => {
    // given
    const renderer = new ShallowRenderer();
    const props = {
      isAuthenticated: true,
      accessToken: "asdf",
      history: {},
    };
    // when
    renderer.render(
      <TemplateContainer {...props}>
        <div id="test">Test</div>
      </TemplateContainer>,
    );
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
