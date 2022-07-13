import { createAsyncThunk } from "@reduxjs/toolkit";
import covidApi from "api/covidService";

export const fetchTodayCovidCase = createAsyncThunk(
  "covid/fetchTodayCovidCase",
  async (_, thunkAPI) => {
    try {
      const response = await covidApi.getTodayCovidCase();
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);
