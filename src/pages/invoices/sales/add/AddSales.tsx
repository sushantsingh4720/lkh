import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
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
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  addCircleOutline,
  addOutline,
  arrowBackOutline,
  chevronDown,
} from "ionicons/icons";
import { FC, useEffect, useReducer, useRef, useState } from "react";
import { useHistory } from "react-router";
import {
  Contact,
  InvoiceItem,
  SalesInvoice,
} from "../../../../assets/helpers/Interfaces";
import { todayDate } from "../../../../assets/helpers/CommonUses";
import styles from "./AddSales.module.scss";
import SelectContact from "../../../../components/Select/SelectContact";
import useAxios from "../../../../utils/axiosInstance";
import AddInvoiceItem from "../../AddInvoiceItem/AddInvoiceItem";
import {
  INITIAL_STATE,
  reducer,
} from "../../../../reducers/salesReducers/Reducer";
import { useDispatch } from "react-redux";
import {
  HANDLE_CLIENT_SELECT_CHANGE,
  HANDLE_DATE_INPUT_CHANGE,
  HANDLE_INPUT_CHANGE,
  HANDLE_INVOICE_NUMBER_CHANGE,
  HANDLE_INVOICE_TYPE_CHANGE,
  HANDLE_ITEM_TYPE_CHANGE,
} from "../../../../reducers/salesReducers/Constant";

const AddSales: FC = () => {
  const history = useHistory();
  const axios = useAxios();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const customerModal = useRef<HTMLIonModalElement>(null);
  const [contacts, setContacts] = useState([]);
  console.log(state);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    dispatch({ type: HANDLE_INPUT_CHANGE, payload: { name, value } });
  };

  const handleDateChange = (e: any) => {
    const { name, value } = e.target;
    dispatch({ type: HANDLE_DATE_INPUT_CHANGE, payload: { name, value } });
  };

  const handleItemTypeChange = (e: any) => {
    const { value } = e.target;
    dispatch({ type: HANDLE_ITEM_TYPE_CHANGE, payload: { type: value } });
  };

  const handleInvoiceTypeChange = (e: any) => {
    const { value } = e.target;
    dispatch({
      type: HANDLE_INVOICE_TYPE_CHANGE,
      payload: { invoiceType: value },
    });
  };

  const onHandleCustomer = (selectedContact: Contact) => {
    dispatch({
      type: HANDLE_CLIENT_SELECT_CHANGE,
      payload: { selectedContact },
    });
    customerModal.current?.dismiss();
  };

  const fetchData = async () => {
    try {
      const [ContactsRes] = await Promise.all([
        axios.get("/contact/allcontacts"),
      ]);

      setContacts(ContactsRes.data?.contacts || []);
    } catch (error) {
      // Handle error
    }
  };

  const fetchNextInvoice = async () => {
    if (state.invoice === null) {
      // Fetch the next invoice only if it hasn't been fetched yet
      try {
        const nextInvoiceRes = await axios.get("/sales_inv/get_inv");
        dispatch({
          type: HANDLE_INVOICE_NUMBER_CHANGE,
          payload: { invoice: nextInvoiceRes?.data?.invoice },
        });
      } catch (error) {
        // Handle error
      }
    }
  };

  useIonViewWillEnter(() => {
    fetchData();
  });

  useEffect(() => {
    fetchNextInvoice();
  }, []);

  return (
    <IonPage className={styles.add_sales}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBackOutline} color="primary"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Add Sales</IonTitle>
          <IonButtons slot="end">
            <IonButton color="primary">Save</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          {/* <IonCardHeader>
            <IonCardTitle>Contact Information</IonCardTitle>
          </IonCardHeader> */}
          <IonCardContent>
            <IonGrid className="ion-no-padding">
              <IonRow>
                <div className="space_between">
                  <IonLabel>Customer Name </IonLabel>
                  <IonIcon
                    icon={addOutline}
                    color="success"
                    onClick={() => history.push("/contacts/add")}
                  ></IonIcon>
                </div>
                <IonList inset={true}>
                  <IonItem button={true} detail={false} id="select-customer">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      {state?.name || "--Select Customer--"}
                      <IonIcon icon={chevronDown}></IonIcon>
                    </div>
                  </IonItem>
                </IonList>
                {state?.name ? (
                  <span style={{ color: "green" }}>
                    {state?.checkout_details?.billing_state}
                    {", "}
                    {state?.checkout_details?.billing_country}
                  </span>
                ) : (
                  ""
                )}
              </IonRow>
              <IonRow>
                <IonLabel>Invoice No</IonLabel>
                <IonInput
                  className="customInput"
                  type="number"
                  name="invoice"
                  value={state.invoice}
                  onIonInput={handleInputChange}
                />
              </IonRow>
              <IonRow>
                <IonLabel>Date</IonLabel>
                <IonInput
                  className="customInput"
                  type="date"
                  name="date"
                  min={todayDate}
                  value={state.date}
                  onIonInput={handleDateChange}
                />
              </IonRow>
              <IonRow>
                <IonLabel>Due Date</IonLabel>
                <IonInput
                  className="customInput"
                  type="date"
                  name="dueDate"
                  min={state.date}
                  value={state.dueDate}
                  onIonInput={handleDateChange}
                />
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            <IonGrid className="ion-no-padding">
              <IonRow>
                <IonLabel>Item Type</IonLabel>
                <IonRadioGroup
                  value={state.type}
                  onIonChange={handleItemTypeChange}
                >
                  <div>
                    <IonRadio value="product"></IonRadio>
                    <IonText>Product</IonText>
                  </div>
                  <div>
                    <IonRadio value="service"></IonRadio>
                    <IonText>Service</IonText>
                  </div>
                </IonRadioGroup>
              </IonRow>
              <IonRow>
                <IonLabel>Discount And Tax</IonLabel>
                <IonRadioGroup
                  value={state.invoiceType}
                  onIonChange={handleInvoiceTypeChange}
                >
                  <div>
                    <IonRadio value="item_wise_discount_and_tax"></IonRadio>
                    <IonText>Per Item </IonText>
                  </div>
                  <div>
                    <IonRadio value="invoice_wise_discount_and_tax"></IonRadio>
                    <IonText>Per Invoice</IonText>
                  </div>
                </IonRadioGroup>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            <IonGrid className="ion-no-padding">
              <IonRow>
                <IonButton fill="outline" id="add-item-modal">
                  <IonIcon icon={addCircleOutline}></IonIcon> Add Item
                </IonButton>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
      <IonModal trigger="select-customer" ref={customerModal}>
        <SelectContact
          title={"Select Customer"}
          contacts={contacts}
          selectedItem={state.checkout_details}
          onSelectionCancel={() => customerModal.current?.dismiss()}
          onSelectionChange={onHandleCustomer}
        />
      </IonModal>
    </IonPage>
  );
};

export default AddSales;
