// store.js
import React, { createContext, useReducer, useEffect } from "react";
const initialState = {
  data: [
    {
      id: 1,
      title: "Title #1",
      details: "Details #1",
      completed: false,
    },
    {
      id: 2,
      title: "Title #2",
      details: "Details #2",
      completed: false,
    },
    {
      id: 3,
      title: "Title #3",
      details: "Details #3",
      completed: false,
    },
    {
      id: 4,
      title: "Title #4",
      details: "Details #4",
      completed: false,
    },
  ],
  selectedItem: null,
};
const store = createContext(initialState);
const { Provider } = store;

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state, data: [...state.data, action.state] };
    case "DELETE":
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.state),
      };
    case "TOGGLE":
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === state.id) {
            return {
              ...item,
            };
          }
          return item;
        }),
      };
    case "UPDATE":
      console.log("action.data", action.data);
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.id === action.data.id) {
            return {
              ...item,
              ...action.data,
            };
          }
          return item;
        }),
      };
    case "DETAIL":
      return {
        ...state,
        selectedItem: action.data,
      };
    case "LIST":
      return {
        ...state,
        data: action.data.data,
      };
    default:
      throw new Error();
  }
};

let fetchInitial = (data) => ({
  type: "LIST",
  data,
});

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/tasks")
      .then((response) => response.json())
      .then((data) => dispatch(fetchInitial(data)));
  }, []);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider as ListProvider };
