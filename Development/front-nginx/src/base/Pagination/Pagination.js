import React, { Component } from "react";
import { arrayOf, shape, number, func, bool, oneOf, node } from "prop-types";

import Animation from "src/modules/Animation/Animation";

import { requestStatus } from "@enums";
import { If } from "@utils";

import * as animationData from "src/base/WithPagination/animation.json";
import DefaultEmptyState from "./DefaultEmptyState/DefaultEmptyState";
import GridPaginationLabel from "./PaginationLabel/PaginationLabel";

import { Content, StateWrapper, Loading } from "./Pagination.styles";

const pageActionType = {
  forward: "forward",
  backward: "backward",
};

const CRESCENT_ORDER = "ASC";

const statuses = Object.values(requestStatus);

export class Pagination extends Component {
  constructor(props) {
    super(props);

    const { currentPage } = this.props;

    let page;

    if (currentPage && currentPage > 1) {
      page = currentPage;
    } else {
      page = 1;
    }

    this.initialState = {
      currentPage: page,
      orderBy: CRESCENT_ORDER,
      animationStarted: false,
      isSearchingData: false,
    };
    this.state = this.initialState;
  }

  componentDidUpdate = prevProps => {
    const {
      showLoading,
      selectedCompany: { id: companyId },
    } = this.props;
    const {
      selectedCompany: { id: prevCompanyId },
    } = prevProps;
    const { animationStarted } = this.state;

    if (showLoading && this.showLoadingState() && !animationStarted) {
      Animation.loadAnimation({
        container: this.animationRef,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData,
      });

      this.onChangeState("animationStarted", true);
    }

    if (prevCompanyId !== companyId) {
      this.onChangeState("initialState", this.initialState);
    }
  };

  onChangeState = (name, value) => {
    this.setState({ [name]: value });
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

  canGoBack = () => {
    const { currentPage } = this.state;

    return currentPage > 1;
  };

  canGoForward = () => {
    const {
      data: { totalItems = 0 },
      itemsPerPage,
    } = this.props;
    const { currentPage } = this.state;

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return currentPage < totalPages;
  };

  goBackward = () => () => {
    if (!this.canGoBack()) {
      return;
    }
    this.handleChangePage(pageActionType.backward);
  };

  goForward = () => () => {
    if (!this.canGoForward()) {
      return;
    }
    this.handleChangePage(pageActionType.forward);
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

  handleCallCallback = () => () => {
    const { callback, itemsPerPage } = this.props;
    const { currentPage, orderBy } = this.state;

    callback({
      page: currentPage,
      size: itemsPerPage,
      orderBy,
    });
  };

  showEmptyState = () => {
    const {
      status,
      isLoading,
      data: { totalItems = 0 },
    } = this.props;

    return status !== requestStatus.loading && !isLoading && !totalItems;
  };

  showLoadingState = () => {
    const { status, isLoading } = this.props;

    return status === requestStatus.loading || isLoading;
  };

  render() {
    const {
      showTopLabel,
      render,
      data: { totalItems = 0 },
      status,
      emptyStateComponent,
      itemsPerPage,
      isDashed,
    } = this.props;

    const { currentPage, isSearchingData } = this.state;

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

    return (
      <Content isDashed={isDashed}>
        <StateWrapper status={!totalItems}>
          <If test={this.showEmptyState()}>
            <EmptyState />
          </If>
          <Loading
            id="animation"
            innerRef={ref => {
              this.animationRef = ref;
            }}
            status={this.showLoadingState()}
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

Pagination.propTypes = {
  data: arrayOf(
    shape({
      totalItems: number,
    }),
  ),
  callback: func,
  itemsPerPage: number.isRequired,
  showTopLabel: bool,
  render: func.isRequired,
  status: oneOf(statuses),
  showLoading: bool,
  selectedCompany: shape({ id: number }),
  emptyStateComponent: node,
  isDashed: bool,
  currentPage: number.isRequired,
  isLoading: bool,
};

Pagination.defaultProps = {
  callback: () => null,
  showTopLabel: false,
  isDashed: false,
  data: {},
  status: "success",
  showLoading: false,
  selectedCompany: { id: 0 },
  emptyStateComponent: undefined,
  isLoading: false,
};

export default Pagination;
