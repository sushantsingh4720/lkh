import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
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
  closeCircleOutline,
} from "ionicons/icons";
import { FC, useEffect, useReducer, useRef, useState } from "react";
import { useHistory } from "react-router";
import { Contact, InvoiceItem } from "../../../../assets/helpers/Interfaces";
import {
  Curruncy,
  parseFloatWithFixedValue,
  todayDate,
} from "../../../../assets/helpers/CommonUses";
import styles from "./AddSales.module.scss";
import SelectContact from "../../../../components/Select/SelectContact";
import useAxios from "../../../../utils/axiosInstance";

import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../../reduxStore/Index";
import {
  clientSelectChange,
  dateInputChange,
  inputChange,
  invoiceNumberChange,
  invoiceTypeChange,
  itemTypeChange,
  removeItemHandler,
} from "../../../../reduxStore/InvoiceForm";

const AddSales: FC = () => {
  const history = useHistory();
  const axios = useAxios();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.InvoiceForm);
  console.log("state", state);
  const customerModal = useRef<HTMLIonModalElement>(null);
  const [contacts, setContacts] = useState([]);
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(inputChange({ name, value }));
  };

  const handleDateChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(dateInputChange({ name, value }));
  };

  const handleItemTypeChange = (e: any) => {
    const { value } = e.target;
    dispatch(itemTypeChange({ type: value }));
  };

  const handleInvoiceTypeChange = (e: any) => {
    const { value } = e.target;
    dispatch(invoiceTypeChange({ invoiceType: value }));
  };

  const onHandleCustomer = (selectedContact: Contact) => {
    dispatch(clientSelectChange({ selectedContact }));
    customerModal.current?.dismiss();
  };

  const onRemoveItemHandler = (index: number) => {
    dispatch(removeItemHandler(index));
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
        dispatch(
          invoiceNumberChange({ invoice: nextInvoiceRes?.data?.invoice })
        );
      } catch (error) {
        // Handle error
      }
    }
  };

  useIonViewWillEnter(() => {
    fetchNextInvoice();
  }, []);
  useIonViewWillEnter(() => {
    fetchData();
  });

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
                  value={state?.invoice}
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
                  value={state?.date}
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
                <IonButton
                  fill="outline"
                  id="add-item-modal"
                  onClick={() => history.push("/invoices/item/add")}
                >
                  <IonIcon icon={addCircleOutline}></IonIcon> Add Item
                </IonButton>
              </IonRow>
              {state.all_products?.length ? (
                <IonRow>
                  <div
                    style={{
                      display: "flex",
                      borderBottom: "1px solid gray",
                      paddingBottom: "6px",
                      justifyContent: "space-between",
                    }}
                  >
                    <IonLabel>Items</IonLabel>
                    <IonLabel>Amount</IonLabel>
                  </div>
                  {state.all_products?.length
                    ? state.all_products.map(
                        (item: InvoiceItem, index: number) => (
                          <div
                            key={index} // Add a key for each mapped item
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              borderBottom: "1px solid gray",
                            }}
                          >
                            <div style={{ display: "flex", gap: "12px" }}>
                              <IonIcon
                                icon={closeCircleOutline}
                                color="danger"
                                onClick={() => onRemoveItemHandler(index)} // Use index to dynamically remove the item
                              ></IonIcon>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "8px",
                                  color: "black",
                                }}
                              >
                                <h3 style={{ padding: 0, margin: 0 }}>
                                  {item.product?.name}
                                </h3>{" "}
                                {/* Access item name */}
                                <IonText>
                                  {item.quantity} *{" "}
                                  {parseFloatWithFixedValue(item.price)}
                                </IonText>{" "}
                                {/* Access quantity and price */}
                              </div>
                            </div>
                            <div style={{ justifySelf: "end", color: "black" }}>
                              <h6 style={{ padding: 0, margin: 0 }}>
                                {parseFloatWithFixedValue(item.amount)}
                              </h6>{" "}
                              {/* Access total price */}
                            </div>
                          </div>
                        )
                      )
                    : ""}
                </IonRow>
              ) : (
                ""
              )}
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            <IonGrid className="ion-no-padding">
              <IonRow>
                {state.all_products?.length ? (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        borderBottom: "1px solid gray",
                        paddingBottom: "6px",
                        justifyContent: "space-between",
                      }}
                    >
                      <IonLabel>Details</IonLabel>
                      <IonLabel>Amount</IonLabel>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        paddingBottom: "6px",
                        justifyContent: "space-between",
                        color: "black",
                      }}
                    >
                      <h2>Sub Total</h2>
                      <h2>{Curruncy} 800.25</h2>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        paddingBottom: "6px",
                        justifyContent: "space-between",
                        color: "black",
                      }}
                    >
                      <h2>Total Discount (-)</h2>
                      <h2>{Curruncy} 800.25</h2>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        paddingBottom: "6px",
                        justifyContent: "space-between",
                        color: "black",
                      }}
                    >
                      <h2>CGST</h2>
                      <h2>{Curruncy} 400.13</h2>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        paddingBottom: "6px",
                        justifyContent: "space-between",
                        color: "black",
                      }}
                    >
                      <h2>SGST</h2>
                      <h2>{Curruncy} 400.13</h2>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        paddingBottom: "6px",
                        justifyContent: "space-between",
                        color: "black",
                      }}
                    >
                      <h2>IGST</h2>
                      <h2>{Curruncy} 800.25</h2>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        paddingBottom: "6px",
                        justifyContent: "space-between",
                        color: "black",
                      }}
                    >
                      <h2>Grand Total</h2>
                      <h2>{Curruncy} 800.25</h2>
                    </div>
                  </div>
                ) : (
                  ""
                )}
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
