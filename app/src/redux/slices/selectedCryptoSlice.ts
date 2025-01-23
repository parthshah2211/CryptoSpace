import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedCryptoState {
  name: string;
  symbol: string;
}

const initialState: SelectedCryptoState = {
  name: "Bitcoin",
  symbol: "BTC",
};

const selectedCryptoSlice = createSlice({
  name: "selectedCrypto",
  initialState,
  reducers: {
    setSelectedCrypto: (state, action: PayloadAction<SelectedCryptoState>) => {
       console.log("fdffg", action);
                 
      state.name = action.payload.name;
      state.symbol = action.payload.symbol;
    },
  },
});

export const { setSelectedCrypto } = selectedCryptoSlice.actions;
export const getSelectedCrypto = (state: { selectedCrypto: SelectedCryptoState }) => {
  console.log("Dfdf", state);
  return state.selectedCrypto;
};


export default selectedCryptoSlice.reducer;
