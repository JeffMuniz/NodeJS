import React from "react";
import { string } from "prop-types";

import { toCPFMask } from "@utils";
import { SvgIcon } from "@common";

import { Container, SubTitle, Divider, Text } from "./EmployeeNotFound.styles";

const EmployeeNotFound = ({ cpf }) => (
  <Container>
    <SvgIcon name="search" size={100} />
    <SubTitle>Dados não encontrados</SubTitle>
    <Divider />
    <Text>
      Não encontramos o CPF <b>{toCPFMask(cpf)}</b>.
    </Text>
    <Text>
      Por favor, confira os dados informados e tente a busca novamente.
    </Text>
  </Container>
);

EmployeeNotFound.propTypes = {
  cpf: string.isRequired,
};

export default EmployeeNotFound;
