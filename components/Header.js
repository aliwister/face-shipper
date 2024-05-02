import React from 'react'
import Link from 'next/link'
import useUser from '../lib/useUser'
import { useRouter } from 'next/router'
import fetchJson from '../lib/fetchJson'

const Header = () => {
    const { user, mutateUser } = useUser()
    const router = useRouter()
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href="/" legacyBehavior>
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/create_shipment" legacyBehavior>
                            <a>Create Shipment</a>
                        </Link>
                    </li>
                    {!user?.isLoggedIn ? (
                        <li>
                            <Link href="/login" legacyBehavior>
                                <a>Login</a>
                            </Link>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link href="/profile" legacyBehavior>
                                    <a>Profile</a>
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="/api/logout"
                                    onClick={async (e) => {
                                        e.preventDefault()
                                        mutateUser(
                                            await fetchJson('/api/logout', {
                                                method: 'POST',
                                            }),
                                            false
                                        )
                                        router.push('/login')
                                    }}>
                                    Logout
                                </a>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <style jsx>{`
                ul {
                    display: flex;
                    list-style: none;
                    margin-left: 0;
                    padding-left: 0;
                }

                li {
                    margin-right: 1rem;
                    display: flex;
                }

                li:first-child {
                    margin-left: auto;
                }

                a {
                    color: #fff;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                }

                header {
                    padding: 0.2rem;
                    color: #fff;
                    background-color: #333;
                }
            `}</style>
        </header>
    );
}

export default Header
