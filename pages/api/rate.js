import { withSessionRoute } from 'lib/withSession'
import axios from 'axios'
import { shopFetcher } from 'lib/utils'
import { ME_PLUS } from '../../constants/graphql.ts'

const auth = {
    username: 'apH4fY3vJ5iD1k',
    password: 'Z!6jM#9vX@8d',
}

async function getRateRoute(req, res) {
    if (!req.session['user']) return res.status(401).json('Unauthorized')
    const url = 'https://express.api.dhl.com/mydhlapi/test/rates?'

    const {
        unit,
        alignment,
        country,
        city,
        weight,
        length,
        width,
        height,
        account,
        date,
    } = req.body

    const defaultForImport = {
        destinationCountryCode: 'OM',
        destinationCityName: 'Muscat',
    }

    const defaultForExport = {
        originCountryCode: 'OM',
        originCityName: 'Muscat',
    }

    const query = {
        accountNumber: account,
        originCountryCode: country,
        originCityName: city,
        destinationCountryCode: country,
        destinationCityName: city,
        weight: weight,
        length: length || 1,
        width: width || 1,
        height: height || 1,
        plannedShippingDate: date.slice(0, 10),
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
            Authorization: `${req.session['user'].tokenType} ${req.session['user'].id_token}`,
        }).catch((e) => ({}))

        const { shipperMarkup = 100 } = mePlus || { mePlus: {} }

        const products = data.products.map((product) => {
            return {
                name: product.productName,
                estimatedDeliveryDateAndTime:
                    product.deliveryCapabilities.estimatedDeliveryDateAndTime,
                totalTransitDays: product.deliveryCapabilities.totalTransitDays,
                prices: product?.totalPrice
                    .sort((a, b) => (a.price > b.price ? 1 : -1))
                    .filter(
                        (price) =>
                            'BILLC' === price.currencyType &&
                            price.priceCurrency &&
                            'OMR' === price.priceCurrency
                    )
                    .map((price) => {
                        price.price = (
                            price.price *
                            (1 + shipperMarkup / 100)
                        ).toFixed(2)
                        price.breakdown = product.detailedPriceBreakdown.find(
                            (breakdown) =>
                                price.priceCurrency ===
                                    breakdown.priceCurrency &&
                                price.currencyType === breakdown.currencyType
                        )
                        if (price.breakdown) {
                            price.breakdown.breakdown =
                                price.breakdown.breakdown.map(
                                    (priceBreakdown) => {
                                        priceBreakdown.price = (
                                            priceBreakdown.price *
                                            (1 + shipperMarkup / 100)
                                        ).toFixed(2)
                                        return priceBreakdown
                                    }
                                )
                        }

                        return price
                    }),
            }
        })

        res.send({
            products,
        })
    } catch (error) {
        const { response } = error
        res.status(response?.status || 500).json(response?.data)
    }
}

export default withSessionRoute(getRateRoute)
