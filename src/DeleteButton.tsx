import { useMutation } from "@apollo/client";
import { IonButton, IonIcon, IonLoading } from "@ionic/react";
import { trashOutline } from "ionicons/icons";

const DeleteButton: React.FC<any> = ({arr, userId, mutation, refetchQuery}) =>  {  
    let color = "";
    let enabler = false;
    if (arr.length > 0) {
      enabler = true;
      color = "danger";
    } else {
      enabler = false;
      color = "medium";
    }
    const [deletNum, { data, loading, error }] = useMutation(mutation, {
      refetchQueries: [refetchQuery]
    });
    
    if (loading) return <IonLoading isOpen={true} message={'Удаление...'}/>
    if (error) return <h2>error</h2>
  
    return(
      <IonButton disabled={!enabler} color={color} class='delButton' expand='full' onClick={
        ()=>{for(let elem in arr) {
          
            deletNum({variables: {_eq1:userId, _eq2: arr[elem]}});
            
        }; 
        arr.splice(0, arr.length)
        }
      }><IonIcon icon={trashOutline}/></IonButton>
    );
  };

  export default DeleteButton