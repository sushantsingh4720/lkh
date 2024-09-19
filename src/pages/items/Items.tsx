import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import { FC } from "react";

const Items: FC = () => {
  return (
    <IonPage>
      <IonHeader translucent={true} className="ion-no-border">
        <IonToolbar>
          <IonTitle>Items</IonTitle>
          <IonIcon slot='end' icon={searchOutline} className="backgroundwhiteicon"></IonIcon>
        </IonToolbar>
      </IonHeader>
      <IonContent ></IonContent>

    </IonPage>
  );
};

export default Items;
