import { getIronSession } from "iron-session";
import axios from 'axios'
import {getAccessToken} from "./fedex_util";
const qs = require('qs');


async function getLabel(shipmentInfo){
    const url = `${process.env.FEDEX_URL}/ship/v1/shipments`
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
    if (!req.headers.authorization) return res.status(401).json('Unauthorized!')

    const input_data = req.body

    try {
        const shipmentInfo = {
            "accountNumber": {
                "value": process.env.FEDEX_ACCOUNT_NUMBER
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

export default getLabelRoute
