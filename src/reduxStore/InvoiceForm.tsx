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
  TaxName,
} from "../assets/helpers/Interfaces"; // Import the SelectedContact interface
import { checkbox } from "ionicons/icons";

const calculateTotals = (
  products: InvoiceItem[],
  isClientCompanyStateSame: boolean,
  shipping_charges: string,
  shipping_charges_check: boolean,
  round_off: boolean,
  invoiceType: string,
  discountType: string,
  discountValue: string,
  taxName: TaxName | null
) => {
  let amount;
  let discount = "";
  let total_tax;
  let GST;
  let total;
  let SGST;
  let CGST;
  let IGST;
  let balance;
  let round_off_value;
  amount = parseFloatWithFixedValue(
    products.reduce(
      (amount, product) => amount + Number(product.preSubTotal),
      0
    )
  );
  total = amount;

  if (invoiceType === "item_wise_discount_and_tax") {
    discount = parseFloatWithFixedValue(
      products.reduce(
        (discount, product) => discount + Number(product.discount || 0),
        0
      )
    );
  } else {
    if (Number(discountValue) > 0) {
      if (Number(discountType) === 1) {
        discount = parseFloatWithFixedValue(
          (Number(amount) * Number(discountValue)) / 100
        );
      } else if (Number(discountType) === 2) {
        discount = parseFloatWithFixedValue(discountValue);
      }
    }
  }

  if (Number(discount) > 0) {
    total = parseFloatWithFixedValue(Number(amount) - Number(discount));
  }

  if (invoiceType === "item_wise_discount_and_tax") {
    total_tax = parseFloatWithFixedValue(
      products.reduce((tax, product) => tax + Number(product.itemTax || 0), 0)
    );
  } else {
    total_tax = parseFloatWithFixedValue(
      (Number(
        products.reduce((tax, product) => tax + Number(product.itemTax || 0), 0)
      ) *
        Number(taxName?.rate)) /
        100
    );
  }

  if (Number(total_tax) > 0) {
    GST = total_tax;

    if (isClientCompanyStateSame) {
      SGST = CGST = parseFloatWithFixedValue(Number(GST) / 2);
    } else {
      IGST = GST;
    }
    total = parseFloatWithFixedValue(Number(total) + Number(GST));
  }

  if (shipping_charges_check && Number(shipping_charges) > 0) {
    total = parseFloatWithFixedValue(Number(total) + Number(shipping_charges));
  }

  if (round_off) {
    const roundedTotal = Math.round(Number(total));
    round_off_value = parseFloatWithFixedValue(
      Math.abs(roundedTotal - Number(total))
    );
    total = parseFloatWithFixedValue(roundedTotal);
  }

  balance = total;

  return {
    amount,
    discount,
    total_tax,
    GST,
    SGST,
    CGST,
    IGST,
    total,
    balance,
    round_off,
    round_off_value,
  };
};

const initialState: SalesInvoice = {
  checkout_details: null,
  invoiceType: "item_wise_discount_and_tax",
  type: "product",
  date: todayDate,
  dueDate: todayDate,
  invoice: null,
  discountType: "1",
  discountValue: "",
  other_info: {
    client_type: {
      label: "Customer",
      value: "Customer",
    },
  },
  round_off: false,
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
      const totals = calculateTotals(
        products,
        isClientCompanyStateSame,
        state?.other_charges?.shipping_charges,
        state?.all_checks?.shipping_charges,
        state?.round_off,
        state?.invoiceType,
        state?.discountType,
        state?.discountValue,
        state?.taxName || null
      );

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
      const totals = calculateTotals(
        products,
        isClientCompanyStateSame,
        state?.other_charges?.shipping_charges,
        state?.all_checks?.shipping_charges,
        state?.round_off,
        state?.invoiceType,
        state?.discountType,
        state?.discountValue,
        state?.taxName || null
      );
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
    handleShippingChargesCheckedBox: (
      state,
      action: PayloadAction<{
        checked: boolean;
        isClientCompanyStateSame: boolean;
      }>
    ) => {
      const { checked, isClientCompanyStateSame } = action.payload;
      let other_charges;
      let totals = {};
      const all_checks = {
        shipping_charges: checked,
      };
      if (!checked && Number(state?.other_charges?.shipping_charges) > 0) {
        other_charges = {
          shipping_charges: "",
        };
        totals = calculateTotals(
          state.all_products || [],
          isClientCompanyStateSame,
          "",
          state?.all_checks?.shipping_charges,
          state?.round_off,
          state?.invoiceType,
          state?.discountType,
          state?.discountValue,
          state?.taxName || null
        );
      }
      return {
        ...state,
        all_checks,
        other_charges,
        ...totals,
      };
    },
    handleShippingChargesInputChange: (
      state,
      action: PayloadAction<{
        value: string;
        isClientCompanyStateSame: boolean;
      }>
    ) => {
      const { value, isClientCompanyStateSame } = action.payload;
      const other_charges = {
        shipping_charges: value,
      };
      const totals = calculateTotals(
        state.all_products || [],
        isClientCompanyStateSame,
        value,
        state?.all_checks?.shipping_charges,
        state?.round_off,
        state?.invoiceType,
        state?.discountType,
        state?.discountValue,
        state?.taxName || null
      );

      return {
        ...state,
        other_charges,
        ...totals,
      };
    },
    handleRoundOffChecked: (
      state,
      action: PayloadAction<{
        checked: boolean;
        isClientCompanyStateSame: boolean;
      }>
    ) => {
      const { checked, isClientCompanyStateSame } = action.payload;

      const totals = calculateTotals(
        state.all_products || [],
        isClientCompanyStateSame,
        state?.other_charges?.shipping_charges,
        state?.all_checks?.shipping_charges,
        checked,
        state?.invoiceType,
        state?.discountType,
        state?.discountValue,
        state?.taxName || null
      );
      return {
        ...state,
        ...totals,
      };
    },
    handleDiscountTypeChange: (
      state,
      action: PayloadAction<{
        value: string;
        isClientCompanyStateSame: boolean;
      }>
    ) => {
      const { value, isClientCompanyStateSame } = action.payload;
      const totals = calculateTotals(
        state.all_products || [],
        isClientCompanyStateSame,
        state?.other_charges?.shipping_charges,
        state?.all_checks?.shipping_charges,
        state?.round_off,
        state?.invoiceType,
        state?.discountType,
        "",
        state?.taxName || null
      );
      return {
        ...state,
        ...totals,
        discountType: value,
        discountValue: "",
      };
    },
    handleDiscountInputChange: (
      state,
      action: PayloadAction<{
        value: string;
        isClientCompanyStateSame: boolean;
      }>
    ) => {
      const { value, isClientCompanyStateSame } = action.payload;
      const totals = calculateTotals(
        state.all_products || [],
        isClientCompanyStateSame,
        state?.other_charges?.shipping_charges,
        state?.all_checks?.shipping_charges,
        state?.round_off,
        state?.invoiceType,
        state?.discountType,
        value,
        state?.taxName || null
      );
      return {
        ...state,
        ...totals,
        discountValue: value,
      };
    },
    handleTaxSelect: (
      state,
      action: PayloadAction<{
        taxName: TaxName;
        isClientCompanyStateSame: boolean;
      }>
    ) => {
      const { taxName, isClientCompanyStateSame } = action.payload;
      const totals = calculateTotals(
        state.all_products || [],
        isClientCompanyStateSame,
        state?.other_charges?.shipping_charges,
        state?.all_checks?.shipping_charges,
        state?.round_off,
        state?.invoiceType,
        state?.discountType,
        state?.discountValue,
        taxName || null
      );
      return {
        ...state,
        taxName,
        ...totals,
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
  handleShippingChargesCheckedBox,
  handleShippingChargesInputChange,
  handleRoundOffChecked,
  handleDiscountTypeChange,
  handleDiscountInputChange,
  handleTaxSelect,
} = InoviceForm.actions;

// Export reducer
export default InoviceForm.reducer;
