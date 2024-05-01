import { SWRConfig } from 'swr'
import fetch from '../lib/fetchJson'
import './globals.css'
function MyApp({ Component, pageProps }) {
    return (
        <SWRConfig
            value={{
                fetcher: fetch,
                onError: (err) => {
                    console.error(err)
                },
                onErrorRetry: (
                    error,
                    key,
                    config,
                    revalidate,
                    { retryCount }
                ) => {
                    // Never retry on 404.
                    if (error.status === 404) return
                    // Only retry up to 10 times.
                    if (retryCount >= 10) return
                    // Retry after 5 seconds.
                    setTimeout(() => revalidate({ retryCount }), 5000)
                },
            }}>
            <Component {...pageProps} />
        </SWRConfig>
    )
}

export default MyApp
