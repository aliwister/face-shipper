import React, {useState} from 'react'

import {useForm} from 'react-hook-form'
import axios from 'axios'
import AddressAutoComplete from "../Rates/form/AddressAutoComplete";
import Toggle from "../create-shipment/Toggle";
import RatesBox from "../Rates/RatesBox";
import {useRouter} from "next/router";

function QuoteForm() {
    const [unit, setUnit] = useState('metric')
    const [addressFrom, setAddressFrom] = useState({countryCode: 'us', postalCode: ''})
    const [addressTo, setAddressTo] = useState({countryCode: '', postalCode: ''})
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState(null)
    const [date, setDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)))
    const [finalData, setFinalData] = useState({})
    const router = useRouter()
    const {
        register, handleSubmit, getValues, formState: {errors},
    } = useForm()
    const getAddress = (country, address, handleSet) => {
        const body = {
            "location": {
                "address": {
                    "streetLines": ["10 FedEx Parkway", "Suite 302"],
                    "city": "Beverly Hills",
                    "stateOrProvinceCode": "CA",
                    "postalCode": "90210",
                    "countryCode": country,
                },
            }
        }
    }
    const onSubmit = async (data) => {
        const {
            weight,
            width,
            height,
            length,
        } = data
        const weight_units = unit === 'metric' ? "KG" : "LB"
        const length_units = unit === 'metric' ? "CM" : "IN"
        const requestedPackageLineItems = [
            {
                "weight": {
                    "units": weight_units, // Enum: "KG" "LB"
                    "value": weight
                },
                ...(length && {
                    "dimensions": {
                        "length": length,
                        "width": width,
                        "height": height,
                        "units": length_units
                    }
                })
            }
        ]
        const body = {
            sender_countryCode: addressFrom.countryCode,
            sender_postalCode: addressFrom.postalCode,
            receiver_countryCode: addressTo.countryCode,
            receiver_postalCode: addressTo.postalCode,
            requestedPackageLineItems,
            date: date?.toISOString().slice(0, 10),
        }
        console.log(body)
        setFinalData({...body,unit,weight,
            width,
            height,
            length})

        setLoading(true)
        try {
            const data = await axios.post('/api/rates_fedex', body)
            setResults(data)
        } catch (err) {
            setResults(err.response.data)
        } finally {
            setLoading(false)
        }
    }
    const handleSelect = () => {
        console.log(finalData)
        router.push({
            pathname: '/create_shipment',
            query: finalData
        })
    }
    return (
        <div className={"flex flex-col w-full justify-center items-center"}>
            <div className={"w-3/4 items-center flex flex-col"}>
                <h2 className={"text-center font-bold text-6xl"}>
                    Calculate Instanna's Rates
                </h2>
                <div className={"mt-16 items-center flex flex-col w-full"}>
                    <AddressAutoComplete setAddressFrom={setAddressFrom} setAddressTo={setAddressTo}/>
                    <form className={'w-full mt-16'} onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="text-xl text-left font-bold mb-4">
                            Shipping Date
                        </h2>
                        <input {...register('date', {required: true, maxLength: 50})}
                               className="border border-gray-400 p-2 rounded w-full" placeholder="Date" type="date"/>
                        <div className={'flex justify-between mt-16'}>
                            <h2 className="text-xl text-left font-bold mb-4">
                                Tell us more about your package
                            </h2>
                            <Toggle unit={unit} setUnit={setUnit}/>
                        </div>

                        <div className={"flex gap-2 mb-4 w-full mt-8"}>
                            <div className={'w-full relative'}>
                                <h2 className="text-sm  mb-1">
                                    Weight
                                </h2>
                                <input
                                    className="border w-full border-gray-400 p-2 rounded"
                                    {...register('weight', {required: true, maxLength: 50})} placeholder="Weight"
                                    type="text"/>
                                <div className={"absolute top-8 right-3 "}>{unit === 'metric' ? 'kg' : 'lb'}</div>
                            </div>

                            <div className={'w-full relative'}>
                                <h2 className="text-sm  mb-1">
                                    Length
                                </h2>
                                <input
                                    className="border w-full border-gray-400 p-2 rounded"
                                    {...register('length', {required: true, maxLength: 50})} placeholder="Length"
                                    type="text"/>
                                <div className={"absolute top-8 right-3 "}>{unit === 'metric' ? 'cm' : 'in'}</div>

                            </div>

                            <div className={'w-full relative'}>
                                <h2 className="text-sm  mb-1">
                                    Width
                                </h2>
                                <input
                                    className="border w-full border-gray-400 p-2 rounded"
                                    {...register('width', {required: true, maxLength: 50})} placeholder="Width"
                                    type="text"/>
                                <div className={"absolute top-8 right-3 "}>{unit === 'metric' ? 'cm' : 'in'}</div>

                            </div>
                            <div className={'w-full relative'}>
                                <h2 className="text-sm  mb-1">
                                    Height
                                </h2>
                                <input
                                    className="border w-full border-gray-400 p-2 rounded"
                                    {...register('height', {required: true, maxLength: 50})} placeholder="Height"
                                    type="text"/>
                                <div className={"absolute top-8 right-3 "}>{unit === 'metric' ? 'cm' : 'in'}</div>

                            </div>
                        </div>
                        <div className={"w-full flex items-center justify-center"}>
                            <button
                                className={"bg-blue-500 disabled:bg-gray-400 w-full mt-16 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                                disabled={loading} type="submit">{loading? 'Loading...' : 'Get Rates'}
                            </button>
                        </div>

                    </form>
                    {results && <RatesBox results={results.data} handleClick={() => handleSelect()}/>}

                </div>

            </div>
        </div>
    )

}

export default QuoteForm
