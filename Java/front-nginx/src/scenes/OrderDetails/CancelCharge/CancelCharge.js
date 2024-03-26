import React from "react";
import { func, string, shape, bool } from "prop-types";
import { inputPlaceholder } from "@colors";
import { ErrorText, SvgIcon } from "@common";
import { LoadingWrapper } from "@base";

import {
  Container,
  WarningText,
  ButtonSection,
  BaseButton,
  ErrorContainer,
  InfoText,
} from "./CancelCharge.styles";

const CancelCharge = ({
  closeModal,
  submitCancelCharge,
  requestError,
  loading,
}) => (
  <Container>
    <LoadingWrapper {...{ loading }}>
      <SvgIcon name="warning" fill={inputPlaceholder} size={75} />
      <WarningText>
        Tem certeza que deseja cancelar parte do pedido? Esta ação não poderá
        ser desfeita.
      </WarningText>
      <InfoText>
        (Importante: Se você realizar o cancelamento após às 23h - Horário de
        Brasília, será cobrado o valor dos cartões solicitados)
      </InfoText>
      {requestError && (
        <ErrorContainer>
          <ErrorText>{requestError.message}</ErrorText>
        </ErrorContainer>
      )}
      <ButtonSection>
        <BaseButton
          id="cc_btn_cancel"
          type="button"
          buttonType="light"
          onPress={closeModal}
          value="cancelar"
          action="Clicou em 'Cancelar' no cancelamento de pedido descentralizado"
        />
        <BaseButton
          id="cc_btn_submit"
          type="submit"
          onPress={submitCancelCharge}
          value="confirmar"
          action="Clicou em 'Continuar' para confirmar o cancelamento de pedido descentralizado"
        />
      </ButtonSection>
    </LoadingWrapper>
  </Container>
);

CancelCharge.propTypes = {
  closeModal: func.isRequired,
  submitCancelCharge: func.isRequired,
  requestError: shape({ message: string }),
  loading: bool,
};

CancelCharge.defaultProps = {
  requestError: {},
  loading: false,
};

export default CancelCharge;
