import React, { Component } from "react";
import { connect } from "react-redux";
import { string, func, number } from "prop-types";
import { foodVoucher, mealVoucher } from "src/assets";
import * as ModalActions from "src/redux/modules/modal/actions/modal";

import TemporaryBlock from "../TemporaryBlock";
import OrderNewVoucher from "../OrderNewVoucher";
import Voucher from "./Voucher";

const VOUCHER_TYPE = {
  1: "food",
  2: "meal",
};

class VoucherContainer extends Component {
  getIcon = typeId => {
    if (!typeId) {
      return "";
    }
    return VOUCHER_TYPE[typeId] === "food" ? foodVoucher : mealVoucher;
  };

  handleToggleBlockModal = () => {
    const { openModal, id, updateVouchers } = this.props;
    openModal({
      children: (
        <TemporaryBlock
          voucherId={id}
          toggleModal={this.closeModal}
          updateVouchers={updateVouchers}
        />
      ),
    });
  };

  handleToggleNewVoucherModal = type => () => {
    const { openModal, id, printedName, updateVouchers } = this.props;
    openModal({
      children: (
        <OrderNewVoucher
          toggleModal={this.closeModal}
          voucher={{ id, printedName, type }}
          updateVouchers={updateVouchers}
        />
      ),
    });
  };

  closeModal = () => {
    const { closeModal } = this.props;

    closeModal();
  };

  render() {
    const {
      id,
      idProduct,
      statusDate,
      cardNumber,
      printedName,
      statusName,
      index,
      updateVouchers,
      changeVoucherStatus,
    } = this.props;

    return (
      <Voucher
        id={id}
        idProduct={idProduct}
        statusDate={statusDate}
        cardNumber={cardNumber}
        printedName={printedName}
        statusName={statusName}
        index={index}
        updateVouchers={updateVouchers}
        changeVoucherStatus={changeVoucherStatus}
        getIcon={this.getIcon}
        handleToggleNewVoucherModal={this.handleToggleNewVoucherModal(
          idProduct,
        )}
        handleToggleBlockModal={this.handleToggleBlockModal}
      />
    );
  }
}

VoucherContainer.propTypes = {
  openModal: func.isRequired,
  closeModal: func.isRequired,
  id: string.isRequired,
  idProduct: string.isRequired,
  cardNumber: string.isRequired,
  statusDate: string.isRequired,
  printedName: string.isRequired,
  index: number.isRequired,
  updateVouchers: func.isRequired,
  statusName: string.isRequired,
  changeVoucherStatus: func.isRequired,
};

const mapDispatchToProps = {
  openModal: ModalActions.OpenModal,
  closeModal: ModalActions.CloseModal,
};

export default connect(null, mapDispatchToProps)(VoucherContainer);
