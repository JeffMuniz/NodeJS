import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { lighterBlack, white, darkGrey } from "src/styles/colors";
import { ifStyle } from "@utils";

const isOpen = ifStyle("isOpen");

export const NavLinkStyled = styled(NavLink)`
  color: ${lighterBlack};
  border-bottom: 1px solid ${darkGrey};
  font-size: 16px;
  padding: 15px 0;
  text-decoration: none;
  line-height: 26px;
`;

export const activeLink = {
  fontWeight: "bold",
};

export const BaseOption = styled.li`
  cursor: pointer;
  list-style-type: none;
  padding: 17.5px 0;
`;

export const DropDownWrapper = styled.div`
  background-color: ${white};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  display: flex;
  flex-direction: column;
  opacity: ${isOpen("1", "0")};
  padding: 5px 24px 10px 24px;
  position: absolute;
  right: 0;
  transition: opacity 0.25s ease-in-out;
  z-index: 4;
  width: 175px;
  visibility: ${isOpen("visible", "hidden")};
`;

export const ChangeGroupOption = styled(BaseOption)`
  border-bottom: 1px solid ${darkGrey};
`;
