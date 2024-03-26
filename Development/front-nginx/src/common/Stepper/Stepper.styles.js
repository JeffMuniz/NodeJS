import styled from "styled-components";

import { dustyGray, lighterGreen, white, progressBarGrey } from "@colors";

const BAR_WIDTH = 800;
const POSITIONING_PIXELS = 25;
const REACHED_COLOR = lighterGreen;
const UNREACHED_COLOR = progressBarGrey;

const getBubblePostion = ({ stepsQuantity, index }) => {
  if (index === 0) return POSITIONING_PIXELS;
  if (stepsQuantity === index + 1) return BAR_WIDTH + POSITIONING_PIXELS;
  return (BAR_WIDTH / (stepsQuantity - 1)) * index + POSITIONING_PIXELS;
};

const getBubbleColor = ({ progress, stepsQuantity, index }) => {
  const position = getBubblePostion({ stepsQuantity, index });

  const isReached =
    (BAR_WIDTH * progress) / 100 + POSITIONING_PIXELS >= position;

  if (index === 0 || isReached) return REACHED_COLOR;

  return UNREACHED_COLOR;
};

export const Wrapper = styled.div`
  background-color: rgba(216, 216, 216, 0.1);
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  position: relative;
  min-width: 1000px;
`;

export const ProgressWrapper = styled.div`
  position: absolute;
  width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 60px;
`;

export const Progress = styled.progress`
  appearance: none;
  position: relative;
  height: 3px;
  width: ${BAR_WIDTH}px;
  ::-webkit-progress-bar {
    background-color: ${dustyGray};
  }
  ::-webkit-progress-value {
    background-color: ${REACHED_COLOR};
  }
`;

export const ItemsWrapper = styled.div`
  position: absolute;
  left: ${getBubblePostion}px;
  top: -30px;
  min-width: 150px;
  max-width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
`;

export const Bubble = styled.div`
  border-radius: 10px;
  background: ${white};
  border-width: 5px;
  border-style: solid;
  border-color: ${getBubbleColor};
  display: block;
  height: 8px;
  width: 8px;
  top: 8px;
`;

export const Label = styled.label`
  font-family: Open Sans, sans-serif;
  font-size: 12px;
  line-height: 22px;
  font-style: italic;
  letter-spacing: 0.1px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 150px;
`;
