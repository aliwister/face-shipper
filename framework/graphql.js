export const CART = /* GraphQL */ `query cart($secureKey: String) {
    cart(secureKey: $secureKey) {
        secureKey
        currency
        gift
        cartItems {
            id
            api
            sku
            quantity
            productId
            image
            url
            title
            price
            salePrice
            currency
            slug
            unit
        }
    }
}`;
export const UPDATE_TENANT_CART_MUTATION = /* GraphQL */ `
  mutation updateTenantCart(
    $secureKey: String
    $items: [CartItemInput]
    $isMerge: Boolean
    $additional_info: String
  ) {
    updateTenantCart(
      secureKey: $secureKey
      items: $items
      isMerge: $isMerge
      additional_info: $additional_info
    ) {
      cart {
        secureKey
        currency
        gift
        additionalInfo
        cartItems {
          id
          api
          sku
          quantity
          productId
          image
          url
          title
          price
          salePrice
          currency
          slug
          unit
        }
        adjustments {
          discountReductionType
          discount {
            base
            prices
          }
        }
        cartRule {
          coupon
          autoApply
          canCombine
          enabled
          priority
          description {
            lang
            value
          }
          rules {
            minCartSize
          }
          checkoutRules {
            excludedCarriers
            excludedPayments
          }
          discountType
          reductionType
          discount {
            base
            prices
          }
        }
      }
      success
      message
    }
  }
`;
export const CREATE_CHECKOUT_SESSION_MUTATION = `
  mutation createTenantCheckout($secureKey: String, $items: [CartItemInput]) {
    createTenantCheckout(
      secureKey: $secureKey
      items: $items
    ) {
      secureKey
      redirectUrl
    }
  }
`;