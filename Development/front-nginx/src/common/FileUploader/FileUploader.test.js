import React from "react";
import TestRenderer from "react-test-renderer";
import FileUploader from "./FileUploader";
import { FileInput, IconStyled } from "./FileUploader.styles";

jest.mock("../Icon/Icon", () => () => "Icon");
jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
}));

let testRenderer = null;
let instance = null;
let instanceRoot = null;
let props = null;
const rows = [
  "NAME,ADDRESS,ZIP",
  "james,1800 sunny ln,40000",
  "james,1800 sunny ln,40000",
  "james,1800 sunny ln,40000",
  "ronda,1200 peaches ln,50000",
];
let file = null;

function createNodeMock(element) {
  if (element.type === "input") {
    return {
      focus() {},
    };
  }
  return null;
}

beforeEach(() => {
  props = {
    defaultLabel: "test file uploader",
    onChange: jest.fn(),
    setFieldValue: jest.fn(),
  };

  file = new File([rows.join("\n")], "test.csv", {
    type: "text/csv",
    lastModified: new Date(),
  });

  testRenderer = TestRenderer.create(<FileUploader {...props} />, {
    createNodeMock,
  });
  instance = testRenderer.getInstance();
  instanceRoot = testRenderer.root;
});

describe("File Uploader - Component", () => {
  it("should not call readFile when file is invalid", () => {
    // given
    const fileUpload = instanceRoot.findByType(FileInput);
    const event = { target: { files: {} } };
    instanceRoot.instance.readFile = jest.fn();

    // when
    fileUpload.props.onChange(event);

    // then
    expect(instanceRoot.instance.readFile).not.toBeCalled();
  });

  it("should render component with errors", () => {
    // given
    const error = "error";

    // when
    testRenderer.update(<FileUploader {...props} error={error} />);

    // then
    expect(instanceRoot.instance.props.error).toEqual(error);
  });

  it("should not call readFile when file size is invalid", () => {
    // given
    testRenderer.update(<FileUploader {...props} maximumFileSize={0.1} />);
    const fileUpload = instanceRoot.findByType(FileInput);
    const event = { target: { files: { "0": file } } };
    instanceRoot.instance.readFile = jest.fn();

    // when
    fileUpload.props.onChange(event);

    // then
    expect(instanceRoot.instance.readFile).not.toBeCalled();
  });

  it("should call render file when file is valid", () => {
    // given
    const fileUpload = instanceRoot.findByType(FileInput);
    const event = { target: { files: { "0": file } } };
    instanceRoot.instance.readFile = jest.fn();

    // when
    fileUpload.props.onChange(event);

    // then
    expect(instanceRoot.instance.readFile).toBeCalledWith(file);
  });

  it("should call readOnLoad when readFile finish", () => {
    // given
    instanceRoot.instance.readOnLoad = jest.fn();

    // when
    instanceRoot.instance.readFile(file);

    // then
    expect(instanceRoot.instance.readOnLoad).toBeCalledWith(file);
  });

  it("should call changeFileName with file name", () => {
    // given
    const event = {
      target: {
        result:
          "data:text/csv;base64,TkFNRSxBRERSRVNTLFpJUApqYW1lcywxODAwIHN1bm55IGxuLDQwMDAwCmphbWVzLDE4MDAgc3VubnkgbG4sNDAwMDAKamFtZXMsMTgwMCBzdW5ueSBsbiw0MDAwMApyb25kYSwxMjAwIHBlYWNoZXMgbG4sNTAwMDA=",
      },
    };
    instanceRoot.instance.changeFileName = jest.fn();

    // when
    instanceRoot.instance.readOnLoad(file)(event);

    // then
    expect(instanceRoot.instance.changeFileName).toBeCalledWith(file.name);
  });

  it("should call onChange when load file finish", () => {
    // given
    const event = {
      target: {
        result:
          "data:text/csv;base64,TkFNRSxBRERSRVNTLFpJUApqYW1lcywxODAwIHN1bm55IGxuLDQwMDAwCmphbWVzLDE4MDAgc3VubnkgbG4sNDAwMDAKamFtZXMsMTgwMCBzdW5ueSBsbiw0MDAwMApyb25kYSwxMjAwIHBlYWNoZXMgbG4sNTAwMDA=",
      },
    };
    instanceRoot.props.onChange = jest.fn();

    // when
    instanceRoot.instance.readOnLoad(file)(event);

    // then
    expect(instanceRoot.props.onChange).toBeCalled();
  });

  it("should update state of component when readOnLoad finish", () => {
    // given

    const event = {
      target: {
        result:
          "data:text/csv;base64,TkFNRSxBRERSRVNTLFpJUApqYW1lcywxODAwIHN1bm55IGxuLDQwMDAwCmphbWVzLDE4MDAgc3VubnkgbG4sNDAwMDAKamFtZXMsMTgwMCBzdW5ueSBsbiw0MDAwMApyb25kYSwxMjAwIHBlYWNoZXMgbG4sNTAwMDA=",
      },
    };

    // when
    instanceRoot.instance.readOnLoad(file)(event);

    // then
    expect(instance.state.uploaded).toBeTruthy();
  });

  it("should call removeFile when IconStyled click", () => {
    // given
    const event = {
      target: {
        result:
          "data:text/csv;base64,TkFNRSxBRERSRVNTLFpJUApqYW1lcywxODAwIHN1bm55IGxuLDQwMDAwCmphbWVzLDE4MDAgc3VubnkgbG4sNDAwMDAKamFtZXMsMTgwMCBzdW5ueSBsbiw0MDAwMApyb25kYSwxMjAwIHBlYWNoZXMgbG4sNTAwMDA=",
      },
    };
    instanceRoot.instance.readOnLoad(file)(event);
    const icon = instanceRoot.findByType(IconStyled);

    // when
    icon.props.onClick(file);

    // then
    expect(instance.state.uploaded).toBeFalsy();
  });

  it("Should return null when call onChange of default props", () => {
    // given
    const defaultProps = { id: "test", name: "name", defaultLabel: "x" };
    const renderer = TestRenderer.create(<FileUploader {...defaultProps} />);
    const { root } = renderer;

    // when
    const result = root.props.onChange();

    // then
    expect(result).tomacull();
  });

  it("Should return null when call setFieldValue of default props", () => {
    // given
    const defaultProps = { id: "test", name: "name", defaultLabel: "x" };
    const renderer = TestRenderer.create(<FileUploader {...defaultProps} />);
    const { root } = renderer;

    // when
    const result = root.props.setFieldValue();

    // then
    expect(result).tomacull();
  });
});
