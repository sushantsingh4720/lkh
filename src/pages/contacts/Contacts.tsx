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
import useAxios from "../../utils/axiosInstance";
const Contacts: FC = () => {
  const axios = useAxios();
  const [items, setItems] = useState<string[]>([]);
  const [busy, setBusy] = useState<boolean>(false);

  const generateItems = async () => {
    setBusy(true);
    try {
      const response = await axios.get("/contact");
      const data = response.data;
      setItems(data?.contacts || []);
    } catch (err: any) {
      const error = err.response?.data;
      // console.log(error);
    } finally {
      setBusy(false);
    }
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
          {items?.map((item: any, index: Number) => (
            <IonItem key={item.id}>
              <div className={styles.ionitem_container}>
                <div>
                  <IonLabel className={styles.name_logo}>
                    {item?.name?.slice(0, 2).toUpperCase()}
                  </IonLabel>
                </div>
                <div className={styles.description_container}>
                  <IonLabel>{item?.name}</IonLabel>
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: 1 }}>
                      <p>Phone</p>
                      <IonLabel>{item?.phone}</IonLabel>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p>State</p>
                      <IonLabel>{item?.billing_state}</IonLabel>
                    </div>
                  </div>
                </div>
              </div>
            </IonItem>
          ))}
        </IonList>
        <IonButton slot="fixed" routerLink="/app/contacts/new">
          <IonIcon icon={addOutline}></IonIcon>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Contacts;
