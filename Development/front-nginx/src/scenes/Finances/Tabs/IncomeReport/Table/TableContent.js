import React from "react";
import { func, shape, arrayOf } from "prop-types";
import { kebabCase, isFunction } from "lodash";
import { If } from "@utils";
import SvgIcon from "src/common/SvgIcon/SvgIcon";
import {
  Container,
  HeaderRow,
  StyledCol,
  BodyRow,
  RowActionBtn,
} from "./TableContent.styles";

const TableContent = ({ data, onClickDownloadOne }) => {
  const columns = [
    {
      title: "CNPJ",
      xs: 2,
      align: "left",
      dataIndex: "cnpj",
    },
    {
      title: "Razão Social",
      xs: 7,
      align: "left",
      dataIndex: "name",
    },
    {
      title: "Ano exercício",
      xs: 2,
      align: "left",
      dataIndex: "year",
    },
    {
      title: "Arquivo PDF",
      xs: 1,
      render: (row, text, index) => (
        <RowActionBtn
          onClick={onClickDownloadOne(row)}
          id={`report-row-${index}-button-download`}
        >
          Baixar
          <SvgIcon name="download" size={25} />
        </RowActionBtn>
      ),
    },
  ];

  const HeaderColumns = () => (
    <HeaderRow>
      {columns.map((col, index) => (
        <StyledCol
          xs={col.xs}
          width={col.width}
          align={col.align}
          key={kebabCase(col.title)}
          id={`report-col-${index}-${kebabCase(col.title)}`}
        >
          {col.title}
        </StyledCol>
      ))}
    </HeaderRow>
  );

  const BodyColumns = () =>
    data.map((row, index) => (
      <BodyRow key={row.id} id={`report-row-${index}-report-id-${row.id}`}>
        {columns.map((col, indexCol) => {
          let content;

          if (isFunction(col.render)) {
            content = col.render(row, row[col.dataIndex], index);
          } else {
            content = row[col.dataIndex];
          }

          return (
            <StyledCol
              xs={col.xs}
              width={col.width}
              align={col.align}
              key={`${index}+${indexCol}`}
              id={`report-row-${index}-col-${indexCol}-${kebabCase(col.title)}`}
            >
              {content}
            </StyledCol>
          );
        })}
      </BodyRow>
    ));

  return (
    <Container id="table_reports">
      <If test={data && data.length}>
        <HeaderColumns />
        <BodyColumns data={data} />
      </If>
    </Container>
  );
};

TableContent.propTypes = {
  data: arrayOf(shape({})),
  onClickDownloadOne: func.isRequired,
};

TableContent.defaultProps = {
  data: [],
};

export default TableContent;
