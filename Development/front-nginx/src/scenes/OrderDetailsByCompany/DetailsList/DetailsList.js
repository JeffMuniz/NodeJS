import React from "react";
import { arrayOf, shape, string, number, bool } from "prop-types";

import {
  EllipsisedCol,
  Table,
  HeaderRow,
  HeaderCol,
  ContentRow,
  ContentCol,
} from "./DetailsList.styles";

const DetailsList = ({ details: { content = [] } }) => (
  <Table id="details_list_table">
    <HeaderRow id="details_list_table_header">
      <HeaderCol xs={2} id="details_list_table_name">
        Nome
      </HeaderCol>
      <HeaderCol xs={2} id="details_list_table_cpf">
        CPF
      </HeaderCol>
      <HeaderCol xs={3} id="details_list_table_status">
        Local de Entrega
      </HeaderCol>
      <HeaderCol xs={1} id="details_list_table_dp">
        Status
      </HeaderCol>
      <HeaderCol xs={1} id="details_list_table_e_vr">
        Emissão VR
      </HeaderCol>
      <HeaderCol xs={1} id="details_list_table_vr">
        Crédito VR
      </HeaderCol>
      <HeaderCol xs={1} id="details_list_table_e_va">
        Emissão VA
      </HeaderCol>
      <HeaderCol xs={1} id="details_list_table_va">
        Crédito VA
      </HeaderCol>
    </HeaderRow>
    {content.map((item, index) => (
      <ContentRow id={`employee_details_${index}`} key={`details_${index}`}>
        <EllipsisedCol
          title={item.name}
          xs={2}
          id={`details_list_table_name_button_${index}`}
        >
          {item.name}
        </EllipsisedCol>
        <ContentCol xs={2} id={`details_list_table_cpf_${index}`}>
          {item.cpf}
        </ContentCol>
        <EllipsisedCol
          title={`Endereço: ${item.deliveryPlace}`}
          xs={3}
          id={`details_list_table_dp_${index}`}
        >
          {item.deliveryPlace}
        </EllipsisedCol>
        <ContentCol xs={1} id={`details_list_table_status_${index}`}>
          ativo
        </ContentCol>
        <ContentCol xs={1} id={`details_list_table_e_vr_${index}`}>
          {item.VRIssuance}
        </ContentCol>
        <ContentCol xs={1} id={`details_list_table_total_vr_${index}`}>
          {item.totalVR}
        </ContentCol>
        <ContentCol xs={1} id={`details_list_table_e_va_${index}`}>
          {item.VAIssuance}
        </ContentCol>
        <ContentCol xs={1} id={`details_list_table_total_va_${index}`}>
          {item.totalVA}
        </ContentCol>
      </ContentRow>
    ))}
  </Table>
);

DetailsList.propTypes = {
  details: shape({
    content: arrayOf(
      shape({
        cpf: string,
        employeeId: string,
        name: string,
        deliveryPlace: string,
        totalVR: number,
        totalVA: number,
        VRIssuance: bool,
        VAIssuance: bool,
      }),
    ),
    totalItems: number,
  }),
};

DetailsList.defaultProps = {
  details: {
    content: [],
    totalItems: 0,
  },
};

export default DetailsList;
