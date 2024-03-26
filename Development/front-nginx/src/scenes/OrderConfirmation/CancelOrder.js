import React from "react";
import PropTypes from "prop-types";

import { SimpleModal } from "@base";
import { SvgIcon } from "@common";

import { Button, ButtonWrapper, ContentModal, Text } from "./styles";

const CancelOrder = ({ hideModal, handleCancelOrder }) => (
  <SimpleModal onClickCloseIcon={hideModal} height="250px" width="430px">
    <ContentModal>
      <SvgIcon name="warning" size={80} />
      <Text>Tem certeza que deseja cancelar o pedido?</Text>
      <ButtonWrapper>
        <Button
          id="button_cancel_action"
          onPress={hideModal}
          value="não"
          buttonType="light"
          width="135px"
        />
        <Button
          id="button_cancel_order"
          onPress={handleCancelOrder}
          value="sim"
          buttonType="warning"
          width="135px"
        />
      </ButtonWrapper>
    </ContentModal>
  </SimpleModal>
);

CancelOrder.propTypes = {
  hideModal: PropTypes.func.isRequired,
  handleCancelOrder: PropTypes.func.isRequired,
};

export default CancelOrder;
