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
      d="M5 3C3.89551 3 3 3.89543 3 5V19C3 20.1046 3.89551 21 5 21H19C20.1045 21 21 20.1046 21 19V5C21 3.89543 20.1045 3 19 3H5ZM16.5859 7.5C16.9763 7.10948 17.6096 7.10948 18 7.5L18.7073 8.20711C19.0977 8.59763 19.0977 9.23079 18.7073 9.62132L10.6213 16.9601C10.2336 17.3478 9.60718 17.3507 9.21582 16.9688C9.11987 16.9215 9.02979 16.858 8.94995 16.7782L5.29272 13.4623C4.90234 13.0718 4.90234 12.5244 5.29272 12.1339L6 11.341C6.39038 10.9505 7.02368 10.9505 7.41406 11.341L9.87646 13.4623L16.5859 7.5Z"
      fill={fill}
    />
  </svg>
);

Icon.defaultProps = {
  size: 24,
  fill: "#28C45D",
};

Icon.propTypes = {
  size: number,
  fill: string,
};

export default Icon;
