import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PriceDataState {
  currentPrice: number;
  percentageChange: number;
}

const initialState: PriceDataState = {
  currentPrice: 0,
  percentageChange: 0,
};

const priceDataSlice = createSlice({
  name: "priceData",
  initialState,
  reducers: {
    setPriceData: (state, action: PayloadAction<PriceDataState>) => {
      state.currentPrice = action.payload.currentPrice;
      state.percentageChange = action.payload.percentageChange;
    },
  },
});

export const { setPriceData } = priceDataSlice.actions;
export default priceDataSlice.reducer;
