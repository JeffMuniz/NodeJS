import store from "src/redux/configureStore";

export const getGroupAndUserIdFromState = () => {
  const state = store.getState();
  const { selectedCompanyTree, user } = state;
  const groupId = selectedCompanyTree.selectedGroup.id;
  const userId = user.profile.data.id;
  const userName = user.profile.data.name;

  return { groupId, userId, userName };
};
