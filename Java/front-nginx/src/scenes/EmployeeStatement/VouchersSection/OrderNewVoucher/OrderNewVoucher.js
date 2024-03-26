import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col } from "react-styled-flexboxgrid";

import { buttonTypes } from "@enums";

import { Select, SvgIcon } from "@common";

import {
  CancelButton,
  SubmitButton,
  ButtonsArea,
} from "../Voucher/Voucher.styles";

import {
  Text,
  VoucherContainer,
  SelectWrapp,
  RowError,
  ErrorText,
  IconWrapper,
} from "./OrderNewVoucher.styles";

const SELECT_OPTIONS = [
  { id: 1, name: "perda" },
  { id: 2, name: "roubo" },
];
const VOUCHER_TYPE_NAME = {
  1: "mac Alimentação",
  2: "mac Refeição",
};

class OrderNewVoucher extends Component {
  state = {
    reason: null,
  };

  handleReasonChange = reason => {
    this.setState({ reason });
  };

  render() {
    const {
      onSubmitNewVoucher,
      closeModal,
      voucher,
      error,
      isLoading,
    } = this.props;
    const { reason } = this.state;
    return (
      <VoucherContainer>
        <IconWrapper>
          <SvgIcon name="wallet" />
        </IconWrapper>
        <Text>
          {`Por favor, informe o motivo da solicitação de um novo cartão
          ${VOUCHER_TYPE_NAME[voucher.type]}:`}
        </Text>
        <SelectWrapp>
          <Select
            values={SELECT_OPTIONS}
            onValueChange={this.handleReasonChange}
            isCapitalized
          />
        </SelectWrapp>
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
            id="on_button_cancel"
            onClick={() => closeModal()}
            buttonType={buttonTypes.light}
          />
          <SubmitButton
            onClick={() => onSubmitNewVoucher(reason && reason.id)}
            disabled={!reason || isLoading}
            id="on_button_confirm"
            value="confirmar"
            loading={isLoading}
          />
        </ButtonsArea>
      </VoucherContainer>
    );
  }
}

OrderNewVoucher.propTypes = {
  voucher: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onSubmitNewVoucher: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([PropTypes.shape, PropTypes.bool]),
  isLoading: PropTypes.bool,
};

OrderNewVoucher.defaultProps = {
  isLoading: false,
  error: {
    message: "Erro de conexão",
  },
};

export default OrderNewVoucher;
