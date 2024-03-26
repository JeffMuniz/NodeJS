import React from "react";
import { SvgIcon } from "@common";
import { inputPlaceholder } from "@colors";
import { Container, SubTitle, Divider } from "./DefaultEmptyState.styles";

const DefaultEmptyState = () => (
  <Container id="default-grid-empty-state">
    <SvgIcon name="warning" fill={inputPlaceholder} size={100} />
    <SubTitle>Nenhum resultado encontrado</SubTitle>
    <Divider />
  </Container>
);

export default DefaultEmptyState;
