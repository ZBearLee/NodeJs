/* var Chat = function (socket) {
    this.socket = socket
}
Chat.prototype.sendMessage = function (room, text) {
    var message = {
        room: room,
        text: text
    }
    this.socket.emit('message', message)
}

Chat.prototype.processCommand = function (command) {
    var words = command.split('')
    var command = words[0]
        .subString(1, words[0].length)
        .toLowerCase()
    var message = false
    switch (command) {
        case 'join':
            break
        case 'nick':   //换昵称
        words.shift()   //移除第一项
        var name=words.join('')  //添加后面的
        this.socket.emit('nameAttempt',name)
            break
        default:
            message = 'Unrecognized command'
    }
} */

var Chat = function (socket) {
    this.socket = socket
}

Chat.prototype.sendMessage = 
function(room, text) {
    var message = {
        room: room,
        text: text
    }
    this.socket.emit('message', message)
}
Chat.prototype.processCommand = function(command) {
    var words = command.split(' ');
    var command = words[0]
        .substring(1, words[0].length)
        .toLowerCase()
    var message = false;
    switch (command) {
        case 'join':
            break;
        case 'nick':
            words.shift()
            var name = words.join(' ')
            this.socket.emit('nameAttempt', name)
            break;
        default:
            message = 'Unrecognized command.'
            break;
    }
}
