import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Default to localStorage for web
import { persistStore, persistReducer } from "redux-persist";
import selectedCryptoReducer from "./slices/selectedCryptoSlice";
import priceDataReducer from "./slices/priceDataSlice";
import historicalDataReducer from "./slices/historicalDataSlice";
import overviewDataReducer from "./slices/overviewDataSlice";

// Persist Configuration
const persistConfig = {
  key: "root",
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  selectedCrypto: selectedCryptoReducer,
  priceData: priceDataReducer,
  historicalData: historicalDataReducer,
  overviewData: overviewDataReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export persistor and store
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
