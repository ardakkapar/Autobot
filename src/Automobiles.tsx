import { IonButton, IonCheckbox, IonCol, IonFooter, IonIcon, IonItem, IonLabel, IonList, IonLoading, IonPage, IonRow, useIonViewDidEnter } from '@ionic/react';
import React, { useCallback, useEffect, useState } from 'react';

import {
  useQuery,
  gql,
  useMutation,
  useLazyQuery
} from "@apollo/client";
import { car, key, reload, trashOutline } from 'ionicons/icons';
import { useLocation, useParams } from 'react-router-dom';

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

const DeletButton: React.FC<any> = ({arr, userId}) =>  {  
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
    refetchQueries: [NUMBERS]
  });
  
  if (loading) return <IonLoading isOpen={true} message={'Удаление...'}/>
  if (error) return <h2>error</h2>
  return(
    <IonButton disabled={!enabler} color={color} class='delButton' expand='full' onClick={
      ()=>{for(let elem in arr) {
        deletNum({variables: {_eq1: userId, _eq2: arr[elem]}});
        arr.pop(elem);
      }
      }
    }><IonIcon icon={trashOutline}/></IonButton>
    
  );
};

const Automobiles: React.FC<any> = ({switcher,aidi, url, carIds, setCarIds}) =>  {  
    //check if url has "automobiles" in its path
    useEffect(()=>{url(window.location.pathname.includes("automobiles"))});
    
    //gets user id from the route, then passes its value back to home page
    const {id}: {id:string} = useParams();
    const userId = Number(id);
    useEffect(()=>{aidi(userId)});

    //create array of car ids, fill it with ids of cars from checked items
    //const [carIds, setCarIds] = useState<number[]>([]);
    const checker = (id: number, e: React.MouseEvent<HTMLIonCheckboxElement, MouseEvent>) => {
      if(e.currentTarget.checked) {
        setCarIds((prev:any) => [...prev, id]);
      } else {
        setCarIds((prev:any) => prev.filter((carId:any) => carId !== id));
      }
    }

    //send the query and fetch all cars for user
    const {loading, error, data} = useQuery(NUMBERS, {variables: {_eq: userId}}); 
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
        <IonFooter>{switcher && <DeletButton arr = {carIds} userId = {userId}/>}</IonFooter>
      </IonPage>
    );

  };

  export default Automobiles
  





