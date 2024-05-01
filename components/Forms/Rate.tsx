import React, {useEffect, useState} from 'react'


import {useForm} from 'react-hook-form'
import axios from 'axios'

function QuoteForm() {
    const [unit, setUnit] = useState('metric')
    const [addressFrom, setAddressFrom] = useState('')
    const [addressFromOptions, setAddressFromOptions] = useState([])
    const [addressTo, setAddressTo] = useState('')
    const [addressToOptions, setAddressToOptions] = useState([])
    const [loading, setLoading] = useState(false)
    const [results, setResults]: [any, any] = useState(null)
    const [date, setDate] = useState<Date | null>(
        new Date(new Date().setDate(new Date().getDate() + 1))
    )
    useEffect(() => {

        const input1 = document.getElementById("from-input");
        const options1 = {
            componentRestrictions: {country: "us"},
        };
        const autocomplete1 = new google.maps.places.Autocomplete(input1, options1);
        const input2 = document.getElementById("to-input");
        const options2 = {
            componentRestrictions: {country: ['om', 'ae', 'sa']},
        };
        const autocomplete2 = new google.maps.places.Autocomplete(input2, options2);
    }, []);
    const {
        register,
        handleSubmit,
        getValues,
        formState: {errors},
    } = useForm()
    const getAddress = (country, address, handleSet) => {
        const body = {
            "location": {
                "address": {
                    "streetLines": [
                        "10 FedEx Parkway",
                        "Suite 302"
                    ],
                    "city": "Beverly Hills",
                    "stateOrProvinceCode": "CA",
                    "postalCode": "90210",
                    "countryCode": country,
                },
            }
        }
    }
    const onSubmit = async (data: any) => {
        const {
            weight, width, height, length,
            sender_city, sender_postalCode,
            receiver_city, receiver_countryCode, receiver_postalCode
        } = data
        const sender_countryCode = 'US'
        const weight_units = unit === 'metric' ? "KG" : "LB"
        const length_units = unit === 'metric' ? "CM" : "IN"
        const body = {
            sender_city,
            sender_countryCode,
            sender_postalCode,
            receiver_city,
            receiver_countryCode,
            receiver_postalCode,
            weight_units,
            length_units,
            length,
            weight,
            width,
            height,
            date: date?.toISOString().slice(0, 10),
        }
        console.log(body)
        setLoading(true)
        try {
            const data = await axios.post('/api/rates_fedex', body)
            setResults(data)
        } catch (err: any) {
            setResults(err.response.data)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={"w-3/4 items-center flex flex-col"}>
            <h2 className={"text-center font-bold text-6xl"}>
                Calculate Face-Shipper's Rates
            </h2>
            <div className={"mt-16 w-full"}>
                <div className="w-full">
                    <div className={"flex relative w-full justify-between items-center"}>
                        <div className={"font-bold text-xl absolute left-4"}>From</div>
                        <input
                            className=" font-semibold text-xl appearance-none border-2 h-16 border-white bg-gray-200 rounded w-full py-2 px-4 pl-20 text-gray-700 leading-tight focus:outline-none focus:border-l-blue-600"
                            type="text"
                            id={"from-input"}
                            placeholder=""
                            value={addressFrom}
                            onChange={(e) => setAddressFrom(e.target.value)}
                        />
                    </div>
                    <div className={"flex relative w-full justify-between items-center"}>
                        <div className={"font-bold text-xl absolute left-4"}>To</div>
                        <input
                            className="placeholder-black placeholder:font-bold placeholder:text-xl font-semibold text-xl  appearance-none border-2 h-16 border-white bg-gray-200 rounded w-full py-2 px-4 pl-20 text-gray-700 leading-tight focus:outline-none focus:border-l-blue-600"
                            type="text"
                            id={"to-input"}
                            placeholder=""
                            value={addressTo}
                            onChange={(e) => setAddressTo(e.target.value)}
                        />
                    </div>


                </div>
            </div>

        </div>
    )
    // return (
    //     <Box
    //         padding="1rem"
    //         width="100%"
    //         display="flex"
    //         flexDirection="column"
    //         justifyContent="center"
    //         marginTop="2rem"
    //         component="form"
    //         noValidate
    //         autoComplete="off"
    //         onSubmit={handleSubmit(onSubmit)}
    //         //boxShadow="0px 0px 15px rgba(147, 162, 181, 0.2)"
    //         maxWidth="65rem"
    //         borderRadius="0.5rem"
    //         mx="auto">
    //         <Typography align={"center"} fontWeight={"bold"} variant="h2">Calculate Face-Shipper's Rates </Typography>
    //         {/*<Box display={'flex'} marginTop="2rem" marginBottom="2rem">*/}
    //         {/*    <Autocomplete*/}
    //         {/*        fullWidth*/}
    //
    //         {/*        disablePortal*/}
    //         {/*        options={[]}*/}
    //         {/*        renderInput={(params) => <TextField {...params} label="From" />}*/}
    //         {/*    />*/}
    //         {/*</Box>*/}
    //         <Grid container spacing={2}>
    //             <Grid item xs={4}>
    //                 <LocalizationProvider dateAdapter={AdapterDateFns}>
    //                     <DesktopDatePicker
    //                         label="Shipping date"
    //                         inputFormat="MM/DD/yyyy"
    //                         value={date}
    //                         onChange={(newValue) => {
    //                             setDate(newValue)
    //                         }}
    //                         renderInput={(params) => (
    //                             <TextField
    //                                 fullWidth
    //                                 {...params}
    //                                 {...register('date', { required: true })}
    //                             />
    //                         )}
    //                     />
    //                 </LocalizationProvider>
    //             </Grid>
    //             <Grid item xs={4}>
    //                 <TextField
    //                     fullWidth
    //                     label="Sender City"
    //                     variant="outlined"
    //                     required
    //                     helperText={errors.sender_city?.type}
    //                     error={!!errors.sender_city}
    //                     {...register('sender_city', { required: true, maxLength: 50 })}
    //                 />
    //             </Grid>
    //             <Grid item xs={4}>
    //                 <TextField
    //                     fullWidth
    //                     label="Sender Postal Code"
    //                     variant="outlined"
    //                     required
    //                     helperText={errors.sender_postalCode?.type}
    //                     error={!!errors.sender_postalCode}
    //                     {...register('sender_postalCode', { required: true, maxLength: 50 })}
    //                 />
    //             </Grid>
    //             <Grid item xs={4}>
    //                 <FormControl fullWidth>
    //                     <InputLabel id="select-country-label">
    //                         Receiver Country Code
    //                     </InputLabel>
    //                     <Select
    //                         labelId="select-country-label"
    //                         label="Receiver Country Code"
    //                         defaultValue=""
    //                         required
    //                         error={!!errors.receiver_countryCode}
    //                         {...register('receiver_countryCode', { required: true })}>
    //                         {COUNTRIES.map((country) => (
    //                             <MenuItem value={country.value}>
    //                                 {country.label}
    //                             </MenuItem>
    //                         ))}
    //                     </Select>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={4}>
    //                 <TextField
    //                     fullWidth
    //                     label="Receiver City"
    //                     variant="outlined"
    //                     required
    //                     helperText={errors.receiver_city?.type}
    //                     error={!!errors.receiver_city}
    //                     {...register('receiver_city', { required: true, maxLength: 50 })}
    //                 />
    //             </Grid>
    //
    //             <Grid item xs={4}>
    //                 <TextField
    //                     fullWidth
    //                     label="Receiver Postal Code"
    //                     variant="outlined"
    //                     required
    //                     helperText={errors.receiver_postalCode?.type}
    //                     error={!!errors.receiver_postalCode}
    //                     {...register('receiver_postalCode', { required: true, maxLength: 50 })}
    //                 />
    //             </Grid>
    //
    //         </Grid>
    //         <Grid container marginTop="1rem" columnSpacing={2}>
    //             <Grid item xs={4}/>
    //             <Grid item xs={4}>
    //                 <ToggleButtonGroup
    //                     fullWidth
    //                     color="primary"
    //                     value={unit}
    //                     exclusive
    //                     onChange={(e, newUnit) => setUnit(newUnit)}>
    //                     <ToggleButton value="metric">Metric(kg,cm)</ToggleButton>
    //                     <ToggleButton value="imperial">Imperial(lb,in)</ToggleButton>
    //                 </ToggleButtonGroup>
    //             </Grid>
    //             <Grid item xs={4}/>
    //
    //         </Grid>
    //         <Grid container marginTop="1rem" columnSpacing={1}>
    //             <Grid item xs={3}>
    //                 <TextField
    //                     fullWidth
    //                     label="Weight"
    //                     type="number"
    //                     variant="outlined"
    //                     helperText={errors.weight?.type}
    //                     error={!!errors.weight}
    //                     {...register('weight', {
    //                         required: true,
    //                         min: 0,
    //                         max: 99999,
    //                     })}
    //                     InputProps={{
    //                         endAdornment: (
    //                             <InputAdornment position="end">
    //                                 {unit === 'metric' ? 'kg' : 'lb'}
    //                             </InputAdornment>
    //                         ),
    //                     }}
    //                 />
    //             </Grid>
    //             <Grid item xs={3}>
    //                 <TextField
    //                     fullWidth
    //                     label="Height"
    //                     helperText={errors.height?.type}
    //                     error={!!errors.height}
    //                     {...register('height', {required: !!getValues('length') || !!getValues('width'), max: 9999, min: 0 })}
    //                     variant="outlined"
    //                     InputProps={{
    //                         endAdornment: (
    //                             <InputAdornment position="end">
    //                                 {unit === 'metric' ? 'cm' : 'in'}
    //                             </InputAdornment>
    //                         ),
    //                     }}
    //                 />
    //             </Grid>
    //             <Grid item xs={3}>
    //                 <TextField
    //                     fullWidth
    //                     label="Width"
    //                     variant="outlined"
    //                     helperText={errors.width?.type}
    //                     error={!!errors.width}
    //                     {...register('width', {required: !!getValues('length') || !!getValues('height'), max: 9999, min: 0 })}
    //                     InputProps={{
    //                         endAdornment: (
    //                             <InputAdornment position="end">
    //                                 {unit === 'metric' ? 'cm' : 'in'}
    //                             </InputAdornment>
    //                         ),
    //                     }}
    //                 />
    //             </Grid>
    //             <Grid item xs={3}>
    //                 <TextField
    //                     fullWidth
    //                     label="Length"
    //                     variant="outlined"
    //                     helperText={errors.length?.type}
    //                     error={!!errors.length}
    //                     {...register('length', {required: !!getValues('width') || !!getValues('height'), max: 9999, min: 0 })}
    //                     InputProps={{
    //                         endAdornment: (
    //                             <InputAdornment position="end">
    //                                 {unit === 'metric' ? 'cm' : 'in'}
    //                             </InputAdornment>
    //                         ),
    //                     }}
    //                 />
    //             </Grid>
    //         </Grid>
    //         <Box display="flex"
    //              justifyContent="center"
    //              alignItems="center" marginY="1rem">
    //             <Button size={"large"} disabled={loading} type="submit" variant="contained">
    //                 Get Rates
    //             </Button>
    //         </Box>
    //         {results && <RatesBox results={results.data} handleClick={()=>true}/>}
    //     </Box>
    // )
}

export default QuoteForm
