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
  IonImg,
  IonInput,
  IonLabel,
  IonPage,
  IonRouterLink,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import styles from "./Signup.module.scss";
import Logo from "../../assets/images/Logo.png";

const Signup: React.FC = () => {
  return (
    <IonPage className={styles.signupPage}>
      <IonContent fullscreen>
        <IonGrid className="ion-padding">
          <IonRow className="ion-margin-top ion-padding-top">
            <IonCol size="12" className={styles.imagecolumn}>
              <IonImg src={Logo} alt="Logo" className={styles.logo}></IonImg>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className={styles.headingText}>
              <IonCardTitle>Sign Up</IonCardTitle>
              <h5>Lets get to know each other</h5>
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-top ion-padding-top">
            <IonCol size="12">
              <div className={styles.formdata}>
                <div className={styles.field}>
                  <IonLabel className={styles.fieldLabel}>
                    Name
                    <p>Please check your name</p>
                  </IonLabel>
                  <IonInput
                    name="name"
                    className={styles.customInput}
                    required
                    placeholder="joe"
                    type="text"
                    value=""
                  />
                </div>
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
                <div className={styles.field}>
                  <IonLabel className={styles.fieldLabel}>
                    Password
                    <p className="ion-no-margin">Please check your password</p>
                  </IonLabel>
                  <IonInput
                    name="password"
                    className={styles.customInput}
                    required
                    placeholder="*********"
                    type="password"
                    value=""
                  />
                </div>

                <IonButton className="custom-button" expand="block">
                  Create Account
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
                Already got an account?
                <IonRouterLink className="custom-link" routerLink="/auth/login">
                  {" "}
                  Login &rarr;
                </IonRouterLink>
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default Signup;
