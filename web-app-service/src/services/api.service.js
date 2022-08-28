import axios from "axios";
import {constants} from "../utils/constants"


axios.defaults.baseURL = constants.API_BASE_URL;

axios.interceptors.response.use(
    response => response,
    error => {
        console.error(error)
        if (error.response && error.response.data) {
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
);

export const axiosService = axios;

export const api = axios.create({
    timeout: 60 * 1000
});

// api.interceptors.request.use((config) => {
//     let token = GetToken();
//     return {
//         ...config,
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     }
// }, (exc) => Promise.reject(exc));