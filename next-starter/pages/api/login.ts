import { withSessionRoute } from "../lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const user = { id: "1", name: "Slil" };
  req.session.user = user;
  await req.session.save();
  res.send({ ok: true });
}
