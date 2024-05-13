import {request} from "graphql-request";
import {ORDER_CONFIRMATION} from "../../../framework/graphql";




const ConfirmPage= ({ fallback }) => {
  return (
    <></>
  );
}

export async function getServerSideProps({ query, params: { site }, locale}) {

  const { payment_intent_client_secret } = query;
  const {orderConfirmation} = await checkoutTenantFetcher(ORDER_CONFIRMATION, {
    paymentKey: payment_intent_client_secret
  });
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
const checkoutTenantFetcher = (query, variables) => request(`${process.env.CHECKOUT_URL}instanna`, query, {
  ...variables
});
export default ConfirmPage;
