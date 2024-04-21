import { withSessionSsr } from 'lib/withSession'
import { checkoutFetcher } from '../lib/utils'
import Layout from '../components/Layout'
import RateForm from '../components/Forms/Rate'
import { ADDRESS_DESCRIPTION } from '../constants/graphql'

const Home = ({ addressDescription }) => {
    return (
        <Layout>
            <h1>Ship with Badals.com</h1>
            <RateForm />
        </Layout>
    )
}

export default Home

export const getServerSideProps = withSessionSsr(async function ({ req, res }) {
    const user = req.session['user']

    if (!user || !user.authorities.includes('ROLE_SHIPPER')) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

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
        props: { user: req.session['user'], addressDescription },
    }
})
