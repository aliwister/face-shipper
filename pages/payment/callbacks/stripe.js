import {request} from "graphql-request";
import {ORDER_CONFIRMATION} from "../../../framework/graphql";




const ConfirmPage= ({ fallback }) => {
  return (
    <></>
  );
}

export async function getServerSideProps({ query}) {

  const { payment_intent_client_secret } = query;
  console.log("1 "+payment_intent_client_secret)
  const {orderConfirmation} = await checkoutTenantFetcher(ORDER_CONFIRMATION, {
    paymentKey: payment_intent_client_secret
  });
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
const checkoutTenantFetcher = (query, variables) => request(`${process.env.CHECKOUT_URL}instanna`, query, {
  ...variables
});
export default ConfirmPage;
