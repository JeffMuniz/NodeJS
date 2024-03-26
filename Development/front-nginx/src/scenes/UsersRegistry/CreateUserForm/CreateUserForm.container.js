import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { func, string, shape, arrayOf, bool } from "prop-types";

import { formatDateToApi, toOnlyLetters, toOnlyNumbers } from "@utils";

import FormWrapper from "src/modules/Form/Form";
import { setUserToRegister as setUserToRegisterAction } from "src/redux/modules/usersRegistry/actions/setUserToRegister";
import { getAccessHierarchy as getAccessHierarchyAction } from "src/redux/modules/usersRegistry/actions/getAccessHierarchy";

import CreateUserForm from "./CreateUserForm";
import FormSchema from "./CreateUserForm.schema";

export class CreateUserFormContainer extends Component {
  state = {
    initialValues: { cpf: "" },
    isInitialValid: false,
    disabledInput: true,
    loading: false,
    buttonText: "continuar",
  };

  onBlurCpfField = async cpf => {
    const {
      getAccessHierarchy,
      updateProgress,
      loggedUser: { id: idLoggedUser },
      selectedGroup: { id: idGroup },
    } = this.props;

    if (!cpf) {
      this.handleDefaultInputValues(true);
      return;
    }

    this.setState({
      loading: true,
    });

    try {
      const {
        name,
        email,
        cpf: searchedUserCpf,
        birthDate,
        phone,
        mother,
      } = await getAccessHierarchy({
        cpf,
        idGroup,
        idLoggedUser,
      });

      if (name && email) {
        this.setState({
          initialValues: {
            name,
            email,
            cpf: searchedUserCpf,
            birthDate,
            phone,
            mother,
          },
          isInitialValid: true,
          disabledInput: true,
          loading: false,
        });
      } else {
        this.handleDefaultInputValues(false, searchedUserCpf);
      }
    } catch (err) {
      this.setState({
        loading: false,
      });
    }

    updateProgress(100);
  };

  handleDefaultInputValues = (disabledInput, searchedUserCpf) => {
    this.setState({
      initialValues: {
        name: "",
        email: "",
        cpf: searchedUserCpf || "",
        birthDate: "",
        phone: "",
        mother: "",
      },
      disabledInput,
      loading: false,
    });
  };

  handleSubmit = props => {
    const {
      selectedUser: { cpf },
      changePage,
      setUserToRegister,
    } = this.props;
    const { name, email, birthDate, phone, mother } = props;

    const formattedNameValue = toOnlyLetters(name);
    const formattedMotherValue = toOnlyLetters(mother);
    const formattedBirthDateValue = formatDateToApi(birthDate);
    const formattedPhone = phone ? toOnlyNumbers(phone) : null;

    setUserToRegister({
      cpf,
      name: formattedNameValue,
      email,
      birthDate: formattedBirthDateValue,
      phone: formattedPhone,
      mother: formattedMotherValue,
    });

    changePage();
  };

  render() {
    const { updateProgress, handleGoBack } = this.props;
    const {
      initialValues,
      isInitialValid,
      disabledInput,
      loading,
      buttonText,
    } = this.state;

    return (
      <FormWrapper
        enableReinitialize
        initialValues={initialValues}
        validationSchema={FormSchema}
        onSubmit={this.handleSubmit}
        isInitialValid={isInitialValid}
        render={props => (
          <CreateUserForm
            updateProgress={updateProgress}
            handleGoBack={handleGoBack}
            onBlurCpfField={this.onBlurCpfField}
            disabledInput={disabledInput}
            loading={loading}
            buttonText={buttonText}
            {...props}
          />
        )}
      />
    );
  }
}

CreateUserFormContainer.propTypes = {
  updateProgress: func.isRequired,
  changePage: func.isRequired,
  handleGoBack: func.isRequired,
  registerUser: func.isRequired,
  getUserInfoByCpf: func.isRequired,
  companyName: string.isRequired,
  selectedCompany: shape({
    name: string,
  }),
  selectedUser: shape({
    blockAccess: bool,
    cpf: string,
    email: string,
    id: string,
    idPlatform: string,
    idUserType: string,
    profilesIds: arrayOf(shape({})),
    login: string,
    name: string,
    status: string,
    incorrectAttempts: string,
    birthDate: string,
    phone: string,
    mother: string,
  }),
  setUserToRegister: func.isRequired,
  getAccessHierarchy: func.isRequired,
  loggedUser: shape({}).isRequired,
  selectedGroup: shape({}).isRequired,
};

CreateUserFormContainer.defaultProps = {
  selectedCompany: {},
  selectedUser: {},
};

export const mapStateToProps = ({
  usersRegistry: { selectedUser },
  user: {
    profile: { data: loggedUser },
  },
  selectedCompanyTree: { selectedGroup },
}) => ({
  selectedUser,
  loggedUser,
  selectedGroup,
});

export const mapDispatchToProps = {
  setUserToRegister: setUserToRegisterAction,
  getAccessHierarchy: getAccessHierarchyAction,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateUserFormContainer),
);
