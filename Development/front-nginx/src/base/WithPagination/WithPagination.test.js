import React from "react";
import TestRenderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";

import { WithPagination } from "./WithPagination";

let props;
let testRenderer;
let instance;

jest.mock("./PaginationLabel", () => "GridPaginationLabel");
jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  Container: "ContainerWrapper",
  Button: "BaseButton",
}));
jest.mock("@base", () => ({
  SearchableInput: "SearchableInput",
}));

describe("WithPagination - Component", () => {
  beforeEach(() => {
    props = {
      fieldsToFilterBy: [],
      data: {
        totalItems: 1,
      },
      filterBy: {},
      callback: jest.fn(),
      itemsPerPage: 10,
      showTopLabel: false,
      render: jest.fn().mockImplementation(() => <p>body</p>),
      orderComponent: jest.fn().mockImplementation(() => <p>header</p>),
      selectedCompany: { id: 1 },
      onClickNewChargeback: jest.fn(),
    };

    testRenderer = TestRenderer.create(<WithPagination {...props} />);
    instance = testRenderer.getInstance();

    instance.setState = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render WithPagination", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<WithPagination {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("Should return firstItem number when totalItems was passed to mount pagination label", () => {
    // when
    const result = instance.getFirstItemNumber();

    // then
    expect(result).toEqual(1);
  });

  it("Should return zero as firstItem number when totalItems not was passed to mount pagination label", () => {
    // given
    const newProps = {
      ...props,
      data: {},
    };
    testRenderer.update(<WithPagination {...newProps} />);

    // when
    const result = instance.getFirstItemNumber();

    // then
    expect(result).toEqual(0);
  });

  it("Should return lastItem number when totalItems was passed to mount pagination label", () => {
    // given
    const newProps = {
      ...props,
      data: { totalItems: 100 },
    };
    testRenderer.update(<WithPagination {...newProps} />);

    // when
    const result = instance.getLastItemNumber();

    // then
    expect(result).toEqual(10);
  });
  it("Should return zero as lastItem number when totalItems not was passed to mount pagination label", () => {
    // given
    const newProps = {
      ...props,
      data: {},
    };
    testRenderer.update(<WithPagination {...newProps} />);

    // when
    const result = instance.getLastItemNumber(props);

    // then
    expect(result).toEqual(0);
  });

  it("instance.handleCallCallback should to be called when pass a valid page to foward", () => {
    // given
    const type = "forward";
    instance.handleCallCallback = jest.fn();

    // when
    instance.handleChangePage(type);

    // then
    expect(instance.setState).toBeCalledWith(
      {
        currentPage: 2,
      },
      instance.handleCallCallback(),
    );
    expect(instance.handleCallCallback).toBeCalled();
  });

  it("instance.handleCallCallback should to be called when pass a valid page to backward", () => {
    // given
    const type = "backward";
    instance.handleCallCallback = jest.fn();

    // when
    instance.handleChangePage(type);

    // then
    expect(instance.setState).toBeCalledWith(
      {
        currentPage: 0,
      },
      instance.handleCallCallback(),
    );
    expect(instance.handleCallCallback).toBeCalled();
  });

  it("canGoBack should return true when currentPage is valid", () => {
    // given
    instance.state = {
      ...instance.state,
      currentPage: 2,
    };

    // when
    const result = instance.canGoBack();

    // then
    expect(result).toBeTruthy();
  });
  it("canGoBack should return false when currentPage is invalid", () => {
    // given
    instance.state = {
      ...instance.state,
      currentPage: 1,
    };

    // when
    const result = instance.canGoBack();

    // then
    expect(result).toBeFalsy();
  });

  it("canGoForward should return true when currentPage is valid", () => {
    // given
    const newProps = {
      ...props,
      data: {
        totalItems: 100,
      },
    };
    testRenderer.update(<WithPagination {...newProps} />);
    instance.state = {
      ...instance.state,
      currentPage: 2,
    };

    // when
    const result = instance.canGoForward();

    // then
    expect(result).toBeTruthy();
  });

  it("canGoForward should return false when currentPage is invalid", () => {
    // given
    const newProps = {
      ...props,
      data: {
        totalItems: 20,
      },
    };
    testRenderer.update(<WithPagination {...newProps} />);
    instance.state = {
      ...instance.state,
      currentPage: 2,
    };

    // when
    const result = instance.canGoForward();

    // then
    expect(result).toBeFalsy();
  });
});
