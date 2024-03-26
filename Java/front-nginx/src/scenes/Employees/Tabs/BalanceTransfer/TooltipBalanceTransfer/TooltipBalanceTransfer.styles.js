import styled from "styled-components";
import { dustyGray } from "@colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background: #fff;
  z-index: 5;
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
  border-radius: 10px;
  width: 568px;
  height: 408px;
  top: -135px;
  left: 225px;

  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    bottom: 100%;
    top: 167px;
    border: 0.75rem solid transparent;
    border-left: none;
    left: -12px;
    border-right-color: #fff;
    z-index: 5;
  }

  &.min-container {
    width: 466px;
    background: #fff;
    height: 175px;
    top: -82px;
    left: -4px;

    &::before {
      top: 73px;
    }
  }
`;

export const Text = styled.p`
  font-size: 13px;
  color: ${dustyGray};
  margin: 8px 5px;
`;

export const Overlay = styled.div`
  display: block;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 4;
  top: 0;
  left: 0;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 95%;
  margin: 0;
`;

export const TextWrapper = styled.div`
  padding: 10px;
`;
