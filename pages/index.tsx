import useUser from '../lib/useUser'
import { shopFetcher } from '../lib/utils'
import Layout from '../components/Layout'
import ActiveForm from '../components/Forms'
import { ADDRESS_DESCRIPTION } from '../graphql/address-description.query'

const Home = ({ addressDescription }) => {
    const { user } = useUser({ redirectTo: '/login' })

    if (!user || user.isLoggedIn === false) {
        return <Layout>loading...</Layout>
    }
    return (
        <Layout>
            <h1>Ship with Badals.com</h1>
            <ActiveForm addressDescription={addressDescription} />
        </Layout>
    )
}

export default Home

export async function getServerSideProps() {
    const addressDescription = await shopFetcher(
        ADDRESS_DESCRIPTION,
        {
            isoCode: 'om',
            lang: 'en',
        },
        'en'
    )

    return {
        props: {
            addressDescription,
        },
    }
}
