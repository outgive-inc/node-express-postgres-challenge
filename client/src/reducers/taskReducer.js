import { TASK_LOADED, ALL_TASK_LOADED, SET_LOADING } from "../actions/types";

const initialState = {
  tasks: [],
  task: {},
  setLoading: true,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case TASK_LOADED:
      return {
        ...state,
        task: action.payload,
      };
    case ALL_TASK_LOADED:
      return {
        ...state,
        tasks: action.payload.data,
      };
    case SET_LOADING:
      return {
        ...state,
        setLoading: action.payload,
      };
    default:
      return state;
  }
}
