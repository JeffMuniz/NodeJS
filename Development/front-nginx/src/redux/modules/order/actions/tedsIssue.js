import * as orderApi from "src/api/order/order";
import { simpleAction } from "@utils";
import { tedIssueFromApi } from "src/api/dtos/order.dto";
import store from "src/redux/configureStore";
import {
  CHECK_FOR_TEDS_ISSUE_COMPLETED,
  CHECK_FOR_TEDS_ISSUE_FAILED,
} from "../reducer/orderReducer";

const tedsIssueCompleted = simpleAction(CHECK_FOR_TEDS_ISSUE_COMPLETED);
const tedsIssueFailed = simpleAction(CHECK_FOR_TEDS_ISSUE_FAILED);

export const checkForTEDsIssue = () => async dispatch => {
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

  try {
    const dependencies = { orderApi };

    const { status, data } = await dependencies.orderApi.checkForTEDsIssue({
      userId,
      groupId,
    });

    if (status === 200) {
      const result = tedIssueFromApi(data);

      dispatch(tedsIssueCompleted(result));

      return result;
    }
  } catch (err) {
    dispatch(tedsIssueFailed(err));

    return err;
  }
};
