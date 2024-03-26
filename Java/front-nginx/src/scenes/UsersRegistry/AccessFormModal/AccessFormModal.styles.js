import styled from "styled-components";

import { lighterBlack } from "@colors";

import { Button } from "@common";

export const ModalWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  height: 400px;
  width: 550px;
  overflow: hidden;
`;

export const WarningIcon = styled.div``;

export const Message = styled.p`
  font-family: Open Sans, sans-serif;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: 0.1px;
  color: ${lighterBlack};
  font-weight: 600;
  margin: 0;
  width: 70%;
  text-align: center;
`;

export const CompanyName = styled.p`
  font-family: Barlow, sans-serif;
  font-size: 22px;
  line-height: 24px;
  letter-spacing: 0.1px;
  color: ${lighterBlack};
  font-weight: bold;
  margin: 0;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

export const StyledButton = styled(Button)``;
