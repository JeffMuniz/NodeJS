import styled from "styled-components";
import { navBarGrey, rgbaLightGrey, rgbaShadowGrey } from "../../styles/colors";
import Container from "../../common/Container/Container";

export const View = styled.div`
  width: 100%;
`;

export const Nav = styled.div`
  margin-bottom: 80px;
  height: 96px;
  background-color: ${navBarGrey};
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
  margin-bottom: 18px;
`;
