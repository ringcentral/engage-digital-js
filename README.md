# RingCentral Engage Digital Client for JavaScript

[![Build Status](https://travis-ci.com/ringcentral/engage-digital-js.svg?branch=release)](https://travis-ci.com/ringcentral/engage-digital-js)
[![Coverage Status](https://coveralls.io/repos/github/ringcentral/engage-digital-js/badge.svg?branch=release)](https://coveralls.io/github/ringcentral/engage-digital-js?branch=release)

Simple JavaScript wrapper for RingCentral Engage API. [api docs](https://engage-digital-api-docs.readthedocs.io/en/latest).

## Installation

### Node.js

```bash
npm i ringcentral-engage-client
```

## Usage

### Api token

https://developers.ringcentral.com/engage/digital/guide/basics/auth

```js
import RingCentralEngage from 'ringcentral-engage-client'

const rc = new RingCentralEnage(
  process.env.RINGCENTRAL_ENGAGE_API_TOKEN,
  process.env.RINGCENTRAL_ENGAGE_SERVER_URL
)
let r = await rc.get('/1.0/roles').catch(console.log)
expect(r.data.records.length > 0).toBe(true)
```

### Oauth

https://developers.ringcentral.com/engage/digital/guide/app-sdk/config

```js
import RingCentralEngage from 'ringcentral-engage-client'

const ed = new RingCentralEngage({
  server: env.RINGCENTRAL_ENGAGE_DIGITAL_SERVER,
  authUrl: env.RINGCENTRAL_ENGAGE_DIGITAL_APP_AUTH_URL,
  tokenUrl: env.RINGCENTRAL_ENGAGE_DIGITAL_APP_TOKEN_URL,
  clientId: env.RINGCENTRAL_ENGAGE_DIGITAL_APP_KEY,
  clientSecret: env.RINGCENTRAL_ENGAGE_DIGITAL_APP_SECRET,
  redirectUri: env.RINGCENTRAL_APP_SERVER + '/oauth'
})
await ed.authorize({ code })
let userInfo = await ed.get('/1.0/users/me')
userInfo = userInfo.data
const id = userInfo.id.toString()

```

Check https://github.com/ringcentral/engage-digital-app-sdk-demo-app as example

## Test

```bash
cp .sample.env .env
# edit .env fill your server and spi key
npm run test
```

## Credits

Based on [Tyler](https://github.com/tylerlong)'s [https://github.com/tylerlong/ringcentral-js-concise](https://github.com/tylerlong/ringcentral-js-concise).

## License

MIT
