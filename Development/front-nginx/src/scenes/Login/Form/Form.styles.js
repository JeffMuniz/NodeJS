import styled from "styled-components";
import { Row } from "react-flexbox-grid";
import { Button } from "@common";
import FormGroupDefault from "src/common/FormGroup/FormGroup";

export const FormGroup = styled(FormGroupDefault)`
  margin-bottom: 20px;
`;

export const ErrorText = styled.span`
  color: #ed5050;
  font-weight: 300;
  font-size: 14px;
  padding: 10px 0;
  margin: 0 auto;
  display: block;
  text-align: center;
`;

export const RowError = styled(Row)`
  margin-bottom: 40px;
  text-align: center;
`;

export const RowButton = styled(Row)``;

export const SubmitButton = styled(Button)`
  cursor: pointer;
  margin-bottom: 24px;
`;

export const RecaptchaWrapper = styled(Row)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  .g-recaptcha {
    display: inline-block;
  }
`;

export const StyledFormWrapper = styled.div`
  width: 350px;
`;

export const StyledForm = styled.form`
  width: 304px;
`;
