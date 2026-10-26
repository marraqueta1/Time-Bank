import React, { useState } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonGrid, IonRow, IonCol, IonButton, IonBadge, IonIcon,
  IonSegment, IonSegmentButton, IonLabel, IonCard, IonCardContent
} from '@ionic/react';
import { star, personOutline, timeOutline, checkmarkCircle } from 'ionicons/icons';

const Perfil: React.FC = () => {
  const [tab, setTab] = useState('ofertas');

  return (
    <IonPage>
      <IonHeader className="ion-no-border ion-hide-md-up">
        <IonToolbar>
          <IonTitle>Mi Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-no-padding">
        {/* Encabezado azul estilo Web */}
        <div className="ion-hide-md-down" style={{ height: '150px', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}></div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', position: 'relative', top: '-40px' }}>
          
          {/* Tarjeta de Información Principal */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '25px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ background: '#3b82f6', color: 'white', width: '80px', height: '80px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold', border: '4px solid white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                  C
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h1 style={{ margin: 0, fontWeight: 'bold', fontSize: '1.5rem' }}>Camila Torres</h1>
                    <IonBadge color="tertiary">PROFESOR</IonBadge>
                  </div>
                  <p style={{ margin: '5px 0 0 0', color: 'gray' }}>@camila_t · Estudiante de Ing. Comercial</p>
                </div>
              </div>
              <IonButton fill="outline" style={{ '--border-radius': '8px' }}>Editar perfil</IonButton>
            </div>

            <p style={{ marginTop: '20px', fontSize: '1.05rem', color: '#444' }}>
              Apasionada por enseñar cálculo y aprender idiomas 🌍 Disponible para ayudantías los martes y jueves.
            </p>

            {/* Estadísticas */}
            <IonGrid className="ion-no-padding" style={{ marginTop: '25px' }}>
              <IonRow style={{ textAlign: 'center' }}>
                <IonCol style={{ borderRight: '1px solid #eee' }}>
                  <span style={{ color: 'gray', fontSize: '0.9rem', display: 'block' }}>🏷️ Puntos</span>
                  <strong style={{ fontSize: '1.5rem', color: '#d97706' }}>45</strong>
                </IonCol>
                <IonCol style={{ borderRight: '1px solid #eee' }}>
                  <span style={{ color: 'gray', fontSize: '0.9rem', display: 'block' }}>⭐ Rating</span>
                  <strong style={{ fontSize: '1.5rem', color: '#333' }}>4.8</strong>
                </IonCol>
                <IonCol style={{ borderRight: '1px solid #eee' }}>
                  <span style={{ color: 'gray', fontSize: '0.9rem', display: 'block' }}>🔄 Trueques</span>
                  <strong style={{ fontSize: '1.5rem', color: '#16a34a' }}>12</strong>
                </IonCol>
                <IonCol>
                  <span style={{ color: 'gray', fontSize: '0.9rem', display: 'block' }}>👥 Estudiantes</span>
                  <strong style={{ fontSize: '1.5rem', color: '#2563eb' }}>28</strong>
                </IonCol>
              </IonRow>
            </IonGrid>

            {/* Medallas */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
              <IonBadge style={{ background: '#fef3c7', color: '#d97706', padding: '6px 10px' }}>🏆 Gurú</IonBadge>
              <IonBadge style={{ background: '#f3e8ff', color: '#9333ea', padding: '6px 10px' }}>🎓 Mentor</IonBadge>
              <IonBadge style={{ background: '#eff6ff', color: '#2563eb', padding: '6px 10px' }}>⭐ Top 5%</IonBadge>
            </div>
          </div>

          {/* Pestañas de contenido */}
          <IonSegment value={tab} onIonChange={e => setTab(e.detail.value as string)} style={{ marginTop: '30px', marginBottom: '20px' }}>
            <IonSegmentButton value="ofertas"><IonLabel>Ofertas activas</IonLabel></IonSegmentButton>
            <IonSegmentButton value="salas"><IonLabel>Salas creadas</IonLabel></IonSegmentButton>
            <IonSegmentButton value="resenas"><IonLabel>Reseñas (28)</IonLabel></IonSegmentButton>
            <IonSegmentButton value="historial"><IonLabel>Historial</IonLabel></IonSegmentButton>
          </IonSegment>

          {/* Lista de Ofertas */}
          {tab === 'ofertas' && (
            <IonGrid className="ion-no-padding">
              <IonRow>
                {[
                  { titulo: 'Repaso de Cálculo I', desc: 'Límites, derivadas e integrales básicas.', pts: 10 },
                  { titulo: 'Álgebra para principiantes', desc: 'Ecuaciones, factorización y sistemas.', pts: 12 }
                ].map((oferta, idx) => (
                  <IonCol size="12" sizeMd="6" key={idx} style={{ padding: '10px' }}>
                    <IonCard style={{ margin: 0, borderRadius: '12px', border: '1px solid #eee', boxShadow: 'none' }}>
                      <IonCardContent>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <IonBadge color="primary">OFERTA</IonBadge>
                          <span style={{ color: '#16a34a', fontSize: '0.8rem', fontWeight: 'bold' }}>Activa</span>
                        </div>
                        <h3 style={{ fontWeight: 'bold', color: '#333', marginTop: 0 }}>{oferta.titulo}</h3>
                        <p style={{ color: 'gray', fontSize: '0.9rem', marginBottom: '15px' }}>{oferta.desc}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <strong style={{ color: '#d97706' }}>{oferta.pts} pts</strong>
                          <span style={{ color: 'gray', fontSize: '0.8rem' }}>5 vistas</span>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          )}
          
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Perfil;