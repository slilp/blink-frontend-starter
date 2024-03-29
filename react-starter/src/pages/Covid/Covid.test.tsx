import { render, screen, waitFor } from "utils/test-utils";
import Covid from "./index";
import { getTodayCovidCase } from "api/covidServicePartial";

jest.setTimeout(10000);
jest.mock("api/covidServicePartial", () => ({
  ...jest.requireActual("api/covidServicePartial"),
  getTodayCovidCase: jest.fn(),
}));

describe("Covidpage", () => {
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
    (getTodayCovidCase as jest.Mock).mockResolvedValue(mockData);

    //when
    render(<Covid />);

    //then
    await waitFor(() =>
      expect(screen.getByTestId("covid-data")).toHaveTextContent(
        JSON.stringify(mockData)
      )
    );
    // const data = await screen.findByTestId("covid-data");
  });
});
