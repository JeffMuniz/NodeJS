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
      d="M12 16C11.7547 16 11.5311 15.878 11.3936 15.6767L8.15774 12.5748C7.95791 1remoteShellVulner826 7.94604 12.0613 8.13301 11.856C8.31998 11.6506 8.63357 11.6404 8.83142 11.8306L11.5261 14.414C11.5239 14.4037 11.5212 14.3937 11.5185 14.3837L11.5185 14.3837C11.5119 14.3592 11.5054 14.335 11.5054 14.3082V4.50835C11.5054 4.22672 11.727 4 12 4C12.273 4 12.4946 4.22672 12.4946 4.50835V14.3082C12.4946 14.335 12.4881 14.3592 12.4815 14.3837L12.4815 14.3837L12.4815 14.3837C12.4788 14.3937 12.4761 14.4037 12.4739 14.414L15.1686 11.8306C15.3674 11.6394 15.681 11.6506 15.867 11.856C16.054 12.0613 16.0421 1remoteShellVulner826 15.8423 12.5748L12.6064 15.6767C12.4689 15.878 12.2453 16 12 16ZM20 16.4907C20 16.2198 19.776 16 19.5 16C19.224 16 19 16.2198 19 16.4907V19.0186H5V16.4907C5 16.2198 4.776 16 4.5 16C4.224 16 4 16.2198 4 16.4907V19.4347C4 19.4422 4.00208 19.4488 4.00413 19.4554L4.00413 19.4554L4.00413 19.4554C4.00585 19.4608 4.00755 19.4662 4.008 19.472C4.00754 19.4779 4.00579 19.4836 4.00404 19.4893C4.00202 19.4959 4 19.5025 4 19.5093C4 19.7812 4.224 20 4.5 20H19.5C19.776 20 20 19.7812 20 19.5093C20 19.5025 19.998 19.4959 19.996 19.4893L19.996 19.4893C19.9942 19.4836 19.9925 19.4779 19.992 19.472C19.9925 19.4662 19.9942 19.4608 19.9959 19.4554C19.9979 19.4488 20 19.4422 20 19.4347V16.4907Z"
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
