import {
  IonContent,
  IonHeader,
  IonPage,
  IonRouterLink,
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
        <IonRouterLink className="custom-link" routerLink="/auth/forgot">
          {" "}
          Forgot Password?
        </IonRouterLink>
      </IonContent>
    </IonPage>
  );
};

export default Check;
