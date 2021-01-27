const ftdOrigin = 'v=1&_v=j87&a=1234472703&t=event&ni=1&_s=1&dl=https%3A%2F%2Fb1brands.xcrm.com%2Fonboarding%2Fdeposit&ul=en-us&de=UTF-8&dt=Deposit%20-%20b1brands&sd=24-bit&sr=1440x900&vp=489x744&je=0&ec=Deposit&ea=FTD&el=Deposit&_u=aCHAAEALQAAAAC~&jid=251005115&gjid=33873066&cid=820893944.1609836240&uid=239990&tid=UA-127844330-1&_gid=1260304424.1611564156&_r=1&gtm=2wg1d0M7NJPXM&cd10=239990&ti=56027&tr=4&tt=0&ts=0&pa=purchase&pr1nm=FTD&pr1id=2&pr1pr=4&pr1br=b1brands&pr1ca=Trading&pr1va=none&pr1qt=1&z=1844826909';
// console.log(ftdOrigin.split('&'))

const dict = {
  'v=1',  // Version. Required.
  // '_v=j87',
  // 'a=1234472703',
  't=event', // Hit type. Required.
  'ni=1', // Non-Interaction Hit

  // '_s=1',
  'dl=https%3A%2F%2Fb1brands.xcrm.com%2Fonboarding%2Fdeposit', // Document location URL
  'ul=en-us', // User Language
  'de=UTF-8', // Document Encoding
  'dt=Deposit%20-%20b1brands', // Document Title
  'sd=24-bit', // Screen Colors
  'sr=1440x900', // Screen Resolution
  'vp=489x744', // Viewport size
  'je=0', // Java Enabled

  'ec=Deposit', // Event Category. Required. @: ?? from GTM?
  'ea=FTD', // Event Action. Required. @: event
  'el=Deposit', // Event label. @: ?? from GTM?
  // '_u=aCHAAEALQAAAAC~',
  // 'jid=251005115',
  // 'gjid=33873066',
  'cid=820893944.1609836240', // Client ID. Required if User ID (uid) is not specified in the request (usually GUID) @ ??
  'uid=239990', // User ID @ userId. Required.
  'tid=UA-127844330-1', // Tracking ID / Property ID / GA id
  // '_gid=1260304424.1611564156',
  // '_r=1',
  // 'gtm=2wg1d0M7NJPXM',
  'cd10=239990', // Custom Dimension 10 @ userId
  'ti=56027', // Transaction ID @ actionField.id
  'tr=4', // Transaction Revenue @ actionField.revenue
  'tt=0', // Transaction Tax @ actionField.tax
  'ts=0', // Transaction Shipping Cost @ actionField.shipping
  'pa=purchase', // Product Action @: actionField.action
  'pr1nm=FTD', // Product Name @: products.name
  'pr1id=2', // Product SKU @: products.id
  'pr1pr=4', // Product Price @: products.price
  'pr1br=b1brands', // Product Brand @: products.brand
  'pr1ca=Trading', // Product Category @: products.category
  'pr1va=none', // Product Variant @: products.variant
  'pr1qt=1', // Product Quantity @: products.quantity

  'z=1844826909', // Cache Buster: Used to send a random number in GET requests to ensure browsers and proxies don't cache hits. It should be sent as the final parameter of the request
}

/*
  Missed fields:
  &t=event // Event hit type

  actionField.currencyCode
 */
const ftdParsed = [
  'v=1',  // Version.
  '_v=j87',
  'a=1234472703',
  't=event', // Hit type
  'ni=1',
  '_s=1',
  'dl=https%3A%2F%2Fb1brands.xcrm.com%2Fonboarding%2Fdeposit',
  'ul=en-us',
  'de=UTF-8',
  'dt=Deposit%20-%20b1brands',
  'sd=24-bit',
  'sr=1440x900',
  'vp=489x744',
  'je=0',
  'ec=Deposit', // Event Category. Required. @: ?? from GTM?
  'ea=FTD', // Event Action. Required. @: event
  'el=Deposit', // Event label. @: ?? from GTM?
  '_u=aCHAAEALQAAAAC~',
  'jid=251005115',
  'gjid=33873066',
  'cid=820893944.1609836240', // Client ID @ ??
  'uid=239990', // User ID @ userId
  'tid=UA-127844330-1', // Tracking ID / Property ID / GA id
  '_gid=1260304424.1611564156',
  '_r=1',
  'gtm=2wg1d0M7NJPXM',
  'cd10=239990', // Custom Dimension 10 @ userId
  'ti=56027', // @actionField.id
  'tr=4', // @actionField.revenue
  'tt=0', // @actionField.tax
  'ts=0', // @actionField.shipping
  'pa=purchase', // @: actionField.action
  'pr1nm=FTD', // @: products.name
  'pr1id=2', // @: products.id
  'pr1pr=4', // @: products.price
  'pr1br=b1brands', // @: products.brand
  'pr1ca=Trading', // @: products.category
  'pr1va=none', // @: products.variant
  'pr1qt=1', // @: products.quantity

  'z=1844826909', // Cache Buster: Used to send a random number in GET requests to ensure browsers and proxies don't cache hits. It should be sent as the final parameter of the request
]

{
  event: 'FTD',
  ecommerce: {
    purchase: {
      actionField: {
        action: "purchase"
        currencyCode: "EUR"
        id: 56027
        revenue: 4
        shipping: "0"
        tax: "0"
      },
      products: [
        {
          brand: "b1brand"
          category: "Trading"
          id: "2"
          name: "FTD"
          price: 4
          quantity: 1
          variant: "none"
          event: "FTD"
        }
      ],
    }
  }
}