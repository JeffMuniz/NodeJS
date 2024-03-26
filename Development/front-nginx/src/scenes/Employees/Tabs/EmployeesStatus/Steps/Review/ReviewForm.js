import React, { PureComponent, Fragment } from "react";
import { size } from "lodash";
import { func, shape, string } from "prop-types";

import { red } from "@colors";
import { SvgIcon } from "@common";
import { buttonTypes } from "@enums";
import { If, toCPFMask } from "@utils";

import { Form, FieldArray } from "src/modules/Form";

import {
  RemoveEntry,
  CheckButton,
  StyledTable,
  StyledThead,
  StyledTbodyRow,
  ButtonWrapper,
  IconWrapper,
  FieldInput,
  Text,
  Title,
  SubTitle,
  SubtitleWrapper,
} from "./ReviewForm.styled";

import { StyledButton } from "../Request/RequestForm.styled";

class Employees extends PureComponent {
  getErrorMessage = (isInvalidFromApi, isInvalidStatus) => {
    const { selectedStatusRequest } = this.props;

    let message = "";

    if (isInvalidFromApi) {
      message = "Este CPF não pertence à empresa selecionada.";
    } else if (isInvalidStatus) {
      message = `CPF já ${
        selectedStatusRequest === "ativar" ? "ativo" : "inativo"
      }`;
    } else {
      message = "CPF Inválido, edite ou exclua";
    }

    return (
      <IconWrapper>
        <SvgIcon name="warning" fill={red} />
        {message}
      </IconWrapper>
    );
  };

  inputParser = e => {
    const { key } = e;
    const keyboard = RegExp(/^[0-9-.\b ]+$/);

    if (key === "Enter") {
      return true;
    }

    if (!keyboard.test(key)) {
      e.preventDefault();
      return false;
    }
  };

  render() {
    const {
      values,
      goBack,
      handleCheckCpf,
      handleRemoveAllInvalidCpfs,
      handleRemoveItem,
    } = this.props;

    const { cpfs } = values;

    const hasCpfs = size(cpfs);

    return !hasCpfs ? null : (
      <Fragment>
        <Title>Editar CPF</Title>
        <SubtitleWrapper>
          <SubTitle id="form-validation-header-subtitle">
            Encontramos alguns CPFs com erro. Por favor, edite os dados ou os
            exclua:
          </SubTitle>
          <RemoveEntry
            id="btn_remove_cpfs"
            onClick={() => handleRemoveAllInvalidCpfs(values.cpfs)}
          >
            Excluir todos os CPFs com erros
          </RemoveEntry>
        </SubtitleWrapper>
        <Form>
          <FieldArray
            name="cpfs"
            validateOnChange
            render={arrayHelpers => (
              <StyledTable>
                <StyledThead>
                  <tr>
                    <th>Funcionário</th>
                    <th>CPF</th>
                    <th />
                    <th />
                  </tr>
                </StyledThead>
                <tbody>
                  {values.cpfs.map(
                    (
                      { cpf, isInvalidFromApi, isInvalidStatus } = {},
                      index,
                    ) => (
                      <StyledTbodyRow key={index} id={`body-row-${index}`}>
                        <td id="col-name" style={{ width: 450 }}>
                          {this.getErrorMessage(
                            isInvalidFromApi,
                            isInvalidStatus,
                          )}
                        </td>
                        <td id="col-cpf">
                          <If test={isInvalidStatus}>
                            <Text isInvalidStatus={isInvalidStatus}>
                              {toCPFMask(cpf)}
                            </Text>
                          </If>
                          <If test={!isInvalidStatus}>
                            <FieldInput
                              id={`field_input_id_${index}`}
                              name={toCPFMask(`cpfs.${index}.cpf`)}
                              value={toCPFMask(cpf)}
                            />
                          </If>
                        </td>
                        <td
                          id="col-validate"
                          style={{
                            width: "100px",
                          }}
                        >
                          <If test={!isInvalidStatus}>
                            <CheckButton
                              type="button"
                              onClick={() =>
                                handleCheckCpf(cpf, index, values.cpfs)
                              }
                            >
                              Verificar
                            </CheckButton>
                          </If>
                        </td>
                        <td
                          id="col-exclude"
                          style={{
                            marginRight: "10px",
                            width: "70px",
                          }}
                        >
                          <RemoveEntry
                            type="button"
                            onClick={() => {
                              arrayHelpers.remove(index);
                              handleRemoveItem(cpf, values.cpfs);
                            }}
                          >
                            Excluir
                          </RemoveEntry>
                        </td>
                      </StyledTbodyRow>
                    ),
                  )}
                </tbody>
              </StyledTable>
            )}
          />

          <ButtonWrapper>
            <StyledButton
              buttonType={buttonTypes.light}
              type="button"
              value="Voltar"
              id="btn-back"
              onClick={goBack}
            />
            <StyledButton
              buttonType={buttonTypes.primary}
              type="submit"
              value="Verificar as edições"
              id="btn-submit"
            />
          </ButtonWrapper>
        </Form>
      </Fragment>
    );
  }
}

Employees.propTypes = {
  values: shape({}).isRequired,
  handleCheckCpf: func.isRequired,
  handleRemoveAllInvalidCpfs: func.isRequired,
  handleRemoveItem: func.isRequired,
  goBack: func.isRequired,
  selectedStatusRequest: string.isRequired,
};

export default Employees;
