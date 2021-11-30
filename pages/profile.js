import useUser from '../lib/useUser'
import Layout from '../components/Layout'

const Profile = () => {
    const { user } = useUser({ redirectTo: '/login' })

    if (!user || user.isLoggedIn === false) {
        return <Layout>loading...</Layout>
    }

    return (
        <Layout>
            <h1>Your User profile</h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </Layout>
    )
}

export default Profile
