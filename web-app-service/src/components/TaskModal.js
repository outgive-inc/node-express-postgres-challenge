import React, {useState, useContext, useEffect} from 'react';
import styles from '../styles/modules/modal.module.scss';
import {MdOutlineClose} from 'react-icons/md' 
import Button from './Button';
import toast from 'react-hot-toast'
import { AddTask } from '../services/tasks.service';
import { TaskContext } from '../App';
import { constants } from '../utils/constants';

function TaskModal({type, modalOpen, setModalOpen, task}) {

    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    const [status, setStatus] = useState(false)
    const [taskList, setTaskList] = useContext(TaskContext);

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        if(title == ''){
            toast.error("Title field is required")
            return
        }

        let payload = {
            title: title,
            details: details,
            completed: status
        }

        if(type == "Add"){
            await addTask(payload)
            toast.success('Task added successfully!')
            setTitle('')
            setModalOpen(false)
        }
        else{
            toast.success('Task updated successfully!')
        }
        
        setModalOpen(false)
        
      }
        
    const addTask = async (payload) => {
        await AddTask(payload).then((result) => {
            setTaskList([result.data, ...taskList])
         })
         .catch((error) => {});
    }

    useEffect(() => {
        if(type == "Update" && task){
            setTitle(task.title)
            setDetails(task.details)         
        }
    }, [type, modalOpen])

  return (
        
            modalOpen && (
        
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.closeButton} 
                        onClick={() => setModalOpen(false)}
                        onKeyDown={() => setModalOpen(false)}
                        tabIndex={0}
                        role="button"
                    >
                        <MdOutlineClose />
                    </div>
                    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                        <h1 className={styles.formTitle}>{type === "Update" ? "Update" : "Add"} Task</h1>
                        <label htmlFor={"title"}>
                            Title
                            <input type={"text"} id={"title"} value={title} onChange={(e) => { setTitle(e.target.value)}}/>
                        </label>
                        <label htmlFor={"description"}>
                            description
                            <textarea id="description" rows={2} onChange={(e) => { setDetails(e.target.value)}}>{task?.details}</textarea>
                        </label>
                        <label htmlFor={"title"}>
                            Status
                            <select name="status" id="status" value={status} onChange={(e) => { setStatus(e.target.value)}}>
                                <option value={false}>{constants.statusKey[constants.status.inprogress]}</option>
                                <option value={true}>{constants.statusKey[constants.status.complete]}</option>
                            </select>
                        </label>
                        <div className={styles.buttonContainer}>
                            <Button type={"submit"} variant={"primary"}>{type === "Update" ? "Update" : "Add"} Task</Button>
                            <Button type={"button"} variant={"secondary"} 
                            onClick={() => setModalOpen(false)}
                            onKeyDown={() => setModalOpen(false)}
                            >Cancel</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    
  );
}

export default TaskModal
