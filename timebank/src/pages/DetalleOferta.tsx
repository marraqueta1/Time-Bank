import React from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonGrid, IonRow, IonCol, IonButton, IonIcon, IonBadge, 
  IonButtons, IonBackButton 
} from '@ionic/react';
import { useParams, useNavigate } from 'react-router-dom';
import { desktopOutline, timeOutline, pricetagOutline, calendarOutline, star, shieldCheckmarkOutline, bookmarkOutline } from 'ionicons/icons';

const DetalleOferta: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <IonPage>
      {/* Header Móvil con botón de retroceso */}
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
          
          <div className="ion-hide-md-down ion-margin-bottom" style={{ cursor: 'pointer', color: '#2563eb', fontWeight: 'bold' }} onClick={() => navigate('/app/feed')}>
            ← Volver al feed
          </div>

          <IonGrid className="ion-no-padding">
            <IonRow>
              {/* Columna Izquierda: Información de la clase */}
              <IonCol size="12" sizeMd="8" style={{ paddingRight: '20px' }}>
                <div style={{ background: 'white', borderRadius: '16px', padding: '25px', border: '1px solid #eee' }}>
                  
                  {/* Info del Creador */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                    <div style={{ background: '#a855f7', color: 'white', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                      R
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h2 style={{ margin: 0, fontWeight: 'bold', fontSize: '1.2rem' }}>Rodrigo Martínez</h2>
                        <IonBadge color="tertiary">PROFESOR</IonBadge>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'gray', fontSize: '0.9rem', marginTop: '5px' }}>
                        <IonIcon icon={star} style={{ color: '#f59e0b' }} /> 4.8 · 12 reseñas
                      </div>
                    </div>
                  </div>

                  <IonBadge color="light" style={{ color: '#2563eb', background: '#eff6ff', marginBottom: '15px' }}>Programación</IonBadge>
                  
                  <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginTop: '0' }}>Introducción a Python desde cero</h1>
                  <p style={{ color: '#444', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '30px' }}>
                    Aprende los fundamentos de Python: variables, tipos de datos, condicionales, bucles y funciones. Ideal para quienes nunca han programado. Incluye ejercicios prácticos y material de apoyo.
                  </p>

                  {/* Bloques de características */}
                  <IonGrid className="ion-no-padding" style={{ marginBottom: '30px' }}>
                    <IonRow>
                      {[
                        { icon: desktopOutline, title: 'Modalidad', value: 'Online' },
                        { icon: timeOutline, title: 'Duración', value: '60 min' },
                        { icon: pricetagOutline, title: 'Costo', value: '15 pts', color: '#d97706', bg: '#fef3c7' },
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

                  <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '30px 0' }} />
                  
                  <h3 style={{ fontWeight: 'bold' }}>Reseñas de estudiantes</h3>
                  <div style={{ background: '#f9fafb', padding: '15px', borderRadius: '12px', marginTop: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <div style={{ background: '#22c55e', color: 'white', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>A</div>
                      <strong style={{ fontSize: '0.9rem' }}>Ana S.</strong>
                      <div style={{ display: 'flex', color: '#f59e0b', fontSize: '0.8rem' }}>
                        <IonIcon icon={star} /><IonIcon icon={star} /><IonIcon icon={star} /><IonIcon icon={star} /><IonIcon icon={star} />
                      </div>
                    </div>
                    <p style={{ margin: 0, color: '#555', fontStyle: 'italic', fontSize: '0.9rem' }}>"Excelente explicación, muy paciente. Aprendí mucho en una sola sesión."</p>
                  </div>

                </div>
              </IonCol>

              {/* Columna Derecha: Tarjeta de Pago / Acción */}
              <IonCol size="12" sizeMd="4">
                <div style={{ background: 'white', borderRadius: '16px', padding: '25px', border: '1px solid #eee', position: 'sticky', top: '20px' }}>
                  <span style={{ color: 'gray', fontSize: '0.9rem' }}>Costo de esta sesión</span>
                  <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#d97706', margin: '5px 0' }}>15 <span style={{ fontSize: '1rem', color: 'gray', fontWeight: 'normal' }}>puntos</span></h1>
                  <p style={{ color: 'gray', fontSize: '0.9rem', marginBottom: '20px' }}>Tu saldo: 45 pts</p>

                  <IonButton expand="block" style={{ fontWeight: 'bold', '--border-radius': '8px', marginBottom: '10px' }} onClick={() => navigate('/app/propuestas')}>
                    Enviar propuesta
                  </IonButton>
                  <IonButton expand="block" fill="outline" style={{ fontWeight: 'bold', '--border-radius': '8px', marginBottom: '20px' }}>
                    Guardar para después
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