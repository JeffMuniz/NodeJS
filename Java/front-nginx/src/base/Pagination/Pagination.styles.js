import styled from "styled-components";

import { ifStyle } from "@utils";
import { darkGrey } from "@colors";

const isLoading = ifStyle("status");
const isDashed = ifStyle("isDashed");

export const Content = styled.div`
  width: 100%;
  flex-direction: column;
  border: ${isDashed(`1px dashed ${darkGrey}`, "0")};
  padding: ${isDashed("15px 30px 30px", "0")};
`;

export const StateWrapper = styled.div`
  display: ${isLoading("flex", "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const Loading = styled.div`
  height: 80px;
  width: 80px;
  display: ${isLoading("block", "none")};
`;
