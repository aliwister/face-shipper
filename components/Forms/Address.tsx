import React, { useState } from 'react'
import {
    Button,
    Box,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { AddressForm } from '../address-form/address-form'

function QuoteForm({ addressDescription }: { addressDescription: any }) {
    const [alignment, setAlignment] = useState('exp')
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()

    const onSubmit = (data: any) => {
        console.log(data)
        return false
    }

    return (
        <Box
            display="flex"
            padding="1rem"
            marginTop="2rem"
            flexDirection="column"
            justifyContent="center">
            <Box alignSelf="center" display="inline-flex">
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={(e, newAlignment) => setAlignment(newAlignment)}>
                    <ToggleButton value="exp">From Oman (Export)</ToggleButton>
                    <ToggleButton value="imp">To Oman (Import)</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box
                marginTop="2rem"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}>
                <form
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <AddressForm
                            control={control}
                            addressDescription={
                                addressDescription.addressDescription
                            }
                            errors={errors}
                        />
                    </div>
                    <div>
                        <Button type="submit" variant="contained">
                            Submit
                        </Button>
                    </div>
                </form>
            </Box>
        </Box>
    )
}

export default QuoteForm
