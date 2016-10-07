// @AngularClass

/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var path = require('path'),
	webpack = require('webpack'),
	CopyWebpackPlugin = require('copy-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	ENV = process.env.ENV = process.env.NODE_ENV = 'development',
	ExtractTextPlugin = require("extract-text-webpack-plugin"),
	appConfig = require('./app-config.js');

var metadata = {
	title: (
		(appConfig.ENV && appConfig.ENV.dev && appConfig.ENV.dev.title)
		|| appConfig.title
		|| 'Project Admin Area'
	),
	baseUrl: (
		(appConfig.ENV && appConfig.ENV.dev && appConfig.ENV.dev.baseUrl)
		|| appConfig.baseUrl
		|| './'
	),
	host: (
		(appConfig.ENV && appConfig.ENV.dev && appConfig.ENV.dev.server && appConfig.ENV.dev.server.host)
		|| (appConfig.server && appConfig.server.host)
		|| 'localhost'
	),
	port: (
		(appConfig.ENV && appConfig.ENV.dev && appConfig.ENV.dev.server && appConfig.ENV.dev.server.port)
		|| (appConfig.server && appConfig.server.port)
		|| 3000
	),
	theme: (
		(appConfig.ENV && appConfig.ENV.dev && appConfig.ENV.dev.theme)
		|| appConfig.theme
		|| 'default'
	),
	restAPI: (
		(appConfig.ENV && appConfig.ENV.dev && appConfig.ENV.dev.restAPI)
		|| appConfig.restAPI
	),
	ENV: ENV
};

/*
 * Config
 */
module.exports = {
	// static data for index.html
	metadata: metadata,
	// for faster builds use 'eval'
	devtool: 'source-map',
	debug: true,
	// cache: false,

	// our angular app
	entry: {
		polyfills: './src/polyfills.ts',
		main: './src/main.ts',
		main_css: './src/theme/' + metadata.theme + '/main.scss'
	},

	// Config for our build files
	output: {
		path: root('../web/admin'),
		filename: '[name].bundle.js',
		sourceMapFilename: '[name].map',
		chunkFilename: '[id].chunk.js'
	},

	resolve: {
		// ensure loader extensions match
		extensions: prepend(['.ts', '.js', '.json', '.css', '.scss', '.html'], '.async') // ensure .async.ts etc also works
	},

	module: {
		preLoaders: [
			// { test: /\.ts$/, loader: 'tslint-loader', exclude: [ root('node_modules') ] },
			// TODO(gdi2290): `exclude: [ root('node_modules/rxjs') ]` fixed with rxjs 5 beta.2 release
			{test: /\.js$/, loader: "source-map-loader", exclude: [root('node_modules/rxjs')]}
		],
		loaders: [
			// Support Angular 2 async routes via .async.ts
			{test: /\.async\.ts$/, loaders: ['es6-promise-loader', 'ts-loader'], exclude: [/\.(spec|e2e)\.ts$/]},

			// Support for .ts files.
			{test: /\.ts$/, loader: 'ts-loader', exclude: [/\.(spec|e2e|async)\.ts$/]},

			// Support for *.json files.
			{test: /\.json$/, loader: 'json-loader'},

			// Support for CSS as raw text
			{test: /\.css$/, loader: 'raw-loader', exclude: /main\.css$/},
			{test: /\.scss$/, loaders: ['raw-loader', 'sass?sourceMap'], exclude: /main\.scss$/},

			{test: /main\.css$/, loader: ExtractTextPlugin.extract('style', 'css')},
			{test: /main\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass?sourceMap')},

			// support for .html as raw text
			{test: /\.html$/, loader: 'raw-loader', exclude: [root('src/index.html')]},

			{test: /.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=200000'}
		]
	},

	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(true),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'polyfills',
			filename: 'polyfills.bundle.js',
			minChunks: Infinity
		}),
		// static assets
		new CopyWebpackPlugin([{from: 'src/assets', to: 'assets'}]),
		// generating html
		new HtmlWebpackPlugin({template: 'src/index.html'}),
		// replace
		new webpack.DefinePlugin({
			'process.env': {
				'ENV': JSON.stringify(metadata.ENV),
				'NODE_ENV': JSON.stringify(metadata.ENV),
				restAPI: JSON.stringify(metadata.restAPI)
			}
		}),
		new webpack.ProvidePlugin({
			//$: "jquery",
			//jQuery: "jquery",
			"_": "lodash"
			//"moment": "moment"
			//"window.jQuery": "jquery"
		}),
		new ExtractTextPlugin("main.css", {
			allChunks: true
		})
	],

	// Other module loader config
	tslint: {
		emitErrors: false,
		failOnHint: false,
		resourcePath: 'src'
	},
	// our Webpack Development Server config
	devServer: {
		port: metadata.port,
		host: metadata.host,
		// contentBase: 'src/',
		historyApiFallback: true,
		watchOptions: {aggregateTimeout: 300, poll: 1000}
	},
	// we need this due to problems with es6-shim
	node: {
		global: 'window',
		progress: false,
		crypto: 'empty',
		module: false,
		clearImmediate: false,
		setImmediate: false
	}
};

// Helper functions

function root(args) {
	args = Array.prototype.slice.call(arguments, 0);
	return path.join.apply(path, [__dirname].concat(args));
}

function prepend(extensions, args) {
	args = args || [];
	if (!Array.isArray(args)) {
		args = [args]
	}
	return extensions.reduce(function (memo, val) {
		return memo.concat(val, args.map(function (prefix) {
			return prefix + val
		}));
	}, ['']);
}
function rootNode(args) {
	args = Array.prototype.slice.call(arguments, 0);
	return root.apply(path, ['node_modules'].concat(args));
}
