export interface Contact {
  DL: string;
  GSTIN: string;
  PAN: string;
  TIN: string;
  VAT: string;
  billing_address: string;
  billing_PIN_Code: string;
  billing_city: string;
  billing_country: string;
  billing_state: string;
  name: string;
  display_name: string;
  email: string;
  phone: string;
  contactType: string;
  isBillAndShipAddressSame: boolean;
  shipping_address: string;
  shipping_city: string;
  shipping_name: string;
  shipping_display_name: string;
  shipping_country: string;
  shipping_email: string;
  shipping_pin_code: string;
  shipping_phone: string;
  shipping_state: string;
}

export interface Category {
  name: string;
  active: boolean;
  description: string;
}

export interface Brand {
  name: string;
  active: boolean;
  description: string;
}

export interface Tax {
  name: string;
  rate: number;
  active: boolean;
  description: string;
}

export interface CombineCode {
  code_no: string;
  code: string;
  gst_rate: string;
  active: boolean;
  name_of_commodity: string;
}
