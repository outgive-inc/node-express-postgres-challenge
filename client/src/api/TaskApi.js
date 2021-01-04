import Axios from "axios";
const END_POINT = "http://localhost:5001";
export default {
	async getAll(params) {
		return await Axios.get(`${END_POINT}/api/v1/tasks`, { params });
	},

	async get(params) {
		return await Axios.get(`${END_POINT}/api/v1/tasks`, { params });
	},

	async insert(data) {
		return await Axios.post(`${END_POINT}/api/v1/tasks`, data);
	},

	async update(data) {
		return await Axios.put(`${END_POINT}/api/v1/tasks/${data.id}`, data);
	},

	async delete(data) {
		return await Axios.delete(`${END_POINT}/api/v1/tasks/${data.id}`);
	},
};
