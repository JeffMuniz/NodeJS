import React from "react";
import { connect } from "react-redux";
import { string, shape } from "prop-types";
import View from "./OrderNew";

const OrderNew = ({ deliveryType, history }) => (
  <View deliveryType={deliveryType} history={history} />
);

export const mapStateToProps = ({
  selectedCompanyTree: {
    selectedGroup: {
      params: { deliveryType },
    },
  },
}) => ({
  deliveryType,
});

OrderNew.propTypes = {
  deliveryType: string.isRequired,
  history: shape({}).isRequired,
};

export default connect(mapStateToProps)(OrderNew);
