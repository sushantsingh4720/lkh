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
import { SAC, RouteParams } from "../../../../assets/helpers/Interfaces";
import styles from "./EditSac.module.scss";
import { arrowBackOutline, language } from "ionicons/icons";
import LoadDataSpinner from "../../../../components/Spinner/loadDataSpinner/LoadDataSpinner";
const EditSac: FC = () => {
  const axios = useAxios();
  const history = useHistory();
  const { id } = useParams<RouteParams>();
  const [formData, setFormData] = useState<SAC>();
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const [sacRes] = await Promise.all([axios.get(`/gstsac/${id}`)]);
      const {
        fy_id,
        createdAt,
        updatedAt,
        id: number,
        companyId,
        ...rest
      } = sacRes.data?.data;
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
    <IonPage className={styles.edit_sac_page}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBackOutline} color="primary"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Edit Sac</IonTitle>
          {loading ? (
            ""
          ) : (
            <IonButtons slot="end">
              <IonButton color="primary">Save</IonButton>
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

export default EditSac;
