// based on tyler's work: https://github.com/tylerlong/ringcentral-js-concise
import axios from 'axios'
import { EventEmitter } from 'events'
import querystring from 'querystring'

const version = process.env.version

/* istanbul ignore next */
class HTTPError extends Error {
  constructor (status, statusText, data, config) {
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
  constructor ({
    apiToken,
    server,
    authUrl,
    tokenUrl,
    clientId,
    clientSecret,
    redirectUri
  }) {
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

  request (config) {
    const uri = config.url.startsWith('http')
      ? config.url
      : this.server + config.url

    return this._axios.request({
      ...config,
      url: uri.toString(),
      headers: this._patchHeaders(config.headers)
    })
  }

  token (_token) {
    if (arguments.length === 0) { // get
      return this._token
    }
    const tokenChanged = this._token !== _token
    this._token = _token
    if (tokenChanged) {
      this.emit('tokenChanged', _token)
    }
  }

  get (url, config = {}) {
    return this.request({ ...config, method: 'get', url })
  }

  delete (url, config = {}) {
    return this.request({ ...config, method: 'delete', url })
  }

  post (url, data = undefined, config = {}) {
    return this.request({ ...config, method: 'post', url, data })
  }

  put (url, data = undefined, config = {}) {
    return this.request({ ...config, method: 'put', url, data })
  }

  patch (url, data = undefined, config = {}) {
    return this.request({ ...config, method: 'patch', url, data })
  }

  _patchHeaders (headers) {
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
    return {
      Authorization: `Bearer ${this.apiToken || this._token.access_token}`
    }
  }

  authorizeUri ({
    redirectUri = this.redirectUri,
    responseType = 'code',
    state = ''
  }) {
    const authUrl = this.authUrl ||
      this.server + '/oauth/authorize'
    const query = `?client_id=${this.clientId}&response_type=${responseType}&state=${state}&redirect_uri=${encodeURIComponent(redirectUri)}`
    return `${authUrl}${query}`
  }

  async authorize ({
    code,
    redirectUri = this.redirectUri
  }, options = {}) {
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
