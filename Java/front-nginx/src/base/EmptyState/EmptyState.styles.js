import styled from "styled-components";
import { dustyGray } from "@colors";

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  padding: 124px 0;
  text-align: center;
`;

export const Text = styled.p`
  color: ${dustyGray};
  font-size: 20px;
  font-style: normal;
  font-weight: normal;
  margin: 0;
  line-height: 27px;
  text-align: center;
  max-width: 600px;
`;
