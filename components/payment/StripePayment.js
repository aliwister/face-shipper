import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";

import StripeCheckoutForm from "./StripeCheckoutForm";
import { useEffect, useState } from 'react';
import axios from 'axios';
import useUser from "../../lib/useUser";


let stripePromise = null;
export const StripePayment = ({pk, token, setLoading, formRef,price}) => {
  const [clientSecret, setClientSecret] = useState("");
  const {user} = useUser()
  useEffect( () => {
    setLoading(true);
    stripePromise = loadStripe(pk);

    async function getSecret() {

      const {data} = await axios.post(`${process.env.CHECKOUT_URL}api/stripe-support/create-payment-intent-shipment`,
          {
            amount: price,
            secureKey: token
          },
          {
            headers: {
              "X-TenantID": 'instanna',
            }
          }
      );
      setClientSecret(data.payload);
    }

    getSecret();
  }, [token]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  if(!clientSecret  || !stripePromise)
    return <></>



  return (

      <Elements
          stripe={stripePromise}
          /*
        // @ts-ignore */
          options={options}>
        <StripeCheckoutForm formRef={formRef} return_url={process.env.HOST_URL+'/payment/callbacks/stripe'} setLoading={setLoading}/>
      </Elements>
  );
}
