import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import MyPayments from "./MyPayments";

jest.mock("@base", () => ({
  ContainerWrapper: "ContainerWrapper",
  WithPagination: "WithPagination",
  TableRow: "BaseDatailsRow",
  TableCol: "BaseDetailsCol",
  EmptyState: "EmptyState",
}));
jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  Tabs: "Tabs",
}));
jest.mock("react-styled-flexboxgrid");

const defaultProps = {
  invoices: {
    content: [
      {
        receivableId: 123,
        orderId: 456,
        cnpj: "54182052134003",
        amount: 59.35,
        dueDate: "2021-04-30",
        paymentType: "BOLETO",
        receivableStatus: "REGISTRADO",
        invoiceDate: "2021-01-30",
      },
    ],
  },
  invoicesRequestStatus: "success",
  handleClickRow: jest.fn(),
  onChangePage: jest.fn(),
  currentPage: 1,
  itemsPerPage: 1,
  totalItems: 1,
  fieldsToFilterByDate: [{}],
};
describe("Finances", () => {
  it("Should render Finances", () => {
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<MyPayments {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
