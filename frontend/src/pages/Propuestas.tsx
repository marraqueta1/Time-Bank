import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonSegment, IonSegmentButton, IonLabel, IonBadge, IonButton, IonIcon
} from '@ionic/react';
import { lockClosedOutline } from 'ionicons/icons';
import api from '../services/api';

const Propuestas: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('recibidas');
  const [propuestas, setPropuestas] = useState<any[]>([]);
  const [miId, setMiId] = useState<number | null>(null);

  const cargarDatos = async () => {
    try {
      const [resPerfil, resPropuestas] = await Promise.all([
        api.get('/usuarios/perfil'),
        api.get('/propuestas')
      ]);
      setMiId(resPerfil.data.id);
      setPropuestas(resPropuestas.data || []);
    } catch (error) {
      console.error('Error cargando propuestas:', error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const cambiarEstado = async (id: number, estado: string, irAChatContactoId?: number) => {
    try {
      await api.patch(`/propuestas/${id}`, { estado });
      await cargarDatos();
      window.dispatchEvent(new Event('proposalsChanged'));
      window.dispatchEvent(new Event('pointsChanged'));
      if (irAChatContactoId) {
        navigate(`/app/chats?contacto=${irAChatContactoId}`);
      }
    } catch (error) {
      console.error('Error actualizando propuesta:', error);
    }
  };

  const handleCancelarEnviada = (id: number) => {
    if (window.confirm('¿Estás seguro de cancelar esta propuesta?')) {
      cambiarEstado(id, 'cancelada');
    }
  };

  const recibidas = propuestas.filter(p => p.oferta?.creadorId === miId && p.estado === 'pendiente');
  const enviadas = propuestas.filter(p => p.solicitanteId === miId && p.estado === 'pendiente');
  const historial = propuestas.filter(p => p.estado !== 'pendiente');

  return (
    <IonPage className="ion-page ion-page-visible" style={{ opacity: 1, zIndex: 10 }}>
      <IonHeader className="ion-no-border ion-hide-md-up">
        <IonToolbar>
          <IonTitle>Propuestas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="ion-hide-md-down ion-margin-bottom" style={{ marginTop: '20px' }}>
            <h1 style={{ fontWeight: 'bold' }}>Propuestas de intercambio</h1>
            <p style={{ color: 'gray' }}>Gestiona las propuestas recibidas y enviadas</p>
          </div>

          <IonSegment value={tab} onIonChange={e => setTab(e.detail.value as string)} style={{ marginBottom: '30px' }}>
            <IonSegmentButton value="recibidas">
              <IonLabel>Recibidas ({recibidas.length})</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="enviadas">
              <IonLabel>Enviadas ({enviadas.length})</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="historial">
              <IonLabel>Historial ({historial.length})</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          {tab === 'recibidas' && (
            <>
              {recibidas.length === 0 && <p style={{ color: 'gray', textAlign: 'center' }}>No tienes propuestas recibidas pendientes.</p>}
              {recibidas.map(propuesta => (
                <div key={propuesta.id} style={{ background: 'white', borderRadius: '12px', border: '1px solid #eee', padding: '20px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ background: '#f43f5e', color: 'white', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        {propuesta.solicitante?.nombre?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <strong style={{ display: 'block', fontSize: '1.1rem' }}>{propuesta.solicitante?.nombre}</strong>
                        <span style={{ fontSize: '0.85rem', color: 'gray' }}>
                          {new Date(propuesta.fechaCreacion).toLocaleDateString('es-CL')}
                        </span>
                      </div>
                    </div>
                    <IonBadge color="warning" style={{ color: '#b45309', background: '#fef3c7', padding: '6px 10px' }}>PENDIENTE</IonBadge>
                  </div>

                  <div style={{ background: '#f9fafb', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'gray' }}>Oferta solicitada</span>
                    <strong style={{ display: 'block', color: '#333' }}>{propuesta.oferta?.titulo} ({propuesta.oferta?.puntos} pts)</strong>
                    {propuesta.mensaje && <p style={{ margin: '8px 0 0 0', color: '#555', fontStyle: 'italic' }}>"{propuesta.mensaje}"</p>}
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <IonButton onClick={() => cambiarEstado(propuesta.id, 'aceptada', propuesta.solicitanteId)} style={{ '--border-radius': '8px', flex: '1 1 auto' }}>Aceptar</IonButton>
                    <IonButton onClick={() => cambiarEstado(propuesta.id, 'rechazada')} fill="outline" style={{ '--border-radius': '8px', flex: '1 1 auto' }}>Rechazar</IonButton>
                    <IonButton fill="clear" color="medium" onClick={() => navigate(`/app/chats?contacto=${propuesta.solicitanteId}`)}>Chat</IonButton>
                  </div>
                </div>
              ))}
            </>
          )}

          {tab === 'enviadas' && (
            <>
              {enviadas.length === 0 && <p style={{ color: 'gray', textAlign: 'center' }}>No has enviado ninguna propuesta pendiente.</p>}
              {enviadas.map(propuesta => (
                <div key={propuesta.id} style={{ background: 'white', borderRadius: '12px', border: '1px solid #eee', padding: '20px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ background: '#10b981', color: 'white', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        {propuesta.oferta?.creador?.nombre?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <strong style={{ display: 'block', fontSize: '1.1rem' }}>Enviada a: {propuesta.oferta?.creador?.nombre}</strong>
                        <span style={{ fontSize: '0.85rem', color: 'gray' }}>{propuesta.oferta?.titulo}</span>
                      </div>
                    </div>
                    <IonBadge color="medium" style={{ padding: '6px 10px' }}>EN ESPERA</IonBadge>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fef3c7', color: '#b45309', padding: '10px 15px', borderRadius: '8px', marginBottom: '15px', fontSize: '0.9rem' }}>
                    <IonIcon icon={lockClosedOutline} />
                    <span>Valor del intercambio: <strong>{propuesta.oferta?.puntos} pts</strong>.</span>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <IonButton fill="outline" color="danger" style={{ '--border-radius': '8px', flex: 1 }} onClick={() => handleCancelarEnviada(propuesta.id)}>
                      Cancelar Propuesta
                    </IonButton>
                    <IonButton fill="clear" color="medium" onClick={() => navigate(`/app/chats?contacto=${propuesta.oferta?.creadorId}`)}>
                      Ver Chat
                    </IonButton>
                  </div>
                </div>
              ))}
            </>
          )}

          {tab === 'historial' && (
            <>
              {historial.length === 0 && <p style={{ color: 'gray', textAlign: 'center' }}>No hay historial disponible.</p>}
              {historial.map(propuesta => {
                const otro = propuesta.solicitanteId === miId ? propuesta.oferta?.creador : propuesta.solicitante;
                return (
                  <div key={propuesta.id} style={{ background: 'white', borderRadius: '12px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', opacity: propuesta.estado === 'rechazada' || propuesta.estado === 'cancelada' ? 0.6 : 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ background: 'gray', color: 'white', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                          {otro?.nombre?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <strong style={{ display: 'block', fontSize: '1.1rem' }}>{otro?.nombre}</strong>
                          <span style={{ fontSize: '0.85rem', color: 'gray' }}>{propuesta.oferta?.titulo}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {propuesta.estado === 'aceptada' && (
                          <IonButton size="small" color="success" onClick={() => cambiarEstado(propuesta.id, 'completada')}>
                            Completar y Transferir
                          </IonButton>
                        )}
                        <IonBadge color={propuesta.estado === 'completada' || propuesta.estado === 'aceptada' ? 'success' : 'medium'} style={{ padding: '6px 10px' }}>
                          {propuesta.estado?.toUpperCase()}
                        </IonBadge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Propuestas;
