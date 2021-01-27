const axios = require('axios')

// console.log(process.argv)

const config = {
  gaId: 'UA-XXXXXXXXX-X',
  validate: false,
  // Validate the request - send it to a special endpoint which analizes the request and return
  // its validation status and the parsing info
}

const params = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Charset': 'UTF-8',
  }
}

const sendEvent = (ti) => {

  const request = new URLSearchParams(`v=1&t=event&tid=${config.gaId}`)
  request.append('uid', 'u1234') // User ID
  request.append('ti', ti) // Transaction ID
  request.append('cid', '555')
  request.append('ec', 'test category uid') // Event category
  request.append('ea', 'test action') // Event action
  request.append('el', 'holiday') // Event label
  request.append('ev', 300)

  axios.post(`https://www.google-analytics.com/${config.validate ? 'debug' : ''}/collect`, request, params)
    .then((result) => {
      console.log('Success!', result.status, )
      if(config.validate){
        console.log(result.data, )
      }
    })
    .catch((err) => {
      console.log('Error!')
    })
}

sendEvent(Math.floor(Date.now() / 1000))
