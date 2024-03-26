import * as api from "src/api/notifications/notifications";
import ResponseError from "src/common/entities/ResponseError";
import { getDefaultParams } from "src/api/notifications/notifications";

export const getNotifications = ({ notificationType }) => () => {
  const { userId, groupId } = getDefaultParams();

  try {
    return api.getNotifications({
      userId,
      groupId,
      notificationType,
    });
  } catch (error) {
    throw new ResponseError(error).getError();
  }
};
