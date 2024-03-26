import styled from "styled-components";
import { white } from "@colors";

export const ModalContent = styled.div`
  background: ${white};
  position: relative;
  display: flex;
  align-self: center;
  border-radius: 4px;
  border: 1px solid rgb(204, 204, 204);
  outline: none;
  max-height: 90vh;
  overflow-y: auto;
`;

export const CloseModalButton = styled.div`
  display: ${({ hideMe }) => (hideMe ? "none" : "block")};
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
