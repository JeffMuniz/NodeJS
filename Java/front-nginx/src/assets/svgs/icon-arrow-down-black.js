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
      d="M7 10L12 15L17 10H7Z"
      fill={fill}
    />
  </svg>
);

Icon.defaultProps = {
  size: 24,
  fill: "#2E2F30",
};

Icon.propTypes = {
  size: number,
  fill: string,
};

export default Icon;
