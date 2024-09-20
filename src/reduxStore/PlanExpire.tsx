import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExpiryDetails {
  isExpired: boolean;
  remainingTime: number;
}

interface InitialState {
  expiryDetails: ExpiryDetails;
}

const initialState: InitialState = {
  expiryDetails: {
    isExpired: false,
    remainingTime: 0,
  },
};

const PlanExpireSlice = createSlice({
  name: "PlanExpire",
  initialState,
  reducers: {
    setExpiryDetails(state, action: PayloadAction<string>) {
      const expiryDate: Date = new Date(action.payload);
      const now: Date = new Date();
      const isExpired: boolean = expiryDate <= now;
      const remainingTime: number = isExpired ? 0 : expiryDate.getTime() - now.getTime();

      state.expiryDetails = {
        isExpired,
        remainingTime,
      };
    },
  },
});

export default PlanExpireSlice.reducer;
export const { setExpiryDetails } = PlanExpireSlice.actions;