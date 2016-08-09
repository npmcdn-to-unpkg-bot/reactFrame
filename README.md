#qupr
Webpack+React

初始化步骤
1.npm install
2.npm install -g webpack
3.npm install -g webpack-dev-server
4.npm install -g bower
5.bower install
6.webpack(depoly)
  node ./server.js(developer)


目录结构
/
-app/  #页面HTML
 -components/  #react组件
 -images/ #图片资源
 -js/    #页面入口
 -less/  #页面样式
 -libs/ #非bower_components库

新增：
数据mock,接口proxy
使用方法：
    npm install -g puer
    cd (当前目录)
    puer -a route.js　-t http://101.200.160.9

mock数据输入到route.js中,具体格式参考route.js文件部分实现
puer document:https://github.com/leeluolee/puer
