import axios from "axios";
import setLoading from "./loadingManager";
import { ALL_TASK_LOADED, TASK_LOADED } from "./types";

export const loadTasks = () => (dispatch) => {
  setLoading(true);
  axios
    .get(process.env.REACT_APP_API + `/tasks/`)
    .then((result) => {
      setLoading(false);
      dispatch({
        type: ALL_TASK_LOADED,
        payload: result,
      });
    })
    .catch((err) => {
      setLoading(false);
      console.log("Error", err);
    });
};

export const loadTask = (id) => (dispatch) => {
  setLoading(true);
  axios
    .get(process.env.REACT_APP_API + `/tasks/${id}`)
    .then((result) => {
      setLoading(false);
      dispatch({
        type: TASK_LOADED,
        payload: result.data[0],
      });
    })
    .catch((err) => {
      setLoading(false);
      console.log("Error", err);
    });
};

export const deleteTask = (id) => (dispatch) => {
  setLoading(true);
  axios
    .delete(process.env.REACT_APP_API + `/tasks/${id}`)
    .then((result) => {
      setLoading(false);
      dispatch(loadTasks());
    })
    .catch((err) => {
      setLoading(false);
      console.log("Error", err);
    });
};

export const createTask = (body, history) => (dispatch) => {
  setLoading(true);
  axios
    .post(process.env.REACT_APP_API + `/tasks/`, body)
    .then((result) => {
      setLoading(false);
      history.push("/");
      dispatch(loadTasks());
    })
    .catch((err) => {
      setLoading(false);
      console.log("Error", err);
    });
};

export const editTask = (body, id, history) => (dispatch) => {
  setLoading(true);
  axios
    .put(process.env.REACT_APP_API + `/tasks/${id}`, body)
    .then((result) => {
      setLoading(false);
      history.push("/");
      dispatch(loadTasks());
    })
    .catch((err) => {
      setLoading(false);
      console.log("Error", err);
    });
};
