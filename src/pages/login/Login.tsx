import React, { useState } from "react";
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
  IonSpinner,
  IonToolbar,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import styles from "./Login.module.scss";
import Logo from "../../assets/images/Logo.png";
import useAxios from "../../utils/axiosInstance";
import { Redirect, useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../../reduxStore/Auth";
const Login: React.FC = () => {
  const axios = useAxios();
  const dispatch = useDispatch();
  const history = useHistory();
  const router = useIonRouter();
  const [busy, setBusy] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showToast, dismissToast] = useIonToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null); // Reset error state
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }
    try {
      // Send the login request to your API
      const result = await axios.post("/auth/login", {
        email,
        password,
      });
      const response = result.data;
      const { token, user } = response;
      dispatch(login({ token, user }));
      router.push("/", "back", "replace");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setBusy(false);
    }
  };

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

          <IonRow className="ion-padding-top">
            <IonCol size="12">
              <form className={styles.formdata} onSubmit={handleSubmit}>
                <div className={styles.field}>
                  <IonLabel className={styles.fieldLabel}>
                    Email
                    {/* <p>Please check your email</p> */}
                  </IonLabel>
                  <IonInput
                    name="email"
                    className={styles.customInput}
                    required
                    placeholder="joe@bills.com"
                    type="email"
                    value={email}
                    onIonInput={(e: any) => setEmail(e.target.value)}
                  />
                </div>
                <div className={styles.field}>
                  <IonLabel className={styles.fieldLabel}>
                    Password
                    {/* <p className="ion-no-margin">Please check your password</p> */}
                  </IonLabel>
                  <IonInput
                    name="password"
                    className={styles.customInput}
                    required
                    placeholder="*********"
                    type="password"
                    value={password}
                    onIonInput={(e: any) => setPassword(e.target.value)}
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

                {error && (
                  <div className={styles.errorMessage}>
                    <p className="ion-no-margin">{error}</p>
                  </div>
                )}

                <IonButton
                  className="custom-button"
                  expand="block"
                  type="submit"
                  disabled={busy}
                >
                  {busy ? (
                    <IonSpinner color="light" name="bubbles"></IonSpinner>
                  ) : (
                    "Login"
                  )}
                </IonButton>
              </form>
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
