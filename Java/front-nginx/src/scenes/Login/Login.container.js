import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bool, shape } from "prop-types";
import { getmacPortal } from "src/modules/UrlManager/UrlManager";

import { Unauthenticated } from "@common";

import FormContainer from "./Form/Form.container";
import { Routes, WebPaths } from "../../routes/consts";

export class LoginContainer extends PureComponent {
  state = {
    isLoading: false,
  };

  componentDidMount() {
    const {
      isAuthenticated,
      history: { push },
      data,
    } = this.props;

    const cpfUser = data ? data.cpf.trim() : "";

    if (cpfUser && isAuthenticated) {
      push(WebPaths[Routes.ORDERS_DASHBOARD]);
    }
  }

  toggleLoadingHandler = () =>
    this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

  goBackHandler = () => {
    window.location.replace(getmacPortal());
  };

  title = "Login";
  subtitle = "para recursos humanos";
  text = (
    <Fragment>
      Informe os dados a seguir para acessar seus <b>pedidos</b>, gerenciar seus
      <b> funcionários</b>, <b>notas fiscais</b> e muito <b>mais serviços </b>
      MachiCard. Seu dia a dia mais simples e ágil.
    </Fragment>
  );

  render() {
    const { isLoading } = this.state;

    return (
      <Unauthenticated
        showBoxes
        isLoading={isLoading}
        id="context-login"
        goBack={this.goBackHandler}
        title={this.title}
        subtitle={this.subtitle}
        text={this.text}
        width="350px"
      >
        <FormContainer toggleLoading={this.toggleLoadingHandler} />
      </Unauthenticated>
    );
  }
}

LoginContainer.propTypes = {
  isAuthenticated: bool.isRequired,
  data: shape({}),
};

LoginContainer.defaultProps = {
  data: {},
};

const mapStateToProps = ({
  user: {
    isAuthenticated,
    profile: { data },
  },
}) => ({
  isAuthenticated,
  data,
});

export default withRouter(connect(mapStateToProps)(LoginContainer));
