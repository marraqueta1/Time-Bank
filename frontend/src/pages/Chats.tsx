import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonGrid, IonRow, IonCol, IonList, IonItem, IonLabel, 
  IonIcon, IonAvatar, 
} from '@ionic/react';
import { send } from 'ionicons/icons';
import api from '../services/api';

const Chats: React.FC = () => {
  const location = useLocation();
  const [miId, setMiId] = useState<number | null>(null);
  const [chatActivo, setChatActivo] = useState<number | null>(null);
  const [mensajes, setMensajes] = useState<any[]>([]);
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [nuevoMensaje, setNuevoMensaje] = useState('');

  const cargarChats = async () => {
    try {
      const [resPerfil, resChats] = await Promise.all([
        api.get('/usuarios/perfil'),
        api.get('/chats')
      ]);

      const userId = resPerfil.data.id;
      const data = resChats.data || [];
      setMiId(userId);
      setMensajes(data);

      const params = new URLSearchParams(location.search);
      const contactoUrl = parseInt(params.get('contacto') || '', 10);

      if (!isNaN(contactoUrl)) {
        setChatActivo(contactoUrl);
      } else if (data.length > 0) {
        const primero = data[0];
        const otroId = primero.remitenteId === userId ? primero.destinatarioId : primero.remitenteId;
        setChatActivo(otroId);
      }
    } catch (error) {
      console.error('Error al cargar chats:', error);
    }
  };

  useEffect(() => {
    cargarChats();
  }, [location.search]);

  const contactosMap = new Map<number, { id: number; nombre: string }>();
  mensajes.forEach(msg => {
    if (miId === null) return;
    const otro = msg.remitenteId === miId ? msg.destinatario : msg.remitente;
    if (otro && !contactosMap.has(otro.id)) {
      contactosMap.set(otro.id, { id: otro.id, nombre: otro.nombre });
    }
  });

  if (chatActivo && !contactosMap.has(chatActivo)) {
    contactosMap.set(chatActivo, { id: chatActivo, nombre: `Usuario #${chatActivo}` });
  }

  const contactosDisponibles = Array.from(contactosMap.values());
  const contactosFiltrados = contactosDisponibles.filter(c =>
    c.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
  );

  const currentContact = contactosDisponibles.find(c => c.id === chatActivo);
  const mensajesActuales = mensajes.filter(
    m => (m.remitenteId === miId && m.destinatarioId === chatActivo) ||
         (m.remitenteId === chatActivo && m.destinatarioId === miId)
  );

  const handleEnviarMensaje = async () => {
    if (nuevoMensaje.trim() === '' || !chatActivo) return;
    try {
      const res = await api.post('/chats', {
        destinatarioId: chatActivo,
        contenido: nuevoMensaje
      });
      setMensajes(prev => [...prev, res.data]);
      setNuevoMensaje('');
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border ion-hide-md-up">
        <IonToolbar>
          <IonTitle>{currentContact?.nombre || 'Chats'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-no-padding">
        <IonGrid className="ion-no-padding" style={{ height: '100%' }}>
          <IonRow style={{ height: '100%' }}>
            <IonCol size="12" sizeMd="4" className="ion-hide-md-down" style={{ borderRight: '1px solid #eee', background: 'white' }}>
              <div style={{ padding: '20px' }}>
                <h2 style={{ margin: 0, fontWeight: 'bold' }}>Chats</h2>
                <input 
                  type="text" 
                  placeholder="Buscar conversación..." 
                  value={textoBusqueda}
                  onChange={(e) => setTextoBusqueda(e.target.value)}
                  style={{ width: '100%', padding: '10px', marginTop: '15px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }} 
                />
              </div>
              
              <IonList lines="full">
                {contactosFiltrados.map(contacto => (
                  <IonItem 
                    key={contacto.id}
                    button 
                    onClick={() => setChatActivo(contacto.id)}
                    style={{ '--background': chatActivo === contacto.id ? '#eff6ff' : 'transparent' }}
                  >
                    <IonAvatar slot="start" style={{ background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                      {contacto.nombre.charAt(0).toUpperCase()}
                    </IonAvatar>
                    <IonLabel>
                      <h2 style={{ fontWeight: chatActivo === contacto.id ? 'bold' : 'normal', color: chatActivo === contacto.id ? '#2563eb' : 'inherit' }}>
                        {contacto.nombre}
                      </h2>
                      <p>Conversación activa</p>
                    </IonLabel>
                  </IonItem>
                ))}
                
                {contactosFiltrados.length === 0 && (
                  <p style={{ padding: '20px', color: 'gray', textAlign: 'center' }}>No tienes chats aún.</p>
                )}
              </IonList>
            </IonCol>

            <IonCol size="12" sizeMd="8" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f9fafb' }}>
              {currentContact ? (
                <>
                  <div className="ion-hide-md-down" style={{ padding: '15px 20px', background: 'white', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: '#2563eb', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                      {currentContact.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontWeight: 'bold' }}>{currentContact.nombre}</h3>
                      <span style={{ fontSize: '0.8rem', color: '#16a34a' }}>● En línea</span>
                    </div>
                  </div>

                  <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {mensajesActuales.map((msg) => {
                      const esMio = msg.remitenteId === miId;
                      return (
                        <div key={msg.id} style={{ display: 'flex', gap: '10px', alignSelf: esMio ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                          <div style={{ 
                            background: esMio ? '#2563eb' : 'white', 
                            padding: '12px 15px', 
                            borderRadius: esMio ? '15px 15px 0 15px' : '15px 15px 15px 0', 
                            border: esMio ? 'none' : '1px solid #eee', 
                            color: esMio ? 'white' : '#333' 
                          }}>
                            {msg.contenido}
                            <div style={{ 
                              fontSize: '0.7rem', 
                              color: esMio ? 'rgba(255,255,255,0.7)' : 'gray', 
                              marginTop: '5px', 
                              textAlign: 'right' 
                            }}>
                              {new Date(msg.fechaCreacion).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ padding: '15px', background: 'white', borderTop: '1px solid #eee', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input 
                      type="text" 
                      placeholder="Escribe un mensaje..." 
                      value={nuevoMensaje}
                      onChange={(e) => setNuevoMensaje(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleEnviarMensaje()}
                      style={{ flex: 1, padding: '12px 15px', borderRadius: '20px', border: '1px solid #ddd', background: '#f9fafb', outline: 'none' }} 
                    />
                    <div 
                      onClick={handleEnviarMensaje}
                      style={{ background: '#2563eb', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}
                    >
                      <IonIcon icon={send} />
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'gray' }}>
                  Selecciona un chat para comenzar.
                </div>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Chats;
