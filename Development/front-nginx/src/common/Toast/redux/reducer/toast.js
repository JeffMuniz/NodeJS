import { SHOW_TOAST } from "../actions/toast";

const initialState = {
  toast: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_TOAST:
      return { ...state, toast: action.payload };
    default:
      return state;
  }
}
