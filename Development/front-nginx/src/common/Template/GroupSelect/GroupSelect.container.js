import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import {
  updateSelectedGroup as updateSelectedGroupAction,
  updateSelectedGroupParams as updateSelectedGroupParamsAction,
} from "src/redux/modules/selectedCompanyTree/actions/selectedCompanyTree";
import { resetAuth as resetAuthAction } from "src/redux/modules/session/actions/session";
import { getGroups } from "src/redux/modules/group/actions/group";

import { hideWarning as hideWarningAction } from "src/redux/modules/heroWarning/actions/heroWarning";
import { CloseModal as closeModalAction } from "src/redux/modules/modal/actions/modal";

import navigate from "src/routes/navigate";
import { Routes } from "src/routes/consts";

import GroupSelect from "./GroupSelect";
import GroupSelectEmptyState from "./GroupSelectEmptyState";

export class GroupSelectContainer extends Component {
  onSelectGroup = group => async () => {
    const {
      updateSelectedGroup,
      updateSelectedGroupParams,
      handleGroupModal,
      closeModal,
      userId,
      hideWarning,
      thereIsActiveWarning,
      history,
    } = this.props;

    const selectedGroupParams = await updateSelectedGroupParams({
      idGroup: group.id,
      idUser: userId,
    });

    const selectedGroup = {
      ...group,
      ...selectedGroupParams,
    };

    await updateSelectedGroup({ selectedGroup });

    if (handleGroupModal) {
      handleGroupModal();
    }

    if (thereIsActiveWarning) {
      hideWarning();
    }

    closeModal();

    navigate(history, {
      route: Routes.ORDERS_DASHBOARD,
    });
  };

  render() {
    const {
      groupList,
      selectedGroup: { id: selectedGroupId },
    } = this.props;
    const hasGroups = groupList.length > 0;

    return (
      <Fragment>
        {hasGroups ? (
          <GroupSelect
            onSelectGroup={this.onSelectGroup}
            groupList={groupList}
            selectedGroupId={selectedGroupId}
          />
        ) : (
          <GroupSelectEmptyState />
        )}
      </Fragment>
    );
  }
}

export const mapStateToProps = ({
  user: {
    profile: { data: userData },
  },
  group: {
    groupState: { groupList, requestStatus },
  },
  selectedCompanyTree: { selectedGroup },
  heroWarning: { showMe: thereIsActiveWarning },
}) => ({
  userId: userData && userData.id,
  groupList,
  groupStatus: requestStatus,
  selectedGroup,
  thereIsActiveWarning,
});

const mapDispatchToProps = {
  updateSelectedGroup: updateSelectedGroupAction,
  updateSelectedGroupParams: updateSelectedGroupParamsAction,
  getGroupList: getGroups,
  resetAuth: resetAuthAction,
  closeModal: closeModalAction,
  hideWarning: hideWarningAction,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GroupSelectContainer),
);

GroupSelectContainer.propTypes = {
  updateSelectedGroup: PropTypes.func.isRequired,
  groupList: PropTypes.arrayOf(PropTypes.shape({})),
  selectedGroup: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
  }),
  handleGroupModal: PropTypes.func,
  updateSelectedGroupParams: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  hideWarning: PropTypes.func.isRequired,
  thereIsActiveWarning: PropTypes.bool.isRequired,
};

GroupSelectContainer.defaultProps = {
  groupList: [],
  selectedGroup: {
    name: "",
    id: undefined,
  },
  handleGroupModal: undefined,
};
