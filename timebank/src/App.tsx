import { Route, Navigate } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Login from './pages/Login';
import Register from './pages/Register';
import TabsLayout from './components/TabsLayout';
import ProtectedRoute from './components/ProtectedRoute';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Aquí está el cambio a element={<Componente />} */}
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/registro" element={<Register />} />
        
        <Route exact path="/" element={<Navigate to="/login" />} />
        
        <Route path="/app/*" element={
          <ProtectedRoute>
            <TabsLayout />
          </ProtectedRoute>
        } />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);
export default App;