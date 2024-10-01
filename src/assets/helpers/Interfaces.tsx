export interface ValidationResult {
  success: boolean;
  message: string;
}

export interface Contact {
  id: number;
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
  label?: string | null;
  value?: string | null;
}

export interface Category {
  id: number;
  name: string;
  active: boolean;
  description: string;
}

export interface Brand {
  id: number;
  name: string;
  active: boolean;
  description: string;
}

export interface Tax {
  id: number;
  name: string;
  rate: number;
  active: boolean;
  description: string;
  label?: string | null;
  value?: string | null;
}

export interface Bank {
  id: number;
  name: string;
  ifsc: string;
  branch: string;
  account_no: string;
  description: string | null;
}

export interface CombineCode {
  id: number;
  code_no: string;
  code: string;
  gst_rate: string;
  active: boolean;
  name_of_commodity: string;
}

export interface Item {
  id: number;
  brandName: string;
  UOM: string;
  categoryName: string;
  description: string;
  hsn_code: string;
  mrp_price: string;
  name: string;
  opening_qty_per: string;
  p_price: string;
  s_price: string;
  sac_code: string;
  taxName: string;
  type: string;
  varient: string;
}

interface UOM {
  label: string;
  value: string;
}

export interface TaxName {
  id: number;
  name: string;
  fy_id?: number;
  companyId?: number;
  rate: number;
  active: boolean;
  description: string | null;
  createdAt?: string; // or Date if you prefer Date objects
  updatedAt?: string; // or Date if you prefer Date objects
  value?: string;
  label?: string;
}

export interface InvoiceItem {
  UOM: UOM | null;
  code: string;
  product: Item | null;
  quantity: string;
  discount: string; // Consider using number if discount is always numeric
  discountType: string;
  discountValue: string;
  taxName: Tax | null;
  subTotal: string; // Consider using number if subtotal is always numeric
  preSubTotal: string; // Consider using number if preSubtotal is always numeric
  price: string;
  amount: string; // Consider using number if amount is always numeric
  itemTax: string;
  type: string;
}

export interface SalesInvoice {
  checkout_details: Contact | null; // Should be a JSON string, ensure validation.
  name?: string;
  invoice: number | null;
  is_cancelled?: number; // Defaults to 0 (tinyint).
  type?: string;
  invoiceType: string;
  hsn_sac?: number;
  amount?: string;
  discount?: string; // Defaults to 0.00.
  discountType: string;
  discountValue: string;
  GST?: string;
  IGST?: string;
  CGST?: string;
  SGST?: string;
  total_tax?: string;
  total?: string;
  round_off: boolean; // Defaults to 0 (tinyint).
  round_off_value?: string; // Defaults to 0.00.
  payment_status?: string; // Defaults to 'Unpaid'.
  paid_amount?: string; // Defaults to 0.00.
  dueDate: string; // Date in format 'YYYY-MM-DD'.
  shipping_address?: string;
  date: string; // Date in format 'YYYY-MM-DD'.
  paid_date?: string; // Date in format 'YYYY-MM-DD'.
  balance?: string;
  taxName?: TaxName | null; // JSON string, ensure validation.
  all_products?: InvoiceItem[]; // JSON string, ensure validation.
  other_charges?: any; // JSON string, ensure validation.
  other_info?: any; // JSON string, ensure validation.
  all_checks?: any; // JSON string, ensure validation.
}
