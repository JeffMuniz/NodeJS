import React, { Fragment } from "react";
import { Row } from "react-flexbox-grid";
import { func } from "prop-types";
import { Button } from "@common";

import {
  StyledColSuccess,
  LittleLine,
  LastCol,
  RowButton,
} from "./SuccessBody.styles";

const SuccessBody = ({ returnToLogin }) => (
  <Fragment>
    <Row center="md">
      <StyledColSuccess>
        Enviamos um e-mail para a criação da sua nova senha.
      </StyledColSuccess>
    </Row>
    <LittleLine />
    <Row center="md">
      <LastCol>
        Caso exista algum problema com seu email, entre em contato com o usuário
        administrador da sua empresa.
      </LastCol>
    </Row>
    <RowButton center="md">
      <Button
        id="pwd_btn_goback"
        buttonType="actionButton"
        onPress={returnToLogin}
        title="Voltar"
        value="voltar"
      />
    </RowButton>
  </Fragment>
);

SuccessBody.propTypes = {
  returnToLogin: func.isRequired,
};

export default SuccessBody;
