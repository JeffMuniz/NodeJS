import React, { PureComponent } from "react";
import { size, get } from "lodash";
import { shape, func, string } from "prop-types";
import { toCPFMask } from "@utils";

import { buttonTypes } from "@enums";

import { Form, FieldArray } from "src/modules/Form";

import {
  RemoveEntry,
  StyledTable,
  StyledThead,
  StyledTbodyRow,
  ButtonWrapper,
  Title,
  SubTitle,
  Description,
} from "./ConfirmationForm.styled";

import { StyledButton } from "../Request/RequestForm.styled";

class ConfirmationForm extends PureComponent {
  render() {
    const { values, goBack, errors, selectedStatusRequest } = this.props;

    const cpfs = get(values, "cpfs");
    const hasCpfs = size(cpfs);
    const title = `${
      selectedStatusRequest === "inativar" ? "Ina" : "A"
    }tivação de funcionários`;

    if (!hasCpfs) {
      goBack();
    }

    return !hasCpfs ? null : (
      <Form>
        <Title>{title}</Title>
        <SubTitle>Verificação CPF</SubTitle>
        <Description>
          Caso ainda precise de correção, volte para o passo anterior.
        </Description>
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
                {cpfs.map(({ name, cpf } = {}, index) => (
                  <StyledTbodyRow key={index} id={`body-row-${index}`}>
                    <td id="col-name" style={{ width: 450 }}>
                      {name}
                    </td>
                    <td id="col-cpf">{toCPFMask(cpf)}</td>
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
                ))}
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
            value={selectedStatusRequest === "ativar" ? "ATIVAR" : "INATIVAR"}
            disabled={!!errors.cpfs}
            id="btn-submit"
          />
        </ButtonWrapper>
      </Form>
    );
  }
}

ConfirmationForm.propTypes = {
  values: shape({}).isRequired,
  goBack: func.isRequired,
  // goBackDetails: func.isRequired,
  errors: shape({}).isRequired,
  selectedStatusRequest: string.isRequired,
};

export default ConfirmationForm;
