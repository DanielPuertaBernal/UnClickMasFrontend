import React, { useState, useEffect } from 'react';
import { gameService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await gameService.getLeaderboard();
      setLeaderboard(data);
    } catch (error) {
      console.error('Error al cargar el ranking:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMedalIcon = (position) => {
    switch (position) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${position}`;
    }
  };

  const getMedalClass = (position) => {
    switch (position) {
      case 1:
        return 'bg-warning bg-opacity-25';
      case 2:
        return 'bg-secondary bg-opacity-25';
      case 3:
        return 'bg-danger bg-opacity-25';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center py-3">
              <h2 className="mb-0">
                <i className="bi bi-trophy-fill me-2"></i>
                Tabla de Clasificación
              </h2>
            </div>
            <div className="card-body p-0">
              <div className="d-flex justify-content-between align-items-center p-3 bg-light">
                <h5 className="mb-0">Top 10 Global</h5>
                <button
                  onClick={fetchLeaderboard}
                  className="btn btn-sm btn-outline-primary"
                >
                  <i className="bi bi-arrow-clockwise me-1"></i>
                  Actualizar
                </button>
              </div>

              {leaderboard.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-inbox fs-1 text-muted"></i>
                  <p className="text-muted mt-3">No hay datos aún</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '80px' }} className="text-center">
                          Posición
                        </th>
                        <th>Jugador</th>
                        <th className="text-end">Puntos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.slice(0, 10).map((player, index) => {
                        const position = index + 1;
                        const isCurrentUser = player.username === user?.username;

                        return (
                          <tr
                            key={player.username}
                            className={`${getMedalClass(position)} ${
                              isCurrentUser ? 'border-start border-primary border-3' : ''
                            }`}
                          >
                            <td className="text-center fw-bold fs-5">
                              {getMedalIcon(position)}
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="avatar-circle bg-primary text-white me-2 d-none d-sm-flex">
                                  {player.username.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className={`${isCurrentUser ? 'fw-bold' : ''}`}>
                                    {player.username}
                                    {isCurrentUser && (
                                      <span className="badge bg-primary ms-2">Tú</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="text-end fw-bold text-primary">
                              {player.totalpoints.toLocaleString()}
                              <i className="bi bi-star-fill ms-2 text-warning"></i>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Mostrar posición del usuario si no está en el top 10 */}
          {user && leaderboard.findIndex((p) => p.username === user.username) >= 10 && (
            <div className="card shadow mt-3">
              <div className="card-body">
                <h6 className="text-muted mb-2">Tu posición:</h6>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="fw-bold fs-5">
                      #{leaderboard.findIndex((p) => p.username === user.username) + 1}
                    </span>
                    <span className="ms-3">{user.username}</span>
                  </div>
                  <span className="fw-bold text-primary">
                    {user.totalpoints.toLocaleString()} puntos
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .avatar-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
        }
        
        @media (max-width: 576px) {
          .table {
            font-size: 0.9rem;
          }
        }
        `}</style>
    </div>
    );
};
export default Leaderboard;