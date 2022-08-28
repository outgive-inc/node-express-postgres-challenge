
export const apiEndPoint = {
    tasks: "tasks"
}

const status = {
    complete: 1,
    inprogress: 0,
    all: -1
}

const statusKey = {
    [status.all]: "All",
    [status.complete]: "Complete",
    [status.inprogress]: "In Progress"
}

export const constants = {
    API_BASE_URL: "http://localhost:5000/api/",
    status:status,
    statusKey: statusKey
}
