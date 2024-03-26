import styled from "styled-components";
import {
  alabaster,
  blackPointSeven,
  blue,
  dustyGray,
  lighterBlack,
  shark,
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

    color: ${shark};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 90px;
`;

export const Title = styled.h1`
  font-size: 24px;
  line-height: 38px;
  margin: 0px 0px 5px;
  font-weight: normal;
`;

export const SubTitle = styled.h2`
  font-size: 18px;
  margin-top: 30px;
  font-weight: normal;
`;

export const Description = styled.span`
  font-size: 14px;
  font-weight: normal;
`;

export const LoadingWrapper = styled.div`
  &&& {
    position: fixed;
    height: 100%;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    background: ${blackPointSeven};
    top: 0;
    left: 0;
    background-size: resize;
  }
`;
