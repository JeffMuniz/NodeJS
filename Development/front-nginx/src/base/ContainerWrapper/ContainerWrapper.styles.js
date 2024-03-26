import styled from "styled-components";
import { Container as ContainerWrapper, Button as BaseButton } from "@common";

import { ifStyle } from "@utils";

import { lighterBlack, darkGrey, red } from "@colors";

const isBiggerTitle = ifStyle("isBiggerTitle");
const isMediumTitle = ifStyle("isMediumTitle");
const isInsideAnother = ifStyle("isInsideAnother");
const isVisible = ifStyle("isVisible");
const isDisabled = ifStyle("disabled");
const showHeaderBorder = ifStyle("showHeaderBorder");

export const Container = styled(ContainerWrapper)`
  min-height: ${isInsideAnother("470px", "86%")};
  padding: ${isInsideAnother(0, 33)}px ${isInsideAnother(0, 24)}px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-grow: 1;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-bottom: ${isInsideAnother(0, 24)}px;
  border-bottom: ${showHeaderBorder(`1px solid ${darkGrey}`, 0)};
`;

export const Title = styled.h1`
  font-family: "Open Sans", sans-serif;
  font-size: ${isBiggerTitle("40px", isMediumTitle("28px", "16px"))};
  font-weight: ${isBiggerTitle("bold", "normal")};
  color: ${lighterBlack};
  line-height: 54px;
  margin: 0 0 38px;
  height: 40px;
  padding: 0;
  align-self: ${isBiggerTitle("flex-start", "center")};
`;

export const Subtitle = styled.h4`
  margin: 0;
  padding: 0;
  font-weight: normal;
  font-size: 16px;
  letter-spacing: 0.1px;
  align-self: flex-start;
  visibility: ${isVisible("visible", "hidden")};
`;

export const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const ActionButtonsWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  position: ${isInsideAnother("absolute", "inherit")};
  right: ${isInsideAnother(120, 0)}px;
  margin-top: ${isInsideAnother(70, 0)}px;
  justify-content: flex-end;
  align-items: center;
`;

export const Button = styled(BaseButton)`
  color: ${red};
  opacity: ${isDisabled("0.5", "1")};
`;

export const Loading = styled.div`
  height: 80px;
  width: 80px;
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;
