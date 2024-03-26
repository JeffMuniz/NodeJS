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
      d="M16.0608 9.38018C16.2791 9.18025 16.6396 9.17619 16.8647 9.37206C17.0887 9.56794 17.0933 9.88967 16.8738 10.0896L12.6636 14.7623C12.4862 14.9206 12.2531 14.9998 12.02 14.9998C11.7869 14.9998 11.5549 14.9206 11.3776 14.7623L7.08085 10.0896C6.85912 9.8917 6.85912 9.56997 7.08085 9.37206C7.30257 9.17416 7.66302 9.17416 7.88475 9.37206L12.0177 13.8997L16.0608 9.38018Z"
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
