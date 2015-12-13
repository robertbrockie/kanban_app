var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

var common = {
	entry: PATHS.app,
	module: {
		loaders: [
			{
				test: /\.css$/,
				loaders: ['style', 'css'],
				include: PATHS.app
			}
		]
	},
	plugins: [ new HtmlwebpackPlugin({ title: 'Kanban App' }) ]
}

if (TARGET === 'start' || !TARGET) {
	module.exports = merge(common, {
		devtool: 'eval-source-map',
		devServer: {
			historyApiFallback: true,
			hot: true,
			inline: true,
			progress: true,
			stats: 'errors-only',
			quiet: true, // chill out on the console errors
			host: process.env.HOST,
			port: process.env.PORT
		},
		plugins: [ new webpack.HotModuleReplacementPlugin() ]
	});
}