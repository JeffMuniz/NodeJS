import React from "react";
import { func } from "prop-types";
import { Loading } from "@base";
import { SvgIcon } from "@common";
import { requestStatus } from "@enums";
import { If } from "@utils";

import { IconWrapper, Text, LoadingWrapper } from "./EmptyState.styles";

const EmptyState = ({ chargebacks }) => (
  <div>
    <If test={chargebacks.requestStatus !== requestStatus.success}>
      <LoadingWrapper>
        <Loading loading />
      </LoadingWrapper>
    </If>
    <If test={chargebacks.requestStatus === requestStatus.success}>
      <IconWrapper id="cashback-empty-state-icon">
        <SvgIcon name="emptyGrid" />
      </IconWrapper>
      <Text id="cashback-empty-state-text">
        Você ainda não tem nenhum estorno para acompanhar. Todos os estornos
        pedidos serão exibidos aqui.
      </Text>
    </If>
  </div>
);

EmptyState.propTypes = {
  chargebacks: func.isRequired,
};

export default EmptyState;
