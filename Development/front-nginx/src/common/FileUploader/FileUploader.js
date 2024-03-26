import React, { Component } from "react";
import PropTypes from "prop-types";

import { If } from "@utils";
import { SvgIcon } from "@common";

import {
  FileInput,
  InputLabel,
  InputError,
  Wrapper,
  View,
  Span,
  InputLabelView,
  LabelFile,
  IconStyled,
} from "./FileUploader.styles";

export default class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: props.fileLabel || props.defaultLabel,
      uploaded: !!props.fileLabel || false,
    };
  }

  onChange = event => {
    const { files } = event.target;
    const { maximumFileSize, onMaximumFileSizeError } = this.props;
    if (Array.isArray(files) || !files[0]) {
      return;
    }

    if (maximumFileSize > 0 && this.invalidMaximumFileSize(files[0])) {
      onMaximumFileSizeError();
      return;
    }

    this.readFile(files[0]);
  };

  readFile = file => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = this.readOnLoad(file);
  };

  readOnLoad = file => e => {
    // eslint-disable-next-line prefer-destructuring
    const base64File = e.target.result.split("base64,")[1];
    const filename = file.name;
    const { onChange } = this.props;
    this.changeFileName(filename);
    onChange(base64File);
    this.setState({ label: filename, uploaded: true });
  };

  changeFileName = label => {
    const { fileLabelFieldName, setFieldValue } = this.props;
    const name = fileLabelFieldName;
    setFieldValue(name, label);
  };

  removeFile = () => {
    const { onChange, defaultLabel } = this.props;
    onChange("");
    this.fileInput.value = "";
    this.changeFileName("");
    this.setState({ label: defaultLabel, uploaded: false });
  };

  fileSizeToKb = size => size / 1024;

  invalidMaximumFileSize = file => {
    const { maximumFileSize } = this.props;
    return maximumFileSize < this.fileSizeToKb(file.size);
  };

  render() {
    const { id, acceptTypes, title, error } = this.props;
    const { label, uploaded } = this.state;
    return (
      <Wrapper>
        <FileInput
          {...this.props}
          id={id}
          innerRef={ref => {
            this.fileInput = ref;
          }}
          type="file"
          accept={acceptTypes}
          onChange={this.onChange}
        />
        <View>
          <If test={title !== ""}>
            <Span>{title}</Span>
          </If>
          <InputLabel htmlFor={id}>
            <InputLabelView>
              <SvgIcon name="import" />
              <LabelFile>{label}</LabelFile>
            </InputLabelView>
          </InputLabel>
          <If test={uploaded}>
            <IconStyled onClick={this.removeFile} name="remove" />
          </If>
        </View>
        {error && <InputError id={`${id}_error`}>{error}</InputError>}
      </Wrapper>
    );
  }
}

FileUploader.propTypes = {
  defaultLabel: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func,
  title: PropTypes.string,
  id: PropTypes.string,
  index: PropTypes.number,
  error: PropTypes.string,
  label: PropTypes.string,
  fileLabel: PropTypes.string,
  fileLabelFieldName: PropTypes.string,
  onChange: PropTypes.func,
  acceptTypes: PropTypes.string,
  maximumFileSize: PropTypes.number,
  onMaximumFileSizeError: PropTypes.func,
};

FileUploader.defaultProps = {
  title: "",
  index: 0,
  id: "fileInput",
  error: null,
  fileLabel: null,
  fileLabelFieldName: null,
  label: "Uploader",
  onChange: () => null,
  setFieldValue: () => null,
  onMaximumFileSizeError: () => null,
  acceptTypes: "*",
  maximumFileSize: 0,
};
