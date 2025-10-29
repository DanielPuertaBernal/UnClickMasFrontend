import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { gameService } from '../../services/api';

const Profile = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserRank();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchUserRank = async () => {
    try {
      setLoading(true);
      const data = await gameService.getLeaderboard();
      setLeaderboard(data);

      const rank = data.findIndex((p) => p.username === user?.username) + 1;
      setUserRank(rank);
    } catch (error) {
      console.error('Error al cargar datos del perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankBadge = () => {
    if (!userRank) return 'secondary';
    if (userRank === 1) return 'warning';
    if (userRank <= 3) return 'success';
    if (userRank <= 10) return 'primary';
    return 'secondary';
  };

  const getRankText = () => {
    if (!userRank) return 'Sin clasificar';
    if (userRank === 1) return '¡Primer lugar!';
    if (userRank <= 3) return '¡Top 3!';
    if (userRank <= 10) return '¡Top 10!';
    return `Posición #${userRank}`;
  };

  const getProgressToNextPlayer = () => {
    if (!userRank || userRank === 1) return null;

    const currentPlayer = leaderboard[userRank - 1];
    const nextPlayer = leaderboard[userRank - 2];

    if (!currentPlayer || !nextPlayer) return null;

    const difference = nextPlayer.totalpoints - currentPlayer.totalpoints;
    return difference;
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

  const pointsToNext = getProgressToNextPlayer();

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          {/* Tarjeta de perfil principal */}
          <div className="card shadow mb-4">
            <div className="card-body text-center p-4 p-md-5">
              <div className="avatar-large bg-primary text-white mb-3">
                {user?.username?.charAt(0).toUpperCase()}
              </div>

              <h2 className="mb-2">{user?.username}</h2>

              <span className={`badge bg-${getRankBadge()} fs-6 mb-3`}>
                {getRankText()}
              </span>

              <div className="row g-3 mt-4">
                <div className="col-6 col-md-4">
                  <div className="stat-card">
                    <i className="bi bi-star-fill text-warning fs-1"></i>
                    <h3 className="mt-2 mb-0">{user?.totalpoints?.toLocaleString() || 0}</h3>
                    <small className="text-muted">Puntos Totales</small>
                  </div>
                </div>

                <div className="col-6 col-md-4">
                  <div className="stat-card">
                    <i className="bi bi-trophy-fill text-primary fs-1"></i>
                    <h3 className="mt-2 mb-0">#{userRank || '-'}</h3>
                    <small className="text-muted">Posición Global</small>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="stat-card">
                    <i className="bi bi-people-fill text-success fs-1"></i>
                    <h3 className="mt-2 mb-0">{leaderboard.length}</h3>
                    <small className="text-muted">Jugadores Totales</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta de progreso */}
          {pointsToNext !== null && userRank > 1 && (
            <div className="card shadow mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">
                  <i className="bi bi-graph-up-arrow me-2"></i>
                  Progreso hacia el siguiente jugador
                </h5>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Te faltan <strong>{pointsToNext.toLocaleString()}</strong> puntos</span>
                  <span className="text-muted">#{userRank - 1}</span>
                </div>

                <div className="progress" style={{ height: '20px' }}>
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: '0%' }}
                    aria-valuenow="0"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    ¡Sigue clickeando!
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Logros y mensajes motivacionales */}
          <div className="card shadow mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">
                <i className="bi bi-award-fill me-2"></i>
                Estadísticas
              </h5>

              <div className="list-group list-group-flush">
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <i className="bi bi-hand-index-thumb me-2 text-primary"></i>
                    Clicks totales
                  </div>
                  <span className="badge bg-primary rounded-pill">
                    {user?.totalpoints?.toLocaleString() || 0}
                  </span>
                </div>

                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <i className="bi bi-graph-up me-2 text-success"></i>
                    Ranking
                  </div>
                  <span className={`badge bg-${getRankBadge()} rounded-pill`}>
                    #{userRank || '-'} de {leaderboard.length}
                  </span>
                </div>

                <div className="list-group-item">
                  <div className="alert alert-info mb-0">
                    <i className="bi bi-lightbulb-fill me-2"></i>
                    <strong>Consejo:</strong> ¡Sigue clickeando para escalar posiciones en el ranking!
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 🏆 Nueva sección de premios */}
          {user?.totalpoints > 12000 && (
            <div className="card shadow-lg border-success mt-4 mb-5">
              <div className="card-body text-center">
                <h4 className="text-success mb-3">
                  🎉 ¡Has desbloqueado la sección de premios!
                </h4>
                <p className="fs-5 fw-bold text-primary">12,000 puntos</p>
                <img
                  src="https://wallpapers.com/images/hd/surprised-mia-khalifa-photo-mmr7u8j9t127d2f9.jpg"
                  alt="Premio especial"
                  className="img-fluid rounded-4 shadow-sm"
                  style={{ maxWidth: '300px' }}
                />
              </div>
            </div>
          )}
          {user?.totalpoints > 20000 && (
            <div className="card shadow-lg border-success mt-4 mb-5">
              <div className="card-body text-center">
                <p className="fs-5 fw-bold text-primary">20,000 puntos</p>
                <p className="fs-6 text-muted">Eres todo un comeburra</p>
                <img
                  src="https://www.las2orillas.co/wp-content/uploads/2017/03/burras-580x400.jpg"
                  alt="Premio especial"
                  className="img-fluid rounded-4 shadow-sm"
                  style={{ maxWidth: '300px' }}
                />
              </div>
            </div>
            
          )}
        </div>
      </div>

      <style>{`
        .avatar-large {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          font-weight: bold;
        }

        .stat-card {
          padding: 1rem;
          border-radius: 8px;
          background-color: #f8f9fa;
        }

        @media (max-width: 576px) {
          .avatar-large {
            width: 80px;
            height: 80px;
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;
