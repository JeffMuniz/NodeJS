import React, { Fragment } from "react";
import { func, string } from "prop-types";
import { Button } from "@common";
import { buttonTypes as buttonTypesEnum } from "@enums";

import {
  Container,
  Text,
  Overlay,
  ButtonWrapper,
  TextWrapper,
} from "./TooltipBalanceTransfer.styles";

const TooltipBalanceTransfer = ({ close, typeTooltip }) => {
  const helpTransfer = () => (
    <Fragment>
      <Text>
        A transferência de saldo são vinculados ao CPF do portador e CNPJ da
        empresa.
      </Text>
      <Text>
        O RH pode determinar um valor mínimo que deve permanecer em cada
        maceficio para uso especifico dentro da rede de alimentação e/ou
        refeição, respeitando os acordos sindicais. Ex:
      </Text>
      <Text>Valor mínimo cadastrado pelo RH no Alimentação: R$200,00</Text>
      <Text>Saldo do cartão do colaborador Carlos: R$700,00</Text>
      <Text>Valor disponível para transferência para o Carlos: R$500,00</Text>
      <Text>
        O valor de R$200,00 ficará no cartão para que o Carlos utilize apenas na
        rede de alimentação.
      </Text>
      <Text>
        Se nenhum valor for cadastrado pelo RH, o portador poderá transferir o
        saldo total do seu maceficio para o outro produto.
      </Text>
      <Text>
        O RH poderá editar as regras voltando a esta tela para gerenciamento.
      </Text>
      <Text>
        Ao aceitar os termos e Salvar, as edições já estarão disponíveis para
        todos os seus colaboradores
      </Text>
    </Fragment>
  );

  const infoBalanceTransfer = () => (
    <Fragment>
      <Text>
        Para habilitar essa funcionalidade aos seus colaboradores você precisa
        ter os dois maceficios contratados:
      </Text>
      <Text>
        Alimentação e Refeição, desta forma seus colaboradores poderão fazer
        transferencia de saldo entre seus cartões.
      </Text>
    </Fragment>
  );

  return (
    <Fragment>
      <Container
        className={typeTooltip === "hasBalanceTransfer" ? "min-container" : ""}
      >
        <TextWrapper>
          {typeTooltip === "transferLimit" && helpTransfer()}
          {typeTooltip === "hasBalanceTransfer" && infoBalanceTransfer()}
        </TextWrapper>
        <ButtonWrapper>
          <Button
            id="button_submit"
            onPress={() => close()}
            value="Fechar"
            buttonType={buttonTypesEnum.primary}
          />
        </ButtonWrapper>
      </Container>
      <Overlay onClick={() => close()} />
    </Fragment>
  );
};

TooltipBalanceTransfer.propTypes = {
  close: func.isRequired,
  typeTooltip: string.isRequired,
};

export default TooltipBalanceTransfer;
