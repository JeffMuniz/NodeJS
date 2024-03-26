import React from "react";

import { SvgIcon } from "@common";
import { inputPlaceholder } from "@colors";
import {
  Container,
  Text,
  Divider,
  IconWrapper,
} from "./ProcessingWarning.styles";

const ProcessingSheetWarning = () => (
  <Container id="proc_warn_empty_state">
    <IconWrapper>
      <SvgIcon name="pendingStatus" fill={inputPlaceholder} size={128} />
    </IconWrapper>
    <Text>
      Seus locais de entrega estão sendo processados. Eles aparecerão aqui assim
      que o processamento for concluído.
    </Text>
    <Divider />
  </Container>
);

export default ProcessingSheetWarning;
