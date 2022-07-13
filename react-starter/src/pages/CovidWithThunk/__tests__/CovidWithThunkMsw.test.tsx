import { render, screen } from "utils/test-utils";
import CovidWithThunk from "../index";
import { rest, server } from "mocks/server";

describe("CovidWithThunk page", () => {
  // beforeEach(() => {
  //   jest.clearAllMocks();
  // });

  it("should render initial data", async () => {
    //given
    const mockData = [
      {
        txn_date: "2022-06-26",
        new_case: 10000,
        total_case: 10000,
        new_case_excludeabroad: 10000,
        total_case_excludeabroad: 10000,
        new_death: 10000,
        total_death: 10000,
        new_recovered: 10000,
        total_recovered: 10000,
        update_date: "2022-06-26 07:27:54",
      },
    ];

    //when
    const { store } = render(<CovidWithThunk />);

    //then
    const newCase = await screen.findByTestId("new-case");
    expect(newCase).toHaveTextContent(10000 + "");
    expect(store.getState().covid.today).toEqual(mockData);
  });

  it("should not render initial data when api error", async () => {
    // given
    server.use(
      rest.get(
        "https://covid19.ddc.moph.go.th/api/Cases/today-cases-all",
        async (req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ message: "error" }));
        }
      )
    );

    //when
    const { store } = render(<CovidWithThunk />);

    //then
    const newCase = await screen.queryByTestId("new-case");
    expect(newCase).not.toBeInTheDocument();
    expect(store.getState().covid.today).toEqual([]);
  });
});
