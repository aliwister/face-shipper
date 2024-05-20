import {getIronSession} from "iron-session";
import {SessionData, sessionOptions,} from 'lib/session/lib'
import {checkoutFetcher} from '../../lib/utils'
import Layout from '../../components/Layout'
import {ADDRESS_DESCRIPTION} from '../../constants/graphql'

import 'react-phone-input-2/lib/style.css'
import Link from "next/link";
import {request} from "graphql-request";
import {CART, ORDER_HISTORY} from "../../framework/graphql";

const Home = ({sk,additionalInfo,orders}) => {
    console.log(additionalInfo)
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
                                <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                </svg></a>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Date
                                <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                </svg></a>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Price
                                <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                </svg></a>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Action</span>
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {!!additionalInfo && <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
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
                            <Link href={'/payment/'+sk} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Pay</Link>
                        </td>
                    </tr>}
                    {orders.map((order,idx)=>{
                        return(
                            <tr key={idx} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
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
                                    <Link href={'#'} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Get Label</Link>
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

export const getServerSideProps = async function ({ req, res }) {

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
    console.log("here",orders)
    const additionalInfo = !!cart.additionalInfo ? JSON.parse(JSON.parse(cart.additionalInfo)) : null
    return {
        props: { user: session.username,sk:cart.secureKey,additionalInfo,orders:[]
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
        "limit" : 10
    }
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