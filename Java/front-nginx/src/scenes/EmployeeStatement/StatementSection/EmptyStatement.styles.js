import styled from "styled-components";

import { darkGrey } from "src/styles/colors";
import { divider } from "@assets";

export const Container = styled.div`
  display: block;
  text-align: center;
  padding: 40px 0;
  height: 400px;
`;

export const Divider = styled.div`
  background: url(${divider}) center no-repeat;
  display: block;
  margin: 30px auto 0;
  width: 100px;
  height: 10px;
`;

export const Text = styled.p`
  width: 600px;
  font-size: 20px;
  color: ${darkGrey};
  display: block;
  margin: auto;
`;
