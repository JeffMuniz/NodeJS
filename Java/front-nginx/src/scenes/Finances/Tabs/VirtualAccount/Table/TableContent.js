import React from "react";
import { shape, arrayOf } from "prop-types";
import { kebabCase } from "lodash";
import { If } from "@utils";
import { green } from "@colors";
import {
  Container,
  HeaderRow,
  StyledCol,
  BodyRow,
  Bold,
} from "./TableContent.styles";

const TableContent = ({ data }) => {
  const columns = [
    {
      title: "Data",
      xs: 2,
      align: "left",
      dataIndex: "date",
    },
    {
      title: "Origem",
      xs: 2,
      align: "left",
      dataIndex: "origin",
    },
    {
      title: "Descrição",
      xs: 6,
      align: "left",
      dataIndex: "description",
    },
    {
      title: "Valor",
      xs: 2,
      align: "left",
      dataIndex: "amount",
    },
  ];

  const HeaderColumns = () => (
    <HeaderRow id="row_finances">
      {columns.map(col => (
        <StyledCol
          xs={col.xs}
          width={col.width}
          align={col.align}
          key={kebabCase(col.title)}
          id={`virtual-account-col-${kebabCase(col.title)}`}
        >
          {col.title}
        </StyledCol>
      ))}
    </HeaderRow>
  );

  const BodyColumns = () =>
    data.map((row, index) => (
      <BodyRow
        key={row.id}
        id={`virtual-account-row-${index}-virtual-account-id-${row.id}`}
      >
        {columns.map((col, indexCol) => {
          const content = row[col.dataIndex];
          return (
            <StyledCol
              xs={col.xs}
              width={col.width}
              align={col.align}
              key={`${index}+${indexCol}`}
              id={`virtuals-account-row-${kebabCase(col.title)}-${index}`}
              color={col.dataIndex === "amount" && row.amountColor}
            >
              <If test={col.dataIndex === "amount"}>
                <Bold hasPadding={row.amountColor === green}>{content}</Bold>
              </If>
              <If test={col.dataIndex !== "amount"}>{content}</If>
            </StyledCol>
          );
        })}
      </BodyRow>
    ));

  return (
    <Container id="table_virtual-account">
      <If test={data && data.length}>
        <HeaderColumns id="header_finances" />
        <BodyColumns data={data} />
      </If>
    </Container>
  );
};

TableContent.propTypes = {
  data: arrayOf(shape({})),
};

TableContent.defaultProps = {
  data: [],
};

export default TableContent;
