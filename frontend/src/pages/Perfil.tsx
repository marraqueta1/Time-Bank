import React, { useState, useEffect } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonGrid, IonRow, IonCol, IonButton, IonBadge,
  IonSegment, IonSegmentButton, IonLabel, IonCard, IonCardContent,
  IonModal, IonItem, IonInput, IonTextarea, IonButtons, useIonViewWillEnter
} from '@ionic/react';
import api from '../services/api';

const Perfil: React.FC = () => {
  const [tab, setTab] = useState('ofertas');
  
  // 1. Estados para los datos del usuario que vienen de la Base de Datos
  const [usuario, setUsuario] = useState({
    nombre: 'Cargando...',
    correo: '',
    saldo: 0,
    descripcion: 'Sin descripción.',
    fotoUrl: '',
    rol: 'usuario'
  });

  // Estados para el Modal de Edición
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nombreEdit, setNombreEdit] = useState('');
  const [descripcionEdit, setDescripcionEdit] = useState('');
  const [fotoUrlEdit, setFotoUrlEdit] = useState('');

  // 2. Función para cargar los datos desde el backend
  const cargarPerfil = async () => {
    try {
      const response = await api.get('/usuarios/perfil');
      const data = response.data;
      
      setUsuario({
        nombre: data.nombre,
        correo: data.correo,
        saldo: data.saldo,
        descripcion: data.descripcion || 'Escribe algo sobre ti y lo que te apasiona enseñar...',
        fotoUrl: data.fotoUrl || '',
        rol: data.rol
      });

      // Pre-llenamos el formulario de edición con los datos actuales
      setNombreEdit(data.nombre);
      setDescripcionEdit(data.descripcion || '');
      setFotoUrlEdit(data.fotoUrl || '');
    } catch (error) {
      console.error('Error al cargar el perfil:', error);
    }
  };

  // Se ejecuta cada vez que el usuario entra a esta pestaña
  useIonViewWillEnter(() => {
    cargarPerfil();
  });

  // 3. Función para guardar los cambios en la Base de Datos
  const guardarCambios = async () => {
    try {
      await api.put('/usuarios/perfil', {
        nombre: nombreEdit,
        descripcion: descripcionEdit,
        fotoUrl: fotoUrlEdit
      });
      
      setMostrarModal(false);
      cargarPerfil(); // Recargamos para ver los cambios instantáneamente
    } catch (error) {
      console.error('Error al guardar el perfil:', error);
      alert('Hubo un error al actualizar tus datos.');
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border ion-hide-md-up">
        <IonToolbar>
          <IonTitle>Mi Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-no-padding">
        <div className="ion-hide-md-down" style={{ height: '150px', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}></div>

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', position: 'relative', top: '-40px' }}>
          
          <div style={{ background: 'white', borderRadius: '16px', padding: '25px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
              
              {/* Bloque de Foto y Nombre Dinámicos */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ 
                  background: usuario.fotoUrl ? `url(${usuario.fotoUrl}) center/cover` : '#3b82f6', 
                  color: 'white', width: '80px', height: '80px', borderRadius: '16px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontSize: '2.5rem', fontWeight: 'bold', border: '4px solid white', 
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)' 
                }}>
                  {/* Si no hay foto, mostramos la inicial del nombre */}
                  {!usuario.fotoUrl && usuario.nombre.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h1 style={{ margin: 0, fontWeight: 'bold', fontSize: '1.5rem' }}>{usuario.nombre}</h1>
                    <IonBadge color="tertiary">
                      {usuario.rol === 'admin' ? 'ADMINISTRADOR' : 'ESTUDIANTE'}
                    </IonBadge>
                  </div>
                  <p style={{ margin: '5px 0 0 0', color: 'gray' }}>{usuario.correo}</p>
                </div>
              </div>
              
              <IonButton fill="outline" onClick={() => setMostrarModal(true)} style={{ '--border-radius': '8px' }}>
                Editar perfil
              </IonButton>
            </div>

            <p style={{ marginTop: '20px', fontSize: '1.05rem', color: '#444' }}>
              {usuario.descripcion}
            </p>

            <IonGrid className="ion-no-padding" style={{ marginTop: '25px' }}>
              <IonRow style={{ textAlign: 'center' }}>
                <IonCol style={{ borderRight: '1px solid #eee' }}>
                  <span style={{ color: 'gray', fontSize: '0.9rem', display: 'block' }}>🏷️ Puntos</span>
                  <strong style={{ fontSize: '1.5rem', color: '#d97706' }}>{usuario.saldo}</strong>
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

            {/* Medallas simuladas por ahora */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
              <IonBadge style={{ background: '#fef3c7', color: '#d97706', padding: '6px 10px' }}>🏆 Gurú</IonBadge>
            </div>
          </div>

          <IonSegment value={tab} onIonChange={e => setTab(e.detail.value as string)} style={{ marginTop: '30px', marginBottom: '20px' }}>
            <IonSegmentButton value="ofertas"><IonLabel>Ofertas activas</IonLabel></IonSegmentButton>
            <IonSegmentButton value="salas"><IonLabel>Salas creadas</IonLabel></IonSegmentButton>
          </IonSegment>

          {/* ... Aquí va la lista de ofertas (la dejamos igual que tu diseño original) ... */}
          
        </div>
      </IonContent>

      {/* ========================================== */}
      {/* MODAL PARA EDITAR EL PERFIL */}
      {/* ========================================== */}
      <IonModal isOpen={mostrarModal} onDidDismiss={() => setMostrarModal(false)} initialBreakpoint={0.75} breakpoints={[0, 0.75, 1]}>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonTitle>Editar Perfil</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setMostrarModal(false)}>Cerrar</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            
            <IonItem lines="full" style={{ marginBottom: '15px' }}>
              <IonLabel position="stacked">Nombre completo</IonLabel>
              <IonInput 
                value={nombreEdit} 
                onIonInput={e => setNombreEdit(e.detail.value!)} 
                placeholder="Ej: Daniel Serey"
              />
            </IonItem>

            <IonItem lines="full" style={{ marginBottom: '15px' }}>
              <IonLabel position="stacked">Descripción (Sobre ti)</IonLabel>
              <IonTextarea 
                rows={3}
                value={descripcionEdit} 
                onIonInput={e => setDescripcionEdit(e.detail.value!)} 
                placeholder="Cuenta qué te apasiona enseñar..."
              />
            </IonItem>

            <IonItem lines="full" style={{ marginBottom: '30px' }}>
              <IonLabel position="stacked">URL de tu foto de perfil</IonLabel>
              <IonInput 
                value={fotoUrlEdit} 
                onIonInput={e => setFotoUrlEdit(e.detail.value!)} 
                placeholder="Pega un enlace de imagen (http...)"
              />
            </IonItem>

            <IonButton expand="block" onClick={guardarCambios} style={{ fontWeight: 'bold' }}>
              Guardar Cambios
            </IonButton>
          </div>
        </IonContent>
      </IonModal>

    </IonPage>
  );
};

export default Perfil;