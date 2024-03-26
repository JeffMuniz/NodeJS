import React, { Component, Fragment } from "react";
import { bool, func, number, shape, string } from "prop-types";
import { connect } from "react-redux";
import isNil from "lodash/isNil";
import get from "lodash/get";

import { Routes, WebPaths } from "src/routes/consts";
import navigate from "src/routes/navigate";
import * as orderActions from "src/redux/modules/order/actions";
import * as notificationsActions from "src/redux/modules/notification/actions/notifications";
import * as warningActions from "src/redux/modules/heroWarning/actions/heroWarning";
import * as deliveryPlacesActions from "src/redux/modules/deliveryPlaces/actions";
import * as companyTreeActions from "src/redux/modules/selectedCompanyTree/actions/selectedCompanyTree";
import * as modalActions from "src/redux/modules/modal/actions/modal";
import {
  getVirtualAccountCompanyBalance,
  getVirtualAccountGroupBalance,
} from "src/redux/modules/chargeBack/action/virtualAccount";

import {
  buttonTypes,
  deliveryTypes,
  notificationsTypes,
  paymentTypes,
  warningTypes,
  orderStatusFilter,
} from "@enums";
import {
  Dropdown,
  LimitChart,
  PeriodDropDown,
  RowOrder,
  VirtualAccount,
} from "@common";
import { ContainerWrapper, Loading, Pagination, SearchableInput } from "@base";
import { whiteWarningIcon } from "@assets";
import { If } from "@utils";

import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";
import DateManager from "src/modules/DateManager/DateManager";

import OrdersDashboard from "./OrdersDashboard";
import EmptyDashboard from "./EmptyDashboard";

import {
  ContainerFilter,
  ContainerDropdownFilter,
  LoadingWrapper,
  SelectWrapper,
  PeriodLabel,
} from "./OrdersDashboard.styles";

const fieldsToFilterByDate = {
  all: "Todas",
  today: "Hoje",
  yesterday: "Ontem",
  sevenDays: "7 Dias",
};

const fieldsToFilterBy = [
  {
    key: "orderId",
    description: "ID do pedido",
    optionDescription: "ID do pedido",
  },
];

const AGUARDANDO_CONFIRMACAO = "AGUARDANDO_CONFIRMACAO";

export class OrdersDashboardContainer extends Component {
  constructor(props) {
    super();

    const {
      location: { state },
    } = props;

    const filterByAllStatus =
      !isNil(state) && state.filterByAllStatus
        ? state.filterByAllStatus
        : false;

    const filterStatusDescription = filterByAllStatus
      ? "Todos"
      : "Aguardando Confirmação";

    const defaultFilterStatus = orderStatusFilter.find(
      item => item.description === filterStatusDescription,
    );

    this.state = {
      page: 1,
      disableNewOrder: false,
      defaultFilterStatus,
      fieldsToFilterByStatus: orderStatusFilter,
      filterBy: Array.isArray(fieldsToFilterBy) ? fieldsToFilterBy[0] : {},
      searchFilterValue: "",
      initialDate: null,
      finalDate: null,
      ordersData: {},
      orderStatus: defaultFilterStatus.api,
      loading: false,
      generalLoading: false,
      toastHistory: [],
    };
  }

  componentDidMount() {
    const { hideWarning } = this.props;
    hideWarning();

    this.fetchData();
    this.getLimit();
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedGroup } = this.props;
    const { ordersData } = this.state;
    const orders = get(ordersData, "content", []);
    const enableReactiveState = get(ordersData, "enableReactiveState");
    const prevOrders = get(prevState, "ordersData.content", []);
    const prevEnableReactiveState = get(
      prevState,
      "ordersData.enableReactiveState",
    );

    this.updateLimit(prevOrders, orders);

    if (prevEnableReactiveState !== enableReactiveState) {
      clearInterval(this.reactiveListener);

      if (enableReactiveState) {
        this.addReactiveListerner();
      }
    }

    if (
      prevProps.selectedGroup &&
      prevProps.selectedGroup.id !== selectedGroup.id
    ) {
      this.fetchData();
    }
  }

  componentWillUnmount() {
    const { hideWarning } = this.props;
    hideWarning();

    clearInterval(this.reactiveListener);
  }

  onChangePage = ({ page }) => this.setState({ page }, this.fetchDataFiltered);

  getLimit = async () => {
    // @TODO: remove function
    const {
      getOrdersLimit,
      userId,
      selectedGroup: { id: idGroup },
    } = this.props;

    if (idGroup) {
      await getOrdersLimit({ idGroup, userId });
    }
  };

  TIME_TO_REFRESH_STATE = 10000;

  addReactiveListerner = () => {
    this.reactiveListener = setInterval(
      this.reactiveCallback.bind(this),
      this.TIME_TO_REFRESH_STATE,
    );
  };

  reactiveCallback() {
    const { loading } = this.state;

    if (!loading) {
      this.fetchDataFiltered({ withLoading: false });
    }
  }

  updateLimit(prevOrders = [], orders = []) {
    if (prevOrders.length > 0 && orders.length > 0) {
      const ordersWithDifferentStatus = prevOrders
        .filter(order => order.status !== AGUARDANDO_CONFIRMACAO)
        .map(order => order.id);

      const ordersWaitingConfirmation = orders
        .filter(order => order.status === AGUARDANDO_CONFIRMACAO)
        .map(order => order.id);

      const shouldUpdateLimit = ordersWaitingConfirmation.some(order =>
        ordersWithDifferentStatus.includes(order),
      );

      if (shouldUpdateLimit) {
        this.getLimit();
        this.handleStatusToast();
      }
    }
  }

  fetchData = async () => {
    const {
      getOrders,
      userData: { id: userId },
      selectedGroup: { id: groupId },
      location: { state: { filterByAllStatus } = {} },
    } = this.props;

    if (!groupId) return;

    let ordersData = {};
    const page = 1;

    this.setState({ loading: true });

    try {
      // Primeira vez q abre a tela:
      //  - Se vier da tela de importação de pedido após importar com sucesso, pesquisa todos os status;
      //  - Caso contrário:
      //      - Pesquisa por Aguardando Confirmação;
      //      - Se retornar vazio, realiza a pesquisa novamente com o status "Todos"
      ordersData = await getOrders({
        userId,
        companyGroupId: groupId,
        orderStatus: filterByAllStatus ? "" : AGUARDANDO_CONFIRMACAO,
        page,
      });

      if (!filterByAllStatus) {
        const { totalItems } = ordersData || { totalItems: 0 };

        if (totalItems === 0) {
          const defaultFilterStatus = orderStatusFilter.find(
            item => item.description === "Todos",
          );

          this.setState({
            defaultFilterStatus,
            orderStatus: defaultFilterStatus.api,
          });

          ordersData = await getOrders({
            userId,
            companyGroupId: groupId,
            orderStatus: "",
            page,
          });
        }
      }
    } finally {
      this.setState({ loading: false });
    }

    this.setState({ page, ordersData });

    await this.checkForNotifications();

    this.handleStatusToast();
  };

  fetchDataFiltered = async ({
    withLoading = true,
    withVirtualBalanceUpdating = false,
  } = {}) => {
    const {
      getOrders,
      userData: { id: userId },
      selectedGroup: { id: groupId },
    } = this.props;
    const {
      searchFilterValue,
      orderStatus,
      initialDate,
      finalDate,
      page,
    } = this.state;

    if (!groupId) return;

    withVirtualBalanceUpdating && this.updateVirtualBalance();

    withLoading && this.setState({ loading: true });

    try {
      const ordersData = await getOrders({
        userId,
        companyGroupId: groupId,
        orderId: searchFilterValue,
        orderStatus,
        initialDate,
        finalDate,
        page,
      });

      this.setState({ ordersData });
    } catch (err) {
      this.setState({ ordersData: {} });
    } finally {
      this.setState({ loading: false });
    }
  };

  goToFinancePage = () => {
    const {
      history: { push },
    } = this.props;

    push(WebPaths[Routes.FINANCES]);
  };

  checkForBoletoAndDisplayWarning = async () => {
    const { showWarning, getNotifications } = this.props;

    try {
      const { status } = await getNotifications({
        notificationType: notificationsTypes.FINANCEIRO_BOLETO,
      });

      if (status === 200) {
        showWarning({
          hasCloseBtn: true,
          title: "Boletos",
          type: warningTypes.ATTENTION_ALERT_BRIGHT_YELLOW,
          button: {
            onClick: this.goToFinancePage,
            value: "VER BOLETOS",
            buttonType: buttonTypes.warning,
          },
          children: (
            <span>
              O(s) boleto(s) estão disponíveis no menu financeiro, clique no
              botão ao lado para visualizá-los.
            </span>
          ),
        });
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  checkForNotifications = () => {
    const {
      selectedGroup: {
        params: { paymentType },
      },
    } = this.props;

    switch (paymentType) {
      case paymentTypes.T:
        return this.checkForTedIssuesAndDisplayWarning();
      case paymentTypes.B:
        return this.checkForBoletoAndDisplayWarning();
      default:
        return null;
    }
  };

  checkForTedIssuesAndDisplayWarning = async () => {
    try {
      const { checkForTEDsIssue, showWarning } = this.props;

      const {
        name,
        cnpj,
        bank,
        branch,
        account,
        orderNumber,
        hideWarning,
      } = await checkForTEDsIssue();

      if (orderNumber !== null && orderNumber !== "") {
        showWarning({
          children: (
            <p>
              Realize o pagamento do pedido <b>{orderNumber}</b> para{" "}
              <b>{name}</b>, CNPJ <b>{cnpj}</b>, <b>{bank}</b>, agência{" "}
              <b>{branch}</b>, <b>conta corrente {account}</b> e envie o
              comprovante junto ao CNPJ e o número do pedido para o e-mail{" "}
              <b>
                <u>contasareceber@macvisacard.com.br</u>
              </b>{" "}
              com o <b>título de email: Comprovante TED nº XXXX</b>.
            </p>
          ),
        });
      } else {
        hideWarning();
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  };

  goTo = (route, checkForLimit) => {
    const { navigator, history } = this.props;
    const nav = navigator || history;

    navigate(nav, { route, data: { checkForLimit } });
  };

  goToPageNewOrder = () => {
    const {
      selectedGroup: {
        ordersLimit: { checkForLimit },
      },
    } = this.props;
    this.goTo(Routes.NEW_ORDER, checkForLimit);
  };

  goToNewDeliveryPlace = () => {
    this.setState({ generalLoading: true });

    this.goTo(Routes.DELIVERY_PLACES);
  };

  handleNewOrderForFirstAccess = async () => {
    const { getDeliveryPlaceNotifications, showWarning } = this.props;

    this.setState({ disableNewOrder: false, generalLoading: true });

    const { thereIsActiveDP } = await getDeliveryPlaceNotifications();

    if (!thereIsActiveDP) {
      this.setState(
        {
          disableNewOrder: true,
        },
        () =>
          showWarning({
            children: (
              <p>
                <b>
                  Você deve cadastrar ao menos 1 Local de Entrega antes de fazer
                  o primeiro pedido. Será o endereço de entrega dos cartões. :)
                </b>
              </p>
            ),
            icon: whiteWarningIcon,
            button: {
              onClick: this.goToNewDeliveryPlace,
              value: "cadastrar local de entrega",
              action:
                "Clicou em 'cadastrar local de entrega' na página 'Pedidos'",
            },
          }),
      );
      return;
    }

    this.goToPageNewOrder();
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
          initialDate = DateManager();
          break;
        case "Ontem":
          initialDate = DateManager().subtract(1, "days");
          finalDate = DateManager().subtract(1, "days");
          break;
        case "7 Dias":
          initialDate = DateManager().subtract(7, "days");
          break;
        default:
          initialDate = null;
      }
    }

    if (dateLabel !== "period" && dateLabel !== "Todas") {
      const today = DateManager();
      initialDate = initialDate.toISOString().slice(0, 10);
      finalDate = today.toISOString().slice(0, 10);
    }

    this.setState(
      {
        initialDate,
        finalDate,
        page: 1,
      },
      this.fetchDataFiltered,
    );
  };

  formatDate = date =>
    date
      .split("-")
      .reverse()
      .join("-");

  handleSelectedInputFilterChange = filterBy => {
    this.setState({ filterBy, searchFilterValue: "" });
  };

  handleInputFilterValueChange = value => {
    this.setState(
      { searchFilterValue: value, page: 1 },
      this.fetchDataFiltered,
    );
  };

  handleChangeDropdownFilterStatus = value => {
    this.setState(
      { [value.label]: value.api, page: 1 },
      this.fetchDataFiltered,
    );
  };

  handleActionsButtons = () => {
    const {
      selectedGroup: {
        params: { deliveryType },
        ordersLimit: { checkForLimit },
      },
    } = this.props;

    if (deliveryType === deliveryTypes.HR) {
      const { disableNewOrder } = this.state;

      return [
        {
          value: "cadastrar local de entrega",
          imgSrc: "add",
          imgWidth: 16,
          type: "actionButton",
          id: "add_button_dp",
          handleClick: this.goToNewDeliveryPlace,
          action: "Clicou em 'Cadastrar local de entrega'",
        },
        {
          value: "novo pedido",
          imgSrc: "add",
          imgWidth: 16,
          type: "actionButton",
          id: "add_button_order",
          handleClick: this.handleNewOrderForFirstAccess,
          disabled: disableNewOrder,
          action: "Clicou em 'Novo Pedido'",
        },
      ];
    }

    return [
      {
        value: "novo pedido",
        imgSrc: "add",
        imgWidth: 16,
        id: "add_button_order",
        type: "actionButton",
        handleClick: () => this.goToPageNewOrder(checkForLimit),
        action: "Clicou em 'Novo Pedido'",
      },
    ];
  };

  updateVirtualBalance() {
    const { getGroupBalance, getCompanyBalance, selectedCompany } = this.props;

    if (selectedCompany.id) {
      getGroupBalance(selectedCompany.id);
      getCompanyBalance(selectedCompany.id);
    }
  }

  handleStatusToast() {
    const { showToast } = this.props;
    const { toastHistory, ordersData } = this.state;

    const ordersNotification = [];

    if (ordersData.content) {
      ordersData.content
        .filter(order => !toastHistory.includes(order.id))
        .forEach(order => {
          if (order.status === AGUARDANDO_CONFIRMACAO) {
            ordersNotification.push(order.id);
          }
        });

      if (ordersNotification.length > 0) {
        const labelDescription =
          ordersNotification.length === 1
            ? `O pedido ${ordersNotification[0]} está aguardando a sua confirmação.`
            : `O pedido ${ordersNotification[0]} e outros estão aguardando a sua confirmação.`;

        showToast({
          id: `order_new_status_notification`,
          label: labelDescription,
        });

        this.setState({
          toastHistory: [...toastHistory, ...ordersNotification],
        });
      }
    }
  }

  renderEmptyState = () => {
    const {
      selectedGroup: {
        params: { deliveryType },
      },
      thereIsActiveDP,
    } = this.props;
    return (
      <EmptyDashboard
        thereIsActiveDP={thereIsActiveDP}
        goToPageNewOrder={this.goToPageNewOrder}
        goToNewDeliveryPlace={this.goToNewDeliveryPlace}
        deliveryType={deliveryType}
      />
    );
  };

  render() {
    const {
      defaultFilterStatus,
      filterBy,
      fieldsToFilterByStatus,
      loading,
      ordersData,
      page,
      generalLoading,
    } = this.state;
    const {
      selectedCompany,
      selectedGroup,
      selectedGroup: {
        ordersLimit: { checkForLimit },
      },
      navigator,
      history,
    } = this.props;
    const propsNavigator = navigator || history;

    return (
      <Fragment>
        <ContainerWrapper
          loading={generalLoading}
          title="Histórico de pedidos"
          actionButtons={this.handleActionsButtons()}
          selectedGroup={selectedGroup}
          handleCompanyIdUpdate={this.fetchData}
          extraComponent={
            <RowOrder>
              <If test={checkForLimit}>
                <LimitChart />
              </If>
              <VirtualAccount title="Saldo da Conta Virtual" />
            </RowOrder>
          }
        >
          <ContainerFilter>
            <ContainerDropdownFilter>
              <SelectWrapper>
                <Dropdown
                  id="orders_dashboard_dropdown_filter"
                  callback={this.handleChangeDropdownFilterStatus}
                  containerWidth="315px"
                  optionsWidth="263px"
                  options={fieldsToFilterByStatus}
                  defaultFilter={defaultFilterStatus}
                />
              </SelectWrapper>
              <SelectWrapper>
                <PeriodLabel>Data de Criação: </PeriodLabel>
                <PeriodDropDown
                  id="orders_dashboard_period_date_select"
                  valueList={Object.values(fieldsToFilterByDate)}
                  onSelectValue={this.handlePeriodChange}
                  maxRange={{ period: "months", value: 1 }}
                  canEditPeriod
                  padding="0px 21px"
                  position={false}
                  editDateText="Selecionar período"
                />
              </SelectWrapper>
            </ContainerDropdownFilter>
            <div>
              <SearchableInput
                id="searchable_input_id"
                fieldsToFilterBy={fieldsToFilterBy}
                onChange={this.handleInputFilterValueChange}
                onFilterChange={this.handleSelectedInputFilterChange}
                filterBy={filterBy}
              />
            </div>
          </ContainerFilter>
          <If test={loading}>
            <LoadingWrapper>
              <Loading loading />
            </LoadingWrapper>
          </If>
          <If test={!loading}>
            <Pagination
              showLoading
              data={ordersData}
              selectedCompany={selectedCompany}
              callback={this.onChangePage}
              currentPage={page}
              itemsPerPage={10}
              emptyStateComponent={this.renderEmptyState}
              render={props => (
                <OrdersDashboard
                  navigator={propsNavigator}
                  data={ordersData.content}
                  fetchOrders={this.fetchDataFiltered}
                  page={page}
                  {...props}
                />
              )}
            />
          </If>
        </ContainerWrapper>
      </Fragment>
    );
  }
}

OrdersDashboardContainer.propTypes = {
  getOrders: func.isRequired,
  resetOrders: func.isRequired,
  cancelOrder: func.isRequired,
  setOrderToCancel: func.isRequired,
  resetCancelState: func.isRequired,
  unsetOrderToCancel: func.isRequired,
  userData: shape({
    id: string,
  }),
  match: shape({
    params: shape({
      employeeCPF: string,
    }),
  }).isRequired,
  selectedGroup: shape({
    id: number,
    name: string,
  }),
  selectedCompany: shape({
    id: number,
  }),
  showWarning: func.isRequired,
  hideWarning: func.isRequired,
  checkForTEDsIssue: func.isRequired,
  getDeliveryPlaceNotifications: func.isRequired,
  getNotifications: func.isRequired,
  thereIsActiveDP: bool,
  deliveryType: string,
  checkForLimit: bool.isRequired,
  getOrdersLimit: func.isRequired,
  userId: string.isRequired,
  location: shape({ state: shape({}) }),
  openModal: func.isRequired,
  closeModal: func.isRequired,
  showToast: func.isRequired,
  getGroupBalance: func.isRequired,
  getCompanyBalance: func.isRequired,
};

OrdersDashboardContainer.defaultProps = {
  userData: {},
  selectedGroup: {},
  selectedCompany: {},
  thereIsActiveDP: false,
  deliveryType: "",
  location: { state: {} },
};

export const mapStateToProps = ({
  user: {
    profile: { data: userData },
  },
  selectedCompanyTree,
  warning,
  deliveryPlaces: {
    deliveryPlacesSituation: { thereIsActiveDP },
  },
}) => ({
  userData,
  userId: userData && userData.id,
  selectedGroup: selectedCompanyTree.selectedGroup,
  selectedCompany: selectedCompanyTree.selectedCompany,
  warning,
  thereIsActiveDP,
});

export const mapDispatchToProps = {
  getOrders: orderActions.getOrders,
  checkForTEDsIssue: orderActions.checkForTEDsIssue,
  resetOrders: orderActions.resetOrders,
  cancelOrder: orderActions.cancelOrder,
  setOrderToCancel: orderActions.setOrderToCancel,
  resetCancelState: orderActions.resetCancelState,
  unsetOrderToCancel: orderActions.unsetOrderToCancel,
  showWarning: warningActions.showWarning,
  hideWarning: warningActions.hideWarning,
  getDeliveryPlaceNotifications: deliveryPlacesActions.getNotifications,
  getNotifications: notificationsActions.getNotifications,
  getOrdersLimit: companyTreeActions.getSelectedGroupOrdersLimit,
  openModal: modalActions.OpenModal,
  closeModal: modalActions.CloseModal,
  showToast: showToastAction,
  getGroupBalance: getVirtualAccountCompanyBalance,
  getCompanyBalance: getVirtualAccountGroupBalance,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrdersDashboardContainer);
