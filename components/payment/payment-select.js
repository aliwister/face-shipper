import React, {useRef, useState} from 'react';
import {useForm} from "react-hook-form";


import {StripePayment} from './StripePayment';
import {useRouter} from 'next/router';
import {request} from "graphql-request";
import {PROCESS_PAYMENT} from "../../framework/graphql";


export const PaymentStep = ({payments, sk,price}) => {

    const {register, handleSubmit} = useForm();
    const [paymentMethod, setPaymentMethod] = useState();
    const [loading, setLoading] = useState(false);
    const [paymentToken, setPaymentToken] = useState(null);
    const [open, setOpen] = useState(false);
    const [once, setOnce] = useState(false);
    const formRef = useRef();
    const router = useRouter()
    const processPaymentMutation = (variables) => {
        return request(`${process.env.CHECKOUT_URL}/instanna`, PROCESS_PAYMENT, variables);
    };
    async function processPayment( token, ref, secureKey) {
        let { processPayment } = await processPaymentMutation({token, ref, secureKey});
        return processPayment;
    }
    React.useEffect( () => {
        const processPaymentWrapper = async () => {
            const processPaymentResponse = await processPayment( paymentToken, paymentMethod, sk)
            if (processPaymentResponse.status === 'SUCCESS') {
                router.push({
                    pathname: `/checkout/confirm`,
                    query: {ref: processPaymentResponse.ref, confirmationKey: processPaymentResponse.payload}
                });
                return;
            }
            if (processPaymentResponse.status === 'REDIRECT') {
                window.location = processPaymentResponse.payload;
                return
            } else if (processPaymentResponse.status == 'DECLINED') {
                alert(processPaymentResponse.message);
                window.location.reload();
            }
        }
        if (paymentMethod === "stripe") {
            if (formRef.current) {
                (formRef.current).dispatchEvent(
                    new Event("submit", {bubbles: true, cancelable: true})
                );
            }
            return;
        }
        if (!paymentToken)
            return;

        processPaymentWrapper();
    }, [paymentToken]);

    const onSubmit = async () => {
        setOnce(true);
        if (once)
            return;
        setPaymentToken(paymentMethod)
    }


    return (
        <div>
            <h1 className="text-6xl font-bold text-center mb-16">
                Payment
            </h1>
            <div>
                {payments?.map((x, i) => (
                    <div key={i} onClick={() => setPaymentMethod(x.ref)}>
                        <div className={"border p-4 rounded"}>
                            <input className={"w-full h-full"}
                                type={"checkbox"}
                                   checked={paymentMethod === x.ref}
                                   onChange={() => setPaymentMethod(x.ref)}
                                   value={x.ref}
                                   key={x.ref}
                                   name={x.label}
                            />
                            &nbsp;&nbsp;{x.label}


                            {(x.ref === 'stripe' && paymentMethod === x.ref) && (
                                <StripePayment once={once} onSubmit={onSubmit} price={price} pk={x.pk} token={sk} setLoading={setLoading} formRef={formRef}/>
                            )}

                        </div>
                    </div>
                ))}
            </div>
            {/*<form onSubmit={handleSubmit(onSubmit)}>*/}
            {/*    <button disabled={once} className="bg-blue-500 mt-8 disabled:bg-gray-400 text-white px-4 py-2 rounded" type={"submit"}>Complete Order</button>*/}
            {/*</form>*/}

        </div>
    )
}
