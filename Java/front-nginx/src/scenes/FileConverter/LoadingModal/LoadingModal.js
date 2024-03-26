import React from "react";
import { Loading } from "@common";
import { ModalText, ModalBody } from "./LoadingModal.styles";

const LoadingModal = () => (
  <ModalBody>
    <Loading />
    <ModalText>Carregando arquivo...</ModalText>
  </ModalBody>
);

export default LoadingModal;
