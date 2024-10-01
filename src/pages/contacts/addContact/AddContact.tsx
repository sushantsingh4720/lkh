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
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./AddContact.module.scss";
import { validateContact } from "../FormValidation";
import useAxios from "../../../utils/axiosInstance";
import { Country, AllCountries } from "../../../assets/helpers/AllCountries";
import { State, AllStates } from "../../../assets/helpers/AllStates";
import SelectCountry from "../../../components/Select/SelectCountry";
import { arrowBackOutline, chevronDown } from "ionicons/icons";
import SelectState from "../../../components/Select/SelectState";
import { City, AllCities } from "../../../assets/helpers/AllCities";
import SelectCity from "../../../components/Select/SelectCity";
import { useHistory } from "react-router";
import { Contact } from "../../../assets/helpers/Interfaces";

const initialFormData: Contact = {
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
};
const AddContact: FC = () => {
  const history = useHistory();
  const axios = useAxios();
  const [busy, setBusy] = useState<boolean>(false);
  const [formData, setFormData] = useState<Contact>(initialFormData);
  const [countryModal, setCountryModal] = useState<boolean>(false);
  const [stateModal, setStateModal] = useState<boolean>(false);
  const [cityModal, setCityModal] = useState<boolean>(false);
  const [shippingCountryModal, setShippingCountryModal] =
    useState<boolean>(false);
  const [shippingStateModal, setShippingStateModal] = useState<boolean>(false);
  const [ShippingCityModal, setShippingCityModal] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [alertHeader, setAlertHeader] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<string>("");

  const [selectedBillingCountry, setSelectedBillingCountry] =
    useState<Country | null>(null);

  const [allBillingStateByCountry, setAllBillingStateByCountry] = useState<
    State[]
  >([]);

  const [selectedBillingState, setSelectedBillingState] =
    useState<State | null>(null);

  const [allCitiesByCountryState, setAllCitiesByCountryState] = useState<
    City[] | []
  >([]);

  const [selectedBillingCity, setSelectedBillingCity] = useState<City | null>(
    null
  );

  const [selectedShippingCountry, setSelectedShippingCountry] =
    useState<Country | null>(null);

  const [allShippingStateByCountry, setAllShippingStateByCountry] = useState<
    State[]
  >([]);

  const [selectedShippingState, setSelectedShippingState] =
    useState<State | null>(null);

  const [allShippingCitiesByCountryState, setAllShippingCitiesByCountryState] =
    useState<City[] | []>([]);

  const [selectedShippingCity, setSelectedShippingCity] = useState<City | null>(
    null
  );

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

  const onHandleBillingCountry = (selectedCountry: Country) => {
    if (selectedCountry.name !== formData.billing_country) {
      setSelectedBillingState(null);
      setFormData((pre) => ({
        ...pre,
        billing_state: "",
      }));
      setAllCitiesByCountryState([]);
      setFormData((pre) => ({ ...pre, billing_city: "" }));
    }
    setSelectedBillingCountry(selectedCountry);
    const filteredStateByCountry = AllStates.filter(
      (state) => state.country_code === selectedCountry.iso2
    );
    setAllBillingStateByCountry(filteredStateByCountry);
    setFormData((pre) => ({
      ...pre,
      billing_country: selectedCountry.name,
    }));

    setCountryModal(false);
  };

  const onHandleBillingState = async (selectedState: State) => {
    if (selectedState.name !== formData.billing_state) {
      if (selectedBillingCountry?.iso2 && selectedState?.iso2) {
        // Run the API call without waiting for it to finish
        AllCities(selectedBillingCountry.iso2, selectedState.iso2)
          .then((allCities) => {
            setAllCitiesByCountryState(allCities);
          })
          .catch((error) => {
            setAllCitiesByCountryState([]);
          });
      }
      setFormData((pre) => ({ ...pre, billing_city: "" }));
    }
    setSelectedBillingState(selectedState);
    setFormData((pre) => ({ ...pre, billing_state: selectedState.name }));
    setStateModal(false);
  };

  const onHandleBillingCity = (selectedCity: City) => {
    setSelectedBillingCity(selectedCity);
    setFormData((pre) => ({ ...pre, billing_city: selectedCity.name }));
    setCityModal(false);
  };

  const onHandleShippingCountry = (selectedCountry: Country) => {
    if (selectedCountry.name !== formData.shipping_country) {
      setSelectedShippingState(null);
      setFormData((pre) => ({
        ...pre,
        shipping_state: "",
      }));
      setAllShippingCitiesByCountryState([]);
      setFormData((pre) => ({ ...pre, shipping_city: "" }));
    }
    setSelectedShippingCountry(selectedCountry);
    const filteredStateByCountry = AllStates.filter(
      (state) => state.country_code === selectedCountry.iso2
    );
    setAllShippingStateByCountry(filteredStateByCountry);
    setFormData((pre) => ({
      ...pre,
      shipping_country: selectedCountry.name,
    }));

    setShippingCountryModal(false);
  };

  const onHandleShippingState = async (selectedState: State) => {
    if (selectedState.name !== formData.shipping_state) {
      if (selectedShippingCountry?.iso2 && selectedState?.iso2) {
        // Run the API call without waiting for it to finish
        AllCities(selectedShippingCountry.iso2, selectedState.iso2)
          .then((allCities) => {
            setAllShippingCitiesByCountryState(allCities);
          })
          .catch((error) => {
            setAllShippingCitiesByCountryState([]);
          });
      }
      setFormData((pre) => ({ ...pre, shipping_city: "" }));
    }

    setSelectedShippingState(selectedState);
    setFormData((pre) => ({ ...pre, shipping_state: selectedState.name }));
    setShippingStateModal(false);
  };

  const onHandleShippingCity = (selectedCity: City) => {
    setSelectedShippingCity(selectedCity);
    setFormData((pre) => ({ ...pre, shipping_city: selectedCity.name }));
    setShippingCityModal(false);
  };

  const handleSave = async () => {
    const {
      name,
      display_name,
      shipping_name,
      shipping_display_name,
      isBillAndShipAddressSame,
      contactType,
    } = formData;

    const updatedFormData = {
      ...formData,
      name: name?.trim(),
      display_name: display_name?.trim(),
      ...(shipping_name && { shipping_name: shipping_name.trim() }),
      ...(shipping_display_name && {
        shipping_display_name: shipping_display_name.trim(),
      }),
      ...(contactType === "supplier" || isBillAndShipAddressSame
        ? {
            shipping_name: "",
            shipping_display_name: "",
            shipping_phone: "",
            shipping_email: "",
            shipping_address: "",
            shipping_country: "",
            shipping_state: "",
            shipping_city: "",
            shipping_pin_code: "",
          }
        : {}),
    };

    setFormData(updatedFormData);

    const result = validateContact(updatedFormData, contactType);
    if (!result.success) {
      setAlertHeader("Form validation Failed");
      setErrorMessages(result.message);
      setShowAlert(true);
      return;
    }
    setBusy(true);
    try {
      const response = await axios.post("/contact", updatedFormData, {
        headers: { "Content-Type": "application/json" },
      });
      const result = response.data;
      const message = result?.message || "Contact Successfully Saved";
      setSuccessMessage(message);
      setIsSuccess(true);
      setFormData(initialFormData);
      history.goBack();
    } catch (error: any) {
      const err = error.response?.data;
      setAlertHeader("Form Submission Failed");
      setErrorMessages(err?.message || "Please Retry");
      setShowAlert(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <IonPage className={styles.add_contact}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBackOutline} color="primary"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Add Contact</IonTitle>
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
                <IonList>
                  <IonItem onClick={() => setCountryModal(true)}>
                    <IonLabel color="primary">Country</IonLabel>
                    <div
                      slot="end"
                      style={{
                        display: "flex",
                        gap: "6px",
                        alignItems: "center",
                      }}
                    >
                      {formData?.billing_country || "--Select Country--"}{" "}
                      <IonIcon icon={chevronDown}></IonIcon>
                    </div>
                  </IonItem>
                </IonList>
              </IonRow>
              <IonRow>
                {true ? (
                  <IonList onClick={() => setStateModal(true)}>
                    <IonItem disabled={!formData?.billing_country}>
                      <IonLabel color="primary">State</IonLabel>
                      <div
                        slot="end"
                        style={{
                          display: "flex",
                          gap: "6px",
                          alignItems: "center",
                        }}
                      >
                        {formData?.billing_state || "--Select State--"}{" "}
                        <IonIcon icon={chevronDown}></IonIcon>
                      </div>
                    </IonItem>
                  </IonList>
                ) : (
                  <>
                    <IonLabel>State</IonLabel>
                    <IonInput
                      className="customInput"
                      name="billing_state"
                      value={formData.billing_state}
                      onIonInput={handleInputChange}
                      disabled={!formData.billing_country}
                    />
                  </>
                )}
              </IonRow>
              <IonRow>
                {true ? (
                  <IonList onClick={() => setCityModal(true)}>
                    <IonItem
                      disabled={
                        !formData?.billing_country || !formData?.billing_state
                      }
                    >
                      <IonLabel color="primary">City</IonLabel>
                      <div
                        slot="end"
                        style={{
                          display: "flex",
                          gap: "6px",
                          alignItems: "center",
                        }}
                      >
                        {formData?.billing_city || "--Select City--"}{" "}
                        <IonIcon icon={chevronDown}></IonIcon>
                      </div>
                    </IonItem>
                  </IonList>
                ) : (
                  <>
                    <IonLabel>City</IonLabel>
                    <IonInput
                      className="customInput"
                      name="billing_city"
                      value={formData.billing_city}
                      onIonInput={handleInputChange}
                      disabled={
                        !formData?.billing_country || !formData?.billing_state
                      }
                    />
                  </>
                )}
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
                      <IonList onClick={() => setShippingCountryModal(true)}>
                        <IonItem>
                          <IonLabel color="primary">Country</IonLabel>
                          <div
                            slot="end"
                            style={{
                              display: "flex",
                              gap: "6px",
                              alignItems: "center",
                            }}
                          >
                            {formData?.shipping_country || "--Select Country--"}{" "}
                            <IonIcon icon={chevronDown}></IonIcon>
                          </div>
                        </IonItem>
                      </IonList>
                    </IonRow>
                    <IonRow>
                      {true ? (
                        <IonList onClick={() => setShippingStateModal(true)}>
                          <IonItem disabled={!formData?.shipping_country}>
                            <IonLabel color="primary">State</IonLabel>
                            <div
                              slot="end"
                              style={{
                                display: "flex",
                                gap: "6px",
                                alignItems: "center",
                              }}
                            >
                              {formData?.shipping_state || "--Select State--"}{" "}
                              <IonIcon icon={chevronDown}></IonIcon>
                            </div>
                          </IonItem>
                        </IonList>
                      ) : (
                        <>
                          <IonLabel>State</IonLabel>
                          <IonInput
                            className="customInput"
                            name="shipping_state"
                            value={formData.shipping_state}
                            onIonInput={handleInputChange}
                            disabled={!formData.shipping_country}
                          />
                        </>
                      )}
                    </IonRow>
                    <IonRow>
                      {true ? (
                        <IonList onClick={() => setShippingCityModal(true)}>
                          <IonItem
                            disabled={
                              !formData?.shipping_country ||
                              !formData?.shipping_state
                            }
                          >
                            <IonLabel color="primary">City</IonLabel>
                            <div
                              slot="end"
                              style={{
                                display: "flex",
                                gap: "6px",
                                alignItems: "center",
                              }}
                            >
                              {formData?.shipping_city || "--Select City--"}{" "}
                              <IonIcon icon={chevronDown}></IonIcon>
                            </div>
                          </IonItem>
                        </IonList>
                      ) : (
                        <>
                          <IonLabel>City</IonLabel>
                          <IonInput
                            className="customInput"
                            name="shipping_city"
                            value={formData?.shipping_city}
                            onIonInput={handleInputChange}
                            disabled={
                              !formData?.shipping_country ||
                              !formData?.shipping_state
                            }
                          />
                        </>
                      )}
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
                  </>
                )}
              </IonGrid>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
      <IonModal isOpen={countryModal}>
        <SelectCountry
          title="Billing Country"
          countries={AllCountries}
          selectedItem={selectedBillingCountry}
          onSelectionCancel={() => setCountryModal(false)}
          onSelectionChange={onHandleBillingCountry}
        />
      </IonModal>
      <IonModal isOpen={stateModal}>
        <SelectState
          title="Billing State"
          states={allBillingStateByCountry}
          selectedItem={selectedBillingState}
          onSelectionCancel={() => setStateModal(false)}
          onSelectionChange={onHandleBillingState}
        />
      </IonModal>
      <IonModal isOpen={cityModal}>
        <SelectCity
          title="Billing City"
          cities={allCitiesByCountryState}
          selectedItem={selectedBillingCity}
          onSelectionCancel={() => setCityModal(false)}
          onSelectionChange={onHandleBillingCity}
        />
      </IonModal>
      <IonModal isOpen={shippingCountryModal}>
        <SelectCountry
          title="Shipping Country"
          countries={AllCountries}
          selectedItem={selectedShippingCountry}
          onSelectionCancel={() => setShippingCountryModal(false)}
          onSelectionChange={onHandleShippingCountry}
        />
      </IonModal>
      <IonModal isOpen={shippingStateModal}>
        <SelectState
          title="Shipping State"
          states={allShippingStateByCountry}
          selectedItem={selectedShippingState}
          onSelectionCancel={() => setShippingStateModal(false)}
          onSelectionChange={onHandleShippingState}
        />
      </IonModal>
      <IonModal isOpen={ShippingCityModal}>
        <SelectCity
          title="Shipping City"
          cities={allShippingCitiesByCountryState}
          selectedItem={selectedShippingCity}
          onSelectionCancel={() => setShippingCityModal(false)}
          onSelectionChange={onHandleShippingCity}
        />
      </IonModal>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => {
          setShowAlert(false);
          setErrorMessages("");
          setAlertHeader("");
        }}
        header={alertHeader}
        message={errorMessages}
        buttons={["OK"]}
      />
      <IonLoading
        className="custom-loading"
        isOpen={busy}
        message="please wait..."
      />
      {/* <IonToast
        isOpen={isSuccess}
        position="bottom"
        positionAnchor="footer"
        message={successMessage}
        duration={3000}
      ></IonToast> */}
    </IonPage>
  );
};

export default AddContact;
