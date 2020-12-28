import Axios from 'axios'

export const axios = Axios.create({
    baseURL: "http://localhost:5001/api/v1",
    headers: {Auth: "Simple Auth"},
    timeout: 3000
})