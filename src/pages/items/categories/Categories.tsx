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
import styles from "./Categories.module.scss";
const Categories: FC = () => {
  const history = useHistory();
  const axios = useAxios();
  const [items, setItems] = useState<string[]>([]);
  const [busy, setBusy] = useState<boolean>(false);

  const generateItems = async () => {
    setBusy(true);
    try {
      const response = await axios.get("/category");
      const data = response.data;
      setItems(data?.categories || []);
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
    <IonPage className={styles.category_page}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBackOutline} color="primary"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Categories</IonTitle>
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
                  <h5>{item?.name}</h5>
                </div>
              </IonItem>
            ))}
          </IonList>
        )}
        <IonButton slot="fixed" routerLink="/categories/add">
          <IonIcon icon={addOutline}></IonIcon>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Categories;
