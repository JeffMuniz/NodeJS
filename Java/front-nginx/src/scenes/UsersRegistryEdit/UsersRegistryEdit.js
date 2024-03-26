import React, { Component } from "react";
import { string, bool, func, shape, number } from "prop-types";
import { connect } from "react-redux";

import { getAccessHierarchy as getAccessHierarchyAction } from "src/redux/modules/usersRegistry/actions/getAccessHierarchy";
import { showToast as showToastAction } from "src/common/Toast/redux/actions/toast";
import {
  OpenModal as openModalAction,
  CloseModal as closeModalAction,
} from "src/redux/modules/modal/actions/modal";

import FormWrapper from "src/modules/Form/Form";
import { ContainerWrapper } from "@base";
import { Tabs } from "@common";

import EditUserForm from "./EditUserForm/EditUserForm";
import FormSchema from "./EditUserForm/EditUserForm.schema";
import ModalContainer from "./Modal/Modal.container";

const IMAGE_SIZE = 22;

export class UsersRegistryEdit extends Component {
  constructor(props) {
    super(props);

    const { userStatus } = props;

    this.state = {
      initialValues: {
        id: "",
        cpf: "",
        name: "",
        email: "",
        birthDate: "",
        mother: "",
        phone: "",
      },
      isInitialValid: false,
      isLoggedUser: false,
      isSingleUser: true,
      userStatus: userStatus === "ativo",
      isLoadingGetUserInfo: false,
    };
  }

  componentDidMount() {
    this.handleGetAccessHierarchy();
  }

  handleGetAccessHierarchy = async () => {
    const {
      cpf,
      loggedUser,
      selectedGroup,
      getAccessHierarchy,
      showToast,
      totalItems,
    } = this.props;
    const idLoggedUser = loggedUser.id;
    const idGroup = selectedGroup.id;
    const { cpf: cpfState } = this.state;

    if (cpfState || !cpf) {
      return;
    }

    this.setState({ isLoadingGetUserInfo: true });

    try {
      const {
        id,
        phone,
        mother,
        birthDate,
        name,
        email,
      } = await getAccessHierarchy({
        cpf,
        idLoggedUser,
        idGroup,
      });

      this.setState({
        initialValues: {
          id,
          cpf,
          name,
          email,
          birthDate,
          mother,
          phone,
        },
        isLoggedUser: idLoggedUser === id,
        isSingleUser: totalItems === 1,
      });
    } catch (err) {
      showToast({
        id: "toast_get_access_hierarchy",
        label: `Ocorreu um erro: ${err}`,
      });
    } finally {
      this.setState({ isLoadingGetUserInfo: false });
    }
  };

  handleChangeStatus = (userStatus, isSingleUser) => {
    this.setState({ userStatus, isSingleUser });
  };

  renderUserStatusModal = () => {
    const {
      openModal,
      closeModal,
      userId,
      selectedGroup,
      selectedSubGroupId,
      loggedUser,
    } = this.props;
    const {
      initialValues: { name, cpf, email },
      isSingleUser,
      userStatus,
    } = this.state;
    const selectedGroupId = selectedGroup.id;
    const loggedUserId = loggedUser.id;

    openModal({
      children: (
        <ModalContainer
          userId={userId}
          userName={name}
          userStatus={userStatus}
          cpf={cpf}
          email={email}
          isSingleUser={isSingleUser}
          onCloseModal={closeModal}
          selectedGroupId={selectedGroupId}
          selectedSubGroupId={selectedSubGroupId}
          loggedUserId={loggedUserId}
          handleChangeStatus={this.handleChangeStatus}
        />
      ),
    });
  };

  render() {
    const {
      handleGoBack,
      handleSubmit,
      handleChange,
      loggedUser,
      loading,
    } = this.props;

    const {
      initialValues,
      isInitialValid,
      isLoggedUser,
      isLoadingGetUserInfo,
      userStatus,
    } = this.state;

    const actionButtons = userStatus
      ? [
          {
            id: "access-permissions-button-inactivate-user",
            value: "INATIVAR",
            imgWidth: IMAGE_SIZE,
            imgSrc: "inactive",
            action: `Clicou para alterar o status do usuário - "Inativar"`,
            disabled: isLoadingGetUserInfo,
            handleClick: this.renderUserStatusModal,
          },
        ]
      : [
          {
            id: "access-permissions-button-activate-user",
            value: "REATIVAR",
            imgWidth: IMAGE_SIZE,
            imgSrc: "inactive",
            action: `Clicou para alterar o status do usuário - "Ativar"`,
            disabled: isLoadingGetUserInfo,
            handleClick: this.renderUserStatusModal,
          },
        ];

    return (
      <ContainerWrapper
        title="Editar usuário"
        showBackIcon
        headerClickHandler={handleGoBack}
        actionButtons={actionButtons}
        loading={isLoadingGetUserInfo}
      >
        <Tabs activeTab="Dados do Usuário">
          <div id="dados-usuario" label="Dados do Usuário">
            <FormWrapper
              enableReinitialize
              initialValues={initialValues}
              validationSchema={FormSchema}
              onSubmit={handleSubmit}
              isInitialValid={isInitialValid}
              render={props => (
                <EditUserForm
                  userStatus={userStatus}
                  loggedUser={loggedUser}
                  handleChange={handleChange}
                  loading={loading}
                  handleGoBack={handleGoBack}
                  isLoggedUser={isLoggedUser}
                  {...props}
                />
              )}
            />
          </div>
        </Tabs>
      </ContainerWrapper>
    );
  }
}

UsersRegistryEdit.propTypes = {
  handleGoBack: func.isRequired,
  handleChange: func.isRequired,
  handleSubmit: func.isRequired,
  userId: string.isRequired,
  cpf: string.isRequired,
  userStatus: string.isRequired,
  totalItems: number.isRequired,
  selectedUser: shape({}),
  selectedGroup: shape({}).isRequired,
  selectedSubGroupId: string,
  loggedUser: shape({}).isRequired,
  getAccessHierarchy: func.isRequired,
  showToast: func.isRequired,
  loading: bool.isRequired,
  openModal: func.isRequired,
  closeModal: func.isRequired,
};

UsersRegistryEdit.defaultProps = {
  selectedUser: {
    name: "",
    cpf: "",
    email: "",
    birthDate: "",
    phone: "",
    mother: "",
  },
  selectedSubGroupId: null,
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
  getAccessHierarchy: getAccessHierarchyAction,
  showToast: showToastAction,
  openModal: openModalAction,
  closeModal: closeModalAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersRegistryEdit);
