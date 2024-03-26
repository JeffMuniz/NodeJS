import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import VoucherSection from "./VouchersSection";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
}));

const defaultProps = {
  vouchers: [
    {
      id: "1",
      idProduct: "1",
      type: "food",
      printedName: "teste",
      issueDate: "01/01/2019",
      cardNumber: "1111 22xx xxxx 4444",
      activationDate: "Wed Sep 12 2018 15:00:04 GMT-0300",
    },
    {
      printedName: "teste",
      id: "1",
      idProduct: "1",
      type: "food",
      issueDate: "01/01/2019",
      cardNumber: "1111 22xx xxxx 4444",
      activationDate: "Wed Sep 12 2018 15:00:04 GMT-0300",
    },
    {
      printedName: "teste",
      id: "2",
      idProduct: "2",
      type: "meal",
      issueDate: "01/01/2019",
      cardNumber: "1111 22xx xxxx 4444",
      activationDate: "Wed Sep 12 2018 15:00:04 GMT-0300",
    },
  ],
  updateVouchers: jest.fn(),
  changeVoucherStatus: jest.fn(),
};

describe("Voucher Section - Unit Test", () => {
  it("Should render Voucher Section type food", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<VoucherSection {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
