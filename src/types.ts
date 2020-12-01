
export interface Options {
  apiToken?: string,
  server: string,
  authUrl?: string,
  tokenUrl?: string,
  clientId?: string,
  clientSecret?: string,
  redirectUri?: string
}

interface TokenBase {
  access_token: string
}

export interface Token {
  [key : string]: any | TokenBase
}

export interface ConfigBase {
  url?: string,
  headers?: Object
}

export interface Config {
  [key : string]: any | ConfigBase
}

export interface Data {
  [key : string]: any
}
