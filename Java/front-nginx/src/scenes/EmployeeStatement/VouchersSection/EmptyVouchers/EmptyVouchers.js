import React from "react";

import { SvgIcon } from "@common";
import { Container, Text } from "./EmptyVouchers.styles";

const EmptyVouchers = () => (
  <Container>
    <SvgIcon name="wallet" />
    <Text>Os cartões ativos aparecerão aqui</Text>
  </Container>
);

export default EmptyVouchers;
