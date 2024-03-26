import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import TestRenderer from "react-test-renderer";
import TableContent from "./TableContent";
import { BodyRow } from "./TableContent.styles";
import data from "./__mock__/data";

const defaultProps = {
  data,
  checkedItems: [],
  isAllReportsCheckSelected: false,
  hasItemsSelected: false,
  onClickToggleReportCheck: jest.fn(),
  onClickToggleAllReportsCheck: jest.fn(),
  onClickDeleteSelectedReports: jest.fn(),
  onClickDeleteOne: jest.fn(),
  onClickDownloadOne: jest.fn(),
};

describe("Reports - Table - TableContent", () => {
  it("should render TableContent", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<TableContent {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("should render TableContent with ten Rows", () => {
    // given
    const testRenderer = TestRenderer.create(
      <TableContent {...defaultProps} />,
    );
    const testInstance = testRenderer.root;

    // then
    expect(testInstance.findAllByType(BodyRow)).toHaveLength(10);
  });

  it("should render TableContent with 0 Rows if data prop is Empty", () => {
    // given
    const testRenderer = TestRenderer.create(
      <TableContent {...defaultProps} data={[]} />,
    );
    const testInstance = testRenderer.root;

    // then
    expect(testInstance.findAllByType(BodyRow)).toHaveLength(0);
  });
});
