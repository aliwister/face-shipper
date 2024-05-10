import RateBoxItem from "./RateBoxItem";

export default function RatesBox({results, handleClick}) {
    //console.log(results)
    if (!results) {

        return <div >Wrong Shipping Inputs,Try Again</div>
    }
    return (
        <div className={'flex w-full flex-col border-t-2 border-t-black divide-y-2 mt-8 pt-8'} >
            {results.output.rateReplyDetails.map((item, idx) => {
                return (
                    <RateBoxItem handleClick={handleClick} key={idx} idx={idx} item={item}/>
                )
            })}
        </div>
    )
}