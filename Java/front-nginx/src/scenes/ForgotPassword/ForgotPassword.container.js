import React, { PureComponent, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Unauthenticated } from "@common";
import FormContainer from "./Form/Form.container";

export class ForgotPasswordContainer extends PureComponent {
  state = {
    isLoading: false,
  };

  toggleLoadingHandler = () =>
    this.setState(({ isLoading }) => ({ isLoading: !isLoading }));

  title = "recuperar senha";
  subtitle = "para recursos humanos";
  text = (
    <Fragment>
      Para que você possa acessar seus <b>pedidos</b>, gerenciar seus
      <b> funcionários</b>, <b>notas fiscais</b> e muito <b>mais serviços </b>
      MachiCard, nós precisamos do seu CPF e e-mail cadastrado.
    </Fragment>
  );

  render() {
    const { isLoading } = this.state;
    const {
      history: { goBack },
    } = this.props;

    return (
      <Unauthenticated
        id="ForgotPwd"
        showBoxes={false}
        isLoading={isLoading}
        title={this.title}
        subtitle={this.subtitle}
        text={this.text}
        goBack={goBack}
      >
        <FormContainer toggleLoading={this.toggleLoadingHandler} />
      </Unauthenticated>
    );
  }
}

export default withRouter(ForgotPasswordContainer);
