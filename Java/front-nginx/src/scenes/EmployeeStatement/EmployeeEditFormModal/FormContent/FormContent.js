import React from "react";
import { func, shape, bool, string } from "prop-types";
import { FormGroup, TextInput, Datepicker } from "@common";
import { If, toOnlyAlpha } from "@utils";
import { Row, Col } from "react-flexbox-grid";
import { has, get } from "lodash";

import {
  ActionButton,
  FormContent,
  BottomWrapper,
  SubmitButtonCol,
  ErrorWrapper,
} from "./FormContent.styles";

import Tooltip from "../Tooltip/Tooltip.container";

const MASK_TYPE = "only-numbers";

const checkError = (touched, errors, name) =>
  has(errors, name) && get(touched, name) && get(errors, name);

const Form = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  errors,
  touched,
  isValid,
  isLoading,
  hasError,
  errorMessage,
  closeModal,
  setFieldValue,
}) => (
  <form onSubmit={handleSubmit}>
    <FormContent>
      <Row>
        <Col xs={6}>
          <FormGroup
            fieldId="ee_name"
            label="Nome"
            error={touched.name && errors.name}
          >
            <TextInput
              id="name"
              maxLength={100}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
          </FormGroup>
        </Col>
        <Col xs={6}>
          <FormGroup fieldId="ee_cpf" label="CPF" disabled>
            <TextInput
              id="cpf"
              disabled
              name="cpf"
              maskType="cpf"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.cpf}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <FormGroup
            fieldId="ee_registry"
            label="Matrícula"
            error={touched.registry && errors.registry}
          >
            <TextInput
              id="registry"
              name="registry"
              maxLength={12}
              onChange={handleChange}
              maskType={MASK_TYPE}
              onBlur={handleBlur}
              value={values.registry}
            />
          </FormGroup>
        </Col>
        <Col xs={6}>
          <FormGroup
            fieldId="ee_birthdate"
            label="Data de Nascimento"
            error={touched.birthDate && errors.birthDate}
          >
            <Tooltip title="Preencha com atenção! A data de nascimento correta é necessária para o acesso aos macefícios.">
              <Datepicker
                id="birthDate"
                name="birthDate"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.birthDate}
              />
            </Tooltip>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <FormGroup
            fieldId="ee_address_street"
            label="Endereço"
            error={checkError(touched, errors, "address.street")}
          >
            <TextInput
              id="address.street"
              name="address.street"
              maxLength={100}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address.street}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <FormGroup
            fieldId="ee_address_number"
            label="Número"
            error={checkError(touched, errors, "address.number")}
          >
            <TextInput
              id="address.number"
              name="address.number"
              maxLength={5}
              maskType={MASK_TYPE}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address.number}
            />
          </FormGroup>
        </Col>
        <Col xs={6}>
          <FormGroup
            fieldId="ee_address_complement"
            label="Complemento"
            error={checkError(touched, errors, "address.complement")}
          >
            <TextInput
              id="address.complement"
              name="address.complement"
              maxLength={30}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address.complement}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <FormGroup
            fieldId="ee_address_neighboohod"
            label="Bairro"
            error={checkError(touched, errors, "address.neighborhood")}
          >
            <TextInput
              id="address.neighborhood"
              name="address.neighborhood"
              maxLength={80}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address.neighborhood}
            />
          </FormGroup>
        </Col>
        <Col xs={6}>
          <FormGroup
            fieldId="ee_address_city"
            label="Cidade"
            error={checkError(touched, errors, "address.city")}
          >
            <TextInput
              id="address.city"
              name="address.city"
              maxLength={60}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address.city}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <FormGroup
            fieldId="ee_address_state"
            label="UF"
            error={checkError(touched, errors, "address.state")}
          >
            <TextInput
              id="address.state"
              name="address.state"
              maxLength={2}
              onChange={e =>
                setFieldValue("address.state", toOnlyAlpha(e.target.value))
              }
              onBlur={handleBlur}
              value={values.address.state}
            />
          </FormGroup>
        </Col>
        <Col xs={6}>
          <FormGroup
            fieldId="ee_address_zipcode"
            label="CEP"
            error={checkError(touched, errors, "address.zipcode")}
          >
            <TextInput
              id="address.zipcode"
              name="address.zipcode"
              maskType="zip-code"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address.zipcode}
            />
          </FormGroup>
        </Col>
      </Row>

      <If test={hasError}>
        <Row>
          <Col xs={12}>
            <ErrorWrapper>{errorMessage}</ErrorWrapper>
          </Col>
        </Row>
      </If>

      <BottomWrapper>
        <ActionButton
          id="ee_btn_cancel"
          type="button"
          onPress={closeModal}
          buttonType="light"
          value="CANCELAR"
          disabled={isLoading}
        />

        <SubmitButtonCol>
          <ActionButton
            id="ee_btn_submit"
            type="button"
            disabled={!isValid}
            onPress={handleSubmit}
            loading={isLoading}
            value="SALVAR"
          />
        </SubmitButtonCol>
      </BottomWrapper>
    </FormContent>
  </form>
);

Form.propTypes = {
  handleSubmit: func.isRequired,
  setFieldValue: func.isRequired,
  isLoading: bool.isRequired,
  hasError: bool.isRequired,
  isValid: bool.isRequired,
  handleChange: func.isRequired,
  handleBlur: func.isRequired,
  values: shape({}).isRequired,
  errors: shape({}).isRequired,
  touched: shape({}).isRequired,
  errorMessage: string.isRequired,
  closeModal: func.isRequired,
};

export default Form;
