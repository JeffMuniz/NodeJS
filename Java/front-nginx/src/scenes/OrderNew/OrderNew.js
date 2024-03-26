import React from "react";
import { withRouter } from "react-router-dom";
import { shape, string } from "prop-types";
import { Col } from "react-styled-flexboxgrid";
// import EmployeesGroupAccess from "src/modules/EmployeesGroupAccess/EmployeesGroupAccess";

import { PedidoModeloLote, PedidoModeloPAP } from "@assets";
import { ContainerWrapper } from "@base";
import { deliveryTypes } from "@enums";
import { LimitChart, VirtualAccount, RowOrder } from "@common";
import { If } from "@utils";

import FormContainer from "./Form/Form.container";
import { RowStyled, TemplateText, Div } from "./OrderNew.styles";

// const shouldShow = !EmployeesGroupAccess();

const OrderNew = ({
  navigator,
  history,
  deliveryType,
  location: {
    state: { checkForLimit },
  },
}) => {
  const isDeliveryTypeHR = deliveryType === deliveryTypes.HR;
  return (
    <ContainerWrapper
      title="Novo Pedido"
      extraComponent={
        <RowOrder>
          <If test={checkForLimit}>
            <LimitChart />
          </If>
          <VirtualAccount title="Saldo da Conta Virtual" />
        </RowOrder>
      }
    >
      <Div>
        Envie o arquivo com seu novo pedido. Para orientações sobre os campos
        necessários e o preenchimento da planilha, baixe a
        <TemplateText
          href={isDeliveryTypeHR ? PedidoModeloLote : PedidoModeloPAP}
          download="Modelo-de-Pedidos-mac-visa-card.xlsx"
        >
          Planilha Modelo
        </TemplateText>
        . Serão aceitos os formatos xls, xlsx e .txt.
      </Div>
      <RowStyled>
        <Col xs={12}>
          <FormContainer navigator={navigator || history} />
        </Col>
      </RowStyled>
    </ContainerWrapper>
  );
};

OrderNew.propTypes = {
  location: shape({}).isRequired,
  deliveryType: string.isRequired,
};

export default withRouter(OrderNew);
