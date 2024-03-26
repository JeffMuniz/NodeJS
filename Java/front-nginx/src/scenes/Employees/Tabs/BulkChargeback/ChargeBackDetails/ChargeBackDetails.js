import React, { Fragment } from "react";
import { func, shape } from "prop-types";

import { WithPagination, Loading } from "@base";
import { If, toCPFMask } from "@utils";
import { requestStatus } from "@enums";

import Tooltip from "src/modules/Tooltip";

import {
  DetailsContainer,
  HeaderRow,
  HeaderCol,
  ContentRow,
  ColumnStatus,
  Column,
  AcceptTerms,
  ContainerBody,
  TableCol,
  TableRow,
  StyledCol,
  StyledRow,
  TermRow,
  HeaderColSolicitado,
  ColumnSolicitado,
  ColumnName,
  LoadingWrapper,
} from "./ChargeBackDetails.styles";

const ChargeBackDetails = ({
  onChangePage,
  detailsHeader,
  getColor,
  handleTerm,
  headerClickHandler,
  chargebackBody,
  chargebackDetails,
}) => (
  <Fragment>
    <If test={chargebackDetails.requestStatus === requestStatus.loading}>
      <LoadingWrapper>
        <Loading loading />
      </LoadingWrapper>
    </If>
    <If test={chargebackDetails.requestStatus !== requestStatus.loading}>
      <ContainerBody
        title="Voltar para lista de Estornos"
        showBackIcon
        isInsideAnother
        headerClickHandler={headerClickHandler}
        extraComponent={
          <TermRow>
            <AcceptTerms id="view_term_accept" onClick={handleTerm}>
              Ver termo de aceite
            </AcceptTerms>
          </TermRow>
        }
      >
        {detailsHeader && (
          <DetailsContainer id="chargebackDetails_containerHeader">
            <HeaderRow id="chargebackDetails_header">
              <HeaderCol md={1} id="details_idEstorno">
                ID Estorno
              </HeaderCol>
              <HeaderCol md={2} id="details_solicitante">
                Nome solicitante
              </HeaderCol>
              <HeaderCol md={2} id="details_dataHora">
                Data e Hora
              </HeaderCol>
              <HeaderColSolicitado md={1} id="details_valorSolicitado">
                Solicitado
              </HeaderColSolicitado>
              <HeaderColSolicitado md={1} id="details_valorEstornado">
                Estornado
              </HeaderColSolicitado>
              <HeaderCol md={2} id="details_motivo">
                Motivo
              </HeaderCol>
              <HeaderCol md={1} id="details_quantidade">
                Quantidade
              </HeaderCol>
              <HeaderCol md={1} id="details_status">
                Status
              </HeaderCol>
            </HeaderRow>
            <ContentRow id="chargebackDetails_content">
              <Column md={1} id="details_header_idEstorno">
                {detailsHeader.id}
              </Column>
              <ColumnName
                md={2}
                id="details_header_solicitante"
                data-tip
                data-for="details_header_solicitante"
              >
                {detailsHeader.requester}
              </ColumnName>
              <Tooltip id="details_header_solicitante" aria-haspopup="true">
                {detailsHeader.requester}
              </Tooltip>
              <Column md={2} id="details_header_dataHora">
                {detailsHeader.requestDate}
              </Column>
              <ColumnSolicitado md={1} id="details_header_valorSolicitado">
                {detailsHeader.requestValue}
              </ColumnSolicitado>
              <ColumnSolicitado md={1} id="details_header_valorEstornado">
                {detailsHeader.chargebackValue}
              </ColumnSolicitado>
              <Column md={2} id="details_header_motivo">
                {detailsHeader.reason}
              </Column>
              <Column md={1} id="details_header_quantidade">
                {detailsHeader.qty}
              </Column>
              <ColumnStatus
                id="details_header_status"
                fill={getColor(detailsHeader)}
                md={1}
              >
                {detailsHeader.status}
              </ColumnStatus>
            </ContentRow>
          </DetailsContainer>
        )}
        <WithPagination
          showLoading
          data={chargebackBody.data}
          callback={onChangePage}
          itemsPerPage={10}
          status={chargebackBody.requestStatus}
          render={() => (
            <Fragment>
              <StyledRow id="chargeback_details_body">
                <StyledCol id="details_funcionario" xs={2}>
                  Funcionário
                </StyledCol>
                <StyledCol id="details_CPF" xs={2}>
                  CPF
                </StyledCol>
                <StyledCol id="details_valorVRSolicitado" xs={2}>
                  Valor VR - Solicitado
                </StyledCol>
                <StyledCol id="details_valorVREstornado" xs={2}>
                  Valor VR - Estornado
                </StyledCol>
                <StyledCol id="details_valorVASolicitado" xs={2}>
                  Valor VA - Solicitado
                </StyledCol>
                <StyledCol id="details_valorVAEstornado" xs={2}>
                  Valor VA - Estornado
                </StyledCol>
              </StyledRow>
              {chargebackBody &&
                chargebackBody.data.content &&
                chargebackBody.data.content.map(
                  ({ employee, cpf, chargebacks, employeeId }) => (
                    <TableRow
                      key={employee}
                      id={`chargeback_detail_row_${employeeId}`}
                    >
                      <TableCol
                        id={`funcionario_details_${employee}`}
                        data-tip
                        data-for={`funcionario_details_${employee}`}
                        md={2}
                      >
                        {employee}
                      </TableCol>
                      <Tooltip
                        id={`funcionario_tooltip_${employee}`}
                        aria-haspopup="true"
                      >
                        {employee}
                      </Tooltip>
                      <TableCol id={`cpf_details_${employee}`} md={2}>
                        {toCPFMask(cpf)}
                      </TableCol>

                      {chargebacks.length &&
                        chargebacks.map(
                          ({ product, requestValue, chargebackValue }) => (
                            <Fragment>
                              <If test={product === "VR"}>
                                <TableCol
                                  id={`vr_solicitado_details_${employee}`}
                                  md={2}
                                >
                                  {requestValue}
                                </TableCol>
                                <TableCol
                                  id={`vr_estornado_details_${employee}`}
                                  md={2}
                                >
                                  {chargebackValue}
                                </TableCol>
                              </If>
                              <If test={product === "VA"}>
                                <TableCol
                                  id={`va_solicitado_details_${employee}`}
                                  md={2}
                                >
                                  {requestValue}
                                </TableCol>
                                <TableCol
                                  id={`va_estornado_details_${employee}`}
                                  md={2}
                                >
                                  {chargebackValue}
                                </TableCol>
                              </If>
                            </Fragment>
                          ),
                        )}
                    </TableRow>
                  ),
                )}
            </Fragment>
          )}
        />
      </ContainerBody>
    </If>
  </Fragment>
);

ChargeBackDetails.propTypes = {
  detailsHeader: shape({}).isRequired,
  onChangePage: func,
  getColor: func.isRequired,
  headerClickHandler: func.isRequired,
  handleTerm: func.isRequired,
  chargebackBody: shape().isRequired,
  chargebackDetails: shape({}).isRequired,
};

ChargeBackDetails.defaultProps = {
  onChangePage: () => null,
};

export default ChargeBackDetails;
