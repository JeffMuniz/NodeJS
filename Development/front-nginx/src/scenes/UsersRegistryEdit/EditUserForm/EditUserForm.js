import React from "react";
import { func, string, bool, shape } from "prop-types";
import { Col, Row } from "react-flexbox-grid";
import { TextInput, FormGroup } from "@common";
import { Loading } from "@base";
import { If } from "@utils";
import {
  BackwardButton,
  ForwardButton,
  LoadingWrapper,
} from "./EditUserForm.styles";
import LogHistoryContainer from "../../LogHistory/LogHistory.container";
import { toOnlyLetters, formatPhone } from "../../../utils/stringHelper";

const EditUserForm = ({
  handleBlur,
  handleChange,
  handleGoBack,
  handleSubmit,
  errors,
  touched,
  isValid,
  values,
  loading,
  isLoggedUser,
  userStatus,
}) => (
  <form onSubmit={handleSubmit}>
    <If test={loading}>
      <LoadingWrapper>
        <Loading loading />
      </LoadingWrapper>
    </If>
    <If test={!loading}>
      <Row>
        <Col md={2}>
          <FormGroup
            fieldId="edit_user_cpf"
            label="CPF*"
            error={errors.cpf}
            showSuccess={!errors.cpf}
            disabled
          >
            <TextInput
              id="cpf"
              name="cpf"
              disabled
              onChange={handleChange}
              value={values.cpf}
              maskType="cpf"
              maskChar=""
              placeholder="111.111.111-11"
            />
          </FormGroup>
        </Col>
        <Col xsOffset={4} md={3}>
          <FormGroup
            fieldId="edit_user_birthDate"
            label="Data de Nascimento"
            error={values.birthDate && errors.birthDate}
            showSuccess={values.birthDate && !errors.birthDate}
          >
            <TextInput
              id="birthDate"
              name="birthDate"
              onChange={handleChange}
              value={values.birthDate}
              maskType="birthDay"
              maskChar=""
              placeholder="01/01/1950"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <FormGroup
            fieldId="edit_user_name"
            label="Nome Completo*"
            error={errors.name}
            showSuccess={!errors.name}
          >
            <TextInput
              id="name"
              name="name"
              onChange={handleChange}
              maxLength={50}
              value={toOnlyLetters(values.name)}
              maskType="text"
              maskChar=""
              placeholder="Mario da Silva"
            />
          </FormGroup>
        </Col>
        <Col xsOffset={2} md={3}>
          <FormGroup
            fieldId="edit_user_phone"
            label="Telefone"
            error={values.phone && touched.phone && errors.phone}
            showSuccess={values.phone && !errors.phone}
          >
            <TextInput
              id="phone"
              name="phone"
              onChange={handleChange}
              value={formatPhone(values.phone)}
              onBlur={handleBlur}
              maxLength={15}
              maskType=""
              maskChar=""
              placeholder="(11) 9.8888-1111"
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <FormGroup
            fieldId="edit_user_email"
            label="E-mail*"
            error={errors.email}
            showSuccess={!errors.email}
            disabled={!isLoggedUser}
          >
            <TextInput
              id="email"
              name="email"
              onChange={handleChange}
              value={values.email}
              maskType="email"
              maskChar=""
              placeholder="seuemail@email.com.br"
            />
          </FormGroup>
        </Col>
        <Col xsOffset={2} md={4}>
          <FormGroup
            fieldId="edit_user_mother"
            label="Nome da Mãe"
            error={values.mother && touched.mother && errors.mother}
            showSuccess={values.mother && !errors.mother}
          >
            <TextInput
              id="mother"
              name="mother"
              onChange={handleChange}
              value={toOnlyLetters(values.mother)}
              maskType=""
              maskChar=""
              placeholder="Maria da Silva"
            />
          </FormGroup>
        </Col>
      </Row>
      <LogHistoryContainer user={values.cpf} userStatus={userStatus} />
      <Row center="xs">
        <Col md={3}>
          <BackwardButton
            id="btn_cancel_edit_user"
            value="cancelar"
            buttonType="actionButton"
            type="button"
            onClick={handleGoBack}
          />
        </Col>
        <Col md={3}>
          <ForwardButton
            id="btn_edit_user_submit"
            value="salvar"
            disabled={!isValid}
            type="submit"
          />
        </Col>
      </Row>
    </If>
  </form>
);

EditUserForm.propTypes = {
  handleBlur: func.isRequired,
  handleChange: func.isRequired,
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
  }).isRequired,
  touched: shape({
    phone: string,
    birthDate: string,
  }).isRequired,
  handleGoBack: func.isRequired,
  handleSubmit: func.isRequired,
  isValid: bool.isRequired,
  userStatus: bool.isRequired,
  loading: bool.isRequired,
  isLoggedUser: bool,
};

EditUserForm.defaultProps = {
  isLoggedUser: false,
};

export default EditUserForm;
