import React from "react";
import { string } from "prop-types";

import { toCPFMask } from "@utils";
import { SvgIcon } from "@common";

import {
  Container,
  SubTitle,
  Divider,
  Text,
} from "./CardTrackingNotFound.styles";

export const CardTrackingNotFound = ({ cpf }) => (
  <Container>
    <SvgIcon name="search" size={100} />
    <SubTitle>Dados não encontrados</SubTitle>
    <Divider />
    <Text id="no-cards-founded">
      Não encontramos cartões para o CPF <b>{toCPFMask(cpf)}</b>. Por favor,
      confira os dados informados e tente a busca novamente.
    </Text>
  </Container>
);

CardTrackingNotFound.propTypes = {
  cpf: string.isRequired,
};

export default CardTrackingNotFound;
