import { IonApp, setupIonicReact } from '@ionic/react';
import AppRouter from './routes/AppRouter';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <AppRouter />
  </IonApp>
);

export default App;