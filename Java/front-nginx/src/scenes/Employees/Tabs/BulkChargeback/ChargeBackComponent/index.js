import React, { Component } from "react";
import { func, shape } from "prop-types";
import { connect } from "react-redux";
import { isNull } from "lodash";
import { dateHourFormats } from "@enums";

import * as EmployeesActions from "src/redux/modules/employee/actions/employee";
import DateManager from "src/modules/DateManager/DateManager";
import * as modalActions from "src/redux/modules/modal/actions/modal";
import DateModalContainer from "./DateModal.container";
import Filter from "./Filter";
import {
  CustomInputWrap,
  ActionButtonsWrapper,
  Button,
  FilterWrapper,
} from "./styles";

const ESC = 27;

const initialState = {
  showReasonInputOptions: false,
  showStatusInputOptions: false,
  showDateInputOptions: false,
  startDate: null,
  endDate: null,
  shouldGet: true,
  searchData: {},
};

class CustomInput extends Component {
  state = initialState;

  componentDidMount() {
    document.addEventListener("keydown", this.handleESCFunction, false);
    document.addEventListener("click", this.handleClickOutSideSelect, false);
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const {
      selectedCompany,
      onFilterChangeStatus,
      onFilterChangeReason,
      onFilterChangeDate,
    } = this.props;

    if (prevProps.selectedCompany !== selectedCompany) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(initialState, () => {
        onFilterChangeReason({ key: null, description: "Todos" });
        onFilterChangeStatus({ key: null, description: "Todos" });
        onFilterChangeDate({ key: null, description: "Todas" });
        this.fetchData();
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleESCFunction, false);
    document.removeEventListener("click", this.handleClickOutSideSelect, false);
  }

  onDateChange = ({ startDate, endDate }) => {
    const { searchData } = this.state;
    const { onFilterChangeDate } = this.props;

    const data = {
      ...searchData,
      startDate: this.formatDate(startDate, "long"),
      endDate: endDate ? this.formatDate(endDate, "long") : null,
    };

    const result = {
      key: "2",
      description: isNull(endDate)
        ? this.formatDate(startDate)
        : `${this.formatDate(startDate)} a ${this.formatDate(endDate)}`,
    };
    this.setState(
      {
        searchData: data,

        shouldGet: true,
        showReasonInputOptions: false,
        showStatusInputOptions: false,
        showDateInputOptions: false,
      },
      () => {
        onFilterChangeDate(result);
        this.fetchData(data);
      },
    );
  };

  onSubmit = () => {
    const { closeModal } = this.props;

    closeModal();
  };

  formatDate = (date, mode = null) => {
    if (mode === "long") {
      return DateManager(date).format(dateHourFormats.longDateUS);
    }
    return DateManager(date).format(dateHourFormats.longDateSlash);
  };

  fetchData = (data = {}) => {
    const { selectedCompany, getChargebacks } = this.props;
    const { shouldGet } = this.state;
    const { startDate, endDate, reason, status } = data;
    if (shouldGet) {
      this.setState({ shouldGet: false }, () =>
        getChargebacks({
          companyId: selectedCompany.id,
          startDate,
          endDate,
          reason,
          status,
        }),
      );
    }
  };

  handleESCFunction = event => {
    const {
      showReasonInputOptions,
      showStatusInputOptions,
      showDateInputOptions,
    } = this.state;
    if (event.keyCode === ESC && showReasonInputOptions) {
      this.handleReasonClick();
    } else if (event.keyCode === ESC && showStatusInputOptions) {
      this.handleStatusClick();
    } else if (event.keyCode === ESC && showDateInputOptions) {
      this.handleDateClick();
    }
  };

  handleClickOutSideSelect = event => {
    const { id } = event.target.parentNode;
    if (
      id &&
      id !== "reason-select_btn" &&
      id !== "status-select_btn" &&
      id !== "date-select_btn"
    ) {
      this.setState({
        showStatusInputOptions: false,
        showReasonInputOptions: false,
        showDateInputOptions: false,
      });
    }
  };

  handleStatusClick = () => {
    this.setState(({ showStatusInputOptions }) => ({
      showStatusInputOptions: !showStatusInputOptions,
      showReasonInputOptions: false,
      showDateInputOptions: false,
    }));
  };

  handleReasonClick = () => {
    this.setState(({ showReasonInputOptions }) => ({
      showReasonInputOptions: !showReasonInputOptions,
      showStatusInputOptions: false,
      showDateInputOptions: false,
    }));
  };

  handleDateClick = () => {
    this.setState(({ showDateInputOptions }) => ({
      showDateInputOptions: !showDateInputOptions,
      showStatusInputOptions: false,
      showReasonInputOptions: false,
    }));
  };

  handleReasonChange = filterBy => {
    const { searchData } = this.state;
    const { onFilterChangeReason } = this.props;
    const data = {
      ...searchData,
      reason: filterBy.key,
    };
    this.setState(
      {
        searchData: data,
        showReasonInputOptions: false,
        showStatusInputOptions: false,
        showDateInputOptions: false,
        shouldGet: true,
      },
      () => {
        onFilterChangeReason(filterBy);
        this.fetchData(data);
      },
    );
  };

  handleStatusChange = filterBy => {
    const { searchData } = this.state;
    const { onFilterChangeStatus } = this.props;
    const data = {
      ...searchData,
      status: filterBy.key,
    };
    this.setState(
      {
        searchData: data,
        showReasonInputOptions: false,
        showStatusInputOptions: false,
        showDateInputOptions: false,
        shouldGet: true,
      },
      () => {
        onFilterChangeStatus(filterBy);
        this.fetchData(data);
      },
    );
  };

  handleDateModal = () => {
    const { openModal } = this.props;
    this.setState({
      showReasonInputOptions: false,
      showStatusInputOptions: false,
    });
    openModal({
      children: (
        <DateModalContainer
          changeParentDate={this.onDateChange}
          onSubmit={this.onSubmit}
        />
      ),
    });
  };

  handleClick = () => {
    const { onClickNewChargeback } = this.props;
    onClickNewChargeback();
  };

  handleDateChange = filterBy => {
    const { searchData } = this.state;
    const { onFilterChangeDate } = this.props;

    let data = {};

    if (filterBy.key === 1) {
      this.handleDateModal();

      data = {
        ...searchData,
      };

      this.setState({
        searchData: data,
        showReasonInputOptions: false,
        showStatusInputOptions: false,
        showDateInputOptions: false,
        shouldGet: true,
      });
    } else {
      data = {
        ...searchData,
        date: filterBy.key,
        startDate: null,
        endDate: null,
      };

      this.setState(
        {
          searchData: data,
          showReasonInputOptions: false,
          showStatusInputOptions: false,
          showDateInputOptions: false,
          shouldGet: true,
        },
        () => {
          onFilterChangeDate(filterBy);
          this.fetchData(data);
        },
      );
    }
  };

  render() {
    const {
      showReasonInputOptions,
      showStatusInputOptions,
      showDateInputOptions,
    } = this.state;
    const {
      fieldsToFilterByReason,
      fieldsToFilterByStatus,
      fieldsToFilterByDate,
      filterByReason,
      filterByStatus,
      filterByDate,
    } = this.props;

    return (
      <CustomInputWrap>
        <FilterWrapper>
          <Filter
            handleClick={this.handleReasonClick}
            aria="reason-select-aria"
            id="reason-select"
            text="Motivo:&nbsp;"
            filterBy={filterByReason}
            showInputOptions={showReasonInputOptions}
            fieldsToFilterBy={fieldsToFilterByReason}
            handleFilterByChanges={this.handleReasonChange}
          />
          <Filter
            handleClick={this.handleStatusClick}
            aria="status-select-aria"
            id="status-select"
            text="Status:&nbsp;"
            filterBy={filterByStatus}
            showInputOptions={showStatusInputOptions}
            fieldsToFilterBy={fieldsToFilterByStatus}
            handleFilterByChanges={this.handleStatusChange}
          />
          <Filter
            handleClick={this.handleDateClick}
            aria="date-select-aria"
            id="date-select"
            text="Data:&nbsp;"
            filterBy={filterByDate}
            showInputOptions={showDateInputOptions}
            fieldsToFilterBy={fieldsToFilterByDate}
            handleFilterByChanges={this.handleDateChange}
          />
        </FilterWrapper>
        <ActionButtonsWrapper>
          <Button
            value="nova solicitação de estorno"
            imgSrc="add"
            imgHeight={16}
            imgWidth={16}
            onPress={this.handleClick}
            id="add_button_cashback"
            buttonType="actionButton"
          />
        </ActionButtonsWrapper>
      </CustomInputWrap>
    );
  }
}

const mapStateToProps = ({
  employee: { chargebacks },
  reports: { requestStatus },
  selectedCompanyTree: { selectedCompany },
}) => ({
  selectedCompany,
  requestStatus,
  chargebacks,
});

const mapDispatchToProps = {
  getChargebacks: EmployeesActions.getChargebacks,
  openModal: modalActions.OpenModal,
  closeModal: modalActions.CloseModal,
};

CustomInput.propTypes = {
  selectedCompany: shape().isRequired,
  getChargebacks: func.isRequired,
  openModal: func.isRequired,
  onClickNewChargeback: func.isRequired,
  closeModal: func.isRequired,
  fieldsToFilterByReason: shape().isRequired,
  fieldsToFilterByStatus: shape().isRequired,
  fieldsToFilterByDate: shape({}).isRequired,
  onFilterChangeReason: func,
  onFilterChangeStatus: func,
  onFilterChangeDate: func,
  filterByReason: shape(),
  filterByStatus: shape(),
  filterByDate: shape({}),
};

CustomInput.defaultProps = {
  onFilterChangeReason: () => null,
  onFilterChangeStatus: () => null,
  onFilterChangeDate: () => null,
  filterByReason: {},
  filterByStatus: {},
  filterByDate: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomInput);
