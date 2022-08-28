import React, { useEffect, useState } from "react";
import AppContent from "./components/AppContent";
import AppHeader from "./components/AppHeader";
import PageTitle from "./components/PageTitle";
import { GetTasks } from "./services/tasks.service";
import style from './styles/modules/app.module.scss'
import {Toaster} from 'react-hot-toast'

export const TaskContext = React.createContext([]);

function App() {

  const [taskList, setTaskList] = useState([])
  
  const fetchTasks = async () => {
    await GetTasks()
      .then((result) => {
        setTaskList(result.data)
        console.log(result.data)
      })
      .catch((error) => {});
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <>
    <TaskContext.Provider value={[taskList, setTaskList]}>
      <div className="container">
        <PageTitle>Task App</PageTitle>
        <div className={style.app__wrapper}></div>
        <AppHeader />
        <AppContent />
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style:{
            fontSize:'1.4rem'
          }
        }}
      ></Toaster>
      </TaskContext.Provider>
    </>
    
  );
}

export default App;
