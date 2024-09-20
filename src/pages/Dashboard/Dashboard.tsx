import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonSegment,
  IonSegmentButton,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC } from "react";
import styles from "./Dashboard.module.scss";
import {
  businessOutline,
  chevronDown,
  compassOutline,
  helpBuoyOutline,
  megaphoneOutline,
  notificationsOutline,
  playCircle,
  radio,
  library,
  search,
} from "ionicons/icons";
import { Route } from "react-router";

const Dashboard: FC = () => {
  return (
    <IonPage className={styles.dashboardpage}>
      <IonHeader translucent={true}>
        <IonToolbar>
          <div className={styles.leftContainer} slot="start">
            {/* <IonIcon icon={businessOutline}></IonIcon> */}
            <IonLabel slot="start">sushant...</IonLabel>
            <IonIcon icon={chevronDown}></IonIcon>
          </div>
          {/* <IonIcon slot="end" icon={notificationsOutline}></IonIcon> */}
        </IonToolbar>
        {/* <IonSegment value="dashboard">
          <IonSegmentButton value="dashboard" layout="icon-start">
            <IonIcon icon={compassOutline}></IonIcon>
            <IonLabel>Dashboard</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="announcements" layout="icon-start">
            <IonIcon icon={megaphoneOutline}></IonIcon>
            <IonLabel>Announcements</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="help" layout="icon-start">
            <IonIcon icon={helpBuoyOutline}></IonIcon>
            <IonLabel>Help</IonLabel>
          </IonSegmentButton>
        </IonSegment> */}
      </IonHeader>

      <IonContent>
        <h1>Animal Facts</h1>
        <h2>Rhinoceros</h2>
        <img
          alt="rhino standing near grass"
          src="https://images.unsplash.com/flagged/photo-1556983257-71fddc36bc75?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
        />
        <p>
          The rhinoceros gets its name from one of its most notable features:
          its horns. The word rhinoceros comes from the Greek words rhino
          meaning “nose” and ceros meaning “horn.”
        </p>
        <h2>Sea Turtle</h2>
        <img
          alt="brown sea turtle in water"
          src="https://images.unsplash.com/photo-1573551089778-46a7abc39d9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=crop&w=1974&q=80"
        />
        <p>
          Sea turtles have large, streamlined shells and non-retractable limbs.
          Their limbs are flippers that help them swim.
        </p>
        <h2>Giraffe</h2>
        <img
          alt="giraffe sticking its tongue out"
          src="https://images.unsplash.com/photo-1577114995803-d8ce0e2b4aa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=crop&w=1746&q=80"
        />
        <p>
          Giraffes are known for their long, tall appearance and spotted
          patterns, leading to the species name “camelopardalis.”
        </p>
        <h2>Elephant</h2>
        <img
          alt="two grey elephants on grass plains during sunset"
          src="https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=crop&w=1754&q=80"
        />
        <p>
          Elephants are large land animals known for their massive bodies, long
          trunks, and large ears.
        </p>
        <h2>Dolphin</h2>
        <img
          alt="black and white dolphin in water"
          src="https://images.unsplash.com/photo-1607153333879-c174d265f1d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8&auto=format&fit=crop&w=1742&q=80"
        />
        <p>
          Dolphins are sleek, intelligent animals that range in color and have a
          streamlined body adapted for fast swimming.
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
