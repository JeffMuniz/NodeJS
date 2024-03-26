import React, { Component } from "react";
import { shape, string, number } from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { EmptyState } from "@base";
import {
  dateHourFormats,
  invoiceType,
  invoiceStatus,
  dropdownDateFinances,
} from "@enums";

import DateManager from "src/modules/DateManager/DateManager";
import { getInvoices } from "src/api/invoice/invoice";

import MyPayments from "./MyPayments";

export const itemsPerPage = 20;
const fieldsToFilterBy = [
  {
    key: "orderId",
    description: "ID pedido",
    optionDescription: "ID do pedido",
  },
  { key: "cnpj", description: "CNPJ", mask: "cnpj" },
  {
    key: "costCenter",
    description: "Centro de custo",
    optionDescription: "Centro de custo",
  },
];

export class MyPaymentsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      invoices: [{}],
      isLoading: false,
      filterBy: Array.isArray(fieldsToFilterBy) ? fieldsToFilterBy[0] : {},
      searchFilterValue: "",
      initialDate: null,
      finalDate: null,
    };

    this.triggerRef = React.createRef();
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const {
      selectedCompany: { id: prevCompanyId },
    } = prevProps;
    const {
      selectedCompany: { id: companyId },
    } = this.props;

    if (companyId === prevCompanyId) return;

    if (!companyId) {
      return;
    }

    this.fetchData();
  }

  getEmptyComponent = () => (
    <EmptyState>
      Você ainda não tem pagamentos efetuados. Eles aparecerão listados aqui
      quando forem iniciados!
    </EmptyState>
  );

  // FORMAT PAYMENT TYPE
  getPaymentDescription = paymentType =>
    invoiceType[paymentType.toUpperCase()].description;

  // FORMAT STATUS
  getStatus = status => invoiceStatus[status];

  getStatusDescription = invoice => {
    const data = this.getStatus(invoice.receivableStatus.toUpperCase());
    if (
      invoice.receivableStatus === "REGISTRADO" &&
      this.isDateBeforeToday(invoice.dueDate)
    ) {
      return "Pagamento Atrasado";
    }
    return data.description;
  };

  isDateBeforeToday = dateTime =>
    DateManager(dateTime, dateHourFormats.longDateSlash).isBefore(
      DateManager(),
    ) &&
    DateManager(dateTime, dateHourFormats.longDateSlash).format(
      "DD/MM/YYYY",
    ) !== DateManager().format("DD/MM/YYYY");

  // CALL API INTEGRATION
  fetchData = async (
    searchFilterLabel,
    searchFilterValue,
    dateLabel,
    initialDate,
    finalDate,
  ) => {
    const {
      page,
      filterBy: { key },
      searchFilterValue: searchValue,
      initialDate: initialDateState,
      finalDate: finalDateState,
    } = this.state;
    const {
      userData: { id: userId },
      selectedGroup: { id: groupId },
    } = this.props;

    this.setState({
      isLoading: true,
    });

    try {
      const invoices = await getInvoices({
        userId,
        groupId,
        searchFilterKey: key,
        searchFilterValue: searchFilterLabel ? searchFilterValue : searchValue,
        initialDate: dateLabel ? initialDate : initialDateState,
        finalDate: dateLabel ? finalDate : finalDateState,
        pageNumber: page,
        pageSize: itemsPerPage,
      });

      this.setState({ invoices, isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });
    }
  };

  handleChangePage = ({ page }) => this.setState({ page }, this.fetchData);

  handleSelectedInputFilterChange = filterBy => {
    const { searchFilterValue } = this.state;

    this.setState({ filterBy, searchFilterValue: "" });

    // caso exista valor no input ao selecionar outra opção de filtro,
    // refazer a pesquisa com esse valor vazio para atualizar a página
    if (searchFilterValue) {
      this.fetchData(filterBy, "", null, null, null);
    }
  };

  handleInputFilterValueChange = value => {
    const { filterBy } = this.state;
    this.setState({
      searchFilterValue: value,
    });

    this.fetchData(filterBy, value, null, null, null);
  };

  handleChangeDropdownVisibility = invoice => {
    const { invoices } = this.state;

    const formattedInvoice = invoices.content.map(item =>
      item.orderId === invoice.orderId &&
      item.receivableId === invoice.receivableId
        ? {
            ...invoice,
            openOptions: !invoice.openOptions,
          }
        : {
            ...item,
            openOptions: false,
          },
    );

    this.setState({
      invoices: {
        ...invoices,
        content: formattedInvoice,
      },
    });
  };

  handlePeriodChange = retorno => {
    const { startDate, endDate } = retorno;
    let dateLabel = "";
    let initialDate = null;
    let finalDate = null;

    if (startDate && endDate) {
      dateLabel = "period";
      initialDate = this.formatDate(startDate);
      finalDate = this.formatDate(endDate);
    } else {
      dateLabel = retorno;

      switch (retorno) {
        case "Hoje":
          finalDate = DateManager();
          break;
        case "1 Dia":
          finalDate = DateManager().add(1, "days");
          break;
        case "2 Dias":
          finalDate = DateManager().add(2, "days");
          break;
        case "3 Dias":
          finalDate = DateManager().add(3, "days");
          break;
        default:
          finalDate = null;
      }
    }

    if (dateLabel !== "period" && dateLabel !== "Todas") {
      const today = DateManager();
      initialDate = today.toISOString().slice(0, 10);
      finalDate = finalDate.toISOString().slice(0, 10);
    }

    this.setState({
      initialDate,
      finalDate,
    });

    this.fetchData(null, null, dateLabel, initialDate, finalDate);
  };

  formatDate = date =>
    date
      .split("-")
      .reverse()
      .join("-");

  render() {
    const { filterBy, invoices, isLoading, page } = this.state;

    return (
      <MyPayments
        invoices={invoices}
        isLoading={isLoading}
        itemsPerPage={itemsPerPage}
        onChangePage={this.handleChangePage}
        page={page}
        EmptyComponent={this.getEmptyComponent}
        filterBy={filterBy}
        fieldsToFilterBy={fieldsToFilterBy}
        fieldsToFilterByDate={dropdownDateFinances}
        handleInputFilterValueChange={this.handleInputFilterValueChange}
        handleSelectedInputFilterChange={this.handleSelectedInputFilterChange}
        handlePeriodChange={this.handlePeriodChange}
        handleChangeDropdownVisibility={this.handleChangeDropdownVisibility}
        getStatusDescription={this.getStatusDescription}
        getPaymentDescription={this.getPaymentDescription}
        triggerRef={this.triggerRef}
      />
    );
  }
}

MyPaymentsContainer.propTypes = {
  selectedGroup: shape({
    id: number,
    name: string,
  }),
  userData: shape({
    id: string,
  }),
  selectedCompany: shape({
    id: number,
    cnpj: string,
    name: string,
  }),
};

MyPaymentsContainer.defaultProps = {
  selectedGroup: {},
  userData: {},
  selectedCompany: {},
};

export const mapStateToProps = ({
  selectedCompanyTree: { selectedGroup, selectedCompany },
  user: {
    profile: { data: userData },
  },
}) => ({
  userData,
  selectedGroup,
  selectedCompany,
});

export default connect(mapStateToProps, null)(withRouter(MyPaymentsContainer));
