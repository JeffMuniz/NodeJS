import React from "react";
import {
  func,
  arrayOf,
  shape,
  bool,
  number,
  string,
  node,
  oneOfType,
} from "prop-types";

import { productTypes, requestStatus } from "@enums";
import { Tabs } from "@common";
import { ContainerWrapper } from "@base";
import { If } from "@utils";

import EmployeeNotFound from "./EmployeeDataSection/EmployeeNotFound";
import StatementSection from "./StatementSection";
import EmployeeDataSection from "./EmployeeDataSection";
import VouchersSectionV2 from "./VouchersSectionV2";

import { CardTabs, Description } from "./EmployeeStatement.styles";

const EmployeeStatement = ({
  handleReturn,
  actionButtons,
  handlePeriodChange,
  handleOnTabChange,
  availableAccounts,
  statement,
  isEmployeesRegistryEmpty,
  employeeRegistry,
  employeeCPF,
  vouchers,
  updateVouchers,
  changeVoucherStatus,
  chosenAccount,
  statusText,
  loading,
}) => {
  const Component = VouchersSectionV2;

  return (
    <ContainerWrapper
      title="Painel do Funcionário"
      showBackIcon
      actionButtons={actionButtons}
      headerClickHandler={handleReturn}
      loading={loading}
    >
      <If test={isEmployeesRegistryEmpty}>
        <EmployeeNotFound cpf={employeeCPF} />
      </If>
      <If test={!isEmployeesRegistryEmpty}>
        <EmployeeDataSection
          employee={employeeRegistry}
          statusText={statusText}
        />
        <Component
          vouchers={vouchers}
          updateVouchers={updateVouchers}
          changeVoucherStatus={changeVoucherStatus}
          employeeRegistry={employeeRegistry}
        />
        <If
          test={availableAccounts && availableAccounts.length && chosenAccount}
        >
          <CardTabs>
            <Tabs
              onClick={handleOnTabChange}
              renderDynamically
              blockOtherTabs={statement.requestStatus === requestStatus.loading}
            >
              {availableAccounts.map(({ productId, idAccount }) => (
                <div
                  id={`es-product-tab-${productId}`}
                  key={idAccount}
                  label={productTypes[productId]}
                  idaccount={idAccount}
                >
                  <Description>
                    Créditos e estornos dos últimos 180 dias:
                  </Description>
                  <StatementSection
                    onPeriodChange={handlePeriodChange}
                    data={statement.data.content}
                  />
                </div>
              ))}
            </Tabs>
          </CardTabs>
        </If>
      </If>
    </ContainerWrapper>
  );
};

EmployeeStatement.propTypes = {
  employeeCPF: string,
  handleReturn: func.isRequired,
  handlePeriodChange: func.isRequired,
  handleOnTabChange: func.isRequired,
  isEmployeesRegistryEmpty: bool.isRequired,
  loading: bool.isRequired,
  updateVouchers: func.isRequired,
  changeVoucherStatus: func.isRequired,
  actionButtons: arrayOf(
    shape({
      value: string,
      imgSrc: node,
      handleClick: func,
      id: string,
    }),
  ).isRequired,
  availableAccounts: arrayOf(shape()),
  statement: shape({
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
  }),
  employeeRegistry: shape({
    id: string,
    name: string,
    CPF: string,
    registry: string,
    deliveryLocation: string,
    status: string,
  }),
  chosenAccount: shape({
    idAccount: oneOfType([number, string]),
    productId: oneOfType([number, string]),
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
  statusText: string,
};

EmployeeStatement.defaultProps = {
  employeeCPF: "",
  employeeRegistry: {},
  availableAccounts: [],
  vouchers: [],
  chosenAccount: null,
  statement: {
    isFirstPage: true,
    isLastPage: true,
    totalItems: 0,
    totalPages: 0,
    content: [],
  },
  statusText: "",
};

export default EmployeeStatement;
