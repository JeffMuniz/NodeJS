import React, { Component } from "react";
import { arrayOf, bool, func, shape, number, string } from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { getNotifications } from "src/api/notifications/notifications";
import store from "src/redux/configureStore";
import DateManager from "src/modules/DateManager/DateManager";
import { getEnvironment } from "src/modules/UrlManager/UrlManager";
import { resetAuth as resetAuthAction } from "src/redux/modules/session/actions/session";
import { OpenModal as openModalAction } from "src/redux/modules/modal/actions/modal";
import { Routes, WebPaths } from "src/routes/consts";
import { dropDownMenu, notificationsTypes } from "@enums";

import NavBar from "./NavBar";
import GroupSelect from "../GroupSelect/GroupSelect.container";

export class NavBarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropDownOpen: false,
      dropDownHasBorder: false,
      isDropDownNotification: false,
      isContractDownload: false,
      companySegment: null,
      groupIdControl: false,
    };
  }

  async componentDidMount() {
    await this.getJwt();
    this.updateDropdownBorderState();

    const { history } = this.props;

    history.listen(() => {
      this.updateDropdownBorderState();
    });
  }

  async componentDidUpdate() {
    await this.getJwt();

    if (getEnvironment() !== "production") {
      const { groupIdControl } = this.state;
      const {
        user: {
          profile: {
            data: { id: userId },
          },
        },
        selectedCompanyTree: {
          selectedGroup: { id: groupId },
        },
      } = store.getState();
      if (userId && groupId && !groupIdControl) {
        this.updateGroupIdControl();
        await this.getNotification({ userId, groupId });
      }
    }
  }

  getJwt = async () => {
    const { accessToken } = store.getState().session;
    if (
      DateManager(jwtDecode(accessToken).exp, "X")
        .add(4, "hours")
        .isBefore(new Date())
    ) {
      this.handleLogout();
    }
  };

  getNotification = async ({ userId, groupId }) => {
    if (userId && groupId) {
      const { data } = await getNotifications({
        userId,
        groupId,
        notificationType: notificationsTypes.ATUALIZACAO_CONTRATO,
      });
      if (data.segmentoEmpresa)
        this.setState({
          isContractDownload: true,
          companySegment: data.segmentoEmpresa,
        });
    }
    return this.state;
  };

  updateGroupIdControl = () => {
    this.setState({ groupIdControl: true });
  };

  handleLogout = () => {
    const {
      resetAuth,
      history: { push },
    } = this.props;

    this.toggleDropDown();

    resetAuth();

    push(WebPaths[Routes.LOGIN]);
  };

  handleGroupModal = () => {
    const { isDropDownOpen } = this.state;
    const { openModal } = this.props;

    if (isDropDownOpen) this.toggleDropDown();
    openModal({
      children: <GroupSelect />,
    });
  };

  toggleDropDown = () => {
    const { isDropDownOpen } = this.state;
    return this.setState({ isDropDownOpen: !isDropDownOpen });
  };

  toggleNotification = () => {
    const { isDropDownNotification, isDropDownOpen } = this.state;
    if (isDropDownOpen) {
      return this.setState({ isDropDownNotification: false });
    }
    return this.setState({ isDropDownNotification: !isDropDownNotification });
  };

  updateDropdownBorderState = () => {
    const {
      history: {
        location: { pathname },
      },
    } = this.props;
    const { dropDownHasBorder: prevBorderState } = this.state;

    const dropDownHasBorder = dropDownMenu.some(
      link => WebPaths[link.route] === pathname,
    );

    if (prevBorderState !== dropDownHasBorder) {
      this.setState({ dropDownHasBorder });
    }
  };

  render() {
    const { isAuthenticated, groupList, deliveryType } = this.props;
    const {
      isDropDownOpen,
      dropDownHasBorder,
      isContractDownload,
      isDropDownNotification,
      companySegment,
    } = this.state;
    const showChangeGroup = groupList && groupList.length > 1;
    const { length: groupListLength } = groupList;

    return (
      <NavBar
        deliveryType={deliveryType}
        isAuthenticated={isAuthenticated}
        isDropDownOpen={isDropDownOpen}
        isDropDownNotification={isDropDownNotification}
        isContractDownload={isContractDownload}
        companySegment={companySegment}
        toggleDropDown={this.toggleDropDown}
        toggleNotification={this.toggleNotification}
        handleLogout={this.handleLogout}
        groupListLength={groupListLength}
        showChangeGroup={showChangeGroup}
        handleGroupModal={this.handleGroupModal}
        dropDownHasBorder={dropDownHasBorder}
      />
    );
  }
}

export const mapStateToProps = ({
  user: { isAuthenticated },
  group: {
    groupState: { groupList },
  },
  selectedCompanyTree: {
    selectedGroup: {
      params: { deliveryType },
    },
  },
}) => ({
  isAuthenticated,
  groupList,
  deliveryType,
});

export const mapDispatchToProps = {
  resetAuth: resetAuthAction,
  openModal: openModalAction,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavBarContainer),
);

NavBarContainer.propTypes = {
  isAuthenticated: bool,
  resetAuth: func.isRequired,
  groupList: arrayOf(
    shape({
      id: number,
      idPermission: number,
      name: string,
    }),
  ),
  openModal: func.isRequired,
  deliveryType: string,
};

NavBarContainer.defaultProps = {
  isAuthenticated: false,
  groupList: [],
  deliveryType: "",
};
