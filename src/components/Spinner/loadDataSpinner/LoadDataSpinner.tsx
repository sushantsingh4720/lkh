import { IonPage, IonSpinner } from "@ionic/react";
import { FC } from "react";
import styles from "./LoadDataSpinner.module.scss";
const LoadDataSpinner: FC = () => {
  return (
    <div className={styles.load_data_spinner}>
      <IonSpinner color="secondary" name="bubbles"></IonSpinner>
    </div>
  );
};

export default LoadDataSpinner;
