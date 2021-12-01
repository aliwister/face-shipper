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
