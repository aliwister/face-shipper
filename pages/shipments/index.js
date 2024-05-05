import {getIronSession} from "iron-session";
import {SessionData, sessionOptions,} from 'lib/session/lib'
import {checkoutFetcher} from '../../lib/utils'
import Layout from '../../components/Layout'
import {ADDRESS_DESCRIPTION} from '../../constants/graphql'

import 'react-phone-input-2/lib/style.css'
import Link from "next/link";

const Home = ({shipments}) => {


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
                            Shipment Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            1234
                        </th>
                        <td className="px-6 py-4 bg-yellow-300 text-black font-bold">
                            Pending
                        </td>
                        <td className="px-6 py-4">
                            12/7/2024
                        </td>
                        <td className="px-6 py-4">
                            $2999
                        </td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Pay</a>
                        </td>
                    </tr>
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            1235
                        </th>
                        <td className="px-6 py-4 bg-green-300 text-black font-bold">
                            Paid
                        </td>
                        <td className="px-6 py-4">
                            12/6/2024
                        </td>
                        <td className="px-6 py-4">
                            $1999
                        </td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Print</a>
                        </td>
                    </tr>

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
    const session = await getIronSession < SessionData > (
        req,
            res,
            sessionOptions
    );
// if (!session.username) {
//     return {
//         redirect: {s
//             destination: '/login',
//             permanent: false,
//         },
//     }
// }
    const addressDescription = await checkoutFetcher(
        ADDRESS_DESCRIPTION,
        {
            isoCode: 'om',
            lang: 'en',
        },
        'en',
        {}
    )

    return {
        props: {}
//props: { user: session.username, addressDescription },
    }
}
