import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Navigate } from 'react-router-dom';

/* Importación de componentes */
import Login from './pages/Login';
import Register from './pages/Register';
import Feed from './pages/Feed';
import CrearPublicacion from './pages/CreateOffer';
import Wallet from './pages/Wallet';
import MenuLateral from './components/MenuLateral';
import DetalleOferta from './pages/DetalleOferta';
import Propuestas from './pages/Propuestas';
import Perfil from './pages/Perfil';
import Chats from './pages/Chats';

// Core CSS de Ionic
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main-content" when="md">
        
        <MenuLateral />
        
        <IonRouterOutlet id="main-content">
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/app/feed" element={<Feed />} />
          <Route path="/app/crear" element={<CrearPublicacion />} />
          <Route path="/app" element={<Navigate to="/app/feed" replace />} />
          <Route path="/app/wallet" element={<Wallet />} />
          <Route path="/app/propuestas" element={<Propuestas />} />
          
          {/* Aquí está la ruta corregida a offers */}
          <Route path="/app/offers/:id" element={<DetalleOferta />} />
          
          <Route path="/app/perfil" element={<Perfil />} />
          <Route path="/app/chats" element={<Chats />} />
        </IonRouterOutlet>
        
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;