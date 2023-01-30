import { withSessionRoute } from "../lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(userRoute);

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user,
    });
  } else {
    res.json({
      id: "",
      name: "",
    });
  }
}
