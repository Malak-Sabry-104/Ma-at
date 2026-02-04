import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";

const App = () => {
  return (
    <>
    <Routes>
      <Route element={<Home/>} path="/"/>
    </Routes>
    </>
  );
};

export default App;
