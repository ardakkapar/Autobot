import { IonButton, IonCheckbox, IonCol, IonFooter, IonIcon, IonItem, IonLabel, IonList, IonLoading, IonPage, IonRow, useIonViewDidEnter } from '@ionic/react';
import React, { useCallback, useState } from 'react';

import {
  useQuery,
  gql,
  useMutation,
  useLazyQuery
} from "@apollo/client";
import { car, key, reload, trashOutline } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';

const NUMBERS = gql `
  query User($_eq: Int) {
    users (where: {id: {_eq: $_eq}}) {
      id
      cars {
        id
        number
      }
    }
  }
`;



const DEL = gql `
  mutation MyMutation($_eq1: Int, $_eq2: Int) {
    delete_cars(where: {user_id: {_eq: $_eq1}, id: {_eq: $_eq2}}) {
      returning {
        id
        number
        tech_passport
        user_id
      }
    }
  }
`



const DeleteButton: React.FC<any> = ({arr, userId}) =>  {  
  const [deletNum, { data, loading, error }] = useMutation(DEL, {
    refetchQueries: [NUMBERS]
  });
  
  if (loading) return <IonLoading isOpen={true} message={'Удаление...'}/>
  if (error) return <h2>error</h2>

  return(
    <IonButton class='delButton' expand='full' onClick={
      ()=>{for(var elem in arr) {
        deletNum({variables: {_eq1: userId, _eq2: arr[elem]}});
      }
      }
    }><IonIcon icon={trashOutline}/></IonButton>
  );
};

const Automobiles: React.FC<any> = ({switcher}) =>  {  
    const search = useLocation().search;
    const item = new URLSearchParams(search).get("user_id");
    const user_id = Number(item);
    const [carIds, setCarIds] = useState<number[]>([]);
    
    const checker = (id: number, e: React.MouseEvent<HTMLIonCheckboxElement, MouseEvent>) => {
      if(e.currentTarget.checked) {
        setCarIds((prev) => [...prev, id]);
      } else {
        setCarIds((prev) => prev.filter((carId) => carId !== id));
      }
    }
    const {loading, error, data} = useQuery(NUMBERS, {variables: {_eq: user_id}}); 
    if (loading) return <IonLoading isOpen={true} message={'Загрузка...'}></IonLoading>
    if (error) return <h2>error</h2>
    return  (
      <IonPage> {data.users.map(({id, cars}:any) => 
        <IonList key={id}> {cars.map(({id, number}:any) =>
          <IonItem  lines='none' key={id}>
            <IonLabel> {number} </IonLabel>
            {switcher && <IonCheckbox onClick={(e)=>checker(id, e)}/>}
          </IonItem> )}
        </IonList> )}
        <IonFooter>{switcher && <DeleteButton arr = {carIds} userId = {user_id}/>}</IonFooter>
      </IonPage>
    );

  };

  export default Automobiles
  



