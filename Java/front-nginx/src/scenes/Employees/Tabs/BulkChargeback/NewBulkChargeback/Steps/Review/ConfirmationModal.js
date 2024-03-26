import React from "react";
import { func, shape } from "prop-types";
import { get } from "lodash";
import { connect } from "react-redux";

import { NewModal } from "@base";
import { toMoneyMask, toMoney } from "@utils";
import { ChargeBackTOS } from "@common";

import * as ModalActions from "src/redux/modules/modal/actions/modal";
import {
  ContentWrapper,
  TotalValue,
  StyledParagraph,
  Bold,
} from "./ConfirmationModal.styled";

const getTotalValue = employees =>
  employees.reduce(
    (acc, curr) =>
      acc + toMoney(get(curr, "va", 0)) + toMoney(get(curr, "vr", 0)),
    0,
  );

const getmacefitsTypes = employees => {
  const vaString = "mac Alimentação";
  const vrString = "mac Refeição";
  const value = "R$ 0,00".toString();
  const hasVa = employees.some(el => el.va !== value && el.va !== undefined);
  const hasVr = employees.some(el => el.vr !== value && el.vr !== undefined);

  return `${hasVr ? vrString : ""}${hasVa && hasVr ? " e " : ""}${
    hasVa ? vaString : ""
  }`;
};

export const ConfirmationModal = ({
  openModal,
  closeModal,
  values,
  companySelected,
  goBackDetails,
}) => {
  const employees = get(values, "cpfs", []);
  const total = getTotalValue(employees);
  const [{ reason }] = employees;
  const totalOfEmployees = employees.length;
  const macefitTypeString = getmacefitsTypes(employees);
  const onClick = () =>
    openModal({
      children: (
        <ChargeBackTOS
          employees={values}
          company={companySelected}
          redirect={goBackDetails}
        />
      ),
    });

  return (
    <NewModal
      title="Confirmação de estorno"
      subtitle="Verifique os dados abaixo para realizar o estorno."
      id="modal-confirmation"
      width="706px"
      height="unset"
      okButtonProps={{
        value: "Confirmar",
        id: "btn-modal-confirmation-ok",
        disabled: total === 0,
        onClick,
      }}
      cancelButtonProps={{
        value: "Cancelar",
        onClick: closeModal,
        id: "btn-modal-confirmation-cancel",
      }}
    >
      <ContentWrapper id="content-modal-confirmation">
        <StyledParagraph margin="5px">Valor total solicitado:</StyledParagraph>
        <TotalValue id="field-total-value">{toMoneyMask(total)}</TotalValue>
        <StyledParagraph>
          Motivo do estorno: <Bold id="field-reason">{reason}</Bold>
        </StyledParagraph>
        <StyledParagraph>
          Quantidade de funcionários:{" "}
          <Bold id="field-total-employees">{totalOfEmployees}</Bold>
        </StyledParagraph>
        <StyledParagraph>
          Produtos: <Bold id="field-product-type">{macefitTypeString}</Bold>
        </StyledParagraph>
      </ContentWrapper>
    </NewModal>
  );
};

ConfirmationModal.propTypes = {
  openModal: func.isRequired,
  closeModal: func.isRequired,
  values: shape({}).isRequired,
  companySelected: shape({}).isRequired,
  goBackDetails: func.isRequired,
};

const mapStateToProps = ({ selectedCompanyTree }) => ({
  companySelected: selectedCompanyTree.selectedCompany,
});

const mapDispatchToProps = {
  openModal: ModalActions.OpenModal,
  closeModal: ModalActions.CloseModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal);
