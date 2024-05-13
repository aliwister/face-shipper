export default function Item({item, index, setItems}) {

    const handleChange = (index, fieldName, newValue) => {
        setItems(prevPackages => {
            const updatedPackages = [...prevPackages];
            updatedPackages[index][fieldName] = newValue;
            return updatedPackages;
        });
    };
    const handleDelete = (index) => {
        setItems(prevPackages => {
            const updatedPackages = [...prevPackages];
            updatedPackages.splice(index, 1);
            return updatedPackages;
        });
    };
    return (<div className={"flex flex-col items-start border-t-2  border-black p-4 w-full"}>
            <div className={"flex justify-between w-full"}>
                <h3 className="text-lg  font-semibold mb-2">
                    Item {index + 1}
                </h3>
                <button onClick={() => handleDelete(index)} type="button"
                        className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete
                </button>

            </div>


            <div className="flex gap-2 mb-2 w-full">


                <div className="grid grid-cols-6 gap-1 mb-2 w-full">
                    <div className={'w-full'}>
                        <h2 className="text-sm  mb-1">
                            Name
                        </h2>
                        <input onChange={(e) => handleChange(index, 'name', e.target.value)}
                               className="border w-full border-gray-400 p-2 rounded mb-2"
                               value={item.name} placeholder="COUNTRY/TERRITORY OF MANUFACTURE"
                               type="text"/>
                    </div>
                    <div className={'w-full'}>
                        <h2 className="text-sm  mb-1">
                            COUNTRY OF MANUFACTURE
                        </h2>
                        <input onChange={(e) => handleChange(index, 'countryOfManufacture', e.target.value)}
                               className="border w-full border-gray-400 p-2 rounded mb-2"
                               value={item.countryOfManufacture} placeholder="COUNTRY/TERRITORY OF MANUFACTURE"
                               type="text"/>
                    </div>
                    <div className={'w-full'}>
                        <h2 className="text-sm  mb-1">
                            QUANTITY
                        </h2>
                        <div className="flex  w">
                            <input onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                                   className="border w-full border-gray-400 p-2 rounded" value={item.quantity}
                                   placeholder="QUANTITY" type="text"/>
                            <select disabled
                                    className="border  border-gray-400 p-2 rounded">
                                <option>
                                    {item.quantityUnits}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className={'w-full'}>
                        <h2 className="text-sm  mb-1">
                            NET WEIGHT
                        </h2>
                        <div className="flex ">
                            <input onChange={(e) => handleChange(index, 'weight', {units:item.weight.units,value:e.target.value})}
                                   className="border w-full border-gray-400 p-2 rounded" value={item.weight.value}
                                   placeholder="NET WEIGHT" type="text"/>
                            <select disabled
                                    className="border border-gray-400 p-2 rounded">
                                <option>
                                    {item.weight.units}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className={'w-full'}>
                        <h2 className="text-sm  mb-1">
                            CUSTOMS VALUE
                        </h2>
                        <div className="flex ">
                            <input onChange={(e) => handleChange(index, 'customsValue', {currency:item.customsValue.currency,amount:e.target.value})}
                                   className="border w-full border-gray-400 p-2 rounded" value={item.customsValue.amount}
                                   placeholder="CUSTOMS VALUE" type="text"/>
                            <select disabled
                                    className="border border-gray-400 p-2 rounded">
                                <option>
                                    {item.customsValue.currency}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className={'w-full'}>
                        <h2 className="text-sm  mb-1">
                            HARMONIZED CODE
                        </h2>
                        <input onChange={(e) => handleChange(index, 'harmonizedCode', e.target.value)}
                               className="border w-full border-gray-400 p-2 rounded mb-2" value={item.harmonizedCode}
                               placeholder="HARMONIZED CODE" type="text"/>
                    </div>
                    <div className={'w-full col-span-6'}>
                        <h2 className="text-sm  mb-1">
                            ITEM DESCRIPTION
                        </h2>
                        <input onChange={(e) => handleChange(index, 'description', e.target.value)}
                               className="border w-full border-gray-400 p-2 rounded mb-2" value={item.description}
                               placeholder="ITEM DESCRIPTION "
                               type="text"/>

                    </div>

                </div>

            </div>


        </div>)
}