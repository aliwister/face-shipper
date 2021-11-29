import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

import QuoteForm from './QuoteForm'

export default function Steps({ addressDescription }) {
    const steps = [
        {
            title: 'Get rate',
            component: QuoteForm,
            props: { addressDescription },
        },
        { title: 'Add shipping details', component: null },
        { title: 'Enter shipment content', component: null },
        { title: 'Generate label', component: null },
    ]

    const [activeStepIndex, setActiveStepIndex] = useState(0)

    return (
        <Box width="100%">
            <Stepper activeStep={activeStepIndex} alternativeLabel>
                {steps.map((step) => (
                    <Step key={step.title}>
                        <StepLabel>{step.title}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {steps[activeStepIndex].component(steps[activeStepIndex].props)}
        </Box>
    )
}
