import { configureStore, Store } from "@reduxjs/toolkit";
import Auth from "./Auth";
import FinancialYear from "./FinancialYear";
import PlanExpiry from "./PlanExpire";
import Company from "./Company";
import InvoiceForm from "./InvoiceForm";
const store: Store = configureStore({
  reducer: {
    Auth,
    // Invoice,
    InvoiceForm,
    FinancialYear,
    Company,
    PlanExpiry,
  },
});

export default store;

// Example of defining RootState
export type RootState = ReturnType<typeof store.getState>;
