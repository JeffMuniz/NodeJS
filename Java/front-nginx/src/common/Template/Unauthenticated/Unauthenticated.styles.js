import { Row, Col } from "react-flexbox-grid";
import styled from "styled-components";
import { darkPurple, darkGrey, red, blue, blackPointSeven } from "@colors";
import { homeBackground } from "@assets";
import { ifStyle } from "@utils";

const isLoading = ifStyle("isLoading");

export const Container = styled.div`
  position: relative;
`;

export const StyledLeftCol = styled(Col)`
  background: #4e2789;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: -webkit-fill-available;
  position: fixed;
  width: 40vw;
`;

export const macHeart = styled.div`
  display: flex;
  justify-content: center;
  background: ${darkPurple};
  padding: 40px;
`;

export const ImageWrapper = styled.div`
  background: ${darkPurple} url(${homeBackground}) no-repeat;
  background-size: contain;
  background-position: bottom center;
  height: calc(100vh - 152px);
`;

export const StyledRightCol = styled(Col)`
  margin-left: 40vw;
  min-height: 100vh;
  padding-top: ${props => (props.padding ? `${props.padding}px` : "65px")};
  max-width: ${props => (props.size ? `${props.size}px` : "667px")};
  padding-left: 66px;
  display: flex;
`;

export const StyledRightColContent = styled(Col)`
  display: flex;
  flex-direction: column;
`;

export const Boxes = styled(Row)`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 46px;
  margin-bottom: 46px;

  & div:last-of-type {
    border-left: 1px solid ${darkGrey};
  }
`;

export const RedText = styled.span`
  color: ${red};
  font-weight: bold;
`;

export const Link = styled.a`
  color: ${blue};
  font-weight: bold;
  text-decoration: underline;
`;

export const ChildrenWrapper = styled(Row)`
  flex: 1 !important;
  width: ${props => props.width};
`;

export const AnimationWrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  display: ${isLoading("flex", "none")};
  justify-content: center;
  align-items: center;
  z-index: 999;
  background: ${blackPointSeven};
`;

export const Loading = styled.div`
  width: 80px;
  height: 80px;
`;

export const EmptyBox = styled.div`
  min-height: 100px;
`;
