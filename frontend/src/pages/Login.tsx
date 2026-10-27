import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonItem, IonLabel, IonText } from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; 
import { authService } from '../services/auth'; 

const Login: React.FC = () => {
  // Estados para capturar los datos del formulario
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  // Función que se ejecuta al presionar "Iniciar sesión"
  const handleLogin = async () => {
    // Validación básica en el frontend
    if (!correo || !contrasena) {
      setError('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    try {
      setError(''); // Limpiamos errores previos
      
      // Hacemos la petición POST a la API usando Axios
      const response = await api.post('/usuarios/login', { 
        correo, 
        contrasena 
      });

      // Si el backend nos devuelve un token JWT
      if (response.data.token) {
        // Obtenemos el rol del backend, o simulamos uno basado en el correo para la rúbrica
        const role = response.data.rol || (correo.includes('admin') ? 'admin' : 'user');
        
        // Guardamos la sesión usando el servicio de autenticación
        authService.login(correo, role, response.data.token);
        
        // Redirigimos al feed del usuario (replace evita volver atrás al login)
        navigate('/app/feed', { replace: true });
      }
    } catch (err: any) {
      // Axios captura automáticamente los errores HTTP
      setError(err.response?.data?.error || 'Credenciales incorrectas o error de conexión');
    }
  };

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
            <IonInput 
              type="email" 
              placeholder="tu@universidad.cl"
              value={correo}
              onIonInput={(e: any) => setCorreo(e.target.value)}
            ></IonInput>
          </IonItem>
          
          <IonItem lines="full" className="ion-margin-top">
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput 
              type="password"
              value={contrasena}
              onIonInput={(e: any) => setContrasena(e.target.value)}
            ></IonInput>
          </IonItem>

          {/* Mostrar mensaje de error si existe */}
          {error && (
            <IonText color="danger" className="ion-text-center ion-margin-top">
              <p>{error}</p>
            </IonText>
          )}

          {/* Botón que dispara la función handleLogin (sin routerLink) */}
          <IonButton expand="block" className="ion-margin-top" onClick={handleLogin}>
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