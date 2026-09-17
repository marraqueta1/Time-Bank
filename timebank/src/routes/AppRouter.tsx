// src/routes/AppRouter.tsx
import { Route, Navigate } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

// Importamos desde las carpetas correctas
import Login from '../pages/Login';
import Register from '../pages/Register';
import TabsLayout from '../components/TabsLayout';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRouter: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
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
  );
};

export default AppRouter;