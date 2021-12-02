import { useState } from 'react'
import useUser from '../lib/useUser'
import Layout from '../components/Layout'
import LoginForm from '../components/Login/Form'
import fetchJson from '../lib/fetchJson'
import Box from '@mui/material/Box'
import { withSessionSsr } from 'lib/withSession'

const Login = () => {
    const { mutateUser } = useUser({
        redirectTo: '/',
        redirectIfFound: true,
    })

    const [errorMsg, setErrorMsg] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        const body = {
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
        }

        try {
            mutateUser(
                await fetchJson('/api/login', {
                    method: 'POST',
                    body: JSON.stringify(body),
                })
            )
        } catch (error: any) {
            setErrorMsg(error.data.detail)
        }
    }

    return (
        <Layout>
            <Box maxWidth="24rem" mx="auto">
                <LoginForm errorMessage={errorMsg} onSubmit={handleSubmit} />
            </Box>
        </Layout>
    )
}

export default Login

export const getServerSideProps = withSessionSsr(async function ({ req, res }) {
    const user = req.session['user'];

    if (user) {
        return {
            redirect: {
                destination: '/profile',
                permanent: false,
            },
        }
    }
    return { props: {}}
})
