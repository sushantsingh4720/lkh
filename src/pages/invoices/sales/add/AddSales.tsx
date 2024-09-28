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
import { FC, useEffect, useRef, useState } from "react";
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
const initialFormData: SalesInvoice = {
  invoiceType: "item_wise_discount_and_tax",
  type: "product",
  date: todayDate,
  dueDate: todayDate,
};

const AddSales: FC = () => {
  const history = useHistory();
  const axios = useAxios();
  const customerModal = useRef<HTMLIonModalElement>(null);
  const itemModal = useRef<HTMLIonModalElement>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Contact | null>(
    null
  );
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState<SalesInvoice>(initialFormData);
  const [allProducts, setAllProducts] = useState<InvoiceItem[]>([]);
  const [nextInvoice, setNextInvoice] = useState<number | null>(null);
  const [contacts, setContacts] = useState([]);
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "date") {
      return setFormData((pre) => ({
        ...pre,
        [name]: value,
        ...(name === "date" && new Date(pre.dueDate || "") < new Date(value)
          ? { dueDate: value }
          : {}),
      }));
    }
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  const handleItemTypeChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, type: value }));
  };

  const handleInvoiceTypeChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, invoiceType: value }));
  };

  const onHandleCustomer = (selectedContact: Contact) => {
    setSelectedCustomer(selectedContact);
    const address = selectedContact.isBillAndShipAddressSame
      ? `${selectedContact.billing_address ?? ""} ${
          selectedContact.billing_city ?? ""
        } ${selectedContact.billing_state ?? ""} ${
          selectedContact.billing_PIN_Code ?? ""
        } ${selectedContact.billing_country ?? ""}`.trim()
      : `${selectedContact.shipping_address ?? ""} ${
          selectedContact.shipping_city ?? ""
        } ${selectedContact.shipping_state ?? ""} ${
          selectedContact.shipping_pin_code ?? ""
        } ${selectedContact.shipping_country ?? ""}`.trim();

    setFormData((pre) => ({
      ...pre,
      name: selectedContact.name,
      checkout_details: selectedContact,
      shipping_address: address.trim(),
    }));
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
    if (nextInvoice === null) {
      // Fetch the next invoice only if it hasn't been fetched yet
      try {
        const nextInvoiceRes = await axios.get("/sales_inv/get_inv");
        setNextInvoice(nextInvoiceRes?.data?.invoice);
        setFormData((pre) => ({
          ...pre,
          invoice: nextInvoiceRes?.data?.invoice,
        }));
      } catch (error) {
        // Handle error
      }
    }
  };

  const fetchItems = async () => {
    try {
      const [items] = await Promise.all([axios.get("/product/allproducts")]);
      setItems(
        items.data?.products.filter(
          (product: any) => product.type === formData?.type
        ) || []
      );
    } catch (error) {
      // Handle error
    }
  };

  useIonViewWillEnter(() => {
    fetchData();
  });

  useEffect(() => {
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
                      {formData?.name || "--Select Customer--"}
                      <IonIcon icon={chevronDown}></IonIcon>
                    </div>
                  </IonItem>
                </IonList>
                {formData?.name ? (
                  <span style={{ color: "green" }}>
                    {formData?.checkout_details?.billing_state}
                    {", "}
                    {formData?.checkout_details?.billing_country}
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
                  value={formData.invoice}
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
                  value={formData.date}
                  onIonInput={handleInputChange}
                />
              </IonRow>
              <IonRow>
                <IonLabel>Due Date</IonLabel>
                <IonInput
                  className="customInput"
                  type="date"
                  name="dueDate"
                  min={formData.date}
                  value={formData.dueDate}
                  onIonInput={handleInputChange}
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
                  value={formData.type}
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
                  value={formData.invoiceType}
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
          selectedItem={selectedCustomer}
          onSelectionCancel={() => customerModal.current?.dismiss()}
          onSelectionChange={onHandleCustomer}
        />
      </IonModal>
      <IonModal trigger="add-item-modal" ref={itemModal}>
        <AddInvoiceItem
          title={"Add Item"}
          onSelectionCancel={() => itemModal.current?.dismiss()}
        />
      </IonModal>
    </IonPage>
  );
};

export default AddSales;
