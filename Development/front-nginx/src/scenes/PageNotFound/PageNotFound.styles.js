import styled from "styled-components";

import { darkGrey } from "@colors";
import { ifStyle } from "@utils";

const isSubTitle = ifStyle("subTitle");

export const Content = styled.div`
  height: 470px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const Img = styled.img`
  width: 85px;
  height: 85px;
`;

export const Title = styled.h2`
  font-weight: 700;
  line-height: 53px;
  font-size: ${isSubTitle("40px", "50px")};
  color: ${darkGrey};
  margin-bottom: 0;
`;
