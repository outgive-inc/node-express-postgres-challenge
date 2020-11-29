import React, { Component } from 'react';

 
class Task extends Component{
  constructor(props) {
    super(props);

    this.state = {
      completed: this.props.task.completed
    }
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {  
    return {completed: nextProps.task.completed};
  }

  updateTask = (e) => {
    this.props.showTaskForm(this.props.task, 'update');
  }

  deleteTask = (e) => {
    this.props.deleteTask(this.props.task.id);
  }

  toggleCompleted = (e) => {
    const task = {
      id: this.props.task.id,
      completed: e.target.checked
    }
    this.setState({
      completed: e.target.checked
    })
    this.props.updateTask(task);
  }

  render() {
    return (
      <div className='card-wrapper'>
        <div className='card'>
          <div className='front'>
            <h3 className={ this.state.completed ? 'completed-task' : ''}>
              {this.props.task.title}
            </h3>
          </div>
          <div className='back'>
            <button className="update-button" onClick={this.updateTask}>
              <i className="fa fa-pencil-square-o" />
            </button>
            <button className="delete-button" onClick={this.deleteTask}>
              <i className="fa fa-trash" />
            </button>
            <div className='title-div'>
              <h4 className={this.state.completed ? 'completed-task' : ''}>
                {this.props.task.title}
              </h4>
            </div>
            <br />
            <div className='details-div'>
              <p>   
                {this.props.task.details}
              </p>
            </div>
            <div className={'completed-div'}>
              <label>Completed:</label>
              <input type="checkbox" checked={this.state.completed} onChange={this.toggleCompleted} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Task;