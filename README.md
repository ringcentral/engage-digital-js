# ringcentral-engage-client

Simple JavaScript wrapper for RingCentral Engage API.

## Installation

### Node.js

```bash
npm i ringcentral-engage-client
```

`ringcentral-engage-client` depends on `axios`. With the code above you will have a global variable named `RingCentral.default`.


## Usage

```js
import RingCentral from 'ringcentral-engage-client'

(async () => {
  const rc = new RingCentral(process.env.RINGCENTRAL_CLIENT_ID, process.env.RINGCENTRAL_CLIENT_SECRET, process.env.RINGCENTRAL_SERVER_URL)
  await rc.authorize({ username: process.env.RINGCENTRAL_USERNAME, extension: process.env.RINGCENTRAL_EXTENSION, password: process.env.RINGCENTRAL_PASSWORD })
  const r = await rc.get('/restapi/v1.0/account/~/extension/~')
  const extension = r.data
  console.log(extension)
})()
```

[Fully working demo project](https://github.com/zxdong262/ringcentral-engage-client-js-demo)


### Get & set token

```js
const token = rc.token() // get
rc.token(token) // set
```


### Auto refresh token

Token expires. You can call `rc.refresh()` to refresh token. But normally you don't need to do that because this library will refresh for you if access token expired.


### HTTP Methods: get, post, put, delete

[HTTP Methods](/test/ringcentral.spec.js)


### Send SMS

[Send SMS](/test/sms.spec.js)


### Send Fax

[Send Fax](/test/fax.spec.js)


### Batch Get

[Batch Get](/test/batch_get.spec.js)


### More examples

Please refer to [test cases](/test).


## PubNub

```js
import PubNub from 'ringcentral-engage-client/dist/pubnub'
```

Check the [PubNub sample code](./test/pubnub.spec.js)


## Use custom axios Instance

The underlying HTTP library is [axios](https://github.com/axios/axios).

The 4th parameter of `RingCentral`'s constructor allows you to specify a custom axios Instance:

```js
const rc = new RingCentral(clientId, clientSecret, server, axiosInstance)
```

The 4th parameter is optional, if you omit it, a default `axiosInstance` with be used.


## Test

```
mv .sample.env .env
edit .env
yarn test
```
