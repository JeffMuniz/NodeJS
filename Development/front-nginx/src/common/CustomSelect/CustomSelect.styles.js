import styled from "styled-components";
import {
  white,
  darkGrey,
  red,
  lighterBlack,
  rgbaShadowBlack,
} from "src/styles/colors";
import { TextInput } from "src/common/TextInput/TextInput";
import SvgIcon from "src/common/SvgIcon/SvgIcon";

export const Container = styled.div`
  display: ${props => (props.showSelect ? "block" : "none")};
  width: 255px;
  background: ${white};
  box-shadow: 1px 1px 10px ${rgbaShadowBlack};
  padding: 16px 22px;
`;

export const OptionsWrapper = styled.ul`
  color: ${lighterBlack};
  max-height: 250px;
  padding: 0;
  overflow: auto;
`;

export const Input = styled(TextInput)`
  min-width: 255px;
  height: 40px;
  border: 1px solid ${darkGrey};
  box-sizing: border-box;
  border-radius: 8px;
  margin-bottom: 22px;
  padding-left: 40px;
`;

export const Option = styled.li`
  display: block;
  border-top: 1px solid ${darkGrey};
  padding: 20px 0;
  position: relative;
  user-select: none;
  cursor: pointer;
`;

export const Description = styled.span`
  display: block;
  margin: 0 0 auto 0;
  width: calc(100% - 20px);
`;

export const Button = styled.button`
  width: 255px;
  height: 50px;
  display: block;
  border: 2px solid ${red};
  background-color: ${white};
  color: ${red};
  box-sizing: border-box;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 700;
  line-height: normal;
  font-size: 14px;
  text-align: center;
  letter-spacing: -0.3px;
  margin: 5px 0;
  cursor: pointer;
`;

export const IconWrapper = styled.div`
  position: relative;
  left: 40px;
  margin: 7px;
`;

export const SearchIcon = styled(SvgIcon)`
  position: absolute;
  left: 0;
  margin: 7px;
`;
