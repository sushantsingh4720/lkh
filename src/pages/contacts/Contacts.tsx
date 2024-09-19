import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
  useIonRouter,
  IonModal,
} from "@ionic/react";
import { addOutline, searchOutline } from "ionicons/icons";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./Contacts.module.scss";
import NewContact from "./newContact/NewContact";

const Contacts: FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);

  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const [present] = useIonActionSheet();

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismiss() {
    modal.current?.dismiss();
  }

  function canDismiss() {
    return new Promise<boolean>((resolve, reject) => {
      present({
        header: "Are you sure?",
        buttons: [
          {
            text: "Yes",
            role: "confirm",
          },
          {
            text: "No",
            role: "cancel",
          },
        ],
        onWillDismiss: (ev) => {
          if (ev.detail.role === "confirm") {
            resolve(true);
          } else {
            reject();
          }
        },
      });
    });
  }

  return (
    <IonPage className={styles.contact_page} ref={page}>
      <IonHeader translucent={true} className="ion-no-border">
        <IonToolbar>
          <IonTitle>Contacts</IonTitle>
          <IonIcon
            slot="end"
            icon={searchOutline}
            className="backgroundwhiteicon"
          ></IonIcon>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton slot="fixed" id="open-modal">
          <IonIcon icon={addOutline}></IonIcon>
        </IonButton>
        <NewContact
          modal={modal}
          canDismiss={canDismiss}
          presentingElement={presentingElement!}
          dismiss={dismiss}
        />
      </IonContent>
    </IonPage>
  );
};

export default Contacts;
