import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!identifier || !password) {
      return;
    }

    setLoading(true);
    const result = await login(identifier, password);
    setLoading(false);

    if (result.success) {
      navigate('/game');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4 p-md-5">
              <h2 className="text-center mb-4">
                <i className="bi bi-cursor-fill me-2"></i>
                UnClickMas
              </h2>
              <h5 className="text-center text-muted mb-4">Iniciar Sesión</h5>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="identifier" className="form-label">
                    Email o Usuario
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="identifier"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Ingresa tu email o usuario"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Iniciando sesión...
                    </>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </button>
              </form>

              <div className="text-center">
                <p className="mb-0">
                  ¿No tienes cuenta?{' '}
                  <Link to="/register" className="text-decoration-none">
                    Regístrate aquí
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;