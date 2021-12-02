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

export const ME_PLUS = `query mePlus {
    mePlus {
      id
      firstname
      lastname
      email
      mobile
      allowPickup
      plusDiscount
      shipperMarkup
      addresses {
        id
        alias
        line1
        line2
        city
        mobile
        lng
        lat
        plusCode
      }
    }
  }`
