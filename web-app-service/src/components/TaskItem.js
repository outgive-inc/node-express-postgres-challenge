import React, {useContext, useState, useEffect} from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import toast from 'react-hot-toast'
import { DeleteTask, UpdateTask } from '../services/tasks.service';
import { TaskContext } from '../App';
import TaskModal from './TaskModal';
import CheckButton from './CheckButton';
import { constants } from '../utils/constants';


function TaskItem({task}) {

    const [taskList, setTaskList] = useContext(TaskContext);
    const [updateModalOpen, setUpdateModalOpen] = useState(false)
    const [checked, setChecked] = useState(false)

    const handleDelete = async (id) => {
        await deleteTask(id)
        toast.success('Task deleted successfully!')
    }

    const handleEdit = (id) => {
        setUpdateModalOpen(true)
    }

    const deleteTask = async (id) => {
        await DeleteTask(id).then((result) => {
            let tasks = taskList.filter((task) => {return task.taskid !== id})
            setTaskList(tasks)
         })
         .catch((error) => {});
    }

    const updateTask = async (id, payload) => {
        await UpdateTask(id, payload).then((result) => {
            console.log(result)
         })
         .catch((error) => {});
         toast.success('Task updated successfully!')
    }

    const handleCheckButton = (e, id) => {
        let payload = {
            completed: !checked
        }
        
        setChecked(!checked); 
        updateTask(id, payload)
    }

    useEffect(() => {
        if(task.completed === true){
            setChecked(true)
        }
    }, [])

  return (
    <>
        <div className={styles.item}>
            <div className={styles.todoDetails} onClick={() => setUpdateModalOpen()}>
                 <CheckButton checked={checked} handleCheck={(e) => handleCheckButton(e, task.taskid)} />
                <div className={styles.texts}>
                    <p
                    className={getClasses([
                        styles.todoText,
                        task.completed === true && styles['todoText--completed'],
                    ])}
                    >
                    {task.title}
                    </p>
                
                </div>
            </div>
            <div className={styles.todoActions}>
                <div className={styles.icon}>
                    <MdDelete 
                        onClick={(e) => handleDelete(task.taskid)}
                    />
                </div>
                <div className={styles.icon}>
                    <MdEdit 
                        onClick={(e) => handleEdit(task.taskid)}
                    />
                </div>
            </div>
        </div>
        <TaskModal type="Update" task={task} modalOpen={updateModalOpen} setModalOpen={setUpdateModalOpen}/>
    </>

  );
}

export default TaskItem
