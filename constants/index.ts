export const ITEMS = [
    {
        "description": "DOCUMENTS",
        "weight": {
            "units": "LB",
            "value": 22
        },
        "quantity": 1,
        "customsValue": {
            "amount": "100",
            "currency": "USD"
        },
        "unitPrice": {amount: 100,//todo
            currency: "USD"},
        "numberOfPieces": 1,
        "countryOfManufacture": "US",
        "quantityUnits": "PCS",
        "name": "DOCUMENTS",
        "harmonizedCode": "080211",
        "partNumber": "P11"
    },{
        name: 'suitcase',
        description: "suitcase - Attache cases, briefcases and similar containers",
        harmonizedCode : "4202.12.291000",
        countryOfManufacture : "US",
        quantity : 1,
        quantityUnits : "PCS",
        weight: {
            value: 1,
            units: "KG"
        },
        customsValue: {
            amount: 100,
            currency: "USD"
        },partNumber:'p1',"numberOfPieces": 1,
        "unitPrice": {amount: 100,//todo
            currency: "USD"}

    },
    {
        name: 'hand bag - small',
        description: "HAND BAG - Of reptile leather",
        harmonizedCode : "4202.31.300000",
        countryOfManufacture : "US",
        quantity : 1,
        quantityUnits : "PCS",
        weight: {
            value: 1,
            units: "KG"
        },
        customsValue: {
            amount: 100,
            currency: "USD"
        },partNumber:'p2',"numberOfPieces": 1,
        "unitPrice": {amount: 100,//todo
            currency: "USD"}
    },
    {
        name: 'hand bag - big',
        description: "HAND BAG - Of reptile leather",
        harmonizedCode : "4202.31.300000",
        countryOfManufacture : "US",
        quantity : 1,
        quantityUnits : "PCS",
        weight: {
            value: 10,
            units: "KG"
        },
        customsValue: {
            amount: 100,
            currency: "USD"
        },partNumber:'p3',"numberOfPieces": 1,
        "unitPrice": {amount: 100,//todo
            currency: "USD"}
    },
    {
        name: 'cereal',
        description: "Prepared foods obtained from unroasted cereal flakes or from mixtures of unroasted cereal flakes and roasted cereal flakes or swelled cereals - In airtight containers and not containing apricots, citrus fruits, peaches or pears",
        harmonizedCode : "1904.20.100000",
        countryOfManufacture : "US",
        quantity : 1,
        quantityUnits : "PCS",
        weight: {
            value: 1,
            units: "KG"
        },
        customsValue: {
            amount: 1,
            currency: "USD"
        },partNumber:'p4',"numberOfPieces": 1,
        "unitPrice": {amount: 100,//todo
            currency: "USD"}
    }
]

export const COUNTRIES = [
    { value: 'OM', label: 'Oman' },
    { value: 'AE', label: 'UAE' },
    // { value: 'US', label: 'USA' },
    // { value: 'CN', label: 'China' },
    // { value: 'SW', label: 'Switzerland' },
    // { value: 'UK', label: 'UK' },
    // { value: 'SP', label: 'Spain' },
    // { value: 'GR', label: 'Germany' },
    // { value: 'AU', label: 'Australia' },
    { value: 'SA', label: 'Saudi Arabia' },
    // { value: 'SI', label: 'Slovenia' },

]

export const DHL_ACCOUNTS = {
    // [0] will be used as default
    imp: ['959359716', '968278967', '959719994'],
    exp: ['453044439', '453016579', '453050874'],
}

export const CURRENCY_TYPES = {
    BILLC: 'Billing currency',
    PULCL: 'country public rates currency',
    BASEC: 'Base currency',
}

export const BREAKDOWN_TYPES = {
    STTXA: 'Total tax for the shipment',
    STDIS: 'Total discount for the shipment',
    SPRQT: 'Net shipment / weight charge',
}
