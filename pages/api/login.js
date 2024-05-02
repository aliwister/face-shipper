import fetchJson from 'lib/fetchJson'
import { getIronSession } from "iron-session";

import {
    SessionData,
    sessionOptions,
  } from 'lib/session/lib'

export default loginRoute

async function loginRoute(req, res) {
    const session = await getIronSession<SessionData>(req, res, sessionOptions);


    if (req.method !== 'POST') return res.send(req.session['user'] || { isLoggedIn: false })
    const url = `https://api.profile.shop/api/authenticate`

    try {
        const user = await fetchJson(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-TenantId': 'badals' },
            body: req.body,
        })
        session.isLoggedIn = true;
        session.username = username;
        await session.save();
        //req.session['user'] = { ...user, isLoggedIn: true }

        //await req.session.save()
        //res.send(req.session['user'])
    } catch (error) {
        const { response } = error
        res.status(response?.status || 500).json(error.data)
    }
}