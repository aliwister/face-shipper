import React, {useState} from 'react';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';

const StripeCheckoutForm = ({return_url, setLoading, formRef}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      //console.log("stripe", stripe)
      //console.log("elements", elements)

      return;
    }
    setLoading (true);
    const data = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: return_url
      },
    });

    console.log(data);
``
    if (data.error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show` error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(data.error.message);
      setLoading(false);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  setLoading(false);
  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <PaymentElement />
      {/*<button disabled={!stripe} >سسس</button>*/}
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
};

export default StripeCheckoutForm;
