import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { Pagination, LoadingWrapper } from "@base";
import { FilterSearchableInput } from "@common";

import { getInvoiceDetail, getOrdersByInvoice } from "src/api/invoiceUnified";
import { Routes } from "src/routes/consts";
import navigate from "src/routes/navigate";

import Header from "./Header";
import OrdersList from "./OrdersList";

const filterTypeOptions = [
  {
    key: "orderId",
    description: "ID do pedido",
    queryParam: "idPedido",
  },
  {
    key: "cnpj",
    description: "CNPJ",
    mask: "cnpj",
    queryParam: "cnpj",
  },
];

const itemsPerPage = 20;

class Details extends Component {
  state = {
    inputFilter: "",
    invoice: {},
    loadingHeader: false,
    loadingList: false,
    orders: {
      content: [],
      totalItems: 0,
    },
    page: 1,
  };

  componentDidMount() {
    this.fetchDataHeader();
    this.fetchDataList();
  }

  fetchDataHeader = async () => {
    const {
      location: { state: invoiceParameters },
    } = this.props;

    try {
      this.setState({ loadingHeader: true });

      const invoice = await getInvoiceDetail(invoiceParameters);

      this.setState({ invoice });
    } finally {
      this.setState({ loadingHeader: false });
    }
  };

  fetchDataList = async () => {
    const { inputFilter, page } = this.state;
    const {
      location: { state: invoiceParameters },
    } = this.props;

    try {
      this.setState({ loadingList: true });

      const orders = await getOrdersByInvoice({
        inputFilter,
        page,
        invoiceParameters,
        itemsPerPage,
      });

      this.setState({ orders });
    } finally {
      this.setState({ loadingList: false });
    }
  };

  handleChangePage = ({ page }) => this.setState({ page }, this.fetchDataList);

  handleInputFilterChange = value => {
    this.setState({ inputFilter: value, page: 1 }, this.fetchDataList);
  };

  goToOrderDetailSecondLevel = ({ orderId }) => {
    const { history } = this.props;

    navigate(history, {
      route: Routes.ORDER_DETAILS,
      params: { orderId },
    });
  };

  goToOrderDetail = ({ orderId, chargeId } = {}) => {
    const { history } = this.props;

    navigate(history, {
      route: Routes.ORDER_DETAILS_BY_COMPANY,
      params: { orderId, chargeId },
    });
  };

  render() {
    const {
      invoice,
      loadingHeader,
      loadingList,
      orders: { content, totalItems },
      page,
    } = this.state;

    return (
      <Fragment>
        <Header invoice={invoice} loading={loadingHeader} />
        <FilterSearchableInput
          onInput={this.handleInputFilterChange}
          dropdownFilterOptions={filterTypeOptions}
          marginRight="15px"
        />
        <LoadingWrapper loading={loadingList}>
          <Pagination
            data={{ totalItems }}
            currentPage={page}
            itemsPerPage={itemsPerPage}
            callback={this.handleChangePage}
            render={() => (
              <OrdersList
                orders={content}
                goToOrderDetailSecondLevel={this.goToOrderDetailSecondLevel}
                goToOrderDetail={this.goToOrderDetail}
              />
            )}
          />
        </LoadingWrapper>
      </Fragment>
    );
  }
}

Details.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({}),
  }),
};

Details.defaultProps = {
  location: { state: {} },
};

export default withRouter(Details);
