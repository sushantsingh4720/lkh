import {
  IonContent,
  IonHeader,
  IonIcon,
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
import Dashboard from "../pages/dashboard/Dashboard";
import Contacts from "../pages/contacts/Contacts";
import Sales from "../pages/invoices/sales/Sales";
import Items from "../pages/items/Items";
import More from "./More";

const Tab: FC = () => {
  return (
    <IonTabs>
      <IonTab tab="dashboard">
        <Dashboard />
      </IonTab>

      <IonTab tab="contacts">
        <Contacts />
      </IonTab>
      <IonTab tab="invoices">
        <Sales />
      </IonTab>
      <IonTab tab="items">
        <Items />
      </IonTab>
      <IonTab tab="more">
        <More />
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
  );
};
export default Tab;
