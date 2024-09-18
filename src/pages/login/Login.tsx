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
  IonToolbar,
} from "@ionic/react";
import styles from "./Login.module.scss";
import Logo from "../../assets/images/Logo.png";

const Login: React.FC = () => {
  return (
    <IonPage className={styles.loginPage}>
      <IonContent fullscreen>
        <IonGrid className="ion-padding">
          <IonRow className="ion-margin-top ion-padding-top">
            <IonCol size="12" className={styles.imagecolumn}>
              <IonImg src={Logo} alt="Logo" className={styles.logo}></IonImg>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className={styles.headingText}>
              <IonCardTitle>Log in</IonCardTitle>
              <h5>Welcome back, hope you're doing well</h5>
            </IonCol>
          </IonRow>

          <IonRow className="ion-margin-top ion-padding-top">
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
                  <IonRow className="ion-text-end ion-justify-content-center ion-margin-top">
                    <IonCol size="12">
                      <IonRouterLink
                        className="custom-link"
                        routerLink="/auth/forgot"
                      >
                        {" "}
                        Forgot Password?
                      </IonRouterLink>
                    </IonCol>
                  </IonRow>
                </div>

                <IonButton className="custom-button" expand="block">
                  Login
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
                Don't have an account?
                <IonRouterLink
                  className="custom-link"
                  routerLink="/auth/signup"
                >
                  {" "}
                  Sign up&rarr;
                </IonRouterLink>
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default Login;
