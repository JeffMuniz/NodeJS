import React, { Component } from "react";
import { shape, func } from "prop-types";
import { connect } from "react-redux";
import store from "src/redux/configureStore";
import navigate from "src/routes/navigate";
import { Routes } from "src/routes/consts";

import { setUpdateHierarchy as setUpdateHierarchyAction } from "src/redux/modules/usersRegistry/actions/setUpdateHierarchy";
import * as toasterActions from "src/common/Toast/redux/actions/toast";

import UsersRegistryEdit from "./UsersRegistryEdit";

import {
  toOnlyLetters,
  formatDateToApi,
  toOnlyNumbers,
} from "../../utils/stringHelper";

const ERROR_ID = 1;

export class UsersRegistryEditContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      isModalOpen: false,
      loading: false,
    };
  }

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

  handleChange = (event, { newValue }) => {
    this.setState({ inputValue: newValue });
  };

  handleSubmit = async props => {
    this.setState({ loading: true });
    const { cpf, name, email, birthDate, phone, mother, id } = props;
    const { setUpdateHierarchy, sendToastMessage } = this.props;
    const formattedNameValue = toOnlyLetters(name);
    const formattedMotherValue = toOnlyLetters(mother);
    const formattedBirthDateValue = formatDateToApi(birthDate);
    const formattedPhone = phone ? toOnlyNumbers(phone) : null;
    const { selectedGroup } = store.getState().selectedCompanyTree;
    const {
      profile: { data },
    } = store.getState().user;
    const idUserLogged = data.id;
    const idGroupCompany = selectedGroup.id;

    try {
      await setUpdateHierarchy({
        id,
        cpf,
        name: formattedNameValue,
        email,
        birthDate: formattedBirthDateValue,
        phone: formattedPhone,
        mother: formattedMotherValue,
        idUserLogged,
        idGroupCompany,
      });

      this.setState({
        loading: false,
      });

      sendToastMessage({
        id: "update_user_toast_message_id",
        label: "Alterações salvas!",
      });

      this.goToAcessPermissions();
    } catch (err) {
      sendToastMessage({
        id: ERROR_ID,
        label:
          "Ocorreu um erro ao atualizar o usuário. Por favor, verifique as informações e tente novamente",
      });

      this.setState({
        loading: false,
      });
    }
  };

  updateProgress = value => {
    this.setState({ progress: value });
  };

  render() {
    const { isModalOpen, progress, formStep, inputValue, loading } = this.state;
    const {
      location: {
        state: { cpf, status, totalItems, selectedSubGroupId },
      },
      match: {
        params: { userId },
      },
    } = this.props;

    return (
      <UsersRegistryEdit
        userId={userId}
        cpf={cpf}
        userStatus={status}
        selectedSubGroupId={selectedSubGroupId}
        totalItems={totalItems}
        isModalOpen={isModalOpen}
        progress={progress}
        formStep={formStep}
        loading={loading}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        inputValue={inputValue}
        handleGoBack={this.handleGoBack}
        updateProgress={this.updateProgress}
      />
    );
  }
}

UsersRegistryEditContainer.propTypes = {
  location: shape({}).isRequired,
  match: shape({}).isRequired,
  setUpdateHierarchy: func.isRequired,
  sendToastMessage: func.isRequired,
};

export const mapStateToProps = ({ usersRegistry: { state } }) => ({
  users: state,
});

export const mapDispatchToProps = {
  setUpdateHierarchy: setUpdateHierarchyAction,
  sendToastMessage: toasterActions.showToast,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersRegistryEditContainer);
