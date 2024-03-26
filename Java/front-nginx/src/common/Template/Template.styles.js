import styled from "styled-components";

import { logged } from "@enums";
import { rgbaLightGrey, rgbaShadowGrey, white, black } from "src/styles/colors";
import { Container } from "@common";
import { bgLogged } from "@assets";

const themeLogged = `
  background: ${black} url(${bgLogged}) no-repeat left bottom;
`;

const themeNotLogged = `
  background: ${white};
`;

export const View = styled.div`
  width: 100%;
`;

export const Bg = styled.div`
  width: 100%;
  height: calc(100% - 148px);
  min-height: calc(100% - 148px);
  padding-bottom: 18px;
  padding-top: 34px;
  margin-top: 96px;
  position: relative;
  overflow-y: scroll;
  ${props => (props.theme.main === logged ? themeLogged : themeNotLogged)};
`;

export const Line = styled.div`
  background: ${rgbaShadowGrey};
  height: 3px;
  box-shadow: inset 0px 1px 0px ${rgbaLightGrey};
`;

export const FooterDiv = styled.div`
  height: 815px;
  margin-top: 111px;
`;

export const ChildContainer = styled(Container)`
  display: flex;
  min-height: 80%;
  flex-wrap: wrap;
  padding: 24px;
`;
