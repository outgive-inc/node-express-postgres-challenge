import {
  LOAD_TASKS_REQUESTING,
  LOAD_TASKS_REQUESTING_SUCCESS,
  LOAD_TASKS_REQUESTING_FAILED,

  ADD_TASKS_REQUESTING,
  ADD_TASKS_REQUESTING_SUCCESS,
  ADD_TASKS_REQUESTING_FAILED,

  DELETE_TASKS_REQUESTING,
  DELETE_TASKS_REQUESTING_SUCCESS,
  DELETE_TASKS_REQUESTING_FAILED
} from "../../util/actionTypes";

const initialState = {
  data: [],
  isRequesting: false,
  error: {},
  count: 0,
  isLoaded: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

  case DELETE_TASKS_REQUESTING:
    return {
      ...state,
      isRequesting: true,
    };
  case DELETE_TASKS_REQUESTING_SUCCESS:
    return {
      ...state,
      data: action.payload.data,
      count: action.payload.count,
      isRequesting: false
    };
  case DELETE_TASKS_REQUESTING_FAILED:
      return {
        ...state,
        error: action.payload,
        isRequesting: false
      };
      
    case LOAD_TASKS_REQUESTING:
      return {
        ...state,
        isRequesting: true,
      };
    case LOAD_TASKS_REQUESTING_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        count: action.payload.count,
        isRequesting: false,
        isLoaded: true
      };
    case LOAD_TASKS_REQUESTING_FAILED:
        return {
          ...state,
          error: action.payload,
          isRequesting: false
        };

      case ADD_TASKS_REQUESTING:
        return {
          ...state,
          isRequesting: true,
        };
      case ADD_TASKS_REQUESTING_SUCCESS:
        return {
          ...state,
          data: action.payload.data,
          count: action.payload.count,
          isRequesting: false
        };
      case ADD_TASKS_REQUESTING_FAILED:
          return {
            ...state,
            isRequesting: false
          };
    default:
      return state;
  }
};

export default reducer;
