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
                headers: { 'Content-Type': 'application/json', 'X-TenantId': 'badals' },
                body: req.body,
            })
            session.isLoggedIn = true;
            session.username = user.username;
            await session.save();

    
            // Redirect after creating session
            res.status(303).redirect("/index");
            return;
        }
        catch(error) {
            console.log(error)
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


        if (session.isLoggedIn !== true) {
        res.status(200).json(defaultSession);
        } else {
        res.status(200).json(session);
        }
        return;
    }

    // If the method is not supported
    res.status(405).end(`Method ${req.method} Not Allowed`);
}