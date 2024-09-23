import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./NewContact.module.scss";
import { validateContact } from "../FormValidation";
import useAxios from "../../../utils/axiosInstance";
import AppTypeahead from "../../../components/Select/AppTypeahead";
import { Country, AllCountries } from "../../../assets/helpers/AllCountries";

interface FormData {
  DL: string;
  GSTIN: string;
  PAN: string;
  TIN: string;
  VAT: string;
  billing_address: string;
  billing_PIN_Code: string;
  billing_city: string;
  billing_country: string;
  billing_state: string;
  name: string;
  display_name: string;
  email: string;
  phone: string;
  contactType: string;
  isBillAndShipAddressSame: boolean;
  shipping_address: string;
  shipping_city: string;
  shipping_name: string;
  shipping_display_name: string;
  shipping_country: string;
  shipping_email: string;
  shipping_pin_code: string;
  shipping_phone: string;
  shipping_state: string;
}

const NewContact: FC = () => {
  const axios = useAxios();

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string>("");
  const [selectedFruits, setSelectedFruits] = useState<Country | null>(null);
  const modal = useRef<HTMLIonModalElement>(null);

  const fruitSelectionChanged = (selectedCountry: Country) => {
    setSelectedFruits(selectedCountry);
    setFormData((pre) => ({ ...pre, billing_country: selectedCountry.name }));
    modal.current?.dismiss();
  };
  const [formData, setFormData] = useState<FormData>({
    DL: "",
    GSTIN: "",
    PAN: "",
    TIN: "",
    VAT: "",
    billing_address: "",
    billing_PIN_Code: "",
    billing_city: "",
    billing_country: "",
    billing_state: "",
    name: "",
    display_name: "",
    email: "",
    phone: "",
    contactType: "customer",
    isBillAndShipAddressSame: false,
    shipping_address: "",
    shipping_city: "",
    shipping_name: "",
    shipping_display_name: "",
    shipping_country: "",
    shipping_email: "",
    shipping_pin_code: "",
    shipping_phone: "",
    shipping_state: "",
  });
  console.log(selectedFruits, formData.shipping_country);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  };

  const handleContactTypeChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((pre) => ({ ...pre, contactType: value }));
  };

  const handleIsBillingAndShippingAddressChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((pre) => ({
      ...pre,
      isBillAndShipAddressSame: value === "yes" ? true : false,
    }));
  };

  const handleSave = () => {
    const result = validateContact(formData, formData.contactType);
    if (result.success === false) {
      setErrorMessages(result.message);
      setShowAlert(true);
      return;
    }
  };

  return (
    <IonPage className={styles.new_contact}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>New Contact</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSave} color="primary">
              Save
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Contact Information</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid className="ion-no-padding">
              <IonRow>
                <IonLabel>Contact Type</IonLabel>
                <IonRadioGroup
                  value={formData.contactType}
                  onIonChange={handleContactTypeChange}
                >
                  <div>
                    <IonRadio value="customer"></IonRadio>
                    <IonLabel>Customer</IonLabel>
                  </div>
                  <div>
                    <IonRadio value="supplier"></IonRadio>
                    <IonLabel>Supplier</IonLabel>
                  </div>
                </IonRadioGroup>
              </IonRow>
              <IonRow>
                <IonLabel>Name</IonLabel>
                <IonInput
                  className="customInput"
                  name="name"
                  value={formData.name}
                  onIonInput={handleInputChange}
                />
              </IonRow>
              <IonRow>
                <IonLabel>Display Name</IonLabel>
                <IonInput
                  className="customInput"
                  name="display_name"
                  value={formData.display_name}
                  onIonInput={handleInputChange}
                />
              </IonRow>
              <IonRow>
                <IonLabel>Phone</IonLabel>
                <IonInput
                  className="customInput"
                  name="phone"
                  value={formData.phone}
                  onIonInput={handleInputChange}
                />
              </IonRow>
              <IonRow>
                <IonLabel>Email</IonLabel>
                <IonInput
                  className="customInput"
                  name="email"
                  value={formData.email}
                  onIonInput={handleInputChange}
                />
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Other Details</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid className="ion-no-padding">
              <IonRow>
                <IonLabel>GSTIN</IonLabel>
                <IonInput
                  className="customInput"
                  name="GSTIN"
                  value={formData.GSTIN}
                  onIonInput={handleInputChange}
                />
              </IonRow>
              <IonRow>
                <IonLabel>TIN</IonLabel>
                <IonInput
                  className="customInput"
                  name="TIN"
                  value={formData.TIN}
                  onIonInput={handleInputChange}
                />
              </IonRow>
              <IonRow>
                <IonLabel>PAN</IonLabel>
                <IonInput
                  className="customInput"
                  name="PAN"
                  value={formData.PAN}
                  onIonInput={handleInputChange}
                />
              </IonRow>
              <IonRow>
                <IonLabel>VAT NO</IonLabel>
                <IonInput
                  className="customInput"
                  name="VAT"
                  value={formData.VAT}
                  onIonInput={handleInputChange}
                />
              </IonRow>
              <IonRow>
                <IonLabel>DL. No</IonLabel>
                <IonInput
                  className="customInput"
                  name="DL"
                  value={formData.DL}
                  onIonInput={handleInputChange}
                />
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Billing Address</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid className="ion-no-padding">
              <IonRow>
                <IonLabel>Address</IonLabel>
                <IonInput
                  className="customInput"
                  name="billing_address"
                  value={formData.billing_address}
                  onIonInput={handleInputChange}
                />
              </IonRow>
              <IonRow>
                <IonList inset={true}>
                  <IonItem button={true} detail={false} id="select-fruits">
                    <IonLabel color="primary">Favorite Fruits</IonLabel>
                    <div slot="end" id="selected-fruits">
                      {formData?.billing_country || "--Select Country--"}
                    </div>
                  </IonItem>
                </IonList>
              </IonRow>
              <IonRow>
                <IonLabel>State</IonLabel>
                <IonInput
                  className="customInput"
                  name="billing_state"
                  value={formData.billing_state}
                  onIonInput={handleInputChange}
                />
              </IonRow>
              <IonRow>
                <IonLabel>City</IonLabel>
                <IonInput
                  className="customInput"
                  name="billing_city"
                  value={formData.billing_city}
                  onIonInput={handleInputChange}
                />
              </IonRow>
              <IonRow>
                <IonLabel>Pin Code</IonLabel>
                <IonInput
                  className="customInput"
                  name="billing_PIN_Code"
                  value={formData.billing_PIN_Code}
                  onIonInput={handleInputChange}
                />
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {formData.contactType === "customer" && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Shipping Address</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid className="ion-no-padding">
                <IonRow>
                  <IonLabel>Is billing and shipping address same</IonLabel>
                  <IonRadioGroup
                    value={formData.isBillAndShipAddressSame ? "yes" : "no"}
                    onIonChange={handleIsBillingAndShippingAddressChange}
                  >
                    <div>
                      <IonRadio value="yes"></IonRadio>
                      <IonLabel>Yes</IonLabel>
                    </div>
                    <div>
                      <IonRadio value="no"></IonRadio>
                      <IonLabel>No</IonLabel>
                    </div>
                  </IonRadioGroup>
                </IonRow>
                {!formData.isBillAndShipAddressSame && (
                  <>
                    <IonRow>
                      <IonLabel>Address</IonLabel>
                      <IonInput
                        className="customInput"
                        name="shipping_address"
                        value={formData.shipping_address}
                        onIonInput={handleInputChange}
                      />
                    </IonRow>
                    <IonRow>
                      <IonLabel>Country</IonLabel>
                      <IonInput
                        className="customInput"
                        name="shipping_country"
                        value={formData.shipping_country}
                        onIonInput={handleInputChange}
                      />
                    </IonRow>
                    <IonRow>
                      <IonLabel>State</IonLabel>
                      <IonInput
                        className="customInput"
                        name="shipping_state"
                        value={formData.shipping_state}
                        onIonInput={handleInputChange}
                      />
                    </IonRow>
                    <IonRow>
                      <IonLabel>City</IonLabel>
                      <IonInput
                        className="customInput"
                        name="shipping_city"
                        value={formData.shipping_city}
                        onIonInput={handleInputChange}
                      />
                    </IonRow>
                    <IonRow>
                      <IonLabel>Pin Code</IonLabel>
                      <IonInput
                        className="customInput"
                        name="shipping_pin_code"
                        value={formData.shipping_pin_code}
                        onIonInput={handleInputChange}
                      />
                    </IonRow>
                    <IonRow>
                      <IonLabel>Name</IonLabel>
                      <IonInput
                        className="customInput"
                        name="shipping_name"
                        value={formData.shipping_name}
                        onIonInput={handleInputChange}
                      />
                    </IonRow>
                    <IonRow>
                      <IonLabel>Display Name</IonLabel>
                      <IonInput
                        className="customInput"
                        name="shipping_display_name"
                        value={formData.shipping_display_name}
                        onIonInput={handleInputChange}
                      />
                    </IonRow>
                    <IonRow>
                      <IonLabel>Phone</IonLabel>
                      <IonInput
                        className="customInput"
                        name="shipping_phone"
                        value={formData.shipping_phone}
                        onIonInput={handleInputChange}
                      />
                    </IonRow>
                    <IonRow>
                      <IonLabel>Email</IonLabel>
                      <IonInput
                        className="customInput"
                        name="shipping_email"
                        value={formData.shipping_email}
                        onIonInput={handleInputChange}
                      />
                    </IonRow>
                  </>
                )}
              </IonGrid>
            </IonCardContent>
          </IonCard>
        )}

        <IonModal trigger="select-fruits" ref={modal}>
          <AppTypeahead
            title="Favorite Fruits"
            countries={AllCountries}
            selectedItem={selectedFruits}
            onSelectionCancel={() => modal.current?.dismiss()}
            onSelectionChange={fruitSelectionChanged}
          />
        </IonModal>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => {
            setShowAlert(false);
            setErrorMessages("");
          }}
          header={"Form validation error"}
          message={errorMessages}
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};

export default NewContact;
