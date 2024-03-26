import styled from "styled-components";
import {
  darkGrey,
  white,
  rgbaShadowBlack,
  lighterBlack,
} from "src/styles/colors";
import { TextInput } from "@common";
import SvgIcon from "src/common/SvgIcon/SvgIcon";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 255px;
  max-height: 300px;
  background: ${white};
  box-shadow: 1px 1px 10px ${rgbaShadowBlack};
  padding: 16px 20px;
`;

export const OptionsWrapper = styled.ul`
  color: ${lighterBlack};
  max-height: 250px;
  padding: 0 15px 0 0;
  overflow: auto;
  margin-right: -12px;
`;

export const Option = styled.li`
  border-bottom: 1px solid ${darkGrey};
  padding: 20px 0;
  user-select: none;
  cursor: pointer;
  list-style-type: none;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Input = styled(TextInput)`
  min-width: 255px;
`;

export const IconWrapper = styled.div`
  width: 25px;
  position: absolute;
  margin: 7px;
`;

export const Icon = styled(SvgIcon)`
  position: relative;
  left: 0;
  margin: 7px;
`;
