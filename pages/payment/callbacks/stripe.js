import {request} from "graphql-request";
import {ORDER_CONFIRMATION} from "../../../framework/graphql";
import {getIronSession} from "iron-session";
import {SessionData, sessionOptions} from "../../../lib/session/lib";




const ConfirmPage= ({ fallback }) => {
  return (
    <></>
  );
}

export async function getServerSideProps({ req, res,query}) {
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
  const { payment_intent_client_secret } = query;
  console.log("1 "+payment_intent_client_secret)
  console.log(session.id_token)
  const {orderConfirmation} = await checkoutTenantFetcher(ORDER_CONFIRMATION, {
    paymentKey: payment_intent_client_secret
  },session.id_token);
  console.log("2 "+orderConfirmation)
  if(orderConfirmation) {
    return {
      redirect: {
        destination: `/shipments?confirmationKey=${orderConfirmation?.confirmationKey}&ref=${orderConfirmation?.reference}`,
        permanent: false
      }
    };
  }
else
  return {
    redirect: {
      destination: '/',
      permanent: false
    },
  };

}
const checkoutTenantFetcher = (query, variables,token) => request(`${process.env.CHECKOUT_URL}instanna`, query, {
  ...variables
},{
  Authorization: `Bearer ${token}`, 'Accept-Language': 'en-us',
});
export default ConfirmPage;
