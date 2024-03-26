import styled from "styled-components";
import { white, shark } from "@colors";

export const Container = styled.div`
  position: relative;

  svg {
    margin-right: 12px;
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;

export const Message = styled.span`
  width: 263px;
  background: ${white};
  opacity: 0;
  visibility: hidden;
  position: absolute;
  top: -20px;
  padding: 13px 14px;

  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: ${shark};
  box-shadow: 1px 4px 20px rgba(0, 0, 0, 0.2);
`;
