import { IonBackdrop, IonButton, IonCheckbox, IonContent, IonFooter, IonIcon, IonItem, IonLabel, IonList, IonLoading, IonPage, useIonLoading } from '@ionic/react';
import React, { useState } from 'react';
import {
  useQuery,
  gql,
  useMutation
} from "@apollo/client";
import { trashOutline } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';



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
  const [deletNum, { data, loading, error }] = useMutation(DEL, {
    refetchQueries: [DRIVERS]
  });
  
  if (loading) return <IonLoading isOpen={true} message={'Удаление...'}/>
  if (error) return <h2>error</h2>

  return(
    <IonButton class='delButton' expand='full' onClick={
      ()=>{for(var elem in arr) {
        deletNum({variables: {_eq1:userId, _eq2: arr[elem]}});
      }
      }
    }><IonIcon icon={trashOutline}/></IonButton>
  );
};

const Drivers: React.FC<any> = ({switcher}) =>  {  
    const search = useLocation().search;
    const item = new URLSearchParams(search).get("user_id");
    const user_id = Number(item);
    const [driverIins, setDriverIIns] = useState<number[]>([]);
    
    const checker = (id: number, e: React.MouseEvent<HTMLIonCheckboxElement, MouseEvent>) => {
      if(e.currentTarget.checked) {
        setDriverIIns((prev) => [...prev, id]);
      } else {
        setDriverIIns((prev) => prev.filter((driverIins) => driverIins !== id));
      }
    }
    const {loading, error, data} = useQuery(DRIVERS, {variables: {_eq:user_id}}); 
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
        <IonFooter>{switcher && <DeleteButton arr = {driverIins} userId={user_id}/>}</IonFooter>
      </IonPage>
    );

  };

  export default Drivers