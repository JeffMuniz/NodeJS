import styledWeb from "styled-components";

import {
  white,
  darkWhite,
  lighterGreen,
  simpleDarkenGrey,
  veryLightBlack,
} from "src/styles/colors";

export const SpanBox = styledWeb.span`
  position: absolute;
  top: 3px;
  height: 15px
  width: 15px
  border: 1px solid ${simpleDarkenGrey};
  background-color: ${darkWhite};
  border-radius: 50%;
`;

export const Box = styledWeb.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;

  &:checked ~ ${SpanBox} {
    background-color: ${white};

    &:after {
      content: "";
      position: absolute;
      top: 4px;
      left: 4px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: ${lighterGreen};
    }
  }
`;

export const TextError = styledWeb.span`
  color: red;
  display: block;
  font-style: italic;
  font-size: 12px;
`;

export const Description = styledWeb.span`
  color: ${veryLightBlack};
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  margin: ${props => (props.labelBefore ? "0 5px 0 0" : "0 0 0 30px")};
`;

export const Label = styledWeb.label`
  position: relative;
  margin-left: 40px
  :nth-child(1) {
    margin-left: 0;
  }
`;

export const Wrapper = styledWeb.div`
  margin: 10px 0;
  width: 100%;
`;
