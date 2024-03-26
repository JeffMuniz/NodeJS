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
      d="M12 4C13.103 4 14 4.897 14 6C14 7.103 13.103 8 12 8C10.897 8 10 7.103 10 6C10 4.897 10.897 4 12 4ZM12 5C11.449 5 11 5.448 11 6C11 6.552 11.449 7 12 7C12.551 7 13 6.552 13 6C13 5.448 12.551 5 12 5Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 12C14 10.897 13.103 10 12 10C10.897 10 10 10.897 10 12C10 13.103 10.897 14 12 14C13.103 14 14 13.103 14 12ZM12 11C11.449 11 11 11.448 11 12C11 12.552 11.449 13 12 13C12.551 13 13 12.552 13 12C13 11.448 12.551 11 12 11Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 18C14 16.897 13.103 16 12 16C10.897 16 10 16.897 10 18C10 19.103 10.897 20 12 20C13.103 20 14 19.103 14 18ZM12 17C11.449 17 11 17.448 11 18C11 18.552 11.449 19 12 19C12.551 19 13 18.552 13 18C13 17.448 12.551 17 12 17Z"
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
