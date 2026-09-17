import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, 
  IonButton, IonList, IonListHeader, IonItem, IonLabel, IonText 
} from '@ionic/react';

const Wallet: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Mi Wallet</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        
        {/* Tarjeta de Saldo */}
        <IonCard style={{ background: 'linear-gradient(90deg, #ff9800 0%, #ffc107 100%)', color: 'white', margin: '0 0 20px 0' }}>
          <IonCardHeader>
            <IonCardSubtitle style={{ color: 'white' }}>SALDO DISPONIBLE</IonCardSubtitle>
            <IonCardTitle style={{ color: 'white', fontSize: '3rem', fontWeight: 'bold' }}>45</IonCardTitle>
            <p>≈ $4,500 CLP en beneficios</p>
          </IonCardHeader>
          <div style={{ display: 'flex', padding: '0 15px 15px 15px', gap: '10px' }}>
            <IonButton fill="outline" color="light" style={{ flex: 1 }}>Ganar más</IonButton>
            <IonButton color="light" style={{ flex: 1, color: '#ff9800' }}>Canjear</IonButton>
          </div>
        </IonCard>

        {/* Movimientos Recientes */}
        <IonList>
          <IonListHeader>
            <IonLabel>Movimientos recientes</IonLabel>
          </IonListHeader>

          <IonItem>
            <IonLabel>
              <h2>Clase de Cálculo I</h2>
              <p>Hace 2 días</p>
            </IonLabel>
            <IonText color="success" slot="end">+10</IonText>
          </IonItem>

          <IonItem>
            <IonLabel>
              <h2>Sala de Python</h2>
              <p>Hace 5 días</p>
            </IonLabel>
            <IonText color="danger" slot="end">-15</IonText>
          </IonItem>

          <IonItem>
            <IonLabel>
              <h2>Bono de bienvenida</h2>
              <p>Al registrarte</p>
            </IonLabel>
            <IonText color="success" slot="end">+50</IonText>
          </IonItem>
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Wallet;