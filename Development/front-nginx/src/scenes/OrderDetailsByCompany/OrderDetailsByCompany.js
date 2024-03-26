import React from "react";
import ReactTooltip from "react-tooltip";
import isEmpty from "lodash/isEmpty";
import { func, shape, string, number, bool } from "prop-types";
import { ContainerWrapper } from "@base";
import { TabsStatic } from "@common";
import { If } from "@utils";
import { enableCreditAnticipation } from "@utils/featureFlag";

import DetailsHeader from "./DetailsHeader/DetailsHeader";
import ConfirmModalCreditAnticipation from "../OrderDetails/ConfirmModalCreditAnticipation";
import CreditsTab from "./Tabs/Credits";
import CardsTab from "./Tabs/Cards";

import {
  Button,
  ButtonContainer,
  TabContentWrapper,
} from "./OrderDetailsByCompany.styles";

const OrderDetailsByCompany = ({
  handleGoBack,
  orderDetail,
  loading,
  toggleDocs,
  toggleReports,
  invoice,
  handleChangeDropdownVisibility,
  handleChangeDropdownReportsVisibility,
  showTaxesSummaryModal,
  triggerRef,
  activeDetailTab,
  handleClickDetailTab,
  showCreditAnticipationModal,
  closeCreditAnticipationModal,
  openCreditAnticipationModal,
  anticipationFeedbackMessage,
  textAnticipationButton,
  canCreditAnticipation,
}) => (
  <ContainerWrapper
    title="Detalhamento do pedido por empresa"
    showBackIcon
    headerClickHandler={handleGoBack}
    loading={loading}
  >
    {enableCreditAnticipation() === null && (
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
    {showCreditAnticipationModal && (
      <ConfirmModalCreditAnticipation onClose={closeCreditAnticipationModal} />
    )}
    <If test={!isEmpty(orderDetail)}>
      <DetailsHeader
        orderDetail={orderDetail}
        toggleDocs={toggleDocs}
        toggleReports={toggleReports}
        invoice={invoice}
        handleChangeDropdownVisibility={handleChangeDropdownVisibility}
        handleChangeDropdownReportsVisibility={
          handleChangeDropdownReportsVisibility
        }
        showTaxesSummaryModal={showTaxesSummaryModal}
        triggerRef={triggerRef}
      />
    </If>
    <TabsStatic
      onClickTabItem={handleClickDetailTab}
      tabs={["Crédito", "Emissão de cartão"]}
      activeTab={activeDetailTab}
    />
    <TabContentWrapper>
      {activeDetailTab === "Crédito" ? <CreditsTab /> : <CardsTab />}
    </TabContentWrapper>
  </ContainerWrapper>
);

OrderDetailsByCompany.propTypes = {
  handleGoBack: func.isRequired,
  orderDetail: shape({
    orderId: number,
    employeesTotal: number,
    paymentStatus: string,
    status: string,
    cnpj: string,
    totalVR: string,
    totalVA: string,
    macefitAmount: string,
    rebate: string,
    amount: string,
    orderDate: string,
    creditDate: string,
    companyName: string,
    requirer: string,
    centralized: bool,
  }),
  loading: bool.isRequired,
  toggleDocs: bool,
  toggleReports: bool,
  invoice: shape({
    receivableId: number,
    orderId: number,
    cnpj: string,
    amount: string,
    dueDate: string,
    paymentType: string,
    receivableStatus: string,
    invoiceDate: string,
    showDocuments: bool,
  }),
  handleChangeDropdownVisibility: func.isRequired,
  handleChangeDropdownReportsVisibility: func.isRequired,
  showTaxesSummaryModal: func.isRequired,
  triggerRef: shape({}),
  closeCreditAnticipationModal: func.isRequired,
  openCreditAnticipationModal: func.isRequired,
  showCreditAnticipationModal: bool.isRequired,
  anticipationFeedbackMessage: string.isRequired,
  textAnticipationButton: string,
  canCreditAnticipation: bool.isRequired,
  activeDetailTab: string.isRequired,
  handleClickDetailTab: func.isRequired,
};

OrderDetailsByCompany.defaultProps = {
  orderDetail: {},
  toggleDocs: false,
  toggleReports: false,
  invoice: {},
  triggerRef: {},
  textAnticipationButton: "antecipar crédito",
};

export default OrderDetailsByCompany;
