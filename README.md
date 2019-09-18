# Ringcentral Engage Digital Client js

[![Build Status](https://travis-ci.org/ringcentral/engage-digital-client-js.svg?branch=release)](https://travis-ci.org/zxdong262/ringcentral-engage-client-js)

Simple JavaScript wrapper for RingCentral Engage API. [api docs](https://engage-api-docs.readthedocs.io/).

## Installation

### Node.js

```bash
npm i ringcentral-engage-client
```

## Usage

```js
import RingCentralEngage from 'ringcentral-engage-client'

const rc = new RingCentralEnage(
  process.env.RINGCENTRAL_ENGAGE_API_TOKEN,
  process.env.RINGCENTRAL_ENGAGE_SERVER_URL
)
let r = await rc.get('/1.0/roles').catch(console.log)
expect(r.data.records.length > 0).toBe(true)
```

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
