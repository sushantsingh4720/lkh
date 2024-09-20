import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addOutline, searchOutline } from "ionicons/icons";
import { FC, useEffect, useState } from "react";
import styles from "./Contacts.module.scss";
const Contacts: FC = () => {
  const [items, setItems] = useState<string[]>([]);

  const generateItems = () => {
    const newItems = [];
    for (let i = 0; i < 20; i++) {
      newItems.push(`Item ${1 + items.length + i}`);
    }
    setItems([...items, ...newItems]);
  };
  useEffect(() => {
    generateItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <IonPage className={styles.contact_page}>
      <IonHeader>
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
        <IonList>
          {items.map((item: any, index: Number) => (
            <IonItem key={item}>
              <div className={styles.ionitem_container}>
                <div>
                  <IonLabel className={styles.name_logo}>AU</IonLabel>
                </div>
                <div className={styles.description_container}>
                  <IonLabel>sushant singh</IonLabel>
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: 1 }}>
                      <p>Phone</p>
                      <IonLabel>7991597674</IonLabel>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p>State</p>
                      <IonLabel>Uttar Pradesh</IonLabel>
                    </div>
                  </div>
                </div>
              </div>
            </IonItem>
          ))}
        </IonList>
        <IonButton slot="fixed" id="open-modal" routerLink="/contacts/new">
          <IonIcon icon={addOutline}></IonIcon>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Contacts;
