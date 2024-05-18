import { getIronSession } from "iron-session";
import axios from 'axios'
const qs = require('qs');


async function getAccessToken(){
    const url = `${process.env.FEDEX_URL}/oauth/token`
    const config = {
        method: 'POST',
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
            grant_type: 'client_credentials',
            client_id: process.env.FEDEX_CLIENT_ID,
            client_secret: process.env.FEDEX_CLIENT_SECRET,
        })
    }
    try {
        const { data } = await axios(config)
        return data.access_token
    } catch (error) {
        console.log(error)
    }
}

async function getAddressVerification(shipmentInfo){
    const url = `${process.env.FEDEX_URL}/address/v1/addresses/resolve`
    const token = await getAccessToken()
    const config = {
        method: 'POST',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            "x-locale": 'en_US'
        },
        data: shipmentInfo
    }

    const { data } = await axios(config)
    return data

}

async function getAddressVerificationRoute(req, res) {
    if (!req.session['user']) return res.status(401).json('Unauthorized!')

    const input_data = req.body

    try {
        const search_data = {
            ...input_data
        }
        const data = await getAddressVerification(search_data)
        res.json(data)
    } catch (error) {
        const { response } = error
        res.status(response?.status || 500).json(response?.data)
    }
}

export default getAddressVerificationRoute
