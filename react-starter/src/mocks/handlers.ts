import { rest } from "msw";

const handlers = [
  rest.get(
    "https://covid19.ddc.moph.go.th/api/Cases/today-cases-all",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
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
        ])
      );
    }
  ),
];

export default handlers;
