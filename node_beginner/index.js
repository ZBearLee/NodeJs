/*require 相对地址  ，引入模块文件*/
var server=require('./server');
var router=require('./router');/*路由是一个大分支，放在入口文件里，更容易观察*/
/*console.log(server);*/
server.start(router);/*函数可以传递参数*/
