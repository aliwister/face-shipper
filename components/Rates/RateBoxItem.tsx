import {Box, Button, Typography} from "@mui/material";

export default function RateBoxItem({item, idx}) {
    return (
        <Box sx={{
            width: "100%",
            display: 'flex',
            alignItems: 'center',
            justifyContent: "space-between",
            borderTop: idx === 0 ? "none" : "black solid 1px",
            p: 5
        }}>
            <div>
                <Typography fontWeight={700} variant="h5" component="h5">
                    ARRIVES ON
                </Typography>
                <Typography fontSize={16} color={"lightslategray"} variant="h6" component="h6">
                    {item.operationalDetail?.commitDate ?? "can not be calculated"}
                </Typography>
            </div>

            <Typography variant="h5" component="h5">
                {item.serviceName}
            </Typography>

            <Button size={"large"} variant="contained" color="warning">
                <Typography fontWeight={700} variant="h5" component="h5">
                    {item.ratedShipmentDetails[0].totalNetFedExCharge*1.4}$
                </Typography>

            </Button>
        </Box>
    )
}