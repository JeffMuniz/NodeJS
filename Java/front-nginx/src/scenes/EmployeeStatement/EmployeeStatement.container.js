import React, { Component } from "react";
import { connect } from "react-redux";
import {
  shape,
  string,
  number,
  oneOfType,
  func,
  bool,
  arrayOf,
} from "prop-types";
import { isEmpty } from "lodash";

import { red } from "@colors";
import {
  requestStatus,
  periods,
  dateHourFormats,
  deliveryTypes,
  employeeStatus,
} from "@enums";

import DateManager from "src/modules/DateManager/DateManager";
import { getEmployeeHistory } from "src/api/employee/employee";
import * as voucherActions from "src/redux/modules/voucher/actions/voucherActions";
import * as employeeActions from "src/redux/modules/employee/actions/employee";
import * as modalActions from "src/redux/modules/modal/actions/modal";
import * as toastActions from "src/common/Toast/redux/actions/toast";
import { Routes, WebPaths } from "src/routes/consts";

import EmployeeStatement from "./EmployeeStatement";
import { EmployeeEditFormModal } from "./EmployeeEditFormModal";
import { EmployeeStatusModal } from "./EmployeeStatusModal";

const mapDates = {
  [periods[30]]: {
    startDate: DateManager().add(-29, "days"),
    endDate: DateManager(),
  },
  [periods[60]]: {
    startDate: DateManager().add(-59, "days"),
    endDate: DateManager(),
  },
  [periods[90]]: {
    startDate: DateManager().add(-89, "days"),
    endDate: DateManager(),
  },
};

export class EmployeeStatementContainer extends Component {
  state = {
    page: 0,
    startDate: "",
    endDate: "",
    loading: true,
    statusText: "",
  };

  componentDidMount() {
    const {
      match: {
        params: { employeeCPF },
      },
    } = this.props;

    if (!employeeCPF) {
      return this.handleReturn();
    }

    return this.fetchData();
  }

  componentDidUpdate(prevProps) {
    const {
      unblock,
      showToast,
      resetUnblock,
      employeeRegistry,
      selectedCompanyId,
    } = this.props;
    const { selectedCompanyId: selectedCompanyIdPrev } = prevProps;

    if (unblock.requestStatus === requestStatus.success) {
      this.updateVouchers();
      showToast({
        id: "unblock-success",
        label: "Cartão desbloqueado com sucesso!",
      });
      resetUnblock();
      return;
    }

    if (unblock.requestStatus === requestStatus.error) {
      showToast({
        id: "unblock-failed",
        label:
          "Falha ao tentar desbloquear cartão, tente novamente mais tarde!",
      });
      resetUnblock();
    }

    const idCompany = employeeRegistry
      ? parseInt(employeeRegistry.idCompany, 10)
      : null;
    const { loading } = this.state;

    if (
      selectedCompanyId !== 0 &&
      selectedCompanyId !== idCompany &&
      selectedCompanyId !== selectedCompanyIdPrev &&
      !loading
    ) {
      this.updateLoading();
      this.fetchData();
    }
  }

  onEditEmployeeClick = () => {
    const { openModal, employeeRegistry } = this.props;
    openModal({
      children: <EmployeeEditFormModal entity={employeeRegistry} />,
    });
  };

  getStatement = account => {
    const { chosenAccount, getEmployeeStatements } = this.props;
    const { page, startDate, endDate } = this.state;

    const { idAccount } = account || chosenAccount;

    getEmployeeStatements({ idAccount, startDate, endDate }, page);
  };

  getStatusButton = status => {
    if (status !== "ativo")
      return {
        value: "ativar esse funcionário",
        imgColor: red,
        handleClick: this.handleChangeEmployeeStatus,
        id: "button_ativar",
      };

    return {
      value: "inativar esse funcionário",
      imgColor: red,
      handleClick: this.handleChangeEmployeeStatus,
      id: "button_inativar",
    };
  };

  getStatusText = data =>
    `${data.acao === "ATIVAR" ? "Re" : "In"}ativado por motivo de ${
      data.motivo
    } em ${data.dataHora} por ${data.nomeOperador || "-"}`;

  updateLoading = () => {
    this.setState({
      page: 0,
      startDate: "",
      endDate: "",
      loading: true,
    });
  };

  fetchData = async () => {
    const {
      match: {
        params: { employeeCPF },
      },
      getEmployeeRegistry,
      getEmployeeVouchers,
      setAvailableAccounts,
      setChosenAccount,
      getEmployeeStatements,
      selectedCompanyId,
      showToast,
    } = this.props;
    let {
      location: {
        state: { status },
      },
    } = this.props;
    let employeeRegistry;

    if (!status) {
      status = "ativo";
    }

    try {
      employeeRegistry = await getEmployeeRegistry({
        cpf: employeeCPF,
        companyId: selectedCompanyId,
        employeeStatus: employeeStatus[status.toLowerCase()],
      });
    } catch (e) {
      return this.setState({ loading: false });
    }

    if (employeeRegistry) {
      const { accounts, cnpj } = employeeRegistry;
      const [account] = accounts;
      const promises = [
        getEmployeeVouchers(employeeCPF, cnpj),
        setAvailableAccounts(accounts),
        setChosenAccount(account),
        getEmployeeStatements(account),
      ];

      let formattedHistory = "";
      try {
        await Promise.all(promises);
        const employeeHistory = await getEmployeeHistory(employeeCPF);

        if (employeeHistory) {
          const {
            data: { historicos },
          } = employeeHistory;

          if (historicos.length > 0) {
            formattedHistory = this.getStatusText(historicos[0]);
          }
        }
      } catch (e) {
        showToast({
          id: "fetch-error",
          label: "Houve um erro ao capturar os dados do portador!",
        });
      } finally {
        this.setState({ loading: false, statusText: formattedHistory });
      }
    } else {
      this.setState({ loading: false });
    }
  };

  updateVouchers = async () => {
    const {
      match: {
        params: { employeeCPF },
      },
      getEmployeeVouchers,
      employeeRegistry: { cnpj },
    } = this.props;
    await getEmployeeVouchers(employeeCPF, cnpj);
  };

  changeVoucherStatus = async voucherId => {
    const { unblockVoucher } = this.props;
    await unblockVoucher({ id: voucherId });
  };

  handleReturn = () => {
    const {
      history: { push },
      location: { state },
    } = this.props;

    return push({ pathname: WebPaths[Routes.EMPLOYEES], state });
  };

  handleOnTabChange = ({ idaccount: selectedTabIdAccount }) => {
    const {
      chosenAccount: { idAccount },
      availableAccounts,
      setChosenAccount,
    } = this.props;

    if (idAccount === selectedTabIdAccount) return;

    const account = availableAccounts.find(
      acc => acc.idAccount === selectedTabIdAccount,
    );

    this.setState({ page: 0, startDate: "", endDate: "" }, () => {
      this.getStatement(account);
      setChosenAccount(account);
    });
  };

  handleOnPageChange = ({ page }) => {
    this.setState({ page }, this.getStatement);
  };

  handlePeriodChange = period => {
    const convertPeriod = ({ startDate, endDate }) => {
      const start = DateManager(startDate, dateHourFormats.longDate);
      const end = DateManager(endDate, dateHourFormats.longDate);

      return {
        startDate: start,
        endDate: end,
      };
    };

    const { startDate, endDate } =
      typeof period === "string"
        ? mapDates[period]
        : convertPeriod({ ...period });

    this.setState({ startDate, endDate, page: 0 }, this.getStatement);
  };

  handleChangeEmployeeStatus = () => {
    const { openModal, employeeRegistry } = this.props;

    openModal({
      children: <EmployeeStatusModal entity={employeeRegistry} />,
    });
  };

  render() {
    const {
      employeeRegistry,
      vouchers,
      statement,
      availableAccounts,
      chosenAccount,
      deliveryType,
      match: { params },
    } = this.props;

    const { loading, statusText } = this.state;

    const isEmployeesRegistryEmpty = isEmpty(employeeRegistry);
    const statusUserButton = !isEmployeesRegistryEmpty
      ? this.getStatusButton(employeeRegistry.status)
      : null;

    const actionButtons =
      deliveryType === deliveryTypes.HR
        ? []
        : [
            {
              value: "editar",
              imgSrc: "edit",
              imgHeight: 24,
              imgWidth: 24,
              imgColor: red,
              handleClick: this.onEditEmployeeClick,
              id: "editar",
              disabled: isEmployeesRegistryEmpty,
            },
          ];

    if (statusUserButton) actionButtons.push(statusUserButton);

    return (
      <EmployeeStatement
        isEmployeesRegistryEmpty={isEmployeesRegistryEmpty}
        employeeCPF={params.employeeCPF}
        handleReturn={this.handleReturn}
        actionButtons={actionButtons}
        handlePeriodChange={this.handlePeriodChange}
        handleOnTabChange={this.handleOnTabChange}
        employeeRegistry={employeeRegistry}
        statement={statement}
        vouchers={vouchers}
        updateVouchers={this.updateVouchers}
        handleOnPageChange={this.handleOnPageChange}
        changeVoucherStatus={this.changeVoucherStatus}
        availableAccounts={availableAccounts}
        chosenAccount={chosenAccount}
        loading={loading}
        statusText={statusText}
      />
    );
  }
}

EmployeeStatementContainer.propTypes = {
  match: shape({
    params: shape({
      employeeCPF: string,
    }),
  }).isRequired,
  employeeRegistry: shape({
    id: string,
    name: string,
    CPF: string,
    registry: string,
    deliveryLocation: string,
    status: string,
  }),
  statement: shape({
    data: {
      isFirstPage: bool,
      isLastPage: bool,
      totalItems: number,
      totalPages: number,
      content: arrayOf(
        shape({
          date: string,
          hour: string,
          branch: string,
          amount: string,
          storeName: string,
          trasnactionType: string,
        }),
      ),
    },
    requestStatus: string,
    error: oneOfType([shape, string]),
  }),
  vouchers: arrayOf(
    shape({
      id: string,
      idProduct: string,
      cardNumber: string,
      issueDate: string,
      printedName: string,
      lastIndex: bool,
    }),
  ),
  chosenAccount: shape({
    idAccount: oneOfType([number, string]),
    productId: oneOfType([number, string]),
  }),
  availableAccounts: arrayOf(shape()),
  getEmployeeStatements: func.isRequired,
  setChosenAccount: func.isRequired,
  showToast: func.isRequired,
  resetUnblock: func.isRequired,
  unblockVoucher: func.isRequired,
  unblock: shape({
    requestStatus: string,
    error: oneOfType([string, shape]),
  }),
  selectedCompanyId: number,
  getEmployeeRegistry: func.isRequired,
  getEmployeeVouchers: func.isRequired,
  setAvailableAccounts: func.isRequired,
  openModal: func.isRequired,
  deliveryType: string.isRequired,
  location: shape({
    state: shape({}),
  }),
};

EmployeeStatementContainer.defaultProps = {
  employeeRegistry: {},
  statement: {
    data: {},
    requestStatus: requestStatus.none,
    error: undefined,
  },
  vouchers: [],
  availableAccounts: [],
  chosenAccount: null,
  unblock: {},
  selectedCompanyId: 0,
  location: {
    state: {},
  },
};

export const mapStateToProps = ({
  employee,
  voucher: { unblock },
  selectedCompanyTree: {
    selectedCompany: { id: selectedCompanyId },
    selectedGroup: {
      params: { deliveryType },
    },
  },
}) => ({
  employeeRegistry: employee.registry,
  statement: employee.statement,
  vouchers: employee.vouchers,
  availableAccounts: employee.availableAccounts,
  chosenAccount: employee.chosenAccount,
  unblock,
  deliveryType,
  selectedCompanyId,
});

export const mapDispatchToProps = {
  getEmployeeStatements: employeeActions.getEmployeeStatements,
  getEmployeeRegistry: employeeActions.getEmployeeRegistry,
  getEmployeeVouchers: employeeActions.getEmployeeVouchers,
  setAvailableAccounts: employeeActions.setAvailableAccounts,
  setChosenAccount: employeeActions.setChosenAccount,
  openModal: modalActions.OpenModal,
  unblockVoucher: voucherActions.unblockVoucher,
  resetUnblock: voucherActions.unblockVoucherReset,
  showToast: toastActions.showToast,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeeStatementContainer);
