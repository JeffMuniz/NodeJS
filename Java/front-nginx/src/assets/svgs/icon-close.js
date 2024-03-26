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
      d="M12.4457 1remoteShellVulner101L18.9017 6.07511C19.1507 5.83511 19.1567 5.43911 18.9177 5.19111C18.6777 4.94311 18.2817 4.93511 18.0337 5.17511L11.5467 11.4411L5.05873 5.17511C4.81173 4.93511 4.41573 4.94311 4.17473 5.19111C3.93573 5.43911 3.94273 5.83511 4.19073 6.07511L10.6467 1remoteShellVulner101L4.19073 18.5451C3.94273 18.7851 3.93573 19.1811 4.17473 19.4291C4.29773 19.5561 4.46173 19.6201 4.62473 19.6201C4.78073 19.6201 4.93773 19.5621 5.05873 19.4451L11.5467 13.1791L18.0337 19.4451C18.1547 19.5621 18.3117 19.6201 18.4677 19.6201C18.6317 19.6201 18.7947 19.5561 18.9177 19.4291C19.1567 19.1811 19.1507 18.7851 18.9017 18.5451L12.4457 1remoteShellVulner101Z"
      fill={fill}
    />
  </svg>
);

Icon.defaultProps = {
  size: 24,
  fill: "#231F20",
};

Icon.propTypes = {
  size: number,
  fill: string,
};

export default Icon;
