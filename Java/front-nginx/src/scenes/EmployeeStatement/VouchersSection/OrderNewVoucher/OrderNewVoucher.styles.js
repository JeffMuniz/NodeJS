import styled from "styled-components";
import { red } from "src/styles/colors";
import { Row } from "react-styled-flexboxgrid";

export const Text = styled.p`
  width: 400px;
  text-align: center;
  margin: 33px auto;
  font-weight: 700;
  font-size: 14px;
`;

export const VoucherContainer = styled.div`
  padding: 30px 45px;
`;

export const SelectWrapp = styled.div`
  width: 300px;
  margin: 40px auto;
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

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
