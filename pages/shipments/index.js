import {getIronSession} from "iron-session";
import {sessionOptions,} from 'lib/session/lib'
import Layout from '../../components/Layout'

import 'react-phone-input-2/lib/style.css'
import Link from "next/link";
import {request} from "graphql-request";
import {
    ADD_SHIPMENT_DOC,
    CART,
    CREATE_SHIPMENT,
    ORDER_HISTORY,
    UPDATE_TENANT_CART_MUTATION
} from "../../framework/graphql";
import axios from "axios";
import useUser from "../../lib/useUser";

const Home = ({sk, additionalInfo, orders}) => {
    //console.log(orders)
    const {user} = useUser()

    const handleGetLabel = async (order) => {
        console.log(order)

        // const body = {
        //     "labelResponseOptions": "URL_ONLY",
        //     "requestedShipment": {
        //         "shipper": {
        //             "contact": {
        //                 "personName": order.sender_name,
        //                 //"phoneNumber": order.sender_phone,
        //                 "phoneNumber": 1234567891,
        //                 //"companyName": order.sender_company
        //                 "companyName": "trader"
        //             },
        //             "address": {
        //                 "streetLines": [//todo
        //                     'street 1'
        //                 ],
        //                 //"city": order.sender_city,
        //                 "city": order.sender_city,
        //                 "postalCode": order.sender_zipcode,
        //                 "countryCode": "US"
        //             }
        //         },
        //         "recipients": [
        //             {
        //                 "contact": {
        //                     "personName": order.name,
        //                     //"phoneNumber": order.sender_phone,
        //                     "phoneNumber": 1234567891,
        //                     //"companyName": order.company
        //                     "companyName": "trader"
        //                 },
        //                 "address": {
        //                     "streetLines": [//todo
        //                         'street 1'
        //
        //                     ],
        //                     "city": order.city,
        //                     "postalCode": order.zipcode,
        //                     "countryCode": order.receiver_countryCode
        //                 }
        //             }
        //         ],
        //         "shipDatestamp": order.date,
        //         "serviceType": "FEDEX_INTERNATIONAL_CONNECT_PLUS",
        //         "packagingType": "YOUR_PACKAGING",
        //         "pickupType": "USE_SCHEDULED_PICKUP",
        //         "blockInsightVisibility": false,
        //         "shippingChargesPayment": {
        //             "paymentType": "SENDER"
        //         },
        //         "labelSpecification": {
        //             "imageType": "PDF",
        //             "labelStockType": "PAPER_85X11_TOP_HALF_LABEL"
        //         },
        //         "customsClearanceDetail": {
        //             "dutiesPayment": {
        //                 "paymentType": "SENDER"
        //             },
        //             "isDocumentOnly": true,
        //             //"commodities": order.items//todo
        //             "commodities": [{
        //                 name: 'cereal',
        //                 description: "Prepared foods obtained from unroasted cereal flakes or from mixtures of unroasted cereal flakes and roasted cereal flakes or swelled cereals - In airtight containers and not containing apricots, citrus fruits, peaches or pears",
        //                 harmonizedCode : "1904.20.100000",
        //                 countryOfManufacture : "US",
        //                 quantity : 1,
        //                 quantityUnits : "PCS",
        //                 weight: {
        //                     value: 1,
        //                     units: "KG"
        //                 },
        //                 customsValue: {
        //                     amount: 1,
        //                     currency: "USD"
        //                 },partNumber:'p4',"numberOfPieces": 1,
        //                 "unitPrice": {amount: 100,//todo
        //                     currency: "USD"}
        //             }]
        //         },
        //         "shippingDocumentSpecification": {
        //             "shippingDocumentTypes": [
        //                 "COMMERCIAL_INVOICE"
        //             ],
        //             "commercialInvoiceDetail": {
        //                 "documentFormat": {
        //                     "stockType": "PAPER_LETTER",
        //                     "docType": "PDF"
        //                 }
        //             }
        //         },
        //         "requestedPackageLineItems": order.requestedPackageLineItems
        //     }
        // }
        // console.log(body)
        const body = {
            "labelResponseOptions": "URL_ONLY",
            "requestedShipment": {
                "shipper": {
                    "contact": {
                        "personName": "SHIPPER NAME",
                        "phoneNumber": 1234567890,
                        "companyName": "Shipper Company Name"
                    },
                    "address": {
                        "streetLines": [
                            "SHIPPER STREET LINE 1"
                        ],
                        "city": "Memphis",
                        "stateOrProvinceCode": "TN",
                        "postalCode": 38116,
                        "countryCode": "US"
                    }
                },
                "recipients": [
                    {
                        "contact": {
                            "personName": "RECIPIENT NAME",
                            "phoneNumber": 1234567890,
                            "companyName": "Recipient Company Name"
                        },
                        "address": {
                            "streetLines": [
                                "RECIPIENT STREET LINE 1",
                                "RECIPIENT STREET LINE 2",
                                "RECIPIENT STREET LINE 3"
                            ],
                            "city": "riyadh",
                            "stateOrProvinceCode": "BC",
                            "postalCode": "666666",
                            "countryCode": "SA"
                        }
                    }
                ],
                "shipDatestamp": "2020-07-03",
                "serviceType": "INTERNATIONAL_PRIORITY",
                "packagingType": "YOUR_PACKAGING",
                "pickupType": "USE_SCHEDULED_PICKUP",
                "blockInsightVisibility": false,
                "shippingChargesPayment": {
                    "paymentType": "SENDER"
                },
                "labelSpecification": {
                    "imageType": "PDF",
                    "labelStockType": "PAPER_85X11_TOP_HALF_LABEL"
                },
                "customsClearanceDetail": {
                    "dutiesPayment": {
                        "paymentType": "SENDER"
                    },
                    "isDocumentOnly": true,
                    "commodities": [
                        {
                            "description": "Commodity description",
                            "countryOfManufacture": "US",
                            "quantity": 1,
                            "quantityUnits": "PCS",
                            "unitPrice": {
                                "amount": 100,
                                "currency": "USD"
                            },
                            "customsValue": {
                                "amount": 100,
                                "currency": "USD"
                            },
                            "weight": {
                                "units": "LB",
                                "value": 20
                            }
                        }
                    ]
                },
                "shippingDocumentSpecification": {
                    "shippingDocumentTypes": [
                        "COMMERCIAL_INVOICE"
                    ],
                    "commercialInvoiceDetail": {
                        "documentFormat": {
                            "stockType": "PAPER_LETTER",
                            "docType": "PDF"
                        }
                    }
                },
                "requestedPackageLineItems": [
                    {
                        "weight": {
                            "units": "LB",
                            "value": 70
                        }
                    }
                ]
            }
        }
        try {
            const data = await axios.post('/api/label_fedex', body)
            console.log(data)
        } catch (err) {
            console.log(err)
        } finally {
            //setLoading(false)
        }
    }
    const createShipment = async (data) => {
        const variables = {
            "shipment": {
                "reference": "test1234",
                "trackingNum": "test1234",
                "shipmentMethod": "Air",
                "shipmentType": "PURCHASE",
                "shipmentStatus": "PENDING",
                "pkgCount": 2,
                "handlingInstructions": "test1234 test1234"
            },
            "shipmentItems": [
                {
                    "productId": "123456",
                    "sequence": 2,
                    "quantity": 5,
                    "description": "Spearo Recipes3: Actionable Seafood Meals",
                    "price": 2.00,
                    "purchaseShipments": []
                }
            ]
        }
        //const shipment = await handleCreateShipment(variables)
    }
    const saveLabel = (data) => {

    }
    async function handleCreateShipment(variables) {
        const endpoint = process.env.FACE_TRUST + `/instanna`;

        try {
            const data = await request(endpoint, CREATE_SHIPMENT, variables, {
                Authorization: `Bearer ${user.id_token}`, 'Accept-Language': 'en-us',
            });
            return data;
        } catch (error) {
            console.error('Error updating tenant cart:', error);
            throw error;
        }
    }
    async function handleAddLabel(variables) {
        const endpoint = process.env.FACE_TRUST + `/instanna`;

        try {
            const data = await request(endpoint, ADD_SHIPMENT_DOC, variables, {
                Authorization: `Bearer ${user.id_token}`, 'Accept-Language': 'en-us',
            });
            return data;
        } catch (error) {
            console.error('Error updating tenant cart:', error);
            throw error;
        }
    }
    return (
        <Layout>
            <h1 className="text-6xl font-bold text-center mb-16">
                Shipments
            </h1>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Status
                                {/*<a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">*/}
                                {/*    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>*/}
                                {/*</svg></a>*/}
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Date
                                <a href="#">
                                    <svg className="w-3 h-3 ms-1.5" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg>
                                </a>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Price
                                <a href="#">
                                    <svg className="w-3 h-3 ms-1.5" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                    </svg>
                                </a>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Action</span>
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {!!additionalInfo &&
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td className="px-6 py-4 bg-yellow-300 text-black font-bold">
                                Pending
                            </td>
                            <td className="px-6 py-4">
                                {additionalInfo.date}
                            </td>
                            <td className="px-6 py-4">
                                {additionalInfo.price?.toFixed(2)}$
                            </td>
                            <td className="px-6 py-4">
                                <Link href={'/payment/' + sk}
                                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4">Pay</Link>
                                <button onClick={()=>handleGetLabel(additionalInfo)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Get
                                    Label(for test only)
                                </button>

                            </td>
                        </tr>}
                    {orders.orderHistory.items.map((order, idx) => {
                        return (
                            <tr key={idx}
                                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td className="px-6 py-4 bg-green-300 text-black font-bold">
                                    Completed
                                </td>
                                <td className="px-6 py-4">
                                    {order.date}
                                </td>
                                <td className="px-6 py-4">
                                    {order.price?.toFixed(2)}$
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={()=>createShipment(null)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Get
                                        Label
                                    </button>
                                </td>
                            </tr>
                        )
                    })}

                    </tbody>
                </table>
            </div>

        </Layout>
    )
}

export default Home

export const getServerSideProps = async function ({req, res}) {

    // if (!user || !user.authorities.includes('ROLE_SHIPPER')) {
    //     return {
    //         redirect: {
    //             destination: '/login',
    //             permanent: false,
    //         },
    //     }
    // }
    const session = await getIronSession(
        req,
        res,
        sessionOptions,
    );
    if (!session.username) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
    const cart = await handleAddCart(session.id_token)
    const orders = await getOrders(session.id_token)
    const additionalInfo = !!cart.additionalInfo ? JSON.parse(JSON.parse(cart.additionalInfo)) : null
    return {
        props: {
            user: session.username, sk: cart.secureKey, additionalInfo, orders
        },
    }
}
const handleAddCart = async (id_token) => {
    const endpoint = process.env.API_URL + `/instanna`;
    const variables = {secureKey: null};
    try {
        const data = await request(endpoint, CART, variables, {
            Authorization: `Bearer ${id_token}`, 'Accept-Language': 'en-us',
        });
        return data.cart;
    } catch (error) {
        console.error('Error fetching cart data:', error);
        throw error;
    }
}
const getOrders = async (id_token) => {
    const endpoint = process.env.API_URL + `/instanna`;
    const variables = {
        "state": ["PAYMENT_ACCEPTED"],
        "offset": 0,
        "limit": 10
    }
    console.log(endpoint)
    try {
        const data = await request(endpoint, ORDER_HISTORY, variables, {
            Authorization: `Bearer ${id_token}`, 'Accept-Language': 'en-us',
        });
        return data;
    } catch (error) {
        console.error('Error fetching cart data:', error);
        throw error;
    }
}