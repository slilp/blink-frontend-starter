import { render, screen } from "utils/test-utils";
import CovidWithThunk from "../index";
import covidApi from "api/covidService";

jest.setTimeout(10000);
jest.mock("api/covidService");

describe("CovidWithThunk page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render initial data", async () => {
    //given
    const mockData = [
      {
        txn_date: "2022-06-26",
        new_case: 2378,
        total_case: 4514155,
        new_case_excludeabroad: 2376,
        total_case_excludeabroad: 4489134,
        new_death: 17,
        total_death: 30592,
        new_recovered: 1834,
        total_recovered: 4460250,
        update_date: "2022-06-26 07:27:54",
      },
    ];

    //when
    covidApi.getTodayCovidCase = jest.fn().mockResolvedValue(mockData);
    const { store } = render(<CovidWithThunk />);

    //then
    const newCase = await screen.findByTestId("new-case");
    expect(newCase).toHaveTextContent(mockData[0].new_case + "");
    expect(store.getState().covid.today).toEqual(mockData);
  });
});
