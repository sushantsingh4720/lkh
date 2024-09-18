import {
  IonButton,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonImg,
  IonInput,
  IonLabel,
  IonPage,
  IonRouterLink,
  IonRow,
} from "@ionic/react";
import styles from "./Forgot.module.scss";
import { FC } from "react";
import Logo from "../../assets/images/Logo.png";

const Forgot: FC = () => {
  return (
    <IonPage className={styles.forgotpage}>
      <IonContent fullscreen>
        <IonGrid className="ion-padding">
          <IonRow className="ion-margin-top ion-padding-top">
            <IonCol size="12" className={styles.imagecolumn}>
              <IonImg src={Logo} alt="Logo" className={styles.logo}></IonImg>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className={styles.headingText}>
              <IonCardTitle>Forgot Passowrd</IonCardTitle>
              <h5>Don't worry, it happens! Let's get you back on track.</h5>
              <h6>
                Please enter your email address below. We'll send you a link to
                reset your password and regain access to your account.
              </h6>
            </IonCol>
          </IonRow>
          <IonRow className="ion-padding-top">
            <IonCol size="12">
              <div className={styles.formdata}>
                <div className={styles.field}>
                  <IonLabel className={styles.fieldLabel}>
                    Email
                    <p>Please check your email</p>
                  </IonLabel>
                  <IonInput
                    name="email"
                    className={styles.customInput}
                    required
                    placeholder="joe@bills.com"
                    type="email"
                    value=""
                  />
                </div>

                <IonButton className="custom-button" expand="block">
                  Send
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonGrid className="ion-no-margin ion-no-padding">
          <IonRow className="ion-text-center ion-justify-content-center">
            <IonCol size="12">
              <p>
                Back to
                <IonRouterLink className="custom-link" routerLink="/auth/login">
                  {" "}
                  Login&rarr;
                </IonRouterLink>
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default Forgot;
