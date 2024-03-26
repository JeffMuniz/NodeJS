import styled from "styled-components";
import {
  red,
  blue,
  alabaster,
  lighterBlack,
  dustyGray,
  shark,
  persianRed,
} from "@colors";

export const RemoveEntry = styled.button`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  text-decoration-line: underline;
  color: ${blue};
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
`;

export const StyledThead = styled.thead`
  height: 34px;
  background: ${alabaster};

  font-size: 12px;
  line-height: 22px;

  color: ${lighterBlack};
  text-align: left;
  font-style: normal;
  font-weight: normal;

  th {
    padding: 9px;
  }
`;

export const StyledTbodyRow = styled.tr`
  border-bottom: 1px solid ${dustyGray};

  &:last-of-type {
    border-bottom: none;
  }

  td {
    padding: 12px 9px 0;

    height: 59px;

    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 19px;

    color: ${({ isValid }) => (isValid ? shark : persianRed)};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 90px;
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: -10px;
`;

export const ErroLabel = styled.h1`
  font-size: 14px;
  line-height: 19px;
  margin-top: 14px;
  margin-left: 5px;
  color: ${red};
`;
