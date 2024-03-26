import styled from "styled-components";
import { Col, Row } from "react-styled-flexboxgrid";
import { navBarGrey } from "../../styles/colors";

export const NavCol = styled(Col)`
  padding-top: 15px;
`;

export const NavRow = styled(Row)`
  background-color: ${navBarGrey};
  height: 96px;
`;
