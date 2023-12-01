import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

import Register from "../src/Components/Register/Register";
import Login from "../src/Components/Login/Login";
import Account from "../src/Components/Account/Account";
import Home from "./Components/Home/Home";
import PageNotFound from "../../client/src/Components/PageNotFound/PageNotFound";
import AddApartment from "../src/Components/Account/AddApartment/AddApartment";
import AddTenant from "./Components/Account/AddTenant/AddTenant";
import AllApartments from "../src/Components/Account/AllApartments/AllApartment";
import EditApartment from "./Components/Account/EditApartments/EditApartment";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Account />} />
          <Route path="/add_apartment" element={<AddApartment />} />
          <Route path="/add_tenant" element={<AddTenant />} />
          <Route path="/all_apartments" element={<AllApartments />} />
          <Route path="/edit_apartment" element={<EditApartment />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
