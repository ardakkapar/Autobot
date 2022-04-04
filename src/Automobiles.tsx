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
import DeleteButton from './DeleteButton';

const NUMBERS = gql `
  query MyQuery($_eq: Int) {
    users(where: {id: {_eq: $_eq}}) {
      id
      user_cars {
        id
        car {
          id
          number
        }
      }
    }
  }
`;



const DELNUM = gql `
  mutation MyMutation($_eq1: Int, $_eq2: Int) {
    delete_user_cars(where: {user_id: {_eq: $_eq1}, car_id: {_eq: $_eq2}}) {
      returning {
        car {
          number
        }
      }
    }
  }
`

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
      <IonPage> {data.users.map(({id, user_cars}:any) => 
        <IonList key={id}> {user_cars.map(({id, car}:any) =>
          <IonItem  lines='none' key={id}> 
            <IonLabel> {car.number} </IonLabel> 
            {switcher && <IonCheckbox onClick={(e)=>checker(car.id, e)}/>}  
          </IonItem> )} 
        </IonList> )}
        <IonFooter>{switcher && <DeleteButton arr = {carIds} userId = {userId} refetchQuery={NUMBERS} mutation={DELNUM}/>}</IonFooter>
      </IonPage>
    );

  };

  export default Automobiles
  





