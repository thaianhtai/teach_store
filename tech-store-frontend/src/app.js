import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/client/homepage/HomePage';
import Register from './components/client/auth/Register';
import Login from './components/client/auth/Login';
import VerifyAccount from './components/client/auth/VerifyAccount';
import Layout from './components/client/partials/Layout';
import AdminLayout from './components/admin/partials/AdminLayout';
import Dashboard from './components/admin/Dashboard/Dashboard';
import AccountManagement from './components/admin/AccountManagement/AccountManagement'; // Import AccountManagement
import ProductManagement from './components/admin/ProductManagement/ProductManagement';
import { AuthProvider, useAuth } from './components/client/auth/AuthContext';
import Cart from './components/client/cart/CartPage';
import { AlertProvider } from './components/client/partials/Alert';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <AlertProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <Layout>
                  <HomePage />
                </Layout>
              }
            />
            <Route
              path="/register"
              element={
                <Layout>
                  <Register />
                </Layout>
              }
            />
            <Route
              path="/login"
              element={
                <Layout>
                  <Login />
                </Layout>
              }
            />
            <Route
              path="/verify-account"
              element={
                <Layout>
                  <VerifyAccount />
                </Layout>
              }
            />
            <Route
              path="/cart"
              element={
                <Layout>
                  <Cart />
                </Layout>
              }
            />
            {/* Admin Routes */}
            <Route
              path="/auth/*"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="account-management" element={<AccountManagement />} />
              <Route path="product-management" element={<ProductManagement />} />
            </Route>
          </Routes>
        </Router>
      </AlertProvider>
    </AuthProvider>
  );
};

export default App;
