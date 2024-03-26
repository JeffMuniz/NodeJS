import styled from "styled-components";

import { red } from "src/styles/colors";
import Icon from "src/common/Icon/Icon";

export const InputLabel = styled.label`
  color: ${red};
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  letter-spacing: -0.3px;
  text-transform: uppercase;
  border: none;
  padding: 0;
  display: inline-flex;
  cursor: pointer;
  background-color: transparent;
`;

export const IconStyled = styled(Icon)`
  position: absolute;
  right: 50px;
  bottom: -2px;
`;

export const LabelFile = styled.span`
  width: 11em;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const View = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const InputLabelView = styled.div`
  display: flex;
`;

export const Span = styled.span`
  color: #666666;
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  font-style: italic;
  letter-spacing: 0.12px;
  line-height: 22px;
  text-align: center;
`;

export const FileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

export const InputError = styled.span`
  color: red;
  font-size: 16px;
`;

export const Wrapper = styled.div`
  width: 100%;
  text-align: center;
`;
