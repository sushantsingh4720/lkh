import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { forwardRef, FC } from "react";
import styles from "./NewContact.module.scss";

interface NewContactProps {
  modal: React.RefObject<HTMLIonModalElement>;
  canDismiss: () => Promise<boolean>;
  presentingElement: HTMLElement;
  dismiss: () => void;
}

const NewContact: FC<NewContactProps> = forwardRef<
  HTMLIonModalElement,
  NewContactProps
>(({ modal, canDismiss, presentingElement, dismiss }, ref) => {
  return (
    <IonModal
      ref={modal}
      trigger="open-modal"
      canDismiss={canDismiss}
      presentingElement={presentingElement}
      className={styles.new_contact}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="medium" onClick={() => dismiss()}>
              Cancel
            </IonButton>
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
    </IonModal>
  );
});

export default NewContact;
