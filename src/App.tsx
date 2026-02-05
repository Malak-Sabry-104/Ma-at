import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";

const App = () => {
  return (
    <>
    <Routes>
      <Route element={<Home/>} path="/"/>
      <Route element={<About/>} path="/about"/>
      <Route element={<ContactUs/>} path="/contact"/>
    </Routes>
    </>
  );
};

export default App;
