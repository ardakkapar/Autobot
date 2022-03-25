import React, { useState } from 'react';
import { IonApp, IonButton, IonButtons,  IonContent, IonHeader, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import {carSportOutline, personOutline} from 'ionicons/icons';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { IonReactRouter } from '@ionic/react-router'
import { Route, Redirect } from 'react-router-dom'

import Automobiles from './Automobiles'
import Drivers from './Drivers'

setupIonicReact();

const App: React.FC = () => {
  
  const [state, setState] = useState(false);

  const switcher = () => {
    state ? setState(false) : setState(true);
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonHeader>
          <IonToolbar>
              <IonButtons slot="end">
                <IonButton class='headerButton' size='small' color='dark' onClick={switcher}>
                  {state ? <p>Готово</p> : <p>Изменить</p>}
                </IonButton>
              </IonButtons>
            <IonTitle size = "large" class="headerfont">Autobot</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent> 
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/automobiles"  exact={true}>
                <Automobiles switcher = {state}/>
              </Route>
              <Route path="/drivers" exact={true}>
                <Drivers switcher = {state}/>
              </Route>
              <Route exact path="/" render={() => <Redirect to="/automobiles"/>}/>
            </IonRouterOutlet>
            <IonTabBar slot="top">
              <IonTabButton class='tabButton' tab="automobiles" href="/automobiles">
                <IonIcon class='tabicon' icon={carSportOutline} />
                <p>Автомобили</p> 
              </IonTabButton>
              <IonTabButton class='tabButton' tab="drivers" href = "/drivers">
                <IonIcon class='tabicon' icon={personOutline} />
                <p>Водители</p>
              </IonTabButton>
            </IonTabBar>
          </IonTabs> 
        </IonContent>
      </IonReactRouter>
    </IonApp>
  )
};


export default App;
