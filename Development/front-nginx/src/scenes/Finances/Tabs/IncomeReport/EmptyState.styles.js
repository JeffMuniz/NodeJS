import styled from "styled-components";
import { divider } from "@assets";
import { dustyGray } from "@colors";

export const Container = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  height: 100%;
  padding: 124px 0;
  align-items: center;
`;

export const Text = styled.p`
  font-size: 20px;
  color: ${dustyGray};
  margin: 0;
  text-align: center;
  white-space: pre-wrap;
`;

export const Divider = styled.div`
  background: url(${divider}) center no-repeat;
  margin: 54px auto 30px;
  width: 80px;
  height: 10px;
`;
