import styled from "styled-components";

import { red, white } from "@colors";
import { Button } from "@common";

export const ForwardButton = styled(Button)`
  margin: 132px 0 72px 0;
  height: 40px;
`;

export const BackwardButton = styled(ForwardButton)`
  background-color: ${white};
  color: ${red};
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
  width: 100%;
`;
