import {useRouter} from "next/router";
import {request} from "graphql-request";
import {CART, TENANT_INFO_PAYMENT} from "../../framework/graphql";
import {getIronSession} from "iron-session";
import {SessionData, sessionOptions} from "../../lib/session/lib";
import Layout from "../../components/Layout";
import {PaymentStep} from "../../components/payment/payment-select";

export default function Payment({payments,price}) {
    const router = useRouter();
    const sk = router.query.sk[0]

    return(
        <Layout>
            <PaymentStep price={price} payments={payments} sk={sk}/>
        </Layout>
    )
}
export const getServerSideProps = async function ({ req, res }) {

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
    const data = await getTenantInfo()
    let payments = [];

    data?.tenantInfo?.publicPaymentProfile?.map((i, p) => {
        switch (i.name) {
            case 'stripe':
                payments.push({ref: 'stripe', pk: i.pk, label: 'Stripe'})
                break;
            case 'bankwire':
                payments.push({ref: 'bankwire', html: i.html, label: 'Bank Wire'})
                break;
            case 'checkoutcom':
                payments.push({ref: 'checkoutcom', pk: i.pk, label: 'Checkout.com'})
                break;
            case 'thawani':
                payments.push({ref: 'thawani', pk: i.pk, label: 'Thawani'})
                break;
        }
    })
    const cart = await handleAddCart(session.id_token)
    console.log(cart)
    const additionalInfo = cart.additionalInfo  ?? null
    if (!additionalInfo) {
        return {
            redirect: {
                destination: '/shipments',
                permanent: false,
            },
        }
    }
    return {
        props: {
            payments,price:additionalInfo.price
        }
    }
}
const getTenantInfo = async () => {
    const endpoint = process.env.API_URL + `/instanna`;
    const variables = {};

    try {
        return await request(endpoint, TENANT_INFO_PAYMENT, variables, {
            'Accept-Language': 'en-us',
        })
    } catch (error) {
        console.error('Error fetching cart data:', error);
        throw error;
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