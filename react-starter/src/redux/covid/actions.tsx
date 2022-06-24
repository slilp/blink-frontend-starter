import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTodayCovidCase } from "api/covideService";

export const fetchTodayCovidCase = createAsyncThunk(
  "covid/fetchTodayCovidCase",
  async () => {
    const response = await getTodayCovidCase();
    return response;
  }
);
