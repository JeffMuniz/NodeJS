import React from "react";
import PropTypes from "prop-types";
import { Footer, Button } from "./styles";

const FooterWrapper = ({ handleCancel, handleConfirm }) => (
  <Footer>
    <Button
      id="button_cancel_order"
      onPress={handleCancel}
      value="cancelar pedido"
      buttonType="light"
    />
    <Button
      id="button_confirmation_order"
      onPress={handleConfirm}
      value="confirmar pedido"
      buttonType="warning"
    />
  </Footer>
);

FooterWrapper.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};

export default FooterWrapper;
