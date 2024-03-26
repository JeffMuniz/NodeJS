import React, { Component } from "react";
import { connect } from "react-redux";
import { shape, arrayOf, func, string, number } from "prop-types";
import navigate from "src/routes/navigate";
import { Routes } from "src/routes/consts";

import { toOnlyNumbers } from "@utils";

import { getAuthorizedUsers as getAuthorizedUsersAction } from "../../redux/modules/permissions/actions/permissions";

import UserDetails from "./UserDetails";

export class UserDetailsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      size: 20,
      cpf: "",
      name: "",
      status: undefined,
      totalItemsWithoutFilters: 0,
    };
  }

  async componentDidMount() {
    const {
      getAuthorizedUsers,
      match: {
        params: { matrixId },
      },
    } = this.props;
    const { page, size } = this.state;

    const { totalItems } = await getAuthorizedUsers({
      page,
      size,
      idCompanySubGroup: matrixId,
    });

    this.onTotalItemsChange(totalItems);
  }

  onTotalItemsChange = totalItems => {
    const { totalItemsWithoutFilters } = this.state;

    if (totalItemsWithoutFilters === 0) {
      this.setState({
        totalItemsWithoutFilters: totalItems,
      });
    }
  };

  onPageChange = async (args = {}) => {
    const {
      getAuthorizedUsers,
      match: {
        params: { matrixId },
      },
    } = this.props;
    const { cpf, name, status: statusState } = this.state;
    const { page: pageArgs, size: sizeArgs } = args;

    const page = pageArgs;
    const size = sizeArgs;

    const status =
      args.status || args.status === null ? args.status : statusState;

    let cpfArgs = "";
    let nameArgs = "";

    if ((args.cpf || args.cpf === "") && !args.name) {
      cpfArgs = toOnlyNumbers(args.cpf);
    } else if (args.name || args.name === "") {
      nameArgs = args.name;
    } else {
      cpfArgs = cpf;
      nameArgs = name;
    }

    this.setState({
      page,
      size,
      cpf: cpfArgs,
      name: nameArgs,
      status,
    });

    await getAuthorizedUsers({
      page,
      size,
      idCompanySubGroup: matrixId,
      cpf: cpfArgs,
      name: nameArgs,
      status,
    });
  };

  handleNavigateToEditUser = (history, user, totalItems) => () => {
    const {
      match: {
        params: { matrixId },
      },
    } = this.props;
    const { userId, cpf, status } = user;

    navigate(history, {
      route: Routes.USERS_REGISTRY_EDIT,
      params: { userId },
      data: { cpf, status, totalItems, selectedSubGroupId: matrixId },
    });
  };

  handleGoBack = () => {
    const {
      history: { goBack },
    } = this.props;

    goBack();
  };

  render() {
    const { users, totalItems, requestStatus, history } = this.props;
    const { totalItemsWithoutFilters } = this.state;

    return (
      <UserDetails
        users={users}
        totalItems={totalItems}
        totalItemsWithoutFilters={totalItemsWithoutFilters}
        requestStatus={requestStatus}
        handleGoBack={this.handleGoBack}
        onPageChange={this.onPageChange}
        handleNavigateToEditUser={this.handleNavigateToEditUser}
        history={history}
      />
    );
  }
}

export const mapStateToProps = ({
  permissions: {
    permissionsState: { users, totalItems, requestStatus },
  },
}) => ({
  users,
  totalItems,
  requestStatus,
});

export const mapDispatchToProps = {
  getAuthorizedUsers: getAuthorizedUsersAction,
};

UserDetailsContainer.propTypes = {
  users: arrayOf(shape({})).isRequired,
  getAuthorizedUsers: func.isRequired,
  totalItems: number,
  requestStatus: string,
  match: shape({
    params: shape({
      matrixId: string,
    }),
  }).isRequired,
};

UserDetailsContainer.defaultProps = {
  totalItems: 0,
  requestStatus: "",
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDetailsContainer);
