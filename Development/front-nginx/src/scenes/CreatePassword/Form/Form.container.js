import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { shape, oneOfType, string, func, instanceOf } from "prop-types";
import { queryStringParse } from "@utils";

import { requestStatus } from "@enums";
import { Routes, WebPaths } from "src/routes/consts";
import ResponseError from "src/common/entities/ResponseError";
import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";
import FormWrapper from "src/modules/Form/Form";
import * as userActions from "src/redux/modules/user/actions/userActions";

import * as sessionActions from "src/redux/modules/session/actions/session";

import { getDocument } from "src/api/documentModel/documentModel";
import FormSchema from "./Form.schema";
import Form from "./Form";

const initialValues = {
  password: "",
  confirmPassword: "",
  terms: false,
  check: false,
};

const SHEET_MODEL_ID = 61028877;
const FILE_NAME = "Termos-de-Uso-mac-visa-card.pdf";
const FILE_TYPE = "application/pdf";

const MASK_TYPE_TEXT = "text";
const MASK_TYPE_PASSWORD = "password";

export class FormContainer extends Component {
  state = {
    error: null,
    maskType: {
      newPassword: MASK_TYPE_PASSWORD,
      checkPassword: MASK_TYPE_PASSWORD,
    },
    robot: true,
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.createPasswordData.requestStatus === requestStatus.error) {
      const message =
        nextProps.createPasswordData.error.message ||
        "Por favor, tente novamente mais tarde.";
      return { error: message };
    }

    return { error: null };
  }

  componentDidMount() {
    const { resetAuth } = this.props;
    resetAuth();
  }

  componentDidUpdate() {
    const { createPasswordData } = this.props;
    if (createPasswordData.requestStatus === requestStatus.success) {
      this.routeToPasswordSuccess();
    }
  }

  onVerifyRecaptcha = () => {
    this.setState({ robot: false });
  };

  onExpiredRecaptcha = () => {
    this.setState({ robot: true });
  };

  downloadTOSFile = async () => {
    const { showToast, getCode } = this.props;

    showToast({
      id: "toast_downloading_tos",
      label: "O download do documento com os termos de uso foi iniciado",
    });

    await getCode();

    await getDocument({
      fileId: SHEET_MODEL_ID,
      fileName: FILE_NAME,
      fileType: FILE_TYPE,
    });
  };

  routeToPasswordSuccess = () => {
    const {
      history: { push },
      location,
      location: { pathname },
    } = this.props;

    if (pathname === "/primeiro-acesso") {
      const route = WebPaths[Routes.TERM_PRIVACY];
      push({ pathname: route, location });
    } else {
      const route = WebPaths[Routes.CREATED_PASSWORD];
      push({ pathname: route, location });
    }
  };

  eyeViewPassword = type =>
    this.setState(({ maskType }) => ({
      maskType: {
        ...maskType,
        [type]:
          maskType[type] === MASK_TYPE_TEXT
            ? MASK_TYPE_PASSWORD
            : MASK_TYPE_TEXT,
      },
    }));

  submit = async ({ password }) => {
    const { getCode, createPassword } = this.props;
    await getCode();

    const {
      history: {
        location: { search },
      },
    } = this.props;

    const queryStringParsed = queryStringParse(search);
    const token = queryStringParsed && queryStringParsed.token;

    await createPassword(token, password);
  };

  render() {
    const {
      location: { pathname },
    } = this.props;
    const { error, maskType, robot } = this.state;
    const readTermsRequired = pathname === WebPaths[Routes.FIRST_ACCESS];

    return (
      <FormWrapper
        initialValues={{
          ...initialValues,
          readTermsRequired,
          maskType,
        }}
        onSubmit={this.submit}
        validationSchema={FormSchema}
        render={props => (
          <Form
            requestError={error}
            readTermsRequired={readTermsRequired}
            downloadTOSFile={this.downloadTOSFile}
            eyeViewPassword={this.eyeViewPassword}
            maskType={maskType}
            onVerifyRecaptcha={this.onVerifyRecaptcha}
            onErrored={this.onExpiredRecaptcha}
            isRobot={robot}
            {...props}
          />
        )}
      />
    );
  }
}

export const mapStateToProps = ({ user: { createPassword } }) => ({
  createPasswordData: createPassword,
});

const mapDispatchToProps = {
  createPassword: userActions.createPassword,
  resetAuth: sessionActions.resetAuth,
  getCode: sessionActions.getCode,
  showToast: showToastAction,
};

FormContainer.propTypes = {
  createPasswordData: shape({
    requestStatus: string.isRequired,
    error: oneOfType([
      instanceOf(ResponseError),
      shape({
        message: string,
      }),
    ]),
  }),
  createPassword: func.isRequired,
  search: string.isRequired,
  resetAuth: func.isRequired,
  getCode: func.isRequired,
  showToast: func.isRequired,
  location: shape({}).isRequired,
};

FormContainer.defaultProps = {
  createPasswordData: {},
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FormContainer),
);
