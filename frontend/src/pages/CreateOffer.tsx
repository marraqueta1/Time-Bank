import React, { useState } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonInput, IonTextarea, IonButton, IonItem, IonLabel, 
  IonSegment, IonSegmentButton, IonText, IonRow, IonCol, IonGrid
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const CrearPublicacion: React.FC = () => {
  const navigate = useNavigate();
  
  const [tipo, setTipo] = useState<'1-a-1' | 'sala' | 'busco'>('1-a-1');

  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [modalidad, setModalidad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [duracion, setDuracion] = useState('');
  const [puntos, setPuntos] = useState('');
  const [cupos, setCupos] = useState(''); 
  
  const [error, setError] = useState('');

  const dias = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const [diasSeleccionados, setDiasSeleccionados] = useState<string[]>([]);

  const toggleDia = (dia: string) => {
    if (diasSeleccionados.includes(dia)) {
      setDiasSeleccionados(diasSeleccionados.filter(d => d !== dia));
    } else {
      setDiasSeleccionados([...diasSeleccionados, dia]);
    }
  };

  const handlePublicar = async () => {
    if (!titulo || !categoria || !descripcion || !puntos) {
      setError('Por favor, completa todos los campos obligatorios (*).');
      return;
    }

    if (tipo === 'sala') {
      const cupoNum = Number(cupos);
      if (!cupos || isNaN(cupoNum) || cupoNum < 2 || cupoNum > 100) {
        setError('Ingresa un límite de cupos válido para la sala (entre 2 y 100 personas).');
        return;
      }
    }
    
    try {
      setError('');
      
      await api.post('/ofertas', { 
        titulo, 
        categoria, 
        descripcion, 
        puntos: Number(puntos), 
        tipo,
        cupoMaximo: tipo === 'sala' ? Number(cupos) : null
      });
      
      alert('¡Publicación creada con éxito en la base de datos!');
      
      setTitulo('');
      setCategoria('');
      setModalidad('');
      setDescripcion('');
      setDuracion('');
      setPuntos('');
      setCupos('');
      
      navigate('/app/feed');
    } catch (err: any) {
      const detalles = err.response?.data?.detalles;
      if (Array.isArray(detalles) && detalles.length > 0) {
        setError(detalles[0]);
      } else {
        setError(err.response?.data?.error || 'Hubo un error al conectar con el servidor.');
      }
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border ion-hide-md-up">
        <IonToolbar>
          <IonTitle>Nueva publicación</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '20px' }}>
          
          <div className="ion-hide-md-down ion-margin-bottom">
            <h1 style={{ fontWeight: 'bold' }}>Nueva publicación</h1>
            <p style={{ color: 'gray' }}>Elige el tipo y completa la información</p>
          </div>

          <IonSegment 
            value={tipo} 
            onIonChange={(e) => setTipo(e.detail.value as any)}
            style={{ marginBottom: '30px' }}
          >
            <IonSegmentButton value="1-a-1">
              <IonLabel>Oferta 1-a-1</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="sala">
              <IonLabel>Sala grupal</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="busco">
              <IonLabel>Busco algo</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          <IonItem lines="none" style={{ border: '1px solid #ddd', borderRadius: '8px', marginBottom: '15px' }}>
            <IonLabel position="stacked" style={{ color: '#666' }}>Título *</IonLabel>
            <IonInput 
              placeholder={tipo === 'busco' ? "Ej: Necesito ayuda con Cálculo" : "Ej: Introducción a Python"}
              value={titulo} 
              onIonInput={(e) => setTitulo(e.detail.value ?? '')} 
            />
          </IonItem>

          <IonGrid className="ion-no-padding">
            <IonRow>
              <IonCol size="12" sizeMd="6" style={{ paddingRight: '10px' }}>
                <IonItem lines="none" style={{ border: '1px solid #ddd', borderRadius: '8px', marginBottom: '15px' }}>
                  <IonLabel position="stacked" style={{ color: '#666' }}>Categoría *</IonLabel>
                  <IonInput placeholder="Ej: Programación" value={categoria} onIonInput={(e) => setCategoria(e.detail.value ?? '')} />
                </IonItem>
              </IonCol>
              <IonCol size="12" sizeMd="6">
                <IonItem lines="none" style={{ border: '1px solid #ddd', borderRadius: '8px', marginBottom: '15px' }}>
                  <IonLabel position="stacked" style={{ color: '#666' }}>Modalidad</IonLabel>
                  <IonInput placeholder="Ej: Online" value={modalidad} onIonInput={(e) => setModalidad(e.detail.value ?? '')} />
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>

          <IonItem lines="none" style={{ border: '1px solid #ddd', borderRadius: '8px', marginBottom: '15px' }}>
            <IonLabel position="stacked" style={{ color: '#666' }}>Descripción *</IonLabel>
            <IonTextarea 
              rows={4} 
              placeholder={tipo === 'busco' ? "Describe qué necesitas aprender..." : "Describe qué aprenderán tus estudiantes..."}
              value={descripcion} 
              onIonInput={(e) => setDescripcion(e.detail.value ?? '')} 
            />
          </IonItem>

          <IonGrid className="ion-no-padding">
            <IonRow>
              {tipo !== 'busco' && (
                <IonCol size="12" sizeMd="6" style={{ paddingRight: '10px' }}>
                  <IonItem lines="none" style={{ border: '1px solid #ddd', borderRadius: '8px', marginBottom: '15px' }}>
                    <IonLabel position="stacked" style={{ color: '#666' }}>Duración</IonLabel>
                    <IonInput placeholder="Ej: 60 minutos" value={duracion} onIonInput={(e) => setDuracion(e.detail.value ?? '')} />
                  </IonItem>
                </IonCol>
              )}
              
              <IonCol size="12" sizeMd={tipo === 'busco' ? "12" : "6"}>
                <IonItem lines="none" style={{ border: '1px solid #ddd', borderRadius: '8px', marginBottom: '15px' }}>
                  <IonLabel position="stacked" style={{ color: '#666' }}>Puntos {tipo === 'busco' ? 'a ofrecer' : 'a cobrar'} *</IonLabel>
                  <IonInput type="number" placeholder="Ej: 15" value={puntos} onIonInput={(e) => setPuntos(e.detail.value ?? '')} />
                </IonItem>
              </IonCol>

              {tipo === 'sala' && (
                <IonCol size="12">
                  <IonItem lines="none" style={{ border: '1px solid #ddd', borderRadius: '8px', marginBottom: '15px' }}>
                    <IonLabel position="stacked" style={{ color: '#666' }}>Cupos disponibles *</IonLabel>
                    <IonInput type="number" placeholder="Ej: 5" value={cupos} onIonInput={(e) => setCupos(e.detail.value ?? '')} />
                  </IonItem>
                </IonCol>
              )}
            </IonRow>
          </IonGrid>

          {tipo !== 'busco' && (
            <div style={{ marginBottom: '30px' }}>
              <IonLabel style={{ color: '#666', fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Días disponibles</IonLabel>
              <div style={{ display: 'flex', gap: '10px' }}>
                {dias.map((dia, index) => (
                  <div 
                    key={index}
                    onClick={() => toggleDia(dia + index)}
                    style={{ 
                      width: '40px', height: '40px', borderRadius: '8px', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      background: diasSeleccionados.includes(dia + index) ? '#2563eb' : '#f3f4f6',
                      color: diasSeleccionados.includes(dia + index) ? 'white' : '#666',
                      cursor: 'pointer', fontWeight: 'bold'
                    }}>
                    {dia}
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && <IonText color="danger"><p>{error}</p></IonText>}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '20px' }}>
            <IonButton fill="clear" color="medium" onClick={() => navigate('/app/feed')}>Cancelar</IonButton>
            <IonButton color="primary" style={{ fontWeight: 'bold', '--border-radius': '8px' }} onClick={handlePublicar}>
              Publicar
            </IonButton>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default CrearPublicacion;
