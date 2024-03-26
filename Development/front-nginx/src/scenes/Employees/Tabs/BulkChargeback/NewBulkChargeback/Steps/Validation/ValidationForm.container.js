import React, { PureComponent } from "react";
import { shape, func } from "prop-types";
import { connect } from "react-redux";
import { get, orderBy } from "lodash";

import FormWrapper from "src/modules/Form/Form";
import * as employeeActions from "src/redux/modules/employee/actions/employee";
import * as voucherActions from "src/redux/modules/voucher/actions/voucherActions";
import { employeeSearchRequest } from "src/redux/modules/chargeBack/action/ChargeBackSelected";

import ValidationForm from "./ValidationForm";

export class FormContainer extends PureComponent {
  componentDidMount() {
    const { chargeBackReason } = this.props;
    chargeBackReason();
  }

  componentDidUpdate = prevProps => {
    const {
      selectedCompany: { id: companyId },
      goBackDetails,
    } = this.props;
    const {
      selectedCompany: { id: prevCompanyId },
    } = prevProps;

    companyId !== prevCompanyId && goBackDetails();
  };

  onClickSubmitHandler = ({ cpfs }) => {
    const { goForward, setChargebacksInfo } = this.props;

    setChargebacksInfo(orderBy([...cpfs], ["isValid", true]));

    goForward();
  };

  render() {
    const {
      chargeback: { data },
      goBack,
    } = this.props;

    return (
      <FormWrapper
        initialValues={{ cpfs: data }}
        onSubmit={this.onClickSubmitHandler}
        enableReinitialize
      >
        {props => <ValidationForm {...props} {...this.props} goBack={goBack} />}
      </FormWrapper>
    );
  }
}

const mapStateToProps = ({
  employee: { chargeback },
  selectedCompanyTree: { selectedCompany },
  voucher: { reason },
}) => ({ chargeback, selectedCompany, reasonInfo: get(reason, "payload", {}) });

const mapDispatchToProps = {
  setChargebacksInfo: employeeActions.setChargebacksInfo,
  chargeBackReason: voucherActions.chargeBackReason,
  employeeSearch: employeeSearchRequest,
};

FormContainer.propTypes = {
  goBack: func.isRequired,
  goForward: func.isRequired,
  chargeback: shape({}).isRequired,
  chargeBackReason: func.isRequired,
  reasonInfo: shape({}).isRequired,
  goBackDetails: func.isRequired,
  selectedCompany: shape({}).isRequired,
  setChargebacksInfo: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
