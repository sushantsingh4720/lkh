import {
    IonAlert,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCheckbox,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonLabel,
    IonLoading,
    IonPage,
    IonRow,
    IonText,
    IonTextarea,
    IonTitle,
    IonToast,
    IonToolbar,
  } from "@ionic/react";
  import { addOutline, arrowBackOutline, searchOutline } from "ionicons/icons";
  import { FC, useState } from "react";
  import { useHistory } from "react-router";
  import styles from "./AddSac.module.scss";
  import useAxios from "../../../../utils/axiosInstance";
  interface FormData {
    sac_code_no: string;
    sac_code: string;
    gst_rate: string;
    active: boolean;
    name_of_commodity: string;
  }
  const initialFormData: FormData = {
    sac_code_no: "",
    sac_code: "",
    gst_rate: "0",
    active: true,
    name_of_commodity: "",
  };
  
  const AddSac: FC = () => {
    const axios = useAxios();
    const history = useHistory();
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [alertHeader, setAlertHeader] = useState<string>("");
    const [errorMessage, setErrorMessages] = useState<string>("");
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [busy, setBusy] = useState<boolean>(false);
    const onHandleInputChange = (e: any) => {
      const { name, value } = e.target;
      setFormData((pre) => ({ ...pre, [name]: value }));
    };
  
    const onHandleCheckboxChange = (e: any) => {
      const { name, checked } = e.target;
      setFormData((pre) => ({ ...pre, [name]: checked }));
    };
  
    const handleSave = async () => {
      const { sac_code, sac_code_no, name_of_commodity, gst_rate } = formData;
      let updatedFormData = {
        ...formData,
        ...(name_of_commodity && { name_of_commodity: name_of_commodity.trim() }),
      };
  
      setFormData(updatedFormData);
      if (!sac_code_no || sac_code_no.length < 4) {
        setAlertHeader("Form validation Failed");
        setErrorMessages("Please enter a valid sac code no");
        setShowAlert(true);
        return;
      }
      if (!sac_code || sac_code.length < 4) {
        setAlertHeader("Form validation Failed");
        setErrorMessages("Please enter a sac code");
        setShowAlert(true);
        return;
      }
      if (+gst_rate > 100) {
        setAlertHeader("Form validation Failed");
        setErrorMessages("Please enter a valid rate");
        setShowAlert(true);
        return;
      }
      setBusy(true);
      try {
        const response = await axios.post("/gstsac", updatedFormData, {
          headers: { "Content-Type": "application/json" },
        });
        const result = response.data;
        const message = result?.message || "Sac Successfully Saved";
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
      <IonPage className={styles.add_sac_page}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => history.goBack()}>
                <IonIcon icon={arrowBackOutline}></IonIcon>
              </IonButton>
            </IonButtons>
            <IonTitle>Add Sac</IonTitle>
            <IonButtons slot="end">
              <IonButton color="primary" onClick={handleSave}>
                Save
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Sac Information</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid className="ion-no-padding">
                <IonRow>
                  <IonLabel>Sac Code No</IonLabel>
                  <IonInput
                    className="customInput"
                    type="number"
                    name="sac_code_no"
                    value={formData?.sac_code_no}
                    onIonInput={onHandleInputChange}
                  />
                </IonRow>
                <IonRow>
                  <IonLabel>Sac Code</IonLabel>
                  <IonInput
                    className="customInput"
                    type="number"
                    name="sac_code"
                    value={formData?.sac_code}
                    onIonInput={onHandleInputChange}
                  />
                </IonRow>
                <IonRow>
                  <IonLabel>Rate (%)</IonLabel>
                  <IonInput
                    className="customInput"
                    type="number"
                    name="gst_rate"
                    value={formData?.gst_rate}
                    onIonInput={onHandleInputChange}
                  />
                </IonRow>
                <IonRow>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <IonCheckbox
                      checked={formData?.active}
                      name="active"
                      onIonChange={onHandleCheckboxChange}
                    ></IonCheckbox>
                    <IonLabel>Active</IonLabel>
                  </div>
                </IonRow>
                <IonRow>
                  <IonLabel>Name Of Commodity</IonLabel>
                  <IonTextarea
                    className="customInput"
                    name="name_of_commodity"
                    value={formData?.name_of_commodity}
                    onIonInput={onHandleInputChange}
                  />
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => {
              setShowAlert(false);
              setErrorMessages("");
              setAlertHeader("");
            }}
            header={alertHeader}
            message={errorMessage}
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
        </IonContent>
      </IonPage>
    );
  };
  
  export default AddSac;
  