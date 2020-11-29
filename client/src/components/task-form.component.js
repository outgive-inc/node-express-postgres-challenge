import React, { Component } from 'react';

class TaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      details: ''
    }
  }

  // update state handlers

  onChangeTitle = (e) => {
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
    // clear state on exit
    this.setState({
      title: '',
      details: ''
    });

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
              <form onSubmit={this.onSubmit}>
                <input name="title" placeholder="Title" type="text" onChange={this.onChangeTitle} defaultValue={this.props.task.title} />
                <input name="details" placeholder="Details" type="text" onChange={this.onChangeDetails} defaultValue={this.props.task.details}/>
                <input type="submit" value="Submit Task" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TaskForm;