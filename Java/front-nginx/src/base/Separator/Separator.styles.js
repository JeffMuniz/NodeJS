import styled from "styled-components";

import { rgbaStrongShadowGrey, veryLigtherGrey } from "@colors";

import { ifStyle } from "@utils";

const isDisabled = ifStyle("disabled");

const shouldRotate = ifStyle("rotate");

export const Line = styled.hr`
  border: 1px solid ${isDisabled(veryLigtherGrey, rgbaStrongShadowGrey)};
  width: ${({ width }) => width};
  transform: ${shouldRotate("rotate(90deg)", "none")};
`;
