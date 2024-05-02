import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import {
  SessionData,
  sessionOptions,
} from 'lib/session/lib'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);

    session.destroy();
    res.redirect("/pages-router-redirect-api-route-fetch");
    return;
}
