import React, { Component } from "react";
import { connect } from "react-redux";
import navigate from "src/routes/navigate";
import { Routes } from "src/routes/consts";
import { func, shape, number, arrayOf, string, bool } from "prop-types";
import * as orderActions from "src/redux/modules/order/actions";
import OrderErrorsList from "./OrderErrors";

class OrderErrorsContainer extends Component {
  async componentDidMount() {
    const {
      getOrderErrors,
      match: {
        params: { fileId },
      },
    } = this.props;

    if (fileId) await getOrderErrors({ fileId });
  }

  callback = async ({ page, size }) => {
    const {
      getOrderErrors,
      match: {
        params: { fileId },
      },
    } = this.props;

    await getOrderErrors({ fileId, page, size });
  };

  goToPageOrders = () => {
    const { navigator, history } = this.props;
    const nav = navigator || history;

    navigate(nav, { route: Routes.ORDERS_DASHBOARD });
  };

  render() {
    const {
      errorsData: { content, totalItems },
      errorsStatus,
      match: {
        params: { fileId },
      },
      location: {
        state: { showErrorMessage },
      },
    } = this.props;
    const hasErrors = content && content.length;

    return (
      <OrderErrorsList
        errorsList={{ content, totalItems }}
        hasErrors={hasErrors}
        errorsStatus={errorsStatus}
        callback={this.callback}
        headerClickHandler={this.goToPageOrders}
        fileId={fileId}
        showErrorMessage={showErrorMessage}
      />
    );
  }
}

OrderErrorsContainer.propTypes = {
  getOrderErrors: func.isRequired,
  match: shape({
    params: shape({
      fileId: string,
    }),
  }).isRequired,
  errorsData: shape({
    content: arrayOf(shape({})),
    totalItems: number,
  }),
  errorsStatus: string,
  location: shape({
    state: shape({
      showErrorMessage: bool,
    }),
  }).isRequired,
};

OrderErrorsContainer.defaultProps = {
  errorsData: {
    content: [],
    totalItems: 0,
  },
  errorsStatus: "none",
};

const mapStateToProps = ({
  order: {
    errors: { error, requestStatus, data },
    orders: { data: orders },
  },
}) => ({
  error,
  errorsStatus: requestStatus,
  errorsData: data,
  orders,
});

const mapDispatchToProps = {
  getOrderErrors: orderActions.getOrderErrors,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderErrorsContainer);
