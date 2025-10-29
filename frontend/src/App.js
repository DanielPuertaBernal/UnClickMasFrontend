import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import GameButton from './components/Game/GameButton';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Profile from './components/Profile/Profile';
import { SpeedInsights } from "@vercel/speed-insights/react"

// Componente para rutas protegidas
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

// Componente para rutas públicas (cuando ya está autenticado)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return user ? <Navigate to="/game" /> : children;
};

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="app-container">
      <SpeedInsights />
      {user && <Navbar />}
      
      <Routes>
        {/* Rutas públicas */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Rutas protegidas */}
        <Route
          path="/game"
          element={
            <PrivateRoute>
              <GameButton />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <Leaderboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* Redirección por defecto */}
        <Route path="/" element={<Navigate to="/game" />} />
        <Route path="*" element={<Navigate to="/game" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;