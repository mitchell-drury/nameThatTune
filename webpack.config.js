module.exports = {
    entry: './client/index.js',
    output: {
      path: __dirname.toLowerCase(),
      filename: './public/bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
              presets: ['react', 'env', 'stage-2']
            }
          },
          {
            test: /\.css$/,
            loader: 'style-loader'
          },
          {
            test: /\.css$/,
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]_[local]_{hash:base64:5]'
            }
          }
        ]
    }
}