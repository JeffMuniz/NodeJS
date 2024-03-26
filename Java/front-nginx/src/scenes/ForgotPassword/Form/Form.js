import React from "react";
import { bool, string, func, shape } from "prop-types";
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
} from "./Form.styles";

const Form = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  requestError,
  isLoading,
  emailForgotStatus,
  cpfForgotStatus,
  changeInputStatus,
  isValid,
  onVerifyRecaptcha,
  onErrored,
  isRobot,
}) => (
  <form onSubmit={handleSubmit}>
    <Row center="md">
      <Col xs={12} md={12}>
        <FormGroup
          fieldId="lg_fp_cpf"
          label="CPF"
          error={touched.forgotCpf && errors.forgotCpf}
          showSuccess={touched.forgotCpf && !errors.forgotCpf}
          responseError={cpfForgotStatus}
        >
          <TextInput
            id="forgotCpf"
            name="forgotCpf"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.forgotCpf}
            error={touched.forgotCpf && errors.forgotCpf}
            onClick={changeInputStatus("cpfForgotStatus")}
            placeholder="Insira o seu CPF aqui"
            maskType="cpf"
            maskChar=""
          />
        </FormGroup>
      </Col>
    </Row>
    <Row center="md">
      <Col xs={12} md={12}>
        <FormGroup
          fieldId="lg_fp_email"
          label="E-mail"
          error={touched.email && errors.email}
          showSuccess={touched.email && !errors.email}
          responseError={emailForgotStatus}
        >
          <TextInput
            id="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            onClick={changeInputStatus("emailForgotStatus")}
            value={values.email}
            error={touched.email && errors.email}
            placeholder="Insira o seu e-mail"
          />
        </FormGroup>
      </Col>
    </Row>
    <If test={requestError}>
      <Row center="md">
        <Col xs={12} md={12}>
          <ErrorText id="ResetPwdError">{requestError}</ErrorText>
        </Col>
      </Row>
    </If>
    <RowButton center="md">
      <Col xs={12} md={12}>
        <RecaptchaWrapper>
          <Recaptcha
            sitekey={getRecaptchaKey()}
            onChange={onVerifyRecaptcha}
            onExpired={onErrored}
            onErrored={onErrored}
            hl="pt-BR"
          />
          <div />
        </RecaptchaWrapper>
        <SubmitButton
          action="Enviou form 'Esqueceu a Senha'"
          id="lg_fp_btn_submit"
          type="submit"
          onPress={handleSubmit}
          loading={isLoading}
          disabled={!isValid || isRobot}
          value="CONTINUAR"
        />
      </Col>
    </RowButton>
  </form>
);

Form.propTypes = {
  handleSubmit: func.isRequired,
  isLoading: bool,
  handleChange: func.isRequired,
  handleBlur: func.isRequired,
  values: shape({
    email: string,
    cpf: string,
  }).isRequired,
  errors: shape({
    email: string,
    cpf: string,
  }).isRequired,
  touched: shape({
    email: bool,
    cpf: bool,
  }).isRequired,
  requestError: string,
  emailForgotStatus: bool,
  cpfForgotStatus: bool,
  changeInputStatus: func.isRequired,
  isValid: bool.isRequired,
  onVerifyRecaptcha: func.isRequired,
  onErrored: func.isRequired,
  isRobot: bool.isRequired,
};

Form.defaultProps = {
  requestError: null,
  isLoading: false,
  emailForgotStatus: false,
  cpfForgotStatus: false,
};

export default Form;
