import styled from "styled-components";
import { Col, Row } from "react-styled-flexboxgrid";
import { darkGrey, black, azureRadiance } from "src/styles/colors";

export const Container = styled.div`
  margin: 35px 0 0;
  padding: 0 12px;
`;

export const HeaderRow = styled(Row)`
  background: rgba(216, 216, 216, 0.15);
  border-top: 1px solid rgba(155, 155, 155, 0.2);
  border-bottom: 1px solid rgba(155, 155, 155, 0.2);
  padding: 12px 37px;
  font-size: 14px;
  line-height: 26px;
  font-weight: bold;
`;

export const BodyRow = styled(Row)`
  height: 60px;
  border-bottom: 1px solid ${darkGrey};
  color: ${black};
  font-weight: ${300};
  font-size: 14px;
  padding: 12px 37px;
`;

export const StyledCol = styled(Col)`
  text-align: center;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;

  ${props => {
    if (props.align) {
      return {
        "text-align": props.align,
      };
    }
  }};
`;

export const RowActionBtn = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  line-height: 26px;
  color: ${azureRadiance};
  letter-spacing: 0.1px;
  text-decoration-line: underline;

  width: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UpperContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UpperContentTitle = styled.h1`
  font-size: 16px;
  line-height: 26px;
  font-weight: normal;
`;
