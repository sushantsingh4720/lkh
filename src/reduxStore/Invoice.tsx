import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InvoiceState {
  SalesInvoiceData: any | null;
  DeliveryChallanData: any | null;
  ExpenseInvoiceData: any | null;
  QuotationData: any | null;
  NoteData: any | null;
}

const initialState: InvoiceState = {
  SalesInvoiceData: null,
  DeliveryChallanData: null,
  ExpenseInvoiceData: null,
  QuotationData: null,
  NoteData: null,
};

const InvoiceSlice = createSlice({
  name: "Invoice",
  initialState,
  reducers: {
    setSalesInvoiceData(state, action: PayloadAction<any>) {
      state.SalesInvoiceData = action.payload;
    },
    setDeliveryChallanData(state, action: PayloadAction<any>) {
      state.DeliveryChallanData = action.payload;
    },
    setExpenseInvoiceData(state, action: PayloadAction<any>) {
      state.ExpenseInvoiceData = action.payload;
    },
    setQuotationData(state, action: PayloadAction<any>) {
      state.QuotationData = action.payload;
    },
    setNoteData(state, action: PayloadAction<any>) {
      state.NoteData = action.payload;
    },
  },
});

export default InvoiceSlice.reducer;
export const {
  setSalesInvoiceData,
  setDeliveryChallanData,
  setExpenseInvoiceData,
  setQuotationData,
  setNoteData,
} = InvoiceSlice.actions;