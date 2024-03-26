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
      d="M16.0603 14.6196C16.2787 14.8196 16.6391 14.8236 16.8642 14.6277C17.0882 14.4319 17.0928 14.1101 16.8733 13.9102L12.6631 9.23749C12.4857 9.07916 12.2526 9 12.0195 9C11.7864 9 11.5545 9.07916 11.3771 9.23749L7.08036 13.9102C6.85863 14.1081 6.85863 14.4298 7.08036 14.6277C7.30208 14.8257 7.66253 14.8257 7.88426 14.6277L12.0172 10.1002L16.0603 14.6196Z"
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
