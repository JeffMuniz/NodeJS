import React, { Fragment } from "react";
import { Row, Col } from "react-styled-flexboxgrid";
import {
  func,
  shape,
  string,
  bool,
  number,
  oneOfType,
  arrayOf,
} from "prop-types";
import { If } from "@utils";

import {
  Alert,
  Button,
  SvgIcon,
  FormGroup,
  TextInput,
  SingleDatePicker,
} from "@common";
import { dateHourFormats, buttonTypes } from "@enums";
import DateManager from "src/modules/DateManager/DateManager";

import {
  RowContent,
  RowFooter,
  LabelUpload,
  Title,
  fileInput,
  DatePlaceholder,
  CancelButtonContainer,
} from "./Form.styles";

const Form = ({
  handleSubmit,
  handleChangeFile,
  handleChange,
  handleBackButton,
  isFileSelected,
  isFileValid,
  file,
  values,
  errors,
  requestError,
  openFileDialog,
  clientCodes,
  fileInputRef,
  showUpload,
  showData,
  submitValidation,
  showDateField,
  setFieldValue,
  onChangeFocus,
  datePickerFocused,
}) => (
  <Fragment>
    <If test={showUpload}>
      <Fragment>
        <Row>
          <Col xs={12}>
            <LabelUpload id="file_button" onClick={openFileDialog}>
              <SvgIcon name="import" />
              Anexar TXT
            </LabelUpload>
            <input
              ref={fileInputRef}
              id="file"
              name="file"
              type="file"
              style={fileInput}
              value={values.file}
              onChange={event => handleChangeFile(event)}
            />
          </Col>
        </Row>
        <RowContent>
          <Col xs={12}>
            {isFileSelected() && isFileValid && (
              <Alert
                id="on_feedback_file"
                title={file.name}
                image="success"
                type="success"
              />
            )}

            {isFileSelected() && !isFileValid && (
              <Alert
                id="on_feedback_file"
                title="Ocorreu um erro."
                image="cancelledStatus"
                description={
                  requestError || (
                    <div>
                      Confira os requisitos: formato <b>.txt</b>, e{" "}
                      <b>todos os campos precisam estar preenchidos</b> e
                      adicione novamente.
                    </div>
                  )
                }
                type="error"
              />
            )}
          </Col>
        </RowContent>
        <RowFooter center="xs">
          <Col xs={4}>
            <Button
              id="fc_btn_submit_validate"
              type="button"
              disabled={!isFileValid}
              value="Importar arquivo"
              onPress={submitValidation}
            />
          </Col>
        </RowFooter>
      </Fragment>
    </If>
    <If test={showDateField}>
      <Fragment>
        <form onSubmit={handleSubmit}>
          <Row>
            <Title>Dados para Conversão</Title>
          </Row>
          <Row center="xs">
            <FormGroup fieldId="dataPedido" label="Informe a data do crédito">
              <div>
                <DatePlaceholder id="dataPedidoButton" onClick={onChangeFocus}>
                  {values.dataPedido
                    ? DateManager(values.dataPedido).format(
                        dateHourFormats.longDateSlash,
                      )
                    : dateHourFormats.longDateSlash}
                </DatePlaceholder>
                <If test={datePickerFocused}>
                  <SingleDatePicker
                    id="dataPedido"
                    onDateChange={({ date }) =>
                      setFieldValue(
                        "dataPedido",
                        DateManager(date).format(dateHourFormats.longDateUS),
                      )
                    }
                    numberOfMonths={2}
                    renderCalendarInfo={() => (
                      <CancelButtonContainer>
                        <Button
                          buttonType={buttonTypes.light}
                          value="Cancelar"
                        />
                      </CancelButtonContainer>
                    )}
                    onCloseDatePicker={onChangeFocus}
                    autoFocus
                  />
                </If>
              </div>
            </FormGroup>
          </Row>
          <RowFooter center="xs">
            <Col xs={3}>
              <Button
                id="fc_btn_back"
                buttonType="light"
                value="Voltar"
                onPress={handleBackButton}
              />
            </Col>
            <Col xs={3}>
              <Button
                id="fc_btn_submit_convert"
                type="submit"
                disabled={!isFileValid}
                value="Converter Arquivo"
              />
            </Col>
          </RowFooter>
        </form>
      </Fragment>
    </If>
    <If test={showData}>
      <Fragment>
        <form onSubmit={handleSubmit}>
          <Row>
            <Title>Dados para Conversão</Title>
          </Row>
          {clientCodes.map((code, index) => (
            <Row center="xs" key={code}>
              <Col xs={4}>
                <FormGroup fieldId="fc_codigoCliente" label="Código Cliente">
                  <TextInput
                    id={`codigoCliente_${index}`}
                    name={`codigoCliente_${index}`}
                    value={code}
                    maskChar=""
                    placeholder="Código Cliente"
                  />
                </FormGroup>
              </Col>
              <Col xs={4}>
                <FormGroup
                  fieldId="fc_cnpj"
                  label="CNPJ"
                  error={errors && errors[`cnpjCliente_${index}`]}
                >
                  <TextInput
                    id={`cnpjCliente_${index}`}
                    name={`cnpjCliente_${index}`}
                    onChange={handleChange}
                    value={values[`cnpjCliente_${index}`]}
                    maskType="cnpj"
                    maskChar=""
                    placeholder="CNPJ"
                  />
                </FormGroup>
              </Col>
            </Row>
          ))}

          <RowFooter center="xs">
            <Col xs={3}>
              <Button
                id="fc_btn_back"
                buttonType="light"
                value="Voltar"
                onPress={handleBackButton}
              />
            </Col>
            <Col xs={3}>
              <Button
                id="fc_btn_submit_convert"
                type="submit"
                disabled={!isFileValid}
                value="Converter Arquivo"
              />
            </Col>
          </RowFooter>
        </form>
      </Fragment>
    </If>
  </Fragment>
);

Form.defaultProps = {
  file: {},
  values: {},
  requestError: "",
  isFileValid: false,
  isFileSelected: () => false,
  setFieldValue: () => null,
  datePickerFocused: false,
  onChangeFocus: () => null,
};

Form.propTypes = {
  setFieldValue: func,
  datePickerFocused: bool,
  onChangeFocus: func,
  handleBackButton: func.isRequired,
  openFileDialog: func.isRequired,
  fileInputRef: shape({}).isRequired,
  handleSubmit: func.isRequired,
  handleChangeFile: func.isRequired,
  handleChange: func.isRequired,
  submitValidation: func.isRequired,
  showUpload: bool.isRequired,
  showData: bool.isRequired,
  showDateField: bool.isRequired,
  isFileSelected: func,
  isFileValid: bool,
  clientCodes: arrayOf(
    shape({
      codigo: string,
      cnpjCliente: string,
    }),
  ).isRequired,
  errors: shape({
    cnpj: string,
  }).isRequired,
  file: shape({
    name: string,
  }),
  values: shape({
    file: string,
  }),
  requestError: oneOfType([
    string,
    shape({
      error: shape({
        code: number,
        message: string,
        type: string,
      }),
    }),
  ]),
};

export default Form;
