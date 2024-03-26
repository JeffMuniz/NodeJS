import styled from "styled-components";
import { Button, ErrorText as ErrorTextBase } from "@common";
import { darkenGrey, persianPlum, cherub, azalea } from "@colors";

export const FormContent = styled.div`
  width: 700px;
`;

export const ActionButton = styled(Button)`
  cursor: pointer;
  width: 236px;
`;

export const SubmitButtonCol = styled.div`
  min-width: 226px;
`;

export const ErrorText = styled(ErrorTextBase)`
  text-align: center;
`;

export const BottomWrapper = styled.div`
  margin-top: 35px;
  padding: 33px 46px;
  display: flex;
  align-content: center;
  justify-content: space-around;
  border-top: 1px solid ${darkenGrey};
`;

export const ErrorWrapper = styled.div`
  color: ${persianPlum};
  background-color: ${cherub};
  border-color: ${azalea};
  border-radius: 7px;
  box-sizing: border-box;
  white-space: pre-line;
  padding: 12px 20px;
  width: 100%;
  line-height: 24px;
  overflow-wrap: break-word;
`;
