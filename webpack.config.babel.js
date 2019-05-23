import webpack from 'webpack'
const pack = require('./package.json')

const defaultConfig = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/ringcentral-engage.js',
  output: {
    filename: 'ringcentral-engage.js',
    library: 'RingCentral',
    libraryTarget: 'umd',
    globalObject: 'this' // fix window undefined issue in node
  },
  externals: {
    axios: {
      commonjs: 'axios',
      commonjs2: 'axios',
      amd: 'axios',
      root: 'axios'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.version': JSON.stringify(pack.version)
    })
  ]
}

export default defaultConfig
