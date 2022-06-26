import { createAsyncThunk } from "@reduxjs/toolkit";
import covidApi from "api/covidService";

export const fetchTodayCovidCase = createAsyncThunk(
  "covid/fetchTodayCovidCase",
  async () => {
    const response = await covidApi.getTodayCovidCase();
    return response;
  }
);
