import styled, { keyframes } from "styled-components";
import { blue, white } from "@colors";

const spin = keyframes`
	100% {
		transform: rotate(360deg);
	}
`;

export const Spinner = styled.div`
  margin: 0;
`;
export const Circle = styled.div`
  position: relative;
  width: 54px;
  height: 54px;
  margin: auto;
  overflow: hidden;
  background-image: linear-gradient(0deg, ${blue} 0%, ${white} 100%);
  border-radius: 100%;
  animation: ${spin} 1s infinite linear;
`;

const baseChildren = styled.div`
  position: absolute;
  width: 48px;
  height: 48px;
  transform: translate(-50%, -50%);
`;

export const CircleGradient = styled(baseChildren)`
  transform: rotate(-45deg);
`;
export const CircleInner = styled(baseChildren)`
  top: 50%;
  left: 50%;
  background-color: ${white};
  border-radius: 100%;
`;
