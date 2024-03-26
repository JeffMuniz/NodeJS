import React from "react";

import {
  WrapperEmpty,
  Text,
  EmptyTitle,
  RemoveIcon,
} from "./GroupSelect.styles";

const GroupSelectEmptyState = () => (
  <WrapperEmpty>
    <RemoveIcon name="remove-circled" />
    <EmptyTitle>Ops!</EmptyTitle>
    <Text>
      Você não está cadastrado em nenhum grupo. Contate seu administrador de RH.
    </Text>
  </WrapperEmpty>
);

export default GroupSelectEmptyState;
