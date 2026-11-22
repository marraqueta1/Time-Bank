import React, { useState, useEffect } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonGrid, IonRow, IonCol, IonButton, IonBadge,
  IonSegment, IonSegmentButton, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonModal, IonItem, IonInput, IonTextarea, IonButtons
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Perfil: React.FC = () => {
  const [tab, setTab] = useState('inscripciones');
  const [inscripciones, setInscripciones] = useState<any[]>([]);
  const [misOfertas, setMisOfertas] = useState<any[]>([]);
  const [misSalas, setMisSalas] = useState<any[]>([]);
  const [completados, setCompletados] = useState(0);
  const [errorFoto, setErrorFoto] = useState(false);
  const navigate = useNavigate();
  
  const [usuario, setUsuario] = useState({
    id: 0,
    nombre: 'Cargando...',
    correo: '',
    saldo: 0,
    descripcion: 'Sin descripción.',
    fotoUrl: '',
    rol: 'usuario'
  });

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nombreEdit, setNombreEdit] = useState('');
  const [descripcionEdit, setDescripcionEdit] = useState('');
  const [fotoUrlEdit, setFotoUrlEdit] = useState('');

  const cargarPerfil = async () => {
    try {
      const [resPerfil, resPropuestas, resOfertas] = await Promise.all([
        api.get('/usuarios/perfil'),
        api.get('/propuestas'),
        api.get('/ofertas')
      ]);

      const data = resPerfil.data;
      setUsuario({
        id: data.id,
        nombre: data.nombre,
        correo: data.correo,
        saldo: data.saldo,
        descripcion: data.descripcion || 'Escribe algo sobre ti y lo que te apasiona enseñar...',
        fotoUrl: data.fotoUrl || '',
        rol: data.rol
      });
      setErrorFoto(false);

      setNombreEdit(data.nombre);
      setDescripcionEdit(data.descripcion || '');
      setFotoUrlEdit(data.fotoUrl || '');

      const propuestas = resPropuestas.data || [];

      const misInscripciones = propuestas.filter(
        (p: any) => p.solicitanteId === data.id && p.estado !== 'cancelada' && p.estado !== 'rechazada'
      );
      setInscripciones(misInscripciones);

      const totalCompletados = propuestas.filter(
        (p: any) => p.estado === 'completada'
      ).length;
      setCompletados(totalCompletados);

      const ofertasUsuario = (resOfertas.data || []).filter((o: any) => o.creadorId === data.id);
      setMisOfertas(ofertasUsuario.filter((o: any) => o.tipo !== 'sala'));
      setMisSalas(ofertasUsuario.filter((o: any) => o.tipo === 'sala'));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarPerfil();
  }, []);

  const guardarCambios = async () => {
    try {
      await api.put('/usuarios/perfil', {
        nombre: nombreEdit.trim(),
        descripcion: descripcionEdit.trim(),
        fotoUrl: fotoUrlEdit.trim()
      });
      
      setMostrarModal(false);
      await cargarPerfil(); 
    } catch (error: any) {
      const detalles = error.response?.data?.detalles;
      alert(Array.isArray(detalles) && detalles.length > 0 ? detalles[0] : (error.response?.data?.error || 'Hubo un error al actualizar tus datos.'));
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
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{ 
                  background: '#3b82f6', 
                  color: 'white', width: '80px', height: '80px', borderRadius: '16px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontSize: '2.5rem', fontWeight: 'bold', border: '4px solid white', 
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)', overflow: 'hidden'
                }}>
                  {usuario.fotoUrl && !errorFoto ? (
                    <img
                      src={usuario.fotoUrl}
                      alt={usuario.nombre}
                      onError={() => setErrorFoto(true)}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    usuario.nombre.charAt(0).toUpperCase()
                  )}
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
                  <span style={{ color: 'gray', fontSize: '0.9rem', display: 'block' }}>✅ Completados</span>
                  <strong style={{ fontSize: '1.5rem', color: '#333' }}>{completados}</strong>
                </IonCol>
                <IonCol style={{ borderRight: '1px solid #eee' }}>
                  <span style={{ color: 'gray', fontSize: '0.9rem', display: 'block' }}>🔄 Inscripciones</span>
                  <strong style={{ fontSize: '1.5rem', color: '#16a34a' }}>{inscripciones.length}</strong>
                </IonCol>
                <IonCol>
                  <span style={{ color: 'gray', fontSize: '0.9rem', display: 'block' }}>📚 Publicaciones</span>
                  <strong style={{ fontSize: '1.5rem', color: '#2563eb' }}>{misOfertas.length + misSalas.length}</strong>
                </IonCol>
              </IonRow>
            </IonGrid>

            <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
              <IonBadge style={{ background: '#fef3c7', color: '#d97706', padding: '6px 10px' }}>
                {completados >= 5 ? '🏆 Gurú' : completados >= 1 ? '⭐ Activo' : '🌱 Nuevo'}
              </IonBadge>
            </div>
          </div>

          <IonSegment value={tab} onIonChange={e => setTab(e.detail.value as string)} style={{ marginTop: '30px', marginBottom: '20px' }}>
            <IonSegmentButton value="inscripciones"><IonLabel>Inscripciones ({inscripciones.length})</IonLabel></IonSegmentButton>
            <IonSegmentButton value="ofertas"><IonLabel>Ofertas ({misOfertas.length})</IonLabel></IonSegmentButton>
            <IonSegmentButton value="salas"><IonLabel>Salas ({misSalas.length})</IonLabel></IonSegmentButton>
          </IonSegment>

          {tab === 'inscripciones' && (
            <div style={{ marginTop: '20px' }}>
              {inscripciones.length === 0 ? (
                <div className="ion-text-center" style={{ color: 'gray', padding: '20px' }}>
                  No te has inscrito en ninguna publicación aún.
                </div>
              ) : (
                inscripciones.map((prop: any) => (
                  <IonCard key={prop.id} style={{ borderRadius: '12px', margin: '0 0 15px 0', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                    <IonCardHeader>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <IonBadge color="success">Inscrito ({prop.estado.toUpperCase()})</IonBadge>
                        <IonBadge color="tertiary">{prop.oferta?.categoria}</IonBadge>
                      </div>
                      <IonCardTitle style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '10px' }}>
                        {prop.oferta?.titulo}
                      </IonCardTitle>
                      <IonCardSubtitle>
                        Profesor: {prop.oferta?.creador?.nombre || 'Usuario'}
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <p>{prop.oferta?.descripcion}</p>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                        <IonButton size="small" fill="outline" onClick={() => navigate(`/app/offers/${prop.oferta?.id}`)}>
                          Ver detalle
                        </IonButton>
                      </div>
                    </IonCardContent>
                  </IonCard>
                ))
              )}
            </div>
          )}

          {tab === 'ofertas' && (
            <div style={{ marginTop: '20px' }}>
              {misOfertas.length === 0 ? (
                <div className="ion-text-center" style={{ color: 'gray', padding: '20px' }}>No tienes ofertas activas.</div>
              ) : (
                misOfertas.map((of: any) => (
                  <IonCard key={of.id} style={{ borderRadius: '12px', margin: '0 0 15px 0' }}>
                    <IonCardHeader>
                      <IonCardTitle style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{of.titulo}</IonCardTitle>
                      <IonCardSubtitle>{of.categoria} · {of.puntos} pts</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>{of.descripcion}</IonCardContent>
                  </IonCard>
                ))
              )}
            </div>
          )}

          {tab === 'salas' && (
            <div style={{ marginTop: '20px' }}>
              {misSalas.length === 0 ? (
                <div className="ion-text-center" style={{ color: 'gray', padding: '20px' }}>No has creado salas aún.</div>
              ) : (
                misSalas.map((sala: any) => (
                  <IonCard key={sala.id} style={{ borderRadius: '12px', margin: '0 0 15px 0' }}>
                    <IonCardHeader>
                      <IonCardTitle style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{sala.titulo}</IonCardTitle>
                      <IonCardSubtitle>{sala.categoria} · {sala.puntos} pts</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>{sala.descripcion}</IonCardContent>
                  </IonCard>
                ))
              )}
            </div>
          )}
        </div>
      </IonContent>

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
                onIonInput={e => setNombreEdit(e.detail.value ?? '')} 
                onIonChange={e => setNombreEdit(e.detail.value ?? '')}
                placeholder="Ej: Daniel Serey" 
              />
            </IonItem>

            <IonItem lines="full" style={{ marginBottom: '15px' }}>
              <IonLabel position="stacked">Descripción (Sobre ti)</IonLabel>
              <IonTextarea 
                rows={3} 
                value={descripcionEdit} 
                onIonInput={e => setDescripcionEdit(e.detail.value ?? '')} 
                onIonChange={e => setDescripcionEdit(e.detail.value ?? '')}
                placeholder="Cuenta qué te apasiona enseñar..." 
              />
            </IonItem>

            <IonItem lines="full" style={{ marginBottom: '30px' }}>
              <IonLabel position="stacked">URL de tu foto de perfil</IonLabel>
              <IonInput 
                value={fotoUrlEdit} 
                onIonInput={e => setFotoUrlEdit(e.detail.value ?? '')} 
                onIonChange={e => setFotoUrlEdit(e.detail.value ?? '')}
                placeholder="Pega un enlace directo de imagen (https://...)" 
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
