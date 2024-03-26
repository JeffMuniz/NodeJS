import styled from "styled-components";
import { Link } from "react-router-dom";

import { blue } from "src/styles/colors";

export const RouterLink = styled(Link)`
  color: ${blue};
  cursor: pointer;
  font-weight: 700;
`;

export default RouterLink;
