import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
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
import Items from "../../pages/items/items/Items";
import More from "../more/More";
import styles from "./Tab.module.css";
import { Redirect, Route } from "react-router";
import NewContact from "../../pages/contacts/newContact/NewContact";
const Tab: FC = () => {
  return (
    <IonTabs className={styles.iontabs}>
      <IonRouterOutlet>
        <Route exact path="/app/dashboard" component={Dashboard} />
        <Route exact path="/app/contacts" component={Contacts} />
        <Route exact path="/app/sales" component={Sales} />
        <Route exact path="/app/items" component={Items} />
        <Route exact path="/app/more" component={More} />
        <Route exact path="/app">
          <Redirect to="/app/dashboard" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="dashboard" href="/app/dashboard">
          <IonIcon icon={compassOutline} />
          Dashboard
        </IonTabButton>
        <IonTabButton tab="contacts" href="/app/contacts">
          <IonIcon icon={peopleOutline} />
          Contacts
        </IonTabButton>
        <IonTabButton tab="invoices" href="/app/sales">
          <IonIcon icon={readerOutline} />
          Sales
        </IonTabButton>
        <IonTabButton tab="items" href="/app/items">
          <IonIcon icon={cubeOutline} />
          Items
        </IonTabButton>
        <IonTabButton tab="more" href="/app/more">
          <IonIcon icon={ellipsisHorizontalCircleOutline} />
          More
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};
export default Tab;
