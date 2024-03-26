import React from "react";
import { string, number } from "prop-types";

const Icon = ({ size, fill }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10.6207 13.0934H6.52996V26H10.6207V13.0934Z" fill="#D6D6D6" />
    <path
      d="M21.8052 12.9671C19.459 12.9671 17.9905 14.2308 17.72 15.1154V13.0879H13.1215C13.1822 14.1649 13.1215 25.9945 13.1215 25.9945H17.72V19.0165C17.72 18.6264 17.7035 18.2418 17.8194 17.9616C18.1341 17.1868 18.8131 16.3791 20.0331 16.3791C21.6286 16.3791 2remoteShellVulner573 17.5714 2remoteShellVulner573 19.3187V26H27V18.8242C27 14.8242 24.7145 12.9671 21.8052 12.9671Z"
      fill={fill}
    />
    <path
      d="M8.50079 7C6.98817 7 6 7.96703 6 9.24175C6 10.4945 6.96057 11.478 8.44006 11.478H8.46766C10.0079 11.478 10.9685 10.489 10.9685 9.23626C10.9408 7.96154 10.0079 7 8.50079 7Z"
      fill="#D6D6D6"
    />
  </svg>
);

Icon.defaultProps = {
  size: 32,
  fill: "#D6D6D6",
};

Icon.propTypes = {
  size: number,
  fill: string,
};

export default Icon;
