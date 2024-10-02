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
import styles from "./Sac.module.scss";
const Sac: FC = () => {
  const history = useHistory();
  const axios = useAxios();
  const [items, setItems] = useState<string[]>([]);
  const [busy, setBusy] = useState<boolean>(false);

  const generateItems = async () => {
    setBusy(true);
    try {
      const response = await axios.get("/gstsac");
      const data = response.data;
      setItems(data?.gstsacs || []);
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
    <IonPage className={styles.sac_page}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBackOutline} color="primary"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Sac</IonTitle>
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
              <IonItem key={item?.id} routerLink={`/sac/view/${item?.id}`}>
                <div className={styles.inner_ion_item}>
                  <div>
                    <p>Sac Code</p>
                    <h5>{item?.sac_code}</h5>
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
        <IonButton slot="fixed" routerLink="/sac/add">
          <IonIcon icon={addOutline}></IonIcon>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Sac;
