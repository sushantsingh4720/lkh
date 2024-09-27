import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addOutline, arrowBackOutline, searchOutline } from "ionicons/icons";
import { FC } from "react";
import { useHistory } from "react-router";

const Leads: FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBackOutline} color="primary"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Leads</IonTitle>
          <IonIcon
            slot="end"
            icon={searchOutline}
            className="backgroundwhiteicon"
          ></IonIcon>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton slot="fixed" routerLink="">
          <IonIcon icon={addOutline}></IonIcon>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Leads;
