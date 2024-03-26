import React from "react";
import { func, string, bool } from "prop-types";
import { Col } from "react-styled-flexboxgrid";
import { If } from "@utils";
import { deliveryTypes } from "@enums";

import { Button, SvgIcon } from "@common";

import { RowStyled, Text, Divider, IconWrapper } from "./EmptyDashboard.styles";

const EmptyDashboard = ({
  goToPageNewOrder,
  goToNewDeliveryPlace,
  thereIsActiveDP,
  deliveryType,
}) => (
  <div>
    <IconWrapper>
      <SvgIcon name="emptyGrid" />
    </IconWrapper>
    <Text id="emptyOrderText">
      Não encontramos pedidos para os filtros que você selecionou.
    </Text>
    <Divider />
    <RowStyled>
      <If test={deliveryType === deliveryTypes.door2Door || thereIsActiveDP}>
        <Col xs={6}>
          <Button
            id="or_button_new_order"
            value="fazer primeiro pedido"
            onClick={goToPageNewOrder}
          />
        </Col>
      </If>
      <If test={deliveryType === deliveryTypes.HR && !thereIsActiveDP}>
        <Col xs={6}>
          <Button
            id="or_button_new_dp"
            value="cadastrar locais de entrega"
            onClick={goToNewDeliveryPlace}
          />
        </Col>
      </If>
    </RowStyled>
  </div>
);

EmptyDashboard.defaultProps = {
  goToPageNewOrder: () => undefined,
};

EmptyDashboard.propTypes = {
  goToPageNewOrder: func,
  deliveryType: string.isRequired,
  goToNewDeliveryPlace: func.isRequired,
  thereIsActiveDP: bool.isRequired,
};

export default EmptyDashboard;
