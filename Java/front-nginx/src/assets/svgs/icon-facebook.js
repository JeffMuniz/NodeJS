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
    <path d="M21.1434 17.1965H10V12.9941H22L21.1434 17.1965Z" fill="#D6D6D6" />
    <path
      d="M12.5976 10.2259C12.5976 10.7783 12.5976 27 12.5976 27H17.7158C17.7158 27 17.7158 11.272 17.7158 10.9018C17.7158 10.4433 18.0397 10.2024 18.5724 10.2024C19.7098 10.2024 20.8831 10.2024 21.9989 10.2024C21.9989 9.70278 21.9989 7.59866 21.9989 6.00001C20.5016 6.00001 18.8027 6.00001 18.0469 6.00001C12.4608 5.99413 12.5976 9.67339 12.5976 10.2259Z"
      fill={fill}
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
