import React, { Component } from "react";
import { connect } from "react-redux";

import navigate from "src/routes/navigate";
import { Routes } from "src/routes/consts";

import UsersRegistry from "./UsersRegistry";

const steps = {
  FIRST_FORM: 0,
  SECOND_FORM: 1,
};

export class UsersRegistryContainer extends Component {
  state = {
    isModalOpen: false,
    progress: 0,
    formStep: steps.FIRST_FORM,
  };

  handleGoBack = () => {
    const {
      history: { goBack },
    } = this.props;

    goBack();
  };

  goToAcessPermissions = () => {
    const { navigator, history } = this.props;
    const nav = navigator || history;
    navigate(nav, { route: Routes.ACCESS_PERMISSION });
  };

  updateProgress = value => {
    this.setState({ progress: value });
  };

  changePage = () => {
    this.setState({ formStep: steps.SECOND_FORM });
  };

  render() {
    const { isModalOpen, progress, formStep } = this.state;

    return (
      <UsersRegistry
        isModalOpen={isModalOpen}
        progress={progress}
        formStep={formStep}
        handleGoBack={this.handleGoBack}
        updateProgress={this.updateProgress}
        changePage={this.changePage}
        goToAcessPermissions={this.goToAcessPermissions}
      />
    );
  }
}

export const mapStateToProps = ({ usersRegistry: { users } }) => ({
  usersData: users,
});

export default connect(mapStateToProps)(UsersRegistryContainer);
