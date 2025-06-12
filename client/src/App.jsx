import About from "./components/About";
import CreateTask from "./components/CreateTask";
import NavBar from "./components/NavBar";
import TaskDisplay from "./components/TaskDisplay";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router";
import Home from "./components/Home";
const App = () => {
  return (
    <div className="bg-slate-900 w-full min-h-screen">
      <div className="max-w-7xl mx-auto">
        <ToastContainer position="bottom-right" />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
