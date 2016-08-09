var webpack=require('webpack');
var path=require('path');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
	name: "common",
	filename: "js/common_[hash].js"
});
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	context: path.resolve(__dirname ,"app"),
	entry: {
		index:[
			"./js/index.jsx"
		]
	},
	output: {
		path: __dirname + "/prod",
		filename: "js/[name]_[hash].js",
		publicPath:"/"
	},
	resolve:{
		root:path.resolve(__dirname ,"app"),
		extensions:['','.js','.less','.jsx','.jpg','.jpeg','.gif']
	},
	module:{
		loaders:[{
			test:/\.jsx$/,
			exclude: /(node_modules|bower_components)/,
			loader:'react-hot!babel-loader?presets[]=react&presets[]=es2015&plugins[]=antd'
		},{
			test:/\.less$/,
			loader:ExtractTextPlugin.extract("style-loader",'css-loader!less-loader?sourceMap')
		},{
			test:/\.js$/,
			exclude: /(node_modules|bower_components)/,
			loader:'babel-loader?presets[]=es2015'
		},{
			test:/\.(jpg|png|gif)$/,
			loader:'url-loader?limit=8192&name=[path][name].[ext]'
		}
		]
	},
	plugins:[
		commonsPlugin,
		new webpack.optimize.UglifyJsPlugin({minimize: true}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin('css/[name]_[hash].css',{
			allChunks:true
		}),

		new HtmlWebpackPlugin({
			filename:'index.html',
			template:'index.html',
			chunks:['index','common']
		})
	]
};
