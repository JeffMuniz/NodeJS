import React from "react";
import { isNil } from "lodash";
import { shape } from "prop-types";
import { Tabs } from "@common";
import { ContainerWrapper } from "@base";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// import EmployeesGroupAccess from "src/modules/EmployeesGroupAccess/EmployeesGroupAccess";

import {
  BaseOfEmployees,
  CardTracking,
  BulkChargeback,
  EmployeesStatus,
  BalanceTransfer,
} from "./Tabs";

const Finances = ({ location: { state }, selectedCompany }) => {
  const listIncludesCnpj = ["71632754000102", "30798783000161"];

  const tabs = [
    {
      id: "employee-base-tab",
      label: "Base de Funcionários",
      component: BaseOfEmployees,
    },
    {
      id: "employee-card-tracking-tab",
      label: "Tracking de Cartões",
      component: CardTracking,
    },
    {
      id: "employee-chargeback-tab",
      label: "Estorno",
      component: BulkChargeback,
    },
    {
      id: "employee-change-status-tab",
      label: "Ativar e Inativar",
      component: EmployeesStatus,
    },
    {
      id: "employee-balance-transfer",
      label: "Transferência de Saldo",
      component: BalanceTransfer,
      isHidden: !listIncludesCnpj.includes(selectedCompany.cnpj),
    },
  ];

  return (
    <ContainerWrapper title="Gerenciar Funcionários" isBiggerTitle>
      <Tabs
        activeTab={
          isNil(state) || !isNil(state.page)
            ? "Base de Funcionários"
            : state.route.toString()
        }
      >
        {tabs
          .filter(el => !el.isHidden)
          .map(({ id, label, component: Component }) => (
            <div id={id} label={label}>
              <Component />
            </div>
          ))}
      </Tabs>
    </ContainerWrapper>
  );
};

Finances.propTypes = {
  location: shape({}).isRequired,
  selectedCompany: shape({}).isRequired,
};

export const mapStateToProps = ({ selectedCompanyTree }) => ({
  selectedCompany: selectedCompanyTree.selectedCompany,
});

export default withRouter(connect(mapStateToProps)(Finances));
