import React from "react";
import { connect } from "react-redux";
import { shape, string } from "prop-types";
import { Loading } from "@common";
import { LoadingPercents, ModalText, ModalBody } from "./LoadingModal.styles";

const LoadingModal = ({ newDeliveryPlacesStatus: { data } }) => {
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
  newDeliveryPlacesStatus: shape({
    requestStatus: string,
    data: shape({
      uploadPercent: string,
    }),
  }),
};

LoadingModal.defaultProps = {
  newDeliveryPlacesStatus: {},
};

const mapDispatchToProps = ({ deliveryPlaces }) => ({
  newDeliveryPlacesStatus: deliveryPlaces.newDeliveryPlacesStatus,
});

export default connect(mapDispatchToProps)(LoadingModal);
