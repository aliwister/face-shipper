export const CART = /* GraphQL */ `query cart($secureKey: String) {     
    cart(secureKey: $secureKey) {        
        secureKey
        currency
        gift
        additionalInfo {
            sender_state
            price
            date
            zipcode
            sender_zipcode
            email
            name
            company
            city
            state
            address
            address_opt
            sender_name
            sender_company
            sender_address
            sender_address_opt
            sender_city
            sender_zipcode
            sender_phone
            receiver_phone
            receiver_countryCode
            items {
                name
                description
                harmonizedCode
                countryOfManufacture
                quantity
                quantityUnits
                weight {
                    value
                    units
                }
                customsValue {
                    amount
                    currency
                }
                partNumber
                numberOfPieces
                unitPrice {
                    amount
                    currency
                }
            }
            requestedPackageLineItems {
                weight {
                    value
                    units
                }
                dimensions {
                    length
                    width
                    height
                    units
                }
            }
        }
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
}
`;
export const UPDATE_TENANT_CART_MUTATION = /* GraphQL */ `
  mutation updateTenantCart(
    $secureKey: String
    $items: [CartItemInput]
    $isMerge: Boolean
    $additional_info: AdditionalInfoInputDto
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
export const ORDER_CONFIRMATION = `query orderConfirmation($paymentKey: String) {
  orderConfirmation(paymentKey: $paymentKey) {
    id
    reference
    confirmationKey
  }
}`;
export const ORDER_HISTORY = `query orderHistory($state: [OrderState], $offset: Int, $limit: Int) {
  orderHistory(state: $state, offset: $offset, limit: $limit) {
    items{
        id
        orderState
        additionalInfo {
            sender_state
            price
            date
            zipcode
            sender_zipcode
            email
            name
            company
            city
            state
            address
            address_opt
            sender_name
            sender_company
            sender_address
            sender_address_opt
            sender_city
            sender_zipcode
            sender_phone
            receiver_phone
            receiver_countryCode
            items {
                name
                description
                harmonizedCode
                countryOfManufacture
                quantity
                quantityUnits
                weight {
                    value
                    units
                }
                customsValue {
                    amount
                    currency
                }
                partNumber
                numberOfPieces
                unitPrice {
                    amount
                    currency
                }
            }
            requestedPackageLineItems {
                weight {
                    value
                    units
                }
                dimensions {
                    length
                    width
                    height
                    units
                }
            }
        }
    }    
    total
    hasMore
  }
}`;
export const CREATE_SHIPMENT = `mutation CreateShipment($shipment: ShipmentInput!, $shipmentItems: [ShipmentItemInput]) {
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

export const ADD_SHIPMENT_DOC = `mutation AddShipmentDoc($id:Long, $filename: String) {
  addShipmentDoc(id:$id, filename: $filename) {
    value
  }
}`;
export const ORDER_STATE = `mutation updateOrderState($id: Long, $state: OrderState) {
    updateOrderState(id: $id, state: $state) {
        id
        additionalInfo{
            date
        }
        orderState

    }
}`;
export const SHIPMENT_BY_ORDER = `query shipmentsByRef($ref: String) {
  shipmentsByRef(ref: $ref) {
    id
  }
}`;
export const SHIPMENT_DOCS = `query shipmentsDocs($id: ID) {
  shipmentsDocs(id: $id) {
    fileKey
  }
}`;