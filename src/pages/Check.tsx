import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC } from "react";

const Check: FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>forgot</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p>hii</p>
      </IonContent>
    </IonPage>
  );
};

export default Check;
