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

interface AddInvoiceItemProps {
  title: string;
  onSelectionCancel: () => Promise<boolean> | undefined;
}

const AddInvoiceItem: FC<AddInvoiceItemProps> = ({
  title,
  onSelectionCancel,
}) => {
  const axios = useAxios();
  const history = useHistory();
  const addItemModal = useRef<HTMLIonModalElement>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [taxes, setTaxes] = useState([]);
  const [items, setItems] = useState([]);
  const [itemType, setItemType] = useState("product");
  const [invoiceType, setInvoiceType] = useState("item_wise_discount_and_tax");

  const onHandleBrand = (selectedItem: Item) => {
    setSelectedItem(selectedItem);
    addItemModal.current?.dismiss();
  };

  const cancelChanges = () => {
    if (onSelectionCancel) {
      onSelectionCancel();
    }
  };
  console.log("items", items);


  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={cancelChanges} color="primary">
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className={styles.add_invoice_item}>
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
                      {selectedItem?.name || "--Select Item--"}
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
              {invoiceType === "item_wise_discount_and_tax" ? (
                <IonRow>
                  <IonLabel>Discount</IonLabel>
                  <IonInput className="customInput" name="name" />
                </IonRow>
              ) : (
                ""
              )}
              {invoiceType === "item_wise_discount_and_tax" ? (
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
      <IonModal trigger="select-item" ref={addItemModal}>
        <SelectItem
          title={"Select Item"}
          items={items}
          selectedItem={selectedItem}
          onSelectionCancel={() => addItemModal.current?.dismiss()}
          onSelectionChange={onHandleBrand}
        />
      </IonModal>
    </>
  );
};
export default AddInvoiceItem;
