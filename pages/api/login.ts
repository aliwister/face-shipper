import { NextApiRequest, NextApiResponse } from "next";

import fetchJson from 'lib/fetchJson'
import { getIronSession } from "iron-session";

import {
    SessionData,
    sessionOptions,
    defaultSession
  } from 'lib/session/lib'



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);

    // POST request handling (for session creation)
    if (req.method === "POST") {
        const url = `https://api.profile.shop/api/authenticate`

        try {
            const user = await fetchJson(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-TenantId': 'instanna' },
                body: req.body,
            })
            console.log(user)
            session.isLoggedIn = true;
            session.username = user.username;
            session.id_token = user.id_token;
            await session.save();

            return res.json(session);
        }
        catch(error) {
            return res.status(400).json(error)
        }



    }

    // GET request handling
    if (req.method === "GET") {
        const action = req.query.action;

        // Handle logout
        if (action === "logout") {
            session.destroy();
            res.redirect("/login");
            return;
        }


        if (!session.isLoggedIn) {
        res.status(200).json(defaultSession);
        } else {
        res.status(200).json(session);
        }
        return;
    }

    // If the method is not supported
    res.status(405).end(`Method ${req.method} Not Allowed`);
}