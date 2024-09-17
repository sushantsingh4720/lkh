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
import styles from "./Login.module.scss";

import { arrowBack, shapesOutline } from "ionicons/icons";
import CustomField from "../../components/CustomField";
import { useLoginFields } from "../../data/field";
import { Action } from "../../components/Action";
import Wave from "../../components/Wave";
import { useEffect, useState } from "react";
import { validateForm } from "../../data/utils";
import { useParams } from "react-router";

const Login: React.FC = () => {
  const params: Record<string, string> = useParams();

  const fields: ReturnType<typeof useLoginFields> = useLoginFields();
  const [errors, setErrors] = useState<Array<{ id: string; message: string }>>(
    []
  );

  const login = (): void => {
    const validationErrors = validateForm(fields);
    setErrors(validationErrors);
    if (!errors.length) {
      //  Submit your form here
    }
  };

  useEffect(() => {
    return () => {
      fields.forEach(
        (field: { input: { state: { reset: (value: string) => void } } }) =>
          field.input.state.reset("")
      );
      setErrors([]);
    };
  }, [params]);

  return (
    <IonPage className={styles.loginPage}>
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
              <IonCardTitle>Log in</IonCardTitle>
              <h5>Welcome back, hope you're doing well</h5>
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
                onClick={login}
              >
                Login
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonFooter>
        <IonGrid className="ion-no-margin ion-no-padding">
          <Action
            message="Don't have an account?"
            text="Sign up"
            link="/auth/signup"
          />
          <Wave />
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default Login;
