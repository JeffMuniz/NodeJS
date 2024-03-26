import React from "react";
import { string, number } from "prop-types";

const Icon = ({ size, fill }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.086 15.173C7.281 15.173 5 12.891 5 10.086C5 7.281 7.281 5 10.086 5C12.891 5 15.173 7.281 15.173 10.086C15.173 12.891 12.891 15.173 10.086 15.173ZM20.069 19.591L16.325 15.846L16.27 15.791L14.754 14.276C14.707 14.228 14.651 14.193 14.592 14.168C15.571 13.088 16.173 11.659 16.173 10.086C16.173 6.725 13.448 4 10.086 4C6.725 4 4 6.725 4 10.086C4 13.448 6.725 16.173 10.086 16.173C11.546 16.173 12.885 15.658 13.934 14.8C13.959 14.867 13.994 14.93 14.047 14.983L15.563 16.498L15.618 16.553L19.362 20.298C19.46 20.396 19.588 20.444 19.716 20.444C19.844 20.444 19.972 20.396 20.069 20.298C20.265 20.103 20.265 19.786 20.069 19.591Z"
      fill={fill}
    />
  </svg>
);

Icon.defaultProps = {
  size: 24,
  fill: "#231F20",
};

Icon.propTypes = {
  size: number,
  fill: string,
};

export default Icon;