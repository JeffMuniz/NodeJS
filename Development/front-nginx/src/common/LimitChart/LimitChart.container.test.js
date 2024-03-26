import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import { LimitChartContainer } from "./LimitChart.container";

jest.mock("./LimitChart", () => "LimitChart");

let defaultProps;

beforeEach(() => {
  defaultProps = {
    selectedGroup: {
      ordersLimit: {
        percentage: 6.7,
        availableValue: 932077.12,
        usedLimit: 67922.88,
        totalLimit: 1000000,
        checkForLimit: true,
      },
    },
    getOrdersLimit: jest.fn(),
    userId: "1",
    hasBorderTop: false,
  };
  jest.clearAllMocks();
});

describe("LimitChartContainer container", () => {
  it("should render it", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<LimitChartContainer {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("should not render LimitChartContainer if checkForLimit is false", () => {
    // given
    const props = {
      selectedGroup: {
        ordersLimit: {
          percentage: 0,
          availableValue: 0,
          usedLimit: 0,
          totalLimit: 0,
          checkForLimit: false,
        },
      },
      hasBorderTop: false,
      getOrdersLimit: jest.fn(),
      userId: "1",
    };
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<LimitChartContainer {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).tomacull();
  });
});
