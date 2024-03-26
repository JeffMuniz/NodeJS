import React, { Component } from "react";
import { connect } from "react-redux";
import { number, shape, func, string, bool } from "prop-types";
import * as companyTreeActions from "src/redux/modules/selectedCompanyTree/actions/selectedCompanyTree";
import View from "./LimitChart";

export class LimitChartContainer extends Component {
  state = {
    stateIdGroup: 0,
  };

  componentDidMount() {
    this.getLimit();
  }

  componentDidUpdate() {
    const { stateIdGroup } = this.state;
    const {
      selectedGroup: { id: idGroup },
    } = this.props;

    if (idGroup && idGroup !== stateIdGroup) this.getLimit();
  }

  getLimit = async () => {
    const {
      getOrdersLimit,
      userId,
      selectedGroup: { id: idGroup },
    } = this.props;

    this.setState({ stateIdGroup: idGroup }, async () => {
      if (idGroup) {
        await getOrdersLimit({ idGroup, userId });
      }
    });
  };

  render() {
    const {
      hasBorderTop,
      selectedGroup: {
        ordersLimit: {
          percentage,
          availableValue,
          usedLimit,
          totalLimit,
          checkForLimit,
        },
      },
    } = this.props;

    if (!checkForLimit) return null;

    return (
      <View
        hasBorderTop={hasBorderTop}
        percentage={percentage}
        availableValue={availableValue}
        usedLimit={usedLimit}
        totalLimit={totalLimit}
      />
    );
  }
}

export const mapStateToProps = ({
  selectedCompanyTree,
  user: {
    profile: { data: userData },
  },
}) => ({
  userId: userData && userData.id,
  selectedGroup: selectedCompanyTree.selectedGroup,
});

export const mapDispatchToProps = {
  getOrdersLimit: companyTreeActions.getSelectedGroupOrdersLimit,
};

LimitChartContainer.propTypes = {
  selectedGroup: shape({
    ordersLimit: shape({
      percentage: number.isRequired,
      availableValue: number.isRequired,
      usedLimit: number.isRequired,
      totalLimit: number.isRequired,
    }),
  }).isRequired,
  getOrdersLimit: func.isRequired,
  userId: string.isRequired,
  hasBorderTop: bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LimitChartContainer);
