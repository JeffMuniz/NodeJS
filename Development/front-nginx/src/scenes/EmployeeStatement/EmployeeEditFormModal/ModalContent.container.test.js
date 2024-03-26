import React from "react";
import { create } from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";
import { ModalContent } from "./ModalContent.container";

jest.mock("src/modules/Form/Form", () => "FormWrapper");
jest.mock("./FormContent/FormContent.schema", () => "FormSchema");
jest.mock("./FormContent/FormContent", () => "FormContent");
jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
}));

describe("Employee Edit Modal - Modal Content Container", () => {
  let testRenderer;
  let testInstance;

  const entity = {
    cpf: "lorem",
    idCompany: 123,
    status: "ativo",
  };

  const registryUpdate = {
    name: "ipsum",
    registry: 321,
  };

  const props = {
    entity,
    updateEmployee: jest.fn(),
    getEmployeeRegistry: jest.fn(),
    closeModal: jest.fn(),
    showToast: jest.fn(),
  };

  beforeEach(() => {
    testRenderer = create(<ModalContent {...props} />);
    testInstance = testRenderer.getInstance();

    testInstance.setState = jest.fn();
  });

  it("Should render ModalContent", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<ModalContent {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it('Should update employee and close modal"', async () => {
    // when
    await testInstance.onSubmit(registryUpdate);

    // expect
    expect(testInstance.setState).toBeCalled();
    expect(testInstance.props.updateEmployee).toBeCalledWith(registryUpdate);
    expect(testInstance.props.getEmployeeRegistry).toBeCalled();
    expect(testInstance.props.closeModal).toBeCalled();
  });
});
