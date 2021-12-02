import { withSessionRoute } from 'lib/withSession'
import axios from 'axios'
import { shopFetcher } from 'lib/utils'
import { ME_PLUS } from '../../graphql/me-plus.query.ts'

const auth = {
    username: 'apH4fY3vJ5iD1k',
    password: 'Z!6jM#9vX@8d',
}

async function getRateRoute(req, res) {
    if (!req.session['user']) return res.status(401).json('Unauthorized')
    const url = 'https://express.api.dhl.com/mydhlapi/test/rates?'

    const { unit, alignment, country, city, weight, length, width, height } =
        req.body

    const defaultForImport = {
        accountNumber: '959359716',
        destinationCountryCode: 'OM',
        destinationCityName: 'Muscat',
    }

    const defaultForExport = {
        accountNumber: '453044439',
        originCountryCode: 'OM',
        originCityName: 'Muscat',
    }

    const query = {
        originCountryCode: country,
        originCityName: city,
        destinationCountryCode: country,
        destinationCityName: city,
        weight: weight,
        length: length || 1,
        width: width || 1,
        height: height || 1,
        plannedShippingDate: new Date(
            new Date().setDate(new Date().getDate() + 1)
        )
            .toJSON()
            .slice(0, 10),
        isCustomsDeclarable: true,
        unitOfMeasurement: unit,
        ...(alignment === 'imp' ? defaultForImport : defaultForExport),
    }

    const queryString = new URLSearchParams(query).toString()
    const config = {
        method: 'GET',
        url: url + queryString,
        headers: {
            Authorization: `Basic ${Buffer.from(
                auth.username + ':' + auth.password
            ).toString('base64')}`,
        },
    }

    try {
        const { data } = await axios(config)

        const { mePlus } = await shopFetcher(ME_PLUS, {}, 'en', {
            Authorization: `Bearer ${req.session['user'].id_token}`,
        }).catch((e) => ({}))

        const { shipperMarkup = 0 } = mePlus

        const lowestPrice = data.products?.[0]?.totalPrice.sort((a, b) =>
            a.price > b.price ? 1 : -1
        )[0]

        lowestPrice.price = (1 + shipperMarkup) * lowestPrice.price

        res.send({
            ...lowestPrice,
            estimatedDeliveryDateAndTime:
                data.products?.[0]?.deliveryCapabilities
                    .estimatedDeliveryDateAndTime,
            totalTransitDays:
                data.products?.[0]?.deliveryCapabilities.totalTransitDays,
        })
    } catch (error) {
        const { response } = error
        res.status(response?.status || 500).json(response?.data)
    }
}

export default withSessionRoute(getRateRoute)
