import styled from "styled-components";
import { Row } from "react-styled-flexboxgrid";

import { lighterBlack, red, borderGrey } from "src/styles/colors";

export const Title = styled.h2`
  font-weight: 300;
  line-height: 40px;
  font-size: 32px;
  letter-spacing: 0.5px;
  color: ${lighterBlack};
`;

export const Text = styled.p`
  color: ${lighterBlack};
  font-size: 14px;
`;

export const Times = styled.p`
  margin: 10px 0 10px;
  font-weight: 700;
  line-height: 26px;
  font-size: 18px;
  letter-spacing: 0.1px;
  display: flex;
`;

export const VoucherContainer = styled.div`
  padding: 30px 45px;
  display: flex;
  flex-direction: column;
`;

export const RadioInput = styled.div`
  width: 20px;
  height: 20px;
  display: inline-block;
  margin-right: 15px;
  cursor: pointer;
`;

export const RowError = styled(Row)`
  margin: 21px;
  text-align: center;
`;

export const ErrorText = styled.span`
  color: ${red};
  font-weight: 300;
  font-size: 14px;
  padding: 10px 0;
`;

export const ButtonsArea = styled.div`
  border-top: 1px solid ${borderGrey};
  padding: 24px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const ButtonBlockContainer = styled.div`
  display: inline-flex;
  margin: 10px 0 10px;
`;

export const StyledPeriod = styled.span`
  margin-right: 10px;
`;
