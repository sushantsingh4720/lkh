import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { addOutline, arrowBackOutline, searchOutline } from "ionicons/icons";
import { FC, useState } from "react";
import { useHistory } from "react-router";
import useAxios from "../../../utils/axiosInstance";
import LoadDataSpinner from "../../../components/Spinner/loadDataSpinner/LoadDataSpinner";
import styles from "./Hsn.module.scss";
const Hsn: FC = () => {
  const history = useHistory();
  const axios = useAxios();
  const [items, setItems] = useState<string[]>([]);
  const [busy, setBusy] = useState<boolean>(false);

  const generateItems = async () => {
    setBusy(true);
    try {
      const response = await axios.get("/gsthsn");
      const data = response.data;
      setItems(data?.gsthsns || []);
    } catch (err: any) {
      const error = err.response?.data;
    } finally {
      setBusy(false);
    }
  };

  // Use this hook to fetch contacts every time the page becomes active
  useIonViewWillEnter(() => {
    generateItems();
  });

  useIonViewWillLeave(() => {
    setItems([]);
  });
  return (
    <IonPage className={styles.hsn_page}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBackOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Hsn</IonTitle>
          <IonIcon
            slot="end"
            icon={searchOutline}
            className="backgroundwhiteicon"
          ></IonIcon>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {busy ? (
          <LoadDataSpinner />
        ) : (
          <IonList>
            {items.map((item: any) => (
              <IonItem key={item?.id}>
                <div className={styles.inner_ion_item}>
                  <div>
                    <p>Hsn Code</p>
                    <h5>{item?.hsn_code}</h5>
                  </div>
                  <div>
                    <p>Rate (%)</p>
                    <IonLabel>{item?.gst_rate}</IonLabel>
                  </div>
                </div>
              </IonItem>
            ))}
          </IonList>
        )}
        <IonButton slot="fixed" routerLink="/hsn/add">
          <IonIcon icon={addOutline}></IonIcon>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Hsn;
