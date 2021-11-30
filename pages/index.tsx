import Layout from '../components/Layout'
import { ADDRESS_DESCRIPTION } from '../graphql/address-description.query'
import ActiveForm from '../components/Forms'
import { shopFetcher } from '../utils'

const Home = ({ addressDescription }) => {
    return (
        <Layout>
            <h1>Ship with Badals.com</h1>
            <ActiveForm addressDescription={addressDescription} />

            <style jsx>{`
                li {
                    margin-bottom: 0.5rem;
                }
            `}</style>
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
