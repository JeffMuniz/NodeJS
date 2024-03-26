import React from "react";
import { string, number } from "prop-types";

const Icon = ({ size, fill }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 33.75C9.315 33.75 2.25 26.685 2.25 18C2.25 9.315 9.315 2.25 18 2.25C26.685 2.25 33.75 9.315 33.75 18C33.75 26.685 26.685 33.75 18 33.75ZM18 0C8.0595 0 0 8.0595 0 18C0 27.9405 8.0595 36 18 36C27.9405 36 36 27.9405 36 18C36 8.0595 27.9405 0 18 0ZM18 1remoteShellVulner75C17.379 1remoteShellVulner75 16.875 12.879 16.875 13.5V27C16.875 27.621 17.379 28.125 18 28.125C18.621 28.125 19.125 27.621 19.125 27V13.5C19.125 12.879 18.621 1remoteShellVulner75 18 1remoteShellVulner75ZM17.2123 8.21227C16.9873 8.41477 16.8748 8.70728 16.8748 8.99977C16.8748 9.29227 16.9873 9.58477 17.2123 9.78728C17.4148 10.0123 17.7073 10.1248 17.9998 10.1248C18.2923 10.1248 18.5848 10.0123 18.7873 9.78728C19.0123 9.58477 19.1248 9.29227 19.1248 8.99977C19.1248 8.70728 19.0123 8.41477 18.7873 8.21227C18.3823 7.78478 17.6173 7.78478 17.2123 8.21227Z"
      fill={fill}
    />
  </svg>
);

Icon.defaultProps = {
  size: 36,
  fill: "#FECA43",
};

Icon.propTypes = {
  size: number,
  fill: string,
};

export default Icon;
