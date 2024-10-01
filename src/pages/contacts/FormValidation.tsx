interface ValidationResult {
  success: boolean;
  message: string;
}

interface CustomerData {
  name: string;
  display_name: string;
  phone: string;
  billing_country: string;
  billing_state?: string;
  shipping_name?: string;
  shipping_display_name?: string;
  shipping_country?: string;
  shipping_state?: string;
  isBillAndShipAddressSame?: boolean;
}

export const validateContact = (
  customerData: CustomerData,
  contactType: string
): ValidationResult => {
  const {
    name,
    display_name,
    phone,
    billing_country,
    billing_state,
    shipping_name,
    shipping_display_name,
    shipping_country,
    shipping_state,
  } = customerData;

  const isBillingCountryIndia: boolean = billing_country === "India";
  const isShippingCountryIndia: boolean = shipping_country === "India";

  if (!name) {
    return { success: false, message: "Please enter valid name" };
  }
  if (!display_name) {
    return { success: false, message: "Please enter valid display name" };
  }
  if (!phone || !phone.trim().length || !(phone.trim().length === 10)) {
    return { success: false, message: "Please enter valid phone number" };
  }
  if (!billing_country || !billing_country.trim().length) {
    return { success: false, message: "Please select a billing country" };
  }
  if (
    isBillingCountryIndia &&
    (!billing_state || !billing_state.trim().length)
  ) {
    return { success: false, message: "Please select a billing state" };
  }

  if (contactType === "customer" && !customerData.isBillAndShipAddressSame) {
    if (!shipping_name) {
      return { success: false, message: "Please enter valid shipping name" };
    }
    if (!shipping_display_name) {
      return {
        success: false,
        message: "Please enter valid shipping display name",
      };
    }
    if (!shipping_country || !shipping_country.trim().length) {
      return { success: false, message: "Please select a shipping country" };
    }
    if (
      isShippingCountryIndia &&
      (!shipping_state || !shipping_state.trim().length)
    ) {
      return { success: false, message: "Please select a shipping state" };
    }
  }

  return { success: true, message: "" };
};
