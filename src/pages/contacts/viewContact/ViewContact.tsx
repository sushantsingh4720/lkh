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
import {
  arrowBackOutline,
  createOutline,
  trashBinOutline,
  trashOutline,
} from "ionicons/icons";
import { FC, useState } from "react";
import { useHistory, useParams } from "react-router";
import useAxios from "../../../utils/axiosInstance";
import { Contact, RouteParams } from "../../../assets/helpers/Interfaces";
import LoadDataSpinner from "../../../components/Spinner/loadDataSpinner/LoadDataSpinner";

const ViewContact: FC = () => {
  const history = useHistory();
  const axios = useAxios();
  const { id } = useParams<RouteParams>();
  const [busy, setBusy] = useState<boolean>(true);
  const [contact, setContact] = useState<Contact | null>(null);
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
      const [contactRes] = await Promise.all([axios.get(`contact/${id}`)]);
      setContact(contactRes.data?.data || null);
    } catch (error) {
    } finally {
      setBusy(false);
    }
  };

  useIonViewWillEnter(() => {
    fetchData();
  });

  useIonViewDidLeave(() => {
    setContact(null);
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
              <IonTitle>{contact?.name}</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => history.push(`/contacts/edit/${id}`)}>
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
        header="Are you sure you want to delete this contact?"
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
export default ViewContact;
