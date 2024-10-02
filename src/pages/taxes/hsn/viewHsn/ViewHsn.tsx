import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidLeave,
  useIonViewWillEnter,
} from "@ionic/react";
import { arrowBackOutline, createOutline, trashOutline } from "ionicons/icons";
import { FC, useState } from "react";
import { useHistory, useParams } from "react-router";
import LoadDataSpinner from "../../../../components/Spinner/loadDataSpinner/LoadDataSpinner";
import useAxios from "../../../../utils/axiosInstance";
import { HSN, RouteParams } from "../../../../assets/helpers/Interfaces";

const ViewHsn: FC = () => {
  const history = useHistory();
  const axios = useAxios();
  const { id } = useParams<RouteParams>();
  const [busy, setBusy] = useState<boolean>(true);
  const [hsn, setHsn] = useState<HSN | null>(null);
  const [deleteAlert, setDeleteAlert] = useState<boolean>(false);

  const deleteHandler = () => {
    setBusy(true);
    setTimeout(() => {
      // setBusy(false);
      // setDeleteAlert(false);
      history.goBack();
    }, 2000);
  };

  const fetchData = async () => {
    setBusy(true);
    try {
      const [hsnRes] = await Promise.all([axios.get(`/gsthsn/${id}`)]);
      setHsn(hsnRes.data?.data);
    } catch (error) {
    } finally {
      setBusy(false);
    }
  };

  useIonViewWillEnter(() => {
    fetchData();
  });

  useIonViewDidLeave(() => {
    setHsn(null);
  });
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBackOutline} color="primary"></IonIcon>
            </IonButton>
          </IonButtons>
          {!busy ? (
            <>
              <IonTitle>{hsn?.hsn_code}</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => history.push(`/hsn/edit/${id}`)}>
                  <IonIcon icon={createOutline} color="primary"></IonIcon>
                </IonButton>
                <IonButton onClick={() => setDeleteAlert(true)}>
                  <IonIcon icon={trashOutline} color="danger"></IonIcon>
                </IonButton>
              </IonButtons>
            </>
          ) : (
            ""
          )}
        </IonToolbar>
      </IonHeader>
      {busy ? <LoadDataSpinner /> : <IonContent>View page</IonContent>}
      <IonAlert
        header="Are you sure you want to delete this hsn code?"
        isOpen={deleteAlert}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              setDeleteAlert(false);
            },
          },
          {
            text: "Delete",
            role: "confirm",
            handler: () => {
              deleteHandler();
            },
          },
        ]}
        onDidDismiss={({ detail }) => {}}
      ></IonAlert>
    </IonPage>
  );
};

export default ViewHsn;
