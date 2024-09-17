import { IonInput, IonLabel } from "@ionic/react";
import styles from "./CustomField.module.scss";
import React, { FC } from "react";

interface Error {
  id: string;
  message: string;
}

interface Field {
  id: string;
  label: string;
  required: boolean;
  input: {
    props: {
      placeholder: string;
      type: any;
    };
    state: {
      value: string;
      onIonChange: (e: any) => void;
      onKeyUp?: (e: React.KeyboardEvent<HTMLIonInputElement>) => void;
      reset: (value: string) => void;
    };
  };
}

interface CustomFieldProps {
  field: Field;
  errors: Error[] | null;
}

const CustomField: FC<CustomFieldProps> = ({ field, errors }) => {
  const error = errors?.find((e) => e.id === field.id);
  const errorMessage = error ? error.message : undefined;

  return (
    <div className={styles.field}>
      <IonLabel className={styles.fieldLabel} >
        {field.label}
        {error && <p>{errorMessage}</p>}
      </IonLabel>
      <IonInput
        // name={field.id}
        className={styles.customInput}
        required={field.required}
        placeholder={field.input.props.placeholder}
        type={field.input.props.type}
        onIonChange={field.input.state.onIonChange}
        onKeyUp={field.input.state.onKeyUp}
        value={field.input.state.value}
      />
    </div>
  );
};

export default CustomField;
