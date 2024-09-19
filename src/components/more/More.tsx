import {
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC } from "react";

const More: FC = () => {
  return (
    <div id="more">
      <IonHeader translucent={true} >
        <IonToolbar>
          <IonTitle>More Modules</IonTitle>
          <IonLabel slot="end">Customise</IonLabel>
        </IonToolbar>
      </IonHeader>
      <IonContent></IonContent>
    </div>
  );
};

export default More;
