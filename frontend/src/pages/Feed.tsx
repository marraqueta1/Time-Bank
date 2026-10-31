import React, { useState } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonChip, IonLabel, IonCard, IonCardHeader, IonCardTitle, 
  IonCardSubtitle, IonCardContent, IonButton, IonBadge, IonSearchbar,
  IonToast, useIonViewWillEnter
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; 
import { authService } from '../services/auth'; 

const CATEGORIAS = ['Todo', 'Ofertas', 'Salas', 'Cálculo', 'Python', 'Inglés', 'Diseño'];

const Feed: React.FC = () => {
  const navigate = useNavigate();
  const [filtroActivo, setFiltroActivo] = useState('Todo');
  const [textoBusqueda, setTextoBusqueda] = useState('');
  
  const [ofertasReales, setOfertasReales] = useState<any[]>([]);
  const [showToast, setShowToast] = useState(false);

  const rolUsuario = authService.getRole(); 

  const handleEliminar = async (id: number) => {
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar esta publicación permanentemente?');
    if (confirmar) {
      try {
        await api.delete(`/ofertas/${id}`);
        cargarOfertas(); 
      } catch (error) {
        console.error(error);
        alert('Hubo un error al intentar borrar la publicación.');
      }
    }
  };

  const cargarOfertas = async () => {
    try {
      const response = await api.get('/ofertas');
      setOfertasReales(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useIonViewWillEnter(() => {
    cargarOfertas();
  });

  const ofertasFiltradas = ofertasReales.filter(oferta => {
    let pasaFiltroCategoria = true;
    if (filtroActivo !== 'Todo') {
      if (filtroActivo === 'Ofertas') pasaFiltroCategoria = oferta.tipo === '1-a-1';
      else if (filtroActivo === 'Salas') pasaFiltroCategoria = oferta.tipo === 'sala';
      else pasaFiltroCategoria = oferta.categoria === filtroActivo;
    }

    let pasaFiltroTexto = true;
    if (textoBusqueda.trim() !== '') {
      const query = textoBusqueda.toLowerCase();
      const nombreAutor = oferta.creador?.nombre || '';
      
      pasaFiltroTexto = 
        oferta.titulo.toLowerCase().includes(query) || 
        oferta.descripcion.toLowerCase().includes(query) ||
        nombreAutor.toLowerCase().includes(query);
    }

    return pasaFiltroCategoria && pasaFiltroTexto;
  });

  const handleInscribirme = (oferta: any) => {
    const guardadas = JSON.parse(localStorage.getItem('inscripciones') || '[]');
    const yaInscrito = guardadas.find((item: any) => item.id === oferta.id);
    
    if (!yaInscrito) {
      guardadas.push(oferta);
      localStorage.setItem('inscripciones', JSON.stringify(guardadas));
    }

    setShowToast(true);
    setTimeout(() => {
      navigate('/app/perfil');
    }, 1500); 
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border ion-hide-md-up">
        <IonToolbar>
          <IonTitle>Hola 👋</IonTitle>
          <IonBadge color="warning" slot="end" className="ion-margin-end" style={{ padding: '8px', color: '#000' }}>
            50 pts
          </IonBadge>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonSearchbar 
          placeholder="Buscar habilidad..." 
          className="ion-padding-bottom"
          value={textoBusqueda}
          onIonInput={(e) => setTextoBusqueda(e.detail.value!)}
        ></IonSearchbar>

        <div style={{ display: 'flex', overflowX: 'auto', gap: '8px', paddingBottom: '10px' }}>
          {CATEGORIAS.map(categoria => (
            <IonChip 
              key={categoria} 
              color={filtroActivo === categoria ? 'primary' : 'medium'}
              style={{ background: filtroActivo === categoria ? '#ebf8ff' : '' }}
              onClick={() => setFiltroActivo(categoria)}
            >
              <IonLabel>{categoria}</IonLabel>
            </IonChip>
          ))}
        </div>

        {ofertasFiltradas.map(oferta => {
          const tipoVisual = oferta.tipo === '1-a-1' ? 'Profesor' : oferta.tipo === 'sala' ? 'Sala' : 'Busca';
          const nombreAutor = oferta.creador?.nombre || 'Usuario';

          return (
            <IonCard key={oferta.id} style={{ borderRadius: '12px', margin: '16px 0', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
              <IonCardHeader style={{ paddingBottom: '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: '#a855f7', color: 'white', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                      {nombreAutor.charAt(0).toUpperCase()}
                    </div>
                    <IonCardSubtitle style={{ textTransform: 'none', margin: 0, color: '#333', fontWeight: 'bold' }}>
                      {nombreAutor}
                    </IonCardSubtitle>
                  </div>
                  <IonBadge color={oferta.tipo === 'sala' ? 'tertiary' : oferta.tipo === 'busco' ? 'warning' : 'primary'}>
                    {tipoVisual}
                  </IonBadge>
                </div>
                <IonCardTitle style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '12px' }}>
                  {oferta.titulo}
                </IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <p style={{ margin: '8px 0', color: '#666' }}>{oferta.descripcion}</p>
                
                <div style={{ display: 'flex', gap: '15px', color: '#888', fontSize: '0.9rem', marginBottom: '15px' }}>
                  <IonBadge color="light">{oferta.categoria}</IonBadge>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '12px' }}>
                  <strong style={{ color: '#d97706', fontSize: '1.1rem' }}>{oferta.puntos} pts</strong>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {rolUsuario === 'admin' && (
                      <IonButton size="small" color="danger" fill="clear" onClick={() => handleEliminar(oferta.id)}>
                        Borrar
                      </IonButton>
                    )}

                    {oferta.tipo === 'sala' && (
                      <IonButton 
                        size="small" 
                        fill="outline"
                        onClick={() => navigate(`/app/offers/${oferta.id}`)}
                      >
                        Ver detalle
                      </IonButton>
                    )}

                    <IonButton 
                      size="small" 
                      fill={oferta.tipo === 'sala' ? 'solid' : 'outline'}
                      onClick={() => {
                        if (oferta.tipo === 'sala') handleInscribirme(oferta);
                        else if (oferta.tipo === 'busco') {
                          
                          const nombreContacto = nombreAutor.split(' ')[0].toLowerCase();
                          navigate(`/app/chats?contacto=${nombreContacto}`);
                        }
                        else navigate(`/app/offers/${oferta.id}`);
                      }}
                    >
                      {oferta.tipo === 'sala' ? 'Inscribirme' : oferta.tipo === 'busco' ? 'Contactar' : 'Ver detalle'}
                    </IonButton>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          );
        })}

        {ofertasFiltradas.length === 0 && (
          <div className="ion-text-center ion-padding" style={{ color: 'gray', marginTop: '40px' }}>
            No hay publicaciones en la base de datos para esta búsqueda.
          </div>
        )}

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Inscripción realizada con éxito"
          duration={1500}
          color="success"
          position="bottom"
        />
      </IonContent>
    </IonPage>
  );
};

export default Feed;
