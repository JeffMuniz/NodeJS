import styled from "styled-components";
import {
  blackPointSeven,
  blue,
  alabaster,
  lighterBlack,
  dustyGray,
  persianRed,
  shark,
  veryLigtherGrey,
} from "@colors";

import { TextInput } from "@common";
import { Field } from "src/modules/Form";

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

export const CheckButton = styled(RemoveEntry)``;

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

    color: ${persianRed};
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

export const FieldInput = styled(Field)`
  border: 1px solid ${veryLigtherGrey};
  border-radius: 8px;
  color: ${persianRed};
  font-weight: bold;
  height: 30px;
  width: 200px;
`;

export const Text = styled.span`
  color: ${({ isInvalidStatus }) => (isInvalidStatus ? shark : persianRed)};
`;

export const TextInputCPF = styled(TextInput)`
  color: ${persianRed};
  font-weight: bold;
  width: 200px;
`;

export const Title = styled.h1`
  font-size: 24px;
  line-height: 38px;
  margin: 0px 0px 5px;
  font-weight: normal;
`;

export const SubtitleWrapper = styled.h2`
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
`;

export const SubTitle = styled.span`
  color: ${lighterBlack};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: 0.1px;
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
