import React, { PureComponent, Fragment } from "react";
import { size, get } from "lodash";
import { func, shape } from "prop-types";

import { If, toCPFMask } from "@utils";

import { red } from "@colors";
import { SvgIcon } from "@common";
import { buttonTypes } from "@enums";

import { Form, FieldArray } from "src/modules/Form";

import {
  RemoveEntry,
  StyledTable,
  StyledThead,
  StyledTbodyRow,
  ButtonWrapper,
  IconWrapper,
} from "../Review/ReviewForm.styled";
import { StyledButton } from "../Request/RequestForm.styled";
import { SubtitleWrapper, SubTitle } from "./Validation.styles";

const Message = invalid => (
  <IconWrapper>
    <SvgIcon name="warning" fill={red} />
    {invalid
      ? "Este CPF não pertence à empresa selecionada."
      : "CPF Inválido, exclua e adicione novamente"}
  </IconWrapper>
);

class Employees extends PureComponent {
  componentDidMount() {
    const { validateForm } = this.props;
    validateForm();
  }

  render() {
    const {
      values,
      goBack,
      goBackDetails,
      selectedCompany,
      setValues,
      ...rest
    } = this.props;

    const cpfs = get(values, "cpfs");
    const hasCpfs = size(cpfs);
    const hasInvalidCpf = hasCpfs && cpfs.some(el => !el.isValid);
    let subtitle = "";

    if (!hasCpfs) {
      goBack();
    }

    if (hasInvalidCpf) {
      subtitle =
        "Encontramos alguns CPFs com erro, confira os dados, se necessário, volte para corrigir a listagem.";
    } else {
      subtitle = "Caso ainda precise de correção, volte para o passo anterior.";
    }

    const removeAllInvalidCpfs = cpfsList => {
      const newCpfsList = {
        cpfs: cpfsList.filter(el => el.isValid),
      };
      setValues(newCpfsList);
    };

    return (
      hasCpfs && (
        <Fragment>
          <SubtitleWrapper>
            <SubTitle id="form-validation-header-subtitle">
              {subtitle}{" "}
            </SubTitle>
            {hasInvalidCpf && (
              <RemoveEntry
                id="btn_remove_cpfs"
                onClick={() => removeAllInvalidCpfs(cpfs)}
              >
                Excluir todos os CPFs com erros
              </RemoveEntry>
            )}
          </SubtitleWrapper>
          <Form {...rest}>
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
                    </tr>
                  </StyledThead>
                  <tbody>
                    {cpfs.map(
                      (
                        { name, cpf, isValid, isInvalidFromApi } = {},
                        index,
                      ) => (
                        <StyledTbodyRow
                          key={index}
                          isValid={isValid}
                          id={`body-row-${index}`}
                        >
                          <td id="col-name" style={{ width: 450 }}>
                            {name || Message(isInvalidFromApi)}
                          </td>
                          <td id="col-cpf">
                            <If test={isValid}>{toCPFMask(cpf)}</If>
                            <If test={!isValid}>
                              <span
                                style={{
                                  fontWeight: "bold",
                                }}
                              >
                                {cpf.length === 11 ? toCPFMask(cpf) : cpf}
                              </span>
                            </If>
                          </td>
                          <td
                            id="col-exclude"
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              marginRight: "10px",
                            }}
                          >
                            <RemoveEntry
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
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
                value="CONTINUAR"
                disabled={hasInvalidCpf}
                id="btn-submit"
              />
            </ButtonWrapper>
          </Form>
        </Fragment>
      )
    );
  }
}

Employees.propTypes = {
  values: shape({}).isRequired,
  goBack: func.isRequired,
  goBackDetails: func.isRequired,
  errors: shape({}).isRequired,
  validateForm: func.isRequired,
  setValues: func.isRequired,
  selectedCompany: shape({}).isRequired,
};

export default Employees;
