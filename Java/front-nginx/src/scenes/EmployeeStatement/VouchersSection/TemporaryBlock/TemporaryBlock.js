import React, { PureComponent } from "react";
import { shape, string, number, oneOfType, func, bool } from "prop-types";
import { Col } from "react-styled-flexboxgrid";

import SingleDatePicker from "src/common/SingleDatePicker/SingleDatePicker";
import { buttonTypes } from "@enums";
import { SvgIcon } from "@common";

import {
  Title,
  Text,
  Times,
  VoucherContainer,
  RadioInput,
  RowError,
  ErrorText,
  ButtonsArea,
  ButtonBlockContainer,
  StyledPeriod,
} from "./TemporaryBlock.styles";

import {
  CancelButton,
  SubmitButton,
  StyledLink,
} from "../Voucher/Voucher.styles";

const ONE_MONTH = "ONE_MONTH";
const UNDETERMINED = "UNDETERMINED";

class TemporaryBlock extends PureComponent {
  render() {
    const {
      closeModal,
      onSetCustomPeriod,
      onOpenDatePicker,
      onCloseDatePicker,
      datepickerOpen,
      selectedDate,
      uptillDate,
      handleDateChange,
      handleSubmit,
      error,
      isLoading,
    } = this.props;

    return (
      <VoucherContainer>
        <Title>Bloquear temporariamente</Title>
        <Text>
          Escolha abaixo o período que deseja manter este cartão bloqueado.
        </Text>
        <Times>
          <RadioInput
            onClick={() => handleDateChange({ id: ONE_MONTH })}
            id="tb_onemouth_radio"
          >
            <SvgIcon
              name={uptillDate.id === ONE_MONTH ? "checkedBox" : "uncheckedBox"}
            />
          </RadioInput>
          Por 1 mês
        </Times>
        <Times>
          <RadioInput
            onClick={() => handleDateChange({ id: UNDETERMINED })}
            id="tb_undetermined_radio"
          >
            <SvgIcon
              name={
                uptillDate.id === UNDETERMINED ? "checkedBox" : "uncheckedBox"
              }
            />
          </RadioInput>
          Prazo indeterminado
        </Times>
        <ButtonBlockContainer>
          {selectedDate && (
            <StyledPeriod>
              Período escolhido: <b>bloqueado até {selectedDate}</b>
            </StyledPeriod>
          )}

          <StyledLink id="tb_selectdate" onClick={onOpenDatePicker}>
            {selectedDate ? "Editar" : "Definir data do fim do bloqueio"}
          </StyledLink>
        </ButtonBlockContainer>
        {datepickerOpen && (
          <SingleDatePicker
            id="pdd_date"
            onDateChange={onSetCustomPeriod}
            onCloseDatePicker={onCloseDatePicker}
            initialDate={selectedDate}
            autoFocus
          />
        )}
        {error && (
          <RowError>
            <Col xs={12}>
              <ErrorText>{error.message}</ErrorText>
            </Col>
          </RowError>
        )}
        <ButtonsArea>
          <CancelButton
            value="cancelar"
            id="tb_button_cancel"
            buttonType={buttonTypes.light}
            onClick={() => closeModal()}
          />
          <SubmitButton
            onClick={handleSubmit()}
            disabled={!uptillDate.id || isLoading}
            id="tb_button_save"
            value="salvar"
            loading={isLoading}
          />
        </ButtonsArea>
      </VoucherContainer>
    );
  }
}

TemporaryBlock.propTypes = {
  error: oneOfType([shape, bool]),
  closeModal: func.isRequired,
  onCloseDatePicker: func.isRequired,
  onSetCustomPeriod: func.isRequired,
  onOpenDatePicker: func.isRequired,
  datepickerOpen: bool.isRequired,
  selectedDate: string.isRequired,
  uptillDate: shape({
    id: oneOfType([string, number]),
  }).isRequired,
  handleDateChange: func.isRequired,
  handleSubmit: func.isRequired,
  isLoading: bool,
};

TemporaryBlock.defaultProps = {
  error: { message: "Erro de conexão" },
  isLoading: false,
};

export default TemporaryBlock;
