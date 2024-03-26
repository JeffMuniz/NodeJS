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

import {
  Alert,
  Button,
  SvgIcon,
  FormGroup,
  TextInput,
  SingleDatePicker,
} from "@common";
import { If } from "@utils";
import { dateHourFormats, buttonTypes } from "@enums";
import DateManager from "src/modules/DateManager/DateManager";

import {
  RowContent,
  RowFooter,
  LabelUpload,
  fileInput,
  Title,
  InputContainer,
  DatePlaceholder,
  CancelButtonContainer,
} from "./Form.styles";

const Form = ({
  handleSubmit,
  handleChangeFile,
  isFileSelected,
  goToPageOrders,
  isFileValid,
  isFileSizeValid,
  file,
  values,
  errors,
  requestError,
  openFileDialog,
  fileInputRef,
  showDateField,
  showConverterForm,
  handleChange,
  clientCodes = [],
  conversionError,
  clearError,
  setFieldValue,
  onChangeFocus,
  datePickerFocused,
}) => (
  <form onSubmit={handleSubmit}>
    <Fragment>
      <Row>
        <Col xs={12}>
          <LabelUpload id="file_button" onClick={openFileDialog}>
            <SvgIcon name="import" />
            Anexar arquivo
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
          <If test={conversionError !== null}>
            <Alert
              id="conversionError"
              title="Ocorreu um erro."
              image="cancelledStatus"
              description={conversionError}
              type="error"
            />
          </If>
          <If test={isFileSelected() && isFileValid && !conversionError}>
            <Alert
              id="on_feedback_file"
              title={file.name}
              image="success"
              type="success"
            />
          </If>
          <If test={isFileSelected() && !isFileValid}>
            <Alert
              id="on_feedback_file"
              title="Ocorreu um erro."
              image="cancelledStatus"
              description={
                requestError ||
                (isFileSizeValid ? (
                  <div>
                    Confira os requisitos: formatos <b>.xls, .xlsx ou .txt</b>,
                    e <b>todos os campos precisam estar preenchidos</b> e
                    adicione novamente.
                  </div>
                ) : (
                  <div>O arquivo importado possui tamanho superior a 10MB.</div>
                ))
              }
              type="error"
            />
          </If>
        </Col>
        <If test={showDateField}>
          <Fragment>
            <Row>
              <Title>Dados para Conversão</Title>
            </Row>
            <Row>
              <InputContainer>
                <FormGroup
                  fieldId="dataPedido"
                  label="Informe a data do crédito"
                >
                  <div>
                    <DatePlaceholder
                      id="dataPedidoButton"
                      onClick={onChangeFocus}
                    >
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
                            DateManager(date).format(
                              dateHourFormats.longDateUS,
                            ),
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
              </InputContainer>
            </Row>
          </Fragment>
        </If>
        <If test={showConverterForm}>
          <Fragment>
            <Title>Dados para Conversão</Title>
            {(clientCodes || []).map((code, index) => (
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
          </Fragment>
        </If>
      </RowContent>
      <RowFooter center="xs">
        <Col xs={3}>
          <If
            test={
              (isFileSelected() && !isFileValid) || conversionError !== null
            }
          >
            <Button
              id="lg_btn_goback"
              type="button"
              buttonType="light"
              value="Voltar"
              onClick={clearError}
              action="Clicou em 'Voltar' na página 'Novo Pedido'"
            />
          </If>
          <If
            test={
              (!isFileSelected() && !isFileValid) ||
              (isFileValid && conversionError === null)
            }
          >
            <Button
              id="lg_btn_goback"
              type="button"
              buttonType="light"
              value="Voltar"
              onClick={goToPageOrders}
              action="Clicou em 'Voltar' na página 'Novo Pedido'"
            />
          </If>
        </Col>
        <Col xs={3}>
          <Button
            id="lg_btn_submit"
            type="submit"
            disabled={!isFileValid || conversionError !== null}
            value="Enviar pedido"
            action="Clicou em 'Enviar Pedido' na página 'Novo Pedido'"
          />
        </Col>
      </RowFooter>
    </Fragment>
  </form>
);

Form.defaultProps = {
  file: {},
  values: {},
  requestError: "",
  conversionError: null,
  showDateField: false,
  showConverterForm: false,
  clientCodes: [],
  isFileValid: false,
  isFileSizeValid: false,
  isFileSelected: () => false,
  goToPageOrders: () => null,
  setFieldValue: () => null,
  datePickerFocused: false,
  onChangeFocus: () => null,
};

Form.propTypes = {
  showDateField: bool,
  showConverterForm: bool,
  setFieldValue: func,
  datePickerFocused: bool,
  onChangeFocus: func,
  clearError: func.isRequired,
  clientCodes: arrayOf(
    shape({
      codigo: string,
      cnpjCliente: string,
    }),
  ),
  errors: shape({
    cnpj: string,
  }).isRequired,
  handleChange: func.isRequired,
  conversionError: string,
  openFileDialog: func.isRequired,
  fileInputRef: shape({}).isRequired,
  handleSubmit: func.isRequired,
  handleChangeFile: func.isRequired,
  isFileSelected: func,
  goToPageOrders: func,
  isFileValid: bool,
  isFileSizeValid: bool,
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
