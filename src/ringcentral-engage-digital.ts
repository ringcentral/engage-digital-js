// based on tyler's work: https://github.com/tylerlong/ringcentral-js-concise
import axios, { AxiosInstance } from 'axios'
import { EventEmitter } from 'events'
import querystring from 'querystring'
import { Options, Token, Config, Data } from './types'

const version = process.env.version

/* istanbul ignore next */
class HTTPError extends Error {
  status: number
  statusText: string
  data: Data
  config: Config
  constructor (status: number, statusText: string, data: Data, config: Config) {
    super(`status: ${status}
statusText: ${statusText}
data: ${JSON.stringify(data, null, 2)}
config: ${JSON.stringify(config, null, 2)}`)
    this.status = status
    this.statusText = statusText
    this.data = data
    this.config = config
  }
}

class RingCentralEngage extends EventEmitter {
  apiToken: string | undefined
  server: string
  authUrl: string | undefined
  tokenUrl: string | undefined
  clientId: string | undefined
  clientSecret: string | undefined
  redirectUri: string | undefined
  _axios: AxiosInstance
  _token: Token | undefined

  constructor ({
    apiToken,
    server,
    authUrl,
    tokenUrl,
    clientId,
    clientSecret,
    redirectUri
  }: Options) {
    super()
    this.server = server
    this.apiToken = apiToken
    this._axios = axios.create()
    this.authUrl = authUrl
    this.tokenUrl = tokenUrl
    this.redirectUri = redirectUri
    this.clientId = clientId
    this.clientSecret = clientSecret
    const request = this._axios.request.bind(this._axios)
    this._axios.request = (config) => {
      try {
        return request(config)
      } catch (e) {
        /* istanbul ignore next */
        if (e.response) {
          throw new HTTPError(e.response.status, e.response.statusText, e.response.data, e.response.config)
        } else {
          throw e
        }
      }
    }
  }

  request (config: Config) {
    const uri = config.url.startsWith('http')
      ? config.url
      : this.server + config.url

    return this._axios.request({
      ...config,
      url: uri.toString(),
      headers: this._patchHeaders(config.headers)
    })
  }

  token (_token: Token) {
    if (arguments.length === 0) { // get
      return this._token
    }
    const tokenChanged = this._token !== _token
    this._token = _token
    if (tokenChanged) {
      this.emit('tokenChanged', _token)
    }
  }

  get (url: string, config: Config = {}) {
    return this.request({ ...config, method: 'get', url })
  }

  delete (url: string, config: Config = {}) {
    return this.request({ ...config, method: 'delete', url })
  }

  post (url: string, data: Data | undefined = undefined, config: Config = {}) {
    return this.request({ ...config, method: 'post', url, data })
  }

  put (url: string, data: Data | undefined = undefined, config: Config = {}) {
    return this.request({ ...config, method: 'put', url, data })
  }

  patch (url: string, data: Data | undefined = undefined, config: Config = {}) {
    return this.request({ ...config, method: 'patch', url, data })
  }

  _patchHeaders (headers: Data = {}) {
    const userAgentHeader = `ringcentral-engage-client-js/v${version}`
    return {
      ...headers,
      ...this._bearerAuthorizationHeader(),
      'X-User-Agent': userAgentHeader,
      'RC-User-Agent': userAgentHeader,
      'User-Agent': userAgentHeader
    }
  }

  _bearerAuthorizationHeader () {
    const token = this.apiToken ||
      (this._token ? this._token.access_token : '')
    return {
      Authorization: `Bearer ${token}`
    }
  }

  authorizeUri ({
    redirectUri = this.redirectUri,
    responseType = 'code',
    state = ''
  }) {
    const authUrl = this.authUrl ||
      this.server + '/oauth/authorize'
    const query = `?client_id=${this.clientId}&response_type=${responseType}&state=${state}&redirect_uri=${encodeURIComponent(redirectUri || '')}`
    return `${authUrl}${query}`
  }

  async authorize ({
    code,
    redirectUri = this.redirectUri
  }: {
    code: string,
    redirectUri: string | undefined
  }) {
    const tokenUrl = this.tokenUrl ||
      `${this.server}/oauth/token`
    const data = querystring.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: this.clientId,
      client_secret: this.clientSecret
    })
    const r = await this._axios.request({
      method: 'post',
      url: tokenUrl,
      data
    })
    this.token(r.data)
  }
}

export default RingCentralEngage
