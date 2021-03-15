import webpack from 'webpack'
const pack = require('./package.json')

const defaultConfig = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/ringcentral-engage-digital.ts',
  output: {
    filename: 'ringcentral-engage-digital.js',
    library: 'RingCentralEngageDigital',
    libraryTarget: 'umd',
    globalObject: 'this' // fix window undefined issue in node
  },
  resolve: {
    fallback: {
      url: require.resolve('url'),
      querystring: require.resolve('querystring-es3')
    },
    extensions: ['.tsx', '.ts', '.js']
  },
  externals: {
    axios: {
      commonjs: 'axios',
      commonjs2: 'axios',
      amd: 'axios',
      root: 'axios'
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.version': JSON.stringify(pack.version)
    })
  ]
}

export default defaultConfig
