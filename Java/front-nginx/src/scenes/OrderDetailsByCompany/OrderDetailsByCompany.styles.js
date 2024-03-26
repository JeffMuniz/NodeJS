import styled from "styled-components";
import { Button as CommonButton } from "@common";

export const Button = styled(CommonButton)`
  font-size: 14px;
  font-weight: 700;
`;

export const ButtonContainer = styled.div`
  height: 0;
  bottom: 94px;
  display: flex;
  justify-content: flex-end;
  left: 14px;
  position: relative;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
  width: 100%;
`;

export const TabContentWrapper = styled.div`
  min-height: 450px;
`;
