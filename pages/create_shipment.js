import {getIronSession} from "iron-session";
import {sessionOptions,} from 'lib/session/lib'
import Layout from '../components/Layout'
import {useForm} from 'react-hook-form'
import {useState} from "react";
import Package from "../components/create-shipment/Package";
import Toggle from "../components/create-shipment/Toggle";
import {COUNTRIES, ITEMS} from "../constants";
import 'react-phone-input-2/lib/style.css'
import Item from "../components/create-shipment/Item";
import Link from "next/link";
import axios from "axios";
import {CART, CREATE_CHECKOUT_SESSION_MUTATION, UPDATE_TENANT_CART_MUTATION} from "../framework/graphql";
import {request} from "graphql-request";
import useUser from "../lib/useUser";
import {useRouter} from "next/router";
import PhoneInput from "react-phone-input-2";
import useFormPersist from "react-hook-form-persist";

const Home = ({}) => {
    const router = useRouter()
    const data = router.query;
    console.log(data)
    const {
        register,watch,
        setValue, handleSubmit, getValues, formState: {errors},
    } = useForm({
        defaultValues: {
            date: data?.date ?? '',
            zipcode : data?.receiver_postalCode ?? '',
            sender_zipcode: data?.sender_postalCode ?? '',
        }
    })
    useFormPersist("form2", {
        watch,
        setValue,
    });
    const [unit, setUnit] = useState(data?.unit ?? 'metric')
    const [country, setCountry] = useState(data?.receiver_countryCode?.toLowerCase() ??'om')
    const [receiver_phone, setReceiver_phone] = useState('')
    const [sender_phone, setSender_phone] = useState('')

    const [loading, setLoading] = useState(false)

    const [searchResults, setSearchResults] = useState([])
    const [addressType, setAddressType] = useState('saved_Address')

    const [packages, setPackages] = useState([{
        length: data?.length ?? '', width: data?.width ?? '', height: data?.height ?? '', weight: data?.weight ?? '', type: 'box_rigid'
    }])
    const handleAddPackage = () => {
        const temp = [...packages]
        temp.push({
            length: '', width: '', height: '', weight: '', type: 'box_rigid'
        })
        setPackages(temp)
    }
    const [items, setItems] = useState([])
    const {user} = useUser()

    const onSubmit = async (data) => {
        setLoading(true)
        const {
            city, zipcode, sender_city, sender_zipcode, date
        } = data
        const weight_units = unit === 'metric' ? "KG" : "LB"
        const length_units = unit === 'metric' ? "CM" : "IN"
        const requestedPackageLineItems = []
        for (let i = 0; i < packages.length; i++) {
            requestedPackageLineItems.push({
                "weight": {
                    "units": weight_units, // Enum: "KG" "LB"
                    "value": packages[i].weight
                },

                "dimensions": {
                    "length": packages[i].length,
                    "width": packages[i].width,
                    "height": packages[i].height,
                    "units": length_units
                }

            })
        }
        const body = {
            sender_countryCode: 'us',
            sender_postalCode: sender_zipcode,
            sender_city: sender_city,
            receiver_countryCode: country,
            receiver_postalCode: zipcode,
            receiver_city: city,
            requestedPackageLineItems,
            items,
            date: date
        }
        const full_data = {
            ...data,
            items,
            requestedPackageLineItems,
            sender_phone,
            receiver_phone,
            receiver_countryCode: country
        }
        console.log(full_data)
        const sk = await handleAddCart()
        const price = await handleGetPrice(body)
        await handleUpdateCart(sk, {price,...full_data})
        await handleMakeCheckOut(sk)
        await router.push('/shipments')
        setLoading(false)
    }
    const handleAddCart = async () => {
        const endpoint = process.env.API_URL + `/instanna`;
        const variables = {secureKey: null};

        try {
            const data = await request(endpoint, CART, variables, {
                Authorization: `Bearer ${user.id_token}`, 'Accept-Language': 'en-us',
            });
            return data.cart.secureKey;
        } catch (error) {
            console.error('Error fetching cart data:', error);
            throw error;
        }
    }

    async function handleUpdateCart(secureKey, additionalInfo) {
        const endpoint = process.env.API_URL + `/instanna`;
        const variables = {secureKey, items: [], isMerge: true, additional_info: JSON.stringify(additionalInfo)};

        try {
            const data = await request(endpoint, UPDATE_TENANT_CART_MUTATION, variables, {
                Authorization: `Bearer ${user.id_token}`, 'Accept-Language': 'en-us',
            });
            return data;
        } catch (error) {
            console.error('Error updating tenant cart:', error);
            throw error;
        }
    }

    const handleGetPrice = async (body) => {
        console.log(body)
        setLoading(true)
        try {
            const data = await axios.post('/api/rates_fedex', body, {
                headers: {Authorization: `Bearer ${user.id_token}`, 'Accept-Language': 'en-us'}

            })
            const rates = data.data.output.rateReplyDetails
            for (let i = 0; i < rates.length; i++) {
                if (rates[i].serviceType === 'FEDEX_INTERNATIONAL_CONNECT_PLUS') {
                    return rates[i].ratedShipmentDetails[0].totalNetChargeWithDutiesAndTaxes
                }
            }
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    async function handleMakeCheckOut(secureKey) {
        const endpoint = process.env.API_URL + `/instanna`;
        const variables = {secureKey, items: []};

        try {
            const data = await request(endpoint, CREATE_CHECKOUT_SESSION_MUTATION, variables, {
                Authorization: `Bearer ${user.id_token}`, 'Accept-Language': 'en-us',
            });
            return data;
        } catch (error) {
            console.error('Error creating checkout session:', error);
            throw error;
        }
    }

    const checkInputs = () => {
        if(receiver_phone.length < 6 || sender_phone.length < 6)
            return true
        for (const packageItem of packages) {
            for (const key in packageItem) {
                if (packageItem[key] === '') {
                    return true;
                }
            }
        }
        return false;
    };

    function searchItems(query) {
        if (query.length > 2) setSearchResults(ITEMS.filter(item => item.description.toLowerCase().includes(query.toLowerCase())).slice(0, 3))
        else
            setSearchResults([])

    }

    return (<Layout>
        <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto p-4">
            <h1 className="text-6xl font-bold text-center mb-16">
                Create a Shipping Label
            </h1>
            <h2 className="text-xl font-bold mb-4">
                Ship To
            </h2>
            <div className="w-full gap-4 mb-4">
                <select value={country} onChange={(e) => setCountry(e.target.value)}
                        className="border border-gray-400 p-2 rounded w-full">
                    {COUNTRIES.map((country, idx) => {
                        return (<option key={idx} value={country.value.toLowerCase()}>
                            {country.label}
                        </option>)
                    })}
                </select>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <input {...register('email', {required: false, maxLength: 50})}
                       className="border border-gray-400 p-2 rounded" placeholder="Email (optional)" type="email"/>
                <PhoneInput
                    inputStyle={{height: "100%", width: "100%"}}
                    disableDropdown
                    country={country.toLowerCase()}
                    value={receiver_phone}
                    onChange={phone => setReceiver_phone(phone)}
                />

            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <input {...register('name', {required: true, maxLength: 50})}
                       className="border border-gray-400 p-2 rounded" placeholder="Name" type="text"/>
                <input {...register('company', {required: false, maxLength: 50})}
                       className="border border-gray-400 p-2 rounded" placeholder="Company (optional)" type="text"/>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <input {...register('city', {required: true, maxLength: 50})}
                       className="border border-gray-400 p-2 rounded" placeholder="City" type="text"/>
                <input {...register('state', {required: true, maxLength: 50})}
                       className="border border-gray-400 p-2 rounded" placeholder="State" type="text"/>

                <input {...register('address', {required: true, maxLength: 500})}
                       className="border col-span-2 border-gray-400 p-2 rounded" placeholder="Address" type="text"/>
                <input {...register('zipcode', {required: true, maxLength: 50})}
                       className="border border-gray-400 p-2 rounded" placeholder="Zipcode" type="text"/>
                <input {...register('address_opt', {required: false, maxLength: 50})}
                       className="border border-gray-400 p-2 rounded"
                       placeholder="Apt / Unit / Suite / etc. (optional)" type="text"/>
            </div>


            <h2 className="text-xl font-bold mb-4">
                Ship From
            </h2>
            <select disabled onChange={(e) => setAddressType(e.target.value)}
                    className="border border-gray-400 p-2 rounded mb-4">
                <option selected value={'saved_Address'}>
                    Don't use saved Ship From Address
                </option>
                <option value={'new_Address'}>
                    Create New Ship From Address
                </option>
            </select>
            {addressType !== 'new_Address' && <div className={"w-full"}>
                {/*<h3 className="text-lg font-semibold mb-2">*/}
                {/*    Physical Address*/}
                {/*    /!*    <span className="text-blue-500">*!/*/}
                {/*    /!*    Learn more*!/*/}
                {/*    /!*</span>*!/*/}
                {/*</h3>*/}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <input {...register('sender_name', {required: false, maxLength: 50})}
                           className="border border-gray-400 p-2 rounded" placeholder="Name (optional)"
                           type="text"/>
                    <input {...register('sender_company', {required: false, maxLength: 50})}
                           className="border border-gray-400 p-2 rounded" placeholder="Company (optional)"
                           type="text"/>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <input {...register('sender_address', {required: true, maxLength: 500})}
                           className="border border-gray-400 p-2 rounded" placeholder="Address" type="text"/>
                    <input {...register('sender_address_opt', {required: false, maxLength: 50})}
                           className="border border-gray-400 p-2 rounded"
                           placeholder="Apt / Unit / Suite / etc. (optional)" type="text"/>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <input {...register('sender_city', {required: true, maxLength: 50})}
                           className="border border-gray-400 p-2 rounded" placeholder="City" type="text"/>
                    {/*<select {...register('sender_city1', {required: true, maxLength: 50})}*/}
                    {/*        className="border border-gray-400 p-2 rounded">*/}
                    {/*    <option>*/}
                    {/*        Alabama*/}
                    {/*    </option>*/}
                    {/*</select>*/}
                    <input {...register('sender_zipcode', {required: true, maxLength: 50})}
                           className="border border-gray-400 p-2 rounded" placeholder="Zipcode" type="text"/>
                    <PhoneInput
                        inputStyle={{height: "100%", width: "100%"}}
                        value={sender_phone}
                        onChange={phone => setSender_phone(phone)}
                    />
                </div>
                {/*<div className="mb-4">*/}
                {/*    <input {...register('save_ship', {required: false})} className="mr-2"*/}
                {/*           type="checkbox"/>*/}
                {/*    Save Ship From Address*/}
                {/*    <input {...register('ship_nickname', {required: true, maxLength: 50})}*/}
                {/*           className="border border-gray-400 p-2 rounded ml-2"*/}
                {/*           placeholder="Nickname this Ship From Address" type="text"/>*/}
                {/*</div>*/}
            </div>}
            <h2 className="text-xl font-bold mb-4">
                Date
            </h2>
            <input {...register('date', {required: true, maxLength: 50})}
                   className="border border-gray-400 p-2 rounded w-full" placeholder="Date" type="date"/>
            <div className={"flex justify-between border-t pt-4 items-start w-full"}>
                <h2 className="text-2xl font-bold mb-4 ">
                    Packages
                </h2>
                <div className={"flex items-center justify-center"}>
                    <Toggle unit={unit} setUnit={setUnit}/>
                    <button type={"button"} onClick={handleAddPackage}
                            className={'ml-4 disabled:bg-gray-500 font-semibold bg-blue-600 hover:bg-blue-700 p-2 text-white rounded'}>ADD
                        Package
                    </button>
                </div>

            </div>
            {packages.map((item, idx) => {
                return (<Package len={packages.length} unit={unit} setPackages={setPackages} index={idx} key={idx}
                                 package_item={item}/>)
            })}
            <h2 className="text-lg font-bold mb-4 w-full">
                Commercial Invoice
            </h2>
            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">ITEM
                DESCRIPTION (IN ENGLISH)</label>
            <div className="relative mb-4">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input onChange={(e) => searchItems(e.target.value)} type="search" id="search"
                       className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="ITEM DESCRIPTION (IN ENGLISH)"/>
            </div>
            {searchResults && <div className={"flex flex-col  divide-y "}>
                {searchResults.map((item, idx) => {
                    return (<div key={idx} onClick={() => {
                        setSearchResults([])
                        setItems([...items, item])
                    }} className={"cursor-pointer hover:bg-gray-200 py-2 px-1 "}>
                        {item.description}
                    </div>)
                })}
            </div>}
            {items.map((item, idx) => {
                return (<Item item={item} setItems={setItems} index={idx} key={idx}
                />)
            })}

            <div className="flex w-full mt-4 items-end justify-end">
                <Link className="bg-gray-400 text-white px-4 py-2 rounded mr-2" href={'/'}>
                    CANCEL
                </Link>
                <button disabled={checkInputs() || loading} type="submit"
                        className="bg-blue-500 disabled:bg-gray-400 text-white px-4 py-2 rounded">
                    {loading ? 'Loading...' : 'SAVE'}
                </button>
            </div>
        </form>
    </Layout>)
}

export default Home

export const getServerSideProps = async ({ req, res, query }) => {
    const session = await getIronSession(req, res, sessionOptions);

    if (!session.username) {
        const destination = `/login?redirect=/create_shipment&${new URLSearchParams(query).toString()}`;
        return {
            redirect: {
                destination,
                permanent: false,
            },
        };
    }

    return {
        props: {
            user: session.username,
            query,
        },
    };
};

