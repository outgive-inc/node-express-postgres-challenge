import TaskGrid from './components/task-grid.component';
import dancing from './images/dance.gif'

function App() {
  return(
    <div className="App">
      <div className="title-bar-wrapper">
        <div className="title-bar">
          <span> Let's do some tasks</span>
          <img src={dancing} />
        </div>
      </div>
      <TaskGrid />
    </div>    
  );
};

export default App;
