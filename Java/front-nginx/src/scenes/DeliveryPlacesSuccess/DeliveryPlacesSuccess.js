import React from "react";
import { Col, Row } from "react-styled-flexboxgrid";

import navigate from "src/routes/navigate";
import { Routes } from "src/routes/consts";

import { ContainerWrapper } from "@base";
import { SvgIcon } from "@common";

import {
  PendingWrapper,
  ImageWrapper,
  Title,
  Text,
  Separator,
} from "./DeliveryPlacesSuccess.styles";

const DeliveryPlacesSuccess = ({ navigator, history }) => {
  const handleReturn = () => {
    const browserHistory = navigator || history;
    const navigateParams = {
      route: Routes.DELIVERY_PLACES,
    };

    navigate(browserHistory, navigateParams);
  };

  return (
    <ContainerWrapper
      title="Validação planilha"
      showBackIcon
      showHeaderBorder
      headerClickHandler={handleReturn}
    >
      <Row id="delivery-places-success">
        <Col xs={12}>
          <PendingWrapper>
            <ImageWrapper>
              <SvgIcon name="pendingStatus" size={124} />
            </ImageWrapper>
            <Title>
              Tudo certo! Seus locais de entrega estão sendo processados
            </Title>
            <Separator />
            <Text>
              As unidades de entrega já estão em processamento, por favor
              aguarde alguns minutos.
            </Text>
          </PendingWrapper>
        </Col>
      </Row>
    </ContainerWrapper>
  );
};

export default DeliveryPlacesSuccess;
