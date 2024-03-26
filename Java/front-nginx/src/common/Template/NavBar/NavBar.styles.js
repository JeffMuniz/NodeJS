import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Col, Row } from "react-flexbox-grid";
import { Container } from "@common";
import { navBarGrey, white, red, blue, rgbaWhite } from "src/styles/colors";
import { ifStyle } from "@utils";

const isActive = ifStyle("active");
const isOpen = ifStyle("isOpen");

export const Nav = styled.nav`
  background-color: ${navBarGrey};
  height: 96px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 4;
`;

export const NavContainer = styled(Container)`
  position: relative;
  background-color: transparent;
`;

export const NavCol = styled(Col)`
  height: 100%;
  align-items: center;
  display: flex;
`;

export const DropDownCol = styled(Col)`
  align-items: center;
  padding-left: 20px;
  box-sizing: border-box;
  border-bottom: 4px solid ${isActive(red, navBarGrey)};
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  text-align: center;
  transition: border 0.25s ease-in-out;
  & > div {
    align-items: center;
    justify-content: center;
    display: flex;
    width: 100%;
    height: 100%;
  }
`;

export const ContainerNotification = styled(Col)`
  display: flex;
  justify-content: flex-end;
`;

export const ContainerDrop = styled(Col)`
  display: flex;
  justify-content: flex-end;
`;

export const DropDownColNotification = styled(Col)`
  align-items: center;
  padding-left: 85px;
  cursor: pointer;
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
  border-radius: 2px;

  & > p {
    font-size: 12px;
  }

  & > p::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    bottom: 100%;
    left: 97px;
    border: 0.75rem solid transparent;
    border-top: none;
    border-bottom-color: #fff;
    filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, 0.1));
  }
`;

export const DownloadContract = styled.a`
  font-size: 13px;
  text-decoration: none;
  cursor: pointer;
  color: ${blue};
`;

export const CircleNotificationRed = styled.span`
  position: absolute;
  width: 30px;
  height: 30px;
  right: 6%;
  background: red;
  border: 1px solid #353638;
  border-radius: 50%;
  top: 8px;
  text-align: center;
  font-size: 18px
  cursor: pointer;
  color: ${white};
`;

export const NavRow = styled(Row)`
  background-color: ${navBarGrey};
  height: 96px;
`;

export const NavLinkStyled = styled(NavLink)`
  align-items: center;
  color: ${white};
  border-bottom: 4px solid ${navBarGrey};
  box-sizing: border-box;
  display: flex;
  height: 100%;
  margin: 0 15px;
  padding: 0 15px;
  text-decoration: none;
  transition: border 0.25s ease-in-out;
`;

export const activeLink = {
  borderBottom: `4px solid ${red}`,
};

export const Avatar = styled.div`
  align-items: center;
  background-color: ${blue};
  border-radius: 30px;
  color: ${rgbaWhite};
  cursor: pointer;
  display: flex;
  font-weight: bold;
  font-size: 20px;
  height: 48px;
  justify-content: center;
  user-select: none;
  width: 48px;
`;
