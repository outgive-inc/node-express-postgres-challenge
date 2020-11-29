import React, { Component } from 'react';

class TaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      details: '',
      isValidTask: false,
      currTaskProp: {
        title: this.props.task.title,
        details: this.props.task.details
      }
    }
    
    this.baseState = this.state;
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = {}

    if(nextProps.task.title !== prevState.currTaskProp.title){
      newState.title = nextProps.task.title;
      if(nextProps.task.title.length > 0) newState.isValidTask = true;
    } 
    if(nextProps.task.details !== prevState.currTaskProp.details) newState.details = nextProps.task.details;

    newState.currTaskProp = {
      title: nextProps.task.title,
      details: nextProps.task.details
    }
    
    return newState;
  }
  // update state handlers

  onChangeTitle = (e) => {
    if(e.target.value.length < 1){
      console.log("it's less than 1!!")
      this.setState({isValidTask: false})
    }
    else{
      this.setState({isValidTask: true})
    }
    this.setState({
      title: e.target.value
    });
  }

  onChangeDetails = (e) => {
    this.setState({
      details: e.target.value
    });
  }



  // submit form to the props sent my parent component
  onSubmit = (e) => {
    e.preventDefault();
    //  create object that will be used to create/update a task
    //  id attribute gets rejected in the backend (both update and create), it is only used for identification of which task to update
    const task = {
      id: this.props.task.id,
      title: this.state.title,
      details: this.state.details
    }
  
    this.props.onSubmit(task);
    this.props.exitTaskForm();
  }

  onExit = () => {
    this.setState({
      title: '',
      details: ''
    })

    this.props.exitTaskForm();
  }

  render() {
    if(!this.props.isVisible) {
      return null;
    }
    return(
      <div className="add-task-container">
        <div className="flex">
          <div className="add-task modal">
            <div className="form-card">
              <div className="close"> 
                <button onClick={this.onExit} >
                  <i className="fa fa-times fa-2x" />
                </button>
              </div>
              <form name="task-form" onSubmit={this.onSubmit}>
                <span style={{display: this.state.isValidTask ? "none" : "block"}} id="title-not-valid">* a title is required!</span>
                <input name="title" required placeholder="Title" type="text" onChange={this.onChangeTitle} defaultValue={this.props.task.title} />
                <input name="details" placeholder="Details" type="text" onChange={this.onChangeDetails} defaultValue={this.props.task.details} />
                <input disabled={!this.state.isValidTask} type="submit" htmlFor="task-form" value="Submit Task" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TaskForm;