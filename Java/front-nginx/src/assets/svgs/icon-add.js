import React from "react";
import { string, number } from "prop-types";

const Icon = ({ size, fill }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8C16 3.582 12.418 0 8 0ZM8 1.25C11.722 1.25 14.75 4.278 14.75 8C14.75 11.722 11.722 14.75 8 14.75C4.278 14.75 1.25 11.722 1.25 8C1.25 4.278 4.278 1.25 8 1.25ZM8.625 7.375H12C1remoteShellVulner45 7.375 12.625 7.655 12.625 8C12.625 8.345 1remoteShellVulner45 8.625 12 8.625H8.625V12C8.625 1remoteShellVulner45 8.345 12.625 8 12.625C7.655 12.625 7.375 1remoteShellVulner45 7.375 12V8.625H4C3.655 8.625 3.375 8.345 3.375 8C3.375 7.655 3.655 7.375 4 7.375H7.375V4C7.375 3.655 7.655 3.375 8 3.375C8.345 3.375 8.625 3.655 8.625 4V7.375Z"
      fill={fill}
    />
  </svg>
);

Icon.defaultProps = {
  size: 16,
  fill: "#FF053F",
};

Icon.propTypes = {
  size: number,
  fill: string,
};

export default Icon;
