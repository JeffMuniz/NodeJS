import React from "react";
import styled from "styled-components";

import { ifStyle } from "@utils";
import TextInput from "src/common/TextInput/TextInput";
import { darkGrey } from "@colors";
import { SvgIcon } from "@common";

const isLoading = ifStyle("status");
const isDashed = ifStyle("isDashed");

export const Content = styled.div`
  position: relative;
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

export const OrderAndSearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;

export const SimpleInput = styled(TextInput)`
  width: 320px;
  padding-left: 40px;
  margin: 0 0 0 auto;
  &:focus {
    outline: none;
  }
`;

export const IconWrapper = styled.div`
  position: relative;
  left: -300px;
  top: 7px;
`;

export const Icon = styled(props => <SvgIcon {...props} />)`
  position: absolute;
  left: 0;
  margin: 7px;
`;
