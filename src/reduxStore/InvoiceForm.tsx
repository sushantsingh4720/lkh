import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todayDate } from "../assets/helpers/CommonUses";
import {
  Contact,
  InvoiceItem,
  SalesInvoice,
} from "../assets/helpers/Interfaces"; // Import the SelectedContact interface

const initialState: SalesInvoice = {
  checkout_details: null,
  invoiceType: "item_wise_discount_and_tax",
  type: "product",
  date: todayDate,
  dueDate: todayDate,
  invoice: null,
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

    addItemHandler: (state, action: PayloadAction<{ product: any }>) => {
      const products = [action.payload.product, ...(state?.all_products || [])];
      return {
        ...state,
        all_products: products,
      };
    },
    removeItemHandler: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const updatedProducts = state.all_products?.filter((_, i) => i !== index);
      return {
        ...state,
        all_products: updatedProducts,
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
} = InoviceForm.actions;

// Export reducer
export default InoviceForm.reducer;
