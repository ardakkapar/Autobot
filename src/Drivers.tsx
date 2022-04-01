import { IonBackdrop, IonButton, IonCheckbox, IonContent, IonFooter, IonIcon, IonItem, IonLabel, IonList, IonLoading, IonPage, useIonLoading } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import {
  useQuery,
  gql,
  useMutation
} from "@apollo/client";
import { trashOutline } from 'ionicons/icons';
import { useLocation, useParams } from 'react-router-dom';



const DRIVERS = gql `
  query User($_eq: Int) {
    users (where: {id: {_eq: $_eq}}) {
      id
      drivers {
        id
        iin_number
      }
    }
  }
`;

const DEL = gql `
  mutation MyMutation($_eq1: Int, $_eq2: Int) {
    delete_drivers(where: {user_id: {_eq: $_eq1}, id: {_eq: $_eq2}}) {
      returning {
        id
        iin_number
      }
    }
  }
`


const DeleteButton: React.FC<any> = ({arr, userId}) =>  {  
  let color = "";
  let enabler = false;
  if (arr.length > 0) {
    enabler = true;
    color = "danger";
  } else {
    enabler = false;
    color = "medium";
  }
  const [deletNum, { data, loading, error }] = useMutation(DEL, {
    refetchQueries: [DRIVERS]
  });
  
  if (loading) return <IonLoading isOpen={true} message={'Удаление...'}/>
  if (error) return <h2>error</h2>

  return(
    <IonButton disabled={!enabler} color={color} class='delButton' expand='full' onClick={
      ()=>{for(let elem in arr) {
        deletNum({variables: {_eq1:userId, _eq2: arr[elem]}});
        arr.pop(elem);
      }
      }
    }><IonIcon icon={trashOutline}/></IonButton>
  );
};

const Drivers: React.FC<any> = ({switcher, aidi, url, driverIins, setDriverIIns}) =>  {  
    useEffect(()=>{url(window.location.pathname.includes("automobiles"))});
      
    
    const {id}: {id:string} = useParams();
    const userId = Number(id);
    
    useEffect(()=>{aidi(userId)});
  
    
    const checker = (id: number, e: React.MouseEvent<HTMLIonCheckboxElement, MouseEvent>) => {
      if(e.currentTarget.checked) {
        setDriverIIns((prev:any) => [...prev, id]);
      } else {
        setDriverIIns((prev:any) => prev.filter((driverIins:any) => driverIins !== id));
      }
    }
    const {loading, error, data} = useQuery(DRIVERS, {variables: {_eq:userId}}); 
    if (loading) return <IonLoading isOpen={true} message={'Загрузка...'}></IonLoading>
    if (error) return <h2>error</h2>

    return  (
      <IonPage> {data.users.map(({id, drivers}:any) => 
        <IonList key={id}> {drivers.map(({id, iin_number}:any) =>
          <IonItem  lines='none' key={id}>
            <IonLabel> {iin_number} </IonLabel>
            {switcher && <IonCheckbox onClick={(e)=>checker(id, e)}/>}
          </IonItem> )}
        </IonList> )}
        <IonFooter>{switcher && <DeleteButton arr = {driverIins} userId={userId}/>}</IonFooter>
      </IonPage>
    );

  };

  export default Drivers