import React, { useState, useEffect } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonSegment, IonSegmentButton, IonLabel, IonBadge, IonButton, IonIcon,
  useIonRouter 
} from '@ionic/react';
import { swapHorizontalOutline, lockClosedOutline } from 'ionicons/icons';

const propuestasIniciales = [
  {
    id: 1,
    tipo: 'recibida',
    estado: 'PENDIENTE',
    contacto: { id: 'sofia', nombre: 'Sofía Ramírez', inicial: 'S', color: '#f43f5e', rating: 4.7, tiempo: 'Hace 2 horas' },
    ofrece: { titulo: 'Clase de guitarra', duracion: '60 min', modalidad: 'Online', icono: '🎸' },
    pide: { titulo: 'Clase de Python', duracion: '60 min', modalidad: 'Online', icono: '🐍' }
  },
  {
    id: 2,
    tipo: 'recibida',
    estado: 'CONTRAOFERTA',
    contacto: { id: 'diego', nombre: 'Diego Fuentes', inicial: 'D', color: '#0ea5e9', rating: 4.9, tiempo: 'Hace 1 día' },
    mensaje: '"¿Te parece el martes a las 19:00 en vez del lunes?"'
  },
  {
    id: 3,
    tipo: 'enviada',
    estado: 'EN ESPERA',
    contacto: { id: 'carlos', nombre: 'Carlos V.', inicial: 'C', color: '#10b981', rating: 4.5, tiempo: 'Ayer' },
    ofrece: { titulo: 'Edición de Video', duracion: '60 min', modalidad: 'Online', icono: '🎬' },
    puntosRetenidos: 15
  }
];

const Propuestas: React.FC = () => {
  const router = useIonRouter();
  const [tab, setTab] = useState('recibidas');
  const [propuestas, setPropuestas] = useState<any[]>([]);

  useEffect(() => {
    const guardadas = localStorage.getItem('propuestasState');
    if (guardadas) {
      setPropuestas(JSON.parse(guardadas));
    } else {
      setPropuestas(propuestasIniciales);
      localStorage.setItem('propuestasState', JSON.stringify(propuestasIniciales));
    }
  }, []);

  const actualizarPropuestas = (nuevasPropuestas: any[]) => {
    setPropuestas(nuevasPropuestas);
    localStorage.setItem('propuestasState', JSON.stringify(nuevasPropuestas));
    window.dispatchEvent(new Event('proposalsChanged'));
  };

  const handleAceptar = (id: number, idContacto: string) => {
    const actualizadas = propuestas.map(p => 
      p.id === id ? { ...p, tipo: 'historial', estado: 'ACEPTADA' } : p
    );
    actualizarPropuestas(actualizadas);
    router.push(`/app/chats?contacto=${idContacto}`);
  };

  const handleRechazar = (id: number) => {
    const actualizadas = propuestas.map(p => 
      p.id === id ? { ...p, tipo: 'historial', estado: 'RECHAZADA' } : p
    );
    actualizarPropuestas(actualizadas);
  };

  const handleCancelarEnviada = (id: number) => {
    const confirmar = window.confirm('¿Estás seguro de cancelar esta propuesta? Tus puntos retenidos serán devueltos a tu Wallet.');
    if (confirmar) {
      const actualizadas = propuestas.map(p => 
        p.id === id ? { ...p, tipo: 'historial', estado: 'CANCELADA' } : p
      );
      actualizarPropuestas(actualizadas);
      alert('Propuesta cancelada. Puntos liberados.');
    }
  };

  const recibidas = propuestas.filter(p => p.tipo === 'recibida');
  const enviadas = propuestas.filter(p => p.tipo === 'enviada');
  const historial = propuestas.filter(p => p.tipo === 'historial');

  return (
    <IonPage>
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
              <IonLabel>Historial</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          {/* VISTA RECIBIDAS */}
          {tab === 'recibidas' && (
            <>
              {recibidas.length === 0 && <p style={{ color: 'gray', textAlign: 'center' }}>No tienes propuestas recibidas pendientes.</p>}
              
              {recibidas.map(propuesta => (
                <div key={propuesta.id} style={{ background: 'white', borderRadius: '12px', border: '1px solid #eee', padding: '20px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ background: propuesta.contacto.color, color: 'white', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{propuesta.contacto.inicial}</div>
                      <div>
                        <strong style={{ display: 'block', fontSize: '1.1rem' }}>{propuesta.contacto.nombre}</strong>
                        <span style={{ fontSize: '0.85rem', color: 'gray' }}>⭐ {propuesta.contacto.rating} · {propuesta.contacto.tiempo}</span>
                      </div>
                    </div>
                    {propuesta.estado === 'PENDIENTE' 
                      ? <IonBadge color="warning" style={{ color: '#b45309', background: '#fef3c7', padding: '6px 10px' }}>PENDIENTE</IonBadge>
                      : <IonBadge color="primary" style={{ background: '#eff6ff', color: '#2563eb', padding: '6px 10px' }}>CONTRAOFERTA</IonBadge>
                    }
                  </div>

                  {propuesta.estado === 'PENDIENTE' && propuesta.ofrece && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f9fafb', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: '0.8rem', color: 'gray' }}>Te ofrece</span>
                        <strong style={{ display: 'block', color: '#333' }}>{propuesta.ofrece.icono} {propuesta.ofrece.titulo}</strong>
                        <span style={{ fontSize: '0.8rem', color: 'gray' }}>{propuesta.ofrece.duracion} · {propuesta.ofrece.modalidad}</span>
                      </div>
                      <IonIcon icon={swapHorizontalOutline} style={{ fontSize: '1.5rem', color: '#2563eb' }} />
                      <div style={{ flex: 1, textAlign: 'right' }}>
                        <span style={{ fontSize: '0.8rem', color: 'gray' }}>Pide a cambio</span>
                        <strong style={{ display: 'block', color: '#333' }}>{propuesta.pide.icono} {propuesta.pide.titulo}</strong>
                        <span style={{ fontSize: '0.8rem', color: 'gray' }}>{propuesta.pide.duracion} · {propuesta.pide.modalidad}</span>
                      </div>
                    </div>
                  )}

                  {propuesta.estado === 'CONTRAOFERTA' && (
                    <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#1d4ed8', fontWeight: 'bold' }}>{propuesta.contacto.inicial} propone:</span>
                      <p style={{ margin: '5px 0 0 0', color: '#1e3a8a', fontStyle: 'italic' }}>{propuesta.mensaje}</p>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {propuesta.estado === 'PENDIENTE' ? (
                      <>
                        <IonButton onClick={() => handleAceptar(propuesta.id, propuesta.contacto.id)} style={{ '--border-radius': '8px', flex: '1 1 auto' }}>Aceptar Propuesta</IonButton>
                        <IonButton onClick={() => handleRechazar(propuesta.id)} fill="outline" style={{ '--border-radius': '8px', flex: '1 1 auto' }}>Rechazar Propuesta</IonButton>
                        <IonButton fill="clear" color="medium" style={{ flex: '0 1 auto' }} onClick={() => router.push(`/app/chats?contacto=${propuesta.contacto.id}`)}>Chat</IonButton>
                      </>
                    ) : (
                      <>
                        <IonButton style={{ '--border-radius': '8px' }} onClick={() => router.push(`/app/chats?contacto=${propuesta.contacto.id}`)}>Responder en chat</IonButton>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* VISTA ENVIADAS */}
          {tab === 'enviadas' && (
            <>
              {enviadas.length === 0 && <p style={{ color: 'gray', textAlign: 'center' }}>No has enviado ninguna propuesta recientemente.</p>}
              
              {enviadas.map(propuesta => (
                <div key={propuesta.id} style={{ background: 'white', borderRadius: '12px', border: '1px solid #eee', padding: '20px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ background: propuesta.contacto.color, color: 'white', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{propuesta.contacto.inicial}</div>
                      <div>
                        <strong style={{ display: 'block', fontSize: '1.1rem' }}>Enviada a: {propuesta.contacto.nombre}</strong>
                        <span style={{ fontSize: '0.85rem', color: 'gray' }}>{propuesta.contacto.tiempo}</span>
                      </div>
                    </div>
                    <IonBadge color="medium" style={{ padding: '6px 10px' }}>{propuesta.estado}</IonBadge>
                  </div>

                  {propuesta.ofrece && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f9fafb', padding: '15px', borderRadius: '8px', marginBottom: '20px', borderLeft: '4px solid #10b981' }}>
                      <div>
                        <span style={{ fontSize: '0.8rem', color: 'gray' }}>Solicitaste</span>
                        <strong style={{ display: 'block', color: '#333' }}>{propuesta.ofrece.icono} {propuesta.ofrece.titulo}</strong>
                        <span style={{ fontSize: '0.8rem', color: 'gray' }}>{propuesta.ofrece.duracion} · {propuesta.ofrece.modalidad}</span>
                      </div>
                    </div>
                  )}

                  {/* Advertencia de saldo retenido (Escrow) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fef3c7', color: '#b45309', padding: '10px 15px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
                    <IonIcon icon={lockClosedOutline} />
                    <span>Tienes <strong>{propuesta.puntosRetenidos} pts</strong> retenidos por esta solicitud.</span>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <IonButton fill="outline" color="danger" style={{ '--border-radius': '8px', flex: 1 }} onClick={() => handleCancelarEnviada(propuesta.id)}>
                      Cancelar Propuesta
                    </IonButton>
                    <IonButton fill="clear" color="medium" onClick={() => router.push(`/app/chats?contacto=${propuesta.contacto.id}`)}>
                      Ver Chat
                    </IonButton>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* VISTA HISTORIAL */}
          {tab === 'historial' && (
            <>
              {historial.length === 0 && <p style={{ color: 'gray', textAlign: 'center' }}>No hay historial disponible.</p>}
              
              {historial.map(propuesta => (
                <div key={propuesta.id} style={{ background: 'white', borderRadius: '12px', border: '1px solid #eee', padding: '20px', marginBottom: '20px', opacity: propuesta.estado === 'RECHAZADA' || propuesta.estado === 'CANCELADA' ? 0.6 : 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ background: 'gray', color: 'white', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{propuesta.contacto.inicial}</div>
                      <div>
                        <strong style={{ display: 'block', fontSize: '1.1rem' }}>{propuesta.contacto.nombre}</strong>
                        <span style={{ fontSize: '0.85rem', color: 'gray' }}>Finalizada</span>
                      </div>
                    </div>
                    <IonBadge color={propuesta.estado === 'ACEPTADA' ? 'success' : 'medium'} style={{ padding: '6px 10px' }}>{propuesta.estado}</IonBadge>
                  </div>
                </div>
              ))}
            </>
          )}

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Propuestas;
