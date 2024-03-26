import styled from "styled-components";
import { Row, Col } from "react-styled-flexboxgrid";
import { lighterBlack, whiteF2, blue } from "@colors";

import {
  TableHeaderCol,
  TableHeader,
  TableRow as BaseDatailsRow,
  TableCol as BaseDetailsCol,
  ContainerWrapper,
} from "@base";

export const DetailsContainer = styled.div`
  background-color: ${whiteF2};
  margin-bottom: 15px;
  padding: 16px 32px;
`;

export const HeaderRow = styled(Row)`
  flex-wrap: nowrap;
  display: flex;
  text-align: left;

  margin-right: -32px;
`;

export const HeaderCol = styled(Col)`
  &&& {
    font-size: 12px;
    line-height: 22px;

    color: ${lighterBlack};
    padding-left: 0;
    padding-right: 0;
  }
`;

export const HeaderColSolicitado = styled(Col)`
  &&& {
    font-size: 12px;
    line-height: 22px;

    color: ${lighterBlack};
    padding-left: 0;
    margin-right: 40px;
  }
`;
export const ContentRow = styled(Row)`
  flex-wrap: nowrap;
`;

export const Column = styled(BaseDetailsCol)`
  &&& {
    font-size: 14px;
    line-height: 26px;
    font-weight: bold;

    text-align: left;

    color: ${lighterBlack};
    padding-left: 0;
    padding-right: 0;

    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    word-break: break-all;
  }
`;

export const ColumnName = styled(Column)`
  &&& {
    margin-left: -04px;
  }
`;

const ColumnDefault = styled(Col)`
  &&& {
    font-size: 14px;
    line-height: 26px;

    display: flex;
    align-items: center;

    padding-left: 0;
    padding-right: 0;
  }
`;

export const ColumnSolicitado = styled(ColumnDefault)`
  &&& {
    font-weight: bold;

    color: ${lighterBlack};
    margin-right: 40px;
  }
`;

export const ColumnStatus = styled(ColumnDefault)`
  &&& {
    color: ${props => props.fill};
  }
`;

export const StyledCol = styled(TableHeaderCol)`
  font-weight: normal;
  font-size: 12px;
  line-height: 22px;
  color: ${lighterBlack};
`;

export const StyledRow = styled(TableHeader)`
  height: 34px;
`;

export const TableRow = styled(BaseDatailsRow)``;

export const TableCol = styled(BaseDetailsCol)`
  text-align: left;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: ${lighterBlack};
  font-size: 14px;
`;

export const TermRow = styled(Row)`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin-right: 5px;
`;

export const AcceptTerms = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  margin-top: -65px;
  margin-bottom: 31px;
  margin-right: 10px;
  color: ${blue};
  display: flex;
  justify-content: flex-end;
  width: 200px;
  cursor: pointer;
`;

export const ContainerBody = styled(ContainerWrapper)``;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;
