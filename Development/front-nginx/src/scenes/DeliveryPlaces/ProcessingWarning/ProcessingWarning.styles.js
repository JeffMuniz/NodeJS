import styled from "styled-components";
import { dustyGray } from "@colors";
import { divider } from "@assets";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 170px 0 190px;
`;

export const Text = styled.p`
  font-size: 20px;
  line-height: 27px;
  color: ${dustyGray};
  width: 600px;
  align-self: center;
  text-align: center;
`;

export const Divider = styled.div`
  background: url(${divider}) center no-repeat;
  margin: 27px auto 0;
  width: 80px;
  height: 10px;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
