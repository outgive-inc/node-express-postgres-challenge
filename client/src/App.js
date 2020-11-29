import React, { Component } from 'react';
import TaskGrid from './components/task-grid.component';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      areDetailsVisible: false
    }
  }

  toggleDetailsVisibility = (e) => {
    let direction = this.state.areDetailsVisible ? 'rotateY(180deg)' : 'rotateY(0deg)'
    console.log(direction);
    document.getElementsByClassName('card')[0].style.transform = direction;
    
    console.log(document.getElementsByClassName('card')[0].style.transform);

    this.setState({
      areDetailsVisible: !this.state.areDetailsVisible
    });

  }

  render() {
    return (
      <div className="App">
        <h1>Tasks</h1>
        <button onClick={this.toggleDetailsVisibility}>Toggle</button>
        <TaskGrid />
      </div>    
    );
  }
}

export default App;
