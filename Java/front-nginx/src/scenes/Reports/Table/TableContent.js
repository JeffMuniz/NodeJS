import React from "react";
import { func, bool, shape, arrayOf, number } from "prop-types";
import { kebabCase, isFunction } from "lodash";
import { If } from "@utils";
import { Checkbox } from "@base";
import SvgIcon from "src/common/SvgIcon/SvgIcon";
import {
  Container,
  HeaderRow,
  StyledCol,
  BodyRow,
  DeleteBtn,
  TableControlsContainer,
  RowActionContainer,
  RowActionBtn,
  StyledColStatus,
} from "./TableContent.styles";

const TableContent = ({
  data,
  checkedItems,
  isAllReportsCheckSelected,
  isCheckAllBtnHidden,
  hasItemsSelected,
  onClickToggleReportCheck,
  onClickToggleAllReportsCheck,
  onClickDeleteSelectedReports,
  onClickDeleteOne,
  onClickDownloadOne,
}) => {
  const columns = [
    {
      width: "50px",
      render: (row, text, index) => (
        <Checkbox
          id={`report-row-${index}-checkbox`}
          checked={checkedItems.indexOf(row.id) >= 0}
          onClick={onClickToggleReportCheck(row)}
          disabled={!row.canDelete}
        />
      ),
    },
    {
      title: "Geração do Relatório",
      xs: 2,
      align: "left",
      dataIndex: "requestDate",
    },
    {
      title: "Período de Pedido",
      xs: 3,
      align: "left",
      dataIndex: "rangeDate",
      render: (row, date) => (
        <span>
          De {date[0]} até {date[1]}
        </span>
      ),
    },
    {
      title: "Tipo de Relatório",
      xs: 2,
      align: "left",
      dataIndex: "type",
    },
    {
      title: "Status Relatório",
      xs: 2,
      align: "left",
      dataIndex: "status",
      render: (row, text) => (
        <StyledColStatus color={row.statusColor}>{text}</StyledColStatus>
      ),
    },
    {
      title: "",
      width: "100px",
      render: (row, text, index) => (
        <RowActionContainer>
          <If test={!hasItemsSelected}>
            <If test={row.canDownload}>
              <RowActionBtn
                onClick={onClickDownloadOne(row.id)}
                id={`report-row-${index}-button-download`}
              >
                <SvgIcon name="download" size={25} />
              </RowActionBtn>
            </If>
            <If test={row.canDelete}>
              <RowActionBtn
                onClick={onClickDeleteOne(row.id)}
                id={`report-row-${index}-button-delete`}
              >
                <SvgIcon name="delete" size={25} />
              </RowActionBtn>
            </If>
          </If>
        </RowActionContainer>
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
          key={index}
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

  const TableControls = () => (
    <TableControlsContainer>
      <Checkbox
        id="checkbox-toggle-all-reports"
        checked={isAllReportsCheckSelected}
        onClick={onClickToggleAllReportsCheck}
        disabled={isCheckAllBtnHidden}
      />
      <If test={!isAllReportsCheckSelected}>
        <span>Selecionar todos</span>
      </If>
      <If test={hasItemsSelected}>
        <DeleteBtn
          onClick={onClickDeleteSelectedReports}
          id="button-delete-selected-reports"
        >
          <SvgIcon name="delete" size={25} /> EXCLUIR
        </DeleteBtn>
      </If>
    </TableControlsContainer>
  );

  return (
    <Container id="table_reports">
      <If test={data && data.length}>
        <TableControls />
        <HeaderColumns />
        <BodyColumns data={data} />
      </If>
    </Container>
  );
};

TableContent.propTypes = {
  data: arrayOf(shape({})),
  checkedItems: arrayOf(number).isRequired,
  isAllReportsCheckSelected: bool.isRequired,
  isCheckAllBtnHidden: bool.isRequired,
  hasItemsSelected: bool.isRequired,
  onClickToggleReportCheck: func.isRequired,
  onClickToggleAllReportsCheck: func.isRequired,
  onClickDeleteSelectedReports: func.isRequired,
  onClickDeleteOne: func.isRequired,
  onClickDownloadOne: func.isRequired,
};

TableContent.defaultProps = {
  data: [],
};

export default TableContent;
