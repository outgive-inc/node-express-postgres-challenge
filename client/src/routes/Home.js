import React from "react";
import Header from "../components/Header";
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";

const Home = () => {
  return (
    <div>
      <Header />
      <AddTask />
      <TaskList />
    </div>
  );
};

export default Home;
