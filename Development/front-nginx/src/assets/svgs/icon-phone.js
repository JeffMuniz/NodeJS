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
    <g opacity="0.5">
      <rect width={size} height={size} fill={fill} fillOpacity="0.01" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.6575 13.0145C20.1655 13.0145 20.905 13.872 20.905 13.872L26.3765 18.9795C26.586 19.1755 26.7565 19.5345 26.7565 19.7785V20.223V26.0905C26.7565 27.1045 25.934 27.927 24.92 27.927H7.00851C5.99451 27.927 5.17151 27.1045 5.17151 26.0905V20.2235V19.779C5.17151 19.533 5.34201 19.176 5.55151 18.98L11.022 13.872C11.022 13.872 11.761 13.0145 12.269 13.0145H12.6925V11.04C12.6925 10.488 13.1405 10.04 13.6925 10.04C14.2445 10.04 14.6925 10.488 14.6925 11.04V13.0145H17.235V11.04C17.235 10.488 17.683 10.04 18.235 10.04C18.787 10.04 19.235 10.488 19.235 11.04V13.0145H19.6575ZM7.67101 25.427H24.256L24.255 20.4205L19.198 15.699L19.1 15.607L19.02 15.5145H12.9065C12.9062 15.515 12.906 15.5154 12.9057 15.5157C12.9055 15.516 12.9052 15.5162 12.905 15.5165L12.8165 15.619L12.728 15.6995L7.67101 20.421V25.427Z"
        fill="black"
      />
      <path
        d="M20.027 4H11.9C7.75854 4 4.39954 7.359 4.39954 11.5015V12.5035C4.39954 12.786 4.62854 13.0145 4.91154 13.0145H9.51704C10.2075 13.0145 10.7675 12.4555 10.7675 11.7645V9.188C10.7675 8.498 11.327 7.938 12.0175 7.938H19.9095C20.6005 7.938 21.1595 8.498 21.1595 9.188V11.7645C21.1595 12.4555 21.719 13.0145 22.4095 13.0145H27.0165C27.2985 13.0145 27.527 12.786 27.527 12.5035V11.5015C27.5275 7.359 24.1695 4 20.027 4Z"
        fill="black"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.1475 20.5985C12.1475 18.491 13.8565 16.782 15.9635 16.782C18.071 16.782 19.7795 18.491 19.7795 20.5985C19.7795 22.706 18.071 24.414 15.9635 24.414C13.8565 24.414 12.1475 22.706 12.1475 20.5985ZM15.032 20.5995C15.032 21.113 15.449 21.53 15.9635 21.53C16.478 21.53 16.895 21.113 16.8945 20.5995C16.8945 20.085 16.4775 19.668 15.9635 19.668C15.449 19.668 15.032 20.085 15.032 20.5995Z"
        fill="black"
      />
    </g>
  </svg>
);

Icon.defaultProps = {
  size: 32,
  fill: "#666666",
};

Icon.propTypes = {
  size: number,
  fill: string,
};

export default Icon;
