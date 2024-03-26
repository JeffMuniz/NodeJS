import React, { Fragment } from "react";
import PropTypes from "prop-types";
import DateManager from "src/modules/DateManager/DateManager";

import { toMoneyMask, If } from "@utils";
import { dateHourFormats } from "@enums";

import {
  Container,
  Grid,
  HeaderRow,
  StyledCol,
  BodyRow,
  StoreNameText,
} from "./StatementSection.styles";

const CANCELLED = "CANCELADA";
const REFUNDED = "ESTORNADA";

const isCreditPayment = type => type && type.toUpperCase() === "CREDITO";

const StatementSection = ({ data }) => (
  <Container id="statement_section_container">
    <If test={data && data.length}>
      <Grid>
        <HeaderRow id="statement_section_header">
          <StyledCol xs={1} id="statement_section_header_date">
            Data
          </StyledCol>
          <StyledCol xs={1} id="statement_section_header_time">
            Hora
          </StyledCol>
          <StyledCol xs={4} id="statement_section_header_establishment">
            Estabelecimento
          </StyledCol>
          <StyledCol xs={2} id="statement_section_header_value">
            Valor
          </StyledCol>
        </HeaderRow>
        {data.map(
          (
            {
              transactionDate,
              transactionType,
              storeCompanyName,
              transactionValue,
              transactionStatus,
            },
            index,
          ) => {
            const isCancelled =
              transactionStatus === CANCELLED || transactionStatus === REFUNDED;
            const storeName = isCancelled ? (
              <Fragment>
                <StoreNameText
                  isCancelled={isCancelled}
                  id={`statement_section_establishment_name_${index}`}
                >
                  {storeCompanyName}
                </StoreNameText>
                <StoreNameText> (Cancelado)</StoreNameText>
              </Fragment>
            ) : (
              <StoreNameText>{storeCompanyName}</StoreNameText>
            );

            return (
              <BodyRow
                iscreditpayment={isCreditPayment(transactionType).toString()}
                id={`${index}-statment-row-id`}
                key={index}
              >
                <StyledCol xs={1} id={`statement_section_date_${index}`}>
                  {DateManager(transactionDate).format(
                    dateHourFormats.longDateSlash,
                  )}
                </StyledCol>
                <StyledCol xs={1} id={`statement_section_time_${index}`}>
                  {DateManager.utc(transactionDate).format(
                    dateHourFormats.shortHour,
                  )}
                </StyledCol>
                <StyledCol xs={4}>{storeName}</StyledCol>
                <StyledCol
                  xs={2}
                  isCancelled={isCancelled}
                  id={`statement_section_value_${index}`}
                >
                  {`${
                    isCreditPayment(transactionType) ? "" : "- "
                  }${toMoneyMask(transactionValue)}`}
                </StyledCol>
              </BodyRow>
            );
          },
        )}
      </Grid>
    </If>
  </Container>
);

StatementSection.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      hour: PropTypes.string,
      branch: PropTypes.string,
      amount: PropTypes.string,
      storeCompanyName: PropTypes.string,
      trasnactionType: PropTypes.string,
    }),
  ),
};

StatementSection.defaultProps = {
  data: [],
};

export default StatementSection;
