import React from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children, role }) => { //ensures only certain routes are accessible only to authenticated users 
  const { user } = useAuth();
  if (!user || (role && user.role !== role)) {
    return <Navigate to="/login" />;
  }
 
  return children; 
};

const App = () => {
  return (
    <Router> 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />        
        <Route path="/products" element={<ProductList />} />
        <Route
          path="/add-product"
          element={
            <ProtectedRoute role="admin">
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <ProtectedRoute role="admin">
              <UpdateProduct />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App;