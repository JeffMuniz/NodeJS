import React from "react";
import { bool, func, string } from "prop-types";
import { inputPlaceholder } from "@colors";
import { ErrorText, SvgIcon } from "@common";
import { LoadingWrapper } from "@base";

import {
  Container,
  WarningText,
  InfoText,
  ButtonSection,
  BaseButton,
  ErrorContainer,
  IconWrapper,
} from "./CancelOrder.styles";

const CancelOrder = ({
  closeModal,
  submitCancelOrder,
  requestError,
  loading,
}) => (
  <Container>
    <LoadingWrapper {...{ loading }}>
      <IconWrapper>
        <SvgIcon name="warning" fill={inputPlaceholder} size={85} />
      </IconWrapper>
      <WarningText>
        Tem certeza que deseja cancelar o pedido que está sendo processado?
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
          id="cp_btn_cancel"
          type="button"
          buttonType="light"
          onPress={closeModal}
          value="cancelar"
          action="Clicou em 'Cancelar' no cancelamento de pedido centralizado"
        />
        <BaseButton
          id="cp_btn_submit"
          type="submit"
          onPress={submitCancelOrder}
          value="continuar"
          action="Clicou em 'Continuar' para confirmar o cancelamento de pedido centralizado"
        />
      </ButtonSection>
    </LoadingWrapper>
  </Container>
);

CancelOrder.propTypes = {
  closeModal: func.isRequired,
  submitCancelOrder: func.isRequired,
  requestError: string,
  loading: bool,
};

CancelOrder.defaultProps = {
  requestError: "",
  loading: false,
};

export default CancelOrder;
