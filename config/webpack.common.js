const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '..', 'build'),
		filename: 'js/[name].[chunkhash:8].js',
		chunkFilename: 'js/[name].[chunkhash:8].js'
  },
  resolve: {
		modules: ['node_modules', path.resolve(__dirname, '..', 'src')],
		extensions: [".js", ".json", ".jsx", ".css"],
		alias: {
			'@': path.resolve(__dirname, '..', 'src')
		}
	},
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [__dirname + '/node_modules'],
        use: [{ loader: 'babel-loader' }],
      },
      {
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
						options: { sourceMap: true }
					},
				  {
				    	loader: 'css-loader',
				    	options: {
				    		sourceMap: true,
				    		modules: false,
				    		importLoaders: 1
				    	}
					},
          {
            loader: 'postcss-loader', 
            options: {
              path: './',
              sourceMap: true,
              config: {
                ctx: {
                  cssnext: {},
                  cssnano: {},
                  autoprefixer: {}
                }
              }
            }
          }
				]
			}
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(['build'], {
      root: path.resolve(__dirname, '..')
    })
  ]
}
