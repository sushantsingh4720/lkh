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
import { arrowBackOutline } from "ionicons/icons";
import { FC, useState } from "react";
import { useHistory, useParams } from "react-router";
import LoadDataSpinner from "../../../../components/Spinner/loadDataSpinner/LoadDataSpinner";
import { Category, RouteParams } from "../../../../assets/helpers/Interfaces";
import useAxios from "../../../../utils/axiosInstance";
import styles from "./EditCategory.module.scss";
const EditCategory: FC = () => {
  const history = useHistory();
  const axios = useAxios();
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<RouteParams>();
  const [formData, setFormData] = useState<Category>();

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
      const [categoryRes] = await Promise.all([axios.get(`/category/${id}`)]);

      const {
        fy_id,
        createdAt,
        updatedAt,
        id: number,
        companyId,
        ...rest
      } = categoryRes.data?.data;
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
    <IonPage className={styles.edit_category_page}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBackOutline} color="primary"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Edit Category</IonTitle>
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
              <IonCardTitle>Category Information</IonCardTitle>
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

export default EditCategory;
