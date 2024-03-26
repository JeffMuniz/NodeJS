import styled from "styled-components";
import { Button as CommonButton } from "@common";

import { darkGrey } from "@colors";

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

export const Wrapper = styled.div`
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const Title = styled.h2`
  font-weight: 700;
  line-height: 53px;
  font-size: 40px;
  color: ${darkGrey};
`;
