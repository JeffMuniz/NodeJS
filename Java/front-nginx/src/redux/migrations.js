export const STORAGE_VERSION = 3;

export const migrations = {
  0: state => ({ ...state }),
  1: state => ({
    ...state,
    user: {
      profile: {
        data: state.user.userData,
        error: state.user.error,
        requestStatus: state.user.requestStatus,
      },
      isAuthenticated: state.user.isAuthenticated,
      usersPermissions: state.user.usersPermissions,
      totalUsersPermissions: state.user.totalUsersPermissions,
    },
  }),
  2: state => ({
    ...state,
    selectedCompanyTree: {
      ...state.selectedCompanyTree,
      selectedGroup: {
        ...state.selectedCompanyTree.selectedGroup,
        params: {
          deliveryType:
            state.selectedCompanyTree.selectedGroup.params.deliveryType,
        },
      },
    },
  }),
  3: state => ({
    ...state,
    selectedCompanyTree: {
      ...state.selectedCompanyTree,
      selectedGroup: {
        ...state.selectedCompanyTree.selectedGroup,
        ordersLimit: state.selectedCompanyTree.selectedGroup.ordersLimit,
      },
    },
  }),
};
