import Tasks from "./components/TasksWidget/tasks";
import { GlobalContext } from './contexts/GlobalContext';
import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {

  const globalContext = {
    apiEndpoint: "http://localhost:5001/api",
  }

  return (
    <div className="App">
      <ToastContainer autoClose={3000} />
      <GlobalContext.Provider value={globalContext}>
        <Tasks />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
