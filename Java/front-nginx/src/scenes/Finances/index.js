import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { TabsStatic } from "@common";
import { ContainerWrapper } from "@base";
import { Routes, WebPaths } from "src/routes/consts";

import { setSelectedTab as TabActions } from "src/redux/modules/tabs/actions/tabs";

import {
  IncomeReport,
  MyPayments,
  MyPaymentsUnified,
  InvoiceDetails,
  VirtualAccount,
} from "./Tabs";

const Finances = ({ history, location, isUnifiedInvoice, setSelectedTab }) => {
  const tabs = [
    { title: "Meus Pagamentos", path: WebPaths[Routes.FINANCES] },
    { title: "Informe de Rendimento", path: WebPaths[Routes.INCOME_REPORT] },
    { title: "Conta Virtual", path: WebPaths[Routes.VIRTUAL_ACCOUNT] },
  ];

  const findActiveTab = pathname => {
    const foundTab = tabs.find(tab => tab.path === pathname);

    const isMyPaymentsTab =
      pathname === "/financeiro" || pathname.includes("/meus-pagamentos");
    const selectedTabName = isMyPaymentsTab ? "Meus Pagamentos" : "";

    setSelectedTab(selectedTabName);

    return foundTab ? foundTab.title : tabs[0].title;
  };

  const onClickTabItem = clickedTab => {
    const filteredTab = tabs.find(tab => tab.title === clickedTab);

    history.push(filteredTab.path);
  };

  const handleGoBack = () => {
    history.push(WebPaths[Routes.FINANCES]);
  };

  const isInvoiceDetails = location.pathname.includes("/meus-pagamentos");

  return (
    <ContainerWrapper
      title="Financeiro"
      isBiggerTitle={!isInvoiceDetails}
      showBackIcon={isInvoiceDetails}
      headerClickHandler={handleGoBack}
      isInsideAnother={false}
    >
      <TabsStatic
        {...{ onClickTabItem }}
        tabs={tabs.map(tab => tab.title)}
        activeTab={findActiveTab(location.pathname)}
        marginLess
      />
      <Switch>
        <Route
          exact
          path={WebPaths[Routes.FINANCES]}
          component={isUnifiedInvoice ? MyPaymentsUnified : MyPayments}
        />
        <Route path={WebPaths[Routes.MY_PAYMENTS]} component={InvoiceDetails} />
        <Route path={WebPaths[Routes.INCOME_REPORT]} component={IncomeReport} />
        <Route
          path={WebPaths[Routes.VIRTUAL_ACCOUNT]}
          component={VirtualAccount}
        />
      </Switch>
    </ContainerWrapper>
  );
};

Finances.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  isUnifiedInvoice: PropTypes.bool,
  setSelectedTab: PropTypes.func,
  handleGoBack: PropTypes.func.isRequired,
};

Finances.defaultProps = {
  location: {
    pathname: "",
  },
  isUnifiedInvoice: "",
  setSelectedTab: () => null,
};

export const mapStateToProps = ({ selectedCompanyTree }) => ({
  isUnifiedInvoice: selectedCompanyTree.selectedGroup.params.isUnifiedInvoice,
});

const mapDispatchToProps = {
  setSelectedTab: TabActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Finances));
