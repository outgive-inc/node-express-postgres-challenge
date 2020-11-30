import React, { Component } from 'react';
import axios from 'axios';
import TaskForm from './task-form.component';
import Task from './task.component';

// set defaults
axios.defaults.baseURL = 'http://localhost:5001';

const blankTask = {
  title: '',
  details: ''
};


class TaskGrid extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      isTaskFormVisible: false,
      submitTarget: '',
      targetTask: blankTask
    };
  }

  componentDidMount() {
    this.updateTaskGrid();
  }

  updateTaskGrid = (e) => {
    //very inefficient for now, improve this next time
    axios.get('/api/v1/tasks/')
      .then(response => {
        this.setState({ tasks: response.data.tasks });
      })
      .catch( (error) => {
        console.log(error);
      });
  }

  showTaskForm = (task, onSubmitTarget) => {
    this.setState({ 
      isTaskFormVisible: true,
      targetTask: task,
      submitTarget: onSubmitTarget
    });
  }

  hideTaskForm = (e) => {
    this.setState({ isTaskFormVisible: false });
  }

  addTask = (newTask) => {
    axios.post('/api/v1/tasks/', newTask)
      .then( res => {
        if( res.data.result === 'success') this.updateTaskGrid();
      })
      .catch( e => alert(e));
  }
  
  updateTask = (updatedTask) => {
    axios.put(`/api/v1/tasks/${updatedTask.id}`, updatedTask)
      .then( res => {
        this.updateTaskGrid();
      })
      .catch( e => alert(e));
  }

  deleteTask = (taskId) => {
    axios.delete(`/api/v1/tasks/${taskId}`)
      .then( res => {
        this.updateTaskGrid();
      })
      .catch( e => alert(e));
  }

  // creates a list of tasks in current state
  taskList = () => {
    return this.state.tasks.map( (currentTask, i) =>  {
      return <Task task={currentTask} showTaskForm={this.showTaskForm} deleteTask={this.deleteTask} 
                   updateTask={this.updateTask} key={i} />;
    })
  }

  render() {
    return (
      <div>
        <div> 
          { this.taskList() }
          <div id='add-task-wrapper' className='card-wrapper'>
            <div id='add-task-card' className='card'>
              <div id='add-task-front' className='front'>
                <button onClick={ () => this.showTaskForm(blankTask,'add') } className='button-fa'>
                  <i className="fa fa-plus fa-5x"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <TaskForm isVisible={this.state.isTaskFormVisible}  exitTaskForm={this.hideTaskForm} 
                  onSubmit={this.state.submitTarget==='add' ? this.addTask : this.updateTask} 
                  task={this.state.targetTask} /> 
      </div>
    )
  }
}

export default TaskGrid;