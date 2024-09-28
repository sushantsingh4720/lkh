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
}

export interface CombineCode {
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

interface Product {
  id: number;
  fy_id: number;
  companyId: number;
  name: string;
  varient: string;
  type: string;
  hsn_code: string;
  sac_code: string;
  mrp_price: number;
  s_price: number;
  p_price: number;
  UOM: string;
  brandName: string;
  taxName: string;
  categoryName: string;
  opening_qty_per: number;
  description: string;
  createdAt: string; // or Date if you prefer Date objects
  updatedAt: string; // or Date if you prefer Date objects
  label: string;
  value: string;
}

interface TaxName {
  id: number;
  name: string;
  fy_id: number;
  companyId: number;
  rate: number;
  active: boolean;
  description: string | null;
  createdAt: string; // or Date if you prefer Date objects
  updatedAt: string; // or Date if you prefer Date objects
  value: string;
  label: string;
}

export interface InvoiceItem {
  UOM: UOM;
  code: string;
  product: Product;
  quantity: number;
  discount: string; // Consider using number if discount is always numeric
  discountType: string;
  discountValue: number;
  taxName: TaxName;
  subTotal: string; // Consider using number if subtotal is always numeric
  preSubTotal: string; // Consider using number if preSubtotal is always numeric
  price: number;
  amount: string; // Consider using number if amount is always numeric
  itemTax: number;
  type: string;
}

export interface SalesInvoice {
  checkout_details: Contact | null; // Should be a JSON string, ensure validation.
  name?: string;
  invoice: number | null;
  is_cancelled?: number; // Defaults to 0 (tinyint).
  type?: string;
  invoiceType?: string;
  hsn_sac?: number;
  amount?: number;
  discount?: number; // Defaults to 0.00.
  discountType?: string;
  discountValue?: number;
  GST?: number;
  IGST?: number;
  CGST?: number;
  SGST?: number;
  total_tax?: number;
  total?: number;
  round_off?: number; // Defaults to 0 (tinyint).
  round_off_value?: number; // Defaults to 0.00.
  payment_status?: string; // Defaults to 'Unpaid'.
  paid_amount?: number; // Defaults to 0.00.
  dueDate: string; // Date in format 'YYYY-MM-DD'.
  shipping_address?: string;
  date: string; // Date in format 'YYYY-MM-DD'.
  paid_date?: string; // Date in format 'YYYY-MM-DD'.
  balance?: number;
  taxName?: string; // JSON string, ensure validation.
  all_products?: InvoiceItem[]; // JSON string, ensure validation.
  other_charges?: string; // JSON string, ensure validation.
  other_info?: string; // JSON string, ensure validation.
  all_checks?: string; // JSON string, ensure validation.
}
