import { todayDate } from "../../assets/helpers/CommonUses";
import { SalesInvoice } from "../../assets/helpers/Interfaces";
import {
  HANDLE_CLIENT_SELECT_CHANGE,
  HANDLE_DATE_INPUT_CHANGE,
  HANDLE_INPUT_CHANGE,
  HANDLE_INVOICE_NUMBER_CHANGE,
  HANDLE_INVOICE_TYPE_CHANGE,
  HANDLE_ITEM_TYPE_CHANGE,
} from "./Constant";

export const INITIAL_STATE: SalesInvoice = {
  checkout_details: null,
  invoiceType: "item_wise_discount_and_tax",
  type: "product",
  date: todayDate,
  dueDate: todayDate,
  invoice: null,
};

interface ReducerAction {
  type: string;
  payload?: unknown; // Adjust the type as necessary based on the action payload
}

export const reducer = (
  state: SalesInvoice,
  action: ReducerAction
): SalesInvoice => {
  switch (action.type) {
    case HANDLE_CLIENT_SELECT_CHANGE:
      return clientSelectChange(
        state,
        action.payload as { selectedContact: any }
      );
    case HANDLE_INVOICE_NUMBER_CHANGE:
      return invoiceNumberChange(state, action.payload as { invoice: number });
    case HANDLE_ITEM_TYPE_CHANGE:
      return itemTypeChange(state, action.payload as { type: string });
    case HANDLE_INVOICE_TYPE_CHANGE:
      return invoiceTypeChange(
        state,
        action.payload as { invoiceType: string }
      );
    case HANDLE_INPUT_CHANGE:
      return InputChange(state, action.payload as { name: string; value: any });
    case HANDLE_DATE_INPUT_CHANGE:
      return dateInputChange(
        state,
        action.payload as { name: string; value: any }
      );
    default:
      return state;
  }
};

function clientSelectChange(
  state: SalesInvoice,
  payload: { selectedContact: any }
): SalesInvoice {
  const { selectedContact } = payload;
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
  return {
    ...state,
    name: selectedContact.name,
    checkout_details: selectedContact,
    shipping_address: address.trim(),
  };
}

function invoiceNumberChange(
  state: SalesInvoice,
  payload: { invoice: number }
) {
  const { invoice } = payload;
  return {
    ...state,
    invoice,
  };
}

function itemTypeChange(state: SalesInvoice, payload: { type: string }) {
  const { type } = payload;
  return { ...state, type };
}
function invoiceTypeChange(
  state: SalesInvoice,
  payload: { invoiceType: string }
) {
  const { invoiceType } = payload;
  return { ...state, invoiceType };
}

function InputChange(
  state: SalesInvoice,
  payload: { name: string; value: any }
) {
  const { name, value } = payload;
  return { ...state, [name]: value };
}

function dateInputChange(
  state: SalesInvoice,
  payload: { name: string; value: any }
) {
  const { name, value } = payload;

  return {
    ...state,
    [name]: value,
    ...(name === "date" && new Date(state.dueDate || "") < new Date(value)
      ? { dueDate: value }
      : {}),
  };
}
