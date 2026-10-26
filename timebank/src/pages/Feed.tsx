import React, { useState } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonChip, IonLabel, IonCard, IonCardHeader, IonCardTitle, 
  IonCardSubtitle, IonCardContent, IonButton, IonBadge, IonSearchbar 
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';

// 1. Datos simulados requeridos por la rúbrica
const OFERTAS_SIMULADAS = [
  { id: 1, autor: 'Rodrigo M.', tipo: 'Profesor', titulo: 'Introducción a Python', descripcion: 'Aprende desde cero variables, tipos de datos y funciones.', categoria: 'Python', puntos: 15, modalidad: 'Online', duracion: '60 min' },
  { id: 2, autor: 'María L.', tipo: 'Sala', titulo: 'Repaso intensivo Cálculo II', descripcion: 'Integrales, series y aplicaciones. Cupos limitados.', categoria: 'Cálculo', puntos: 20, modalidad: 'Presencial', inscritos: '3/5' },
  { id: 3, autor: 'Javier P.', tipo: 'Busca', titulo: 'Ayuda con Inglés B1', descripcion: 'Ofrece clases de guitarra a cambio.', categoria: 'Inglés', puntos: 12, modalidad: 'Online', duracion: '45 min' },
  { id: 4, autor: 'Ana S.', tipo: 'Profesor', titulo: 'Diseño UI con Figma', descripcion: 'Componentes y Auto Layout.', categoria: 'Diseño', puntos: 25, modalidad: 'Online', duracion: '90 min' }
];

const CATEGORIAS = ['Todo', 'Ofertas', 'Salas', 'Cálculo', 'Python', 'Inglés', 'Diseño'];

const Feed: React.FC = () => {
  const navigate = useNavigate();
  // Estado para el chip activo (filtrado)
  const [filtroActivo, setFiltroActivo] = useState('Todo');

  // Lógica de filtrado
  const ofertasFiltradas = OFERTAS_SIMULADAS.filter(oferta => {
    if (filtroActivo === 'Todo') return true;
    if (filtroActivo === 'Ofertas' && oferta.tipo === 'Profesor') return true;
    if (filtroActivo === 'Salas' && oferta.tipo === 'Sala') return true;
    return oferta.categoria === filtroActivo;
  });

  return (
    <IonPage>
      <IonHeader className="ion-no-border ion-hide-md-up">
        <IonToolbar>
          <IonTitle>Hola, Camila 👋</IonTitle>
          <IonBadge color="warning" slot="end" className="ion-margin-end" style={{ padding: '8px', color: '#000' }}>
            45 pts
          </IonBadge>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonSearchbar placeholder="Buscar habilidad..." className="ion-padding-bottom"></IonSearchbar>

        {/* 2. Chips clickeables con filtrado funcional */}
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

        {/* Renderizado de las tarjetas filtradas */}
        {ofertasFiltradas.map(oferta => (
          <IonCard key={oferta.id} style={{ borderRadius: '12px', margin: '16px 0', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <IonCardHeader style={{ paddingBottom: '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ background: '#a855f7', color: 'white', width: '35px', height: '35px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    {oferta.autor.charAt(0)}
                  </div>
                  <IonCardSubtitle style={{ textTransform: 'none', margin: 0, color: '#333', fontWeight: 'bold' }}>
                    {oferta.autor}
                  </IonCardSubtitle>
                </div>
                <IonBadge color={oferta.tipo === 'Sala' ? 'tertiary' : oferta.tipo === 'Busca' ? 'warning' : 'primary'}>
                  {oferta.tipo}
                </IonBadge>
              </div>
              <IonCardTitle style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '12px' }}>
                {oferta.titulo}
              </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <p style={{ margin: '8px 0', color: '#666' }}>{oferta.descripcion}</p>
              
              <div style={{ display: 'flex', gap: '15px', color: '#888', fontSize: '0.9rem', marginBottom: '15px' }}>
                <span>{oferta.modalidad}</span>
                <span>{oferta.duracion || oferta.inscritos}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '12px' }}>
                <strong style={{ color: '#d97706', fontSize: '1.1rem' }}>{oferta.puntos} pts</strong>
                
                {/* 3. Navegación al detalle */}
                <IonButton 
                  size="small" 
                  fill={oferta.tipo === 'Sala' ? 'solid' : 'outline'}
                  onClick={() => navigate(`/app/oferta/${oferta.id}`)}
                >
                  {oferta.tipo === 'Sala' ? 'Inscribirme' : oferta.tipo === 'Busca' ? 'Contactar' : 'Ver detalle'}
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        ))}

        {ofertasFiltradas.length === 0 && (
          <div className="ion-text-center ion-padding" style={{ color: 'gray', marginTop: '40px' }}>
            No hay publicaciones para esta categoría.
          </div>
        )}

      </IonContent>
    </IonPage>
  );
};

export default Feed;