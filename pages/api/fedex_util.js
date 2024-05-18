import axios from 'axios'
import qs from "qs";

export async function getAccessToken(){
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

