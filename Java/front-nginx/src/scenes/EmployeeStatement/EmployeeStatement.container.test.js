// import React from "react";
// import ShallowRenderer from "react-test-renderer/shallow";
// import TestRenderer from "react-test-renderer";

import {
  // EmployeeStatementContainer,
  mapStateToProps,
} from "./EmployeeStatement.container";

jest.mock("./EmployeeStatement", () => "EmployeeStatement");
jest.mock("./EmployeeEditFormModal", () => "EmployeeEditFormModal");

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
}));

// const defaultProps = {
//   dispatch: jest.fn(),
//   match: { params: { employeeCPF: "33300088899" } },
// };

describe("Employee Statement Container - Unit Tests", () => {
  // it("Should render container with default props", async () => {
  //   // given
  //   const renderer = new ShallowRenderer();
  //   // when
  //   await renderer.render(<EmployeeStatementContainer {...defaultProps} />);
  //   const result = await renderer.getRenderOutput();
  //   // then
  //   expect(result).toMatchSnapshot();
  // });

  // it("Should dispatch all actions when component did mount", () => {
  //   // given
  //   const renderer = TestRenderer.create(
  //     <EmployeeStatementContainer {...defaultProps} />
  //   );
  //   const instance = renderer.getInstance();

  //   // then
  //   expect(instance.props.dispatch).toBeCalled();
  // });

  // it("Should return return null when handleReturn gets called", () => {
  //   // given
  //   const renderer = TestRenderer.create(
  //     <EmployeeStatementContainer {...defaultProps} />
  //   );
  //   const instance = renderer.getInstance();
  //   // when
  //   const result = instance.handleReturn();
  //   // then
  //   expect(result).tomacull();
  // });

  // it("Should return return null when handleEditAccount gets called", () => {
  //   // given
  //   const renderer = TestRenderer.create(
  //     <EmployeeStatementContainer {...defaultProps} />
  //   );
  //   const instance = renderer.getInstance();
  //   // when
  //   const result = instance.handleEditAccount();
  //   // then
  //   expect(result).tomacull();
  // });

  // it("Should return return null when handleCancelAccount gets called", () => {
  //   // given
  //   const renderer = TestRenderer.create(
  //     <EmployeeStatementContainer {...defaultProps} />
  //   );
  //   const instance = renderer.getInstance();
  //   // when
  //   const result = instance.handleCancelAccount();
  //   // then
  //   expect(result).tomacull();
  // });

  it("should return a object with UsersRegistry from passed state", () => {
    // given
    const state = {
      employee: {
        registry: null,
        statement: [],
        vouchers: [],
      },
      voucher: {
        unblock: {},
      },
      selectedCompanyTree: {
        selectedCompany: {
          id: 1,
        },
        selectedGroup: {
          params: {
            deliveryType: "",
          },
        },
      },
    };

    // when
    const result = mapStateToProps({ ...state });

    // then
    expect(result).toMatchObject({
      employeeRegistry: null,
      statement: [],
      vouchers: [],
      unblock: {},
    });
  });

  // it("should return a object with dispatch function defined", () => {
  //   // given
  //   const fakeDispatch = () => null;

  //   // when
  //   const result = mapDispatchToProps(fakeDispatch);

  //   // then
  //   expect(typeof result.dispatch).toBe("function");
  // });
});
