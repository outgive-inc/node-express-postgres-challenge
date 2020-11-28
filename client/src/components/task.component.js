import React, { Component } from 'react';

 
class Task extends Component{
  constructor(props) {
    super(props);
  }
  
  updateTask = (e) => {
    this.props.showTaskForm(this.props.task, 'update');
  }

  deleteTask = (e) => {
    this.props.deleteTask(this.props.task.id);
  }

  render() {
    return (
      <div className='card-wrapper'>
        <div className='card'>
          <div className='front'>
            {this.props.task.title}
          </div>
          <div className='back'>
            <div className='title-div'>
              <h2>
                {this.props.task.title}
              </h2>
              <button onClick={this.updateTask}>
                <i className="fa fa-pencil-square-o" />
              </button>
              <button onClick={this.deleteTask}>
                <i className="fa fa-trash" />
              </button>
            </div>
            <br />
            <div className='details-div'>
              <p>   
                {this.props.task.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Task;