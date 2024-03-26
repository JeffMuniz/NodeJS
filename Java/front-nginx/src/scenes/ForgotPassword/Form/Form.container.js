import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { string, func, shape, oneOfType, instanceOf } from "prop-types";

import { requestStatus } from "@enums";
import { If } from "@utils";

import ResponseError from "src/common/entities/ResponseError";
import FormWrapper from "src/modules/Form/Form";
import * as userActions from "src/redux/modules/user/actions/userActions";
import * as SessionActions from "src/redux/modules/session/actions/session";

import FormSchema from "./Form.schema";
import Form from "./Form";
import Success from "./SuccessBody";

const initialValues = {
  forgotCpf: "",
  email: "",
};

export class ForgetPasswordContainer extends Component {
  state = {
    forgotPasswordError: null,
    emailForgotStatus: false,
    cpfForgotStatus: false,
    robot: true,
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.forgotPasswordData.requestStatus === requestStatus.success) {
      return { forgotPasswordSuccess: true };
    }

    if (nextProps.forgotPasswordData.requestStatus === requestStatus.error) {
      return {
        forgotPasswordError: nextProps.forgotPasswordData.error.message,
        forgotPasswordSuccess: false,
        emailForgotStatus: true,
        cpfForgotStatus: true,
      };
    }

    return {
      forgotPasswordError: null,
      forgotPasswordSuccess: false,
      emailForgotStatus: false,
      cpfForgotStatus: false,
    };
  }

  componentDidMount() {
    const { resetAuth } = this.props;
    resetAuth();
  }

  componentWillUnmount() {
    const { resetForgotPassword } = this.props;

    this.setState({
      forgotPasswordError: null,
      emailForgotStatus: false,
      cpfForgotStatus: false,
      robot: true,
    });

    resetForgotPassword();
  }

  onVerifyRecaptcha = () => {
    this.setState({ robot: false });
  };

  onExpiredRecaptcha = () => {
    this.setState({ robot: true });
  };

  changeInputStatus = input => () => {
    this.setState({ [input]: false });
  };

  returnToLogin = () => {
    const {
      history: { goBack },
    } = this.props;

    goBack();
  };

  submit = async ({ forgotCpf: cpf, email }) => {
    const { getCode, forgotPasswordAction, toggleLoading } = this.props;
    try {
      toggleLoading();
      await Promise.all([
        await getCode(),
        await forgotPasswordAction({ cpf, email }),
      ]);
      toggleLoading();
    } catch (error) {
      toggleLoading();
    }
  };

  render() {
    const { forgotPasswordData } = this.props;
    const {
      forgotPasswordError,
      emailForgotStatus,
      cpfForgotStatus,
      forgotPasswordSuccess,
      robot,
    } = this.state;

    return (
      <Fragment>
        <If test={!forgotPasswordSuccess}>
          <div id="ForgotPwdForm">
            <FormWrapper
              initialValues={initialValues}
              onSubmit={this.submit}
              validationSchema={FormSchema}
              enableReinitialize
              render={props => (
                <Form
                  requestError={forgotPasswordError}
                  isLoading={
                    forgotPasswordData.requestStatus === requestStatus.loading
                  }
                  emailForgotStatus={emailForgotStatus}
                  cpfForgotStatus={cpfForgotStatus}
                  changeInputStatus={this.changeInputStatus}
                  returnToLogin={this.returnToLogin}
                  onVerifyRecaptcha={this.onVerifyRecaptcha}
                  onErrored={this.onExpiredRecaptcha}
                  isRobot={robot}
                  {...props}
                />
              )}
            />
          </div>
        </If>
        <If test={forgotPasswordSuccess}>
          <div id="ForgotPwdSuccess">
            <Success returnToLogin={this.returnToLogin} />
          </div>
        </If>
      </Fragment>
    );
  }
}

export function mapStateToProps({ user: { forgotPassword } }) {
  return {
    forgotPasswordData: forgotPassword,
  };
}

const mapDispatchToProps = {
  forgotPasswordAction: userActions.forgotPassword,
  resetForgotPassword: userActions.resetForgotPassword,
  resetAuth: SessionActions.resetAuth,
  getCode: SessionActions.getCode,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordContainer),
);

ForgetPasswordContainer.propTypes = {
  forgotPasswordAction: func.isRequired,
  resetAuth: func.isRequired,
  getCode: func.isRequired,
  forgotPasswordData: shape({
    requestStatus: string.isRequired,
    error: oneOfType([
      instanceOf(ResponseError),
      shape({
        message: string,
      }),
    ]),
  }),
  resetForgotPassword: func.isRequired,
  toggleLoading: func.isRequired,
};

ForgetPasswordContainer.defaultProps = {
  forgotPasswordData: {},
};
