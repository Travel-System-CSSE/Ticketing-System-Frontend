import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import AddRoute from "./components/Manager/Sub-Components/AddRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import ManagerDashboard from "./pages/ManagerDashboard";

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
