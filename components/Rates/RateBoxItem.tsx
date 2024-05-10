import {useRouter} from "next/router";

export default function RateBoxItem({item, idx,handleClick}) {
    const router  = useRouter()

    return (
        <div className={'py-4 flex justify-between items-center'} >
            <div>
                <h5 className={'font-bold text-xl'}>
                    ARRIVES ON
                </h5>
                <h6>
                    {item.operationalDetail?.commitDate ?? "can not be calculated"}
                </h6>
            </div>

            <h5 className={'font-semibold text-xl'}>
                {item.serviceName}
            </h5>

            <button onClick={()=>handleClick()} className={"font-bold text-white text-xl bg-yellow-500 py-2 px-4 rounded"}>
                Create Shipment
                <h5>
                    {item.ratedShipmentDetails[0].totalNetChargeWithDutiesAndTaxes.toFixed(2)}$
                </h5>

            </button>
        </div>
    )
}