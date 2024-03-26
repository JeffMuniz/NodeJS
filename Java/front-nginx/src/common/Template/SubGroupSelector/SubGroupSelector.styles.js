import styled from "styled-components";
import {
  white,
  blue,
  rgbaShadowBlack,
  lighterBlack,
  separatorGrey,
} from "src/styles/colors";

import { ifStyle } from "@utils";

import { Grid, Row } from "react-styled-flexboxgrid";

const isVisible = ifStyle("isVisible");

export const Container = styled(Grid)`
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
`;

export const LabelRow = styled(Row)`
  position: relative;
`;

export const Wrapper = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 300;
  color: ${blue};
`;

export const Separator = styled.span`
  color: ${separatorGrey};
  display: ${isVisible("block", "none")};
`;

export const Text = styled.span`
  color: ${white};
  font-weight: 400;
`;

export const LabelWrapper = styled.div`
  position: relative;
`;

export const Label = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  font-weight: 600;
  margin: 0 5px;
  min-height: 22px;
`;

export const LabelText = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 250px;
  white-space: nowrap;
`;

export const SelectedLabel = styled(Label)`
  color: ${white};
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${rgbaShadowBlack};
  z-index: 1;
`;

export const InfoBox = styled.div`
  left: 0;
  margin-top: 10px;
  position: absolute;
`;

export const InfoText = styled.div`
  background-color: ${white};
  color: ${lighterBlack};
  min-height: 50px;
  min-width: 350px;
  padding: 20px 16px;
`;

export const InfoButton = styled.div`
  color: ${white};
  cursor: pointer;
  margin-top: 12px;
  text-align: right;
`;

export const SelectWrapper = styled.div`
  left: 0;
  position: absolute;
`;
