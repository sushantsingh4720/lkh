import { ValidationResult } from "../../../assets/helpers/Interfaces";

interface ProductData {
  name?: string;
  s_price?: string;
  p_price?: string;
  opening_qty_per?: string;
}

export const productValidation = (
  productData: ProductData
): ValidationResult => {
  const { name, s_price, p_price, opening_qty_per } = productData;

  if (!name) {
    return { success: false, message: "Please enter name" };
  }

  if (!s_price || +s_price < 1) {
    return { success: false, message: "Please enter valid sell price" };
  }

  if (p_price && +p_price && +p_price > +s_price) {
    return {
      success: false,
      message: "Purchase price must be less than or equal to sell price",
    };
  }

  if (opening_qty_per && +opening_qty_per && +opening_qty_per < 1) {
    return { success: false, message: "Please entert least 1 unit" };
  }

  return { success: true, message: "" };
};
