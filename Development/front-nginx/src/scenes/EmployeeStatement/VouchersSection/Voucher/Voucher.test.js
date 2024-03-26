import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import Voucher from "./Voucher";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
}));

const defaultProps = {
  id: "x",
  idProduct: "y",
  changeVoucherStatus: jest.fn(),
  cardNumber: "1111 22xx xxxx 4444",
  statusDate: "Wed Sep 12 2018 15:00:04 GMT-0300",
  updateVouchers: jest.fn(),
  statusName: "Normal",
};

describe("Voucher - Unit Test", () => {
  it("Should render Voucher type food", () => {
    // given
    const renderer = new ShallowRenderer();
    const props = {
      ...defaultProps,
      type: "food",
      idProduct: "1",
      index: 0,
      handleToggleBlockModal: jest.fn(),
      handleToggleNewVoucherModal: jest.fn(),
    };

    // when
    renderer.render(<Voucher {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("Should render Voucher type meal", () => {
    // given
    const renderer = new ShallowRenderer();
    const props = {
      ...defaultProps,
      type: "meal",
      idProduct: "2",
      index: 0,
      handleToggleBlockModal: jest.fn(),
      handleToggleNewVoucherModal: jest.fn(),
    };

    // when
    renderer.render(<Voucher {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
