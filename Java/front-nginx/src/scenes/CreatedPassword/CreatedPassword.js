import React from "react";
import { func } from "prop-types";
import { Col, Row } from "react-styled-flexboxgrid";
import { Unauthenticated, Button } from "@common";

import {
  CentralizedCol,
  RowButton,
  SuccessIcon,
  Title,
  Description,
  WrapperTitle,
  WrapperDescription,
} from "./CreatedPassword.styles";

const title = "criar nova senha";
const subtitle = "para recursos humanos";

const bodyTitle = "Senha foi criada com sucesso!";
const bodyDescription = "Agora é só fazer login para voltar a usar";

const CreatedPassword = ({ goHome }) => (
  <Unauthenticated
    title={title}
    subtitle={subtitle}
    goBack={goHome}
    id="context-created"
  >
    <div id="context-created-sucess">
      <Row>
        <CentralizedCol xs={12}>
          <SuccessIcon name="success-check" />
        </CentralizedCol>
      </Row>
      <Row>
        <WrapperTitle>
          <Title>{bodyTitle}</Title>
        </WrapperTitle>
        <WrapperDescription>
          <Description>{bodyDescription}</Description>
          <Col xs={20}>
            <Description>
              os recursos que o <strong>mac</strong> tem para gerenciar suas
              vendas
            </Description>
          </Col>
        </WrapperDescription>
      </Row>
      <RowButton center="xs">
        <Col xs={12}>
          <Button
            id="cp_btn_home"
            type="button"
            onPress={goHome}
            value="FAZER LOGIN"
          />
        </Col>
      </RowButton>
    </div>
  </Unauthenticated>
);

CreatedPassword.propTypes = {
  goHome: func,
};

CreatedPassword.defaultProps = {
  goHome: () => null,
};

export default CreatedPassword;
