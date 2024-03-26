import styled from "styled-components";
import { dustyGray } from "@colors";
import { divider } from "@assets";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const SubTitle = styled.h2`
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  margin: 37px auto 24px;
  color: ${dustyGray};
`;

export const Divider = styled.div`
  background: url(${divider}) center no-repeat;
  width: 80px;
  height: 10px;
`;
