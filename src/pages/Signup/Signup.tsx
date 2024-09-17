import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRouterLink,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import styles from "./Signup.module.scss";

import { arrowBack, shapesOutline } from "ionicons/icons";
import CustomField from "../../components/CustomField";
import { useSignupFields } from "../../data/field";
import { Action } from "../../components/Action";
import Wave from "../../components/Wave";
import { useEffect, useState } from "react";
import { validateForm } from "../../data/utils";
import { useParams } from "react-router";

const Signup: React.FC = () => {
  const params: Record<string, string> = useParams();
  const fields: Array<any> = useSignupFields();
  const [errors, setErrors] = useState<Array<{ id: string; message: string }>>(
    []
  );

  const createAccount = (): void => {
    const validationErrors = validateForm(fields);
    setErrors(validationErrors);
    if (!errors.length) {
      //  Submit your form here
    }
  };

  useEffect(() => {
    return () => {
      fields.forEach((field: any) => field.input.state.reset(""));
      setErrors([]);
    };
  }, [params]);

  return (
    <IonPage className={styles.signupPage}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={arrowBack} text="" className="custom-back" />
          </IonButtons>

          <IonButtons slot="end">
            <IonButton className="custom-button">
              <IonIcon icon={shapesOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol size="12" className={styles.headingText}>
              <IonCardTitle>Sign up</IonCardTitle>
              <h5>Lets get to know each other</h5>
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-top ion-padding-top">
            <IonCol size="12">
              {fields.map((field: any) => {
                return (
                  <CustomField key={field.id} field={field} errors={errors} />
                );
              })}

              <IonButton
                className="custom-button"
                expand="block"
                onClick={createAccount}
              >
                Create account
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonFooter>
        <IonGrid className="ion-no-margin ion-no-padding">
          <Action
            message="Already got an account?"
            text="Login"
            link="/auth/login"
          />
          <Wave />
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default Signup;
