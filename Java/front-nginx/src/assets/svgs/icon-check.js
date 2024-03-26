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
      d="M10.5473 15.9992C10.3602 15.9992 10.1742 15.9283 10.0322 15.7863L7.14625 12.9002C6.95125 12.7053 6.95125 1remoteShellVulner893 7.14625 12.1932C7.34125 11.9983 7.65825 11.9983 7.85325 12.1932L10.5473 14.8872L16.2882 9.14625C16.4843 8.95125 16.8003 8.95125 16.9952 9.14625C17.1912 9.34125 17.1912 9.65825 16.9952 9.85325L11.0623 15.7863C10.9203 15.9283 10.7343 15.9992 10.5473 15.9992Z"
      fill={fill}
    />
  </svg>
);

Icon.defaultProps = {
  size: 24,
  fill: "#2AD178",
};

Icon.propTypes = {
  size: number,
  fill: string,
};

export default Icon;
