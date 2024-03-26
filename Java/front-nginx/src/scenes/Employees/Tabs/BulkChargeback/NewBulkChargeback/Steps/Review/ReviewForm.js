/* eslint-disable array-callback-return */
import React, { PureComponent } from "react";
import { size, get } from "lodash";
import { shape, func } from "prop-types";
import { If, toCPFMask, inputToMoney, toOnlyNumbers } from "@utils";

import { red } from "@colors";
import { SvgIcon } from "@common";
import { buttonTypes } from "@enums";

import {
  CustomField,
  Form,
  FieldArray,
  getIn,
  FastField,
} from "src/modules/Form";
import { fields } from "./ReviewForm.schema";

import {
  RemoveEntry,
  StyledTable,
  StyledThead,
  StyledTbodyRow,
  ButtonWrapper,
  ErrorWrapper,
  ErroLabel,
} from "./ReviewForm.styled";

import { StyledButton } from "../Request/RequestForm.styled";
import {
  WrapperValues,
  Wrapper,
  ReplicateText,
  VerifyTitle,
} from "./Review.styles";

class Employees extends PureComponent {
  componentDidMount() {
    const { validateForm } = this.props;
    validateForm();
  }
  render() {
    const { values, goBack, errors, setFieldValue, setTouched } = this.props;

    const cpfs = get(values, "cpfs");
    const hasCpfs = size(cpfs);

    const vrMask = inputToMoney(values.meal);
    const vaMask = inputToMoney(values.food);

    const checkValue = value =>
      value !== "0" && value !== "0000" && value !== "000";

    const handleSetValue = () => {
      const { meal, food } = values;

      if (meal && checkValue(toOnlyNumbers(meal))) {
        cpfs.map(({ vr }, index) => {
          vr !== null && setFieldValue(`cpfs[${index}].vr`, meal, false);
        });

        setFieldValue("meal", "0", false);
        setTouched(
          {
            cpfs: [],
          },
          true,
        );
      }

      if (food && checkValue(toOnlyNumbers(food))) {
        cpfs.map(({ va }, index) => {
          va !== null && setFieldValue(`cpfs[${index}].va`, food, false);
        });
        setFieldValue("food", "0", false);
        setTouched(
          {
            cpfs: [],
          },
          true,
        );
      }
    };

    if (!hasCpfs) {
      goBack();
    }

    return !hasCpfs ? null : (
      <Form {...this.props}>
        <Wrapper>
          <WrapperValues>
            <CustomField
              label="mac Refeição"
              placeholder="R$ 0,00"
              value={vrMask}
              name={fields.meal}
              maxLength="12"
              {...this.props}
            />
            <CustomField
              label="mac Alimentação"
              placeholder="R$ 0,00"
              value={vaMask}
              name={fields.food}
              maxLength="12"
              {...this.props}
            />
          </WrapperValues>
          <ReplicateText id="set-value-inputs" onClick={handleSetValue}>
            Replicar valor para todos os CPF&apos;s
          </ReplicateText>
          <VerifyTitle>
            Verifique os valores inseridos por CPF e caso precise, edite nas
            colunas de Valor:
          </VerifyTitle>
        </Wrapper>

        <FieldArray
          name="cpfs"
          validateOnChange
          render={arrayHelpers => (
            <StyledTable>
              <StyledThead>
                <tr>
                  <th>Funcionário</th>
                  <th>CPF</th>
                  <th>Valor VR</th>
                  <th>Valor VA</th>
                  <th />
                </tr>
              </StyledThead>
              <tbody>
                {hasCpfs &&
                  cpfs.map(({ name, cpf, vr, va, isValid } = {}, index) => {
                    const vrValue = vr !== null ? inputToMoney(vr) : "--";
                    const vaValue = va !== null ? inputToMoney(va) : "--";

                    const maskVa = va === "" ? "R$ 0,00" : vaValue;
                    const maskVr = vr === "" ? "R$ 0,00" : vrValue;

                    return (
                      <StyledTbodyRow
                        key={index}
                        isValid={isValid}
                        id={`body-row-${index}`}
                      >
                        <td id="col-name" style={{ width: 400 }}>
                          {name}
                        </td>
                        <td id="col-cpf">{toCPFMask(cpf)}</td>
                        <td id="col-vr">
                          <FastField
                            render={() => (
                              <CustomField
                                name={`cpfs[${index}].vr`}
                                id={index}
                                key="vr"
                                width="111px"
                                disabled={vrValue === "--"}
                                value={maskVr}
                                errors={getIn(errors.cpfs, `${index}`)}
                                maxLength="12"
                                iconErro
                                {...this.props}
                              />
                            )}
                          />
                        </td>
                        <td id="col-va">
                          <FastField
                            render={() => (
                              <CustomField
                                name={`cpfs[${index}].va`}
                                id={index}
                                key="va"
                                width="111px"
                                disabled={vaValue === "--"}
                                value={maskVa}
                                errors={getIn(errors.cpfs, `${index}`)}
                                maxLength="12"
                                iconErro
                                {...this.props}
                              />
                            )}
                          />
                        </td>
                        <td id="col-exclude">
                          <RemoveEntry
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            Excluir
                          </RemoveEntry>
                        </td>
                      </StyledTbodyRow>
                    );
                  })}
              </tbody>
            </StyledTable>
          )}
        />
        <If test={errors.cpfs}>
          <ErrorWrapper id="row-error">
            <SvgIcon name="warning" fill={red} />
            <ErroLabel id="row-error-message">
              Os dois produtos não podem ficar zerados, insira algum valor ou
              exclua o funcionário.
            </ErroLabel>
          </ErrorWrapper>
        </If>

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
            disabled={!!errors.cpfs}
            id="btn-submit"
          />
        </ButtonWrapper>
      </Form>
    );
  }
}

Employees.propTypes = {
  values: shape({}).isRequired,
  goBack: func.isRequired,
  errors: shape({}).isRequired,
  touched: shape({}).isRequired,
  setFieldValue: func.isRequired,
  setTouched: func.isRequired,
  validateForm: func.isRequired,
};

export default Employees;
