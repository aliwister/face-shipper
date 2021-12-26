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
    Typography,
} from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterMoment'
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab'

import { useForm } from 'react-hook-form'
import axios from 'axios'
import {
    COUNTRIES,
    DHL_ACCOUNTS,
    CURRENCY_TYPES,
} from '../../constants'

function QuoteForm() {
    const [alignment, setAlignment] = useState('imp')
    const [unit, setUnit] = useState('metric')
    const [dhlAccount, setDhlAccount] = useState(DHL_ACCOUNTS[alignment][0])
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

    useEffect(() => {
        setDhlAccount(DHL_ACCOUNTS[alignment][0])
    }, [alignment])

    useEffect(() => {
        resetField('account', { defaultValue: dhlAccount })
    }, [dhlAccount])

    const onSubmit = async (data: any) => {
        const { city, country, weight, width, height, account } = data
        const body = {
            alignment,
            city,
            country,
            weight,
            width,
            height,
            unit,
            account,
            date,
        }
        try {
            const { data } = await axios.post('/api/rate', body)
            setResults(data)
        } catch (err: any) {
            setResults(err.response.data)
        }
        return false
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
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={(e, newAlignment) =>
                            setAlignment(newAlignment || alignment)
                        }>
                        <ToggleButton value="imp">From (Import)</ToggleButton>
                        <ToggleButton value="exp">To (Export)</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="select-account-label">
                            Account*
                        </InputLabel>
                        <Select
                            labelId="select-account-label"
                            label="Account"
                            required
                            error={!!errors.account}
                            value={dhlAccount}
                            autoWidth
                            {...register('account', { required: true })}
                            onChange={(e) => setDhlAccount(e.target.value)}>
                            {DHL_ACCOUNTS[alignment].map((acc) => (
                                <MenuItem value={acc}>{acc}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
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
                                    {...params}
                                    {...register('date', { required: true })}
                                />
                            )}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="select-country-label">
                            Country*
                        </InputLabel>
                        <Select
                            labelId="select-country-label"
                            label="Country*"
                            defaultValue=""
                            required
                            error={!!errors.country}
                            {...register('country', { required: true })}>
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
                        label="City"
                        variant="outlined"
                        required
                        helperText={errors.city?.type}
                        error={!!errors.city}
                        {...register('city', { required: true, maxLength: 50 })}
                    />
                </Grid>
            </Grid>
            <Grid container marginTop="1rem" columnSpacing={2}>
                <Grid item xs={4}>
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
                <Grid item xs={4}>
                    <ToggleButtonGroup
                        color="primary"
                        value={unit}
                        exclusive
                        onChange={(e, newUnit) => setUnit(newUnit)}>
                        <ToggleButton value="metric">Metric</ToggleButton>
                        <ToggleButton value="imperial">Imperial</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Grid>
            <Grid container marginTop="1rem" columnSpacing={1}>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        label="Height"
                        helperText={errors.height?.type}
                        error={!!errors.height}
                        {...register('height', { max: 9999, min: 0 })}
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
                <Grid item xs={1}>
                    <Typography
                        variant="h3"
                        component="h3"
                        color="text.secondary"
                        textAlign="center">
                        X
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        label="Width"
                        variant="outlined"
                        helperText={errors.width?.type}
                        error={!!errors.width}
                        {...register('width', { max: 9999, min: 0 })}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {unit === 'metric' ? 'cm' : 'in'}
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={1}>
                    <Typography
                        variant="h3"
                        component="h3"
                        color="text.secondary"
                        textAlign="center">
                        X
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        label="Length"
                        variant="outlined"
                        helperText={errors.length?.type}
                        error={!!errors.length}
                        {...register('length', { max: 9999, min: 0 })}
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
                <Button type="submit" variant="contained">
                    Get Estimate
                </Button>
            </Box>
            <Box>
                {results && results.status && (
                    <Typography
                        variant="h6"
                        component="span"
                        color="error.main">
                        {results.detail}
                    </Typography>
                )}
                {results && !results.status && (
                    <>
                        {results?.prices.map((price) => (
                            <>
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    color="text.secondary">
                                    ESTIMATED COST:
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        ml="1rem"
                                        component="span"
                                        color="text.primary">
                                        {price.price} {price.priceCurrency}
                                        <Typography
                                            fontWeight="light"
                                            fontSize="medium"
                                            component="small"
                                            color="text.secondary">
                                            {' '}
                                            {CURRENCY_TYPES[price.currencyType]}
                                        </Typography>
                                    </Typography>
                                </Typography>
                                <Typography
                                    variant="caption"
                                    fontWeight="light"
                                    color="text.secondary">
                                    COST BREAKDOWN:
                                </Typography>
                                <ul style={{ margin: 0 }}>
                                    {price.breakdown.breakdown.map(
                                        (breakdown) => (
                                            <li>
                                                <b>{breakdown.name.toLowerCase()}:</b>{' '}
                                                {breakdown.price}{' '}
                                                {price.priceCurrency}
                                                <ul>
                                                    {breakdown.priceBreakdown.map(
                                                        (bd) => (
                                                            <li>
                                                                <b>{bd.priceType.toLowerCase()}</b>:{' '}
                                                                {bd.basePrice}{' '}
                                                                {
                                                                    price.priceCurrency
                                                                }
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </>
                        ))}
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="text.secondary">
                            ESTIMATED DELIVERY DATE AND TIME:
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                ml="1rem"
                                component="span"
                                color="text.primary">
                                {results?.estimatedDeliveryDateAndTime} (
                                {results?.totalTransitDays} days in transit)
                            </Typography>
                        </Typography>
                    </>
                )}
            </Box>
        </Box>
    )
}

export default QuoteForm
