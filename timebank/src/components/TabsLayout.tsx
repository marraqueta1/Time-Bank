import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Navigate } from 'react-router-dom';
import { home, addCircle, wallet } from 'ionicons/icons';

import Feed from '../pages/Feed';
import CreateOffer from '../pages/CreateOffer';
import Wallet from '../pages/Wallet';

const TabsLayout: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* Aquí también cambiamos a element */}
        <Route path="/app/feed" element={<Feed />} />
        <Route path="/app/create" element={<CreateOffer />} />
        <Route path="/app/wallet" element={<Wallet />} />
        
        <Route path="/app" element={<Navigate to="/app/feed" />} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="feed" href="/app/feed">
          <IonIcon icon={home} />
          <IonLabel>Inicio</IonLabel>
        </IonTabButton>
        <IonTabButton tab="create" href="/app/create">
          <IonIcon icon={addCircle} />
          <IonLabel>Crear</IonLabel>
        </IonTabButton>
        <IonTabButton tab="wallet" href="/app/wallet">
          <IonIcon icon={wallet} />
          <IonLabel>Mi Wallet</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};
export default TabsLayout;