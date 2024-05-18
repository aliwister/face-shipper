import { getIronSession } from "iron-session";
import {
  SessionData,
  sessionOptions,
} from 'lib/session/lib'
import { checkoutFetcher } from '../lib/utils'
import Layout from '../components/Layout'
import RateForm from '../components/Forms/Rate'
import { ADDRESS_DESCRIPTION } from '../constants/graphql'

const Home = ({ addressDescription }) => {
    return (
        <Layout>
            <RateForm />
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
    const session = await getIronSession<SessionData>(
        req,
        res,
        sessionOptions,
      );
    // if (!session.username) {
    //     return {
    //         redirect: {
    //             destination: '/login',
    //             permanent: false,
    //         },
    //     }
    // }
    // const addressDescription = await checkoutFetcher(
    //     ADDRESS_DESCRIPTION,
    //     {
    //         isoCode: 'om',
    //         lang: 'en',
    //     },
    //     'en',
    //     {}
    // )

    return {
        props:{}
        // props: { user: session?.username,
        //     //addressDescription
        // },
    }
}
