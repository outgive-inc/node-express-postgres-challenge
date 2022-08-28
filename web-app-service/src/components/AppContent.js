import React, {useState, useEffect, useContext} from 'react';
import { TaskContext } from '../App';
import { GetTasks } from '../services/tasks.service';
import styles from '../styles/modules/app.module.scss';
import TaskItem from './TaskItem';



function AppContent() {

  const [taskList, setTaskList] = useContext(TaskContext);
  
  return (
    <div className={styles.content__wrapper}>
      {
        taskList && taskList.length > 0 ? (
           taskList.map((task, index) => (
          <TaskItem task={task} key={task.taskid} />
        
          ))) 
        :
        
        "No Tasks Found!"
      }
        
    </div>
  );
}

export default AppContent
