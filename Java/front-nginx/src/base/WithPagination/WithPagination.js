import React, { Component } from "react";
import { arrayOf, shape, number, func, bool, oneOf } from "prop-types";
import isEmpty from "lodash/isEmpty";

import Animation from "src/modules/Animation/Animation";

import { SearchableInput } from "@base";
import { DropdownFilter } from "@common";

import { If } from "@utils";
import { requestStatus } from "@enums";
import ChargeBackComponent from "src/scenes/Employees/Tabs/BulkChargeback/ChargeBackComponent";

import DefaultEmptyState from "./DefaultEmptyState";
import GridPaginationLabel from "./PaginationLabel";
import {
  Content,
  StateWrapper,
  Loading,
  OrderAndSearchWrapper,
  SimpleInput,
  IconWrapper,
  Icon,
} from "./WithPagination.styles";
import * as animationData from "./animation.json";

const pageActionType = {
  forward: "forward",
  backward: "backward",
};

const CRESCENT_ORDER = "ASC";
const DECRESCENT_ORDER = "DESC";

const statuses = Object.values(requestStatus);

export class WithPagination extends Component {
  constructor(props) {
    super(props);

    const {
      fieldsToFilterBy,
      currentPage,
      fieldsToFilterByReason,
      fieldsToFilterByStatus,
      fieldsToFilterByDate,
    } = this.props;

    let page;
    if (currentPage && currentPage > 1) {
      page = currentPage;
    } else {
      page = 1;
    }

    this.initialState = {
      currentPage: page,
      filterBy: Array.isArray(fieldsToFilterBy) ? fieldsToFilterBy[0] : {},
      filterByReason: Array.isArray(fieldsToFilterByReason)
        ? fieldsToFilterByReason[0]
        : {},
      filterByStatus: Array.isArray(fieldsToFilterByStatus)
        ? fieldsToFilterByStatus[0]
        : {},
      filterByDate: Array.isArray(fieldsToFilterByDate)
        ? fieldsToFilterByDate[0]
        : {},
      orderBy: CRESCENT_ORDER,
      animationStarted: false,
      simpleInputValue: "",
      isSearchingData: false,
      genericFilter: {},
    };
    this.state = this.initialState;
  }

  componentDidUpdate = prevProps => {
    const {
      status,
      showLoading,
      selectedCompany: { id: companyId },
    } = this.props;
    const {
      selectedCompany: { id: prevCompanyId },
    } = prevProps;
    const { animationStarted } = this.state;

    if (showLoading && status === requestStatus.loading && !animationStarted) {
      Animation.loadAnimation({
        container: this.animationRef,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData,
      });
      this.setState({ animationStarted: true }); //eslint-disable-line
    }

    if (prevCompanyId !== companyId) {
      this.setState(this.initialState); //eslint-disable-line
    }
  };

  getFirstItemNumber = () => {
    const {
      data: { totalItems = 0 },
      itemsPerPage,
    } = this.props;
    const { currentPage } = this.state;

    const firstItemNumber = currentPage * itemsPerPage - itemsPerPage + 1;

    return totalItems ? firstItemNumber : totalItems;
  };

  getLastItemNumber = () => {
    const { currentPage } = this.state;
    const {
      data: { totalItems = 0 },
      itemsPerPage,
    } = this.props;

    const maxCurrentPage = currentPage * itemsPerPage;
    return maxCurrentPage > totalItems ? totalItems : maxCurrentPage;
  };

  canGoBack = () => this.state.currentPage > 1; //eslint-disable-line

  canGoForward = () => {
    const {
      data: { totalItems = 0 },
      itemsPerPage,
    } = this.props;
    const { currentPage } = this.state;

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return currentPage < totalPages;
  };

  goForward = () => () => {
    if (!this.canGoForward()) {
      return;
    }
    this.handleChangePage(pageActionType.forward);
  };

  goBackward = () => () => {
    if (!this.canGoBack()) {
      return;
    }
    this.handleChangePage(pageActionType.backward);
  };

  handleChangePage = type => {
    const { currentPage } = this.state;

    const selectedPage =
      type === pageActionType.forward ? currentPage + 1 : currentPage - 1;

    this.setState(
      {
        currentPage: selectedPage,
      },
      this.handleCallCallback(),
    );
  };

  handleFilterByChanges = filterBy => this.setState({ filterBy });

  handleFilterByReason = filterByReason => this.setState({ filterByReason });

  handleFilterByStatus = filterByStatus => this.setState({ filterByStatus });

  handleFilterByDate = filterByDate => this.setState({ filterByDate });

  handleCallCallback = value => () => {
    const { callback, itemsPerPage } = this.props;
    const { currentPage, filterBy, orderBy, genericFilter } = this.state;

    callback({
      page: currentPage - 1,
      size: itemsPerPage,
      [filterBy.key]: value || filterBy.value,
      [genericFilter.label]: genericFilter.key,
      orderBy,
    });
  };

  handleChange = value => {
    this.setState(
      state => ({
        currentPage: 1,
        filterBy: {
          ...state.filterBy,
          value,
        },
        isSearchingData: !!value,
      }),
      this.handleCallCallback(value),
    );
  };

  handleChangeReason = value => {
    this.setState(
      state => ({
        filterByReason: {
          ...state.filterByReason,
          value,
        },
        isSearchingData: !!value,
      }),
      this.handleCallCallback(value),
    );
  };

  handleChangeStatus = value => {
    this.setState(
      state => ({
        filterByStatus: {
          ...state.filterByStatus,
          value,
        },
        isSearchingData: !!value,
      }),
      this.handleCallCallback(value),
    );
  };

  handleChangeDropdownGeneric = value => {
    const { callback, itemsPerPage } = this.props;
    const { orderBy, filterBy } = this.state;

    const currentPage = 1;

    const args = {
      page: currentPage - 1,
      size: itemsPerPage,
      [value.label]: value.key,
      [filterBy.key]: filterBy.value,
      orderBy,
    };

    this.setState({
      currentPage,
      genericFilter: value,
    });

    callback(args);
  };

  handleSimpleInputChange = ({ target: { value: simpleInputValue } }) => {
    this.setState(
      { simpleInputValue, currentPage: 1, isSearchingData: !!simpleInputValue },
      this.handleCallCallback(simpleInputValue),
    );
  };

  handleChangeOrder = () => {
    this.setState(
      state => ({
        orderBy:
          state.orderBy === CRESCENT_ORDER ? DECRESCENT_ORDER : CRESCENT_ORDER,
      }),
      this.handleCallCallback(),
    );
  };

  hasOrderComponent = orderComponent => orderComponent() !== null;

  render() {
    const {
      showTopLabel,
      render,
      data: { totalItems = 0 },
      showSearchInput,
      showChargeBackComponent,
      showSimpleInput,
      showFilterDropdownGeneric,
      fieldsToFilterBy,
      fieldsToFilterByReason,
      fieldsToFilterByStatus,
      fieldsToFilterDropdownGeneric,
      fieldsToFilterByDate,
      orderComponent,
      status,
      emptyStateComponent,
      itemsPerPage,
      isDashed,
      onClickNewChargeback,
    } = this.props;

    const {
      filterBy,
      filterByReason,
      filterByStatus,
      filterByDate,
      currentPage,
      orderBy,
      simpleInputValue,
      isSearchingData,
    } = this.state;

    const lastItemNumber = this.getLastItemNumber();
    const firstItemNumber = this.getFirstItemNumber();

    const PaginationLabel = (
      <GridPaginationLabel
        {...this.props}
        currentPage={currentPage}
        goForward={this.goForward}
        goBackward={this.goBackward}
        canGoBack={this.canGoBack()}
        canGoForward={this.canGoForward()}
        lastItemNumber={lastItemNumber}
        firstItemNumber={firstItemNumber}
        totalItems={totalItems}
      />
    );

    const EmptyState = isSearchingData
      ? DefaultEmptyState
      : emptyStateComponent || DefaultEmptyState;

    const simpleInputPlaceHolder =
      (!isEmpty(fieldsToFilterBy) &&
        fieldsToFilterBy[0] &&
        fieldsToFilterBy[0].description) ||
      "";

    return (
      <Content isDashed={isDashed}>
        <If
          test={
            this.hasOrderComponent(orderComponent) ||
            showChargeBackComponent ||
            showFilterDropdownGeneric ||
            showSearchInput ||
            (showSimpleInput &&
              (!isEmpty(fieldsToFilterBy) ||
                !isEmpty(fieldsToFilterByReason) ||
                !isEmpty(fieldsToFilterByStatus) ||
                !isEmpty(fieldsToFilterByDate) ||
                !isEmpty(fieldsToFilterDropdownGeneric)))
          }
        >
          <OrderAndSearchWrapper>
            {orderComponent({
              onChange: this.handleChangeOrder,
              selectedOption: orderBy,
            })}
            <If test={showChargeBackComponent}>
              <ChargeBackComponent
                id="with_pagination_chageback_filter"
                fieldsToFilterByReason={fieldsToFilterByReason}
                fieldsToFilterByStatus={fieldsToFilterByStatus}
                fieldsToFilterByDate={fieldsToFilterByDate}
                onChangeReason={this.handleChangeReason}
                onChangeStatus={this.handleChangeStatus}
                onFilterChangeReason={this.handleFilterByReason}
                onFilterChangeStatus={this.handleFilterByStatus}
                onFilterChangeDate={this.handleFilterByDate}
                onClickNewChargeback={onClickNewChargeback}
                filterByReason={filterByReason}
                filterByStatus={filterByStatus}
                filterByDate={filterByDate}
              />
            </If>
            <If test={showFilterDropdownGeneric}>
              <DropdownFilter
                id="generic_dropdown_filter"
                options={fieldsToFilterDropdownGeneric || []}
                callback={this.handleChangeDropdownGeneric}
              />
            </If>
            <If test={showSearchInput}>
              <SearchableInput
                id="searchable_input_id"
                fieldsToFilterBy={fieldsToFilterBy || []}
                onChange={this.handleChange}
                onFilterChange={this.handleFilterByChanges}
                filterBy={filterBy}
              />
            </If>
            <If test={showSimpleInput && !isEmpty(fieldsToFilterBy)}>
              <SimpleInput
                id="with_pagination_simple_input"
                onChange={this.handleSimpleInputChange}
                placeholder={simpleInputPlaceHolder}
                value={simpleInputValue}
              />
              <IconWrapper>
                <Icon name="search" />
              </IconWrapper>
            </If>
          </OrderAndSearchWrapper>
        </If>
        <StateWrapper status={!totalItems}>
          <If test={status !== requestStatus.loading && !totalItems}>
            <EmptyState />
          </If>
          <Loading
            id="animation"
            innerRef={ref => {
              this.animationRef = ref;
            }}
            status={status === requestStatus.loading}
          />
        </StateWrapper>
        <If test={totalItems && status === requestStatus.success}>
          {showTopLabel && PaginationLabel}
          <If
            test={
              (status === requestStatus.success ||
                status === requestStatus.error) &&
              totalItems > 0
            }
          >
            {render({ currentPage, itemsPerPage })}
          </If>
          {PaginationLabel}
        </If>
      </Content>
    );
  }
}

WithPagination.propTypes = {
  onClickNewChargeback: func,
  fieldsToFilterBy: arrayOf(shape({})),
  fieldsToFilterByReason: arrayOf(shape({})),
  fieldsToFilterByStatus: arrayOf(shape({})),
  fieldsToFilterDropdownGeneric: arrayOf(shape({})),
  fieldsToFilterByDate: arrayOf(shape({})),
  data: shape({
    totalItems: number,
  }),
  filterBy: shape({}),
  callback: func,
  itemsPerPage: number.isRequired,
  showTopLabel: bool,
  render: func.isRequired,
  showSearchInput: bool,
  showSimpleInput: bool,
  showChargeBackComponent: bool,
  showFilterDropdownGeneric: bool,
  orderComponent: func,
  status: oneOf(statuses),
  showLoading: bool,
  selectedCompany: shape({ id: number }),
  emptyStateComponent: func,
  isDashed: bool,
  currentPage: number.isRequired,
};

WithPagination.defaultProps = {
  onClickNewChargeback: () => null,
  fieldsToFilterBy: null,
  fieldsToFilterByReason: null,
  fieldsToFilterByStatus: null,
  fieldsToFilterDropdownGeneric: null,
  fieldsToFilterByDate: null,
  filterBy: {},
  callback: () => null,
  showTopLabel: false,
  showSearchInput: false,
  showSimpleInput: false,
  showChargeBackComponent: false,
  showFilterDropdownGeneric: false,
  isDashed: false,
  orderComponent: () => null,
  data: {},
  status: "success",
  showLoading: false,
  selectedCompany: { id: 0 },
  emptyStateComponent: undefined,
};

export default WithPagination;
