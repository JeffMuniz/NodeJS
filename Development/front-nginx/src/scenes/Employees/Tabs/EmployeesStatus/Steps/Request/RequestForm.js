import React, { PureComponent } from "react";
import { arrayOf, bool, func, shape } from "prop-types";

import { buttonTypes } from "@enums";
import { RadioButton } from "@common";

import { Form, CustomField, Select } from "src/modules/Form";
import TextAreaCpfs from "src/scenes/Employees/Tabs/BulkChargeback/NewBulkChargeback/Steps/Request/TextAreaCpfs";

import { fields } from "./RequestForm.schema";

import {
  ButtonWrapper,
  Hint,
  Section,
  StyledButton,
  TextareaWrapper,
} from "./RequestForm.styled";

class RequestForm extends PureComponent {
  render() {
    const {
      isSubmitting,
      isValid,
      errors,
      values,
      selectedReason,
      onChangeSelectedStatusOption,
    } = this.props;

    let text = "Selecione o motivo";

    if (values.option) {
      text = `${text} da ${values.option === "inativar" ? "in" : ""}ativação`;
    }

    return (
      <Form>
        <Section>
          <RadioButton
            id="employees_status_id"
            labelBefore={false}
            name={fields.option}
            onChange={onChangeSelectedStatusOption}
            options={[
              { id: "activate_option", label: "Ativar", value: "ativar" },
              {
                id: "inactivate_option",
                label: "Inativar",
                value: "inativar",
              },
            ]}
            selectedValue={values.option}
            error={errors.option || null}
            {...this.props}
          />
        </Section>

        <Section>
          <Select
            name={fields.reason}
            label={text}
            placeholder={text}
            options={selectedReason}
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
  selectedReason: arrayOf(shape({})).isRequired,
  onChangeSelectedStatusOption: func.isRequired,
};

export default RequestForm;
