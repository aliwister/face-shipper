import {getIronSession} from "iron-session";
import {SessionData, sessionOptions,} from 'lib/session/lib'
import {checkoutFetcher} from '../lib/utils'
import Layout from '../components/Layout'
import {ADDRESS_DESCRIPTION} from '../constants/graphql'
import {useForm} from 'react-hook-form'
import {useState} from "react";
import Package from "../components/create-shipment/Package";
import Toggle from "../components/create-shipment/Toggle";
import {COUNTRIES, ITEMS} from "../constants";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {log} from "util";
import Item from "../components/create-shipment/Item";
import Link from "next/link";
const Home = ({}) => {
    const {
        register, handleSubmit, getValues, formState: {errors},
    } = useForm()
    const [unit, setUnit] = useState('metric')
    const [country, setCountry] = useState('om')
    const [phoneTo, setPhoneTo] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [addressType, setAddressType] = useState('new_Address')

    const [packages, setPackages] = useState([{
        length: '',
        width: '',
        height: '',
        weight: '',
        type: 'box_rigid'
    }])
    const handleAddPackage = () => {
        const temp = [...packages]
        temp.push({
            length: '',
            width: '',
            height: '',
            weight: '',
            type: 'box_rigid'
        })
        setPackages(temp)
    }
    const [items, setItems] = useState([])

    const onSubmit = (data) => {
        console.log(data)
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
    function searchItems(query) {
        if (query.length > 2)
        setSearchResults(ITEMS.filter(item =>
            item.description.toLowerCase().includes(query.toLowerCase())).slice(0, 3))
        else
            setSearchResults([])

    }
    return (
        <Layout>
            <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto p-4">
                <h1 className="text-6xl font-bold text-center mb-16">
                    Create a Shipping Label
                </h1>
                <h2 className="text-xl font-bold mb-4">
                    Ship To
                </h2>
                <div className="w-full gap-4 mb-4">
                    <select onChange={(e)=>setCountry(e.target.value)}
                            className="border border-gray-400 p-2 rounded w-full">
                        {COUNTRIES.map((country,idx)=>{
                            return(<option key={idx} value={country.value.toLowerCase()}>
                                {country.label}
                            </option>)
                        })}
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <input {...register('email', {required: false, maxLength: 50})}
                           className="border border-gray-400 p-2 rounded" placeholder="Email (optional)" type="email"/>
                    <PhoneInput
                        inputStyle={{height:"100%",width:"100%"}}
                        disableDropdown
                        country={country.toLowerCase()}
                        value={phoneTo}
                        onChange={phone => setPhoneTo(phone)}
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
                <select onChange={(e)=>setAddressType(e.target.value)}
                        className="border border-gray-400 p-2 rounded mb-4">
                    <option value={'saved_Address'}>
                        Don't use saved Ship From Address
                    </option>
                    <option selected value={'new_Address'}>
                        Create New Ship From Address
                    </option>
                </select>
                {addressType !== 'new_Address' && <div className={"w-full"}>
                    <h3 className="text-lg font-semibold mb-2">
                        Physical Address
                    {/*    <span className="text-blue-500">*/}
                    {/*    Learn more*/}
                    {/*</span>*/}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input {...register('phy_name', {required: false, maxLength: 50})}
                               className="border border-gray-400 p-2 rounded" placeholder="Name (optional)"
                               type="text"/>
                        <input {...register('phy_company', {required: false, maxLength: 50})}
                               className="border border-gray-400 p-2 rounded" placeholder="Company (optional)"
                               type="text"/>
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
                        <input {...register('save_ship', {required: false})} className="mr-2"
                               type="checkbox"/>
                        Save Ship From Address
                        <input {...register('ship_nickname', {required: true, maxLength: 50})}
                               className="border border-gray-400 p-2 rounded ml-2"
                               placeholder="Nickname this Ship From Address" type="text"/>
                    </div>
                </div>}


                <div className={"flex justify-between border-t pt-4 items-start w-full"}>
                    <h2 className="text-2xl font-bold mb-4 ">
                        Packages
                    </h2>
                    <div className={"flex items-center justify-center"}>
                        <Toggle unit={unit} setUnit={setUnit}/>
                        <button type={"button"} onClick={handleAddPackage}
                                className={'ml-4 font-semibold bg-blue-600 hover:bg-blue-700 p-2 text-white rounded'}>ADD
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
                    <input onChange={(e)=>searchItems(e.target.value)} type="search" id="search"
                           className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="ITEM DESCRIPTION (IN ENGLISH)" required/>
                </div>
                {searchResults&& <div className={"flex flex-col  divide-y "}>
                    {searchResults.map((item,idx) => {
                        return (<div key={idx} onClick={()=>{
                            setSearchResults([])
                            setItems([...items,item])}} className={"cursor-pointer hover:bg-gray-200 py-2 px-1 "}  >
                            {item.description}
                        </div>)
                    })}
                </div>}
                {items.map((item, idx) => {
                    return (<Item item={item} setItems={setItems}  index={idx} key={idx}
                                     />)
                })}

                <div className="flex w-full mt-4 items-end justify-end">
                    <Link  className="bg-gray-400 text-white px-4 py-2 rounded mr-2" href={'/'}>
                        CANCEL
                    </Link>
                    <button disabled={checkInputs()} type="submit"
                            className="bg-blue-500 disabled:bg-gray-400 text-white px-4 py-2 rounded">
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
