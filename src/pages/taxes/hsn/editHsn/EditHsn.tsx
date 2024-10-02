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
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { FC, useState } from "react";
import useAxios from "../../../../utils/axiosInstance";
import { useHistory, useParams } from "react-router";
import { HSN, RouteParams } from "../../../../assets/helpers/Interfaces";
import styles from "./EditHsn.module.scss";
import { arrowBackOutline, language } from "ionicons/icons";
import LoadDataSpinner from "../../../../components/Spinner/loadDataSpinner/LoadDataSpinner";
const EditHsn: FC = () => {
  const axios = useAxios();
  const history = useHistory();
  const { id } = useParams<RouteParams>();
  const [formData, setFormData] = useState<HSN>({});
  const [loading, setLoading] = useState(true);
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
    const { hsn_code, hsn_code_no, name_of_commodity, gst_rate } = formData;
    let updatedFormData = {
      ...formData,
      ...(name_of_commodity && { name_of_commodity: name_of_commodity.trim() }),
    };

    setFormData(updatedFormData);
    if (!hsn_code_no || hsn_code_no.length < 4) {
      setAlertHeader("Form validation Failed");
      setErrorMessages("Please enter valid hsn code no");
      setShowAlert(true);
      return;
    }
    if (!hsn_code || hsn_code.length < 4) {
      setAlertHeader("Form validation Failed");
      setErrorMessages("Please enter hsn code");
      setShowAlert(true);
      return;
    }
    if (gst_rate && +gst_rate > 100) {
      setAlertHeader("Form validation Failed");
      setErrorMessages("Please enter valid rate");
      setShowAlert(true);
      return;
    }
    setBusy(true);
    try {
      const response = await axios.put(`/gsthsn/${id}`, updatedFormData, {
        headers: { "Content-Type": "application/json" },
      });
      const result = response.data;
      const message = result?.message || "Hsn Successfully Saved";
      setSuccessMessage(message);
      setIsSuccess(true);
      setFormData({});
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const [hsnRes] = await Promise.all([axios.get(`/gsthsn/${id}`)]);

      const {
        fy_id,
        createdAt,
        updatedAt,
        id: number,
        companyId,
        ...rest
      } = hsnRes.data?.data;
      setFormData(rest);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    fetchData();
  });

  return (
    <IonPage className={styles.edit_hsn_page}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBackOutline} color="primary"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Edit Hsn</IonTitle>
          {loading ? (
            ""
          ) : (
            <IonButtons slot="end">
              <IonButton color="primary" onClick={handleSave}>Save</IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      {loading ? (
        <LoadDataSpinner />
      ) : (
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Hsn Information</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid className="ion-no-padding">
                <IonRow>
                  <IonLabel>Hsn Code No</IonLabel>
                  <IonInput
                    className="customInput"
                    type="number"
                    name="hsn_code_no"
                    value={formData?.hsn_code_no}
                    onIonInput={onHandleInputChange}
                  />
                </IonRow>
                <IonRow>
                  <IonLabel>Hsn Code</IonLabel>
                  <IonInput
                    className="customInput"
                    type="number"
                    name="hsn_code"
                    value={formData?.hsn_code}
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
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
        </IonContent>
      )}
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
    </IonPage>
  );
};

export default EditHsn;
