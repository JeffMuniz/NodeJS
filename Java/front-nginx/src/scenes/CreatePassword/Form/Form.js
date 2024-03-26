import React from "react";
import { string, bool, shape, func } from "prop-types";
import { PasswordRule } from "@utils";

import { Recaptcha } from "src/modules/Recaptcha";
import { getRecaptchaKey } from "src/modules/UrlManager/UrlManager";

import { Col, Row } from "react-flexbox-grid";

import { Button, ErrorText, TextInput, RulePassword } from "@common";

import {
  RowError,
  FormGroup,
  RowButton,
  PasswordTip,
  Title,
  RecaptchaWrapper,
} from "./Form.styles";

export const Form = ({
  touched,
  errors,
  values,
  handleSubmit,
  handleChange,
  handleBlur,
  isLoading,
  requestError,
  isValid,
  eyeViewPassword,
  maskType,
  setFieldValue,
  onVerifyRecaptcha,
  onErrored,
  isRobot,
}) => (
  <form onSubmit={handleSubmit}>
    <Row center="xs">
      <Title>
        <strong>lembre-se que sua senha precisa ter ao menos:</strong>
      </Title>
      <PasswordTip>
        <RulePassword
          text="Mínimo 8 e máximo 15 caracteres"
          value={values.check ? values.confirmPassword : values.password}
          error={touched.password && errors.password}
          rule={PasswordRule.minimumNumber}
          id="min-caracter"
        />
        <RulePassword
          text="uma letra maiúscula"
          value={values.check ? values.confirmPassword : values.password}
          error={touched.password && errors.password}
          rule={PasswordRule.Uppercase}
          id="um-maiscula"
        />
      </PasswordTip>
      <PasswordTip>
        <RulePassword
          text="Uma letra minúscula"
          value={values.check ? values.confirmPassword : values.password}
          error={touched.password && errors.password}
          rule={PasswordRule.Lowercase}
          id="um-minuscula"
        />
        <RulePassword
          text="Um caractere especial (Exemplo: @ # * & % $)"
          value={values.check ? values.confirmPassword : values.password}
          error={touched.password && errors.password}
          rule={PasswordRule.specialCharacter}
          id="carcter-especial"
        />
        <RulePassword
          text="Um número"
          value={values.check ? values.confirmPassword : values.password}
          error={touched.password && errors.password}
          rule={PasswordRule.Number}
          id="um-number"
        />
      </PasswordTip>
    </Row>
    <FormGroup
      fieldId="cp_password"
      label="Criar uma Senha"
      error={touched.password && errors.password}
      showSuccess={touched.password && !errors.password}
    >
      <TextInput
        id="password"
        name="password"
        maskType={maskType.newPassword}
        onChange={e => {
          handleChange(e);
          setFieldValue("check", false);
        }}
        onBlur={handleBlur}
        value={values.password}
        placeholder="Insira aqui sua senha"
        maxLength={15}
        passwordView={() => eyeViewPassword("newPassword")}
        eye
      />
    </FormGroup>

    <FormGroup
      fieldId="cp_confirm_password"
      label="Confirmar senha"
      error={touched.confirmPassword && errors.confirmPassword}
      showSuccess={touched.confirmPassword && !errors.confirmPassword}
    >
      <TextInput
        id="confirmPassword"
        maskType={maskType.checkPassword}
        name="confirmPassword"
        onChange={e => {
          handleChange(e);
          setFieldValue("check", true);
        }}
        onBlur={handleBlur}
        value={values.confirmPassword}
        error={touched.confirmPassword && errors.confirmPassword}
        placeholder="Repita a sua senha"
        maxLength={15}
        passwordView={() => eyeViewPassword("checkPassword")}
        eye
      />
    </FormGroup>
    <RowError>
      <Col xs={12}>{requestError && <ErrorText>{requestError}</ErrorText>}</Col>
    </RowError>
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
        <Button
          action="Enviou form 'Criar a Senha'"
          disabled={!isValid || isRobot}
          id="cp_btn_submit"
          type="button"
          onPress={handleSubmit}
          loading={isLoading}
          value="Continuar"
        />
      </Col>
    </RowButton>
  </form>
);

export default Form;

Form.propTypes = {
  handleSubmit: func.isRequired,
  isValid: bool.isRequired,
  isLoading: bool,
  handleChange: func.isRequired,
  handleBlur: func.isRequired,
  values: shape({
    password: string,
    confirmPassword: string,
    terms: bool,
  }).isRequired,
  errors: shape({
    password: string,
    confirmPassword: string,
    terms: string,
  }).isRequired,
  touched: shape({
    password: bool,
    confirmPassword: bool,
    terms: bool,
  }).isRequired,
  requestError: string,
  maskType: string,
  eyeViewPassword: func,
  setFieldValue: func,
  onVerifyRecaptcha: func.isRequired,
  onErrored: func.isRequired,
  isRobot: bool.isRequired,
};

Form.defaultProps = {
  requestError: null,
  isLoading: false,
  maskType: "password",
  eyeViewPassword: () => null,
  setFieldValue: () => null,
};
