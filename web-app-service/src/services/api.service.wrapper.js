import {api, axiosService} from "./api.service"
import {constants} from "../utils/constants";

export const getBaseUrl = () => {
    return constants.API_BASE_URL;
}

export const POST = async (url, data = null, config = null) => {
    var res = await api.post(getBaseUrl() + url, data, config)
    return res?.data
}

export const GET = async (url, params = null) => {
    var res = await api.get(getBaseUrl() + url, {
        params
    });
    return res?.data
}

export const PUT = async (url, id, data = null, config = null) => {
    var res = await api.put(getBaseUrl() + url + "/" + id, data, config)
    return res?.data
}

export const DELETE = async (url, id) => {
    var res = await api.delete(getBaseUrl() + url + "/" + id);
    return res?.data
}