import React from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonGrid, IonRow, IonCol, IonList, IonItem, IonLabel, 
  IonInput, IonButton, IonIcon, IonAvatar
} from '@ionic/react';
import { send, swapHorizontalOutline } from 'ionicons/icons';

const Chats: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border ion-hide-md-up">
        <IonToolbar>
          <IonTitle>Sofía Ramírez</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-no-padding">
        <IonGrid className="ion-no-padding" style={{ height: '100%' }}>
          <IonRow style={{ height: '100%' }}>
            
            {/* Columna Izquierda: Lista de Chats (Oculta en móvil para mostrar directo el chat) */}
            <IonCol size="12" sizeMd="4" className="ion-hide-md-down" style={{ borderRight: '1px solid #eee', background: 'white' }}>
              <div style={{ padding: '20px' }}>
                <h2 style={{ margin: 0, fontWeight: 'bold' }}>Chats</h2>
                <input type="text" placeholder="Buscar conversación..." style={{ width: '100%', padding: '10px', marginTop: '15px', borderRadius: '8px', border: '1px solid #ddd' }} />
              </div>
              <IonList lines="full">
                <IonItem style={{ '--background': '#eff6ff' }} button>
                  <IonAvatar slot="start" style={{ background: '#f43f5e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>S</IonAvatar>
                  <IonLabel>
                    <h2 style={{ fontWeight: 'bold', color: '#2563eb' }}>Sofía Ramírez</h2>
                    <p>Perfecto, pero ¿podría ser a las 19:00?</p>
                  </IonLabel>
                  <span slot="end" style={{ fontSize: '0.8rem', color: 'gray' }}>2 min</span>
                </IonItem>
                <IonItem button>
                  <IonAvatar slot="start" style={{ background: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>D</IonAvatar>
                  <IonLabel>
                    <h2>Diego Fuentes</h2>
                    <p>Nos vemos el martes entonces 👍</p>
                  </IonLabel>
                  <span slot="end" style={{ fontSize: '0.8rem', color: 'gray' }}>1h</span>
                </IonItem>
              </IonList>
            </IonCol>

            {/* Columna Derecha: Chat Activo */}
            <IonCol size="12" sizeMd="8" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f9fafb' }}>
              
              {/* Cabecera del chat web */}
              <div className="ion-hide-md-down" style={{ padding: '15px 20px', background: 'white', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: '#f43f5e', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>S</div>
                <div>
                  <h3 style={{ margin: 0, fontWeight: 'bold' }}>Sofía Ramírez</h3>
                  <span style={{ fontSize: '0.8rem', color: '#16a34a' }}>● En línea</span>
                </div>
              </div>

              {/* Tarjeta de propuesta de trueque (Fijada) */}
              <div style={{ padding: '15px' }}>
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'gray', fontWeight: 'bold', letterSpacing: '1px' }}>PROPUESTA DE TRUEQUE</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '10px' }}>
                      <div>
                        <strong style={{ display: 'block', color: '#333' }}>🎸 Guitarra</strong>
                        <span style={{ fontSize: '0.8rem', color: 'gray' }}>60 min</span>
                      </div>
                      <IonIcon icon={swapHorizontalOutline} style={{ color: '#2563eb', fontSize: '1.2rem' }} />
                      <div>
                        <strong style={{ display: 'block', color: '#333' }}>🐍 Python</strong>
                        <span style={{ fontSize: '0.8rem', color: 'gray' }}>60 min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Historial de Mensajes */}
              <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                {/* Mensaje de Sofia */}
                <div style={{ display: 'flex', gap: '10px', alignSelf: 'flex-start', maxWidth: '80%' }}>
                  <div style={{ background: 'white', padding: '12px 15px', borderRadius: '15px 15px 15px 0', border: '1px solid #eee', color: '#333' }}>
                    ¡Hola! Vi tu oferta de Python 🐍 ¿Te interesa un intercambio?
                    <div style={{ fontSize: '0.7rem', color: 'gray', marginTop: '5px', textAlign: 'right' }}>10:23</div>
                  </div>
                </div>

                {/* Mi Mensaje */}
                <div style={{ display: 'flex', gap: '10px', alignSelf: 'flex-end', maxWidth: '80%' }}>
                  <div style={{ background: '#2563eb', padding: '12px 15px', borderRadius: '15px 15px 0 15px', color: 'white' }}>
                    ¡Hola Sofía! Sí, me interesa. ¿Qué ofreces a cambio?
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', marginTop: '5px', textAlign: 'right' }}>10:25 ✓✓</div>
                  </div>
                </div>

                {/* Mensaje de Sofia */}
                <div style={{ display: 'flex', gap: '10px', alignSelf: 'flex-start', maxWidth: '80%' }}>
                  <div style={{ background: 'white', padding: '12px 15px', borderRadius: '15px 15px 15px 0', border: '1px solid #eee', color: '#333' }}>
                    Puedo darte clases de guitarra 🎸 Nivel básico-intermedio, 1 hora
                    <div style={{ fontSize: '0.7rem', color: 'gray', marginTop: '5px', textAlign: 'right' }}>10:26</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '10px', alignSelf: 'flex-start', maxWidth: '80%' }}>
                  <div style={{ background: 'white', padding: '12px 15px', borderRadius: '15px 15px 15px 0', border: '1px solid #eee', color: '#333' }}>
                    ¿Te parece el martes a las 18:00?
                    <div style={{ fontSize: '0.7rem', color: 'gray', marginTop: '5px', textAlign: 'right' }}>10:27</div>
                  </div>
                </div>

                {/* Mi Mensaje */}
                <div style={{ display: 'flex', gap: '10px', alignSelf: 'flex-end', maxWidth: '80%' }}>
                  <div style={{ background: '#2563eb', padding: '12px 15px', borderRadius: '15px 15px 0 15px', color: 'white' }}>
                    Perfecto, pero ¿podría ser a las 19:00? Salgo de clases a las 18:30 🙏
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)', marginTop: '5px', textAlign: 'right' }}>10:30 ✓✓</div>
                  </div>
                </div>

              </div>

              {/* Input de Mensaje */}
              <div style={{ padding: '15px', background: 'white', borderTop: '1px solid #eee', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ background: '#f3f4f6', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', cursor: 'pointer' }}>+</div>
                <input type="text" placeholder="Escribe un mensaje..." style={{ flex: 1, padding: '12px 15px', borderRadius: '20px', border: '1px solid #ddd', background: '#f9fafb', outline: 'none' }} />
                <div style={{ background: '#2563eb', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}>
                  <IonIcon icon={send} />
                </div>
              </div>

            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Chats;