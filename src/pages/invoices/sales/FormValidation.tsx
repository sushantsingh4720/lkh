import {
  SalesInvoice,
  ValidationResult,
} from "../../../assets/helpers/Interfaces";

export const ValidateSales = (state: SalesInvoice): ValidationResult => {
  if (!state?.name) {
    return { success: false, message: "Please select customer" };
  }
  if (!state?.invoice) {
    return { success: false, message: "Please select customer" };
  }
  if (!state?.date) {
    return { success: false, message: "Please select date" };
  }
  if (!state?.dueDate) {
    return { success: false, message: "Please select due date" };
  }
  if (!state?.all_products?.length) {
    return { success: false, message: "Please select aleast one item" };
  }

  return { success: true, message: "" };
};
