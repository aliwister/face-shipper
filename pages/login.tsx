import { useState } from 'react'
import useUser from '../lib/useUser'
import Layout from '../components/Layout'
import LoginForm from '../components/Login/Form'
import fetchJson from '../lib/fetchJson'
import Box from '@mui/material/Box'
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from 'lib/session/lib'

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

export const getServerSideProps = async function ({ req, res }) {
    const session = await getIronSession<SessionData>(
        req,
        res,
        sessionOptions,
      );

    if (session.username) {
        return {
            redirect: {
                destination: '/profile',
                permanent: false,
            },
        }
    }
    return { props: {}}
}
