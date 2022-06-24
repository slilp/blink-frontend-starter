import { createSlice } from "@reduxjs/toolkit";
import { ITodayCovidCase } from "api/types/CovidTypes";
import type { RootState } from "../store";
import { fetchTodayCovidCase } from "./actions";

export interface ICovidState {
  today: ITodayCovidCase[];
  status: boolean;
}
const initialState = {
  today: [],
  status: false,
} as ICovidState;

export const covidSlice = createSlice({
  name: "covid",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodayCovidCase.pending, (state, action) => {
      state.status = true;
    });
    builder.addCase(fetchTodayCovidCase.fulfilled, (state, action: any) => {
      state.today = action.payload;
      state.status = false;
    });
    builder.addCase(fetchTodayCovidCase.rejected, (state, action) => {
      state.status = false;
    });
  },
});

export const covidSelector = (state: RootState) => state.covid;

export default covidSlice.reducer;
