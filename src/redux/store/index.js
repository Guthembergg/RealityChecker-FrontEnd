import { configureStore } from "@reduxjs/toolkit";
import MainReducer from "../reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

const persistConfig = {
  key: "root",
  storage: storage,
  transforms: [
    encryptTransform({ secretKey: process.env.REACT_APP_PERSIST_KEY }),
  ],
};
const persistedReducer = persistReducer(persistConfig, MainReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
