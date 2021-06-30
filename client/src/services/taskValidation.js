export async function validateTask(taskData) {
    const title = taskData.title.trim();
    const details = taskData.details.trim();

    if (title.length < 3) {
        return {
            isValid: false,
            message: "Title must be at least of 3 Characters ",
        };
    } else if (details.length < 3) {
        return {
            isValid: false,
            message: "Details must be at least of 3 Characters ",
        };
    } else {
        return {
            isValid: true,
            message: "values are valid",
        };
    }
}
