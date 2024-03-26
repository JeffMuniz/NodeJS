import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import TestRenderer from "react-test-renderer";
import { NavBarContainer, mapStateToProps } from "./NavBar.container";

jest.mock("./NavBar", () => "NavBar");
jest.mock("../GroupSelect/GroupSelect.container", () => "GroupSelect");
jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
}));

let defaultProps = null;
let testRenderer = null;
let instance = null;

beforeEach(() => {
  defaultProps = {
    isAuthenticated: false,
    userData: { name: "User Test" },
    resetAuth: jest.fn(),
    history: {
      location: {
        pathname: "/",
      },
      listen: jest.fn(),
    },
    openModal: jest.fn(),
    deliveryType: "HR",
  };
  testRenderer = TestRenderer.create(<NavBarContainer {...defaultProps} />);
  instance = testRenderer.getInstance();
});

describe("NavBar container", () => {
  it("should render it", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<NavBarContainer {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("should render navbarcontainer with userData empty", () => {
    // given
    const renderer = new ShallowRenderer();
    const props = {
      ...defaultProps,
      isAuthenticated: false,
      userData: {},
      resetAuth: jest.fn(),
      history: {},
      openModal: jest.fn(),
      deliveryType: "HR",
    };

    // when
    renderer.render(<NavBarContainer {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("should toggle isDropDownOpen when toggleDropDown is called", () => {
    // given

    // when
    instance.toggleDropDown();

    // then
    expect(instance.state.isDropDownOpen).toBeTruthy();

    // when
    instance.toggleDropDown();

    // then
    expect(instance.state.isDropDownOpen).not.toBeTruthy();
  });

  it("mapStateToProps should return a object with user from passed state", () => {
    // given
    const state = {
      user: { isAuthenticated: false },
      group: {
        groupState: { groupList: [] },
      },
      selectedCompanyTree: {
        selectedGroup: {
          params: { deliveryType: "HR" },
        },
      },
    };

    // when
    const result = mapStateToProps(state);

    // then
    expect(result).toEqual({
      isAuthenticated: false,
      groupList: [],
      deliveryType: "HR",
    });
  });
});
