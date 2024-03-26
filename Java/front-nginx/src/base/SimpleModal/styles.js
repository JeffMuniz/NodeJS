import styled from "styled-components";
import { lighterBlack } from "@colors";

export const ModalWrapper = styled.div`
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalContainer = styled.div`
  width: ${props => props.width || "600px"};
  max-width: 80vw;
  min-height: ${props => props.height || "352px"};
  background-color: white;
  overflow: none;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

export const ModalHeader = styled.div`
  position: relative;
  float: left;
  width: 100%;
  height: 0;
`;

export const ModalTitle = styled.div`
  float: left;
  padding: 40px;
  font-family: "Open Sans", sans-serif;
  font-size: 28px;
  color: ${lighterBlack};
`;

export const ModalCloseButton = styled.div`
  position: relative;
  float: right;
  right: 20px;
  top: 20px;
`;

export const ModalCloseIcon = styled.div`
  cursor: pointer;
`;

export const ModalContent = styled.div`
  padding-left: ${({ paddingless }) => !paddingless && "40px"};
  padding-right: ${({ paddingless }) => !paddingless && "40px"};
  padding-bottom: ${({ paddingless }) => !paddingless && "40px"};
  padding-top: ${({ hasTitle, paddingless }) =>
    !hasTitle && !paddingless && "40px"};
  margin-top: ${({ hasTitle }) => hasTitle && "120px"};
  overflow: auto;
  max-height: 100vh;
`;
