import styled from "styled-components";
import { ifStyle } from "@utils";
import { black } from "../../styles/colors";

const isCapitalized = ifStyle("isCapitalized");

export const Wrapper = styled.div`
  margin-top: 10px;
  text-transform: ${isCapitalized("capitalize", "uppercase")};
  font-size: 14px;
  color: ${black};
`;
