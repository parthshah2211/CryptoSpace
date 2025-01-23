import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OverviewDataState {
  marketCap: number;
  totalSupply: number;
  circulatingSupply: number;
  rank: number;
  description: string;
}

const initialState: OverviewDataState = {
  marketCap: 0,
  totalSupply: 0,
  circulatingSupply: 0,
  rank: 0,
  description: "",
};

const overviewDataSlice = createSlice({
  name: "overviewData",
  initialState,
  reducers: {
    setOverviewData: (state, action: PayloadAction<OverviewDataState>) => {
      state.marketCap = action.payload.marketCap;
      state.totalSupply = action.payload.totalSupply;
      state.circulatingSupply = action.payload.circulatingSupply;
      state.rank = action.payload.rank;
      state.description = action.payload.description;
    },
  },
});

export const { setOverviewData } = overviewDataSlice.actions;
export default overviewDataSlice.reducer;
