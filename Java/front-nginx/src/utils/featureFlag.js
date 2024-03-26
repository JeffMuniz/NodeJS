import {
  getCreditAnticipationGroupIds,
  getmacnaiGroupIds,
} from "src/modules/UrlManager/UrlManager";
import { getGroupAndUserIdFromState } from "./session";

export const enableCreditAnticipation = () => {
  const { groupId } = getGroupAndUserIdFromState();
  const environmentVariable = getCreditAnticipationGroupIds();
  const allowedGroupIds = environmentVariable.split(",").map(Number);

  return allowedGroupIds.includes(groupId) || environmentVariable === "*";
};

export default { enableCreditAnticipation };

export const enablemacnai = () => {
  const { groupId } = getGroupAndUserIdFromState();
  const environmentVariable = getmacnaiGroupIds();
  const allowedGroupIds = environmentVariable.split(",").map(Number);

  return allowedGroupIds.includes(groupId) || environmentVariable === "*";
};
