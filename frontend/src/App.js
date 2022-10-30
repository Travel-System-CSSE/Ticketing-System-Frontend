import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import Login from "./pages/Login";
import AddRoute from "./components/Manager/Sub-Components/AddRoute";
import ManagerDashboard from "./pages/ManagerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/ManagerDashboard"
          element={
            <ProtectedRoute>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addroute"
          element={
            <ProtectedRoute>
              <AddRoute />
            </ProtectedRoute>
          }
        />
        <Route path="/manager" element={<Login />} />
        <Route path="*" element={<div>NotFound</div>} />
      </Routes>
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        closeOnClick
        draggable
        limit={3}
      />
    </>
  );
};

export default App;
