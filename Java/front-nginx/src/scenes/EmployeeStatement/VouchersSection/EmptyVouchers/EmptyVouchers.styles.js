import styled from "styled-components";
import { darkGrey, dustyGray } from "@colors";

export const Container = styled.div`
  display: block;
  text-align: center;
  padding: 83px 0;
  margin: auto;
  border: 1px solid ${darkGrey};
  width: calc(100% - 32px);
`;

export const Text = styled.p`
  display: block;
  margin: auto;
  width: 350px;
  color: ${dustyGray};
  font-size: 20px;
  line-height: 27px;
  margin-top: 5px;
`;
