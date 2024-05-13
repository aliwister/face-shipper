import { getIronSession } from "iron-session";
import axios from 'axios'
import {shopFetcher} from "../../lib/utils";
import {ME} from "../../constants/graphql";

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

    const {data} = await axios(config)
    return data.access_token

}

async function getRate(shipmentInfo){
    const url = `${process.env.FEDEX_URL}/rate/v1/rates/quotes`
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
    const {data} = await axios(config)
    return data
}

async function getRateRoute(req, res) {
    // const session = await getIronSession(
    //     req,
    //     res,
    //   )
    // if (!session.username) return res.status(401).json('Unauthorized!')

    const {
        sender_city,
        sender_countryCode,
        sender_postalCode,
        receiver_city,
        receiver_countryCode,
        receiver_postalCode,
        requestedPackageLineItems,
        date, items
    } = req.body


    try {
        const shipmentInfo = {
            "accountNumber": {
                "value": process.env.FEDEX_ACCOUNT_NUMBER
            },
            "requestedShipment": {
                "shipper": {
                    "address": {
                        ...(sender_city && {city: sender_city}),
                        countryCode: sender_countryCode, //This is the two-letter country code
                        postalCode: sender_postalCode,
                    },
                },
                "recipient": {
                    "address": {
                        ...(receiver_city && {city: receiver_city}),
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
                "requestedPackageLineItems": requestedPackageLineItems,
                ...(items && {
                    "customsClearanceDetail": {
                        "commodities": items
                    }
                })
            }
        }
        let data = await getRate(shipmentInfo)
        data = await addMarkup(data, req.headers.Authorization)
        res.json(data)
    } catch (error) {
        const {response} = error
        console.log(error)
        res.status(response?.status || 500).json(response?.statusText)
    }
}

async function addMarkup(shipmentInfo, user) {
    let markup = 0.4;
    if (user) {
        const {me} = await shopFetcher(ME, {}, 'en', {
            Authorization: user,
            "X-TenantId": "instanna"
        })
        if (me && me.shipperMarkup)
            markup = +me.shipperMarkup / 100;
    }
    let rates = shipmentInfo.output.rateReplyDetails;
    for (let i = 0; i < rates.length; i++) {
        for (let j = 0; j < rates[i].ratedShipmentDetails.length; j++) { //todo ask ali about "rateType": "ACCOUNT" ...
            rates[i].ratedShipmentDetails[j].totalNetChargeWithDutiesAndTaxes =
                +rates[i].ratedShipmentDetails[j].totalNetChargeWithDutiesAndTaxes *
                (1 + markup);
        }
    }
    shipmentInfo.output.rateReplyDetails = rates;
    return shipmentInfo;
}

export default getRateRoute
