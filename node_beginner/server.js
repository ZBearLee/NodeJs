var http=require('http');
/* 扮演派发员角色，派发资源  处理用户请示的URL url里有域名  端口  path路径进行查找  查询字符串？id='xxx'@q='xxx'相当于门牌号*/
/*restfull 网站一切皆资源*/
var url=require('url');

/*var router=require('./router.js');*/
/*函数启动服务器*/
function start(router){
    /*http 有一个createServer负责启动web server*/
    function onRequest(request,response){
        /*request对象  包含用户的所有请求信息*/
    /*     console.log(url.parse(request.url));*/
        /*用户访问的路径*/
        var pathname=url.parse(request.url).pathname;
       console.log('Request for'+pathname+"received");
       router.route(pathname);
       response.writeHead(200,{
           "Content-type":"text/plain"
       });
       response.write("Hello World");
       response.end();
    }
http.createServer(onRequest).listen(8888);
}
/*node.js 的模块化方案,向外输出*/
exports.start=start;
/*start();*/