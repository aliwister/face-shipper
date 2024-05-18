import axios from 'axios'
import qs from "qs";

let authToken = {
    token:null,
    expires_at:null
}

export async function getAccessToken(){

    if(authToken.token && authToken.expires_at > new Date().getTime())
        return authToken.token
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
    authToken.token = data.access_token
    authToken.expires_at = new Date().getTime() + data.expires_in * 1000 * 60 * 60
    return data.access_token

}

