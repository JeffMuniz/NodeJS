import styled from "styled-components";

import { dustyGray, veryLigtherGrey, shark } from "@colors";

import { Button } from "@common";

import { ifStyle } from "@utils";

const isDisabled = ifStyle("disabled");

export const EmptyStateText = styled.p`
  font-family: Open Sans, sans-serif;
  font-size: 16px;
  letter-spacing: -0.2px;
  color: ${isDisabled(veryLigtherGrey, dustyGray)};
  font-style: italic;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 100px;
  justify-content: space-evenly;
`;

export const StyledButton = styled(Button)`
  width: 310px;
`;

export const SubgroupInputLabel = styled.p`
  margin: 66px auto 18px 0;
  text-transform: uppercase;
  font-size: 16px;
  color: ${shark};
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
  width: 100%;
`;
