export default function Package({package_item, index, setPackages,unit,len}) {

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
    return (
        <div className={"flex flex-col items-start border-t-2  border-black p-4 w-full"}>
            <div className={"flex justify-between w-full"}>
                <h3 className="text-lg  font-semibold mb-4">
                    Package {index + 1}
                </h3>
                {len > 1 && <button onClick={() => handleDelete(index)} type="button"
                                      className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>}

            </div>

            <div className="flex gap-2 mb-4 w-full">
                <div className={'w-full'}>
                    <h2 className="text-sm  mb-1">
                        Type of Packaging
                    </h2>
                    <select
                        className="border w-full border-gray-400 p-2 rounded mb-4">
                        <option>
                            Box or Rigid Packaging
                        </option>
                    </select>
                </div>
                <span className="flex items-center justify-center">|</span>

                <div className={'w-full relative'}>
                    <h2 className="text-sm  mb-1">
                        Weight
                    </h2>
                    <input
                        className="border w-full border-gray-400 p-2 rounded" value={package_item.weight}
                        onChange={(e) => handleChange(index, 'weight', e.target.value)} placeholder="Weight"
                        type="text"/>
                    <div className={"absolute top-8 right-3 "}>{unit === 'metric' ? 'kg' : 'lb'}</div>
                </div>
                <span className="flex items-center justify-center">|</span>

                <div className={'w-full relative'}>
                    <h2 className="text-sm  mb-1">
                        Length
                    </h2>
                    <input
                        className="border w-full border-gray-400 p-2 rounded" value={package_item.length}
                        onChange={(e) => handleChange(index, 'length', e.target.value)} placeholder="Length"
                        type="text"/>
                    <div className={"absolute top-8 right-3 "}>{unit === 'metric' ? 'cm' : 'in'}</div>

                </div>
                <span className="flex items-center justify-center">x</span>

                <div className={'w-full relative'}>
                    <h2 className="text-sm  mb-1">
                        Width
                    </h2>
                    <input
                        className="border w-full border-gray-400 p-2 rounded" value={package_item.width}
                        onChange={(e) => handleChange(index, 'width', e.target.value)} placeholder="Width" type="text"/>
                    <div className={"absolute top-8 right-3 "}>{unit === 'metric' ? 'cm' : 'in'}</div>

                </div>
                <span className="flex items-center justify-center">x</span>
                <div className={'w-full relative'}>
                    <h2 className="text-sm  mb-1">
                        Height
                    </h2>
                    <input
                        className="border w-full border-gray-400 p-2 rounded" value={package_item.height}
                        onChange={(e) => handleChange(index, 'height', e.target.value)} placeholder="Height"
                        type="text"/>
                    <div className={"absolute top-8 right-3 "}>{unit === 'metric' ? 'cm' : 'in'}</div>

                </div>
            </div>


        </div>
    )
}