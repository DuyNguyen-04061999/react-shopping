import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authReducer";

const reducer = combineReducers({
  auth: authReducer,
});
export const store = configureStore({
  reducer,
  devTools: import.meta.env.VITE_NODE_ENV === "development",
});
