import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonCard, IonCardContent, IonToast,  } from '@ionic/react';
import { arrowDownOutline, arrowUpOutline, giftOutline, bookOutline, cafeOutline, ticketOutline, documentTextOutline } from 'ionicons/icons';
import api from '../services/api';

const Wallet: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [puntosTotales, setPuntosTotales] = useState<number>(0);
  const [movimientos, setMovimientos] = useState<any[]>([]);

  const cargarWallet = async () => {
    try {
      const res = await api.get('/wallet');
      setPuntosTotales(res.data.saldo ?? 0);
      setMovimientos(res.data.transacciones || []);
    } catch (error) {
      console.error('Error al cargar wallet:', error);
    }
  };

  useEffect(() => {
  cargarWallet();
}, []);

  const beneficios = [
    { id: 1, titulo: 'Descuento librería', desc: '20% en materiales de estudio', puntos: 30, icon: bookOutline, color: '#3b82f6' },
    { id: 2, titulo: 'Café gratis', desc: 'En cafetería del campus', puntos: 15, icon: cafeOutline, color: '#a855f7' },
    { id: 3, titulo: 'Entrada evento', desc: 'Charla o workshop', puntos: 50, icon: ticketOutline, color: '#22c55e' },
    { id: 4, titulo: 'Certificado', desc: 'De horas de mentoría', puntos: 100, icon: documentTextOutline, color: '#f59e0b' }
  ];

  const registrarMovimiento = async (tipo: 'ingreso' | 'egreso', monto: number, descripcion: string, msgExito: string) => {
    try {
      const res = await api.post('/wallet/movimiento', { tipo, monto, descripcion });
      setPuntosTotales(res.data.saldo);
      setMovimientos(prev => [res.data.transaccion, ...prev]);
      setToastMessage(msgExito);
      window.dispatchEvent(new Event('pointsChanged'));
      setShowToast(true);
    } catch (error: any) {
      setToastMessage(error.response?.data?.error || 'No se pudo completar la operación.');
      setShowToast(true);
    }
  };

  const handleCanjear = (titulo: string, costo: number) => {
    registrarMovimiento('egreso', costo, `Canje: ${titulo}`, `¡Éxito! Has canjeado "${titulo}" por ${costo} puntos.`);
  };

  const handleGanarGratis = () => {
    registrarMovimiento('ingreso', 10, 'Bono de puntos gratis', '¡Felicidades! Has reclamado 10 puntos gratis.');
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border ion-hide-md-up">
        <IonToolbar>
          <IonTitle>Mi Wallet</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ maxWidth: '1000px', margin: '0 auto', paddingTop: '10px' }}>
          <div className="ion-hide-md-down ion-margin-bottom">
            <h1 style={{ fontWeight: 'bold' }}>Mi Wallet</h1>
            <p style={{ color: 'gray' }}>Gestiona tus puntos y canjes</p>
          </div>

          <IonGrid className="ion-no-padding">
            <IonRow>
              <IonCol size="12" sizeMd="5" style={{ paddingRight: '15px', marginBottom: '20px' }}>
                <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', borderRadius: '16px', padding: '25px', color: 'white', boxShadow: '0 10px 15px -3px rgba(245, 158, 11, 0.4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '1px' }}>SALDO DISPONIBLE</span>
                    <IonIcon icon={giftOutline} style={{ fontSize: '1.5rem' }} />
                  </div>
                  
                  <h1 style={{ fontSize: '4rem', fontWeight: 'bold', margin: '10px 0 0 0' }}>{puntosTotales}</h1>
                  <p style={{ margin: '0 0 25px 0', opacity: 0.9 }}>
                    ≈ ${(puntosTotales * 100).toLocaleString('es-CL')} CLP en beneficios
                  </p>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <IonButton onClick={handleGanarGratis} fill="outline" style={{ '--color': 'white', flex: 1 }}>+ Puntos Gratis</IonButton>
                    <IonButton routerLink="/app/feed" style={{ '--background': 'white', '--color': '#d97706', flex: 1 }}>Ver Feed</IonButton>
                  </div>
                </div>
              </IonCol>

              <IonCol size="12" sizeMd="7">
                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: 0 }}>Movimientos recientes</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {movimientos.length === 0 && (
                    <p style={{ color: 'gray' }}>Aún no tienes movimientos registrados.</p>
                  )}
                  {movimientos.map(mov => (
                    <div key={mov.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '15px', borderRadius: '12px', border: '1px solid #eee' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ background: mov.tipo === 'ingreso' ? '#dcfce7' : '#fee2e2', color: mov.tipo === 'ingreso' ? '#16a34a' : '#ef4444', padding: '10px', borderRadius: '10px', display: 'flex' }}>
                          <IonIcon icon={mov.tipo === 'ingreso' ? arrowDownOutline : arrowUpOutline} />
                        </div>
                        <div>
                          <strong style={{ display: 'block', color: '#333' }}>{mov.descripcion}</strong>
                          <span style={{ fontSize: '0.8rem', color: 'gray' }}>
                            {new Date(mov.fechaCreacion).toLocaleDateString('es-CL')}
                          </span>
                        </div>
                      </div>
                      <strong style={{ color: mov.tipo === 'ingreso' ? '#16a34a' : '#ef4444', fontSize: '1.1rem' }}>
                        {mov.tipo === 'ingreso' ? '+' : '-'}{mov.monto}
                      </strong>
                    </div>
                  ))}
                </div>
              </IonCol>
            </IonRow>

            <IonRow style={{ marginTop: '30px' }}>
              <IonCol size="12">
                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Canjea tus puntos</h2>
              </IonCol>
              {beneficios.map(ben => (
                <IonCol size="12" sizeMd="3" key={ben.id}>
                  <IonCard style={{ margin: '0 0 15px 0', borderRadius: '12px', border: '1px solid #eee', boxShadow: 'none' }}>
                    <IonCardContent>
                      <div style={{ background: ben.color, color: 'white', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
                        <IonIcon icon={ben.icon} style={{ fontSize: '1.5rem' }} />
                      </div>
                      <strong style={{ display: 'block', color: '#333', fontSize: '1.1rem' }}>{ben.titulo}</strong>
                      <p style={{ margin: '5px 0 15px 0', color: 'gray', fontSize: '0.9rem', lineHeight: '1.2' }}>{ben.desc}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ color: '#d97706' }}>{ben.puntos} pts</strong>
                        <span 
                          onClick={() => handleCanjear(ben.titulo, ben.puntos)}
                          style={{ color: '#2563eb', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', padding: '5px' }}
                        >
                          Canjear
                        </span>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          color="dark"
          position="bottom"
        />
      </IonContent>
    </IonPage>
  );
};

export default Wallet;
