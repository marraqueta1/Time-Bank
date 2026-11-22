import React, { useState, useEffect } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonGrid, IonRow, IonCol, IonButton, IonIcon, IonBadge, 
  IonButtons, IonBackButton, IonToast
} from '@ionic/react';
import { useParams, useNavigate } from 'react-router-dom';
import { desktopOutline, timeOutline, pricetagOutline, calendarOutline, peopleOutline, star, shieldCheckmarkOutline, bookmarkOutline } from 'ionicons/icons';
import api from '../services/api';

const DetalleOferta: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [oferta, setOferta] = useState<any>(null);
  const [miSaldo, setMiSaldo] = useState<number>(0);
  const [miId, setMiId] = useState<number | null>(null);
  const [yaInscrito, setYaInscrito] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        setCargando(true);
        const [resOfertas, resPerfil, resPropuestas] = await Promise.all([
          api.get('/ofertas'),
          api.get('/usuarios/perfil'),
          api.get('/propuestas')
        ]);
        const encontrada = resOfertas.data.find((o: any) => o.id.toString() === id);
        const userId = resPerfil.data.id ?? null;

        setOferta(encontrada || null);
        setMiSaldo(resPerfil.data.saldo ?? 0);
        setMiId(userId);

        if (encontrada && userId) {
          const inscrito = (resPropuestas.data || []).some(
            (p: any) => p.ofertaId === encontrada.id && p.solicitanteId === userId && p.estado !== 'cancelada' && p.estado !== 'rechazada'
          );
          setYaInscrito(inscrito);
        }
      } catch (error) {
        console.error('Error cargando el detalle de la oferta:', error);
      } finally {
        setCargando(false);
      }
    };
    fetchDetalle();
  }, [id]);

  const handleEnviarPropuesta = async () => {
    if (!oferta) return;

    if (oferta.creadorId === miId) {
      setToastMsg('No puedes enviar una propuesta a tu propia publicación.');
      setShowToast(true);
      return;
    }

    try {
      setEnviando(true);
      const nombreAutor = oferta.creador?.nombre || 'Usuario';

      await api.post('/propuestas', {
        ofertaId: oferta.id,
        mensaje: `Me interesa tu publicación "${oferta.titulo}".`
      });

      await api.post('/chats', {
        destinatarioId: oferta.creadorId,
        contenido: `¡Hola ${nombreAutor}! Te envié una propuesta por "${oferta.titulo}". ¿Cuándo te acomoda coordinar?`
      });

      window.dispatchEvent(new Event('proposalsChanged'));
      navigate(`/app/chats?contacto=${oferta.creadorId}`);
    } catch (error: any) {
      setToastMsg(error.response?.data?.error || 'Error al enviar la propuesta.');
      setShowToast(true);
    } finally {
      setEnviando(false);
    }
  };

  if (cargando) {
    return (
      <IonPage>
        <IonHeader className="ion-no-border ion-hide-md-up">
          <IonToolbar>
            <IonButtons slot="start"><IonBackButton defaultHref="/app/feed" /></IonButtons>
            <IonTitle>Cargando...</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding ion-text-center">
          <p style={{ marginTop: '50px', color: 'gray' }}>Buscando información de la oferta...</p>
        </IonContent>
      </IonPage>
    );
  }

  if (!oferta) {
    return (
      <IonPage>
        <IonHeader className="ion-no-border ion-hide-md-up">
          <IonToolbar>
            <IonButtons slot="start"><IonBackButton defaultHref="/app/feed" /></IonButtons>
            <IonTitle>Error</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding ion-text-center">
          <p style={{ marginTop: '50px', color: 'red' }}>No se encontró la oferta solicitada.</p>
          <IonButton onClick={() => navigate('/app/feed')}>Volver al inicio</IonButton>
        </IonContent>
      </IonPage>
    );
  }

  const tipoVisual = oferta.tipo === '1-a-1' ? 'PROFESOR' : oferta.tipo === 'sala' ? 'SALA' : 'ESTUDIANTE';
  const nombreAutor = oferta.creador?.nombre || 'Usuario';
  const inicial = nombreAutor.charAt(0).toUpperCase();
  const esMia = oferta.creadorId === miId;
  const inscritos = oferta.inscritos ?? 0;
  const estaLlena = oferta.tipo === 'sala' && oferta.cupoMaximo ? inscritos >= oferta.cupoMaximo : false;

  const detallesGrid = [
    { icon: desktopOutline, title: 'Modalidad', value: 'Online' },
    { icon: timeOutline, title: 'Duración', value: '60 min' },
    { icon: pricetagOutline, title: 'Costo', value: `${oferta.puntos} pts`, color: '#d97706', bg: '#fef3c7' },
    oferta.tipo === 'sala'
      ? {
          icon: peopleOutline,
          title: 'Cupos',
          value: `${inscritos}${oferta.cupoMaximo ? ` / ${oferta.cupoMaximo}` : ''}`,
          color: estaLlena ? '#dc2626' : '#7c3aed',
          bg: estaLlena ? '#fee2e2' : '#f3e8ff'
        }
      : { icon: calendarOutline, title: 'Disponible', value: 'Lun-Vie' }
  ];

  return (
    <IonPage className="ion-page ion-page-visible" style={{ opacity: 1, zIndex: 999 }}>
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
          <div className="ion-hide-md-down ion-margin-bottom" style={{ cursor: 'pointer', color: '#2563eb', fontWeight: 'bold' }} onClick={() => navigate(-1)}>
            ← Volver
          </div>

          <IonGrid className="ion-no-padding">
            <IonRow>
              <IonCol size="12" sizeMd="8" style={{ paddingRight: '20px' }}>
                <div style={{ background: 'white', borderRadius: '16px', padding: '25px', border: '1px solid #eee' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                    <div style={{ background: '#a855f7', color: 'white', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                      {inicial}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h2 style={{ margin: 0, fontWeight: 'bold', fontSize: '1.2rem' }}>{nombreAutor}</h2>
                        <IonBadge color={oferta.tipo === 'sala' ? 'tertiary' : 'primary'}>{tipoVisual}</IonBadge>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'gray', fontSize: '0.9rem', marginTop: '5px' }}>
                        <IonIcon icon={star} style={{ color: '#f59e0b' }} /> 5.0 · 0 reseñas
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '15px' }}>
                    <IonBadge color="light" style={{ color: '#2563eb', background: '#eff6ff' }}>{oferta.categoria}</IonBadge>
                    {oferta.tipo === 'sala' && (
                      <IonBadge color={estaLlena ? 'danger' : 'tertiary'}>
                        👥 {inscritos}{oferta.cupoMaximo ? ` / ${oferta.cupoMaximo}` : ''} inscritos
                      </IonBadge>
                    )}
                  </div>
                  
                  <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginTop: '0' }}>{oferta.titulo}</h1>
                  <p style={{ color: '#444', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '30px' }}>
                    {oferta.descripcion}
                  </p>

                  <IonGrid className="ion-no-padding" style={{ marginBottom: '30px' }}>
                    <IonRow>
                      {detallesGrid.map((item, i) => (
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
                </div>
              </IonCol>

              <IonCol size="12" sizeMd="4">
                <div style={{ background: 'white', borderRadius: '16px', padding: '25px', border: '1px solid #eee', position: 'sticky', top: '20px' }}>
                  <span style={{ color: 'gray', fontSize: '0.9rem' }}>Costo de esta sesión</span>
                  <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#d97706', margin: '5px 0' }}>
                    {oferta.puntos} <span style={{ fontSize: '1rem', color: 'gray', fontWeight: 'normal' }}>puntos</span>
                  </h1>
                  <p style={{ color: 'gray', fontSize: '0.9rem', marginBottom: '20px' }}>Tu saldo: {miSaldo} pts</p>

                  <IonButton 
                    expand="block" 
                    color={yaInscrito ? 'success' : estaLlena ? 'medium' : 'primary'}
                    disabled={esMia || enviando || yaInscrito || estaLlena}
                    style={{ fontWeight: 'bold', '--border-radius': '8px', marginBottom: '10px' }} 
                    onClick={handleEnviarPropuesta}
                  >
                    {esMia ? 'Es tu publicación' : yaInscrito ? 'Ya estás inscrito ✓' : estaLlena ? 'Sala llena' : enviando ? 'Enviando...' : 'Enviar propuesta'}
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

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMsg}
          duration={2500}
          color="danger"
          position="bottom"
        />
      </IonContent>
    </IonPage>
  );
};

export default DetalleOferta;
