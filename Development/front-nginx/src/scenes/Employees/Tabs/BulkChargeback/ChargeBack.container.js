import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { func, shape } from "prop-types";
import { connect } from "react-redux";
import { get } from "lodash";

import { WithPagination, ContainerWrapper } from "@base";
import { chargeBackStatus } from "@enums";
import { blue } from "@colors";
import * as employeeActions from "src/redux/modules/employee/actions/employee";
import * as voucherActions from "src/redux/modules/voucher/actions/voucherActions";

import ChargeBack from "./ChargeBack";
import EmptyState from "./EmptyState";

class ChargeBackContainer extends Component {
  componentDidMount() {
    const { chargeBackReason, chargeBackGetStatus } = this.props;

    chargeBackReason();
    chargeBackGetStatus();
  }
  getColor = item => chargeBackStatus[item.status.toUpperCase()].color;

  getData = ({ page, size }) => {
    const {
      selectedCompany,
      getChargebacks,
      chargebackString: { searchString },
    } = this.props;
    getChargebacks({ page, size, searchString, companyId: selectedCompany.id });
  };

  EmptyComponent = () => <EmptyState {...this.props} />;

  fieldsToFilterByReason = [{ key: null, description: "Todos" }];

  fieldsToFilterByStatus = [{ key: null, description: "Todos" }];

  fieldsToFilterByDate = [
    { key: null, description: "Todas" },
    {
      key: 1,
      description: "Escolher data(s)",
      styled: { color: blue, "font-size": "14px" },
    },
  ];

  handleClick = ({ target }) => {
    const { goDetails, setChargebackDetails, getChargebackBody } = this.props;

    setChargebackDetails({ params: target.title });
    getChargebackBody({ params: target.title });

    goDetails();
  };

  render() {
    const {
      onClickNewChargeback,
      chargebacks,
      reasonInfo,
      chargebackStatus: { payload },
      selectedCompany,
    } = this.props;

    return (
      <ContainerWrapper
        isMediumTitle
        isInsideAnother
        title="Acompanhamento de Estorno"
      >
        <WithPagination
          fieldsToFilterByReason={
            reasonInfo.payload || this.fieldsToFilterByReason
          }
          fieldsToFilterByStatus={payload || this.fieldsToFilterByStatus}
          fieldsToFilterByDate={this.fieldsToFilterByDate}
          callback={this.getData}
          showChargeBackComponent
          data={chargebacks.data}
          itemsPerPage={10}
          onClickNewChargeback={onClickNewChargeback}
          emptyStateComponent={this.EmptyComponent}
          showLoading
          selectedCompany={selectedCompany}
          render={props => (
            <ChargeBack
              handleClick={this.handleClick}
              getColor={this.getColor}
              chargebacks={chargebacks}
              data={chargebacks.data.content}
              {...props}
            />
          )}
        />
      </ContainerWrapper>
    );
  }
}

ChargeBackContainer.propTypes = {
  getChargebacks: func.isRequired,
  chargebackString: shape().isRequired,
  selectedCompany: shape().isRequired,
  onClickNewChargeback: func.isRequired,
  goDetails: func.isRequired,
  setChargebackDetails: func.isRequired,
  getChargebackBody: func.isRequired,
  reasonInfo: shape({}).isRequired,
  chargeBackReason: func.isRequired,
  chargebacks: shape().isRequired,
  chargebackStatus: shape({}).isRequired,
  chargeBackGetStatus: func.isRequired,
};

export const mapStateToProps = ({
  voucher: { reason, status },
  selectedCompanyTree: { selectedCompany },
  employee: { chargebacks, chargebackString, chargebackBody },
}) => ({
  reasonInfo: get(reason, "payload", {}),
  chargebackString,
  selectedCompany,
  chargebacks,
  chargebackBody,
  chargebackStatus: status,
});

const mapDispatchToProps = {
  getChargebacks: employeeActions.getChargebacks,
  setChargebackDetails: employeeActions.setChargebackDetails,
  getChargebackBody: employeeActions.getChargebackBody,
  chargeBackReason: voucherActions.chargeBackReason,
  chargeBackGetStatus: voucherActions.chargeBackStatus,
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChargeBackContainer),
);
