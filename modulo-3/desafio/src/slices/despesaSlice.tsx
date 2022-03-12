import { ICategoryDespesa, IDespesa } from "../services/api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  parseAndSortDespesas,
  parseCategories,
  sumDespesas,
} from "../utils/utils";

export interface IDespesasPageState {
  despesas: IDespesa[];
  totalExpenses: number;
  categories: ICategoryDespesa[];
  year: string;
  month: string;
}

const initialState: IDespesasPageState = {
  despesas: [],
  totalExpenses: 0,
  categories: [],
  year: "2020",
  month: "06",
};

export const despesasSlice = createSlice({
  name: "despesas",
  initialState,
  reducers: {
    load: (state, action: PayloadAction<IDespesa[]>) => {
      state.despesas = parseAndSortDespesas(action.payload);
      state.categories = parseCategories(action.payload);
      state.totalExpenses = sumDespesas(action.payload);
    },
    refreshYear: (state, action: PayloadAction<string>) => {
      state.year = action.payload;
    },
    refreshMonth: (state, action: PayloadAction<string>) => {
      state.month = action.payload;
    },
  },
});

export const { load, refreshYear, refreshMonth } = despesasSlice.actions;

export default despesasSlice.reducer;
