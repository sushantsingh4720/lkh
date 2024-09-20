import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CompanyData {
  [key: string]: any;
}

interface CompanyState {
  companyData: CompanyData;
}

const initialState: CompanyState = {
  companyData: {},
};

const CompanySlice = createSlice({
  name: "Company",
  initialState,
  reducers: {
    setCompanyData(state: CompanyState, action: PayloadAction<CompanyData>) {
      state.companyData = action.payload;
    },
  },
});

export default CompanySlice.reducer;
export const { setCompanyData } = CompanySlice.actions;
