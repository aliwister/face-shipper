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

async function getRate(shipmentInfo){
    const url = `${FEDEX_URL}/rate/v1/rates/quotes`
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

async function getRateRoute(req, res) {
    if (!req.session['user']) return res.status(401).json('Unauthorized!')

    const {
        sender_city,
        sender_countryCode,
        sender_postalCode,
        receiver_city,
        receiver_countryCode,
        receiver_postalCode,
        weight_units,
        length_units,
        weight,
        length,
        width,
        height,
        date,
    } = req.body


    try {
        const shipmentInfo = {
            "accountNumber": {
                "value": ACCOUNT_NUMBER
            },
            "requestedShipment": {
                "shipper": {
                    "address": {
                        city: sender_city,
                        countryCode: sender_countryCode, //This is the two-letter country code
                        postalCode: sender_postalCode,
                    },
                },
                "recipient": {
                    "address": {
                        city: receiver_city,
                        countryCode: receiver_countryCode, //This is the two-letter country code
                        postalCode: receiver_postalCode,
                    },
                },
                "shipDateStamp": date,
                // The time is the local time of the shipment based on the shipper's time zone.
                // Required Format is YYYY-MM-DD
                // Example: 2019-09-05

                "pickupType": "DROPOFF_AT_FEDEX_LOCATION", //todo ask ali if this should be default
                "rateRequestType": [
                    "ACCOUNT",
                    "LIST"
                ],// todo read up on this
                "requestedPackageLineItems": [
                    {
                        "weight": {
                            "units": weight_units, // Enum: "KG" "LB"
                            "value": weight
                        },
                        ...(length && {
                            "dimensions": {
                                "length": length,
                                "width": width,
                                "height": height,
                                "units": length_units
                            }
                        })
                    }
                ]
            }
        }
        console.log(shipmentInfo)
        const data = await getRate(shipmentInfo)
        res.json(data)
    } catch (error) {
        const { response } = error
        res.status(response?.status || 500).json(response?.statusText)
    }
}

export default withSessionRoute(getRateRoute)
