import React from "react";
import { connect } from "react-redux";
import { shape, string } from "prop-types";
import { Loading } from "@common";
import { LoadingPercents, ModalText, ModalBody } from "./LoadingModal.styles";

const LoadingModal = ({ newOrderStatus: { data } }) => {
  const uploadPercent = data && data.uploadPercent ? data.uploadPercent : "0";
  return (
    <ModalBody>
      <Loading />
      <LoadingPercents>{`${uploadPercent}%`}</LoadingPercents>
      <ModalText>Carregando a planilha...</ModalText>
    </ModalBody>
  );
};

LoadingModal.propTypes = {
  newOrderStatus: shape({
    requestStatus: string,
    data: shape({
      uploadPercent: string,
    }),
  }),
};

LoadingModal.defaultProps = {
  newOrderStatus: {},
};

const mapDispatchToProps = ({ order: { newOrderStatus } }) => ({
  newOrderStatus,
});

export default connect(mapDispatchToProps)(LoadingModal);
