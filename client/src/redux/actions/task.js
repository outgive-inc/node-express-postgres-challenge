import {
    LOAD_TASKS_REQUESTING,
    LOAD_TASKS_REQUESTING_SUCCESS,
    LOAD_TASKS_REQUESTING_FAILED,

    ADD_TASKS_REQUESTING,
    ADD_TASKS_REQUESTING_SUCCESS,
    ADD_TASKS_REQUESTING_FAILED,

    EDIT_TASKS_REQUESTING,
    EDIT_TASKS_REQUESTING_SUCCESS,
    EDIT_TASKS_REQUESTING_FAILED,

    DELETE_TASKS_REQUESTING,
    DELETE_TASKS_REQUESTING_SUCCESS,
    DELETE_TASKS_REQUESTING_FAILED
} from "../../util/actionTypes";
import qs from "qs";

export const getTaskList = (limit, offset) => ({
    type: LOAD_TASKS_REQUESTING,
    payload: {
      request: {
        method: "get",
        url: `/api/v1/tasks?page=${offset}&limit=${limit}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "no-cache",
        }
      },
      options: {
        async onSuccess({ dispatch, response }) {
          dispatch({ type: LOAD_TASKS_REQUESTING_SUCCESS, payload: { data: response.data.data.data, count: response.data.data.count}});
        },
        onError({ dispatch, error }) {
          dispatch({type: LOAD_TASKS_REQUESTING_FAILED,payload: error.response.data });
        },
      },
  },
});

export const addTask = (title, details) => ({
  type: ADD_TASKS_REQUESTING,
  payload: {
    request: {
      method: "post",
      url: `/api/v1/tasks`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
      },
      data: qs.stringify({
        title,
        details
      }),
    },
    options: {
      async onSuccess({ getState, dispatch , response }) {
        const { taskReducer } = await getState();
        const { data, count } = taskReducer;

        let tempCount = count;
        tempCount += 1;

        let tempArray = data;
        console.log(response.data.data.data);
        if(tempArray.length < 10) {
          tempArray.push(response.data.data.data);
        }
        
        dispatch({ type: ADD_TASKS_REQUESTING_SUCCESS, payload: { data: tempArray, count: tempCount }});
      },
      onError({ dispatch, error }) {
        dispatch({type: ADD_TASKS_REQUESTING_FAILED,payload: error.response.data });
      },
    },
 },
});

export const updateTask = (id, title, details, completed) => ({
  type: EDIT_TASKS_REQUESTING,
  payload: {
    request: {
      method: "put",
      url: `/api/v1/tasks/${id}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
      },
      data: qs.stringify({
        title,
        details,
        completed
      }),
    },
    options: {
      async onSuccess({ getState, dispatch, response }) {
        const { taskReducer } = await getState();
        const { data, count } = taskReducer;

        let tempArray = [...data];
        let item = response.data.data.data;
        console.log(response.data);
        for(var i = 0; i < tempArray.length; i++) {
          if (tempArray[i].id === id) {
            tempArray[i] = item;
          }
        }

        dispatch({ type: EDIT_TASKS_REQUESTING_SUCCESS, payload: { data: tempArray, count: count }});
      },
      onError({ dispatch, error }) {
        dispatch({type: EDIT_TASKS_REQUESTING_FAILED,payload: error.response.data });
      },
    },
 },
});

export const deleteTask = (id) => ({
  type: DELETE_TASKS_REQUESTING,
  payload: {
    request: {
      method: "delete",
      url: `/api/v1/tasks/${id}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache"
      }
    },
    options: {
      async onSuccess({ dispatch, getState, response }) {
        const { taskReducer } = await getState();
        const { data, count } = taskReducer;

        let tempArray = [...data];

        let tempCount = count;
        tempCount -= 1;

        for(var i = 0; i < tempArray.length; i++) {
          
          if (tempArray[i].id === id) {
            console.log(tempArray[i]);
            tempArray.splice(i, 1)
          }
        }

        dispatch({ type: DELETE_TASKS_REQUESTING_SUCCESS, payload: { data: tempArray, count: tempCount }});
      },
      onError({ dispatch, error }) {
        dispatch({type: DELETE_TASKS_REQUESTING_FAILED,payload: error.response.data });
      },
    },
 },
});