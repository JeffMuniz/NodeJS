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
      d="M5 3C3.89551 3 3 3.89543 3 5V19C3 20.1046 3.89551 21 5 21H19C20.1045 21 21 20.1046 21 19V5C21 3.89543 20.1045 3 19 3H5ZM6 5C5.44775 5 5 5.44771 5 6V18C5 18.5523 5.44775 19 6 19H18C18.5522 19 19 18.5523 19 18V6C19 5.44771 18.5522 5 18 5H6Z"
      fill={fill}
    />
  </svg>
);

Icon.defaultProps = {
  size: 24,
  fill: "#9C9C9C",
};

Icon.propTypes = {
  size: number,
  fill: string,
};

export default Icon;
