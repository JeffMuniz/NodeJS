import React from "react";
import { string, shape } from "prop-types";

import { toCPFMask, toCNPJMask } from "@utils";
import {
  Container,
  InfosRow,
  EmployeeCol,
  RegistryInfo,
  StyledName,
  StyledStatus,
  InfoCol,
  InfoTitle,
  InfoContent,
} from "./EmployeeDataSection.styles";

const EmployeeDataSection = ({ employee, statusText }) => (
  <Container id="employee_section_container">
    <InfosRow>
      <EmployeeCol>
        <StyledName id="employee_section_name">{employee.name}</StyledName>
        <StyledStatus
          id="employee_section_status"
          inactive={employee.status !== "ativo"}
        >
          {statusText || `funcionário ${employee.status}`}
        </StyledStatus>
      </EmployeeCol>
      <RegistryInfo>
        <InfoCol>
          <InfoTitle>CPF</InfoTitle>
          <InfoContent id="employee_section_cpf">
            {toCPFMask(employee.cpf)}
          </InfoContent>
        </InfoCol>
        <InfoCol>
          <InfoTitle>Matrícula</InfoTitle>
          <InfoContent id="employee_section_registry">
            {employee.registry}
          </InfoContent>
        </InfoCol>
        <InfoCol>
          <InfoTitle>CNPJ</InfoTitle>
          <InfoContent id="employee_section_cnpj">
            {toCNPJMask(employee.cnpj)}
          </InfoContent>
        </InfoCol>
      </RegistryInfo>
    </InfosRow>
  </Container>
);

EmployeeDataSection.propTypes = {
  employee: shape({
    name: string,
    cpf: string,
    registry: string,
    deliveryLocation: string,
    status: string,
  }),
  statusText: string,
};

EmployeeDataSection.defaultProps = {
  employee: {},
  statusText: "",
};

export default EmployeeDataSection;
