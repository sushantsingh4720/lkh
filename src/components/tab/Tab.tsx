import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  compassOutline,
  cubeOutline,
  ellipseOutline,
  ellipsisHorizontalCircleOutline,
  ellipsisHorizontalOutline,
  library,
  peopleOutline,
  playCircle,
  radio,
  readerOutline,
  search,
} from "ionicons/icons";
import { FC } from "react";
import Dashboard from "../../pages/dashboard/Dashboard";
import Contacts from "../../pages/contacts/Contacts";
import Sales from "../../pages/invoices/sales/Sales";
import Items from "../../pages/items/Items";
import More from "../more/More";
import styles from "./Tab.module.css";
const Tab: FC = () => {
  return (
    <IonPage>
    <IonTabs className={styles.iontabs}>
      <IonTab tab="dashboard">
        <Dashboard></Dashboard>
      </IonTab>

      <IonTab tab="contacts">
        <Contacts></Contacts>
      </IonTab>
      <IonTab tab="invoices">
        <Sales></Sales>
      </IonTab>
      <IonTab tab="items">
        <Items></Items>
      </IonTab>
      <IonTab tab="more">
        <More></More>
      </IonTab>

      <IonTabBar slot="bottom">
        <IonTabButton tab="dashboard">
          <IonIcon icon={compassOutline} />
          Dashboard
        </IonTabButton>
        <IonTabButton tab="contacts">
          <IonIcon icon={peopleOutline} />
          Contacts
        </IonTabButton>
        <IonTabButton tab="invoices">
          <IonIcon icon={readerOutline} />
          Invoices
        </IonTabButton>
        <IonTabButton tab="items">
          <IonIcon icon={cubeOutline} />
          Items
        </IonTabButton>
        <IonTabButton tab="more">
          <IonIcon icon={ellipsisHorizontalCircleOutline} />
          More
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
    </IonPage>
  );
};
export default Tab;
