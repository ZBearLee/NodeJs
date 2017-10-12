/* //启动聊天的server
//保持常链接
var socketio = require('socket.io')

var io,
    nickNames = {},
    currentRoom = {},
    nameUsed = []
guestNumber = 1

exports.listen = function (server) {   //commonjs的向外输出
    //向外暴露
    //在原有server.js中的3000端口下绑定一下就可以了
    io = socketio.listen(server)   //监听服务器
    io.sockets.on('connection', function (socket) {
        //推送  emit()
        //拉  AJAX+setInterval  
        //console.log(socket)
        guestNumber = assignGuestName(socket, guestNumber, nickNames, nameUsed)
        joinRoom(socket, 'Lobby')
        handleMessageBroadcasting(socket)
        handleNameChangeAttempts(socket, nickNames, nameUsed)
    })
}

function handleNameChangeAttempts(socket, nickNames, nameUsed) {
    socket.on('nameAttempt', function (name) {
        if (nameUsed.indexOf(name) === -1) {  //不存在就是-1、
            //告诉自己新名字成功
            socket.emit('nameResult', {
                success: true,
                name: name
            })
            //告诉下其他室友你的新名字
            var previousName = nickNames[socket.id]
            var previousNameIndex = nameUsed.indexOf(previousName)
            nameUsed.push(name)
            nickNames[socket.io] = name
            delete nameUsed[previousNameIndex]  //方便的删除方式
            socket.broadcast.to(currentRoom[socket.id].emit('message'), {
                text: previousName + 'is now known as' + name + '.'
            })
        } else {
            //如何告诉
            socket.emit('nameResult', {
                success: false,
                message: 'That name is already in use'
            })
        }
    })
}

function handleMessageBroadcasting(socket) {
    socket.on('message', function (message) {
        socket.broadcast.to(message.room).emit('message', {
            text: nickNames[socket.id] + ':' + message.text
        })
    })
}

function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
    var name = 'Guest' + guestNumber
    console.log(socket.id)
    nickNames[socket.id] = name
    namesUsed.push(name)
    socket.emit('nameResult', {
        success: true,
        name: name
    })
    return guestNumber + 1
}

function joinRoom(socket, room) {  //自动进入到一个房间
    //加入某个channel，可以让socket加入到某一个频道
    socket.join(room)
    socket.emit('joinResult', { room: room })
    //broadcast 广播
    socket.broadcast.to(room).emit('message', {
        text: nickNames[socket.id] + 'has joined' + '.'
    })  //对某个房间的所有人
} */



var socketio = require('socket.io')
var io,
    nickNames = {},
    currentRoom = {},
    namesUsed = [],
    guestNumber = 1

exports.listen = function(server) {
    io = socketio.listen(server)
    io.sockets.on('connection', function (socket) {
        // emit
        // 推 emit
        // 拉  AJAX + setInterval
        // console.log(socket)
        guestNumber = assignGuestName(
            socket, guestNumber, nickNames, 
            namesUsed)
        joinRoom(socket, 'Lobby')
        handleMessageBroadcasting(socket)
        handleNameChangeAttempts(
            socket, nickNames, namesUsed
        )
        handleClientDisconnection(socket,nickNames,namesUsed)//用户离开
    })
}

function handleClientDisconnection(socket,nickNames,namesUsed){
    socket.on('disconnect',function(){
        var nameIndex=namesUsed.indexOf(
            nickNames[socket.id]
        )
        delete namesUsed[nameIndex]
        delete nickNames[socket.io]
    })
}



function handleNameChangeAttempts (
    socket, nickNames, namesUsed) {
    socket.on('nameAttempt', function(name) {
        if (namesUsed.indexOf(name) === -1) {
            // 告诉自己新名字成功
            socket.emit('nameResult', {
                success: true,
                name: name
            })
            // 告诉下其它室友你的新名字
            var previousName = nickNames[socket.id 

]
            var previousNameIndex = 
                namesUsed.indexOf(previousName)
            namesUsed.push(name)
            nickNames[socket.id 

] = name
            delete namesUsed[previousNameIndex]
            socket.broadcast.to 

(currentRoom[socket.id 

])
                .emit('message', {
                    text: 
                    previousName + ' is now know as '
                     + name + '.'
                })
        } else {
            // 如何告诉
            socket.emit('nameResult', {
                success: false,
                message: 'That name is already in use.'
            })
        }
    })
}

function handleMessageBroadcasting (socket) {
    socket.on('message', function(message) {
        socket.broadcast.to 

(message.room)
            .emit('message', {
                text: nickNames[socket.id 

] + ':'
                    + message.text
            })
    })
} 

function assignGuestName(socket, guestNumber,
    nickNames,namesUsed) {
    var name = 'Guest' + guestNumber
    console.log(socket.id 

)
    nickNames[socket.id 

] = name
    namesUsed.push(name)
    socket.emit('nameResult', {
        success: true,
        name: name
    })
    return guestNumber + 1
}
function joinRoom (socket, room) {
    // 加入某个channel
    socket.join(room)
    socket.emit('joinResult', {room: room})
    // broadcast  广播
    socket.broadcast.to 

(room).emit('message', {
        text: nickNames[socket.id 

] + " has joined" + room + "."
    })
}



//


