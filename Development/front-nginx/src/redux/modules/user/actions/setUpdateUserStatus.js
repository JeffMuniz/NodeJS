import { updateUserStatus } from "src/api/user/userStatus";
import { simpleAction } from "@utils";
import ResponseError from "src/common/entities/ResponseError";

export const UPDATE_USER_STATUS_STARTED = "UPDATE_USER_STATUS_STARTED";
export const UPDATE_USER_STATUS_COMPLETED = "UPDATE_USER_STATUS_COMPLETED";
export const UPDATE_USER_STATUS_FAILED = "UPDATE_USER_STATUS_FAILED";

export const setUpdateUserStatus = ({
  userId,
  status,
  selectedReason,
  selectedGroupId,
  selectedSubGroupId,
  loggedUserId,
}) => async dispatch => {
  dispatch(simpleAction(UPDATE_USER_STATUS_STARTED));

  try {
    await updateUserStatus({
      userId,
      status,
      selectedReason,
      selectedGroupId,
      selectedSubGroupId,
      loggedUserId,
    });

    dispatch(simpleAction(UPDATE_USER_STATUS_COMPLETED));
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch(simpleAction(UPDATE_USER_STATUS_FAILED)(error));

    throw errorWithMessage;
  }
};
