import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { get } from "lodash";
import { requestStatus, serviceChannelId } from "@enums";

import { getGroups } from "src/api/group/group";

import { Routes, WebPaths } from "src/routes/consts";

import * as SessionActions from "src/redux/modules/session/actions/session";

import {
  getUserStatusInfo as getUserStatusAction,
  getUserStatusTermInfo as getUserStatusTermInfoAction,
} from "src/redux/modules/user/actions/getUserStatus";

import ResponseError from "src/common/entities/ResponseError";
import FormWrapper from "src/modules/Form/Form";

import FormSchema from "./Form.schema";
import Form from "./Form";

export class FormContainer extends Component {
  state = {
    error: null,
    cpfStatus: false,
    passwordStatus: false,
    robot: true,
  };

  static getDerivedStateFromProps({ session }) {
    if (session.requestStatus === requestStatus.error) {
      return {
        error: session.error.message,
        cpfStatus: true,
        passwordStatus: true,
      };
    }

    return {
      error: null,
      cpfStatus: false,
      passwordStatus: false,
    };
  }

  onVerifyRecaptcha = () => {
    this.setState({ robot: false });
  };

  onExpiredRecaptcha = () => {
    this.setState({ robot: true });
  };

  goToForgotPassword = () => {
    const {
      history: { push },
    } = this.props;
    push(WebPaths[Routes.FORGOTPASSWORD]);
  };

  goToTermPrivacy = cpf => {
    const {
      history: { push },
      location,
    } = this.props;
    const pathname = WebPaths[Routes.TERM_PRIVACY];
    const data = { cpf };

    return push({ pathname, location, data });
  };

  changeInputStatus = input => this.setState({ [input]: false });

  submit = async payload => {
    const {
      signIn,
      history: { push },
      location,
      toggleLoading,
      getUserStatusInfo,
      getUserStatusTermInfo,
    } = this.props;

    try {
      toggleLoading();

      await signIn(payload);

      toggleLoading();

      const regex = /[.-\s]/g;
      const cpf = payload.cpf.replace(regex, "");

      toggleLoading();

      const data = await getUserStatusInfo("", cpf);

      const { id, status, anonimizado, birthDate, phone, mother } = data;
      await getGroups(id);

      toggleLoading();

      // Regra:
      // - excluído/anonimizado:
      //      mensagem: Usuário não existe.
      // - não anonimizado e inativo:
      //      mensagem: Usuário está inativo. Por favor, entre em contato com o administrador da conta.
      // - não anonimizado e ativo:
      //      fluxo normal:
      //        - se não tiver aceito o termo: redireciona para a tela do termo
      //        - se já tiver aceito e não tiver atualizado os dados: redireciona para a tela de atualização
      //        - se já tiver aceito e atualizado os dados: redireciona para a tela de pedidos
      if (anonimizado) {
        this.setState({
          error: "Usuário não existe.",
        });

        return;
      }

      if (status === "ATIVO") {
        toggleLoading();
        const resultTerm = await getUserStatusTermInfo(
          cpf,
          serviceChannelId.RH,
          status,
          anonimizado,
          birthDate,
          phone,
          mother,
        );

        toggleLoading();

        const acceptedTerm = resultTerm ? resultTerm.aceite : false;

        if (acceptedTerm) {
          if (birthDate && phone && mother) {
            const route = get(
              location,
              "state.from",
              WebPaths[Routes.ORDERS_DASHBOARD],
            );

            push(route);
          } else {
            push(WebPaths[Routes.UPDATE_USER], data);
          }
        } else {
          this.goToTermPrivacy(cpf);
        }
      } else {
        this.setState({
          error:
            "O usuário está inativo. Por favor, entre em contato com o administrador da conta.",
        });
      }
    } catch (error) {
      toggleLoading();

      const { code, message } = error;

      if (code === "0") {
        this.setState({
          error: message,
        });
      }
    }
  };

  render() {
    const { cpfStatus, passwordStatus, error, robot } = this.state;
    return (
      <FormWrapper
        onSubmit={this.submit}
        validationSchema={FormSchema}
        enableReinitialize
        render={props => (
          <Form
            cpfStatus={cpfStatus}
            passwordStatus={passwordStatus}
            changeInputStatus={this.changeInputStatus}
            requestError={error}
            goToForgotPassword={this.goToForgotPassword}
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

export const mapStateToProps = ({ session }) => ({
  session,
});

const mapDispatchToProps = {
  signIn: SessionActions.signIn,
  getUserStatusInfo: getUserStatusAction,
  getUserStatusTermInfo: getUserStatusTermInfoAction,
};

FormContainer.propTypes = {
  session: PropTypes.shape({
    requestStatus: PropTypes.string.isRequired,
    error: PropTypes.oneOfType([
      PropTypes.instanceOf(ResponseError),
      PropTypes.shape({
        message: PropTypes.string,
      }),
    ]),
  }),
  signIn: PropTypes.func.isRequired,
  getUserStatusInfo: PropTypes.func.isRequired,
  getUserStatusTermInfo: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
  toggleLoading: PropTypes.func.isRequired,
};

FormContainer.defaultProps = {
  session: {},
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FormContainer),
);
