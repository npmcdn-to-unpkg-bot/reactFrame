var webpack=require('webpack');
var path=require('path');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
	name: "common",
	filename: "js/common.js"
});
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	context: path.resolve(__dirname ,"app"),
	entry: {
		index:[
			'webpack-dev-server/client?http://localhost:3000',
			'webpack/hot/only-dev-server',
			"./js/index.jsx"
		]
	},
	output: {
		path: __dirname + "/dist",
		filename: "js/[name].js",
		publicPath:"/"
	},
	resolve:{
		root:path.resolve(__dirname ,"app"),
		extensions:['','.js','.less','.jsx','.jpg','.jpeg','.gif','.png']
	},
	module:{
		loaders:[{
			test:/\.jsx$/,
			exclude: /(node_modules|bower_components)/,
			loader:'react-hot!babel-loader?presets[]=react&presets[]=es2015&plugins[]=antd'
		},
		{
			test:/\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader:'babel-loader?presets[]=es2015&ignore=buffer'
		},
		{
			test:/\.less$/,
			loader:ExtractTextPlugin.extract("style-loader",'css-loader!less-loader?sourceMap')
		},{
			test:/\.(jpg|png|gif)$/,
			loader:'url-loader?limit=8192&name=[path][name].[ext]'
		},{ 
			 test: /\.css$/, 
			 loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
		}
		]
	},
	plugins:[
		commonsPlugin,
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin('css/[name].css',{
			allChunks:true
		}),
		new webpack.ContextReplacementPlugin(/buffer/,require('buffer')),
		new HtmlWebpackPlugin({
			filename:'index.html',
			template:'index.html',
			chunks:['index','common']
		})
	]
};
