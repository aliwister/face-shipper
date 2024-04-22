import {Box} from "@mui/material";
import RateBoxItem from "./RateBoxItem";
import Alert from '@mui/material/Alert';

export default function RatesBox({results, handleClick}) {
    console.log(results)
    if (!results) {

        return <Alert severity="error">Wrong Shipping Inputs,Try Again</Alert>
    }
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
        }}>
            {results.output.rateReplyDetails.map((item, idx) => {
                return (
                    <RateBoxItem key={idx} idx={idx} item={item}/>
                )
            })}
        </Box>
    )
}