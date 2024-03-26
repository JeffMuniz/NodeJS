import React, { Component } from "react";
import { connect } from "react-redux";
import { func, oneOfType, array, object, shape } from "prop-types";
import { chargeBackStatus } from "@enums";
import { ChargeBackTOS } from "@common";
import { withRouter } from "react-router-dom";
import * as modalActions from "src/redux/modules/modal/actions/modal";
import * as employeeActions from "src/redux/modules/employee/actions/employee";
import {
  fetchChargeBackHeader,
  fetchChargeBackDetails,
} from "src/redux/modules/chargeBack/action/ChargeBackSelected";

import ChargeBackDetails from "./ChargeBackDetails";

export class ChargeBackDetailsContainer extends Component {
  state = { page: 0 };

  getColor = ({ status }) =>
    status && chargeBackStatus[status.toUpperCase()].color;

  handleTerm = () => {
    const { openModal } = this.props;

    return openModal({
      children: <ChargeBackTOS isView />,
    });
  };

  fetchData = () => {
    const { page } = this.state;
    const {
      getChargebackBody,
      chargebackDetails: {
        data: { chargebacks },
      },
    } = this.props;
    getChargebackBody({ page, params: chargebacks.id });
  };

  route = () => {
    const { goBackDetails } = this.props;
    goBackDetails();
  };

  handleChangePage = ({ page }) => this.setState({ page }, this.fetchData);

  render() {
    const { detailsHeader, chargebackBody } = this.props;

    return (
      <ChargeBackDetails
        detailsHeader={detailsHeader}
        getColor={this.getColor}
        getStatus={this.getStatus}
        handleTerm={this.handleTerm}
        onChangePage={this.handleChangePage}
        headerClickHandler={this.route}
        chargebackBody={chargebackBody}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({
  employee: { chargebackDetails, chargebackBody },
}) => ({
  detailsHeader: chargebackDetails.data.chargebacks,
  chargebackBody,
  chargebackDetails,
});

const mapDispatchToProps = {
  openModal: modalActions.OpenModal,
  fetchDetails: fetchChargeBackHeader,
  fetchDetailsBody: fetchChargeBackDetails,
  getChargebackBody: employeeActions.getChargebackBody,
};

ChargeBackDetailsContainer.propTypes = {
  openModal: func.isRequired,
  goBackDetails: func.isRequired,
  detailsHeader: oneOfType([array, object]).isRequired,
  getChargebackBody: func.isRequired,
  chargebackDetails: shape().isRequired,
  chargebackBody: shape().isRequired,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ChargeBackDetailsContainer),
);
