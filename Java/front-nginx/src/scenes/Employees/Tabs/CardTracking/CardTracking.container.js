import React, { Component } from "react";
import { connect } from "react-redux";
import { shape, func, arrayOf, number, string } from "prop-types";
import isEmpty from "lodash/isEmpty";

import {
  getEmployees,
  resetEmployeesAction,
} from "src/redux/modules/employee/actions/employee";
import * as cardActions from "src/redux/modules/card/actions/cardActions";

import { toCPFMaskOnFly, toOnlyNumbers } from "@utils";
import { requestStatus } from "@enums";

import CardTracking from "./CardTracking";

const getSuggestionValue = suggestion => suggestion.cpf;

export class CardTrackingContainer extends Component {
  state = {
    value: "",
    orderBy: "ASC",
    currentPage: 0,
    error: null,
    employeeSelected: null,
  };

  async componentDidMount() {
    const { resetEmployeesList, resetCardsList } = this.props;

    await resetEmployeesList();
    await resetCardsList();
  }

  onChange = async (event, { newValue }) => {
    await this.setState({
      value: toCPFMaskOnFly(toOnlyNumbers(newValue)),
    });
  };

  onSuggestionsFetchRequested = async ({ value }) => {
    const minSearchLength = 3;
    const maxSearchLength = 11;
    const search = toOnlyNumbers(value);
    const {
      selectedCompany: { id: companyId },
    } = this.props;

    if (
      !companyId ||
      search.length < minSearchLength ||
      search.length > maxSearchLength
    ) {
      const { resetEmployeesList, employeeList } = this.props;

      if (employeeList.content && employeeList.content.length) {
        await resetEmployeesList();
      }
      return;
    }

    await this.getSuggestions(search);
  };

  onSuggestionsClearRequested = () => {};

  onSuggestionSelected = async (event, { suggestionValue: employeeCPF }) => {
    const {
      getTrackingEventList,
      selectedCompany: { cnpj },
    } = this.props;
    await getTrackingEventList({ cpf: employeeCPF, cnpj });

    const inputElement = document.getElementsByClassName(
      "react-autosuggest__input",
    );
    if (inputElement.length) {
      inputElement[0].blur();
    }

    this.setState({ employeeSelected: employeeCPF });
  };

  getSuggestions = async value => {
    this.setState({ error: null });

    const { orderBy, currentPage: page } = this.state;
    const {
      getEmployeesList,
      selectedCompany: { id: companyId },
    } = this.props;
    const cpf = value.trim().toLowerCase();

    await getEmployeesList({ cpf, page, orderBy, companyId });

    const { employeeList } = this.props;

    if (isEmpty(employeeList)) {
      this.setState({ error: "CPF não encontrado na base de funcionários" });
    }
  };

  render() {
    const { value, error, employeeSelected } = this.state;
    const {
      employeeList,
      tracking: {
        content: vouchers,
        error: cardsError,
        requestStatus: cardsRequestStatus,
      },
    } = this.props;

    const inputProps = {
      value,
      onChange: this.onChange,
    };

    return (
      <CardTracking
        suggestions={employeeList.content}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        onSuggestionSelected={this.onSuggestionSelected}
        inputProps={inputProps}
        error={error || (cardsError && cardsError.message)}
        vouchers={vouchers}
        cardsNotFound={
          vouchers &&
          !vouchers.length &&
          employeeSelected &&
          cardsRequestStatus === requestStatus.success
        }
        cardsRequestStatus={cardsRequestStatus}
        employeeSelected={employeeSelected}
      />
    );
  }
}

export const mapStateToProps = ({
  employee,
  card: { tracking },
  selectedCompanyTree,
}) => ({
  tracking: {
    content: tracking.data,
    requestStatus: tracking.requestStatus,
    error: tracking.error,
  },
  selectedCompany: selectedCompanyTree.selectedCompany,
  employeeList: employee.employees.data,
});

export const mapDispatchToProps = {
  getEmployeesList: getEmployees,
  getTrackingEventList: cardActions.getCardsTracking,
  resetEmployeesList: resetEmployeesAction,
  resetCardsList: cardActions.resetTracking,
};

CardTrackingContainer.propTypes = {
  tracking: shape({
    content: arrayOf(shape()),
    requestStatus: string,
    error: shape({
      message: string,
    }),
  }),
  employeeList: shape({
    content: arrayOf(shape()),
    totalItems: number,
  }),
  selectedCompany: shape({ id: number }),
  getEmployeesList: func,
  getTrackingEventList: func,
  resetEmployeesList: func,
  resetCardsList: func,
};

CardTrackingContainer.defaultProps = {
  tracking: {
    content: [],
    requestStatus: null,
    error: {
      message: null,
    },
  },
  employeeList: {},
  selectedCompany: {},
  getEmployeesList: () => null,
  getTrackingEventList: () => null,
  resetEmployeesList: () => null,
  resetCardsList: () => null,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardTrackingContainer);
