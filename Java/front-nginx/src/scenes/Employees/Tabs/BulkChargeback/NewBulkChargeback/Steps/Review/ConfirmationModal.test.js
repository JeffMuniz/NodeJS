import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { ConfirmationModal } from "./ConfirmationModal";
import cpfs from "./__mock__/data";

const defaultProps = {
  openModal: jest.fn(),
  closeModal: jest.fn(),
  values: { cpfs },
};

describe("NewBulkChargeback - ConfirmationModal", () => {
  it("Should be ConfirmationModal", () => {
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<ConfirmationModal {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
