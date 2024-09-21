import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
  useIonRouter,
  useIonViewWillLeave,
} from "@ionic/react";
import { FC, useState } from "react";
import styles from "./NewContact.module.scss";
import { arrowBackOutline } from "ionicons/icons";
import { Prompt } from "react-router";

const NewContact: FC = () => {
  const router = useIonRouter();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  return (
    <IonPage className={styles.new_contact}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              onClick={(
                e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>
              ) => {
                e.preventDefault();
                setShowAlert(true);
              }}
            >
              <IonIcon icon={arrowBackOutline}></IonIcon>
            </IonButton>
            <IonAlert
              isOpen={showAlert}
              message="Changes will be discarded once you leave this page"
              buttons={[
                {
                  text: "Cancel",
                  role: "cancel",
                  handler: () => {
                    setShowAlert(false);
                  },
                },
                {
                  text: "OK",
                  role: "confirm",
                  handler: () => {
                    router.push("/app/contacts", "back", "pop");
                  },
                },
              ]}
            />
          </IonButtons>
          <IonTitle>New Contact</IonTitle>
          <IonButtons slot="end">
            <IonButton>Save</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Contact Information</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonGrid className="ion-no-padding">
              <IonRow>
                <IonLabel>Contact Type</IonLabel>
                <IonRadioGroup value="Customer">
                  <div>
                    <IonRadio
                      value="Customer"
                      aria-label="Custom checkbox"
                    ></IonRadio>
                    <IonLabel>Customer</IonLabel>
                  </div>
                  <div>
                    <IonRadio
                      value="Supplier"
                      aria-label="Custom checkbox that is checked"
                    ></IonRadio>
                    <IonLabel>Supplier</IonLabel>
                  </div>
                </IonRadioGroup>
              </IonRow>
              <IonRow>
                <IonLabel>Name</IonLabel>
                <IonInput className="customInput" />
              </IonRow>
              <IonRow>
                <IonLabel>Display Name</IonLabel>
                <IonInput className="customInput" />
              </IonRow>
              <IonRow>
                <IonLabel>Phone</IonLabel>
                <IonInput className="customInput" />
              </IonRow>
              <IonRow>
                <IonLabel>Email</IonLabel>
                <IonInput className="customInput" />
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Other Details</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonGrid className="ion-no-padding">
              <IonRow>
                <IonLabel>GSTIN</IonLabel>
                <IonInput className="customInput" />
              </IonRow>
              <IonRow>
                <IonLabel>TIN</IonLabel>
                <IonInput className="customInput" />
              </IonRow>
              <IonRow>
                <IonLabel>PAN</IonLabel>
                <IonInput className="customInput" />
              </IonRow>
              <IonRow>
                <IonLabel>VAT NO</IonLabel>
                <IonInput className="customInput" />
              </IonRow>
              <IonRow>
                <IonLabel>DL. No</IonLabel>
                <IonInput className="customInput" />
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Billing Address</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonGrid className="ion-no-padding">
              <IonRow>
                <IonLabel>Address</IonLabel>
                <IonInput className="customInput" />
              </IonRow>
              <IonRow>
                <IonLabel>Country</IonLabel>
                <IonInput className="customInput" />
              </IonRow>
              <IonRow>
                <IonLabel>State</IonLabel>
                <IonInput className="customInput" />
              </IonRow>
              <IonRow>
                <IonLabel>City</IonLabel>
                <IonInput className="customInput" />
              </IonRow>
              <IonRow>
                <IonLabel>Pin Code</IonLabel>
                <IonInput className="customInput" />
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Shipping Address</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonGrid className="ion-no-padding">
              <IonRow>
                <IonRadioGroup value="Customer">
                  <div>
                    <IonRadio
                      value="Customer"
                      aria-label="Custom checkbox"
                    ></IonRadio>
                    <IonLabel>Is billing and shipping address same</IonLabel>
                  </div>
                </IonRadioGroup>
              </IonRow>
              <IonRow>
                <IonLabel>Address</IonLabel>
                <IonInput className="customInput" />
              </IonRow>
              <IonRow>
                <IonLabel>Country</IonLabel>
                <IonInput className="customInput" />
              </IonRow>
              <IonRow>
                <IonLabel>State</IonLabel>
                <IonInput className="customInput" />
              </IonRow>
              <IonRow>
                <IonLabel>City</IonLabel>
                <IonInput className="customInput" />
              </IonRow>
              <IonRow>
                <IonLabel>Pin Code</IonLabel>
                <IonInput className="customInput" />
              </IonRow>
              <IonRow>
                <IonLabel>Name</IonLabel>
                <IonInput className="customInput" />
              </IonRow>
              <IonRow>
                <IonLabel>Display Name</IonLabel>
                <IonInput className="customInput" />
              </IonRow>
              <IonRow>
                <IonLabel>Phone</IonLabel>
                <IonInput className="customInput" />
              </IonRow>
              <IonRow>
                <IonLabel>Email</IonLabel>
                <IonInput className="customInput" />
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default NewContact;
