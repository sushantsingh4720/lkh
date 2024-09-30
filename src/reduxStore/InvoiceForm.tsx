import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// const { companyData } = useSelector((state: RootState) => state.Company);
import {
  parseFloatWithFixedValue,
  todayDate,
} from "../assets/helpers/CommonUses";
import {
  Contact,
  InvoiceItem,
  SalesInvoice,
} from "../assets/helpers/Interfaces"; // Import the SelectedContact interface

const calculateTotals = (
  products: InvoiceItem[],
  isClientCompanyStateSame: boolean
) => {
  let amount;
  let discount;
  let total_tax;
  let GST;
  let total;
  let SGST;
  let CGST;
  let IGST;
  let balance;

  amount = parseFloatWithFixedValue(
    products.reduce(
      (amount, product) => amount + Number(product.preSubTotal),
      0
    )
  );
  total = amount;
  discount = parseFloatWithFixedValue(
    products.reduce(
      (discount, product) => discount + Number(product.discount || 0),
      0
    )
  );
  if (Number(discount) > 0) {
    total = parseFloatWithFixedValue(Number(amount) - Number(discount));
  }

  total_tax = parseFloatWithFixedValue(
    products.reduce((tax, product) => tax + Number(product.itemTax || 0), 0)
  );

  if (Number(total_tax) > 0) {
    GST = total_tax;

    if (isClientCompanyStateSame) {
      SGST = CGST = parseFloatWithFixedValue(Number(GST) / 2);
    } else {
      IGST = GST;
    }
    total = parseFloatWithFixedValue(Number(total) + Number(GST));
  }
  balance = total;
  return { amount, discount, total_tax, GST, SGST, CGST, IGST, total, balance };
};

const initialState: SalesInvoice = {
  checkout_details: null,
  invoiceType: "item_wise_discount_and_tax",
  type: "product",
  date: todayDate,
  dueDate: todayDate,
  invoice: null,
  discountType: "1",
  other_info: {
    client_type: {
      label: "Customer",
      value: "Customer",
    },
  },
};

const InoviceForm = createSlice({
  name: "state",
  initialState,
  reducers: {
    clientSelectChange: (
      state,
      action: PayloadAction<{ selectedContact: Contact }> // Use the specific interface here
    ) => {
      const { selectedContact } = action.payload;
      const address = selectedContact.isBillAndShipAddressSame
        ? `${selectedContact.billing_address ?? ""} ${
            selectedContact.billing_city ?? ""
          } ${selectedContact.billing_state ?? ""} ${
            selectedContact.billing_PIN_Code ?? ""
          } ${selectedContact.billing_country ?? ""}`.trim()
        : `${selectedContact.shipping_address ?? ""} ${
            selectedContact.shipping_city ?? ""
          } ${selectedContact.shipping_state ?? ""} ${
            selectedContact.shipping_pin_code ?? ""
          } ${selectedContact.shipping_country ?? ""}`.trim();

      // Updating state immutably
      return {
        ...state,
        name: selectedContact.name,
        checkout_details: selectedContact,
        shipping_address: address,
      };
    },

    invoiceNumberChange: (
      state,
      action: PayloadAction<{ invoice: number }>
    ) => {
      // Updating state immutably
      return {
        ...state,
        invoice: action.payload.invoice,
      };
    },

    itemTypeChange: (state, action: PayloadAction<{ type: string }>) => {
      // Updating state immutably
      return {
        ...state,
        type: action.payload.type,
      };
    },

    invoiceTypeChange: (
      state,
      action: PayloadAction<{ invoiceType: string }>
    ) => {
      // Updating state immutably
      return {
        ...state,
        invoiceType: action.payload.invoiceType,
      };
    },

    inputChange: (
      state,
      action: PayloadAction<{ name: string; value: any }>
    ) => {
      const { name, value } = action.payload;
      // Updating state immutably
      return {
        ...state,
        [name]: value,
      };
    },

    dateInputChange: (
      state,
      action: PayloadAction<{ name: string; value: any }>
    ) => {
      const { name, value } = action.payload;

      // Updating state immutably
      const newState = {
        ...state,
        [name]: value,
      };

      // Adjust due date if necessary
      if (
        name === "date" &&
        new Date(newState.dueDate || "") < new Date(value)
      ) {
        return {
          ...newState,
          dueDate: value,
        };
      }

      return newState;
    },

    addItemHandler: (
      state,
      action: PayloadAction<{ product: any; isClientCompanyStateSame: boolean }>
    ) => {
      const { isClientCompanyStateSame, product } = action.payload;

      const products = [product, ...(state?.all_products || [])];
      const totals = calculateTotals(products, isClientCompanyStateSame);

      return {
        ...state,
        all_products: products,
        ...totals,
      };
    },

    removeItemHandler: (
      state,
      action: PayloadAction<{
        index: number;
        isClientCompanyStateSame: boolean;
      }>
    ) => {
      const { isClientCompanyStateSame, index } = action.payload;
      const products = state.all_products?.filter((_, i) => i !== index) || [];
      const totals = calculateTotals(products, isClientCompanyStateSame);
      return {
        ...state,
        all_products: products,
        ...totals,
      };
    },

    otherInfoHandler: (
      state,
      action: PayloadAction<{
        name: string;
        value: string;
      }>
    ) => {
      const { name, value } = action.payload;
      const updateOtherInfo = { ...state.other_info, [name]: value };
      return {
        ...state,
        other_info: updateOtherInfo,
      };
    },

    bankHandler: (
      state,
      action: PayloadAction<{
        bank: any;
      }>
    ) => {
      const { bank } = action.payload;
      const updateOtherInfo = { ...state.other_info, bank };
      return {
        ...state,
        other_info: updateOtherInfo,
      };
    },
  },
});

// Export actions
export const {
  clientSelectChange,
  invoiceNumberChange,
  itemTypeChange,
  invoiceTypeChange,
  inputChange,
  dateInputChange,
  addItemHandler,
  removeItemHandler,
  otherInfoHandler,
  bankHandler,
} = InoviceForm.actions;

// Export reducer
export default InoviceForm.reducer;
