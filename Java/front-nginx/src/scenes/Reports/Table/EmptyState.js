import React from "react";
import { func } from "prop-types";
import { Col } from "react-styled-flexboxgrid";
import { Button, SvgIcon } from "@common";
import { Divider, IconWrapper, RowStyled, Text } from "./EmptyState.styles";

const EmptyState = ({ onClickCreateReport }) => (
  <div>
    <IconWrapper>
      <SvgIcon name="emptyGrid" />
    </IconWrapper>
    <Text id="report-empty-state">Você ainda não possui relatórios.</Text>
    <Divider />
    <RowStyled>
      <Col xs={6}>
        <Button
          id="report-button-new-report-empty-state"
          value="Novo Relatório"
          onClick={onClickCreateReport}
        />
      </Col>
    </RowStyled>
  </div>
);

EmptyState.propTypes = {
  onClickCreateReport: func.isRequired,
};

export default EmptyState;
