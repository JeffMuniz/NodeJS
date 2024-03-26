import styled from "styled-components";
import { lighterBlack } from "@colors";

export const Description = styled.p`
  color: ${lighterBlack};
  font-size: 16px;
  font-family: "Open Sans", sans-serif;
  padding: ${({ subtitleMessage }) => (!subtitleMessage ? "0" : "50px 0")};
`;

export const SubTitle = styled.h2`
  color: ${lighterBlack};
  font-family: Barlow, sans-serif;
  font-size: 32px;
  font-weight: 600;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
  width: 100%;
`;
