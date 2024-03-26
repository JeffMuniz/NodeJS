import styled from "styled-components";
import { darkGrey } from "@colors";
import { Button } from "@common";

export const Container = styled.div`
  padding-top: 50px;
  width: 622px;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  width: 430px;
  align-self: center;
`;

export const WarningText = styled(Text)`
  font-weight: 600;
  line-height: 26px;
  font-size: 18px;
  text-align: center;
  letter-spacing: 0.1px;
`;

export const ButtonSection = styled.div`
  height: 113px;
  border-top: 2px solid ${darkGrey};
  display: flex;
  justify-content: space-evenly;
`;

export const BaseButton = styled(Button)`
  width: 224px;
  height: 44px;
  align-self: center;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

export const InfoText = styled(Text)`
  font-size: 14px;
  text-align: center;
  letter-spacing: 0.1px;
  margin-bottom: 50px;
`;
