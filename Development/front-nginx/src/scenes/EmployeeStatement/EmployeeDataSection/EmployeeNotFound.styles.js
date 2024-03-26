import styled from "styled-components";

import { darkGrey } from "src/styles/colors";
import { divider } from "@assets";

export const Container = styled.div`
  display: block;
  text-align: center;
  padding: 15px 0 388px;
`;

export const SubTitle = styled.h2`
  width: 600px;
  font-weight: 700;
  line-height: 53px;
  font-size: 40px;
  margin: auto;
  color: ${darkGrey};
`;

export const Divider = styled.div`
  display: block;
  width: 100px;
  height: 100px;
  margin: auto;
  background: url(${divider}) center no-repeat;
`;

export const Text = styled.p`
  width: 700px;
  font-weight: 300;
  font-size: 32px;
  display: block;
  margin: 0 auto;
`;
