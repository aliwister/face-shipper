import React from 'react'
import { Button, TextField, Typography, Box } from '@mui/material'

const Form = ({ errorMessage, onSubmit }) => (
    <form onSubmit={onSubmit}>
        <Typography variant="h5">Login</Typography>
        <Box my="1rem">
            <TextField
                fullWidth
                type="text"
                name="username"
                required
                label="Username"
                variant="outlined"
            />
        </Box>
        <Box mb="1rem">
            <TextField
                fullWidth
                type="text"
                name="password"
                required
                label="Password"
                variant="outlined"
            />
        </Box>
        <Button fullWidth variant="contained" type="submit">
            Login
        </Button>

        {errorMessage && (
            <Typography variant="h5" mt="1rem" color="error.main">
                {errorMessage}
            </Typography>
        )}
    </form>
)

export default Form