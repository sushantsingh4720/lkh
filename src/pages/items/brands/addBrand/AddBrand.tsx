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
import styles from "./AddBrand.module.scss";
import useAxios from "../../../../utils/axiosInstance";
interface FormData {
  name: string;
  active: boolean;
  description: string;
}
const initialFormData: FormData = {
  name: "",
  active: true,
  description: "",
};

const AddBrand: FC = () => {
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
    const { name, description } = formData;
    let updatedFormData = {
      ...formData,
      name: name.trim(),
      ...(description && { description: description.trim() }),
    };
    setFormData(updatedFormData);
    if (!updatedFormData.name) {
      setAlertHeader("Form validation Failed");
      setErrorMessages("Please enter brand name");
      setShowAlert(true);
      return;
    }
    setBusy(true);
    try {
      const response = await axios.post("/brand", updatedFormData, {
        headers: { "Content-Type": "application/json" },
      });
      const result = response.data;
      const message = result?.message || "Brand Successfully Saved";
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
    <IonPage className={styles.add_brand_page}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBackOutline} color="primary"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Add Brand</IonTitle>
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
            <IonCardTitle>Brand Information</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid className="ion-no-padding">
              <IonRow>
                <IonLabel>Name</IonLabel>
                <IonInput
                  className="customInput"
                  name="name"
                  value={formData?.name}
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
                <IonLabel>Description</IonLabel>
                <IonTextarea
                  className="customInput"
                  name="description"
                  value={formData?.description}
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

export default AddBrand;
