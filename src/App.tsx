import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import SearchResults from "./Pages/SearchResults";
import Payment from "./Pages/Payment";
import AdminDashboard from "./Pages/AdminDashboard";

import Profile from "./Pages/Profile";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<About />} path="/about" />
        <Route element={<ContactUs />} path="/contact" />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<SearchResults />} path="/search-results" />
        <Route element={<Payment />} path="/payment" />
        <Route element={<AdminDashboard />} path="/admin" />
      </Routes>
    </>
  );
};

export default App;
