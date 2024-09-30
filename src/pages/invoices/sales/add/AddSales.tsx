import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCheckbox,
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
import {
  Bank,
  Contact,
  InvoiceItem,
  Tax,
} from "../../../../assets/helpers/Interfaces";
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
  bankHandler,
  clientSelectChange,
  dateInputChange,
  inputChange,
  invoiceNumberChange,
  invoiceTypeChange,
  itemTypeChange,
  otherInfoHandler,
  removeItemHandler,
} from "../../../../reduxStore/InvoiceForm";
import SelectBank from "../../../../components/Select/SetectBank";
import SelectTax from "../../../../components/Select/SelectTax";

const AddSales: FC = () => {
  const history = useHistory();
  const axios = useAxios();
  const dispatch = useDispatch();
  const { companyData } = useSelector((state: RootState) => state.Company);
  const state = useSelector((state: RootState) => state.InvoiceForm);
  const [customerModal, setCustomerModal] = useState<boolean>(false);
  const [bankModal, setBankModal] = useState<boolean>(false);
  const [taxModal, setTaxModal] = useState<boolean>(false);
  const [contacts, setContacts] = useState([]);
  const [banks, setBanks] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [selectedTax, setSelectedTax] = useState<Tax | null>(null);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  console.log(state);
  const isClientCompanyStateSame =
    state?.checkout_details?.billing_state === companyData?.state;

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
    setCustomerModal(false);
  };

  const onHandleBank = (selectedBank: Bank) => {
    setSelectedBank(selectedBank);
    let bank;
    if (selectedBank) {
      bank = selectedBank
        ? {
            ...selectedBank,
            label: selectedBank.name,
            value: selectedBank.name,
          }
        : null;
    }
    dispatch(bankHandler({ bank }));
    setBankModal(false);
  };

  const onHandleTax = (selectedTax: Tax) => {
    setSelectedTax(selectedTax);
    setTaxModal(false);
  };

  const onRemoveItemHandler = (index: number) => {
    dispatch(removeItemHandler({ index, isClientCompanyStateSame }));
  };

  const onHandleOtherInfoInputChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(otherInfoHandler({ name, value }));
  };

  const fetchData = async () => {
    try {
      const [ContactsRes, bankRes, taxRes] = await Promise.all([
        axios.get("/contact/allcontacts"),
        axios.get("/bank"),
        axios.get("/tax/alltaxes?active=true"),
      ]);

      setContacts(ContactsRes.data?.contacts || []);
      setBanks(bankRes.data?.banks || []);
      setTaxes(taxRes.data?.taxes || []);
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
                <IonList>
                  <IonItem onClick={() => setCustomerModal(true)}>
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
                  disabled={!state?.checkout_details}
                  title="Please First Select Customer"
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
                                {parseFloatWithFixedValue(item.preSubTotal)}
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
        {state?.invoiceType === "invoice_wise_discount_and_tax" ? (
          <IonCard>
            <IonCardContent>
              <IonGrid className="ion-no-padding">
                <IonRow>
                  <IonLabel>Discount Type</IonLabel>
                  <IonRadioGroup value={state?.discountType}>
                    <div>
                      <IonRadio value="1"></IonRadio>
                      <IonText>%</IonText>
                    </div>
                    <div>
                      <IonRadio value="2"></IonRadio>
                      <IonText>{Curruncy}</IonText>
                    </div>
                  </IonRadioGroup>
                </IonRow>
                <IonRow>
                  <IonLabel>Discount Value</IonLabel>
                  <IonInput
                    className="customInput"
                    name="discountValue"
                    type="number"
                    value={state?.discountValue}
                  />
                </IonRow>
                <IonRow>
                  <div className="space_between">
                    <IonLabel>Tax </IonLabel>
                    <IonIcon
                      icon={addOutline}
                      color="success"
                      onClick={() => history.push("/taxes/add")}
                    ></IonIcon>
                  </div>
                  <IonList>
                    <IonItem onClick={() => setTaxModal(true)}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        {state?.taxName?.name || "--Select Tax--"}
                        <IonIcon icon={chevronDown}></IonIcon>
                      </div>
                    </IonItem>
                  </IonList>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        ) : (
          ""
        )}
        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <IonCheckbox
                    checked={state?.all_checks?.shipping_charges}
                    name="shipping_charges"
                  ></IonCheckbox>
                  <IonLabel>
                    Shipping Charges <IonText>({Curruncy})</IonText>
                  </IonLabel>
                </div>
                <IonInput
                  disabled
                  className="customInput"
                  name="shipping_charges"
                  type="number"
                  value={state?.other_charges?.shipping_charges}
                />
              </IonRow>
              <IonRow>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <IonCheckbox
                    checked={state?.round_off}
                    name="round_off"
                  ></IonCheckbox>
                  <IonLabel>
                    Round Off <IonText>({Curruncy})</IonText>
                  </IonLabel>
                </div>
                <IonInput
                  className="customInput"
                  name="round_off_value"
                  type="number"
                  value={state?.round_off_value}
                />
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        {state.all_products?.length ? (
          <IonCard>
            <IonCardContent>
              <IonGrid className="ion-no-padding">
                <IonRow>
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
                      <h2>
                        {Curruncy} {parseFloatWithFixedValue(state.amount)}
                      </h2>
                    </div>
                    {Number(state?.discount) > 0 ? (
                      <div
                        style={{
                          display: "flex",
                          paddingBottom: "6px",
                          justifyContent: "space-between",
                          color: "black",
                        }}
                      >
                        <h2>Total Discount (-)</h2>
                        <h2>
                          {Curruncy} {parseFloatWithFixedValue(state.discount)}
                        </h2>
                      </div>
                    ) : (
                      ""
                    )}
                    {Number(state.GST) > 0 ? (
                      <>
                        {isClientCompanyStateSame ? (
                          <>
                            <div
                              style={{
                                display: "flex",
                                paddingBottom: "6px",
                                justifyContent: "space-between",
                                color: "black",
                              }}
                            >
                              <h2>CGST</h2>
                              <h2>
                                {Curruncy}{" "}
                                {parseFloatWithFixedValue(state.CGST)}
                              </h2>
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
                              <h2>
                                {Curruncy}{" "}
                                {parseFloatWithFixedValue(state.SGST)}
                              </h2>
                            </div>
                          </>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              paddingBottom: "6px",
                              justifyContent: "space-between",
                              color: "black",
                            }}
                          >
                            <h2>IGST</h2>
                            <h2>
                              {Curruncy} {parseFloatWithFixedValue(state.IGST)}
                            </h2>
                          </div>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                    <div
                      style={{
                        display: "flex",
                        paddingBottom: "6px",
                        justifyContent: "space-between",
                        color: "black",
                      }}
                    >
                      <h2>Grand Total</h2>
                      <h2>
                        {Curruncy} {parseFloatWithFixedValue(state.total)}
                      </h2>
                    </div>
                  </div>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        ) : (
          ""
        )}

        <IonCard>
          <IonCardContent>
            <IonGrid className="ion-no-padding">
              <IonRow>
                <IonLabel>Note For Client</IonLabel>
                <IonInput
                  className="customInput"
                  type="text"
                  name="clientNote"
                  value={state?.other_info?.clientNote}
                  onIonInput={onHandleOtherInfoInputChange}
                />
              </IonRow>
              <IonRow>
                <IonLabel>Note For Admin</IonLabel>
                <IonInput
                  className="customInput"
                  type="text"
                  name="note"
                  value={state?.other_info?.note}
                  onIonInput={onHandleOtherInfoInputChange}
                />
              </IonRow>
              <IonRow>
                <div className="space_between">
                  <IonLabel>Bank </IonLabel>
                  <IonIcon
                    icon={addOutline}
                    color="success"
                    // onClick={() => history.push("/items/add")}
                  ></IonIcon>
                </div>
                <IonList>
                  <IonItem onClick={() => setBankModal(true)}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      {selectedBank?.name || "--Select Bank--"}
                      <IonIcon icon={chevronDown}></IonIcon>
                    </div>
                  </IonItem>
                </IonList>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
      <IonModal isOpen={customerModal}>
        <SelectContact
          title={"Select Customer"}
          contacts={contacts}
          selectedItem={state.checkout_details}
          onSelectionCancel={() => setCustomerModal(false)}
          onSelectionChange={onHandleCustomer}
        />
      </IonModal>
      <IonModal isOpen={taxModal}>
        <SelectTax
          title="Select Tax"
          taxes={taxes}
          selectedItem={selectedTax}
          onSelectionCancel={() => setTaxModal(false)}
          onSelectionChange={onHandleTax}
        />
      </IonModal>
      <IonModal isOpen={bankModal}>
        <SelectBank
          title={"Select Bank"}
          banks={banks}
          selectedItem={selectedBank}
          onSelectionCancel={() => setBankModal(false)}
          onSelectionChange={onHandleBank}
        />
      </IonModal>
    </IonPage>
  );
};

export default AddSales;
