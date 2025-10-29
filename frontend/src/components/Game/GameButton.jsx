import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { gameService } from '../../services/api';
import Swal from 'sweetalert2';

const GameButton = () => {
  const { user, updateUserPoints } = useAuth();
  const [clicks, setClicks] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [savedClicks, setSavedClicks] = useState(0);

  useEffect(() => {
    // Guardar puntos cada 10 clicks
    if (clicks > 0 && clicks % 10 === 0 && clicks !== savedClicks) {
      savePoints();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clicks]);

  const handleClick = () => {
    setClicks(clicks + 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 150);
  };

  const savePoints = async () => {
    try {
      const pointsToSave = clicks - savedClicks;
      const response = await gameService.addPoints(pointsToSave);
      setSavedClicks(clicks);
      updateUserPoints(response.totalpoints);
      
      // Mostrar notificación pequeña
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      
      Toast.fire({
        icon: 'success',
        title: `¡${pointsToSave} puntos guardados!`,
      });
    } catch (error) {
      console.error('Error al guardar puntos:', error);
    }
  };

  const handleManualSave = async () => {
    if (clicks === savedClicks) {
      Swal.fire({
        icon: 'info',
        title: 'No hay puntos nuevos',
        text: 'Haz más clicks para guardar puntos',
        timer: 2000,
      });
      return;
    }

    await savePoints();
  };

  return (
    <div className="container">
      <div className="row justify-content-center min-vh-100 align-items-center py-4">
        <div className="col-12 col-lg-8">
          <div className="card shadow-lg">
            <div className="card-body text-center p-4 p-md-5">
              <h2 className="mb-4">
                <i className="bi bi-trophy-fill text-warning me-2"></i>
                ¡A Clickear!
              </h2>
              
              <div className="mb-4">
                <h3 className="text-muted mb-2">Hola, {user?.username}</h3>
                <div className="d-flex justify-content-center gap-4 flex-wrap">
                  <div>
                    <small className="text-muted d-block">Puntos Totales</small>
                    <h4 className="text-primary mb-0">{user?.totalpoints || 0}</h4>
                  </div>
                  <div>
                    <small className="text-muted d-block">Clicks en sesión</small>
                    <h4 className="text-success mb-0">{clicks}</h4>
                  </div>
                  <div>
                    <small className="text-muted d-block">Sin guardar</small>
                    <h4 className="text-warning mb-0">{clicks - savedClicks}</h4>
                  </div>
                </div>
              </div>

              <div className="my-5">
                <button
                  onClick={handleClick}
                  className={`btn btn-primary btn-lg rounded-circle ${
                    isAnimating ? 'scale-animation' : ''
                  }`}
                  style={{
                    width: '200px',
                    height: '200px',
                    fontSize: '2rem',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                    transition: 'all 0.1s ease',
                  }}
                >
                  <i className="bi bi-hand-index-thumb fs-1"></i>
                  <div className="mt-2">CLICK!</div>
                </button>
              </div>

              <div className="alert alert-info" role="alert">
                <i className="bi bi-info-circle me-2"></i>
                Los puntos se guardan automáticamente cada 10 clicks
              </div>

              <button
                onClick={handleManualSave}
                className="btn btn-success"
                disabled={clicks === savedClicks}
              >
                <i className="bi bi-save me-2"></i>
                Guardar Puntos Ahora
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scale-animation {
          transform: scale(0.95);
        }
        
        .btn-primary.rounded-circle:hover {
          transform: scale(1.05);
        }
        
        .btn-primary.rounded-circle:active {
          transform: scale(0.95);
        }
        
        @media (max-width: 576px) {
          .btn-primary.rounded-circle {
            width: 150px !important;
            height: 150px !important;
            font-size: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default GameButton;