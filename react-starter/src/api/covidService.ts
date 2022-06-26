import request from "./requests/covidRequests";
import { ITodayCovidCase } from "./types/CovidTypes";

const getTodayCovidCase = async (): Promise<ITodayCovidCase[]> => {
  const response = await request.get<ITodayCovidCase[]>(
    "/Cases/today-cases-all",
    {}
  );
  return response.data;
};

const covidApi = {
  getTodayCovidCase,
};

export default covidApi;
