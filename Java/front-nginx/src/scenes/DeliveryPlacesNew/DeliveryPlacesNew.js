import React from "react";
import { shape } from "prop-types";
import { Col } from "react-styled-flexboxgrid";

import navigate from "src/routes/navigate";
import { Routes } from "src/routes/consts";

import { ContainerWrapper } from "@base";

import FormContainer from "./Form/Form.container";
import { RowStyled } from "./DeliveryPlacesNew.styles";

const DeliveryPlacesNew = ({ navigator, history, location }) => {
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
      <RowStyled>
        <Col xs={12}>
          <FormContainer navigator={navigator || history} location={location} />
        </Col>
      </RowStyled>
    </ContainerWrapper>
  );
};

DeliveryPlacesNew.propTypes = {
  location: shape({
    state: shape({}),
  }),
};

DeliveryPlacesNew.defaultProps = {
  location: {},
};

export default DeliveryPlacesNew;
