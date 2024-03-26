import React, { Component } from "react";
import { shape, number, func, bool } from "prop-types";

import { OrderDetailsLine } from "./OrderDetailsLine";

export class OrderDetailsLineContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isButtonOpen: false,
    };

    this.triggerRef = React.createRef();
  }

  toggleButtonAction = () => {
    this.setState(state => ({
      isButtonOpen: !state.isButtonOpen,
    }));
  };

  render() {
    const { isButtonOpen } = this.state;

    const {
      showCostCenter,
      order,
      hasAction,
      index,
      handleOrderDetailsByCompanyPress,
      handleClickOnChargeCancel,
      key,
    } = this.props;

    return (
      <OrderDetailsLine
        {...{
          showCostCenter,
          isButtonOpen,
          order,
          hasAction,
          index,
          handleClickOnChargeCancel,
          handleOrderDetailsByCompanyPress,
          key,
        }}
        toggleButtonAction={this.toggleButtonAction}
        triggerRef={this.triggerRef}
      />
    );
  }
}

OrderDetailsLineContainer.propTypes = {
  showCostCenter: bool,
  order: shape({}).isRequired,
  hasAction: bool.isRequired,
  index: number.isRequired,
  handleClickOnChargeCancel: func.isRequired,
  handleOrderDetailsByCompanyPress: func.isRequired,
  key: number.isRequired,
};

OrderDetailsLineContainer.defaultProps = {
  showCostCenter: false,
};

export default OrderDetailsLineContainer;
