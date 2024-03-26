import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { func, number, string, shape } from "prop-types";
import { difference, isEmpty, union } from "lodash";
import { createBrowserHistory } from "history";
import { Routes, WebPaths } from "src/routes/consts";

import * as employeeActions from "src/redux/modules/employee/actions/employee";
import { employeeSearchRequest } from "src/redux/modules/chargeBack/action/ChargeBackSelected";
import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";

import { OrganizeEmployee } from "src/api/dtos/employee.dto";
import { OrganizeCpf } from "src/api/dtos/chargeBack.dto";

import { Request, Review, Confirmation } from "./Steps";

const steps = {
  0: Request,
  1: Review,
  2: Confirmation,
};

const totalItems = Object.keys(steps).length;

export const history = createBrowserHistory({ forceRefresh: true });

class EmployeesStatus extends PureComponent {
  state = {
    current: 0,
    selectedStatusRequest: null,
    selectedReasonRequest: null,
    validCpfs: [],
    invalidCpfs: [],
  };

  onStatusRequestChange = selectedStatus => {
    this.setState({
      selectedStatusRequest: selectedStatus,
    });
  };

  onReasonRequestChange = selectedReason => {
    this.setState({
      selectedReasonRequest: selectedReason,
    });
  };

  onClickGoForwardHandler = hasErrors => {
    const { current } = this.state;

    if (current === totalItems - 1) {
      throw new Error(
        "The last step has been reached, handle the go forward button inside the component`s container",
      );
    }

    this.setState({ current: hasErrors ? 1 : 2 });
  };

  onClickGoBackHandler = () => {
    const { current } = this.state;
    if (current < 1) {
      throw new Error(
        "The first step has been reached, handle the go back button inside the component`s container",
      );
    }

    this.setState({ current: 0 });
  };

  async setPropsDto(values) {
    const { chargebackEmployee } = this.props;

    const data = await OrganizeEmployee(chargebackEmployee.payload, values);

    return data;
  }

  handleInvalidCpfs = cpfs => {
    this.setState({
      invalidCpfs: cpfs,
    });
  };

  handleValidCpfs = cpfs => {
    this.setState({
      validCpfs: cpfs,
    });
  };

  handleCheckCpfs = async (
    allValues,
    invalidCpfs,
    formatedValues,
    reason = "",
  ) => {
    const {
      idGroup,
      idCompany,
      idEmployee,
      employeeSearch,
      showToast,
    } = this.props;
    const { selectedStatusRequest } = this.state;

    let cpfApi = [];
    let data = [];

    if (reason) {
      this.onReasonRequestChange(reason);
    }

    if (!isEmpty(formatedValues.cpfs)) {
      try {
        await employeeSearch(
          idGroup,
          idCompany,
          idEmployee,
          formatedValues.cpfs,
        );

        data = await this.setPropsDto(formatedValues);
        cpfApi = await OrganizeCpf(data && data.map(el => el));
      } catch (error) {
        showToast({
          id: "error_toast_message_search_employee",
          label:
            "Ocorreu um erro ao realizar a validação dos CPFs. Por favor, tente novamente",
        });
      }
    }

    const differentCpfEntriesFromApi = difference(
      allValues,
      union(cpfApi, invalidCpfs),
    );

    const oppositeStatusEntriesFromApi = data.filter(
      el =>
        (selectedStatusRequest === "ativar" && el.status) ||
        (selectedStatusRequest === "inativar" && !el.status),
    );

    let validEntries = [];

    if (oppositeStatusEntriesFromApi.length > 0) {
      validEntries = data.filter(
        el => !oppositeStatusEntriesFromApi.some(value => el.id === value.id),
      );
    } else {
      validEntries = data;
    }

    let invalidEntries = [];
    let differentEntries = [];
    let oppositeStatusEntries = [];

    if (!isEmpty(invalidCpfs)) {
      invalidEntries = [...invalidCpfs].map(el => ({
        cpf: el,
        isValid: false,
      }));
    }

    differentEntries = [...differentCpfEntriesFromApi].map(el => ({
      cpf: el,
      isValid: false,
      isInvalidFromApi: true,
    }));

    oppositeStatusEntries = [...oppositeStatusEntriesFromApi].map(el => ({
      cpf: el.cpf,
      isValid: false,
      isInvalidStatus: true,
    }));

    return {
      validEntries,
      invalidEntries,
      differentEntries,
      oppositeStatusEntries,
    };
  };

  goBackEmployeesList = () =>
    history.push({
      pathname: WebPaths[Routes.EMPLOYEES],
      state: { page: 0, status: "Ativo" },
    });

  render() {
    const {
      current,
      selectedStatusRequest,
      selectedReasonRequest,
      invalidCpfs,
      validCpfs,
    } = this.state;
    const Component = steps[current];

    return (
      <Component
        handleCheckCpfs={this.handleCheckCpfs}
        handleInvalidCpfs={this.handleInvalidCpfs}
        handleValidCpfs={this.handleValidCpfs}
        invalidCpfs={invalidCpfs}
        validCpfs={validCpfs}
        goForward={this.onClickGoForwardHandler}
        goBack={this.onClickGoBackHandler}
        goBackDetails={this.goBackEmployeesList}
        onStatusRequestChange={this.onStatusRequestChange}
        selectedStatusRequest={selectedStatusRequest}
        selectedReasonRequest={selectedReasonRequest}
      />
    );
  }
}

EmployeesStatus.propTypes = {
  chargebackEmployee: shape({}).isRequired,
  employeeSearch: func.isRequired,
  idGroup: number.isRequired,
  idCompany: number.isRequired,
  idEmployee: string.isRequired,
  showToast: func,
};

EmployeesStatus.defaultProps = {
  showToast: () => null,
};

export const mapStateToProps = ({
  selectedCompanyTree: {
    selectedGroup: { id: idGroup },
    selectedCompany: { id: idCompany },
  },
  user: {
    profile: {
      data: { id: idEmployee },
    },
  },
  chargeBack: { chargebackEmployee },
}) => ({
  idGroup,
  idCompany,
  idEmployee,
  chargebackEmployee,
});

const mapDispatchToProps = {
  employeeSearch: employeeSearchRequest,
  setChargebacksInfo: employeeActions.setChargebacksInfo,
  showToast: showToastAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesStatus);
