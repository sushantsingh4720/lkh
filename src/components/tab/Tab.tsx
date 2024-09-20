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
import Items from "../../pages/items/Items";
import More from "../more/More";
import styles from "./Tab.module.css";
import { Redirect, Route } from "react-router";
import NewContact from "../../pages/contacts/newContact/NewContact";
const Tab: FC = () => {
  return (
    <IonTabs className={styles.iontabs}>
      <IonRouterOutlet>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/contacts" component={Contacts} />
        <Route exact path="/contacts/new" component={NewContact} />
        <Route exact path="/sales" component={Sales} />
        <Route exact path="/items" component={Items} />
        <Route exact path="/more" component={More} />
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="dashboard" href="/dashboard">
          <IonIcon icon={compassOutline} />
          Dashboard
        </IonTabButton>
        <IonTabButton tab="contacts" href="/contacts">
          <IonIcon icon={peopleOutline} />
          Contacts
        </IonTabButton>
        <IonTabButton tab="invoices" href="/sales">
          <IonIcon icon={readerOutline} />
          Sales
        </IonTabButton>
        <IonTabButton tab="items" href="/items">
          <IonIcon icon={cubeOutline} />
          Items
        </IonTabButton>
        <IonTabButton tab="more" href="/more">
          <IonIcon icon={ellipsisHorizontalCircleOutline} />
          More
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};
export default Tab;
