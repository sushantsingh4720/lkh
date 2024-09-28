import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { addOutline, arrowBackOutline, chevronDown } from "ionicons/icons";
import { FC, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import styles from "./AddInvoiceItem.module.scss";
import { Item } from "../../../assets/helpers/Interfaces";
import SelectItem from "../../../components/Select/SelectItem";
import useAxios from "../../../utils/axiosInstance";

const AddInvoiceItem: FC = () => {
  const axios = useAxios();
  const history = useHistory();

  return (
    <IonPage className={styles.add_invoice_item}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBackOutline} color="primary"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Add Invoice Item</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardContent>
            <IonGrid className="ion-no-padding">
              <IonRow>
                <div className="space_between">
                  <IonLabel>Item </IonLabel>
                  <IonIcon
                    icon={addOutline}
                    color="success"
                    onClick={() => history.push("/items/add")}
                  ></IonIcon>
                </div>
                <IonList inset={true}>
                  <IonItem button={true} detail={false} id="select-item">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      {"" || "--Select Item--"}
                      <IonIcon icon={chevronDown}></IonIcon>
                    </div>
                  </IonItem>
                </IonList>
              </IonRow>
              <IonRow>
                <IonLabel>Quantity</IonLabel>
                <IonInput className="customInput" name="name" />
              </IonRow>
              <IonRow>
                <IonLabel>Rate</IonLabel>
                <IonInput className="customInput" name="name" />
              </IonRow>
              {"item_wise_discount_and_tax" === "item_wise_discount_and_tax" ? (
                <IonRow>
                  <IonLabel>Discount</IonLabel>
                  <IonInput className="customInput" name="name" />
                </IonRow>
              ) : (
                ""
              )}
              {"item_wise_discount_and_tax" === "item_wise_discount_and_tax" ? (
                <IonRow>
                  <IonLabel>Tax</IonLabel>
                  <IonInput className="customInput" name="name" />
                </IonRow>
              ) : (
                ""
              )}
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
export default AddInvoiceItem;
