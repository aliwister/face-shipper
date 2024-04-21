export const COUNTRIES = [
    { value: 'OM', label: 'Oman' },
    { value: 'AE', label: 'UAE' },
    { value: 'US', label: 'USA' },
    { value: 'CN', label: 'China' },
    { value: 'SW', label: 'Switzerland' },
    { value: 'UK', label: 'UK' },
    { value: 'SP', label: 'Spain' },
    { value: 'GR', label: 'Germany' },
    { value: 'AU', label: 'Australia' },
    { value: 'SA', label: 'Saudi Arabia' },
    { value: 'SI', label: 'Slovenia' },

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
