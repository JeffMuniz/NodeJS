import styled from "styled-components";
import { Col, Row } from "react-styled-flexboxgrid";
import { darkGrey, black } from "src/styles/colors";

export const Container = styled.div`
  margin: 35px 0 0;
  padding: 0 12px;
`;

export const HeaderRow = styled(Row)`
  background: ${darkGrey};
  height: 40px;
`;

export const BodyRow = styled(Row)`
  height: 60px;
  border-bottom: 1px solid ${darkGrey};
  color: ${black};
  font-weight: ${300};
  font-size: 14px;
  padding: 16px auto;
`;

export const StyledCol = styled(Col)`
  text-align: center;
  margin: auto;
  padding: 16px auto;
  ${props => {
    if (props.width) {
      return {
        width: props.width,
        display: "block",
      };
    }
    if (props.align) {
      return {
        "text-align": props.align,
      };
    }
  }};
`;

export const StyledColStatus = styled.span`
  color: ${props => props.color};
`;

export const TableControlsContainer = styled.div`
  width: 165px;
  min-height: 51px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  margin-left: 12px;
`;

export const DeleteBtn = styled.button`
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: #cc3030;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;

  padding: 13px;
  margin-left: 24px;
  border-left: 2px solid ${darkGrey};

  & svg {
    margin-right: 8px;
  }
`;

export const RowActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const RowActionBtn = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`;
