import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HistoricalDataState {
  prices: number[]; // Array of prices for 7 days
  dates: string[]; // Array of corresponding dates
}

const initialState: HistoricalDataState = {
  prices: [],
  dates: [],
};

const historicalDataSlice = createSlice({
  name: "historicalData",
  initialState,
  reducers: {
    setHistoricalData: (state, action: PayloadAction<HistoricalDataState>) => {
      state.prices = action.payload.prices;
      state.dates = action.payload.dates;
    },
  },
});

export const { setHistoricalData } = historicalDataSlice.actions;
export default historicalDataSlice.reducer;
