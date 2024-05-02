import {getIronSession} from "iron-session";
import {SessionData, sessionOptions,} from 'lib/session/lib'
import {checkoutFetcher} from '../lib/utils'
import Layout from '../components/Layout'
import {ADDRESS_DESCRIPTION} from '../constants/graphql'
import {useForm} from 'react-hook-form'
import {useState} from "react";
import Package from "../components/create-shipment/Package";

const Home = ({}) => {
    const {
        register, handleSubmit, getValues, formState: {errors},
    } = useForm()
    const [packages, setPackages] = useState([{
        length: '',
        width: '',
        height: '',
        weight: '',
        description: '',
        hc: '',
        quantity: '',
    }])
    const onSubmit = (data) => {
        console.log(data)
    }
    const handleAddPackage = () => {
        const temp = [...packages]
        temp.push({
            length: '',
            width: '',
            height: '',
            weight: '',
            description: '',
            hc: '',
            quantity: '',
        })
        setPackages(temp)
    }
    const checkInputs = () => {
        for (const packageItem of packages) {
            for (const key in packageItem) {
                if (packageItem[key] === '') {
                    return true;
                }
            }
        }
        return false;
    };
    return (
        <Layout>
            <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">
                    Create a Shipping Label
                </h1>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <input {...register('email', {required: false, maxLength: 50})}
                           className="border border-gray-400 p-2 rounded" placeholder="Email (optional)" type="email"/>
                    <input {...register('phone', {required: false, maxLength: 50})}
                           className="border border-gray-400 p-2 rounded" placeholder="Phone (optional)" type="tel"/>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <input {...register('name', {required: true, maxLength: 50})}
                           className="border border-gray-400 p-2 rounded" placeholder="Name" type="text"/>
                    <input {...register('company', {required: false, maxLength: 50})}
                           className="border border-gray-400 p-2 rounded" placeholder="Company (optional)" type="text"/>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <input {...register('address', {required: true, maxLength: 500})}
                           className="border border-gray-400 p-2 rounded" placeholder="Address" type="text"/>
                    <input {...register('address_opt', {required: false, maxLength: 50})}
                           className="border border-gray-400 p-2 rounded"
                           placeholder="Apt / Unit / Suite / etc. (optional)" type="text"/>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-4">
                    <input {...register('city', {required: true, maxLength: 50})}
                           className="border border-gray-400 p-2 rounded" placeholder="City" type="text"/>
                    <input {...register('state', {required: true, maxLength: 50})}
                           className="border border-gray-400 p-2 rounded" placeholder="State" type="text"/>
                    <input {...register('zipcode', {required: true, maxLength: 50})}
                           className="border border-gray-400 p-2 rounded" placeholder="Zipcode" type="text"/>
                    <select {...register('country', {required: true, maxLength: 50})}
                            className="border border-gray-400 p-2 rounded">
                        <option>
                            United States
                        </option>
                    </select>
                </div>
                <h2 className="text-xl font-bold mb-4">
                    Ship From
                </h2>
                <select {...register('address_type', {required: true, maxLength: 50})}
                        className="border border-gray-400 p-2 rounded mb-4">
                    <option>
                        Don't use saved Ship From Address
                    </option>
                    <option>
                        Create New Ship From Address
                    </option>
                </select>
                <h3 className="text-lg font-bold mb-2">
                    Physical Address
                    <span className="text-blue-500">
     Learn more
    </span>
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <input {...register('phy_name', {required: false, maxLength: 50})}
                           className="border border-gray-400 p-2 rounded" placeholder="Name (optional)" type="text"/>
                    <input {...register('phy_company', {required: false, maxLength: 50})}
                           className="border border-gray-400 p-2 rounded" placeholder="Company (optional)" type="text"/>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <input {...register('phy_address', {required: true, maxLength: 500})}
                           className="border border-gray-400 p-2 rounded" placeholder="Address" type="text"/>
                    <input {...register('phy_address_opt', {required: false, maxLength: 50})}
                           className="border border-gray-400 p-2 rounded"
                           placeholder="Apt / Unit / Suite / etc. (optional)" type="text"/>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-4">
                    <input {...register('phy_city', {required: true, maxLength: 50})}
                           className="border border-gray-400 p-2 rounded" placeholder="City" type="text"/>
                    <select {...register('phy_city1', {required: true, maxLength: 50})}
                            className="border border-gray-400 p-2 rounded">
                        <option>
                            Alabama
                        </option>
                    </select>
                    <input {...register('phy_zipcode', {required: true, maxLength: 50})}
                           className="border border-gray-400 p-2 rounded" placeholder="Zipcode" type="text"/>
                    <input {...register('phy_phone', {required: true, maxLength: 50})}
                           className="border border-gray-400 p-2 rounded" placeholder="Phone" type="text"/>
                </div>
                <div className="mb-4">
                    <input {...register('return_address', {required: false})} className="mr-2"
                           type="checkbox"/>
                    Use this address as the Return Address on my shipping labels
                </div>
                <div className="mb-4">
                    <input {...register('save_ship', {required: false})} className="mr-2"
                           type="checkbox"/>
                    Save Ship From Address
                    <input {...register('ship_nickname', {required: true, maxLength: 50})}
                           className="border border-gray-400 p-2 rounded ml-2"
                           placeholder="Nickname this Ship From Address" type="text"/>
                </div>

                <div className={"flex justify-between border-t pt-4 items-start w-full"}>
                    <div>
                        <h2 className="text-xl font-bold mb-4">
                            Type of Packaging
                        </h2>
                        <select {...register('packaging_type', {required: true, maxLength: 50})}
                                className="border border-gray-400 p-2 rounded mb-4">
                            <option>
                                Box or Rigid Packaging
                            </option>
                        </select>

                    </div>
                    <img alt="A brown cardboard box" className="mb-4" height="100"
                         src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-lObuhsQAt6RRD6ZDUiZHH8Dg/user-ZfL16YVfqelAVfRFitZGeDiq/img-C9Dcj5kIDLQ6s1kQ5p2Yunxz.png?st=2024-05-01T17%3A17%3A16Z&amp;se=2024-05-01T19%3A17%3A16Z&amp;sp=r&amp;sv=2021-08-06&amp;sr=b&amp;rscd=inline&amp;rsct=image/png&amp;skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&amp;sktid=a48cca56-e6da-484e-a814-9c849652bcb3&amp;skt=2024-04-30T19%3A38%3A39Z&amp;ske=2024-05-01T19%3A38%3A39Z&amp;sks=b&amp;skv=2021-08-06&amp;sig=y3ewnnl31WCC/WzVFr0vQz4oqG%2BAEjX6Mo0LYRhmPqg%3D"
                         width="100"/>
                    <button type={"button"} onClick={handleAddPackage}
                            className={'font-semibold bg-blue-600 hover:bg-blue-700 p-2 text-white rounded'}>ADD Package
                    </button>
                </div>
                {packages.map((item, idx) => {
                    return (<Package setPackages={setPackages} index={idx} key={idx} package_item={item}/>)
                })}


                <div className="flex w-full mt-4 items-end justify-end">
                    {/*<button type="button" className="bg-gray-400 text-white px-4 py-2 rounded mr-2">*/}
                    {/*    CANCEL*/}
                    {/*</button>*/}
                    <button disabled={checkInputs()} type="submit" className="bg-blue-500 disabled:bg-gray-400 text-white px-4 py-2 rounded">
                        SAVE
                    </button>
                </div>
            </form>
        </Layout>
    )
}

export default Home

export const getServerSideProps = async function ({req, res}) {

    // if (!user || !user.authorities.includes('ROLE_SHIPPER')) {
    //     return {
    //         redirect: {
    //             destination: '/login',
    //             permanent: false,
    //         },
    //     }
    // }
    const session = await getIronSession < SessionData > (
        req,
            res,
            sessionOptions
    );
    // if (!session.username) {
    //     return {
    //         redirect: {s
    //             destination: '/login',
    //             permanent: false,
    //         },
    //     }
    // }
    const addressDescription = await checkoutFetcher(
        ADDRESS_DESCRIPTION,
        {
            isoCode: 'om',
            lang: 'en',
        },
        'en',
        {}
    )

    return {
        props: {}
        //props: { user: session.username, addressDescription },
    }
}
