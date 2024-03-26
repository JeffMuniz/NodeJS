import React, { Fragment } from "react";

import { func, bool, string } from "prop-types";
import { CheckBox, Switch, Button } from "@common";
import { buttonTypes as buttonTypesEnum } from "@enums";
import { CustomField } from "src/modules/Form";

import TooltipBalanceTransfer from "./TooltipBalanceTransfer/TooltipBalanceTransfer";

import {
  Container,
  Main,
  Title,
  SwitchContainer,
  Text,
  ButtonsWrapper,
  InputContainer,
  InputWrapper,
  ButtonBalanceTransfer,
  TextWrapper,
  Relative,
} from "./BalanceTransfer.styles";

export const BalanceTransfer = ({
  hasBalanceTransfer,
  hasFoodToMeal,
  hasMealToFood,
  onChangeTransfer,
  hasAcceptTerms,
  tooltipBalanceTransfer,
  mealValue,
  foodValue,
  showTooltip,
  visibleTooltip,
  changeValue,
  onSubmit,
  loading,
}) => (
  <Container>
    <Main>
      <Title>Painel de Controle</Title>

      <SwitchContainer>
        <Switch
          id="balance_transfer"
          checked={hasBalanceTransfer}
          name="balance_transfer"
          onChange={() =>
            onChangeTransfer("hasBalanceTransfer", !hasBalanceTransfer)
          }
        />
        {tooltipBalanceTransfer && (
          <Relative>
            <TooltipBalanceTransfer
              close={() =>
                onChangeTransfer("hasBalanceTransfer", !hasBalanceTransfer)
              }
              typeTooltip="hasBalanceTransfer"
            />
          </Relative>
        )}
        <TextWrapper>
          <Text>Habilitar a transferência de saldo.</Text>
          <ButtonBalanceTransfer onClick={() => showTooltip()}>
            Entenda a transferência de saldo
          </ButtonBalanceTransfer>
          {visibleTooltip && (
            <TooltipBalanceTransfer
              close={() => showTooltip()}
              typeTooltip="transferLimit"
            />
          )}
        </TextWrapper>
      </SwitchContainer>

      <Text>
        * Esta funcionalidade permite realizar a transferência apenas para o
        macefício de mesma titularidade.
      </Text>

      {hasBalanceTransfer && (
        <Fragment>
          <Text>Para concluir, escolha a modalidade:</Text>

          <SwitchContainer>
            <Switch
              id="foodToMeal"
              checked={hasFoodToMeal}
              name="foodToMeal"
              onChange={() => onChangeTransfer("hasFoodToMeal", !hasFoodToMeal)}
            />
            <Text>
              Autorizo a transferência de saldo do cartão{" "}
              <strong>alimentação para refeição.</strong>
            </Text>
          </SwitchContainer>

          <SwitchContainer>
            <Switch
              id="mealToFood"
              checked={hasMealToFood}
              name="mealToFood"
              onChange={() => onChangeTransfer("hasMealToFood", !hasMealToFood)}
            />
            <Text>
              Autorizo a transferência de saldo do cartão{" "}
              <strong>refeição para alimentação.</strong>
            </Text>
          </SwitchContainer>
        </Fragment>
      )}
    </Main>
    <Main>
      <Title>Valor mínimo de utilização</Title>
      <Text>Defina um valor mínimo de uso para macefício.</Text>

      <InputContainer>
        <InputWrapper>
          <span>R$</span>
          <CustomField
            label="Alimentação"
            value={foodValue}
            maxLength="12"
            disabled={!hasFoodToMeal}
            onChange={({ target }) => changeValue("foodValue", target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <span>R$</span>
          <CustomField
            label="Refeição"
            value={mealValue}
            maxLength="12"
            disabled={!hasMealToFood}
            onChange={({ target }) => changeValue("mealValue", target.value)}
          />
        </InputWrapper>
      </InputContainer>

      <Text>
        * O não preenchimento indica que os colaboradores podem transferir o
        valor integral de cada macefício.
      </Text>

      <CheckBox
        label="Concordo com as habilitações de transferência de saldo entre os 
        macefícios dos cartões mac Refeição e Alimentação, de todos os meus 
        colaboradores, conforme acordo sindical da minha categoria isentando a 
        mac de qualquer responsabilidade."
        checked={hasAcceptTerms}
        onChange={() => onChangeTransfer("hasAcceptTerms", !hasAcceptTerms)}
        name="accept_terms"
        id="accept_terms"
        disabled={false}
      />

      <ButtonsWrapper>
        <Button
          id="button_submit"
          onPress={() => onSubmit()}
          value="Salvar Alteração"
          buttonType={buttonTypesEnum.primary}
          type="submit"
          disabled={!hasAcceptTerms}
          loading={loading}
        />
      </ButtonsWrapper>
    </Main>
  </Container>
);

BalanceTransfer.propTypes = {
  hasBalanceTransfer: bool.isRequired,
  hasFoodToMeal: bool.isRequired,
  hasMealToFood: bool.isRequired,
  onChangeTransfer: func.isRequired,
  hasAcceptTerms: bool.isRequired,
  tooltipBalanceTransfer: bool.isRequired,
  mealValue: string.isRequired,
  foodValue: string.isRequired,
  showTooltip: func.isRequired,
  visibleTooltip: bool.isRequired,
  changeValue: func.isRequired,
  onSubmit: func.isRequired,
  loading: bool.isRequired,
};

export default BalanceTransfer;
