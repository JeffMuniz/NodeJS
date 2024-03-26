import React from "react";
// import moment from "moment";
import { shape, func, string, bool } from "prop-types";
import { Col, Row } from "react-flexbox-grid";

import { TextInput, FormGroup } from "@common";
import { Loading } from "@base";
import { If } from "@utils";

import {
  BackwardButton,
  ForwardButton,
  LoadingWrapper,
} from "./CreateUserForm.styles";
import {
  toCPFMask,
  toOnlyLetters,
  formatPhone,
} from "../../../utils/stringHelper";

const INDIVIDUAL_PROGRESS = 33.4;

export const customHandleBlur = (
  errors,
  handleBlur,
  updateProgress,
  onBlurCpfField,
) => event => {
  const progress = 100 - Object.values(errors).length * INDIVIDUAL_PROGRESS;
  const {
    target: { value: cpf },
  } = event;

  updateProgress(progress);
  handleBlur(event);
  if (onBlurCpfField) onBlurCpfField(cpf);
};

export const CreateUserForm = ({
  handleBlur,
  handleChange,
  handleSubmit,
  touched,
  errors,
  values,
  updateProgress,
  handleGoBack,
  isValid,
  onBlurCpfField,
  disabledInput,
  loading,
  buttonText,
}) => (
  <form onSubmit={handleSubmit}>
    <If test={loading}>
      <LoadingWrapper>
        <Loading loading />
      </LoadingWrapper>
    </If>
    <If test={!loading}>
      <Row>
        <Col md={3}>
          <FormGroup
            fieldId="add_user_cpf"
            label="CPF*"
            error={touched.cpf && errors.cpf}
            showSuccess={touched.cpf && !errors.cpf}
          >
            <TextInput
              id="cpf"
              name="cpf"
              onChange={handleChange}
              onBlur={customHandleBlur(
                errors,
                handleBlur,
                updateProgress,
                onBlurCpfField,
              )}
              value={toCPFMask(values.cpf)}
              maskType="cpf"
              maskChar=""
              placeholder="000.000.000-00"
            />
          </FormGroup>
        </Col>
        <Col xsOffset={4} xs={3}>
          <FormGroup
            fieldId="add_user_birthDate"
            label="Data de Nascimento"
            error={values.birthDate && touched.birthDate && errors.birthDate}
            showSuccess={
              values.birthDate && touched.birthDate && !errors.birthDate
            }
            disabled={disabledInput}
          >
            <TextInput
              id="birthDate"
              name="birthDate"
              onChange={handleChange}
              value={values.birthDate}
              onBlur={customHandleBlur(errors, handleBlur, updateProgress)}
              maskType="birthDay"
              maskChar=""
              placeholder="DD/MM/AAAA"
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup
            fieldId="add_user_name"
            label="Nome Completo*"
            error={touched.name && errors.name}
            showSuccess={touched.name && !errors.name}
            disabled={disabledInput}
          >
            <TextInput
              id="name"
              name="name"
              onChange={handleChange}
              maxLength={50}
              onBlur={customHandleBlur(errors, handleBlur, updateProgress)}
              value={toOnlyLetters(values.name)}
              maskType="text"
              maskChar=""
              placeholder="Mario da Silva"
            />
          </FormGroup>
        </Col>
        <Col xsOffset={3} xs={3}>
          <FormGroup
            fieldId="add_user_phone"
            label="Telefone"
            error={values.phone && touched.phone && errors.phone}
            showSuccess={values.phone && touched.phone && !errors.phone}
            disabled={disabledInput}
          >
            <TextInput
              id="phone"
              name="phone"
              onChange={handleChange}
              value={formatPhone(values.phone)}
              maxLength={15}
              onBlur={customHandleBlur(errors, handleBlur, updateProgress)}
              maskType=""
              maskChar=""
              placeholder="(11) 1.2345-6789"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <FormGroup
            fieldId="add_user_email"
            label="E-mail*"
            error={touched.email && errors.email}
            showSuccess={touched.email && !errors.email}
            disabled={disabledInput}
          >
            <TextInput
              id="email"
              name="email"
              onChange={handleChange}
              onBlur={customHandleBlur(errors, handleBlur, updateProgress)}
              value={values.email}
              maskType="email"
              maskChar=""
              placeholder="seuemail@email.com.br"
            />
          </FormGroup>
        </Col>
        <Col xsOffset={3} xs={4}>
          <FormGroup
            fieldId="add_user_mother"
            label="Nome da Mãe"
            error={touched.mother && errors.mother}
            showSuccess={touched.mother && !errors.mother}
            disabled={disabledInput}
          >
            <TextInput
              id="mother"
              name="mother"
              onChange={handleChange}
              value={toOnlyLetters(values.mother)}
              maskType=""
              maskChar=""
              placeholder="Joana da Silva"
            />
          </FormGroup>
        </Col>
      </Row>

      <Row center="xs">
        <Col md={3}>
          <BackwardButton
            id="btn_cancel_create_user"
            value="cancelar"
            buttonType="actionButton"
            onPress={handleGoBack}
          />
        </Col>
        <Col md={3}>
          <ForwardButton
            id="btn_create_user_submit"
            value={buttonText}
            disabled={!isValid}
            type="submit"
          />
        </Col>
      </Row>
    </If>
  </form>
);

CreateUserForm.propTypes = {
  handleBlur: func.isRequired,
  handleChange: func.isRequired,
  handleSubmit: func.isRequired,
  onBlurCpfField: func.isRequired,
  values: shape({
    cpf: string,
    name: string,
    email: string,
    birthDate: string,
    phone: string,
    mother: string,
  }).isRequired,
  errors: shape({
    cpf: string,
    name: string,
    email: string,
    birthDate: string,
    phone: string,
    mother: string,
  }).isRequired,
  touched: shape({
    cpf: bool,
    name: bool,
    email: bool,
    birthDate: string,
    phone: string,
    mother: string,
  }).isRequired,
  updateProgress: func.isRequired,
  handleGoBack: func.isRequired,
  isValid: bool.isRequired,
  disabledInput: bool.isRequired,
  loading: bool.isRequired,
  buttonText: string.isRequired,
};

export default CreateUserForm;
