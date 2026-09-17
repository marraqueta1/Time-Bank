import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonSegment, IonSegmentButton, IonLabel, IonItem, IonInput, 
  IonTextarea, IonButton, IonList
} from '@ionic/react';

const CreateOffer: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>Nueva publicación</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p style={{ color: 'gray', marginTop: 0 }}>Elige el tipo de publicación</p>

        <IonSegment value="oferta" className="ion-margin-bottom">
          <IonSegmentButton value="oferta">
            <IonLabel>Oferta 1-a-1</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="sala">
            <IonLabel>Sala grupal</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="busco">
            <IonLabel>Busco</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <IonList>
          <IonItem lines="full">
            <IonLabel position="stacked">Título *</IonLabel>
            <IonInput placeholder="Ej: Introducción a Python"></IonInput>
          </IonItem>

          <IonItem lines="full">
            <IonLabel position="stacked">Categoría *</IonLabel>
            <IonInput placeholder="Ej: Programación"></IonInput>
          </IonItem>

          <IonItem lines="full">
            <IonLabel position="stacked">Descripción *</IonLabel>
            <IonTextarea placeholder="Describe qué aprenderán..." rows={4}></IonTextarea>
          </IonItem>

          <IonItem lines="full">
            <IonLabel position="stacked">Modalidad</IonLabel>
            <IonInput placeholder="Ej: Online"></IonInput>
          </IonItem>

          <IonItem lines="full">
            <IonLabel position="stacked">Puntos a cobrar *</IonLabel>
            <IonInput type="number" placeholder="15"></IonInput>
          </IonItem>
        </IonList>

        <IonButton expand="block" className="ion-margin-top">
          Publicar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CreateOffer;