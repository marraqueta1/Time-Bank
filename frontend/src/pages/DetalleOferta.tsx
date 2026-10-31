import React, { useState, useEffect } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonGrid, IonRow, IonCol, IonButton, IonIcon, IonBadge, 
  IonButtons, IonBackButton 
} from '@ionic/react';
import { useParams, useNavigate } from 'react-router-dom';
import { desktopOutline, timeOutline, pricetagOutline, calendarOutline, star, shieldCheckmarkOutline, bookmarkOutline } from 'ionicons/icons';
import api from '../services/api';

const DetalleOferta: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [oferta, setOferta] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const response = await api.get('/ofertas');
        const encontrada = response.data.find((o: any) => o.id.toString() === id);
        setOferta(encontrada);
      } catch (error) {
        console.error("Error cargando el detalle de la oferta:", error);
      } finally {
        setCargando(false);
      }
    };
    fetchDetalle();
  }, [id]);

  if (cargando) {
    return (
      <IonPage>
        <IonHeader className="ion-no-border ion-hide-md-up">
          <IonToolbar>
            <IonButtons slot="start"><IonBackButton defaultHref="/app/feed" /></IonButtons>
            <IonTitle>Cargando...</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding ion-text-center">
          <p style={{ marginTop: '50px', color: 'gray' }}>Buscando información de la oferta...</p>
        </IonContent>
      </IonPage>
    );
  }

  if (!oferta) {
    return (
      <IonPage>
        <IonHeader className="ion-no-border ion-hide-md-up">
          <IonToolbar>
            <IonButtons slot="start"><IonBackButton defaultHref="/app/feed" /></IonButtons>
            <IonTitle>Error</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding ion-text-center">
          <p style={{ marginTop: '50px', color: 'red' }}>No se encontró la oferta solicitada.</p>
          <IonButton onClick={() => navigate('/app/feed')}>Volver al inicio</IonButton>
        </IonContent>
      </IonPage>
    );
  }

  const tipoVisual = oferta.tipo === '1-a-1' ? 'PROFESOR' : oferta.tipo === 'sala' ? 'SALA' : 'ESTUDIANTE';
  const nombreAutor = oferta.creador?.nombre || 'Usuario';
  const inicial = nombreAutor.charAt(0).toUpperCase();

  return (
    <IonPage className="ion-page ion-page-visible" style={{ opacity: 1, zIndex: 999 }}>
      <IonHeader className="ion-no-border ion-hide-md-up">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/feed" />
          </IonButtons>
          <IonTitle>Detalle</IonTitle>
          <IonButtons slot="end">
            <IonButton><IonIcon icon={bookmarkOutline} /></IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div className="ion-hide-md-down ion-margin-bottom" style={{ cursor: 'pointer', color: '#2563eb', fontWeight: 'bold' }} onClick={() => navigate(-1)}>
            ← Volver
          </div>

          <IonGrid className="ion-no-padding">
            <IonRow>
              <IonCol size="12" sizeMd="8" style={{ paddingRight: '20px' }}>
                <div style={{ background: 'white', borderRadius: '16px', padding: '25px', border: '1px solid #eee' }}>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                    <div style={{ background: '#a855f7', color: 'white', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                      {inicial}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h2 style={{ margin: 0, fontWeight: 'bold', fontSize: '1.2rem' }}>{nombreAutor}</h2>
                        <IonBadge color={oferta.tipo === 'sala' ? 'tertiary' : 'primary'}>{tipoVisual}</IonBadge>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'gray', fontSize: '0.9rem', marginTop: '5px' }}>
                        <IonIcon icon={star} style={{ color: '#f59e0b' }} /> 5.0 · 0 reseñas
                      </div>
                    </div>
                  </div>

                  <IonBadge color="light" style={{ color: '#2563eb', background: '#eff6ff', marginBottom: '15px' }}>{oferta.categoria}</IonBadge>
                  
                  <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginTop: '0' }}>{oferta.titulo}</h1>
                  <p style={{ color: '#444', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '30px' }}>
                    {oferta.descripcion}
                  </p>

                  <IonGrid className="ion-no-padding" style={{ marginBottom: '30px' }}>
                    <IonRow>
                      {[
                        { icon: desktopOutline, title: 'Modalidad', value: 'Online' },
                        { icon: timeOutline, title: 'Duración', value: '60 min' },
                        { icon: pricetagOutline, title: 'Costo', value: `${oferta.puntos} pts`, color: '#d97706', bg: '#fef3c7' },
                        { icon: calendarOutline, title: 'Disponible', value: 'Lun-Vie' }
                      ].map((item, i) => (
                        <IonCol size="6" sizeMd="3" key={i} style={{ padding: '5px' }}>
                          <div style={{ background: item.bg || '#f9fafb', border: '1px solid #eee', borderRadius: '12px', padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <IonIcon icon={item.icon} style={{ color: item.color || '#666', fontSize: '1.5rem' }} />
                            <div>
                              <span style={{ display: 'block', fontSize: '0.8rem', color: 'gray' }}>{item.title}</span>
                              <strong style={{ color: item.color || '#333' }}>{item.value}</strong>
                            </div>
                          </div>
                        </IonCol>
                      ))}
                    </IonRow>
                  </IonGrid>

                </div>
              </IonCol>

              <IonCol size="12" sizeMd="4">
                <div style={{ background: 'white', borderRadius: '16px', padding: '25px', border: '1px solid #eee', position: 'sticky', top: '20px' }}>
                  <span style={{ color: 'gray', fontSize: '0.9rem' }}>Costo de esta sesión</span>
                  <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#d97706', margin: '5px 0' }}>
                    {oferta.puntos} <span style={{ fontSize: '1rem', color: 'gray', fontWeight: 'normal' }}>puntos</span>
                  </h1>
                  <p style={{ color: 'gray', fontSize: '0.9rem', marginBottom: '20px' }}>Tu saldo: 45 pts</p>

                  <IonButton 
                    expand="block" 
                    style={{ fontWeight: 'bold', '--border-radius': '8px', marginBottom: '10px' }} 
                    onClick={() => {
                      const nombreContacto = nombreAutor.split(' ')[0].toLowerCase();
                      navigate(`/app/chats?contacto=${nombreContacto}`);
                    }}
                  >
                    Enviar propuesta
                  </IonButton>

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: '#f0fdf4', padding: '15px', borderRadius: '8px' }}>
                    <IonIcon icon={shieldCheckmarkOutline} style={{ color: '#16a34a', fontSize: '1.5rem', flexShrink: 0 }} />
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#166534' }}>
                      <strong>Intercambio seguro</strong><br/>
                      Los puntos se liberan al completar la sesión. Si algo falla, puedes reportarlo.
                    </p>
                  </div>
                </div>
              </IonCol>

            </IonRow>
          </IonGrid>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default DetalleOferta;
