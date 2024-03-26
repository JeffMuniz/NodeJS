import styled from "styled-components";

import { lighterGreen, white, progressBarGrey } from "src/styles/colors";

export const Wrapper = styled.ul`
  background-color: rgba(216, 216, 216, 0.1);
  color: ${progressBarGrey};
  display: flex;
  font-size: 12px;
  font-style: italic;
  font-weight: 100;
  padding-bottom: 32px;
  padding-top: 32px;
  margin-bottom: 35px;
`;

export const Bubble = styled.div`
  border-radius: 10px;
  background: ${white};
  border: 5px solid
    ${props => (props.complete ? lighterGreen : progressBarGrey)};
  display: block;
  height: 8px;
  margin: 5px auto 0 auto;
  position: relative;
  width: 8px;
  z-index: 2;
`;

export const Item = styled.li`
  display: block;
  flex: 1;
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
  text-align: center
  text-overflow: ellipsis;
  width: auto;

  &:not(:first-child):before {
    display: block;
    position: absolute;
    left: -50%;
    top: 29px;
    width: 100%;
    height: 3px;
    content: "";
    background-color: ${props =>
      props.complete ? lighterGreen : progressBarGrey};
    z-index: 1;
  }
`;
