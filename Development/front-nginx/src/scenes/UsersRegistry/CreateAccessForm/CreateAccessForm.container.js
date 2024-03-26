import React, { Component } from "react";
import { func, arrayOf, shape, number, string } from "prop-types";

import { connect } from "react-redux";
import { isObject, isEmpty } from "lodash";

import { userAccessLevel } from "@enums";

import * as modalActions from "src/redux/modules/modal/actions/modal";
import * as toasterActions from "src/common/Toast/redux/actions/toast";
import { clearUserRegistry as clearUserRegistryAction } from "src/redux/modules/usersRegistry/actions/clearUserRegistry";
import { getSubgroupsList as getSubgroupsAction } from "src/redux/modules/subgroup/actions/subgroup";
import { setAccessHierarchy as setAccessHierarchyAction } from "src/redux/modules/usersRegistry/actions/setAccessHierarchy";
import { getUserAccessLevel as getUserAccessLevelAction } from "src/redux/modules/user/actions/getAccessLevel";

import CreateAccessForm from "./CreateAccessForm";
import AccessFormModal from "../AccessFormModal/AccessFormModal";

const ERROR_ID = 1;
const SUCCESS_ID = 2;
const errorMessage = "Matriz não encontrada!";

export class CreateAccessFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      giveAccessLevelToWholeGroup: false,
      filteredSuggestions: [],
      inputValue: "",
      selectedSuggestions: [],
      allSuggestions: props.subgroups,
      selectedSuggestionToBeRemoved: {},
      error: "",
      loading: false,
    };
  }

  async componentDidMount() {
    const {
      idGroup,
      getSubgroups,
      loggedUser: { id: idLoggedUser, cpf },
      getUserAccessLevel,
    } = this.props;

    await Promise.all([
      getSubgroups({ idGroup }),
      getUserAccessLevel({ cpf, idGroup, idLoggedUser }),
    ]);

    this.updateSugestion();
  }

  getSuggestions = value => {
    const { allSuggestions } = this.state;

    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    let suggestions;

    if (inputLength === 0) {
      suggestions = [];
    } else {
      suggestions = allSuggestions.filter(
        lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue,
      );
    }

    this.setState({ error: isEmpty(suggestions) ? errorMessage : "" });

    return suggestions;
  };

  getSuggestionValue = suggestion => suggestion.name;

  getSelectedSuggestionsIds = () => {
    const { selectedSuggestions } = this.state;
    return selectedSuggestions.map(({ id }) => id);
  };

  updateSugestion = () => {
    const { subgroups } = this.props;
    return this.setState({ allSuggestions: subgroups });
  };

  handleSubmit = async () => {
    const {
      selectedUser: { permission, name },
      selectedUser,
      idGroup,
      sendToastMessage,
      clearUserRegistry,
      setAccessHierarchy,
      loggedUser: { id: idSessionUser },
      goToAcessPermissions,
    } = this.props;
    const { giveAccessLevelToWholeGroup } = this.state;

    this.setState({
      loading: true,
    });

    const idsAccessLevel = giveAccessLevelToWholeGroup
      ? [idGroup]
      : this.getSelectedSuggestionsIds();
    const accessLevel = giveAccessLevelToWholeGroup
      ? userAccessLevel.GROUP
      : userAccessLevel.SUBGROUP;

    const alreadyAllowed =
      isObject(permission) &&
      !isEmpty(permission) &&
      isObject(permission.group) &&
      !isEmpty(permission.group);

    try {
      await setAccessHierarchy({
        idsAccessLevel,
        accessLevel,
        alreadyAllowed,
        selectedUser,
        idSessionUser,
        idGroup,
      });

      clearUserRegistry();
      goToAcessPermissions();

      sendToastMessage({
        id: SUCCESS_ID,
        label: `Novo usuário do Portal criado com sucesso! Foi enviado um e-mail para ${name} seguir com os próximos passos.`,
      });
    } catch (err) {
      sendToastMessage({ id: ERROR_ID, label: err.message });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  handleSuggestionFetchRequested = ({ value }) => {
    this.setState({
      filteredSuggestions: this.getSuggestions(value),
    });
  };

  handleChange = (event, { newValue }) => {
    this.setState({ inputValue: newValue });
  };

  handleSuggestionClearRequested = () => {
    this.setState({
      filteredSuggestions: [],
    });
  };

  handleCheckBoxClick = () => {
    this.setState(state => ({
      giveAccessLevelToWholeGroup: !state.giveAccessLevelToWholeGroup,
      error: "",
    }));
  };

  handleSuggestionSelected = (event, { suggestion }) => {
    const { allSuggestions } = this.state;

    const newAllSuggestions = allSuggestions.filter(
      item => item.id !== suggestion.id,
    );

    this.setState(state => ({
      selectedSuggestions: [...state.selectedSuggestions, suggestion],
      inputValue: "",
      allSuggestions: newAllSuggestions,
    }));
  };

  handleOpenModal = id => {
    const { selectedSuggestions } = this.state;
    const { openModal } = this.props;

    const selectedSuggestionToBeRemoved = selectedSuggestions.find(
      item => item.id === id,
    );

    this.setState({ selectedSuggestionToBeRemoved }, () =>
      openModal({
        children: (
          <AccessFormModal
            companyName={selectedSuggestionToBeRemoved.name}
            handleCloseModal={this.handleCloseModal}
            handleRemoveSuggestion={this.handleRemoveSuggestion}
          />
        ),
      }),
    );
  };

  handleCloseModal = () => {
    const { closeModal } = this.props;

    this.setState({ selectedSuggestionToBeRemoved: {} }, closeModal);
  };

  handleRemoveSuggestion = () => {
    const { selectedSuggestions, selectedSuggestionToBeRemoved } = this.state;
    const { subgroups } = this.props;

    const newSelectedQuestions = selectedSuggestions.filter(
      item => item.id !== selectedSuggestionToBeRemoved.id,
    );
    const suggestionToReturnToAllSuggestions = subgroups.filter(
      item => item.id === selectedSuggestionToBeRemoved.id,
    );

    this.setState(
      state => ({
        selectedSuggestions: newSelectedQuestions,
        allSuggestions: [
          ...state.allSuggestions,
          ...suggestionToReturnToAllSuggestions,
        ],
        selectedSuggestionToBeRemoved: {},
      }),
      this.handleCloseModal(),
    );
  };

  render() {
    const {
      giveAccessLevelToWholeGroup,
      filteredSuggestions,
      inputValue,
      selectedSuggestions,
      error,
      loading,
    } = this.state;

    const { openModal, closeModal, handleGoBack, accessLevel } = this.props;

    const allowGroupPermission = accessLevel === userAccessLevel.GROUP;
    const shouldButtonBeDisabled =
      !giveAccessLevelToWholeGroup && isEmpty(selectedSuggestions);

    return (
      <CreateAccessForm
        allowGroupPermission={allowGroupPermission}
        giveAccessLevelToWholeGroup={giveAccessLevelToWholeGroup}
        filteredSuggestions={filteredSuggestions}
        handleCheckBoxClick={this.handleCheckBoxClick}
        getSuggestions={this.getSuggestions}
        getSuggestionValue={this.getSuggestionValue}
        inputValue={inputValue}
        handleSuggestionFetchRequested={this.handleSuggestionFetchRequested}
        handleSuggestionClearRequested={this.handleSuggestionClearRequested}
        handleChange={this.handleChange}
        selectedSuggestions={selectedSuggestions}
        handleSuggestionSelected={this.handleSuggestionSelected}
        handleRemoveSuggestion={this.handleRemoveSuggestion}
        shouldButtonBeDisabled={shouldButtonBeDisabled}
        openModal={openModal}
        closeModal={closeModal}
        handleOpenModal={this.handleOpenModal}
        handleCloseModal={this.handleCloseModal}
        onSubmit={this.handleSubmit}
        handleGoBack={handleGoBack}
        errorMessage={error}
        loading={loading}
      />
    );
  }
}

CreateAccessFormContainer.propTypes = {
  openModal: func.isRequired,
  closeModal: func.isRequired,
  handleGoBack: func.isRequired,
  selectedUser: shape({}).isRequired,
  idGroup: number.isRequired,
  getSubgroups: func.isRequired,
  setAccessHierarchy: func.isRequired,
  getUserAccessLevel: func.isRequired,
  subgroups: arrayOf(shape({})).isRequired,
  sendToastMessage: func.isRequired,
  clearUserRegistry: func.isRequired,
  loggedUser: shape({}).isRequired,
  accessLevel: string.isRequired,
  goToAcessPermissions: string.isRequired,
};

export const mapStateToProps = ({
  subgroup: {
    subgroupState: { subgroups },
  },
  selectedCompanyTree: {
    selectedGroup: { id: idGroup },
  },
  usersRegistry: { selectedUser },
  user: {
    profile: { data: loggedUser },
    accessLevel,
  },
}) => ({
  subgroups,
  selectedUser,
  idGroup,
  loggedUser,
  accessLevel,
});

export const mapDispatchToProps = {
  openModal: modalActions.OpenModal,
  closeModal: modalActions.CloseModal,
  sendToastMessage: toasterActions.showToast,
  clearUserRegistry: clearUserRegistryAction,
  getSubgroups: getSubgroupsAction,
  setAccessHierarchy: setAccessHierarchyAction,
  getUserAccessLevel: getUserAccessLevelAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateAccessFormContainer);
