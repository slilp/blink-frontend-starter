import { rest } from "msw";

const handlers = [
  rest.get(
    "https://covid19.ddc.moph.go.th/api/Cases/today-cases-all",
    async (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
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
        ])
      );
    }
  ),
];

export default handlers;
