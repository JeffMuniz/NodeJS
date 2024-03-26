import React from "react";
import { shape, arrayOf, func, number, string } from "prop-types";

import { ContainerWrapper, WithPagination } from "@base";

import AccessPermissionGroupList from "../AccessPermission/GroupsPermissions/GroupsPermissions";

const fieldsToFilterBy = [
  {
    key: "cpf",
    description: "nº do CPF",
    optionDescription: "CPF",
    mask: "cpf",
  },
  { key: "name", description: "Nome" },
];

const fieldsToFilterDropdown = [
  { key: "ATIVO", description: "Ativos", label: "status" },
  { key: "INATIVO", description: "Inativos", label: "status" },
  { key: null, description: "Todos", label: "status" },
];

export const renderAccessPermissionGroupList = (
  history,
  users,
  totalItemsWithoutFilters,
  handleNavigateToEditUser,
) => () => (
  <AccessPermissionGroupList
    users={users}
    totalItems={totalItemsWithoutFilters}
    subtitleMessage=""
    history={history}
    handleNavigateToEditUser={handleNavigateToEditUser}
  />
);

export const UserDetails = ({
  users,
  totalItems,
  totalItemsWithoutFilters,
  requestStatus,
  handleGoBack,
  onPageChange,
  handleNavigateToEditUser,
  history,
}) => (
  <ContainerWrapper
    title="Usuários com Acesso à Matriz"
    showBackIcon
    headerClickHandler={handleGoBack}
  >
    <WithPagination
      data={{ totalItems }}
      fieldsToFilterDropdownGeneric={fieldsToFilterDropdown}
      fieldsToFilterBy={fieldsToFilterBy}
      showFilterDropdownGeneric
      showSearchInput
      itemsPerPage={20}
      showLoading
      callback={onPageChange}
      status={requestStatus}
      render={renderAccessPermissionGroupList(
        history,
        users,
        totalItemsWithoutFilters,
        handleNavigateToEditUser,
      )}
    />
  </ContainerWrapper>
);

UserDetails.propTypes = {
  users: arrayOf(shape({})).isRequired,
  handleGoBack: func.isRequired,
  onPageChange: func.isRequired,
  totalItems: number,
  totalItemsWithoutFilters: number.isRequired,
  requestStatus: string,
  handleNavigateToEditUser: func.isRequired,
};

UserDetails.defaultProps = {
  totalItems: 0,
  requestStatus: "",
};

export default UserDetails;
