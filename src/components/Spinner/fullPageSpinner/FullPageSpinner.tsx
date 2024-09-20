import { IonPage, IonSpinner } from "@ionic/react";
import { FC } from "react";
import styles from "./FullPageSpinner.module.scss"
const FullPageSpinner: FC = () => {
  return (
    <IonPage className={styles.fullpagespinner}>
      <IonSpinner color="secondary" name="bubbles"></IonSpinner>
    </IonPage>
  );
};

export default FullPageSpinner