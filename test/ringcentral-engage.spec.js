/* eslint-env jest */
import RingCentralEnage from '../src/ringcentral-engage'

jest.setTimeout(64000)

const rc = new RingCentralEnage(
  process.env.RINGCENTRAL_ENGAGE_API_TOKEN,
  process.env.RINGCENTRAL_ENGAGE_SERVER_URL
)

describe('ringcentral enagage api', () => {
  test('basic test', async () => {
    let r = await rc.get('/1.0/roles')
    expect(r.data.records.length > 0).toBe(true)
  })
})
