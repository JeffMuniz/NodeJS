import React from "react";
import { Col } from "react-styled-flexboxgrid";
import { ContainerWrapper } from "@base";

import FormContainer from "./Form/Form.container";
import { RowStyled, Div } from "./FileConverter.styles";

const FileConverter = () => (
  <ContainerWrapper title="Arquivo TXT">
    <Div>
      Envie o arquivo TXT para que seja automaticamente convertido para o
      formato mac.
    </Div>
    <RowStyled>
      <Col xs={12}>
        <FormContainer />
      </Col>
    </RowStyled>
  </ContainerWrapper>
);

export default FileConverter;
