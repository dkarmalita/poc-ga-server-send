const axios = require('axios')

const params = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Charset': 'UTF-8',
  }
}

/*
Path
https://www.google-analytics.com/j/collect?v=1&_v=j87&a=1234472703&t=event&ni=1&_s=1&dl=https%3A%2F%2Fb1brands.xcrm.com%2Fonboarding%2Fdeposit&ul=en-us&de=UTF-8&dt=Deposit%20-%20b1brands&sd=24-bit&sr=1440x900&vp=489x744&je=0&ec=Deposit&ea=FTD&el=Deposit&_u=aCHAAEALQAAAAC~&jid=251005115&gjid=33873066&cid=820893944.1609836240&uid=239990&tid=UA-127844330-1&_gid=1260304424.1611564156&_r=1&gtm=2wg1d0M7NJPXM&cd10=239990&ti=56027&tr=4&tt=0&ts=0&pa=purchase&pr1nm=FTD&pr1id=2&pr1pr=4&pr1br=b1brands&pr1ca=Trading&pr1va=none&pr1qt=1&z=1844826909

FTD payload
v=1&_v=j87&a=1234472703&t=event&ni=1&_s=1&dl=https%3A%2F%2Fb1brands.xcrm.com%2Fonboarding%2Fdeposit&ul=en-us&de=UTF-8&dt=Deposit%20-%20b1brands&sd=24-bit&sr=1440x900&vp=489x744&je=0&ec=Deposit&ea=FTD&el=Deposit&_u=aCHAAEALQAAAAC~&jid=251005115&gjid=33873066&cid=820893944.1609836240&uid=239990&tid=UA-127844330-1&_gid=1260304424.1611564156&_r=1&gtm=2wg1d0M7NJPXM&cd10=239990&ti=56027&tr=4&tt=0&ts=0&pa=purchase&pr1nm=FTD&pr1id=2&pr1pr=4&pr1br=b1brands&pr1ca=Trading&pr1va=none&pr1qt=1&z=1844826909
 */

const config = {
  gaId: 'UA-XXXXXXXXX-X',
}

const gaVars = {
  documentLocationUrl: 'dl', // Document location URL
  userLanguage: 'ul', // User Language
  documentEncoding: 'de', // Document Encoding
  documentTytle: 'dt', // Document Title
  screenColors: 'sd', // Screen Colors
  screenResolution: 'sr', // Screen Resolution
  viewportSize: 'vp', // Viewport size
  javaEnabled: 'je', // Java Enabled

  clientId: 'cid', // Client ID (usually GUID) ??
  userId: 'uid', // User ID @ crmId

  customDimension10: 'cd10',
  eventCatigory: 'ec',
  eventAction: 'ea',
  eventLabel: 'el',

  transactionId: 'ti', // Transaction ID @ actionField.id
  transactionRevenue: 'tr', // Transaction Revenue @ actionField.revenue
  transactionTax: 'tt', // Transaction Tax @ actionField.tax
  transactionShippingCost: 'ts', // Transaction Shipping Cost @ actionField.shipping
  productAction: 'pa', // Product Action @: actionField.action

  productName: 'pr1nm', // Product Name @: products.name
  productSku: 'pr1id', // Product SKU @: products.id
  productPrice: 'pr1pr', // Product Price @: products.price
  productBrand: 'pr1br', // Product Brand @: products.brand
  productCategory: 'pr1ca', // Product Category @: products.category
  productVariant: 'pr1va', // Product Variant @: products.variant
  productQuantity: 'pr1qt', // Product Quantity @: products.quantity
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function GaEvent(params){
  const payload = new URLSearchParams()

  // Main request params
  payload.append('v', 1) // Version. Required.
  payload.append('t', 'event') // Hit type. Required.
  payload.append('ni', 1) // Non-Interaction Hit
  payload.append('tid', config.gaId) // Tracking ID / Property ID / GA id. Required.

  Object.keys(params).forEach(k => {
    payload.append(gaVars[k], params[k])
  })

  payload.append('z', getRandomInt(9999999999)) // Cache Buster

  return payload
}

const createDepositParams = ({
  crmId,
  depositType,
  amount,
  currency,
  brand,
}) => ({
  clientId: '820893944.1609836240',
  userId: crmId,
  customDimension10: crmId,

  transactionId: depositType, // Transaction ID @ actionField.id
  transactionRevenue: amount, // Transaction Revenue @ actionField.revenue
  transactionTax: '0', // Transaction Tax @ actionField.tax
  transactionShippingCost: '0', // Transaction Shipping Cost @ actionField.shipping

  productAction: 'purchase', // Product Action @: actionField.action

  productName: depositType, // Product Name @: products.name
  productSku: depositType === 'FTD' ? '1' : '2', // Product SKU @: products.id
  productPrice: amount, // Product Price @: products.price
  productBrand: brand, // Product Brand @: products.brand
  productCategory: 'Trading', // Product Category @: products.category
  productVariant: 'none', // Product Variant @: products.variant
  productQuantity: '1', // Product Quantity @: products.quantity
  eventAction: 'Deposit',
  eventCatigory: 'Deposit',
  eventLabel: 'Deposit',


  // currencyCode: currency, // LOST !!!

})

const sendEvent = (payload, validate) =>
  axios.post(`https://www.google-analytics.com/${validate ? 'debug' : ''}/collect`, payload, params)
    .then((result) => {
      console.log('Success!', result.status, )
      if(validate){
        console.log(result.data)
      }
    })
    .catch((err) => {
      console.log('Error!')
    })

const depositEvent = new GaEvent({
  // General params
  // documentLocationUrl: 'https://markets.xcrm.com/onboarding/deposit',
  // userLanguage: 'en-us',
  // documentEncoding: 'UTF-8',
  // documentTytle: 'Deposit - b1brand',
  // screenColors: '24-bit',
  // screenResolution: '1440x900',
  // viewportSize: '489x744',
  // javaEnabled: '0',

  ...createDepositParams({ crmId: '239990', depositType: 'FTD', amount: 555, brand: 'b1brands'})
})

sendEvent(depositEvent, false)
console.log(depositEvent.toString())
