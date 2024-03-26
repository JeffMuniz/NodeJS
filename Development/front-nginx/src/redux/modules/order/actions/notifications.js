import * as api from "src/api/notifications/notifications";
import { orderNotificationFromApi } from "src/api/dtos/order.dto";
import store from "src/redux/configureStore";
import ResponseError from "src/common/entities/ResponseError";

export const getOrderNotifications = () => async () => {
  try {
    const {
      user: {
        profile: {
          data: { id: userId },
        },
      },
      selectedCompanyTree: {
        selectedGroup: { id: groupId },
      },
    } = store.getState();

    const { data } = await api.getOrderNotifications({ userId, groupId });

    return orderNotificationFromApi(data);
  } catch (error) {
    throw new ResponseError(error).getError();
  }
};
