import React, { useState, useEffect } from 'react'
import {
    Button,
    Box,
    Grid,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
} from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterMoment'
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab'

import { useForm } from 'react-hook-form'
import axios from 'axios'
import { COUNTRIES } from '../../constants'
import RatesBox from "../Rates/RatesBox";

function QuoteForm() {
    const [unit, setUnit] = useState('metric')
    const [loading,setLoading] = useState(false)
    const [results, setResults]: [any, any] = useState(null)
    const [date, setDate] = useState<Date | null>(
        new Date(new Date().setDate(new Date().getDate() + 1))
    )

    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data: any) => {
        const { weight, width, height,length,
            sender_city,sender_postalCode,
            receiver_city,receiver_countryCode,receiver_postalCode} = data
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
            date:date?.toISOString().slice(0, 10),
        }
        console.log(body)
        setLoading(true)
        try {
            const data  = await axios.post('/api/rates_fedex', body)
            setResults(data)
        } catch (err: any) {
            setResults(err.response.data)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box
            padding="1rem"
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            marginTop="2rem"
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            boxShadow="0px 0px 15px rgba(147, 162, 181, 0.2)"
            maxWidth="65rem"
            borderRadius="0.5rem"
            mx="auto">
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Shipping date"
                            inputFormat="MM/DD/yyyy"
                            value={date}
                            onChange={(newValue) => {
                                setDate(newValue)
                            }}
                            renderInput={(params) => (
                                <TextField
                                    fullWidth
                                    {...params}
                                    {...register('date', { required: true })}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        label="Sender City"
                        variant="outlined"
                        required
                        helperText={errors.sender_city?.type}
                        error={!!errors.sender_city}
                        {...register('sender_city', { required: true, maxLength: 50 })}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        label="Sender Postal Code"
                        variant="outlined"
                        required
                        helperText={errors.sender_postalCode?.type}
                        error={!!errors.sender_postalCode}
                        {...register('sender_postalCode', { required: true, maxLength: 50 })}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="select-country-label">
                            Receiver Country Code
                        </InputLabel>
                        <Select
                            labelId="select-country-label"
                            label="Receiver Country Code"
                            defaultValue=""
                            required
                            error={!!errors.receiver_countryCode}
                            {...register('receiver_countryCode', { required: true })}>
                            {COUNTRIES.map((country) => (
                                <MenuItem value={country.value}>
                                    {country.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        label="Receiver City"
                        variant="outlined"
                        required
                        helperText={errors.receiver_city?.type}
                        error={!!errors.receiver_city}
                        {...register('receiver_city', { required: true, maxLength: 50 })}
                    />
                </Grid>

                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        label="Receiver Postal Code"
                        variant="outlined"
                        required
                        helperText={errors.receiver_postalCode?.type}
                        error={!!errors.receiver_postalCode}
                        {...register('receiver_postalCode', { required: true, maxLength: 50 })}
                    />
                </Grid>

            </Grid>
            <Grid container marginTop="1rem" columnSpacing={2}>
                <Grid item xs={4}/>
                <Grid item xs={4}>
                    <ToggleButtonGroup
                        fullWidth
                        color="primary"
                        value={unit}
                        exclusive
                        onChange={(e, newUnit) => setUnit(newUnit)}>
                        <ToggleButton value="metric">Metric</ToggleButton>
                        <ToggleButton value="imperial">Imperial</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={4}/>

            </Grid>
            <Grid container marginTop="1rem" columnSpacing={1}>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        label="Weight"
                        type="number"
                        variant="outlined"
                        required
                        helperText={errors.weight?.type}
                        error={!!errors.weight}
                        {...register('weight', {
                            required: true,
                            min: 0,
                            max: 99999,
                        })}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {unit === 'metric' ? 'kg' : 'lb'}
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        label="Height"
                        required
                        helperText={errors.height?.type}
                        error={!!errors.height}
                        {...register('height', {required: true, max: 9999, min: 0 })}
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {unit === 'metric' ? 'cm' : 'in'}
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        label="Width"
                        required
                        variant="outlined"
                        helperText={errors.width?.type}
                        error={!!errors.width}
                        {...register('width', {required: true, max: 9999, min: 0 })}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {unit === 'metric' ? 'cm' : 'in'}
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        label="Length"
                        required
                        variant="outlined"
                        helperText={errors.length?.type}
                        error={!!errors.length}
                        {...register('length', {required: true, max: 9999, min: 0 })}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {unit === 'metric' ? 'cm' : 'in'}
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>
            <Box marginY="1rem">
                <Button disabled={loading} fullWidth type="submit" variant="contained">
                    Get Estimate
                </Button>
            </Box>
            {results && <RatesBox results={results.data} handleClick={()=>true}/>}
        </Box>
    )
}

export default QuoteForm
