export const CART = /* GraphQL */ `query cart($secureKey: String) {
    cart(secureKey: $secureKey) {
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
export const TENANT_INFO_PAYMENT = `query tenantInfo {
    tenantInfo {
        subdomain
        description
        logo
        customDomain
        name
        maxProducts
        discountRate
        active
        publicPaymentProfile {
            name
            pk
            code
            html
        }
    }
}`
export const PROCESS_PAYMENT = `
  mutation processPayment($token: String, $ref: String, $secureKey: String) {
    processPayment(token: $token, ref: $ref, secureKey: $secureKey ) {
      message
      payload
      status
      ref
    }
  }
`;
export const ORDER_CONFIRMATION= `query orderConfirmation($paymentKey: String) {
  orderConfirmation(paymentKey: $paymentKey) {
    id
    reference
    confirmationKey
  }
}`;
export const ORDER_HISTORY= `query orderHistory($state: [OrderState], $offset: Int, $limit: Int) {
  orderHistory(state: $state, offset: $offset, limit: $limit) {
    items{
        additionalInfo
    }    
    total
    hasMore
  }
}`;
export const CREATE_SHIPMENT= `mutation CreateShipment($shipment: ShipmentInput!, $shipmentItems: [ShipmentItemInput]) {
  createShipment(shipment: $shipment, shipmentItems: $shipmentItems) {
    id
    estimatedShipDate
    estimatedReadyDate
    estimatedArrivalDate
    estimatedShipCost
    actualShipCost
    latestCancelDate
    handlingInstructions
    reference
    trackingNum
    trackingLink
    shipmentMethod
    shipmentType
    shipmentStatus
    customerId
    merchantId
    pkgs {
      id
      length
      width
      height
      weight
      packageType
    }
    shipmentItems {
      id
      sequence
      quantity
      description
      shipmentId
      productId
      image
      from
      price
      purchaseShipments {
        shipmentItemId
        purchaseItemId
        purchaseId
        quantity
      }
    }
    customerFirstName
    customerLastName
    merchantName
    partyId
    partyName
  }
}`;

export const ADD_SHIPMENT_DOC= `mutation AddShipmentDoc($id:Long, $filename: String) {
  addShipmentDoc(id:$id, filename: $filename) {
    value
  }
}`;