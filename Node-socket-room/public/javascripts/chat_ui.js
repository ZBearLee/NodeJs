/* function divSystemContentElement(message) {
    return $('<div></div>').html(
        '<i>' + message + '</i>'
    )
}

function divEscapedContentElement() {
    return $('<div></div>').text(message)
}

var socket = io.connect()
$(document).ready(function () {
    var chatApp = new Chat(socket)

    socket.on('joinResult', function (result) {
        $('#room').text(result.room)
        $('#messages').append(
            divSystemContentElement('Room changed.')
        )
    })

    socket.on('message', function (message) { //socket.io是基于事件的
        var newElement = $('<div></div>').text(message.text)
        $('#messages').append(newElement)
    })

    socket.on('nameResult', function (result) {
        var message
        if (result.success) {
            message = 'You are now known as' + result.name + '.'
        } else {
            message = result.message
        }
        $('#messages').append(divSystemContentElement(message))
    })

    $('#send-form').submit(function () {
        processUserInput(chatApp, socket)
        return false
    })
})

function processUserInput(chatApp, socket) {
    var message = $.trim($('#send-message').val())
    var systemMessage
    if (message.charAt(0) == '/') {
        //command
        //换房间
        //换昵称nickname
        //什么命令=>做什么？
        systemMessage =chatApp.processCommand(message)

    } else {
        chatApp.sendMessage($('#room').text(), message)
        $('#messages').append(divEscapedContentElement(message))
        //因为是广播给其他人的，可以不用给自己转发了
    }
$('#messages').scrollTop(
    $('#messages').prop('scrollHeight')
)
    $('#send-message').val('')
}

 */

function divSystemContentElement(message) {
    return $('<div></div>').html(
        '<i>'+message+'</i>'
    )
}
function divEscapedContentElement(message) {
    return $('<div></div>').text(message)
}
var socket = io.connect()
$(document).ready(function() {
    var chatApp = new Chat(socket)
    socket.on('joinResult', function(result) {
        $('#room').text(result.room)
        $('#messages').append(
            divSystemContentElement('Room changed.')
        )
    })
    socket.on('message', function(message) {
        var newElement =
            $('<div></div>').text(message.text)
        $('#messages').append(newElement)
    })
    socket.on('nameResult', function(result) {
        var message
        if (result.success) {
            message = 'Your are now known as ' + result.name + '.'
        } else {
            message = result.message
        }
        $('#messages').append(divSystemContentElement(message))
    })
    $('#send-form').submit(function() {
        processUserInput(chatApp, socket)
        return false
    })
})

function processUserInput(chatApp, socket) {
    var message = $.trim($('#send-message').val())
    var systemMessage;
    if(message.charAt(0) == '/') {
        // command
        // 换房间
        // 换nickname
        // 啥子命令
        // 去干嘛
        systemMessage =
            chatApp.processCommand(message)
    } else {
        chatApp.sendMessage($('#room').text(), message)
        $('#messages').append(
            divEscapedContentElement(message)
        )
        $('#messages').scrollTop(
            $('#messages').prop('scrollHeight')
        )
    }
    $('#send-message').val('')
}
