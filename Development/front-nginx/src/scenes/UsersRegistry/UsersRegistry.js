import React from "react";
import { number, oneOf, func } from "prop-types";

import { Stepper } from "@common";
import { ContainerWrapper } from "@base";

import CreateUserForm from "./CreateUserForm/CreateUserForm.container";
import CreateAccessForm from "./CreateAccessForm/CreateAccessForm.container";

import { FormTitle } from "./UsersRegistry.styles";

const firstFormTitle =
  "Insira abaixo o CPF do novo usuário com perfil de acesso.";
const secondFormTitle =
  "Atribua as unidades em que o novo usuário terá acesso.";
const FIRST_FORM = 0;
const SECOND_FORM = 1;

const steps = [
  {
    id: "step1",
    label: "Dados do usuário",
  },
  {
    id: "step2",
    label: "Unidades de acesso",
  },
];

export const UsersRegistry = ({
  progress,
  formStep,
  handleGoBack,
  updateProgress,
  changePage,
  goToAcessPermissions,
}) => (
  <ContainerWrapper
    title="Adicionar usuário"
    showBackIcon
    headerClickHandler={handleGoBack}
  >
    <Stepper progress={progress} steps={steps} />
    <FormTitle>
      {formStep === FIRST_FORM ? firstFormTitle : secondFormTitle}
    </FormTitle>
    {formStep === FIRST_FORM ? (
      <CreateUserForm
        updateProgress={updateProgress}
        changePage={changePage}
        handleGoBack={handleGoBack}
      />
    ) : (
      <CreateAccessForm
        handleGoBack={handleGoBack}
        goToAcessPermissions={goToAcessPermissions}
      />
    )}
  </ContainerWrapper>
);

UsersRegistry.propTypes = {
  progress: number.isRequired,
  formStep: oneOf([FIRST_FORM, SECOND_FORM]).isRequired,
  handleGoBack: func.isRequired,
  updateProgress: func.isRequired,
  changePage: func.isRequired,
  goToAcessPermissions: func.isRequired,
};

export default UsersRegistry;
