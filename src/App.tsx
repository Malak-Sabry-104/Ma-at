import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";

const App = () => {
  return (
    <>
    <Routes>
      <Route element={<Home/>} path="/"/>
      <Route element={<About/>} path="/about"/>
    </Routes>
    </>
  );
};

export default App;
