import request from "./requests/covidRequests";
import { ITodayCovidCase } from "./types/CovidTypes";

export const getTodayCovidCase = async (): Promise<ITodayCovidCase[]> => {
  const response = await request.get<ITodayCovidCase[]>(
    "/Cases/today-cases-all",
    {}
  );
  return response.data;
};
