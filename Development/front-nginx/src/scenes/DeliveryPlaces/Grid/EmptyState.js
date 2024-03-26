import React from "react";
import { func, bool } from "prop-types";
import { If } from "@utils";
import { SvgIcon } from "@common";
import { Container, Text, Divider, Button } from "./EmptyState.styles";

const EmptyState = ({ onOpenFileDialogClick, hasGroupAccessLevel }) => (
  <Container>
    <SvgIcon name="emptyGrid" />
    <Text>Você ainda não tem endereços de entregas cadastrados.</Text>
    <Divider />
    <If test={hasGroupAccessLevel}>
      <Button
        id="ept_st_send_sheet"
        value="enviar planilha"
        onClick={onOpenFileDialogClick}
      />
    </If>
  </Container>
);

EmptyState.propTypes = {
  onOpenFileDialogClick: func.isRequired,
  hasGroupAccessLevel: bool.isRequired,
};

export default EmptyState;
