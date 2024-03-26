import React from "react";
import { arrayOf, func, shape } from "prop-types";

import { NewModal } from "@base";

import {
  Bold,
  ContentWrapper,
  StyledParagraph,
} from "./ConfirmationModal.styled";

export const ConfirmationModal = ({
  closeModal,
  values,
  handleSubmitModal,
}) => {
  const [{ reasonDescription, status }] = values;
  const employeesTotal = values.length;
  const textStatus = status ? "inativação" : "ativação";

  return (
    <NewModal
      title={`Confirmação da ${textStatus}`}
      subtitle={`Verifique os dados abaixo para realizar a ${textStatus}`}
      id="modal-confirmation-change-status"
      width="600px"
      height="unset"
      okButtonProps={{
        value: "Confirmar",
        id: "btn-modal-confirmation-ok",
        disabled: employeesTotal === 0,
        onClick: () => handleSubmitModal(values),
      }}
      cancelButtonProps={{
        value: "Cancelar",
        onClick: closeModal,
        id: "btn-modal-confirmation-cancel",
      }}
    >
      <ContentWrapper id="content-modal-confirmation">
        <StyledParagraph>
          Motivo da {textStatus}:{" "}
          <Bold id="field-reason">{reasonDescription}</Bold>
        </StyledParagraph>
        <StyledParagraph margin="30px">
          Quantidade de funcionários:{" "}
          <Bold id="field-total-employees">{employeesTotal}</Bold>
        </StyledParagraph>
        {status ? (
          <StyledParagraph>
            A partir do momento que você confirmar a inativação, <br />
            esses funcionários deixarão de receber a(s) carga(s) em <br />
            seu(s) cartão(s), até ele ser ativado novamente
          </StyledParagraph>
        ) : (
          <StyledParagraph>
            A partir do momento que você confirmar a ativação, esses <br />
            funcionários voltarão a receber a(s) carga(s) em seu(s) <br />
            cartão(s) novamente
          </StyledParagraph>
        )}
      </ContentWrapper>
    </NewModal>
  );
};

ConfirmationModal.propTypes = {
  closeModal: func.isRequired,
  values: arrayOf(shape({})).isRequired,
  handleSubmitModal: func.isRequired,
};

export default ConfirmationModal;
