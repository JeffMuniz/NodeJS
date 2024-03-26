/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { func, arrayOf, bool, shape, number, string } from "prop-types";
import { connect } from "react-redux";

import { toOnlyNumbers } from "@utils";

import { setAccessPermissionActiveTab as setAccessPermissionActiveTabAction } from "src/redux/modules/user/actions/setAccessPermissionTab";
import { setSelectedSubgroup as setSelectedSubgroupAction } from "src/redux/modules/usersRegistry/actions/setSelectedSubgroup";
import { getSubgroups as getSubgroupsAction } from "src/redux/modules/subgroup/actions/subgroup";
import { getAuthorizedUsers as getAuthorizedUsersAction } from "src/redux/modules/permissions/actions/permissions";
import { getUserAccessLevel as getUserAccessLevelAction } from "src/redux/modules/user/actions/getAccessLevel";
import { userAccessLevel } from "@enums";

import AccessPermission from "./AccessPermission";

export class AccessPermissionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageGroup: 0,
      sizeGroup: 20,
      pageSubGroup: 0,
      sizeSubGroup: 10,
      idCompanySubGroup: undefined,
      idCompanyGroup: undefined,
      cpf: "",
      name: "",
      status: undefined,
      tabs: { Grupo: props.idGroup, Matriz: props.idMatrix },
      selectedTab: props.accessPermissionActiveTab || "Grupo",
      totalItemsWithoutFilters: 0,
      loading: false,
    };
  }

  async componentDidMount() {
    this.getUserAccessLevelGroup();
    this.getAuthorizedUsersBySelectedTab({}, true);
  }

  onTabChangeCallback = label => async () => {
    const { setAccessPermissionActiveTab } = this.props;
    await setAccessPermissionActiveTab(label);
    this.getAuthorizedUsersBySelectedTab({}, true);
  };

  onTabChange = ({ label }) => {
    this.setState({ selectedTab: label }, this.onTabChangeCallback(label));
  };

  setSelectedSubgroup = idMatrix => {
    const { setSelectedSubgroup } = this.props;
    setSelectedSubgroup({ idMatrix });
  };

  getUserAccessLevelGroup = async () => {
    const {
      loggedUserId,
      loggedUserCpf,
      idGroup,
      getUserAccessLevel,
    } = this.props;

    this.setState({
      loading: true,
    });

    try {
      await getUserAccessLevel({
        cpf: loggedUserCpf,
        idGroup,
        idLoggedUser: loggedUserId,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  getAuthorizedUsersBySelectedTab = async (
    args = {},
    isInitialValues = false,
  ) => {
    const { getAuthorizedUsers, getSubgroups, idGroup } = this.props;
    const { tabs, selectedTab } = this.state;
    const isGroupCompany = this.isGroupCompany();

    const searchType = isGroupCompany ? "idCompanyGroup" : "idCompanySubGroup";

    const pageState = isGroupCompany ? "pageGroup" : "pageSubGroup";
    const sizeState = isGroupCompany ? "sizeGroup" : "sizeSubGroup";

    const page = args.page || this.state[pageState];
    const size = args.size || this.state[sizeState];

    const status =
      args.status || args.status === null ? args.status : this.state.status;

    let cpfArgs = "";
    let nameArgs = "";

    if ((args.cpf || args.cpf === "") && !args.name) {
      cpfArgs = toOnlyNumbers(args.cpf);
    } else if (args.name || args.name === "") {
      nameArgs = args.name;
    } else {
      cpfArgs = this.state.cpf;
      nameArgs = this.state.name;
    }

    this.setState({
      idCompanySubGroup: undefined,
      idCompanyGroup: undefined,
      [searchType]: tabs[selectedTab],
      cpf: cpfArgs,
      name: nameArgs,
      status,
    });

    if (isGroupCompany) {
      const { totalItems } = await getAuthorizedUsers({
        ...args,
        page,
        size,
        [searchType]: tabs[selectedTab],
        cpf: cpfArgs,
        name: nameArgs,
        status,
      });

      if (isInitialValues) {
        this.setState({
          totalItemsWithoutFilters: totalItems,
        });
      }

      return;
    }

    await getSubgroups({
      idGroup,
      page,
      size,
    });
  };

  isGroupCompany = () => {
    const { selectedTab } = this.state;

    return selectedTab === "Grupo";
  };

  render() {
    const {
      users,
      totalUsersPermissions,
      history,
      subgroups,
      accessPermissionActiveTab,
      subgroupTotalItems,
      subgroupStatus,
      groupStatus,
      selectedGroupName,
      hasGroupAccessLevel,
    } = this.props;
    const { totalItemsWithoutFilters, loading } = this.state;
    const subGrupoOrdered = subgroups.sort((a, b) =>
      a.name > b.name ? 1 : -1,
    );

    return (
      <AccessPermission
        users={users}
        subgroups={subGrupoOrdered}
        subgroupTotalItems={subgroupTotalItems}
        groupStatus={groupStatus}
        subgroupStatus={subgroupStatus}
        hasGroupAccessLevel={hasGroupAccessLevel}
        history={history}
        totalUsers={totalUsersPermissions}
        onPageChange={this.getAuthorizedUsersBySelectedTab}
        onTabChange={this.onTabChange}
        setSelectedSubgroup={this.setSelectedSubgroup}
        accessPermissionActiveTab={accessPermissionActiveTab}
        selectedGroupName={selectedGroupName}
        totalItemsWithoutFilters={totalItemsWithoutFilters}
        loading={loading}
      />
    );
  }
}

AccessPermissionContainer.propTypes = {
  users: arrayOf(shape({})).isRequired,
  loggedUserId: string.isRequired,
  loggedUserCpf: string.isRequired,
  subgroups: arrayOf(shape({})).isRequired,
  totalUsersPermissions: number.isRequired,
  idGroup: number.isRequired,
  idMatrix: number.isRequired,
  setSelectedSubgroup: func.isRequired,
  setAccessPermissionActiveTab: func.isRequired,
  accessPermissionActiveTab: string,
  subgroupTotalItems: number,
  subgroupStatus: string,
  getSubgroups: func.isRequired,
  getAuthorizedUsers: func.isRequired,
  groupStatus: string,
  selectedGroupName: string.isRequired,
  getUserAccessLevel: func.isRequired,
  hasGroupAccessLevel: bool.isRequired,
};

AccessPermissionContainer.defaultProps = {
  accessPermissionActiveTab: "",
  subgroupTotalItems: 0,
  subgroupStatus: "",
  groupStatus: "",
};

export const mapStateToProps = ({
  user: {
    accessPermissionActiveTab,
    profile: {
      data: { id: loggedUserId, cpf: loggedUserCpf },
    },
    accessLevel,
  },
  selectedCompanyTree: {
    selectedGroup: { id: idGroup },
    selectedSubgroup: { id: idMatrix },
  },
  subgroup: {
    subgroupState: {
      subgroups,
      totalItems: subgroupTotalItems,
      requestStatus: subgroupStatus,
    },
  },
  permissions: {
    permissionsState: {
      users,
      totalItems: totalUsersPermissions,
      requestStatus: groupStatus,
    },
  },
  selectedCompanyTree: {
    selectedGroup: { name: selectedGroupName },
  },
}) => ({
  users,
  loggedUserId,
  loggedUserCpf,
  totalUsersPermissions,
  accessPermissionActiveTab,
  idGroup,
  idMatrix,
  subgroups,
  subgroupTotalItems,
  subgroupStatus,
  groupStatus,
  selectedGroupName,
  hasGroupAccessLevel: accessLevel === userAccessLevel.GROUP,
});

export const mapDispatchToProps = {
  setSelectedSubgroup: setSelectedSubgroupAction,
  setAccessPermissionActiveTab: setAccessPermissionActiveTabAction,
  getSubgroups: getSubgroupsAction,
  getAuthorizedUsers: getAuthorizedUsersAction,
  getUserAccessLevel: getUserAccessLevelAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccessPermissionContainer);
