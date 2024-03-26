import React, { Fragment, Component } from "react";
import { withRouter } from "react-router-dom";
import { FilterPeriod, FilterStatus, FilterSearchableInput } from "@common";
import { Pagination, LoadingWrapper } from "@base";
import { getInvoices } from "src/api/invoiceUnified";
import Invoices from "./Invoices";
import { FiltersWrapper } from "./styles";

const initialState = () => ({
  invoices: {
    content: [],
    totalItems: 0,
  },
  page: 1,
  itemsPerPage: 20,
  loading: false,
});

class MyPaymentsUnified extends Component {
  state = {
    ...initialState(),
    periodFilter: { startDate: null, endDate: null },
    statusFilter: null,
    inputFilter: "",
  };

  componentDidMount() {
    this.fetchData();
  }

  onChangePeriodFilter = ({ startDate, endDate }) => {
    this.resetState();
    this.setState({ periodFilter: { startDate, endDate } }, this.fetchData);
  };

  onChangeStatusFilter = ({ statusFilter }) => {
    this.resetState();
    this.setState({ statusFilter }, this.fetchData);
  };

  onInputSearchableFilter = inputFilter => {
    this.resetState();
    this.setState({ inputFilter }, this.fetchData);
  };

  resetState = () => {
    this.setState(initialState());
  };

  handleChangePage = ({ page }) => {
    this.setState({ page }, this.fetchData);
  };

  async fetchData() {
    try {
      this.setState({ loading: true });

      const invoices = await getInvoices(this.state);
      this.setState({ invoices });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      loading,
      page,
      itemsPerPage,
      invoices: { content, totalItems },
    } = this.state;

    return (
      <Fragment>
        <FiltersWrapper>
          <FilterPeriod onChange={this.onChangePeriodFilter} />
          <FilterStatus onChange={this.onChangeStatusFilter} />
          <FilterSearchableInput
            dropdownFilterOptions={[
              {
                key: "invoiceId",
                description: "ID fatura",
                queryParam: "idFatura",
              },
              {
                key: "costCenter",
                description: "Centro de custo",
                queryParam: "centroCusto",
              },
            ]}
            onInput={this.onInputSearchableFilter}
          />
        </FiltersWrapper>
        <LoadingWrapper loading={loading}>
          <Pagination
            data={{ totalItems }}
            currentPage={page}
            itemsPerPage={itemsPerPage}
            callback={this.handleChangePage}
            render={() => <Invoices invoices={content} />}
          />
        </LoadingWrapper>
      </Fragment>
    );
  }
}

export default withRouter(MyPaymentsUnified);
