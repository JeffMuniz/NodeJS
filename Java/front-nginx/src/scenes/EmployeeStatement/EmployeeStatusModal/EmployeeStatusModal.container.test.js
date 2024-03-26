import React from "react";
import { create } from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";
import { EmployeeStatusModal } from "./EmployeeStatusModal.container";

describe("Employee Status Modal - Employee Status Modal Container", () => {
  let testRenderer;
  let testInstance;

  const entity = {
    cpf: "lorem",
    idCompany: 123,
    status: "ATIVO",
  };

  const props = {
    entity,
    updateEmployee: jest.fn(),
    getEmployeeRegistry: jest.fn(),
    closeModal: jest.fn(),
    showToast: jest.fn(),
  };

  beforeEach(() => {
    testRenderer = create(<EmployeeStatusModal {...props} />);
    testInstance = testRenderer.getInstance();

    testInstance.setState = jest.fn();
  });

  it("Should render EmployeeStatusModal", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<EmployeeStatusModal {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  //   it('Should update employee and close modal"', async () => {
  //     // when
  //     await testInstance.onSubmit(registryUpdate);

  //     // expect
  //     expect(testInstance.setState).toBeCalled();
  //     expect(testInstance.props.updateEmployee).toBeCalledWith(registryUpdate);
  //     expect(testInstance.props.getEmployeeRegistry).toBeCalled();
  //     expect(testInstance.props.closeModal).toBeCalled();
  //   });
});
