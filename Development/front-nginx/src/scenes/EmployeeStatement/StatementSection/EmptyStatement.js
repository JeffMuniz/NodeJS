import React from "react";

import { SvgIcon } from "@common";
import { Container, Text, Divider } from "./EmptyStatement.styles";

const EmptyStatement = () => (
  <Container>
    <SvgIcon name="emptyGrid" />
    <Text>
      O funcionário ainda não utilizou o cartão. Compras e recargas aparecerão
      listadas aqui!
    </Text>
    <Divider />
  </Container>
);

export default EmptyStatement;
