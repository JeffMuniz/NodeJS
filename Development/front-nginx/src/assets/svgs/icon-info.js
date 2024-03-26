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
      d="M8 15C4.14 15 1 11.86 1 8C1 4.14 4.14 1 8 1C11.86 1 15 4.14 15 8C15 11.86 11.86 15 8 15ZM8 0C3.582 0 0 3.582 0 8C0 12.418 3.582 16 8 16C12.418 16 16 12.418 16 8C16 3.582 12.418 0 8 0ZM8 5.5C7.724 5.5 7.5 5.724 7.5 6V12C7.5 12.276 7.724 12.5 8 12.5C8.276 12.5 8.5 12.276 8.5 12V6C8.5 5.724 8.276 5.5 8 5.5ZM7.6499 3.6499C7.5499 3.7399 7.4999 3.8699 7.4999 3.9999C7.4999 4.1299 7.5499 4.2599 7.6499 4.3499C7.7399 4.4499 7.8699 4.4999 7.9999 4.4999C8.1299 4.4999 8.2599 4.4499 8.3499 4.3499C8.4499 4.2599 8.4999 4.1299 8.4999 3.9999C8.4999 3.8699 8.4499 3.7399 8.3499 3.6499C8.1699 3.4599 7.8299 3.4599 7.6499 3.6499Z"
      fill={fill}
    />
  </svg>
);

Icon.defaultProps = {
  size: 16,
  fill: "#2E2F30",
};

Icon.propTypes = {
  size: number,
  fill: string,
};

export default Icon;
