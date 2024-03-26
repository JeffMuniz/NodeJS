import React, { Fragment } from "react";
import { Col } from "react-styled-flexboxgrid";
import { func, shape, string, bool, number, oneOfType } from "prop-types";

import { Alert, Button, SvgIcon } from "@common";
import { grey } from "@colors";
import { If } from "@utils";

import { RowContent, RowFooter, LabelUpload, InputFile } from "./Form.styles";

const Form = ({
  handleSubmit,
  handleChangeFile,
  isFileSelected,
  goToDeliveryPlaces,
  isFileValid,
  file,
  values,
  requestError,
}) => {
  const fileUploadButton = () => (
    <Fragment>
      <LabelUpload
        id="file_button"
        htmlFor="file"
        icon="upload"
        title="Reenviar"
      >
        <SvgIcon name="upload" fill={grey} />
      </LabelUpload>
      <InputFile
        id="file"
        name="file"
        type="file"
        value={values.file}
        onChange={event => handleChangeFile(event)}
      />
    </Fragment>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Fragment>
        <RowContent>
          <Col xs={12}>
            <If test={isFileSelected() && isFileValid}>
              <Alert
                id="on_feedback_file"
                title={file.name}
                image="check"
                size={35}
                action={fileUploadButton()}
                type="success"
                description={
                  <p>
                    Planilha validada. Pode continuar para processar os dados.
                  </p>
                }
              />
            </If>

            <If test={isFileSelected() && !isFileValid}>
              <Alert
                id="on_feedback_file"
                title="Ocorreu um erro."
                image="cancelledStatus"
                size={35}
                action={fileUploadButton()}
                description={
                  requestError || (
                    <p>
                      Confira os requisitos: formatos <b>.xls ou .xlsx</b>, e
                      &nbsp;
                      <b>todos os campos precisam estar preenchidos</b> e
                      adicione novamente.
                    </p>
                  )
                }
                type="error"
              />
            </If>
          </Col>
        </RowContent>

        <RowFooter center="xs">
          <Col xs={3}>
            <Button
              id="lg_btn_goback"
              type="button"
              buttonType="light"
              value="Voltar"
              onClick={goToDeliveryPlaces}
            />
          </Col>
          <Col xs={3}>
            <Button
              id="lg_btn_submit"
              type="submit"
              disabled={!isFileValid}
              value="Enviar local de entrega"
            />
          </Col>
        </RowFooter>
      </Fragment>
    </form>
  );
};

Form.propTypes = {
  handleSubmit: func.isRequired,
  handleChangeFile: func.isRequired,
  isFileSelected: func,
  goToDeliveryPlaces: func,
  isFileValid: bool,
  file: oneOfType([
    string,
    shape({
      name: string,
    }),
  ]),
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

Form.defaultProps = {
  file: {},
  values: {},
  requestError: "",
  isFileValid: false,
  isFileSelected: () => false,
  goToDeliveryPlaces: () => null,
};

export default Form;
