import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { authService } from '../services/auth';
import ProtectedRoute from './ProtectedRoute';

// Importamos tus páginas reales
import Login from '../pages/Login';
import Feed from '../pages/Feed';
import DetalleOferta from '../pages/DetalleOferta';
import Propuestas from '../pages/Propuestas';
import Chats from '../pages/Chats';
import Perfil from '../pages/Perfil';

// 1. Componente mínimo para la vista 404
const NotFound: React.FC = () => (
  <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}>
    <h1>404</h1>
    <p>La página que buscas no existe.</p>
  </div>
);

// 2. Componente mínimo para las rutas de Admin
const AdminDashboard: React.FC = () => (
  <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}>
    <h1>Panel de Administración</h1>
    <p>Vista exclusiva para administradores.</p>
  </div>
);

// 3. Lógica para redirigir la ruta raíz "/"
const RootRedirect: React.FC = () => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return authService.getRole() === 'admin' ? <Navigate to="/admin" replace /> : <Navigate to="/app/feed" replace />;
};

const AppRouter: React.FC = () => {
  return (
    <IonRouterOutlet>
      {/* Redirección inteligente de la ruta raíz */}
      <Route path="/" element={<RootRedirect />} />

      {/* Ruta Pública */}
      <Route path="/login" element={<Login />} />

      {/* Rutas Protegidas de Usuario */}
      <Route path="/app/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
      <Route path="/app/offers/:id" element={<ProtectedRoute><DetalleOferta /></ProtectedRoute>} />
      <Route path="/app/proposals" element={<ProtectedRoute><Propuestas /></ProtectedRoute>} />
      <Route path="/app/chat" element={<ProtectedRoute><Chats /></ProtectedRoute>} />
      <Route path="/app/profile" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />

      {/* Ruta Protegida de Administrador */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />

      {/* Ruta 404 */}
      <Route path="*" element={<NotFound />} />
    </IonRouterOutlet>
  );
};

export default AppRouter;