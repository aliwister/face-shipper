export default function Package({package_item,index,setPackages}) {

    const handleChange = (index, fieldName, newValue) => {
        setPackages(prevPackages => {
            const updatedPackages = [...prevPackages];
            updatedPackages[index][fieldName] = newValue;
            return updatedPackages;
        });
    };
    const handleDelete = (index) => {
        setPackages(prevPackages => {
            const updatedPackages = [...prevPackages];
            updatedPackages.splice(index, 1);
            return updatedPackages;
        });
    };

    return(
        <div className={"flex flex-col border p-4 w-full"}>
            <div className={"flex justify-between"}>
                <h3 className="text-lg  font-bold mb-4">
                    Package {index+1}
                </h3>
                {index > 0 && <button onClick={()=>handleDelete(index)} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>}

            </div>

            <h3 className="text-md  font-bold mb-4">
                Package Details (Inches/pounds)
            </h3>
            <div className="flex gap-2 mb-4">
                <input
                    className="border border-gray-400 p-2 rounded" value={package_item.weight} onChange={(e)=>handleChange(index,'weight',e.target.value)}  placeholder="Weight" type="text"/>
                <span className="flex items-center justify-center">|</span>
                <input
                    className="border border-gray-400 p-2 rounded" value={package_item.length} onChange={(e)=>handleChange(index,'length',e.target.value)}  placeholder="Length" type="text"/>
                <span className="flex items-center justify-center">x</span>
                <input
                    className="border border-gray-400 p-2 rounded" value={package_item.width} onChange={(e)=>handleChange(index,'width',e.target.value)} placeholder="Width" type="text"/>
                <span className="flex items-center justify-center">x</span>
                <input
                    className="border border-gray-400 p-2 rounded" value={package_item.height} onChange={(e)=>handleChange(index,'height',e.target.value)} placeholder="Height" type="text"/>
            </div>
            <h2 className="text-lg font-bold mb-4">
                Package contents
            </h2>
            <input
                className="border border-gray-400 p-2 rounded mb-4" value={package_item.description} onChange={(e)=>handleChange(index,'description',e.target.value)} placeholder="ITEM DESCRIPTION (IN ENGLISH)"
                type="text"/>
            <input
                className="border border-gray-400 p-2 rounded mb-4" value={package_item.hc} onChange={(e)=>handleChange(index,'hc',e.target.value)} placeholder="HARMONIZED CODE" type="text"/>
            <div className="grid grid-cols-3 gap-4 mb-4">
                <select
                    className="border border-gray-400 p-2 rounded">
                    <option>
                        COUNTRY/TERRITORY OF MANUFACTURE
                    </option>
                </select>
                <input
                    className="border border-gray-400 p-2 rounded" value={package_item.quantity} onChange={(e)=>handleChange(index,'quantity',e.target.value)} placeholder="QUANTITY" type="text"/>
                <select
                    className="border border-gray-400 p-2 rounded">
                    <option>
                        UNIT
                    </option>
                </select>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <select
                    className="border border-gray-400 p-2 rounded">
                    <option>
                        Enter as totals
                    </option>
                </select>
                <div className="grid grid-cols-2 gap-4">
                            <span className="flex items-center justify-center">
                                NET WEIGHT
                            </span>
                    <select
                        className="border border-gray-400 p-2 rounded">
                        <option>
                            lb
                        </option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                        <span className="flex items-center justify-center">
                        CUSTOMS VALUE
                            </span>
                <select
                    className="border border-gray-400 p-2 rounded">
                    <option>
                        USD
                    </option>
                </select>
            </div>
        </div>
    )
}