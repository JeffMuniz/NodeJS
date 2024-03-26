import styled from "styled-components";

import { divider } from "@assets";
import { darkGrey } from "@colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  align-items: center;
  height: 600px;
`;

export const SubTitle = styled.h2`
  font-weight: 700;
  line-height: 53px;
  font-size: 40px;
  margin: 0;
  color: ${darkGrey};
`;

export const Divider = styled.div`
  display: block;
  width: 100px;
  height: 100px;
  background: url(${divider}) center no-repeat;
`;

export const Text = styled.p`
  width: 700px;
  font-weight: 300;
  font-size: 32px;
  display: block;
  margin: 0 auto;
  text-align: center;
`;
