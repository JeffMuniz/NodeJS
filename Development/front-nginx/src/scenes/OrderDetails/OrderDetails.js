import React, { Fragment } from "react";
import { arrayOf, bool, func, number, shape, string } from "prop-types";
import ReactTooltip from "react-tooltip";

import { Pagination, ContainerWrapper, LoadingWrapper } from "@base";

import { OrderCardDetails, FilterSearchableInput } from "@common";

import { enableCreditAnticipation } from "@utils/featureFlag";

import BranchesOrders from "./BranchesOrders/BranchesOrders";
import ConfirmModalCreditAnticipation from "./ConfirmModalCreditAnticipation";

import { Button, ButtonContainer } from "./OrderDetails.styles";

const getFilterOptions = showCostCenter => {
  const cnpj = { key: "cnpj", description: "CNPJ", mask: "cnpj" };
  const centroCusto = { key: "centroCusto", description: "Centro de custo" };

  return showCostCenter ? [cnpj, centroCusto] : [cnpj];
};

const OrderDetails = ({
  orderData: {
    data: { content: order },
  },
  invoiceOrder,
  orderDetailsData: { data: detailsData },
  actualPage,
  itemsPerPage,
  headerClickHandler,
  handleCompanyIdUpdate,
  handleChangePage,
  selectedGroup,
  navigator,
  handleOrderDetailsByCompanyPress,
  fetchOrders,
  closeCreditAnticipationModal,
  openCreditAnticipationModal,
  showCreditAnticipationModal,
  handleClickOnChargeCancel,
  orderHeaderDetail,
  anticipationFeedbackMessage,
  canCreditAnticipation,
  textAnticipationButton,
  handleInputFilter,
  startLoadingChargeList,
  loadingChargeList,
  loading,
}) => (
  <Fragment>
    <ContainerWrapper
      showBackIcon
      loading={loading}
      title="Detalhamento do pedido"
      headerClickHandler={headerClickHandler}
      handleCompanyIdUpdate={handleCompanyIdUpdate}
      selectedGroup={selectedGroup}
    >
      {enableCreditAnticipation() && (
        <ButtonContainer>
          {!canCreditAnticipation && (
            <ReactTooltip id="tooltip-anticipation">
              <span>{anticipationFeedbackMessage}</span>
            </ReactTooltip>
          )}
          <div data-tip data-for="tooltip-anticipation">
            <Button
              id="button_anticipation"
              onPress={openCreditAnticipationModal}
              value={textAnticipationButton}
              buttonType="actionButton"
              disabled={!canCreditAnticipation}
            />
          </div>
        </ButtonContainer>
      )}
      <div>
        <OrderCardDetails
          opened
          invoice={invoiceOrder}
          order={order}
          orderHeaderDetail={orderHeaderDetail}
          navigator={navigator}
          fetchOrders={fetchOrders}
          data={detailsData.content}
        />
        <FilterSearchableInput
          marginRight="17px"
          onInputWithoutDebounce={startLoadingChargeList}
          dropdownFilterOptions={getFilterOptions(
            orderHeaderDetail.showCostCenter,
          )}
          onInput={handleInputFilter}
        />
        <LoadingWrapper loading={loadingChargeList} paddingTop="100px">
          <Pagination
            actualPage={actualPage}
            itemsPerPage={itemsPerPage}
            data={detailsData}
            callback={handleChangePage}
            render={() => (
              <BranchesOrders
                showCostCenter={orderHeaderDetail.showCostCenter}
                data={detailsData.content}
                handleClickOnChargeCancel={handleClickOnChargeCancel}
                handleOrderDetailsByCompanyPress={
                  handleOrderDetailsByCompanyPress
                }
              />
            )}
          />
        </LoadingWrapper>
        {showCreditAnticipationModal && (
          <ConfirmModalCreditAnticipation
            onClose={closeCreditAnticipationModal}
          />
        )}
      </div>
    </ContainerWrapper>
  </Fragment>
);

OrderDetails.propTypes = {
  actualPage: number,
  itemsPerPage: number,
  headerClickHandler: func,
  handleCompanyIdUpdate: func,
  handleChangePage: func,
  selectedGroup: shape({
    id: number,
    name: string,
  }).isRequired,
  orderData: shape({
    id: string,
    branchId: string,
    cnpj: string,
    amount: string,
    status: string,
    paymentStatus: string,
    employeesTotal: string,
  }),
  orderDetailsData: shape({
    totalItems: number,
    content: arrayOf(
      shape({
        orderId: string,
        branchId: string,
        cnpj: string,
        amount: string,
        status: string,
        totalEmployee: string,
        chargeId: string,
        costCenter: string,
      }),
    ),
    requestStatus: string,
  }),
  handleOrderDetailsByCompanyPress: func.isRequired,
  fetchOrders: func,
  handleClickOnChargeCancel: func.isRequired,
  orderHeaderDetail: shape({
    numberNewCards: number,
    numberOfEmployeesWithCredit: number,
    macAlimentacao: string,
    macRefeicao: string,
    macnai: string,
    amountmacefit: string,
    amount: string,
    requirer: string,
    employeesTotal: number,
    discount: string,
    rebate: string,
    showRebate: bool,
    taxes: string,
    hasTaxes: bool,
  }).isRequired,
  data: arrayOf(shape({})),
  invoiceOrder: {},
  closeCreditAnticipationModal: func.isRequired,
  openCreditAnticipationModal: func.isRequired,
  showCreditAnticipationModal: bool.isRequired,
  anticipationFeedbackMessage: string.isRequired,
  canCreditAnticipation: bool.isRequired,
  textAnticipationButton: string,
  handleInputFilter: func.isRequired,
  startLoadingChargeList: func.isRequired,
  loadingChargeList: bool.isRequired,
  loading: bool.isRequired,
};

OrderDetails.defaultProps = {
  actualPage: 1,
  itemsPerPage: 10,
  orderData: {},
  orderDetailsData: {
    data: [],
    totalItems: 0,
    requestStatus: "",
  },
  handleCompanyIdUpdate: () => undefined,
  headerClickHandler: () => undefined,
  handleChangePage: () => undefined,
  fetchOrders: () => [],
  data: [],
  invoiceOrder: {},
  textAnticipationButton: "antecipar crédito",
};

export default OrderDetails;
