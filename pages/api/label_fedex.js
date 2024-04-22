import { withSessionRoute } from 'lib/withSession'
import axios from 'axios'
const qs = require('qs');

const FEDEX_URL = "https://apis-sandbox.fedex.com"
const CLIENT_ID = "l72e9ba4546fd6424f8204195729225ba9"
const CLIENT_SECRET = "f502317014eb45368c07e730eb40d8e2"
const ACCOUNT_NUMBER = "740561073"

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

async function getLabel(shipmentInfo){
    const url = `${FEDEX_URL}/ship/v1/shipments`
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
    try {
        const { data } = await axios(config)
        return data
    } catch (error) {
        console.log(error)
    }
}

async function getLabelRoute(req, res) {
    if (!req.session['user']) return res.status(401).json('Unauthorized!')

    const input_data = req.body

    try {
        const shipmentInfo = {
            "accountNumber": {
                "value": ACCOUNT_NUMBER
            },
            ...input_data

        }
        const data = await getLabel(shipmentInfo)
        res.json(data)
    } catch (error) {
        const { response } = error
        res.status(response?.status || 500).json(response?.data)
    }
}

export default withSessionRoute(getLabelRoute)
