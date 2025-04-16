import { getIronSession } from 'iron-session';
import axios from 'axios'
const qs = require('qs');

const FEDEX_URL = "https://apis-sandbox.fedex.com"
const CLIENT_ID = ""
const CLIENT_SECRET = ""
const ACCOUNT_NUMBER = ""

async function getAccessToken(){
    const url = `${FEDEX_URL}/oauth/token`
    const config = {
        method: 'POST',
        url: url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
            grant_type: 'client_credentials',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
        })
    }
    try {
        const { data } = await axios(config)
        return data.access_token
    } catch (error) {
        console.log(error)
    }
}

async function getAddress(shipmentInfo){
    const url = `${FEDEX_URL}/location/v1/locations`
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

async function getAddressRoute(req, res) {
    if (!req.session['user']) return res.status(401).json('Unauthorized!')

    const input_data = req.body

    try {
        const search_data = {
            ...input_data
        }
        const data = await getAddress(search_data)
        res.json(data)
    } catch (error) {
        const { response } = error
        res.status(response?.status || 500).json(response?.data)
    }
}

export default getAddressRoute
