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
      d="M10.5473 15.9995C10.3602 15.9995 10.1742 15.9285 10.0322 15.7865L7.14625 12.9005C6.95125 12.7055 6.95125 1remoteShellVulner895 7.14625 12.1935C7.34125 11.9985 7.65825 11.9985 7.85325 12.1935L10.5473 14.8875L16.2882 9.14649C16.4843 8.95149 16.8003 8.95149 16.9952 9.14649C17.1912 9.34149 17.1912 9.65849 16.9952 9.85349L11.0623 15.7865C10.9203 15.9285 10.7343 15.9995 10.5473 15.9995Z"
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
