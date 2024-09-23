import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import useAxios from "../utils/axiosInstance";
const axios = useAxios();

const currentDate: Date = new Date();
const currentYear: number = currentDate.getFullYear();
const nextYear: number = currentYear + 1;

const fiscalYearLabel: string = `FY ${currentYear}-${nextYear}`;
const fiscalYearValue: string = String(currentYear).slice(-2);
let FYear: { label: string; value: string } = {
  label: fiscalYearLabel,
  value: fiscalYearValue,
};
const selectedFinancialYear: { label: string; value: string } | null =
  JSON.parse(localStorage.getItem("selectedFinancialYear") as string);

if (selectedFinancialYear) {
  FYear = {
    label: selectedFinancialYear.label,
    value: selectedFinancialYear.value,
  };
}

interface FinancialYearState {
  FYear: { label: string; value: string };
  FinancialYearArray: { label: string; value: string }[];
}

const initialState: FinancialYearState = {
  FYear,
  FinancialYearArray: [FYear],
};

const FinancialYearSlice = createSlice({
  name: "FinancialYear",
  initialState,
  reducers: {
    setFinancialYearArray(
      state,
      action: PayloadAction<{ label: string; value: string }[]>
    ) {
      state.FinancialYearArray = action.payload;
    },
    editFinancialYear(
      state,
      action: PayloadAction<{ label: string; value: string }>
    ) {
      state.FYear = action.payload;
      localStorage.setItem(
        "selectedFinancialYear",
        JSON.stringify(action.payload)
      );
      axios.defaults.headers["fy_id"] = action.payload?.value;
    },
  },
});
export const { editFinancialYear, setFinancialYearArray } =
  FinancialYearSlice.actions;
export default FinancialYearSlice.reducer;
