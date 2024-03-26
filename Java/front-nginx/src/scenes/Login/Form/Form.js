import React from "react";
import { func, bool, shape, string } from "prop-types";
import { Row, Col } from "react-flexbox-grid";
import { If } from "@utils";
import { FormGroup, TextInput } from "@common";
import { Recaptcha } from "src/modules/Recaptcha";
import { getRecaptchaKey } from "src/modules/UrlManager/UrlManager";

import {
  SubmitButton,
  RowButton,
  ErrorText,
  RecaptchaWrapper,
  StyledForm,
} from "./Form.styles";

export const handleInputOnClick = (changeInputStatus, field) => () =>
  changeInputStatus(field);

export const Form = ({
  handleSubmit,
  handleBlur,
  handleChange,
  isLoading,
  values,
  errors,
  touched,
  cpfStatus,
  passwordStatus,
  changeInputStatus,
  requestError,
  isValid,
  goToForgotPassword,
  onVerifyRecaptcha,
  onErrored,
  isRobot,
}) => (
  <StyledForm onSubmit={handleSubmit}>
    <Row center="md">
      <Col xs={12} md={12}>
        <FormGroup
          fieldId="lg_cpf"
          label="CPF"
          error={touched.cpf && errors.cpf}
          responseError={cpfStatus}
          showSuccess={touched.cpf && !errors.cpf}
        >
          <TextInput
            id="cpf"
            name="cpf"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.cpf}
            error={touched.cpf && errors.cpf}
            onClick={handleInputOnClick(changeInputStatus, "cpfStatus")}
            maskType="cpf"
            maskChar=""
            placeholder="Digite seu CPF"
          />
        </FormGroup>
      </Col>
    </Row>
    <Row center="md">
      <Col xs={12} md={12}>
        <FormGroup
          fieldId="lg_password"
          label="Senha"
          error={touched.password && errors.password}
          showSuccess={touched.password && !errors.password}
          responseError={passwordStatus}
        >
          <TextInput
            id="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            onClick={handleInputOnClick(changeInputStatus, "passwordStatus")}
            value={values.password}
            error={touched.password && errors.password}
            placeholder="Digite sua senha"
            maskType="password"
          />
        </FormGroup>
      </Col>
    </Row>
    <If test={requestError}>
      <Row center="md">
        <Col xs={12} md={12}>
          <ErrorText id="PwdError">{requestError}</ErrorText>
        </Col>
      </Row>
    </If>
    <RowButton center="md">
      <Col xs={12} md={12}>
        <RecaptchaWrapper>
          <Recaptcha
            sitekey={getRecaptchaKey()}
            onChange={onVerifyRecaptcha}
            onErrored={onErrored}
            onExpired={onErrored}
            hl="pt-BR"
          />
          <div />
        </RecaptchaWrapper>
        <SubmitButton
          action="Enviou form 'Login'"
          id="lg_btn_submit"
          type="submit"
          onPress={handleSubmit}
          disabled={!isValid || isRobot}
          loading={isLoading}
          value="FAZER LOGIN"
        />
      </Col>
      <Col xs={12}>
        <SubmitButton
          action="Esqueceu a senha"
          buttonType="light"
          id="lg_btn_forgot_password"
          onPress={goToForgotPassword}
          value="ESQUECEU SUA SENHA?"
        />
      </Col>
    </RowButton>
  </StyledForm>
);

Form.propTypes = {
  handleSubmit: func.isRequired,
  isLoading: bool,
  handleChange: func.isRequired,
  handleBlur: func.isRequired,
  values: shape({
    password: string,
    cpf: string,
  }).isRequired,
  errors: shape({
    password: string,
    cpf: string,
  }).isRequired,
  touched: shape({
    password: bool,
    cpf: bool,
  }).isRequired,
  requestError: string,
  cpfStatus: bool,
  passwordStatus: bool,
  isValid: bool.isRequired,
  changeInputStatus: func.isRequired,
  goToForgotPassword: func.isRequired,
  onVerifyRecaptcha: func.isRequired,
  onErrored: func.isRequired,
  isRobot: bool.isRequired,
};

Form.defaultProps = {
  requestError: null,
  isLoading: false,
  cpfStatus: false,
  passwordStatus: false,
};

export default Form;
