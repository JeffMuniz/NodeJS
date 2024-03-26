import { requestStatus } from "@enums";

export const CREATE_REPORT_STARTED = "project/report/CREATE_REPORT_STARTED";
export const CREATE_REPORT_FAILED = "project/report/CREATE_REPORT_FAILED";
export const CREATE_REPORT_COMPLETED = "project/report/CREATE_REPORT_COMPLETED";

export const FIND_ALL_REPORTS_STARTED =
  "project/report/FIND_ALL_REPORTS_STARTED";
export const FIND_ALL_REPORTS_FAILED = "project/report/FIND_ALL_REPORTS_FAILED";
export const FIND_ALL_REPORTS_COMPLETED =
  "project/report/FIND_ALL_REPORTS_COMPLETED";

export const DELETE_SELECTED_REPORTS_STARTED =
  "project/report/DELETE_SELECTED_REPORTS_STARTED";
export const DELETE_SELECTED_REPORTS_FAILED =
  "project/report/DELETE_SELECTED_REPORTS_FAILED";
export const DELETE_SELECTED_REPORTS_COMPLETED =
  "project/report/DELETE_SELECTED_REPORTS_COMPLETED";

export const DOWNLOAD_ONE_REPORT_STARTED =
  "project/report/DOWNLOAD_ONE_REPORT_STARTED";
export const DOWNLOAD_ONE_REPORT_FAILED =
  "project/report/DOWNLOAD_ONE_REPORT_FAILED";
export const DOWNLOAD_ONE_REPORT_COMPLETED =
  "project/report/DOWNLOAD_ONE_REPORT_COMPLETED";

const initialState = {
  requestStatus: requestStatus.none,
  error: null,
  data: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_REPORT_STARTED: {
      return {
        ...state,
        requestStatus: requestStatus.loading,
        disableActions: false,
        error: null,
      };
    }
    case CREATE_REPORT_FAILED: {
      return {
        ...state,
        requestStatus: requestStatus.error,
        error: payload,
      };
    }
    case CREATE_REPORT_COMPLETED: {
      return {
        ...state,
        requestStatus: requestStatus.success,
        error: null,
      };
    }
    case FIND_ALL_REPORTS_STARTED: {
      return {
        ...state,
        requestStatus: requestStatus.loading,
        disableActions: false,
        error: null,
        data: {},
      };
    }
    case FIND_ALL_REPORTS_FAILED: {
      return {
        ...state,
        requestStatus: requestStatus.error,
        error: payload,
        data: {},
      };
    }
    case FIND_ALL_REPORTS_COMPLETED: {
      return {
        ...state,
        requestStatus: requestStatus.success,
        error: null,
        data: payload,
      };
    }
    case DELETE_SELECTED_REPORTS_STARTED: {
      return {
        ...state,
        requestStatus: requestStatus.loading,
        error: null,
      };
    }
    case DELETE_SELECTED_REPORTS_FAILED: {
      return {
        ...state,
        requestStatus: requestStatus.error,
        error: payload,
      };
    }
    case DELETE_SELECTED_REPORTS_COMPLETED: {
      return {
        ...state,
        requestStatus: requestStatus.success,
        error: null,
      };
    }
    case DOWNLOAD_ONE_REPORT_STARTED: {
      return {
        ...state,
        requestStatus: requestStatus.loading,
        error: null,
      };
    }
    case DOWNLOAD_ONE_REPORT_FAILED: {
      return {
        ...state,
        requestStatus: requestStatus.error,
        error: payload,
      };
    }
    case DOWNLOAD_ONE_REPORT_COMPLETED: {
      return {
        ...state,
        requestStatus: requestStatus.success,
        error: null,
      };
    }
    default:
      return state;
  }
};
