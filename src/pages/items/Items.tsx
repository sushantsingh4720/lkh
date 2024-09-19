import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addOutline, searchOutline } from "ionicons/icons";
import { FC } from "react";

const Items: FC = () => {
  return (
    <div id="items">
      <IonHeader translucent={true} >
        <IonToolbar>
          <IonTitle>Items</IonTitle>
          <IonIcon
            slot="end"
            icon={searchOutline}
            className="backgroundwhiteicon"
          ></IonIcon>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton slot="fixed">
          <IonIcon icon={addOutline}></IonIcon>
        </IonButton>
      </IonContent>
    </div>
  );
};

export default Items;
