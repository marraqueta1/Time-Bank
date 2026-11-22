import React, { useState, useEffect } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonChip, IonLabel, IonCard, IonCardHeader, IonCardTitle, 
  IonCardSubtitle, IonCardContent, IonButton, IonBadge, IonSearchbar,
  IonToast
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
  const [saldo, setSaldo] = useState<number>(0);
  const [miId, setMiId] = useState<number | null>(null);
  const [inscritasIds, setInscritasIds] = useState<number[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success' | 'danger'>('success');

  const rolUsuario = authService.getRole(); 

  const handleEliminar = async (id: number) => {
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar esta publicación permanentemente?');
    if (confirmar) {
      try {
        await api.delete(`/ofertas/${id}`);
        cargarDatos(); 
      } catch (error) {
        console.error(error);
        alert('Hubo un error al intentar borrar la publicación.');
      }
    }
  };

  const cargarDatos = async () => {
    try {
      const [resOfertas, resPerfil, resPropuestas] = await Promise.all([
        api.get('/ofertas'),
        api.get('/usuarios/perfil'),
        api.get('/propuestas')
      ]);
      const userId = resPerfil.data.id;
      setMiId(userId);
      setSaldo(resPerfil.data.saldo ?? 0);
      setOfertasReales(resOfertas.data);

      const ids = (resPropuestas.data || [])
        .filter((p: any) => p.solicitanteId === userId && p.estado !== 'cancelada' && p.estado !== 'rechazada')
        .map((p: any) => p.ofertaId);
      setInscritasIds(ids);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

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

  const handleInscribirme = async (oferta: any) => {
    if (oferta.creadorId === miId) {
      setToastColor('danger');
      setToastMessage('No puedes inscribirte a tu propia publicación.');
      setShowToast(true);
      return;
    }

    try {
      await api.post('/propuestas', {
        ofertaId: oferta.id,
        mensaje: `Inscripción a: ${oferta.titulo}`
      });
      await cargarDatos();
      window.dispatchEvent(new Event('proposalsChanged'));
      setToastColor('success');
      setToastMessage(`¡Te inscribiste a "${oferta.titulo}"! Puedes verla en Propuestas y en tu Perfil.`);
      setShowToast(true);
    } catch (error: any) {
      setToastColor('danger');
      setToastMessage(error.response?.data?.error || 'No se pudo completar la inscripción.');
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border ion-hide-md-up">
        <IonToolbar>
          <IonTitle>Hola 👋</IonTitle>
          <IonBadge color="warning" slot="end" className="ion-margin-end" style={{ padding: '8px', color: '#000' }}>
            {saldo} pts
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
          const yaInscrito = inscritasIds.includes(oferta.id);
          const esMia = oferta.creadorId === miId;
          const inscritos = oferta.inscritos ?? 0;
          const estaLlena = oferta.tipo === 'sala' && oferta.cupoMaximo ? inscritos >= oferta.cupoMaximo : false;

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
                
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', color: '#888', fontSize: '0.9rem', marginBottom: '15px' }}>
                  <IonBadge color="light">{oferta.categoria}</IonBadge>
                  {oferta.tipo === 'sala' && (
                    <IonBadge color={estaLlena ? 'danger' : 'tertiary'}>
                      👥 {inscritos}{oferta.cupoMaximo ? ` / ${oferta.cupoMaximo}` : ''} inscritos
                    </IonBadge>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '12px' }}>
                  <strong style={{ color: '#d97706', fontSize: '1.1rem' }}>{oferta.puntos} pts</strong>
                  
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {rolUsuario === 'admin' && (
                      <IonButton size="small" color="danger" fill="clear" onClick={() => handleEliminar(oferta.id)}>
                        Borrar
                      </IonButton>
                    )}

                    {oferta.tipo === 'sala' && (
                      <IonButton size="small" fill="outline" onClick={() => navigate(`/app/offers/${oferta.id}`)}>
                        Ver detalle
                      </IonButton>
                    )}

                    {oferta.tipo === 'sala' ? (
                      <IonButton
                        size="small"
                        color={yaInscrito ? 'success' : estaLlena ? 'medium' : 'primary'}
                        fill="solid"
                        disabled={yaInscrito || esMia || estaLlena}
                        onClick={() => handleInscribirme(oferta)}
                      >
                        {esMia ? 'Tu sala' : yaInscrito ? 'Inscrito ✓' : estaLlena ? 'Sala llena' : 'Inscribirme'}
                      </IonButton>
                    ) : (
                      <IonButton 
                        size="small" 
                        fill="outline"
                        disabled={esMia && oferta.tipo === 'busco'}
                        onClick={() => {
                          if (oferta.tipo === 'busco') {
                            navigate(`/app/chats?contacto=${oferta.creadorId}`);
                          } else {
                            navigate(`/app/offers/${oferta.id}`);
                          }
                        }}
                      >
                        {oferta.tipo === 'busco' ? (esMia ? 'Tu publicación' : 'Contactar') : 'Ver detalle'}
                      </IonButton>
                    )}
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
          message={toastMessage}
          duration={2500}
          color={toastColor}
          position="bottom"
        />
      </IonContent>
    </IonPage>
  );
};

export default Feed;
