import styled from "styled-components";
import { Button as CommonButton } from "@common";

export const Button = styled(CommonButton)`
  height: 50px;
  min-width: 140px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
`;

export const ContentModal = styled.div`
  text-align: center;
`;

export const Text = styled.div`
  margin-top: 15px;
`;
