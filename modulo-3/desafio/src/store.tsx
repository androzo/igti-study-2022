import { configureStore } from "@reduxjs/toolkit";
import { despesasSlice } from "./slices/despesaSlice";

export const store = configureStore({
  reducer: {
    despesas: despesasSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
