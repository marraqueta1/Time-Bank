import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonGrid, IonRow, IonCol, IonList, IonItem, IonLabel, 
  IonButton, IonIcon, IonAvatar
} from '@ionic/react';
import { send, swapHorizontalOutline } from 'ionicons/icons';

const Chats: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const [chatActivo, setChatActivo] = useState(queryParams.get('contacto') || ''); 
  const [contactosDisponibles, setContactosDisponibles] = useState<any[]>([]);
  
  // Nuevos estados para búsqueda y mensajes
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [mensajesPorChat, setMensajesPorChat] = useState<Record<string, any[]>>({});

  useEffect(() => {
    const guardadas = localStorage.getItem('propuestasState');
    let contactosGenerados: any[] = [];
    
    if (guardadas) {
      const propuestas = JSON.parse(guardadas);
      contactosGenerados = propuestas
        .filter((p: any) => p.estado !== 'RECHAZADA' && p.estado !== 'CANCELADA') 
        .map((p: any) => ({
          id: p.contacto.id,
          nombre: p.contacto.nombre,
          inicial: p.contacto.inicial,
          color: p.contacto.color,
          tiempo: p.contacto.tiempo,
          estadoPropuesta: p.estado,
          propuesta: (p.ofrece && p.pide) ? { de: `${p.ofrece.icono} ${p.ofrece.titulo}`, para: `${p.pide.icono} ${p.pide.titulo}` } : null
        }));
      setContactosDisponibles(contactosGenerados);
    }

    const params = new URLSearchParams(location.search);
    const contactoUrl = params.get('contacto');
    
    if (contactoUrl) {
      setChatActivo(contactoUrl);
      if (!contactosGenerados.find(c => c.id === contactoUrl)) {
        const nombreCapitalizado = contactoUrl.charAt(0).toUpperCase() + contactoUrl.slice(1);
        setContactosDisponibles(prev => [{
          id: contactoUrl,
          nombre: nombreCapitalizado,
          inicial: nombreCapitalizado.charAt(0),
          color: '#8b5cf6',
          tiempo: 'Ahora',
          estadoPropuesta: 'NUEVO',
          propuesta: null
        }, ...prev]);
      }
    } else if (contactosGenerados.length > 0) {
      setChatActivo(contactosGenerados[0].id);
    }
  }, [location.search]);

  // Inicializar mensajes simulados solo una vez por contacto
  useEffect(() => {
    setMensajesPorChat(prev => {
      const nuevoEstado = { ...prev };
      contactosDisponibles.forEach(c => {
        if (!nuevoEstado[c.id]) {
          if (c.estadoPropuesta === 'ACEPTADA') {
            nuevoEstado[c.id] = [
              { tipo: 'recibido', texto: `¡Hola! Gracias por aceptar el intercambio.`, hora: '10:20' },
              { tipo: 'enviado', texto: `¡De nada! ¿Cuándo te acomoda que nos juntemos?`, hora: '10:25 ✓✓' }
            ];
          } else if (c.estadoPropuesta === 'CONTRAOFERTA') {
            nuevoEstado[c.id] = [
              { tipo: 'recibido', texto: '¿Te parece el martes a las 19:00 en vez del lunes?', hora: '09:00' }
            ];
          } else if (c.estadoPropuesta === 'PENDIENTE' || c.estadoPropuesta === 'EN ESPERA') {
            nuevoEstado[c.id] = [
              { tipo: 'enviado', texto: `Te envié una propuesta de intercambio, quedo atento.`, hora: 'Ayer ✓✓' }
            ];
          } else {
            nuevoEstado[c.id] = [
              { tipo: 'enviado', texto: `¡Hola ${c.nombre}! Vi tu publicación en el Feed. ¿Aún necesitas ayuda?`, hora: 'Ahora' }
            ];
          }
        }
      });
      return nuevoEstado;
    });
  }, [contactosDisponibles]);

  const currentContact = contactosDisponibles.find(c => c.id === chatActivo);
  const mensajesActuales = mensajesPorChat[chatActivo] || [];

  const contactosFiltrados = contactosDisponibles.filter(c => 
    c.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
  );

  const handleEnviarMensaje = () => {
    if (nuevoMensaje.trim() === '') return;
    
    const horaActual = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMensajesPorChat(prev => ({
      ...prev,
      [chatActivo]: [
        ...(prev[chatActivo] || []),
        { tipo: 'enviado', texto: nuevoMensaje, hora: horaActual }
      ]
    }));
    
    setNuevoMensaje('');
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
                    <IonAvatar slot="start" style={{ background: contacto.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
                      {contacto.inicial}
                    </IonAvatar>
                    <IonLabel>
                      <h2 style={{ fontWeight: chatActivo === contacto.id ? 'bold' : 'normal', color: chatActivo === contacto.id ? '#2563eb' : 'inherit' }}>
                        {contacto.nombre}
                      </h2>
                      <p>{contacto.estadoPropuesta === 'ACEPTADA' ? 'Propuesta aceptada 🎉' : 'Conversación iniciada'}</p>
                    </IonLabel>
                    <span slot="end" style={{ fontSize: '0.8rem', color: 'gray' }}>{contacto.tiempo}</span>
                  </IonItem>
                ))}
                
                {contactosFiltrados.length === 0 && (
                  <p style={{ padding: '20px', color: 'gray', textAlign: 'center' }}>No se encontraron chats.</p>
                )}
              </IonList>
            </IonCol>

            <IonCol size="12" sizeMd="8" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f9fafb' }}>
              
              {currentContact ? (
                <>
                  <div className="ion-hide-md-down" style={{ padding: '15px 20px', background: 'white', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ background: currentContact.color, color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                      {currentContact.inicial}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontWeight: 'bold' }}>{currentContact.nombre}</h3>
                      <span style={{ fontSize: '0.8rem', color: '#16a34a' }}>● En línea</span>
                    </div>
                  </div>

                  {currentContact.propuesta && (
                    <div style={{ padding: '15px' }}>
                      <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                        <div>
                          <span style={{ fontSize: '0.75rem', color: 'gray', fontWeight: 'bold', letterSpacing: '1px' }}>
                            {currentContact.estadoPropuesta === 'ACEPTADA' ? 'TRUEQUE ACORDADO' : 'PROPUESTA DE TRUEQUE'}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '10px' }}>
                            <div>
                              <strong style={{ display: 'block', color: '#333' }}>{currentContact.propuesta.de}</strong>
                              <span style={{ fontSize: '0.8rem', color: 'gray' }}>60 min</span>
                            </div>
                            <IonIcon icon={swapHorizontalOutline} style={{ color: currentContact.estadoPropuesta === 'ACEPTADA' ? '#16a34a' : '#2563eb', fontSize: '1.2rem' }} />
                            <div>
                              <strong style={{ display: 'block', color: '#333' }}>{currentContact.propuesta.para}</strong>
                              <span style={{ fontSize: '0.8rem', color: 'gray' }}>60 min</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {mensajesActuales.map((msg, index) => (
                      <div key={index} style={{ display: 'flex', gap: '10px', alignSelf: msg.tipo === 'recibido' ? 'flex-start' : 'flex-end', maxWidth: '80%' }}>
                        <div style={{ 
                          background: msg.tipo === 'recibido' ? 'white' : '#2563eb', 
                          padding: '12px 15px', 
                          borderRadius: msg.tipo === 'recibido' ? '15px 15px 15px 0' : '15px 15px 0 15px', 
                          border: msg.tipo === 'recibido' ? '1px solid #eee' : 'none', 
                          color: msg.tipo === 'recibido' ? '#333' : 'white' 
                        }}>
                          {msg.texto}
                          <div style={{ 
                            fontSize: '0.7rem', 
                            color: msg.tipo === 'recibido' ? 'gray' : 'rgba(255,255,255,0.7)', 
                            marginTop: '5px', 
                            textAlign: 'right' 
                          }}>
                            {msg.hora}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ padding: '15px', background: 'white', borderTop: '1px solid #eee', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div 
                      onClick={() => alert('Funcionalidad de adjuntar archivos en desarrollo.')}
                      style={{ background: '#f3f4f6', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', cursor: 'pointer' }}
                    >
                      +
                    </div>
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
