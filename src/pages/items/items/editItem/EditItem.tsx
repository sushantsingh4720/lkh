import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import { FC, useState } from "react";
import { useHistory, useParams } from "react-router";
import LoadDataSpinner from "../../../../components/Spinner/loadDataSpinner/LoadDataSpinner";
import { Item, RouteParams } from "../../../../assets/helpers/Interfaces";
import useAxios from "../../../../utils/axiosInstance";

const EditItem: FC = () => {
  const axios = useAxios();
  const history = useHistory();
  const { id } = useParams<RouteParams>();
  const [busy, setBusy] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<Item>();
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const [itemRes] = await Promise.all([axios.get(`/product/${id}`)]);

      const {
        fy_id,
        createdAt,
        updatedAt,
        id: number,
        companyId,
        ...rest
      } = itemRes.data?.data;
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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon icon={arrowBackOutline} color="primary"></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Edit Item</IonTitle>
          {loading ? (
            ""
          ) : (
            <IonButtons slot="end">
              <IonButton color="primary">Save</IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      {loading ? <LoadDataSpinner /> : <IonContent></IonContent>}
    </IonPage>
  );
};

export default EditItem;
