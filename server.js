var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var route = require('./route.js');
var url=require('url');
var webpackDevServer = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: {
    '/api/index.php/*': {
      target: 'http://localhost:8000',
      secure: false
    }
  }
});
webpackDevServer.listen(3000, 'localhost', function(err, result) {
  if (err) console.log(err);
  console.log('Listening at localhost:3000');
});
var app=webpackDevServer.app;
app.use(function(req, res,next){
  var path=url.parse(req.url).pathname;
  if (typeof route[req.method + ' ' + path] == 'function') {
    console.log('matched');
    route[req.method + ' ' + path](req,res,next);
    res.end();
  }else{
    next();
  }
});
