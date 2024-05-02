import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import {useState} from "react";

export default ({setAddressFrom, setAddressTo}) => {
    const {placesService,
        placesAutocompleteService,
    } = usePlacesService({
        apiKey: 'AIzaSyCNLwgKASdfXKygFt61Anbz_3y4uHp1lQk'
    });
    const [results1, setResults1] = useState([])
    const [selectedResult1, setSelectedResult1] = useState("");
    const [results2, setResults2] = useState([])
    const [selectedResult2, setSelectedResult2] = useState("");
    const handleSelectChange1 = (evt,id) => {
        setSelectedResult1(evt);
        placesService?.getDetails(
            {
                placeId: id,
            },
            (placeDetails) => handleAddress(setAddressFrom,placeDetails)
        );
        setResults1([])
    };
    const handleSelectChange2 = (evt,id) => {
        setSelectedResult2(evt);
        placesService?.getDetails(
            {
                placeId: id,
            },
            (placeDetails) => handleAddress(setAddressTo,placeDetails)
        );
        setResults2([])
    };
    const handleAddress = (setAddress,placeDetails)=>{
        let country = '';
        let postalCode = '';
        placeDetails.address_components.forEach(component => {
            if (component.types.includes('country')) {
                country = component.short_name;
            } else if (component.types.includes('postal_code')) {
                postalCode = component.short_name;
            }
        });
        setAddress({countryCode: country, postalCode: postalCode})
    }
    return (
        <div className="w-full">
            <div className={"flex relative w-full justify-between items-center"}>
                <div className={"font-bold text-xl absolute top-4 left-4"}>From</div>
                <input
                    value={selectedResult1}
                    placeholder=""
                    className=" font-semibold text-xl appearance-none border-2 h-16 border-white bg-gray-200 rounded w-full py-2 px-4 pl-20 text-gray-700 leading-tight focus:outline-none focus:border-l-blue-600"
                    onChange={async (evt) => {
                        setSelectedResult1(evt.target.value);
                        if (!!evt.target.value)
                            await placesAutocompleteService?.getPlacePredictions(
                                {
                                    input: evt.target.value,componentRestrictions:{country:["us"]}
                                },
                                (placeDetails) => {
                                    setResults1(placeDetails)
                                }
                            );
                        else
                            setResults1([])
                    }}
                />
            </div>
            {results1&& <div className={"flex flex-col  divide-y pl-20"}>
                {results1.map((item) => {
                    return (<div className={"cursor-pointer hover:bg-gray-200 py-2 px-1 "} onClick={()=>handleSelectChange1(item.description,item.place_id)} >
                        {item.description}
                    </div>)
                })}
            </div>}
            <div className={"flex relative w-full justify-between items-center"}>
                <div className={"font-bold text-xl absolute top-4 left-4"}>To</div>
                <input
                    value={selectedResult2}
                    placeholder=""
                    className=" font-semibold text-xl appearance-none border-2 h-16 border-white bg-gray-200 rounded w-full py-2 px-4 pl-20 text-gray-700 leading-tight focus:outline-none focus:border-l-blue-600"
                    onChange={async (evt) => {
                        setSelectedResult2(evt.target.value);
                        if (!!evt.target.value)
                            await placesAutocompleteService?.getPlacePredictions(
                                {
                                    input: evt.target.value,componentRestrictions:{country:["sa",'om','ae']}
                                },
                                (placeDetails) => {
                                    setResults2(placeDetails)
                                }
                            );
                        else
                            setResults2([])
                    }}
                />
            </div>
            {results2&& <div className={"flex flex-col  divide-y pl-20"}>
                {results2.map((item) => {
                    return (<div className={"cursor-pointer hover:bg-gray-200 py-2 px-1 "} onClick={()=>handleSelectChange2(item.description,item.place_id)} >
                        {item.description}
                    </div>)
                })}
            </div>}
        </div>
    );
};
