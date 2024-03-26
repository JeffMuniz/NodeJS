import styled, { keyframes } from "styled-components";
import { grey, white } from "@colors";
import { ifStyle } from "@utils";

const active = ifStyle("active");

export const ANIMATION_TIME = 500;
export const Container = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  z-index: 999;
`;

const fadeIn = keyframes`
  from {opacity: 0; height: 0px;}
  to {opacity: 1; height: 54px;}
`;

const fadeOut = keyframes`
  from {opacity: 1; height: 54px;}
  to {opacity: 0; height: 0px;}
`;

export const ToastRow = styled.div`
  background-color: ${grey};
  border-radius: 4px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  margin: 10px 30px 0px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  bottom: 10px;
  visibility: ${active("visible", "hidden")};
  animation: ${active(fadeIn, fadeOut)} ${ANIMATION_TIME}ms linear;
  transition: visibility ${ANIMATION_TIME}ms linear;

  a {
    text-decoration: none;
  }
`;

export const ToastText = styled.span`
  margin: 15px 24px;
  font-weight: 700;
  font-size: 18px;
  color: ${white};
  user-select: none;
`;

export const ToastLink = styled.span`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  text-align: right;
  color: ${white};

  margin-right: 40px;
  cursor: pointer;
`;
