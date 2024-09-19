import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC } from "react";
import styles from "./Sales.module.scss";
import {
  addOutline,
  menuOutline,
  searchCircleOutline,
  searchCircleSharp,
  searchOutline,
} from "ionicons/icons";
const Sales: FC = () => {
  return (
    <IonPage className={styles.salescontainer}>
      <IonHeader translucent={true} className="ion-no-border">
        <IonToolbar>
          <IonTitle>Invoices</IonTitle>
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

export default Sales;
