
export default function RateBoxItem({item, idx}) {
    return (
        <div >
            <div>
                <h5>
                    ARRIVES ON
                </h5>
                <h6>
                    {item.operationalDetail?.commitDate ?? "can not be calculated"}
                </h6>
            </div>

            <h5>
                {item.serviceName}
            </h5>

            <button  color="warning">
                <h5>
                    {item.ratedShipmentDetails[0].totalNetFedExCharge}$
                </h5>

            </button>
        </div>
    )
}