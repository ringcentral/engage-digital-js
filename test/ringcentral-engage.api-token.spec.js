/* eslint-env jest */
import RingCentralEnage from '../src/ringcentral-engage-digital.ts'

jest.setTimeout(64000)

const rc = new RingCentralEnage(
  {
    apiToken: process.env.RINGCENTRAL_ENGAGE_API_TOKEN,
    server: process.env.RINGCENTRAL_ENGAGE_SERVER_URL
  }
)

function isError (e) {
  return e.message.includes('status code 4')
}

describe('ringcentral enagage voice api', () => {
  test('basic test', async () => {
    const r = await rc.get('/1.0/roles').catch(console.log)
    console.log(r)
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
    try {
      await rc.authorize({
        code: 'x'
      })
    } catch (e) {
      expect(isError(e)).toBe(true)
    }
    rc.token('s')
    expect(rc.token()).toBe('s')
    const u = rc.authorizeUri({})
    expect(u.startsWith(process.env.RINGCENTRAL_ENGAGE_SERVER_URL)).toBe(true)
  })
})
