import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bool, func, shape, string } from "prop-types";
import { whiteWarningIcon } from "@assets";
import { If } from "@utils";
import { warningTypes } from "@enums";
import * as warningActions from "src/redux/modules/heroWarning/actions/heroWarning";
import Warning from "./Warning";

export class WarningContainer extends PureComponent {
  onClickCloseBtnHandler = () => {
    const { hideWarning } = this.props;
    hideWarning();
  };

  render() {
    const { showMe } = this.props;

    return (
      <If test={showMe}>
        <Warning
          {...this.props}
          onClickCloseBtn={this.onClickCloseBtnHandler}
        />
      </If>
    );
  }
}

WarningContainer.propTypes = {
  id: string,
  type: shape({}),
  icon: string,
  showMe: bool,
  button: shape({
    value: string,
    onClick: func,
  }),
  hideWarning: func.isRequired,
  hasCloseBtn: bool,
  title: string,
};

WarningContainer.defaultProps = {
  id: "top-warning",
  type: warningTypes.ATTENTION_ALERT,
  icon: whiteWarningIcon,
  showMe: false,
  button: {},
  hasCloseBtn: false,
  title: "",
};

const mapStateToProps = ({ heroWarning }) => ({ ...heroWarning });

const mapDispatchToProps = {
  hideWarning: warningActions.hideWarning,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(WarningContainer));
