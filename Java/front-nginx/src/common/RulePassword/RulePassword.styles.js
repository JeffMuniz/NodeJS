import styled from "styled-components";
import { red, veryLigtherGrey, green } from "@colors";

const BaseListItem = styled.li`
  margin-right: 35px;
  line-height: 22px;
  font-size: 14px;
  letter-spacing: -0.3px;
  text-transform: lowercase;
  font-style: normal;
`;

export const LabelSucess = styled(BaseListItem)`
  color: ${green};
`;

export const LabelError = styled(BaseListItem)`
  color: ${({ error }) => (error ? red : veryLigtherGrey)};
`;
