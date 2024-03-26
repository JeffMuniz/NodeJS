import styled from "styled-components";
import { white, blue, lighterBlack, darkGrey } from "@colors";

import { ifStyle } from "@utils";

const isOpen = ifStyle("isOpen");

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  text-align: center;
`;

export const SelectWrapper = styled.div`
  cursor: pointer;
  position: relative;
  margin-bottom: 20px;
`;

export const DropDownTrigger = styled.div`
  align-items: center;
  color: ${blue};
  display: flex;
  font-size: 16px;
  font-weight: 600;
`;

export const DropDownItemsWrapper = styled.div`
  background-color: ${white};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  display: flex;
  flex-direction: column;
  opacity: ${isOpen("1", "0")};
  padding: 23px 21px;
  position: absolute;
  transition: opacity 0.25s ease-in-out;
  visibility: ${isOpen("visible", "hidden")}
  z-index: 3;
  width: 220px;
  margin-left: -220px;
`;

export const Item = styled.div`
  color: ${lighterBlack};
  border-bottom: 1px solid ${darkGrey};
  font-size: 16px;
  padding: 15px 0;
  text-decoration: none;

  &:last-of-type {
    border-top: none;
    border-bottom: none;
  }
`;
