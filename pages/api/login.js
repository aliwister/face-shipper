import fetchJson from 'lib/fetchJson'
import { withSessionRoute } from 'lib/withSession'

export default withSessionRoute(loginRoute)

async function loginRoute(req, res) {
    if (req.method !== 'POST') return res.send(req.session['user'] || { isLoggedIn: false })
    const url = process.env.REST_URL + `api/authenticate`

    try {
        const user = await fetchJson(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: req.body,
        })
        req.session['user'] = { ...user, isLoggedIn: true }

        await req.session.save()
        res.send(req.session['user'])
    } catch (error) {
        console.log(error)
        const { response } = error
        res.status(response?.status || 500).json(error.data)
    }
}