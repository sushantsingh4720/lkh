import {
  IonAccordion,
  IonAccordionGroup,
  IonAlert,
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
  extensionPuzzleOutline,
  peopleCircleOutline,
  personAddOutline,
  personCircleOutline,
  personOutline,
  powerOutline,
  receiptOutline,
  ribbonOutline,
  scanCircleOutline,
  settingsOutline,
  storefrontOutline,
} from "ionicons/icons";
import { FC, useState } from "react";
import styles from "./More.module.scss";
import axios from "axios";
import { useHistory } from "react-router";
import { logout } from "../../reduxStore/Auth";
import { useDispatch } from "react-redux";
const More: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [logoutAlertIsOpen, setLogoutAlertIsOpen] = useState<boolean>(false);
  return (
    <IonPage className={styles.morepage}>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>More</IonTitle>
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
              {/* <IonIcon icon={chevronForwardOutline}></IonIcon> */}
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
              {/* <IonIcon icon={chevronForwardOutline}></IonIcon> */}
            </div>
            <div
              className={styles.ion_group_content}
              slot="content"
              onClick={() => history.push("/leads")}
            >
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={personAddOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Leads</IonText>
              </div>
              {/* <IonIcon icon={chevronForwardOutline}></IonIcon> */}
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
              {/* <IonIcon icon={chevronForwardOutline}></IonIcon> */}
            </div>
            <div
              className={styles.ion_group_content}
              slot="content"
              onClick={() => history.push("/categories")}
            >
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={appsOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Categories</IonText>
              </div>
              {/* <IonIcon icon={chevronForwardOutline}></IonIcon> */}
            </div>
            <div
              className={styles.ion_group_content}
              slot="content"
              onClick={() => history.push("/brands")}
            >
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={ribbonOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Brands</IonText>
              </div>
              {/* <IonIcon icon={chevronForwardOutline}></IonIcon> */}
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
            <div
              className={styles.ion_group_content}
              slot="content"
              onClick={() => history.push("/taxes")}
            >
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={atOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Tax</IonText>
              </div>
              {/* <IonIcon icon={chevronForwardOutline}></IonIcon> */}
            </div>
            <div
              className={styles.ion_group_content}
              slot="content"
              onClick={() => history.push("/hsn")}
            >
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={scanCircleOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Hsn</IonText>
              </div>
              {/* <IonIcon icon={chevronForwardOutline}></IonIcon> */}
            </div>
            <div
              className={styles.ion_group_content}
              slot="content"
              onClick={() => history.push("/sac")}
            >
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={scanCircleOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Sac</IonText>
              </div>
              {/* <IonIcon icon={chevronForwardOutline}></IonIcon> */}
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
              {/* <IonIcon icon={chevronForwardOutline}></IonIcon> */}
            </div>
            <div
              className={styles.ion_group_content}
              slot="content"
              onClick={() => history.push("/expenses")}
            >
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={documentOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Expenses</IonText>
              </div>
              {/* <IonIcon icon={chevronForwardOutline}></IonIcon> */}
            </div>
            <div
              className={styles.ion_group_content}
              slot="content"
              onClick={() => history.push("/quotations")}
            >
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={documentAttachOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Quotations</IonText>
              </div>
              {/* <IonIcon icon={chevronForwardOutline}></IonIcon> */}
            </div>
            <div
              className={styles.ion_group_content}
              slot="content"
              onClick={() => history.push("/delivery_challan")}
            >
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={carOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Delivery Challan</IonText>
              </div>
              {/* <IonIcon icon={chevronForwardOutline}></IonIcon> */}
            </div>
            <div
              className={styles.ion_group_content}
              slot="content"
              onClick={() => history.push("/payments")}
            >
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={cashOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Payment Records</IonText>
              </div>
              {/* <IonIcon icon={chevronForwardOutline}></IonIcon> */}
            </div>
          </IonAccordion>
          <IonAccordion value="reports">
            <IonItem
              slot="header"
              color="light"
              className={styles.according_dropdown}
            >
              <IonIcon
                icon={receiptOutline}
                className={styles.according_dropdown_logo}
              ></IonIcon>
              <IonLabel>Reports</IonLabel>
            </IonItem>
            <div
              className={styles.ion_group_content}
              slot="content"
              onClick={() => history.push("/stock_reports")}
            >
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={storefrontOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Stock</IonText>
              </div>
              {/* <IonIcon icon={chevronForwardOutline}></IonIcon> */}
            </div>
            <div
              className={styles.ion_group_content}
              slot="content"
              onClick={() => history.push("/gst_reports")}
            >
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={atOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Gst</IonText>
              </div>
              {/* <IonIcon icon={chevronForwardOutline}></IonIcon> */}
            </div>
            <div
              className={styles.ion_group_content}
              slot="content"
              onClick={() => history.push("/invoice_reports")}
            >
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={documentTextOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Invoice</IonText>
              </div>
              {/* <IonIcon icon={chevronForwardOutline}></IonIcon> */}
            </div>
            <div
              className={styles.ion_group_content}
              slot="content"
              onClick={() => history.push("/supplier_reports")}
            >
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={carOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Supplier</IonText>
              </div>
              {/* <IonIcon icon={chevronForwardOutline}></IonIcon> */}
            </div>
            <div
              className={styles.ion_group_content}
              slot="content"
              onClick={() => history.push("/inventory_reports")}
            >
              <div className={styles.accordin_logo}>
                <IonIcon
                  icon={extensionPuzzleOutline}
                  className={styles.accordin_logo_icon}
                ></IonIcon>
                <IonText>Inventory</IonText>
              </div>
              {/* <IonIcon icon={chevronForwardOutline}></IonIcon> */}
            </div>
          </IonAccordion>

          <IonAccordion value="users" onClick={() => history.push("/users")}>
            <div className={styles.ion_accordin_content} slot="header">
              <div className={styles.accordin_logo}>
                <IonIcon icon={personCircleOutline}></IonIcon>
                <IonText>Users</IonText>
              </div>
              {/* <IonIcon icon={chevronForwardOutline}></IonIcon> */}
            </div>
          </IonAccordion>
          <IonAccordion
            value="settings"
            onClick={() => history.push("/settings")}
          >
            <div className={styles.ion_accordin_content} slot="header">
              <div className={styles.accordin_logo}>
                <IonIcon icon={settingsOutline}></IonIcon>
                <IonText>Settings</IonText>
              </div>
              <IonIcon icon={chevronForwardOutline}></IonIcon>
            </div>
          </IonAccordion>
          <IonAccordion
            value="supports"
            onClick={() => history.push("/supports")}
          >
            <div className={styles.ion_accordin_content} slot="header">
              <div className={styles.accordin_logo}>
                <IonIcon icon={callOutline}></IonIcon>
                <IonText>Support</IonText>
              </div>
              {/* <IonIcon icon={chevronForwardOutline}></IonIcon> */}
            </div>
          </IonAccordion>
          <IonAccordion
            value="logout"
            onClick={() => setLogoutAlertIsOpen(true)}
          >
            <div className={styles.ion_accordin_content} slot="header">
              <div className={styles.accordin_logo}>
                <IonIcon icon={powerOutline}></IonIcon>
                <IonText>Logout</IonText>
              </div>
              {/* <IonIcon icon={chevronForwardOutline}></IonIcon> */}
            </div>
          </IonAccordion>
        </IonAccordionGroup>
        <IonAlert
          header="Are you sure you want to logout!"
          isOpen={logoutAlertIsOpen}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              handler: () => {
                setLogoutAlertIsOpen(false);
              },
            },
            {
              text: "Logout",
              role: "confirm",
              handler: () => {
                dispatch(logout());
                history.replace("/auth/login");
              },
            },
          ]}
          onDidDismiss={({ detail }) => {}}
        ></IonAlert>
      </IonContent>
    </IonPage>
  );
};

export default More;
