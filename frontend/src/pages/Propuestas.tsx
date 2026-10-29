import React, { useState } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonSegment, IonSegmentButton, IonLabel, IonBadge, IonButton, IonIcon,
  useIonRouter 
} from '@ionic/react';
import { swapHorizontalOutline } from 'ionicons/icons';

const Propuestas: React.FC = () => {
  const router = useIonRouter();
  const [tab, setTab] = useState('recibidas');

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
              <IonLabel>Recibidas (2)</IonLabel>
            </IonSegmentButton>
            {/* Aquí quitamos el (3) */}
            <IonSegmentButton value="enviadas">
              <IonLabel>Enviadas</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="historial">
              <IonLabel>Historial</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          {/* Tarjeta 1: Propuesta Pendiente (Sofía) */}
          {tab === 'recibidas' && (
            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #eee', padding: '20px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ background: '#f43f5e', color: 'white', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>S</div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1.1rem' }}>Sofía Ramírez</strong>
                    <span style={{ fontSize: '0.85rem', color: 'gray' }}>⭐ 4.7 · Hace 2 horas</span>
                  </div>
                </div>
                <IonBadge color="warning" style={{ color: '#b45309', background: '#fef3c7', padding: '6px 10px' }}>PENDIENTE</IonBadge>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f9fafb', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.8rem', color: 'gray' }}>Te ofrece</span>
                  <strong style={{ display: 'block', color: '#333' }}>🎸 Clase de guitarra</strong>
                  <span style={{ fontSize: '0.8rem', color: 'gray' }}>60 min · Online</span>
                </div>
                <IonIcon icon={swapHorizontalOutline} style={{ fontSize: '1.5rem', color: '#2563eb' }} />
                <div style={{ flex: 1, textAlign: 'right' }}>
                  <span style={{ fontSize: '0.8rem', color: 'gray' }}>Pide a cambio</span>
                  <strong style={{ display: 'block', color: '#333' }}>🐍 Clase de Python</strong>
                  <span style={{ fontSize: '0.8rem', color: 'gray' }}>60 min · Online</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <IonButton style={{ '--border-radius': '8px', flex: '1 1 auto' }}>Aceptar Propuesta</IonButton>
                <IonButton fill="outline" style={{ '--border-radius': '8px', flex: '1 1 auto' }}>Rechazar Propuesta</IonButton>
                <IonButton 
                  fill="clear" 
                  color="medium" 
                  style={{ flex: '0 1 auto' }}
                  onClick={() => router.push('/app/chats?contacto=sofia')}
                >
                  Chat
                </IonButton>
              </div>
            </div>
          )}

          {/* Tarjeta 2: Contraoferta (Diego) */}
          {tab === 'recibidas' && (
            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #eee', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ background: '#0ea5e9', color: 'white', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>D</div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '1.1rem' }}>Diego Fuentes</strong>
                    <span style={{ fontSize: '0.85rem', color: 'gray' }}>⭐ 4.9 · Hace 1 día</span>
                  </div>
                </div>
                <IonBadge color="primary" style={{ background: '#eff6ff', color: '#2563eb', padding: '6px 10px' }}>CONTRAOFERTA</IonBadge>
              </div>

              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <span style={{ fontSize: '0.8rem', color: '#1d4ed8', fontWeight: 'bold' }}>Diego propone:</span>
                <p style={{ margin: '5px 0 0 0', color: '#1e3a8a', fontStyle: 'italic' }}>"¿Te parece el martes a las 19:00 en vez del lunes?"</p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <IonButton 
                  style={{ '--border-radius': '8px' }}
                  onClick={() => router.push('/app/chats?contacto=diego')}
                >
                  Responder en chat
                </IonButton>
                
                <IonButton 
                  fill="clear" 
                  color="medium"
                  onClick={() => router.push('/app/offers/2')}
                >
                  Ver detalles
                </IonButton>
              </div>
            </div>
          )}

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Propuestas;