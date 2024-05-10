import React, { useState } from 'react'

const Toggle = ({unit,setUnit}) => {

    const handleChange = (event) => {
        setUnit(event.target.value);
    };

    return (
        <div>
            <select
                className="bg-gray-50 mr-4 border border-gray-300 font-bold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={unit}
                onChange={handleChange}
            >
                <option value="metric">Metric(kg,cm)</option>
                <option value="imperial">Imperial(lb,in)</option>
            </select>
        </div>
    );

    // return (
    //     <div className={"flex justify-center items-center"}>
    //         {/*<div className={"font-bold text-2xl mr-8"}>*/}
    //         {/*    Unit*/}
    //         {/*</div>*/}
    //         <label className='themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white p-1'>
    //             <input
    //                 type='checkbox'
    //                 className='sr-only'
    //                 checked={unit === 'metric'}
    //                 onChange={()=>setUnit(unit === 'metric' ? 'imperial' : 'metric')}
    //             />
    //             <span
    //                 className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
    //                     (unit === 'metric') ? 'text-primary bg-blue-600 text-white' : 'text-body-color'
    //                 }`}
    //             >
    //
    //       Metric(kg,cm)
    //     </span>
    //             <span
    //                 className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
    //                     !(unit === 'metric') ? 'text-primary bg-blue-600 text-white' : 'text-body-color'
    //                 }`}
    //             >
    //
    //       Imperial(lb,in)
    //     </span>
    //         </label>
    //     </div>
    // )
}

export default Toggle
