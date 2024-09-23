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
  useIonRouter,
} from "@ionic/react";
import styles from "./Forgot.module.scss";
import { FC, useEffect, useState } from "react";
import Logo from "../../assets/images/Logo.png";
import useAxios from "../../utils/axiosInstance";
import { useHistory } from "react-router";

const Forgot: FC = () => {
  const router = useIonRouter();
  const axios = useAxios();
  const history=useHistory()
  const [busy, setBusy] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null); // Reset error state
    setMessage(null); // Reset message state
    if (!email) {
      setError("Please fill in your email.");
      return;
    }
    try {
      // Send the request to your API
      const result = await axios.post("/auth/forgotpassword", { email });
      const response = result.data;
      setMessage(response.message);
      // Optionally handle successful response (e.g., show a success message)
      setTimeout((): void => {
        history.replace("/auth/login")
      }, 1000);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <IonPage className={styles.forgotpage}>
      <IonContent fullscreen>
        <IonGrid className="ion-padding">
          <IonRow className="ion-margin-top ion-padding-top">
            <IonCol size="12" className={styles.imagecolumn}>
              <IonImg src={Logo} alt="Logo" className={styles.logo} />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className={styles.headingText}>
              <IonCardTitle>Forgot Password</IonCardTitle>
              <h5>Don't worry, it happens! Let's get you back on track.</h5>
              <h6>
                Please enter your email address below. We'll send you a link to
                reset your password and regain access to your account.
              </h6>
            </IonCol>
          </IonRow>
          <IonRow className="ion-padding-top">
            <IonCol size="12">
              <form className={styles.formdata} onSubmit={handleSubmit}>
                <div className={styles.field}>
                  <IonLabel className={styles.fieldLabel}>Email</IonLabel>
                  <IonInput
                    id="email"
                    name="email"
                    className={styles.customInput}
                    required
                    placeholder="joe@bills.com"
                    type="email"
                    value={email}
                    onIonInput={(e: any) => setEmail(e.target.value)}
                  />
                </div>

                {error && (
                  <div className={styles.errorMessage}>
                    <p className="ion-no-margin">{error}</p>
                  </div>
                )}
                {message && (
                  <div className={styles.message}>
                    <p className="ion-no-margin">{message}</p>
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
                    "Send"
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
