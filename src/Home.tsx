import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonRouterOutlet, IonTab, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { carSportOutline, personOutline } from 'ionicons/icons';
import { type } from 'os';
import { SetStateAction, useState } from 'react';
import { Redirect, Route, useParams } from 'react-router';
import Automobiles from './Automobiles';
import Drivers from './Drivers';


const Home: React.FC = () => {
  const [carIds, setCarIds] = useState<number[]>([]);
  const [driverIins, setDriverIIns] = useState<number[]>([]);
  const [state, setState] = useState(false);
  const switcher = () => {
    state ? setState(false) : setState(true);
    carIds.splice(0, carIds.length);
    driverIins.splice(0, driverIins.length);
  }

  const [userId, setUserId] = useState<number>();
  const idAssigner = (childId: SetStateAction<number | undefined>) => {
    setUserId(childId);
  }
  
  const [selectedTabButton, setSelected] = useState<boolean>();
  const urlChecker = (childUrl: boolean) => {
    setSelected(childUrl);
  }
  
  return (
    <IonReactRouter>
        <IonHeader>
          <IonToolbar>
              <IonButtons slot="end">
                <IonButton size='small' color='dark' onClick={switcher}>
                  {state ? <p>Готово</p> : <p>Изменить</p>}
                </IonButton>
              </IonButtons>
            <IonTitle size = "large">Autobot</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent> 
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/automobiles/:id" exact={true}>
                <Automobiles switcher = {state} aidi = {idAssigner} url={urlChecker} carIds={carIds} setCarIds={setCarIds}/>
              </Route>
              <Route path="/drivers/:id" exact={true} >
                <Drivers switcher = {state} aidi = {idAssigner} url = {urlChecker} driverIins={driverIins} setDriverIIns={setDriverIIns}/>
              </Route>
              <Route exact path="/" render={() => <Redirect to={`/automobiles/${userId}`}/>}/>
            </IonRouterOutlet>
            <IonTabBar slot="top" onIonTabsDidChange={()=>setState(false)}>
              <IonTabButton selected={selectedTabButton} tab='automobiles' href={`/automobiles/${userId}`}>
                <IonIcon  icon={carSportOutline}/>
                <IonLabel>Автомобили</IonLabel> 
              </IonTabButton>
              <IonTabButton selected={!selectedTabButton} tab="drivers" href={`/drivers/${userId}`}>
                <IonIcon icon={personOutline}/>
                <IonLabel>Водители</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs> 
        </IonContent>
      </IonReactRouter>
  );
};

export default Home;
