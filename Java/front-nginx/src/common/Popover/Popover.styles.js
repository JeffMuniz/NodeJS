import ReactPopover from "react-popover";
import styledWeb from "styled-components";

import { black, grey, darkerWhite, darkGrey } from "src/styles/colors";

export const StyledPopover = styledWeb(ReactPopover)`
  z-index: 1;
  .Popover-body {
    transform: translateX(120px);
    max-width: 300px;
    background-color: ${darkerWhite};
    border: 1px solid ${darkGrey};
    padding: 5px 15px 15px 15px;
    border-radius: 4px;

    h1 {
      color: ${black};
      font-size: 12px;
      font-weight: bold;
      letter-spacing: -0.3px;
      line-height: 16px;
    }

    div {
      color: ${grey};
      font-size: 14px;
      letter-spacing: -0.3px;
      line-height: 18px;
    }
  }

  .Popover-tip {
    position: absolute;
    top: -6px;

    polygon{
      fill: ${darkerWhite};
      stroke: ${darkGrey};
      stroke-width: 1px;
      stroke-dasharray: 20, 25;
    }
  }
`;
