import {
  IonAccordion,
  IonAccordionGroup,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRouterLink,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  appsOutline,
  arrowForwardOutline,
  atCircleOutline,
  atOutline,
  callOutline,
  carOutline,
  cashOutline,
  chevronForward,
  chevronForwardOutline,
  compassOutline,
  cubeOutline,
  diceOutline,
  documentAttachOutline,
  documentOutline,
  documentTextOutline,
  peopleCircleOutline,
  personAddOutline,
  personCircleOutline,
  personOutline,
  powerOutline,
  receiptOutline,
  ribbonOutline,
  scanCircleOutline,
  settingsOutline,
} from "ionicons/icons";
import { FC } from "react";
import styles from "./More.module.scss";
import axios from "axios";
import { useHistory } from "react-router";
const More: FC = () => {
  const history = useHistory();

  return (
    <IonPage className={styles.morepage}>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>More Modules</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonAccordionGroup className={styles.ionGroup}>
          <IonAccordion
            value="dashboard"
            onClick={() => history.replace("/app/dashboard")}
          >
            <div className={styles.ion_accordin_content} slot="header">
              <div className={styles.accordin_logo}>
                <IonIcon icon={compassOutline}></IonIcon>
                <IonText>Dashboard</IonText>
              </div>
              <IonIcon icon={chevronForwardOutline}></IonIcon>
            </div>
          </IonAccordion>
          <IonAccordion value="contacts">
            <IonItem
              slot="header"
              color="light"
              className={styles.according_dropdown}
            >
              <IonIcon
                icon={peopleCircleOutline}
                className={styles.according_dropdown_logo}
              ></IonIcon>
              <IonLabel>Contacts</IonLabel>
            </IonItem>

            <div
              className={styles.ion_group_content}
              slot="content"
              onClick={() => history.replace("/app/contacts")}
            >
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={personOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Contacts</IonText>
              </div>
              <IonIcon icon={chevronForwardOutline}></IonIcon>
            </div>
            <div className={styles.ion_group_content} slot="content">
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={personAddOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Leads</IonText>
              </div>
              <IonIcon icon={chevronForwardOutline}></IonIcon>
            </div>
          </IonAccordion>
          <IonAccordion value="items">
            <IonItem
              slot="header"
              color="light"
              className={styles.according_dropdown}
            >
              <IonIcon
                icon={diceOutline}
                className={styles.according_dropdown_logo}
              ></IonIcon>
              <IonLabel>Items</IonLabel>
            </IonItem>
            <div
              className={styles.ion_group_content}
              slot="content"
              onClick={() => history.replace("/app/items")}
            >
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={cubeOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Items</IonText>
              </div>
              <IonIcon icon={chevronForwardOutline}></IonIcon>
            </div>
            <div className={styles.ion_group_content} slot="content">
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={appsOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Categories</IonText>
              </div>
              <IonIcon icon={chevronForwardOutline}></IonIcon>
            </div>
            <div className={styles.ion_group_content} slot="content">
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={ribbonOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Brands</IonText>
              </div>
              <IonIcon icon={chevronForwardOutline}></IonIcon>
            </div>
          </IonAccordion>
          <IonAccordion value="taxes">
            <IonItem
              slot="header"
              color="light"
              className={styles.according_dropdown}
            >
              <IonIcon
                icon={atCircleOutline}
                className={styles.according_dropdown_logo}
              ></IonIcon>
              <IonLabel>Taxes</IonLabel>
            </IonItem>
            <div className={styles.ion_group_content} slot="content">
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={atOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Tax</IonText>
              </div>
              <IonIcon icon={chevronForwardOutline}></IonIcon>
            </div>
            <div className={styles.ion_group_content} slot="content">
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={scanCircleOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Hsn</IonText>
              </div>
              <IonIcon icon={chevronForwardOutline}></IonIcon>
            </div>
            <div className={styles.ion_group_content} slot="content">
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={scanCircleOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Sac</IonText>
              </div>
              <IonIcon icon={chevronForwardOutline}></IonIcon>
            </div>
          </IonAccordion>
          <IonAccordion value="invoices">
            <IonItem
              slot="header"
              color="light"
              className={styles.according_dropdown}
            >
              <IonIcon
                icon={documentOutline}
                className={styles.according_dropdown_logo}
              ></IonIcon>
              <IonLabel>Invoices</IonLabel>
            </IonItem>
            <div
              className={styles.ion_group_content}
              slot="content"
              onClick={() => history.replace("/app/sales")}
            >
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={documentTextOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Sales</IonText>
              </div>
              <IonIcon icon={chevronForwardOutline}></IonIcon>
            </div>
            <div className={styles.ion_group_content} slot="content">
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={documentOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Expenses</IonText>
              </div>
              <IonIcon icon={chevronForwardOutline}></IonIcon>
            </div>
            <div className={styles.ion_group_content} slot="content">
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={documentAttachOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Quotations</IonText>
              </div>
              <IonIcon icon={chevronForwardOutline}></IonIcon>
            </div>
            <div className={styles.ion_group_content} slot="content">
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={carOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Delivery Challan</IonText>
              </div>
              <IonIcon icon={chevronForwardOutline}></IonIcon>
            </div>
            <div className={styles.ion_group_content} slot="content">
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={cashOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Payment Records</IonText>
              </div>
              <IonIcon icon={chevronForwardOutline}></IonIcon>
            </div>
          </IonAccordion>
          <IonAccordion value="reports">
            <div className={styles.ion_accordin_content} slot="header">
              <div className={styles.accordin_logo}>
                <IonIcon icon={receiptOutline}></IonIcon>
                <IonText>Reports</IonText>
              </div>
              <IonIcon icon={chevronForwardOutline}></IonIcon>
            </div>
          </IonAccordion>
          <IonAccordion value="users">
            <div className={styles.ion_accordin_content} slot="header">
              <div className={styles.accordin_logo}>
                <IonIcon icon={personCircleOutline}></IonIcon>
                <IonText>Users</IonText>
              </div>
              <IonIcon icon={chevronForwardOutline}></IonIcon>
            </div>
          </IonAccordion>
          <IonAccordion value="settings">
            <div className={styles.ion_accordin_content} slot="header">
              <div className={styles.accordin_logo}>
                <IonIcon icon={settingsOutline}></IonIcon>
                <IonText>Settings</IonText>
              </div>
              <IonIcon icon={chevronForwardOutline}></IonIcon>
            </div>
          </IonAccordion>
          <IonAccordion value="supports">
            <div className={styles.ion_accordin_content} slot="header">
              <div className={styles.accordin_logo}>
                <IonIcon icon={callOutline}></IonIcon>
                <IonText>Support</IonText>
              </div>
              <IonIcon icon={chevronForwardOutline}></IonIcon>
            </div>
          </IonAccordion>
          <IonAccordion value="logout">
            <div className={styles.ion_accordin_content} slot="header">
              <div className={styles.accordin_logo}>
                <IonIcon icon={powerOutline}></IonIcon>
                <IonText>Logout</IonText>
              </div>
              <IonIcon icon={chevronForwardOutline}></IonIcon>
            </div>
          </IonAccordion>
        </IonAccordionGroup>
      </IonContent>
    </IonPage>
  );
};

export default More;
