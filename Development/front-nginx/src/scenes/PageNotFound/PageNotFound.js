import React from "react";
import { func } from "prop-types";

import { ContainerWrapper } from "@base";
import SvgIcon from "src/common/SvgIcon/SvgIcon";

import { Content, Title } from "./PageNotFound.styles";

export const PageNotFound = ({ handleReturn }) => (
  <ContainerWrapper
    title="Voltar"
    showBackIcon
    headerClickHandler={handleReturn}
  >
    <Content>
      <SvgIcon name="search" size={100} />
      <Title>404</Title>
      <Title subTitle>Página não encontrada</Title>
    </Content>
  </ContainerWrapper>
);

PageNotFound.propTypes = {
  handleReturn: func.isRequired,
};

export default PageNotFound;
