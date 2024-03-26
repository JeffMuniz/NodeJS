import React, { PureComponent } from "react";
import { Unauthenticated, Icon } from "@common";
import { withRouter } from "react-router-dom";
import { Routes, WebPaths } from "src/routes/consts";
import { connect } from "react-redux";
import { string, shape } from "prop-types";

import { Col, Row } from "react-flexbox-grid";
import FormContainer from "./Form/Form.container";

class CreatePassword extends PureComponent {
  render() {
    const {
      history: { push },
      location: { pathname },
      createPasswordData,
    } = this.props;

    const description =
      pathname === WebPaths[Routes.FIRST_ACCESS]
        ? "Para completar o seu cadastro no mac, crie sua senha de acesso abaixo:"
        : "Para continuar, crie uma nova senha seguindo as orientações abaixo:";

    const route = () => {
      push(WebPaths[Routes.LOGIN]);
    };

    return (
      <Unauthenticated
        showBoxes
        id="context-create"
        title="criar nova senha"
        subtitle="para recursos humanos"
        text={description}
        goBack={route}
        isLoading={createPasswordData.requestStatus === "loading"}
      >
        <Row center="xs">
          <Col xs={12}>
            <Icon name="mac-heart" />
          </Col>
        </Row>
        <FormContainer />
      </Unauthenticated>
    );
  }
}

const mapStateToProps = ({ user: { createPassword } }) => ({
  createPasswordData: createPassword,
});

CreatePassword.propTypes = {
  createPasswordData: shape({
    requestStatus: string.isRequired,
  }),
  location: shape({}).isRequired,
};

CreatePassword.defaultProps = {
  createPasswordData: {},
};

export default withRouter(connect(mapStateToProps)(CreatePassword));
