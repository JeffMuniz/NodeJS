import {
  getEmployeesGroupIds,
  getEnvironment,
} from "src/modules/UrlManager/UrlManager";

const getEmployeesGroup = () => {
  const storage = JSON.parse(localStorage.getItem("persist:rh")) || "";
  const environment = getEnvironment();

  if (storage) {
    const selectedCompanyTree = JSON.parse(storage.selectedCompanyTree) || "";
    const selectedGroup = selectedCompanyTree.selectedGroup || "";

    const currentId = selectedGroup.id ? selectedGroup.id.toString() : "";
    const allowedIds = getEmployeesGroupIds().split(",");

    for (let index = 0; index < allowedIds.length; index += 1) {
      if (allowedIds[index] === currentId || environment !== "production") {
        return false;
      }
    }
  }

  return true;
};

export default getEmployeesGroup;
