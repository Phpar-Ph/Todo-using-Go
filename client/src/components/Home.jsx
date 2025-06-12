import React from "react";
import CreateTask from "./CreateTask";
import TaskDisplay from "./TaskDisplay";

const Home = () => {
  return (
    <div>
      <CreateTask />
      <TaskDisplay />
    </div>
  );
};

export default Home;
