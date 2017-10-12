var http = require('http')  //原生
var fs = require('fs')     //文件在硬盘里面，当读取(readFile)时就放入到内存中
//IO处理时 ，下一次就不用去硬盘查找来了，无论是写操作还是读操作  
//node.js  no  blocking  异步无阻塞  所以可以高并发的处理  
var path = require('path')  //路径功能

//根据文件拓展名获得文件类型
var mime = require('mime')

var chatServer=require('./lib/chat_server')
const port = 3000
var cache = []   //做个缓存,访问过的放入到数组中，把访问过的东西放入到内存中
var server = http.createServer(
    function (request, response) {    //create拿到路由，访问的路径Server接受一个回调函数
        //request返回的是请求的数据  
        //response 是取到的数据的内容
        //伺服状态   server listening port on 3000
        //server listening port on 3000会一直存在
        //然后先输出路径，再返回错误信息
        console.log(`${request.url}`)
        var filePath = false
        if (request.url == '/') {
            filePath = 'public/index.html'   //本地静态的资源被后端管理起来了
        } else {
            filePath = 'public' + request.url
        }
        var absPath = './' + filePath
        //发送内容给用户
        serverStatic(response, cache, absPath)   //访问静态服务器方法
        //console.log(request.url)
        //node的核心
        //请求方法  get  post  request.method   head   session  cookie 
        //response
        //statusCode  200  304 404 501
        //contentType   json  html   text
        //.send将其发送出去
    })

function serverStatic(response, cache, absPath) {
    // if (cache[absPath]) {
    //     sendFile(response, absPath, cache[absPath])
    // } else {
        //发送index.html给用户
        //1.用户有没有?
        //2.发送文件
        fs.exists(absPath, function (exists) {
            if (exists) {
                //找打文件
                fs.readFile(absPath, (err, data) => {
                    if (err) {
                        send404(response)
                    } else {
                        //缓存起来
                        cache[absPath] = data
                        sendFile(response, absPath, data)
                    }
                })
            } else {
                //没找到 404
                send404(response)
            }
        })
    }
//}

function send404(response) {
    console.log('response 404')
    response.writeHead(  //操作一下头部,首先处理文件头，文件通过http请求发送，二进制流慢慢到达
        //on('data')  
        404, {
            // "content-type": "text/plain"
            "content-type": "text/plain;charset=utf-8"

        })
    //response.write('Error 404:request not found.')
    response.write('Error 404:出错了.')
    response.end()    //on('end')

}

function sendFile(response, filePath, fileContents) {
    console.log(path.basename(filePath))
    console.log(mime.lookup(path.basename(filePath)))
    response.writeHead(
        200,
        {
            "content-type": mime.lookup(
                path.basename(filePath))//有了文件的路径，拓展名就有了文件的类型
        }
    )
    response.end(fileContents)
}

server.listen(port, function () {
    console.log(`Server listening port on ${port}`)
})

chatServer.listen(server)