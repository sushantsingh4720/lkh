import { useState } from "react";

export const useFormInput = (initialValue: string = "") => {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempValue: string = await e.currentTarget.value;
    setValue(tempValue);
  };

  return {
    value,
    reset: (newValue: string) => setValue(newValue),
    onIonChange: handleChange,
    onKeyUp: handleChange,
  };
};

export const validateForm = (
  fields: {
    required: boolean;
    input: { state: { value: string } };
    id: string;
  }[]
): { id: string; message: string }[] => {
  let errors: { id: string; message: string }[] = [];

  fields.forEach((field) => {
    if (field.required) {
      const fieldValue: string = field.input.state.value;

      if (fieldValue === "") {
        const error = {
          id: field.id,
          message: `Please check your ${field.id}`,
        };

        errors.push(error);
      }
    }
  });

  return errors;
};
