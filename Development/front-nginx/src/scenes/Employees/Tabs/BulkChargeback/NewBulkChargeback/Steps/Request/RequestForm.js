import React, { PureComponent } from "react";
import { bool, shape, func } from "prop-types";

import { buttonTypes } from "@enums";

import { Form, CustomField, Select } from "src/modules/Form";

import {
  StyledButton,
  Hint,
  TextareaWrapper,
  ButtonWrapper,
  Section,
} from "./RequestForm.styled";

import { fields } from "./RequestForm.schema";

import TextAreaCpfs from "./TextAreaCpfs";

class RequestForm extends PureComponent {
  render() {
    const { isSubmitting, isValid, goBackToDetails, reasonInfo } = this.props;

    const reasonOptions =
      reasonInfo && reasonInfo.payload
        ? reasonInfo.payload.slice(1)
        : [{ key: "allReasons", description: "Todos" }];

    return (
      <Form {...this.props}>
        <Section>
          <Select
            name={fields.reason}
            label="Escolha o motivo do estorno"
            placeholder="Escolha o motivo do estorno"
            options={reasonOptions}
            width="290px"
            {...this.props}
          />
        </Section>

        <TextareaWrapper>
          <CustomField
            label="Insira os CPFs"
            name={fields.cpfs}
            render={({ field, form }) => (
              <TextAreaCpfs hasError={form.errors.cpfs} {...field} />
            )}
            {...this.props}
          />
          <Hint>Insira 1 CPF por linha.</Hint>
        </TextareaWrapper>

        <ButtonWrapper>
          <StyledButton
            buttonType={buttonTypes.light}
            type="button"
            value="Voltar"
            id="btn-back"
            onClick={goBackToDetails}
          />
          <StyledButton
            buttonType={buttonTypes.primary}
            type="submit"
            value="CONTINUAR"
            id="btn-submit"
            disabled={isSubmitting || !isValid}
          />
        </ButtonWrapper>
      </Form>
    );
  }
}

RequestForm.propTypes = {
  errors: shape({}).isRequired,
  values: shape({}).isRequired,
  touched: shape({}).isRequired,
  isSubmitting: bool.isRequired,
  isValid: bool.isRequired,
  goBackToDetails: func.isRequired,
  reasonInfo: shape({}).isRequired,
};

export default RequestForm;
