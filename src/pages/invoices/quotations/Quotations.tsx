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
import { FC } from "react";
import { addOutline, arrowBackOutline, searchOutline } from "ionicons/icons";
import { useHistory } from "react-router";
const Quotations: FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBackOutline} color="primary"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Quotations</IonTitle>
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
    </IonPage>
  );
};

export default Quotations;
