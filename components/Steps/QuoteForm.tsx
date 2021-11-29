import React, { useState } from 'react'
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

import { useForm } from 'react-hook-form'

function QuoteForm() {
    const [alignment, setAlignment] = useState('exp')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
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
            onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12} justifyContent="center">
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={(e, newAlignment) =>
                            setAlignment(newAlignment)
                        }>
                        <ToggleButton value="imp">From (Import)</ToggleButton>
                        <ToggleButton value="exp">To (Export)</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel id="select-country-label">
                            Country*
                        </InputLabel>
                        <Select
                            labelId="select-country-label"
                            label="Country*"
                            required
                            error={errors.country}
                            {...register('country', { required: true })}>
                            <MenuItem value={'OM'}>Oman</MenuItem>
                            <MenuItem value={'MA'}>Morocco</MenuItem>
                            <MenuItem value={'IS'}>USA</MenuItem>
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
                        error={errors.city}
                        {...register('city', { required: true, maxLength: 50 })}
                    />
                </Grid>
            </Grid>
            <Grid container marginTop="1rem" spacing={0}>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        label="Weight"
                        type="number"
                        variant="outlined"
                        required
                        helperText={errors.weight?.type}
                        error={errors.weight}
                        {...register('weight', {
                            required: true,
                            min: 0,
                            max: 99999,
                        })}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    kg
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container marginTop="1rem" columnSpacing={1}>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        label="Height"
                        helperText={errors.height?.type}
                        error={errors.height}
                        {...register('height', { max: 9999, min: 0 })}
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    cm
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
                        textAlign="center"
                        >
                        X
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        fullWidth
                        label="Width"
                        variant="outlined"
                        helperText={errors.width?.type}
                        error={errors.width}
                        {...register('width', { max: 9999, min: 0 })}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    cm
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
                <Typography variant="h5" component="h5" color="text.secondary">
                    Esitimated Cost:
                    <Typography
                        variant="h5"
                        ml="1rem"
                        component="span"
                        color="text.primary">
                        $45
                    </Typography>
                </Typography>
            </Box>
        </Box>
    )
}

export default QuoteForm
