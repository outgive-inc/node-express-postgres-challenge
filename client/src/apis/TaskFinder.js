import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/v1/tasks"
    : "http://localhost:3001/api/v1/tasks";

export default axios.create({
  baseURL,
});
