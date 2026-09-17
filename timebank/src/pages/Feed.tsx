import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonSearchbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonBadge,
  IonButton,
  IonAvatar,
  IonItem,
  IonLabel,
  IonIcon,
  IonChip
} from '@ionic/react';
import { star } from 'ionicons/icons';

const Feed: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Hola, Usuario </IonTitle>
          <IonBadge color="warning" slot="end" className="ion-margin-end">
            45 pts
          </IonBadge>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Buscador */}
        <IonSearchbar placeholder="Buscar habilidad..."></IonSearchbar>

        {/* Categorías (Filtros) */}
        <div style={{ display: 'flex', overflowX: 'auto', paddingBottom: '10px' }}>
          <IonChip color="primary">Todo</IonChip>
          <IonChip outline={true}>Ofertas</IonChip>
          <IonChip outline={true}>Salas</IonChip>
          <IonChip outline={true}>Python</IonChip>
          <IonChip outline={true}>Inglés</IonChip>
        </div>

        {/* Tarjeta de Oferta 1 (Figma) */}
        <IonCard className="ion-margin-bottom">
          <IonItem lines="none">
            <IonAvatar slot="start">
              <div style={{ background: '#d500f9', width: '100%', height: '100%', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>R</div>
            </IonAvatar>
            <IonLabel>
              <h2>Rodrigo M.</h2>
              <p><IonIcon icon={star} style={{ color: '#ffc409' }}/> 4.8 • 12 reseñas</p>
            </IonLabel>
            <IonBadge color="tertiary" slot="end">PROFESOR</IonBadge>
          </IonItem>

          <IonCardHeader style={{ paddingTop: '0' }}>
            <IonCardSubtitle color="primary">Programación</IonCardSubtitle>
            <IonCardTitle style={{ fontSize: '1.2rem' }}>Introducción a Python</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Aprende desde cero variables, tipos de datos y funciones, con ejemplos prácticos.
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', alignItems: 'center' }}>
              <strong style={{ color: '#ffc409', fontSize: '1.2rem' }}>15 pts</strong>
              <IonButton size="small">Ver detalle</IonButton>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Tarjeta de Oferta 2 (Figma) */}
        <IonCard>
          <IonItem lines="none">
            <IonAvatar slot="start">
              <div style={{ background: '#00bcd4', width: '100%', height: '100%', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>M</div>
            </IonAvatar>
            <IonLabel>
              <h2>María L.</h2>
              <p><IonIcon icon={star} style={{ color: '#ffc409' }}/> 4.9 • 28 reseñas</p>
            </IonLabel>
            <IonBadge color="success" slot="end">SALA</IonBadge>
          </IonItem>

          <IonCardHeader style={{ paddingTop: '0' }}>
            <IonCardTitle style={{ fontSize: '1.2rem' }}>Repaso intensivo Cálculo II</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Integrales, series y aplicaciones. Cupos limitados.
            <p style={{ marginTop: '10px' }}><strong>15 Mar - 18:00</strong></p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', alignItems: 'center' }}>
              <strong style={{ color: '#ffc409', fontSize: '1.2rem' }}>20 pts</strong>
              <IonButton size="small">Inscribirme</IonButton>
            </div>
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Feed;