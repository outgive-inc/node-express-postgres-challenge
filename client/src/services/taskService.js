import { apiUrl } from "../config.json";

export async function createTask(body) {
    try {
        const res = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (res.status === 200) {
            return Promise.resolve(res);
        } else {
            throw new Error(res.message);
        }
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function getAllTask() {
    try {
        const res = await fetch(apiUrl);
        if (res.status === 200) {
            const jsonData = await res.json();
            console.log(jsonData);
            return Promise.resolve(jsonData);
        } else {
            throw new Error(res.message);
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export async function updateTask(taskId, taskData) {
    try {
        const res = await fetch(`${apiUrl}/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData),
        });
        if (res.status === 200) {
            return res.message;
        }
    } catch (err) {
        return err;
    }
}

export async function deleteTask(id) {
    try {
        const res = await fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
        });
    } catch (err) {
        console.log(err.message);
    }
}
