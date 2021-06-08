import { useState, useEffect} from 'react';
import Tasks from './components/Tasks';
import TaskModal from './components/TaskModal';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [ tasks, setTasks ] = useState([]);
  const [ filteredTasks, setFilteredTasks ] = useState([]);
  const [ search, setSearch ] = useState("");
  const [ loading, setLoading ] = useState(true);
  const [ showCreateModal, setShowCreateModal ] = useState(false);
  const [ createErrorMessage, setCreateErrorMessage ] = useState("");
  const [ editErrorMessage, setEditErrorMessage ] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/tasks`)
    .then(res => {
      setLoading(false);
      return res.json()
    })
    .then(res => {
      setTasks(res);
      setFilteredTasks(res);
    })
    .catch(err => {console.log('ERROR!', err)})

  }, []);

  const createTask = async (title, details, completed) => {
    // Validation. Title is required for task to be created.
    if (title.length === 0) {
      setCreateErrorMessage("Title required.");
      return;
    }
    const postObj = { title, details, completed };
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(postObj)
    });
    const data = await res.json();
    setTasks([...tasks, data]);
    if (data.title.toLowerCase().includes(search.toLowerCase())) {
      setFilteredTasks([...filteredTasks, data])
    }
    setCreateErrorMessage("");
    setShowCreateModal(false);
  }

  const deleteTask = async (taskId) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({taskId})
    });
    const data = await res.json();
    setTasks([...tasks].filter(task => task.id !== data.id));
    if (data.title.toLowerCase().includes(search.toLowerCase())) {
      setFilteredTasks([...filteredTasks].filter(task => task.id !== data.id));
    }
  }

  const updateTask = async (taskId, title, details, completed) => {
    // Validation. Title is required for task to be updated.
    if (title.length === 0) {
      setEditErrorMessage("Title required.");
      return;
    }
    const postObj = {taskId, title, details, completed};
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/tasks/${taskId}`, {
      method: 'put',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(postObj)
    });
    const data = await res.json();
    setTasks([...tasks].map(task => task.id === data.id ? data : task));
    // If the updated task's title includes the search term, rerender tasks with the updated title
    // Else filter that task out of the filteredTasks array
    if (data.title.toLowerCase().includes(search.toLowerCase())) {
      setFilteredTasks([...filteredTasks].map(task => task.id === data.id ? data : task));
    } else {
      setFilteredTasks([...filteredTasks].filter(task => task.id !== data.id))
    }
    setEditErrorMessage("");
  }

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setCreateErrorMessage("");
  }

  const handleSearch = (term) => {
    const filtered = tasks.filter(task => {
      return task.title.toLowerCase().includes(term.toLowerCase());
    })
    setFilteredTasks(filtered);
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <SearchBar search={search} setSearch={setSearch} handleSearch={handleSearch}/>
      {loading && <h1>Loading data from server. Please wait.</h1>}
      {!loading && tasks.length === 0 && <h1>No tasks to display. Start by creating a new task!</h1>}
      <button id="return-button" onClick={setShowCreateModal}><i className="fas fa-plus"></i></button>
      
      {/* For Add Task Form */}
      <TaskModal
        showCreateModal={showCreateModal} 
        onClose={closeCreateModal} 
        header="Add New Task"
        createTask={createTask}
        createErrorMessage={createErrorMessage}
      />

      {/* Renders all tasks and Edit Task Form for each task*/}
      <Tasks 
        // tasks={tasks} 
        tasks={search.length === 0 ? tasks : filteredTasks}
        updateTask={updateTask} 
        deleteTask={deleteTask} 
        editErrorMessage={editErrorMessage} 
        setEditErrorMessage={setEditErrorMessage}
      />
    </div>
  );
}

export default App;
