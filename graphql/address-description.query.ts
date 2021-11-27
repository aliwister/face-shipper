export const ADDRESS_DESCRIPTION =`query addressDescription ($isoCode: String, $lang: String) {
        addressDescription(isoCode:$isoCode, lang:$lang) {
            inputFormat
            displayFormat
            descriptions {
                field
                label
                required
                minLength
                maxLength
                regex
                fieldType
                options {
                    label
                    value
                }
            }
            gmap
        }
    }`;