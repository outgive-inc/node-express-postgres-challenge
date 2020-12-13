import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk'
import taskReducer from './redux/reducer/task';
import loggerMiddleware from './middlerware/logger';
import { Provider } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';


const rootReducer = combineReducers({
    taskReducer,
});


const client = axios.create({ //all axios can be used, shown in axios documentation
    baseURL:'http://localhost:5001',
    responseType: 'json'
});

const composedEnhancers = applyMiddleware(loggerMiddleware, thunkMiddleware, axiosMiddleware(client))
const store = createStore(rootReducer, undefined ,composedEnhancers);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
