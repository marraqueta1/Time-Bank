import React from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Navigate } from 'react-router-dom';

import { home, addCircle, wallet, swapHorizontal, chatbubbles, person } from 'ionicons/icons';

// Importamos todas las páginas
import Feed from '../pages/Feed';
import CreateOffer from '../pages/CreateOffer';
import Wallet from '../pages/Wallet';
import Propuestas from '../pages/Propuestas'; 
import Chats from '../pages/Chats'; 
import Perfil from '../pages/Perfil'; 
import DetalleOferta from '../pages/DetalleOferta'; // <-- LA RUTA QUE FALTABA

const TabsLayout: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet id="main-content">
        <Route path="/app/feed" element={<Feed />} />
        <Route path="/app/create" element={<CreateOffer />} />
        <Route path="/app/wallet" element={<Wallet />} />
        <Route path="/app/proposals" element={<Propuestas />} />
        <Route path="/app/chat" element={<Chats />} />
        <Route path="/app/profile" element={<Perfil />} />
        
        {/* RUTA DE DETALLES */}
        <Route path="/app/offers/:id" element={<DetalleOferta />} />

        <Route path="/app" element={<Navigate to="/app/feed" />} />
      </IonRouterOutlet>

      {/* Barra inferior (solo visible en celulares) */}
      <IonTabBar slot="bottom" className="ion-hide-md-up">
        <IonTabButton tab="feed" href="/app/feed">
          <IonIcon icon={home} />
          <IonLabel>Inicio</IonLabel>
        </IonTabButton>
        <IonTabButton tab="proposals" href="/app/proposals">
          <IonIcon icon={swapHorizontal} />
          <IonLabel>Propuestas</IonLabel>
        </IonTabButton>
        <IonTabButton tab="create" href="/app/create">
          <IonIcon icon={addCircle} />
          <IonLabel>Crear</IonLabel>
        </IonTabButton>
        <IonTabButton tab="chat" href="/app/chat">
          <IonIcon icon={chatbubbles} />
          <IonLabel>Chat</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/app/profile">
          <IonIcon icon={person} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabsLayout;