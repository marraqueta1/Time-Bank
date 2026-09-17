import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonItem, IonLabel } from '@ionic/react';

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="ion-text-center">Bienvenido a TimeBank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ marginTop: '50px' }}>
          <IonItem lines="full">
            <IonLabel position="floating">Correo institucional</IonLabel>
            <IonInput type="email" placeholder="tu@universidad.cl"></IonInput>
          </IonItem>
          <IonItem lines="full" className="ion-margin-top">
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput type="password"></IonInput>
          </IonItem>
          <IonButton expand="block" className="ion-margin-top" routerLink="/app/feed">
            Iniciar sesión
          </IonButton>
          <IonButton expand="block" fill="clear" color="medium" routerLink="/registro">
            ¿No tienes cuenta? Regístrate
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default Login;