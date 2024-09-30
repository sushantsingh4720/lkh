// invoiceItemValidation.tsx

import { Item } from "../../../assets/helpers/Interfaces";

interface FormData {
  product?: Item | null;
  quantity?: string;
  price?: string;
  discountValue?: string;
  discountType?: string;
}

interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const AddInvoiceItemValidation = (
  formData: FormData
): ValidationResult => {
  const { product, quantity, price, discountValue, discountType } = formData;

  if (!product) {
    return {
      isValid: false,
      message: "Please select a product",
    };
  }

  if (!(parseInt(quantity || "0") >= 1)) {
    return {
      isValid: false,
      message: "Please enter a valid quantity",
    };
  }

  if (!(Number(price || "0") >= 0)) {
    return {
      isValid: false,
      message: "Please enter a valid price",
    };
  }

  const discount = Number(discountValue || "0");
  const priceNum = Number(price || "0");
  const quantityNum = parseInt(quantity || "0");

  if (discount < 0) {
    return {
      isValid: false,
      message: "Please enter a valid discount",
    };
  }

  if (discountType === "1" && discount > 100) {
    return {
      isValid: false,
      message: "Discount percentage cannot exceed 100%",
    };
  }

  if (discountType === "2" && discount > priceNum * quantityNum) {
    return {
      isValid: false,
      message: "Discount value cannot exceed total price",
    };
  }

  return { isValid: true };
};
