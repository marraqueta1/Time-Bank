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
import DetalleOferta from '../pages/DetalleOferta';

const TabsLayout: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet id="main-content">
        {}
        <Route path="/app/feed" element={<Feed />} />
        <Route path="/app/crear" element={<CreateOffer />} />
        <Route path="/app/wallet" element={<Wallet />} />
        <Route path="/app/propuestas" element={<Propuestas />} />
        <Route path="/app/chats" element={<Chats />} />
        <Route path="/app/perfil" element={<Perfil />} />
        <Route path="/app/offers/:id" element={<DetalleOferta />} />

        <Route path="/app" element={<Navigate to="/app/feed" />} />
      </IonRouterOutlet>

      {/* Barra inferior (solo visible en celulares) */}
      <IonTabBar slot="bottom" className="ion-hide-md-up">
        <IonTabButton tab="feed" href="/app/feed">
          <IonIcon icon={home} />
          <IonLabel>Inicio</IonLabel>
        </IonTabButton>
        {}
        <IonTabButton tab="propuestas" href="/app/propuestas">
          <IonIcon icon={swapHorizontal} />
          <IonLabel>Propuestas</IonLabel>
        </IonTabButton>
        <IonTabButton tab="crear" href="/app/crear">
          <IonIcon icon={addCircle} />
          <IonLabel>Crear</IonLabel>
        </IonTabButton>
        <IonTabButton tab="chats" href="/app/chats">
          <IonIcon icon={chatbubbles} />
          <IonLabel>Chats</IonLabel>
        </IonTabButton>
        <IonTabButton tab="perfil" href="/app/perfil">
          <IonIcon icon={person} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabsLayout;