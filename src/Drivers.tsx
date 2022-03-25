import { IonButton, IonCheckbox, IonFooter, IonIcon, IonItem, IonLabel, IonList, IonPage } from '@ionic/react';
import React, { useState } from 'react';
import {
  useQuery,
  gql,
  useMutation
} from "@apollo/client";
import { trashOutline } from 'ionicons/icons';

const TECHPASSPORTS = gql `
  query User {
    users (where: {id: {_eq: 1}}) {
      id
      cars {
        id
        tech_passport
      }
    }
  }
`;

const DEL = gql `
  mutation MyMutation($_eq: Int) {
    delete_user_cars(where: {user_id: {_eq: 1}, car_id: {_eq: $_eq}}) {
      returning {
        car {
          number
        }
      }
    }
  }
`

const DeleteButton: React.FC<any> = ({arr}) =>  {  
  const [deletNum, { data, loading, error }] = useMutation(DEL, {
    refetchQueries: [TECHPASSPORTS]
  });
  
  if (loading) return <h2>loading</h2>
  if (error) return <h2>error</h2>

  return(
    <IonButton class='delButton' expand='full' onClick={
      ()=>{for(var elem in arr) {
        deletNum({variables: {_eq: arr[elem]}});
      }
      }
    }><IonIcon icon={trashOutline} class='delIcon'/></IonButton>
  );
};

const Drivers: React.FC<any> = ({switcher}) =>  {  
    const [carIds, setCarIds] = useState<number[]>([]);
    
    const checker = (id: number, e: React.MouseEvent<HTMLIonCheckboxElement, MouseEvent>) => {
      if(e.currentTarget.checked) {
        setCarIds((prev) => [...prev, id]);
      } else {
        setCarIds((prev) => prev.filter((carId) => carId !== id));
      }
    }
    const {loading, error, data} = useQuery(TECHPASSPORTS); 
    if (loading) return <h2>loading</h2>
    if (error) return <h2>error</h2>

    return  (
      <IonPage> {data.users.map(({id, cars}:any) => 
        <IonList key={id}> {cars.map(({id, tech_passport}:any) =>
          <IonItem  lines='none' key={id}>
            <IonLabel class="itemfont"> {tech_passport} </IonLabel>
            {switcher && <IonCheckbox class='checkBox' onClick={(e)=>checker(id, e)}/>}
          </IonItem> )}
        </IonList> )}
        <IonFooter>{switcher && <DeleteButton arr = {carIds}/>}</IonFooter>
      </IonPage>
    );

  };

  export default Drivers