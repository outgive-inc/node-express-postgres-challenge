import Task from "./Task";
import './Tasks.css'

export default function Tasks(props) {
  const { tasks, updateTask, deleteTask, editErrorMessage, setEditErrorMessage } = props;

  return (
    <div className="allTasksContainer">
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            taskInfo={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
            editErrorMessage={editErrorMessage}
            setEditErrorMessage={setEditErrorMessage}
          />
        );
      })}
    </div>
  );
}
