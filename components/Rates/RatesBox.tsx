import RateBoxItem from "./RateBoxItem";

export default function RatesBox({results, handleClick}) {
    console.log(results)
    if (!results) {

        return <div >Wrong Shipping Inputs,Try Again</div>
    }
    return (
        <div >
            {results.output.rateReplyDetails.map((item, idx) => {
                return (
                    <RateBoxItem key={idx} idx={idx} item={item}/>
                )
            })}
        </div>
    )
}