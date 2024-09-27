import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { FC, useState } from "react";
import styles from "./Sales.module.scss";
import {
  addOutline,
  menuOutline,
  searchCircleOutline,
  searchCircleSharp,
  searchOutline,
} from "ionicons/icons";
import useAxios from "../../../utils/axiosInstance";
import LoadDataSpinner from "../../../components/Spinner/loadDataSpinner/LoadDataSpinner";
import {
  Curruncy,
  dateTransformDDMMYY,
  formatIndianCurrency,
  getDueDateMessage,
  padWithZeros,
  parseFloatWithFixedValue,
} from "../../../assets/helpers/CommonUses";
const Sales: FC = () => {
  const axios = useAxios();
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState<boolean>(false);

  const generateItems = async () => {
    setBusy(true);
    try {
      const response = await axios.get("/sales_inv");
      const data = response.data;
      setItems(data?.salesInvoices || []);
    } catch (err: any) {
      const error = err.response?.data;
    } finally {
      setBusy(false);
    }
  };
  console.log(items);
  // Use this hook to fetch items every time the page becomes active
  useIonViewWillEnter(() => {
    generateItems();
  });

  useIonViewWillLeave(() => {
    setItems([]);
  });

  return (
    <IonPage className={styles.salescontainer}>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Sales</IonTitle>
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
            {items?.map((item: any, index: Number) => (
              <IonItem key={item.id}>
                <div className={styles.ionitem_container}>
                  <div className={styles.first_line}>
                    <IonLabel>{item?.name}</IonLabel>
                    <IonLabel>
                      {Curruncy}
                      {formatIndianCurrency(item?.amount)}
                    </IonLabel>
                  </div>
                  <div className={styles.second_line}>
                    <div className={styles.second_line_first_component}>
                      <IonText>{dateTransformDDMMYY(item?.date)}</IonText>
                      <IonText> </IonText>
                      <IonText>INV-{padWithZeros(item?.invoice)}</IonText>
                    </div>
                    {Number(item?.balance) ? (
                      <div>
                        Due:{Curruncy}
                        {formatIndianCurrency(item?.balance)}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {Number(item?.balance) ? (
                    <div className={styles.due_color}>
                      DUE {getDueDateMessage(item?.dueDate)}
                    </div>
                  ) : (
                    <div className={styles.paid_color}>paid</div>
                  )}
                </div>
              </IonItem>
            ))}
          </IonList>
        )}
        <IonButton slot="fixed">
          <IonIcon icon={addOutline}></IonIcon>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Sales;
