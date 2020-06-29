/* eslint-env jest */
import RingCentralEnage from '../src/ringcentral-engage'

jest.setTimeout(64000)

const rc = new RingCentralEnage(
  process.env.RINGCENTRAL_ENGAGE_API_TOKEN,
  process.env.RINGCENTRAL_ENGAGE_SERVER_URL
)

function isError (e) {
  return e.message.includes('status code 4')
}

describe('ringcentral enagage voice api', () => {
  test('basic test', async () => {
    const r = await rc.get('/1.0/roles')
    expect(r.data.records.length > 0).toBe(true)
    try {
      await rc.post('/1.0/roles')
    } catch (e) {
      expect(isError(e)).toBe(true)
    }
    try {
      await rc.delete('/1.0/roles')
    } catch (e) {
      expect(isError(e)).toBe(true)
    }
    try {
      await rc.put('/1.0/roles')
    } catch (e) {
      expect(isError(e)).toBe(true)
    }
    try {
      await rc.patch('/1.0/roles')
    } catch (e) {
      expect(isError(e)).toBe(true)
    }
  })
})
