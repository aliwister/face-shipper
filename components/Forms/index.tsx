import React, { useState } from 'react'
import Box from '@mui/material/Box'
import QuoteForm from './QuoteForm'

export default function Forms({ addressDescription }) {
    const froms = [
        {
            title: 'Get rate',
            component: QuoteForm,
            props: { addressDescription },
        },
        { title: 'Add shipping details', component: null },
        { title: 'Enter shipment content', component: null },
        { title: 'Generate label', component: null },
    ]

    const [activeFormIndex, setActiveFormIndex] = useState(0)

    return (
        <Box width="100%">
            {froms[activeFormIndex].component(froms[activeFormIndex].props)}
        </Box>
    )
}
