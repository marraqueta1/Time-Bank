import React from 'react';
import { 
  IonMenu, IonHeader, IonContent, IonList, IonItem, 
  IonIcon, IonLabel, IonNote, IonButton 
} from '@ionic/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  homeOutline, addCircleOutline, documentTextOutline, 
  chatbubblesOutline, personOutline, walletOutline, logOutOutline 
} from 'ionicons/icons';

const MenuLateral: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/login' || location.pathname === '/registro' || location.pathname === '/') {
    return null;
  }

  const menuItems = [
    { title: 'Inicio', path: '/app/feed', icon: homeOutline },
    { title: 'Crear', path: '/app/crear', icon: addCircleOutline },
    { title: 'Propuestas', path: '/app/propuestas', icon: documentTextOutline, badge: '3' },
    { title: 'Chats', path: '/app/chats', icon: chatbubblesOutline },
    { title: 'Perfil', path: '/app/perfil', icon: personOutline },
    { title: 'Mi Wallet', path: '/app/wallet', icon: walletOutline }
  ];

  const handleCerrarSesion = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <IonMenu contentId="main-content" type="overlay" className="ion-hide-md-down">
      <IonHeader className="ion-no-border" style={{ padding: '20px 20px 10px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: '#2563eb', padding: '8px', borderRadius: '8px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ⏱️
          </div>
          <h2 style={{ margin: 0, fontWeight: 'bold', fontSize: '1.2rem', color: '#111' }}>TimeBank</h2>
        </div>
      </IonHeader>

      <IonContent>
        <IonList lines="none" style={{ padding: '10px' }}>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <IonItem 
                key={index} 
                routerLink={item.path} 
                routerDirection="none"
                style={{
                  '--background': isActive ? '#eff6ff' : 'transparent',
                  '--color': isActive ? '#2563eb' : '#666',
                  borderRadius: '8px',
                  marginBottom: '5px',
                  fontWeight: isActive ? 'bold' : 'normal',
                  cursor: 'pointer'
                }}
              >
                <IonIcon slot="start" icon={item.icon} color={isActive ? "primary" : "medium"} />
                <IonLabel>{item.title}</IonLabel>
                {item.badge && (
                  <IonNote slot="end" style={{ background: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem' }}>
                    {item.badge}
                  </IonNote>
                )}
              </IonItem>
            );
          })}
        </IonList>

        <div style={{ padding: '20px', position: 'absolute', bottom: '60px', width: '100%' }}>
          <div style={{ background: '#fef3c7', borderRadius: '12px', padding: '15px', cursor: 'pointer' }} onClick={() => navigate('/app/wallet')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#d97706', fontWeight: 'bold', fontSize: '0.9rem' }}>
              <IonIcon icon={walletOutline} /> Saldo
            </div>
            <h2 style={{ margin: '10px 0 5px 0', fontWeight: 'bold', color: '#92400e', fontSize: '1.8rem' }}>45 pts</h2>
            <div style={{ fontSize: '0.8rem', color: '#b45309', fontWeight: 'bold' }}>
              Cómo ganar más →
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '10px', width: '100%', padding: '0 20px' }}>
          <IonButton fill="clear" color="medium" onClick={handleCerrarSesion} style={{ width: '100%', justifyContent: 'flex-start' }}>
            <IonIcon slot="start" icon={logOutOutline} />
            Cerrar sesión
          </IonButton>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default MenuLateral;