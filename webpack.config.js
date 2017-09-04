const webpack = require('webpack');

module.exports = function(env) {
	if (!env) {
		env = 'development';
	}
	console.log('running webpack in ' + env + ' mode');

	var config = {
		context: __dirname + '/app/client/components',

		entry: __dirname + '/app/client/components/core.js',
		output: {
			path: __dirname + '/public/assets',
			publicPath: '/',
			filename: 'bundle.js'
		},
		module: {
			loaders: [{
				test: /\.html$/,
				loader: 'html-loader'
			}, {
				test: /\.css$/,
				loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version'
			}, {
				test: /\.scss$/,
				loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version!sass-loader'
			}, {
				test: /\.js$/,
				exclude: [/node_modules/, /bower_components/],
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}, {
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			}, {
				test: /\.(ttf|otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?|(jpg|gif)$/,
				loader: 'file-loader'
			}]
		},
		plugins: [
			new webpack.ProvidePlugin({
				$: "jquery",
				jQuery: "jquery"
			})
		],

		devServer: {
			historyApiFallback: true
		},

		devtool: 'source-map'
	}

	if (env == 'production') {
		config.plugins.push(new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		}))
	}

	return config;
};