import styled from "styled-components";
import { dustyGray } from "@colors";

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

export const Text = styled.p`
  width: 630px;
  font-size: 20px;
  color: ${dustyGray};
  display: block;
  margin: auto;
  text-align: center;
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;
