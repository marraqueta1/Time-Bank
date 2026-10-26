import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonItem, IonLabel, IonText } from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Register: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!nombre || !correo || !contrasena) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      setError('');
      setMensajeExito('');
      
      await api.post('/usuarios', { 
        nombre,
        correo, 
        contrasena 
      });

      setMensajeExito('¡Cuenta creada con éxito! Redirigiendo al login...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err: any) {
      setError(err.response?.data?.error || 'Hubo un problema al registrar la cuenta.');
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="ion-text-center">Crear Cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <div style={{ marginTop: '30px' }}>
          
          <IonItem lines="full">
            <IonLabel position="floating">Nombre completo</IonLabel>
            <IonInput 
              type="text" 
              placeholder="Ej: Daniel Serey"
              value={nombre}
              onIonInput={(e: any) => setNombre(e.target.value)}
            ></IonInput>
          </IonItem>

          <IonItem lines="full" className="ion-margin-top">
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
              placeholder="Mínimo 6 caracteres"
              value={contrasena}
              onIonInput={(e: any) => setContrasena(e.target.value)}
            ></IonInput>
          </IonItem>

          {error && (
            <IonText color="danger" className="ion-text-center ion-margin-top">
              <p>{error}</p>
            </IonText>
          )}

          {mensajeExito && (
            <IonText color="success" className="ion-text-center ion-margin-top">
              <p>{mensajeExito}</p>
            </IonText>
          )}

          <IonButton expand="block" className="ion-margin-top" onClick={handleRegister}>
            Registrarse
          </IonButton>
          
          <IonButton expand="block" fill="clear" color="medium" routerLink="/login">
            Ya tengo una cuenta
          </IonButton>
          
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;