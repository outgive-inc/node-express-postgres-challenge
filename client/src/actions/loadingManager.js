import { SET_LOADING } from "./types";
import store from "../store";

export default function setLoading(isLoading) {
  store.dispatch({
    type: SET_LOADING,
    payload: isLoading,
  });
}
