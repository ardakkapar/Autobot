import React, { useEffect, useState } from 'react';
import { IonApp, IonButton, IonButtons,  IonContent, IonHeader, IonIcon, IonLabel, IonRouterOutlet, IonTab, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
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
import { Route, Redirect, useLocation, useParams} from 'react-router-dom'

import Automobiles from './Automobiles'
import Drivers from './Drivers'
import Home from './Home';

setupIonicReact();




const App: React.FC = () => {
 
  return (
    <IonApp>
      <Home/>
    </IonApp>
  )
};


export default App;


