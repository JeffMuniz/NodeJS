import React from "react";
import { arrayOf, bool, shape, number, func, string } from "prop-types";
import navigate from "src/routes/navigate";
import { Routes } from "src/routes/consts";

import { ContainerWrapper, WithPagination, Loading } from "@base";
import { Tabs } from "@common";
import { If } from "@utils";

import GroupsPermissions from "./GroupsPermissions/GroupsPermissions";
import SubgroupsPermissions from "./SubgroupsPermissions/SubgroupsPermissions";
import {
  Description,
  SubTitle,
  LoadingWrapper,
} from "./AccessPermission.styles";

export const handleNavigateToAddUser = history => () =>
  navigate(history, { route: Routes.USERS_REGISTRY });

export const handleNavigateToEditUser = (history, user, totalItems) => () => {
  const { userId, cpf, status } = user;

  navigate(history, {
    route: Routes.USERS_REGISTRY_EDIT,
    params: { userId },
    data: { cpf, status, totalItems },
  });
};

const subtitleMessage =
  "Nesta sessão você encontra a lista de pessoas com permissões de acesso a todo o grupo.";

export const renderGroupsPermissions = (
  users,
  totalItems,
  history,
  hasGroupAccessLevel,
  loading,
) => () => (
  <GroupsPermissions
    users={users}
    totalItems={totalItems}
    history={history}
    handleNavigateToEditUser={handleNavigateToEditUser}
    hasGroupAccessLevel={hasGroupAccessLevel}
    loading={loading}
  />
);

export const renderSubgroupsPermissions = (
  subgroups,
  history,
  setSelectedSubgroup,
) => () => (
  <SubgroupsPermissions
    subgroups={subgroups}
    history={history}
    setSelectedSubgroup={setSelectedSubgroup}
  />
);

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

const IMAGE_SIZE = 20;
const ITEMS_PER_PAGE = 20;
const MATRIX_PER_PAGE = 10;

export const AccessPermission = ({
  users,
  subgroups,
  totalUsers: totalItems,
  subgroupTotalItems,
  subgroupStatus,
  groupStatus,
  hasGroupAccessLevel,
  history,
  onPageChange,
  onTabChange,
  setSelectedSubgroup,
  accessPermissionActiveTab,
  selectedGroupName,
  totalItemsWithoutFilters,
  loading,
}) => {
  const data = {
    totalItems,
    content: users,
  };

  return (
    <ContainerWrapper
      actionButtons={[
        {
          id: "access-permissions-button-add-user",
          value: "ADICIONAR USUÁRIOS",
          imgWidth: IMAGE_SIZE,
          imgSrc: "add",
          handleClick: handleNavigateToAddUser(history),
        },
      ]}
      isBiggerTitle
      title="Permissão de Acesso"
    >
      <Tabs onClick={onTabChange} activeTab={accessPermissionActiveTab}>
        <div id="access-permission-group-tab" label="Grupo">
          <Description subtitleMessage={subtitleMessage}>
            {subtitleMessage}
          </Description>
          <SubTitle>{selectedGroupName}</SubTitle>
          <If test={loading}>
            <LoadingWrapper>
              <Loading loading />
            </LoadingWrapper>
          </If>
          <If test={!loading}>
            <WithPagination
              data={data}
              fieldsToFilterDropdownGeneric={fieldsToFilterDropdown}
              fieldsToFilterBy={fieldsToFilterBy}
              showFilterDropdownGeneric
              showSearchInput
              status={groupStatus}
              itemsPerPage={ITEMS_PER_PAGE}
              callback={onPageChange}
              showLoading
              render={renderGroupsPermissions(
                users,
                totalItemsWithoutFilters,
                history,
                hasGroupAccessLevel,
                loading,
              )}
            />
          </If>
        </div>
        <div id="access-permission-matrix-tab" label="Subgrupo">
          <WithPagination
            data={{ totalItems: subgroupTotalItems }}
            status={subgroupStatus}
            itemsPerPage={MATRIX_PER_PAGE}
            callback={onPageChange}
            render={renderSubgroupsPermissions(
              subgroups,
              history,
              setSelectedSubgroup,
            )}
          />
        </div>
      </Tabs>
    </ContainerWrapper>
  );
};

AccessPermission.propTypes = {
  users: arrayOf(shape({})).isRequired,
  subgroups: arrayOf(shape({})).isRequired,
  history: shape({}).isRequired,
  totalUsers: number.isRequired,
  onPageChange: func.isRequired,
  onTabChange: func.isRequired,
  setSelectedSubgroup: func.isRequired,
  accessPermissionActiveTab: string,
  subgroupTotalItems: number.isRequired,
  subgroupStatus: string,
  groupStatus: string,
  selectedGroupName: string.isRequired,
  totalItemsWithoutFilters: number.isRequired,
  hasGroupAccessLevel: bool.isRequired,
  loading: bool,
};

AccessPermission.defaultProps = {
  accessPermissionActiveTab: "",
  subgroupStatus: "",
  groupStatus: "",
  loading: false,
};

export default AccessPermission;
