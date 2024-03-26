import styled from "styled-components";
import { Row, Col } from "react-styled-flexboxgrid";

import { FormGroup as FormGroupDefault } from "@common";
import { blue, white } from "@colors";

export const FormGroup = styled(FormGroupDefault)`
  margin-bottom: 22px;
`;
export const FormTerm = styled(FormGroupDefault)`
  width: 505px;
  text-align: initial;
  margin-left: -100px;
`;

export const TOSDownloadButton = styled.button`
  font-size: 14px;
  color: ${blue};
  margin-left: 5px;
  text-decoration: none;
  font-weight: bold;
  border: none;
  cursor: pointer;
  outline: none;
  background: ${white};
`;

export const RowError = styled(Row)`
  margin-bottom: 14px;
  text-align: center;
`;

export const RowButton = styled(Row)`
  margin-bottom: 180px;
`;

export const PasswordTip = styled.ul`
  margin: 2px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  white-space: nowrap;
  line-height: 22px;

  &:last-child {
    margin-bottom: 66px;
  }
`;

export const Title = styled(Col)`
  margin-bottom: 10px;
`;

export const RecaptchaWrapper = styled(Row)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;

  .g-recaptcha {
    display: inline-block;
  }
`;
