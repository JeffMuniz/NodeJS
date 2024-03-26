import styled from "styled-components";
import { darkGrey, black } from "src/styles/colors";

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 30px auto 0;
  text-align: center;
`;

export const PageLabel = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  color: ${black};
  margin-right: 12px;
  min-width: 110px;
  user-select: none;
`;

export const Action = styled.span`
  color: ${props => (props.isDisabled ? darkGrey : black)};
  cursor: ${props => (props.isDisabled ? "not-allowed" : "pointer")};
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  margin: 0 0 0 35px;
  user-select: none;
`;
