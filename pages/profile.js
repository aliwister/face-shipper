import useUser from '../lib/useUser'
import Layout from '../components/Layout'

const Profile = () => {
    const { user } = useUser({ redirectTo: '/login' })

    if (!user || user.isLoggedIn === false) {
        return <Layout>loading...</Layout>
    }

    return (
        <Layout>
            <div className="flex flex-col mt-32 items-center justify-center  ">
                <h1 className="text-4xl font-bold text-gray-900">Welcome, {user.username}!</h1>
                <p className="mt-16 text-lg text-gray-700">We're glad to have you back.</p>
            </div>
        </Layout>
    )
}

export default Profile

